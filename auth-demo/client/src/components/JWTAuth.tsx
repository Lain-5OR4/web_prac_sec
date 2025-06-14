import React, { useState } from 'react';
import AuthSequenceDiagrams from './AuthSequenceDiagrams';

interface JWTPayload {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface DecodedJWT {
  header: any;
  payload: JWTPayload;
  signature: string;
}

const JWTAuth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [showDecoded, setShowDecoded] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/jwt/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setResult('ログイン成功！JWTトークンが生成されました。');
        setUsername('');
        setPassword('');
      } else {
        setResult(`ログイン失敗: ${data.error}`);
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setDecodedJWT(null);
    setShowDecoded(false);
    setResult('⚠️ クライアント側からトークンを削除しました。ただし、サーバー側ではトークンは依然として有効期限まで有効です。');
  };

  const decodeToken = () => {
    if (!token) return;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        setResult('無効なJWTトークン形式です');
        return;
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      const signature = parts[2];

      setDecodedJWT({ header, payload, signature });
      setShowDecoded(true);
    } catch (error) {
      setResult('JWTのデコードに失敗しました');
    }
  };

  const testProtectedResource = async () => {
    if (!token) {
      setResult('認証が必要です。まずログインしてください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/protected/jwt', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`保護されたリソースにアクセス成功: ${data.message}`);
      } else {
        setResult(`アクセス失敗: ${data.error}`);
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    }
  };

  const verifyToken = async () => {
    if (!token) {
      setResult('認証が必要です。まずログインしてください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/jwt/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult('トークンは有効です。');
      } else {
        setResult(`トークン検証失敗: ${data.error || 'トークンが無効です'}`);
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    }
  };

  return (
    <div className="auth-demo">
      <h2>JWT認証</h2>
      
      <div className="demo-explanation">
        <p>
          JWT（JSON Web Token）は、JSON形式の情報を安全に転送するためのコンパクトなトークンです。
          ヘッダー、ペイロード、署名の3つの部分で構成されます。
        </p>
      </div>

      {!token ? (
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="jwt-username">ユーザー名:</label>
            <input
              type="text"
              id="jwt-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin, user1, demo のいずれかを入力"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jwt-password">パスワード:</label>
            <input
              type="password"
              id="jwt-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="対応するパスワードを入力"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      ) : (
        <div className="jwt-info">
          <h3>✅ ログイン済み</h3>
          
          <div className="token-display">
            <h4>JWTトークン:</h4>
            <div className="token-text">
              {token}
            </div>
          </div>

          <div className="button-group">
            <button onClick={decodeToken}>
              トークンをデコード
            </button>
            <button onClick={verifyToken}>
              トークンを検証
            </button>
            <button onClick={testProtectedResource}>
              保護されたリソースにアクセス
            </button>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </div>
        </div>
      )}

      {showDecoded && decodedJWT && (
        <div className="jwt-decoded">
          <h3>デコードされたJWT</h3>
          <div className="jwt-parts">
            <div className="jwt-part">
              <h4>Header (ヘッダー)</h4>
              <pre>{JSON.stringify(decodedJWT.header, null, 2)}</pre>
            </div>
            <div className="jwt-part">
              <h4>Payload (ペイロード)</h4>
              <pre>{JSON.stringify(decodedJWT.payload, null, 2)}</pre>
              <div className="payload-explanation">
                <p><strong>iat:</strong> 発行日時 ({new Date(decodedJWT.payload.iat * 1000).toLocaleString()})</p>
                <p><strong>exp:</strong> 有効期限 ({new Date(decodedJWT.payload.exp * 1000).toLocaleString()})</p>
              </div>
            </div>
            <div className="jwt-part">
              <h4>Signature (署名)</h4>
              <pre>{decodedJWT.signature}</pre>
              <p>署名はサーバーの秘密鍵で生成され、トークンの改ざんを検出します。</p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className={`result-panel ${result.includes('成功') ? 'success' : 'error'}`}>
          {result}
        </div>
      )}

      <div className="demo-info">
        <h3>JWTの構造</h3>
        <div className="jwt-structure">
          <div className="jwt-part-demo">
            <span className="jwt-header">header</span>
            <span className="jwt-dot">.</span>
            <span className="jwt-payload">payload</span>
            <span className="jwt-dot">.</span>
            <span className="jwt-signature">signature</span>
          </div>
        </div>

        <AuthSequenceDiagrams type="jwt" />
        
        <h3>JWT認証の流れ</h3>
        <ol>
          <li>ユーザーがログイン情報を送信</li>
          <li>サーバーが認証後、JWTトークンを生成</li>
          <li>クライアントがトークンを保存（ローカルストレージなど）</li>
          <li>以降のリクエストでAuthorizationヘッダーにトークンを含める</li>
          <li>サーバーでトークンの署名を検証</li>
        </ol>

        <h3>⚠️ 重要：JWTログアウトの制限</h3>
        <div className="warning-section">
          <div className="jwt-logout-warning">
            <h4>🚨 JWTの「ログアウト」は真のログアウトではありません</h4>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>認証方式</th>
                    <th>ログアウト処理</th>
                    <th>サーバー側での状態</th>
                    <th>セキュリティ影響</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>セッション認証</strong></td>
                    <td>サーバー側でセッション削除</td>
                    <td>❌ セッション完全無効化</td>
                    <td>✅ 即座にアクセス不可</td>
                  </tr>
                  <tr>
                    <td><strong>JWT認証</strong></td>
                    <td>クライアント側でトークン削除のみ</td>
                    <td>⚠️ トークンは依然として有効</td>
                    <td>❌ トークンが残存すれば利用可能</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="security-risks">
              <h4>🔐 実際のセキュリティリスク</h4>
              <ul>
                <li><strong>共用端末の危険性：</strong> ブラウザの開発者ツールやローカルストレージにトークンが残存する可能性</li>
                <li><strong>ネットワーク傍受：</strong> 通信が傍受された場合、有効期限まで悪用される可能性</li>
                <li><strong>XSS攻撃：</strong> トークンが盗まれた場合、有効期限まで不正利用される</li>
                <li><strong>アカウント乗っ取り：</strong> 管理者が権限を取り消してもトークンが有効なら継続してアクセス可能</li>
              </ul>
            </div>

            <div className="mitigation-strategies">
              <h4>🛡️ 対策方法</h4>
              <ul>
                <li><strong>短い有効期限：</strong> 15分〜1時間程度に設定</li>
                <li><strong>リフレッシュトークン：</strong> アクセストークンとリフレッシュトークンの組み合わせ</li>
                <li><strong>ブラックリスト：</strong> 無効化したトークンのリストを管理（ステートレスの利点が減少）</li>
                <li><strong>セキュアな保存：</strong> HttpOnly Cookieでの保存（XSS対策）</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>JWT認証の特徴</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>✅ メリット</h4>
            <ul>
              <li>ステートレス（サーバー側でセッション管理不要）</li>
              <li>分散システムに適している</li>
              <li>自己完結型（ユーザー情報を含む）</li>
              <li>標準仕様（RFC 7519）</li>
            </ul>
          </div>
          <div className="feature-item">
            <h4>❌ デメリット</h4>
            <ul>
              <li>トークンサイズが大きい</li>
              <li><strong>リボーク（無効化）が困難</strong></li>
              <li>機密情報をペイロードに含めてはいけない</li>
              <li>クライアント側での適切な保存が必要</li>
              <li><strong>真のログアウトが実装困難</strong></li>
            </ul>
          </div>
        </div>

        <h3>セキュリティ対策</h3>
        <ul>
          <li>強力な秘密鍵の使用</li>
          <li>適切な有効期限の設定</li>
          <li>HTTPSによる通信の暗号化</li>
          <li>リフレッシュトークンの実装</li>
          <li>機密情報をペイロードに含めない</li>
        </ul>

        <h3>実装のポイント</h3>
        <div className="code-example">
          <h4>Authorization ヘッダー:</h4>
          <pre>{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</pre>
          
          <h4>トークン生成例（サーバー側）:</h4>
          <pre>{`
const token = jwt.sign(
  { userId: user.id, username: user.username, role: user.role },
  JWT_SECRET,
  { expiresIn: '1h' }
);
          `}</pre>
        </div>
      </div>
    </div>
  );
};

export default JWTAuth;