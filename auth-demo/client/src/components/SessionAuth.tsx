import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

interface SessionInfo {
  authenticated: boolean;
  user?: User;
  sessionCreated?: string;
}

const SessionAuth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>({ authenticated: false });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/session/check', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSessionInfo(data);
      } else {
        setSessionInfo({ authenticated: false });
      }
    } catch (error) {
      console.error('セッションチェックエラー:', error);
      setSessionInfo({ authenticated: false });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setResult('ログイン成功！セッションが作成されました。');
        await checkSession();
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

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/session/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setResult('ログアウトしました。');
        setSessionInfo({ authenticated: false });
      } else {
        setResult('ログアウトに失敗しました。');
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const testProtectedResource = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/protected/session', {
        credentials: 'include',
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

  return (
    <div className="auth-demo">
      <h2>セッション認証</h2>
      
      <div className="demo-explanation">
        <p>
          セッション認証では、サーバー側でセッション情報を管理し、
          クライアントにはセッションIDをCookieで送信します。
        </p>
      </div>

      {!sessionInfo.authenticated ? (
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="session-username">ユーザー名:</label>
            <input
              type="text"
              id="session-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin, user1, demo のいずれかを入力"
            />
          </div>

          <div className="form-group">
            <label htmlFor="session-password">パスワード:</label>
            <input
              type="password"
              id="session-password"
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
        <div className="session-info">
          <h3>✅ ログイン済み</h3>
          <div className="user-info">
            <p><strong>ユーザー:</strong> {sessionInfo.user?.username}</p>
            <p><strong>役割:</strong> {sessionInfo.user?.role}</p>
            <p><strong>セッション作成日時:</strong> {sessionInfo.sessionCreated ? new Date(sessionInfo.sessionCreated).toLocaleString() : '不明'}</p>
          </div>

          <div className="button-group">
            <button onClick={testProtectedResource}>
              保護されたリソースにアクセス
            </button>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className={`result-panel ${result.includes('成功') ? 'success' : 'error'}`}>
          {result}
        </div>
      )}

      <div className="demo-info">
        <h3>セッション認証の流れ</h3>
        <ol>
          <li>ユーザーがログイン情報を送信</li>
          <li>サーバーが認証後、セッションIDを生成</li>
          <li>セッションIDをHTTPOnly Cookieで送信</li>
          <li>以降のリクエストでセッションIDを自動送信</li>
          <li>サーバーでセッション情報を検証</li>
        </ol>

        <h3>セッション認証の特徴</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>✅ メリット</h4>
            <ul>
              <li>サーバー側でセッション制御可能</li>
              <li>ログアウト機能の実装が容易</li>
              <li>細かい権限制御が可能</li>
            </ul>
          </div>
          <div className="feature-item">
            <h4>❌ デメリット</h4>
            <ul>
              <li>サーバー側でセッション管理が必要</li>
              <li>水平スケーリングが複雑</li>
              <li>セッションストレージが必要</li>
            </ul>
          </div>
        </div>

        <h3>セキュリティ対策</h3>
        <ul>
          <li>HTTPOnly Cookieの使用</li>
          <li>Secure属性の設定（HTTPS必須）</li>
          <li>SameSite属性によるCSRF対策</li>
          <li>セッションIDの定期更新</li>
          <li>適切なセッションタイムアウト</li>
        </ul>

        <h3>実装のポイント</h3>
        <div className="code-example">
          <h4>サーバー側実装例（Hono）:</h4>
          <pre>{`
// セッション作成
const sessionId = crypto.randomUUID();
sessions.set(sessionId, { userId: user.id, createdAt: new Date() });

// HTTPOnly Cookie設定
'Set-Cookie': 'sessionId=\${sessionId}; HttpOnly; Path=/; Max-Age=3600'
          `}</pre>
        </div>
      </div>
    </div>
  );
};

export default SessionAuth;