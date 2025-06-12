import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const app = new Hono();

// ログ用ヘルパー関数
const formatHeaders = (headers: Record<string, string | undefined>) => {
  const filtered = Object.entries(headers)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  return JSON.stringify(filtered, null, 2);
};

const logRequest = (method: string, path: string, headers: Record<string, string | undefined>, body?: any) => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🔄 REQUEST: ${method} ${path}`);
  console.log(`📝 Time: ${new Date().toISOString()}`);
  console.log(`📋 Headers:\n${formatHeaders(headers)}`);
  if (body) {
    console.log(`📦 Body: ${JSON.stringify(body, null, 2)}`);
  }
};

const logResponse = (status: number, body: any, headers?: Record<string, string>) => {
  console.log(`\n✅ RESPONSE: ${status}`);
  if (headers) {
    console.log(`📋 Response Headers:\n${JSON.stringify(headers, null, 2)}`);
  }
  console.log(`📦 Response Body: ${JSON.stringify(body, null, 2)}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

// リクエスト/レスポンスログミドルウェア
app.use('*', async (c, next) => {
  const method = c.req.method;
  const path = c.req.path;
  const headers = Object.fromEntries(c.req.raw.headers);
  
  let body;
  if (method !== 'GET' && c.req.header('content-type')?.includes('application/json')) {
    try {
      const clonedRequest = c.req.raw.clone();
      body = await clonedRequest.json();
    } catch (e) {
      // JSON パースエラーは無視
    }
  }
  
  logRequest(method, path, headers, body);
  
  await next();
  
  const responseBody = await c.res.clone().json().catch(() => ({ message: 'Non-JSON response' }));
  const responseHeaders = Object.fromEntries(c.res.headers);
  logResponse(c.res.status, responseBody, responseHeaders);
});

// CORS設定
app.use('*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// 環境変数
const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key-not-for-production';
const PORT = process.env.PORT || 3000;

// サンプルユーザーデータ（本番環境ではデータベースを使用）
interface User {
  id: string;
  username: string;
  password: string; // ハッシュ化されたパスワード
  role: string;
}

const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: await bcrypt.hash('password123', 10),
    role: 'admin'
  },
  {
    id: '2',
    username: 'user1',
    password: await bcrypt.hash('mypassword', 10),
    role: 'user'
  },
  {
    id: '3',
    username: 'demo',
    password: await bcrypt.hash('demo123', 10),
    role: 'user'
  }
];

// セッションストレージ（本番環境ではRedisなどを使用）
const sessions = new Map<string, { userId: string; createdAt: Date }>();

// ミドルウェア：JWT認証
const jwtAuth = jwt({
  secret: JWT_SECRET,
});

// ルート定義
app.get('/', (c) => {
  return c.json({ message: '認証デモAPI サーバー' });
});

// 基本認証エンドポイント
app.post('/api/auth/basic', async (c) => {
  console.log('🔐 [BASIC AUTH] 認証開始');
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    console.log('❌ [BASIC AUTH] Authorization ヘッダーが見つからないか、不正な形式です');
    return c.json({ error: 'Authorization header required' }, 401);
  }

  try {
    const base64Credentials = authHeader.substring(6);
    console.log(`🔍 [BASIC AUTH] Base64 認証情報: ${base64Credentials}`);
    
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    console.log(`👤 [BASIC AUTH] 認証試行 - ユーザー: ${username}`);

    const user = users.find(u => u.username === username);
    if (!user) {
      console.log(`❌ [BASIC AUTH] ユーザー "${username}" が見つかりません`);
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(`🔑 [BASIC AUTH] パスワード検証: ${passwordMatch ? '成功' : '失敗'}`);
    
    if (!passwordMatch) {
      console.log(`❌ [BASIC AUTH] ユーザー "${username}" のパスワードが一致しません`);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    console.log(`✅ [BASIC AUTH] 認証成功 - ユーザー: ${username}, ロール: ${user.role}`);
    return c.json({
      success: true,
      user: { id: user.id, username: user.username, role: user.role },
      method: 'basic'
    });
  } catch (error) {
    console.log(`❌ [BASIC AUTH] エラー: ${error}`);
    return c.json({ error: 'Invalid authorization header' }, 400);
  }
});

// セッション認証エンドポイント
app.post('/api/auth/session/login', async (c) => {
  console.log('🔐 [SESSION AUTH] ログイン開始');
  const { username, password } = await c.req.json();
  console.log(`👤 [SESSION AUTH] ログイン試行 - ユーザー: ${username}`);

  const user = users.find(u => u.username === username);
  if (!user) {
    console.log(`❌ [SESSION AUTH] ユーザー "${username}" が見つかりません`);
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(`🔑 [SESSION AUTH] パスワード検証: ${passwordMatch ? '成功' : '失敗'}`);
  
  if (!passwordMatch) {
    console.log(`❌ [SESSION AUTH] ユーザー "${username}" のパスワードが一致しません`);
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  // セッションID生成
  const sessionId = crypto.randomUUID();
  console.log(`🆔 [SESSION AUTH] セッションID生成: ${sessionId}`);
  
  sessions.set(sessionId, { 
    userId: user.id, 
    createdAt: new Date() 
  });
  console.log(`💾 [SESSION AUTH] セッション保存 - ユーザーID: ${user.id}, 作成時刻: ${new Date().toISOString()}`);
  console.log(`📊 [SESSION AUTH] 現在のセッション数: ${sessions.size}`);

  const cookieHeader = `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=3600`;
  console.log(`🍪 [SESSION AUTH] Cookie設定: ${cookieHeader}`);
  console.log(`✅ [SESSION AUTH] ログイン成功 - ユーザー: ${username}, ロール: ${user.role}`);

  // HTTPOnly CookieでセッションIDを設定
  return c.json({
    success: true,
    sessionId,
    user: { id: user.id, username: user.username, role: user.role },
    method: 'session'
  }, 200, {
    'Set-Cookie': cookieHeader
  });
});

app.post('/api/auth/session/logout', (c) => {
  console.log('🚪 [SESSION AUTH] ログアウト開始');
  const cookies = c.req.header('Cookie');
  const sessionId = cookies?.split('; ').find(row => row.startsWith('sessionId='))?.split('=')[1];
  
  console.log(`🍪 [SESSION AUTH] 受信Cookie: ${cookies}`);
  console.log(`🆔 [SESSION AUTH] 抽出されたセッションID: ${sessionId}`);

  if (sessionId) {
    const sessionExists = sessions.has(sessionId);
    console.log(`💾 [SESSION AUTH] セッション存在確認: ${sessionExists}`);
    
    if (sessionExists) {
      sessions.delete(sessionId);
      console.log(`🗑️ [SESSION AUTH] セッション削除完了: ${sessionId}`);
    }
  }
  
  console.log(`📊 [SESSION AUTH] 残りセッション数: ${sessions.size}`);
  console.log('✅ [SESSION AUTH] ログアウト完了');

  return c.json({ success: true }, 200, {
    'Set-Cookie': 'sessionId=; HttpOnly; Path=/; Max-Age=0'
  });
});

app.get('/api/auth/session/check', (c) => {
  console.log('🔍 [SESSION CHECK] セッション確認開始');
  const cookies = c.req.header('Cookie');
  const sessionId = cookies?.split('; ').find(row => row.startsWith('sessionId='))?.split('=')[1];
  
  console.log(`🍪 [SESSION CHECK] 受信Cookie: ${cookies}`);
  console.log(`🆔 [SESSION CHECK] 抽出されたセッションID: ${sessionId}`);

  if (!sessionId) {
    console.log('❌ [SESSION CHECK] セッションIDが見つかりません');
    return c.json({ authenticated: false }, 401);
  }
  
  const sessionExists = sessions.has(sessionId);
  console.log(`💾 [SESSION CHECK] セッション存在確認: ${sessionExists}`);
  
  if (!sessionExists) {
    console.log('❌ [SESSION CHECK] 無効なセッションID');
    return c.json({ authenticated: false }, 401);
  }

  const session = sessions.get(sessionId)!;
  const user = users.find(u => u.id === session.userId);
  
  console.log(`👤 [SESSION CHECK] セッションユーザー: ${user?.username}`);
  console.log(`📅 [SESSION CHECK] セッション作成時刻: ${session.createdAt.toISOString()}`);
  console.log('✅ [SESSION CHECK] 認証成功');

  return c.json({
    authenticated: true,
    user: { id: user!.id, username: user!.username, role: user!.role },
    sessionCreated: session.createdAt
  });
});

// JWT認証エンドポイント
app.post('/api/auth/jwt/login', async (c) => {
  console.log('🔐 [JWT AUTH] ログイン開始');
  const { username, password } = await c.req.json();
  console.log(`👤 [JWT AUTH] ログイン試行 - ユーザー: ${username}`);

  const user = users.find(u => u.username === username);
  if (!user) {
    console.log(`❌ [JWT AUTH] ユーザー "${username}" が見つかりません`);
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(`🔑 [JWT AUTH] パスワード検証: ${passwordMatch ? '成功' : '失敗'}`);
  
  if (!passwordMatch) {
    console.log(`❌ [JWT AUTH] ユーザー "${username}" のパスワードが一致しません`);
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  // JWT生成
  const payload = { 
    userId: user.id, 
    username: user.username, 
    role: user.role 
  };
  console.log(`📝 [JWT AUTH] JWT ペイロード: ${JSON.stringify(payload)}`);
  
  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  console.log(`🎫 [JWT AUTH] JWT生成完了 - 長さ: ${token.length}文字`);
  console.log(`🔍 [JWT AUTH] JWT (最初50文字): ${token.substring(0, 50)}...`);
  console.log(`✅ [JWT AUTH] ログイン成功 - ユーザー: ${username}, ロール: ${user.role}`);

  return c.json({
    success: true,
    token,
    user: { id: user.id, username: user.username, role: user.role },
    method: 'jwt'
  });
});

app.get('/api/auth/jwt/verify', async (c) => {
  console.log('🔍 [JWT VERIFY] JWT検証開始');
  const authHeader = c.req.header('Authorization');
  console.log(`🎫 [JWT VERIFY] Authorization ヘッダー: ${authHeader || 'なし'}`);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ [JWT VERIFY] Authorization ヘッダーが見つからないか、不正な形式です');
    return c.json({ error: 'Authorization header required' }, 401);
  }

  const token = authHeader.substring(7);
  console.log(`🎫 [JWT VERIFY] 抽出されたトークン (最初50文字): ${token.substring(0, 50)}...`);
  console.log(`📏 [JWT VERIFY] トークン長: ${token.length}文字`);

  try {
    // JWT構造の解析表示
    const parts = token.split('.');
    console.log(`🔧 [JWT VERIFY] JWT構造: ${parts.length}部分 (Header.Payload.Signature)`);
    
    if (parts.length !== 3) {
      console.log('❌ [JWT VERIFY] 不正なJWT構造 - 3部分ではありません');
      return c.json({ error: 'Invalid JWT structure' }, 401);
    }

    // ヘッダーとペイロードのデコード表示（署名検証前）
    try {
      const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      console.log(`📋 [JWT VERIFY] ヘッダー: ${JSON.stringify(header)}`);
      console.log(`📝 [JWT VERIFY] ペイロード（未検証）: ${JSON.stringify(payload)}`);
      console.log(`⏰ [JWT VERIFY] 有効期限: ${new Date(payload.exp * 1000).toISOString()}`);
    } catch (decodeError) {
      console.log(`⚠️ [JWT VERIFY] デコードエラー（検証は続行）: ${decodeError}`);
    }

    console.log('🔐 [JWT VERIFY] 署名検証開始...');
    console.log(`🔑 [JWT VERIFY] 使用シークレット: ${JWT_SECRET.substring(0, 10)}...`);
    
    // 実際の署名検証
    const verified = jsonwebtoken.verify(token, JWT_SECRET);
    console.log(`✅ [JWT VERIFY] 署名検証成功`);
    console.log(`📝 [JWT VERIFY] 検証済みペイロード: ${JSON.stringify(verified)}`);
    console.log(`👤 [JWT VERIFY] 認証ユーザー: ${(verified as any).username}`);
    console.log(`🎭 [JWT VERIFY] ユーザーロール: ${(verified as any).role}`);

    return c.json({ 
      authenticated: true, 
      user: verified,
      verifiedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.log(`❌ [JWT VERIFY] 検証失敗: ${error.message}`);
    
    if (error.name === 'TokenExpiredError') {
      console.log(`⏰ [JWT VERIFY] トークン期限切れ: ${error.expiredAt}`);
      return c.json({ error: 'Token expired', expiredAt: error.expiredAt }, 401);
    } else if (error.name === 'JsonWebTokenError') {
      console.log(`🔐 [JWT VERIFY] 無効なトークン: ${error.message}`);
      return c.json({ error: 'Invalid token', reason: error.message }, 401);
    } else {
      console.log(`🚨 [JWT VERIFY] 予期しないエラー: ${error}`);
      return c.json({ error: 'JWT verification failed' }, 401);
    }
  }
});

// 保護されたリソースのデモ
app.get('/api/protected/session', (c) => {
  const cookies = c.req.header('Cookie');
  const sessionId = cookies?.split('; ').find(row => row.startsWith('sessionId='))?.split('=')[1];

  if (!sessionId || !sessions.has(sessionId)) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  return c.json({ 
    message: 'セッション認証でアクセスされた保護されたリソース',
    data: { timestamp: new Date().toISOString() }
  });
});

app.get('/api/protected/jwt', jwtAuth, (c) => {
  const payload = c.get('jwtPayload');
  return c.json({ 
    message: 'JWT認証でアクセスされた保護されたリソース',
    user: payload,
    data: { timestamp: new Date().toISOString() }
  });
});

// 脆弱性デモエンドポイント
app.post('/api/demo/weak-password', async (c) => {
  const { password } = await c.req.json();
  const weakPasswords = ['1234', '0000', '1111', 'admin', 'password', '123456'];
  
  if (weakPasswords.includes(password)) {
    return c.json({ 
      vulnerable: true, 
      message: `脆弱なパスワード "${password}" が検出されました！` 
    });
  }
  
  return c.json({ 
    vulnerable: false, 
    message: 'パスワードは推測困難です。' 
  });
});

app.post('/api/demo/brute-force', async (c) => {
  const { attempts } = await c.req.json();
  const targetPassword = '1234';
  
  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i] === targetPassword) {
      return c.json({
        success: true,
        attemptNumber: i + 1,
        message: `${i + 1}回目の試行で成功！ブルートフォース攻撃が成功しました。`
      });
    }
  }
  
  return c.json({
    success: false,
    message: '攻撃は失敗しました。'
  });
});

// AWS Cognito模擬エンドポイント
app.get('/api/cognito/user-info', (c) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Authorization header required' }, 401);
  }

  const token = authHeader.substring(7);
  
  // 模擬的なCognitoトークン検証
  if (token === 'cognito-access-token-demo') {
    return c.json({
      UserAttributes: [
        { Name: 'sub', Value: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'email', Value: 'demo@example.com' },
        { Name: 'preferred_username', Value: 'demo' }
      ],
      Username: 'demo@example.com',
      UserStatus: 'CONFIRMED',
      MFAOptions: [
        {
          DeliveryMedium: 'SMS',
          AttributeName: 'phone_number'
        }
      ]
    });
  }
  
  return c.json({ error: 'Invalid token' }, 401);
});

app.post('/api/cognito/sign-up', async (c) => {
  const { username, password, email } = await c.req.json();
  
  // Cognitoサインアップの模擬
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return c.json({
    UserSub: crypto.randomUUID(),
    CodeDeliveryDetails: {
      Destination: email,
      DeliveryMedium: 'EMAIL',
      AttributeName: 'email'
    }
  });
});

app.post('/api/cognito/confirm-sign-up', async (c) => {
  const { username, confirmationCode } = await c.req.json();
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (confirmationCode === '123456') {
    return c.json({ message: 'User confirmed successfully' });
  }
  
  return c.json({ error: 'Invalid confirmation code' }, 400);
});

// エラーハンドリング
app.onError((err, c) => {
  console.log('\n🚨 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚨 [ERROR] サーバーエラーが発生しました');
  console.log(`📝 [ERROR] 時刻: ${new Date().toISOString()}`);
  console.log(`🔍 [ERROR] パス: ${c.req.path}`);
  console.log(`📋 [ERROR] メソッド: ${c.req.method}`);
  console.log(`❌ [ERROR] エラー内容: ${err.message}`);
  console.log(`📊 [ERROR] スタックトレース:\n${err.stack}`);
  console.log('🚨 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  return c.json({ 
    error: 'Internal Server Error',
    timestamp: new Date().toISOString(),
    path: c.req.path
  }, 500);
});

// 404ハンドリング
app.notFound((c) => {
  console.log(`🔍 [404] 存在しないエンドポイントへのアクセス: ${c.req.method} ${c.req.path}`);
  console.log(`📝 [404] 時刻: ${new Date().toISOString()}`);
  console.log(`🌐 [404] User-Agent: ${c.req.header('User-Agent')}`);
  
  return c.json({ 
    error: 'Not Found',
    path: c.req.path,
    method: c.req.method,
    timestamp: new Date().toISOString()
  }, 404);
});

console.log('\n🚀 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 認証デモサーバー起動');
console.log(`📍 ポート: ${PORT}`);
console.log(`🔑 JWT シークレット: ${JWT_SECRET.substring(0, 20)}...`);
console.log('🚀 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📚 講義用サンプルユーザー:');
console.log('   👤 admin:password123 (管理者)');
console.log('   👤 user1:mypassword (一般ユーザー)');
console.log('   👤 demo:demo123 (デモユーザー)\n');

console.log('🔗 利用可能なエンドポイント:');
console.log('   🔐 Basic認証: POST /api/auth/basic');
console.log('   🍪 セッション認証: POST /api/auth/session/login');
console.log('   🎫 JWT認証: POST /api/auth/jwt/login');
console.log('   🔍 セッション確認: GET /api/auth/session/check');
console.log('   ✅ JWT確認: GET /api/auth/jwt/verify');
console.log('   🔒 保護リソース: GET /api/protected/session, /api/protected/jwt\n');

serve({
  fetch: app.fetch,
  port: Number(PORT),
});