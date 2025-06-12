import React, { useState } from 'react';
import AuthSequenceDiagrams from './AuthSequenceDiagrams';

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  method?: string;
  error?: string;
}

const BasicAuth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [authHeader, setAuthHeader] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Basic認証ヘッダーを作成
    const credentials = btoa(`${username}:${password}`);
    const header = `Basic ${credentials}`;
    setAuthHeader(`Authorization: ${header}`);

    try {
      const response = await fetch('http://localhost:3000/api/auth/basic', {
        method: 'POST',
        headers: {
          'Authorization': header,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'ネットワークエラーが発生しました',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-demo">
      <h2>基本認証（Basic Authentication）</h2>
      
      <div className="demo-explanation">
        <p>
          基本認証は最もシンプルな認証方式です。ユーザー名とパスワードをBase64でエンコードし、
          HTTPヘッダーで送信します。
        </p>
        <div className="warning">
          <strong>⚠️ 注意:</strong> Base64は暗号化ではありません。HTTPSの使用が必須です。
        </div>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">ユーザー名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="admin, user1, demo のいずれかを入力"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="対応するパスワードを入力"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '認証中...' : 'ログイン'}
        </button>
      </form>

      {authHeader && (
        <div className="info-panel">
          <h3>送信される認証ヘッダー:</h3>
          <div className="code-block">
            {authHeader}
          </div>
          <p>
            <strong>デコード:</strong> {username}:{password}
          </p>
        </div>
      )}

      {result && (
        <div className={`result-panel ${result.success ? 'success' : 'error'}`}>
          {result.success ? (
            <div>
              <h3>✅ 認証成功!</h3>
              <p><strong>ユーザー:</strong> {result.user?.username}</p>
              <p><strong>役割:</strong> {result.user?.role}</p>
              <p><strong>認証方式:</strong> {result.method}</p>
            </div>
          ) : (
            <div>
              <h3>❌ 認証失敗</h3>
              <p>{result.error}</p>
            </div>
          )}
        </div>
      )}

      <AuthSequenceDiagrams type="basic" />

      <div className="demo-info">
        <h3>サンプルアカウント</h3>
        <ul>
          <li><strong>admin</strong> : password123</li>
          <li><strong>user1</strong> : mypassword</li>
          <li><strong>demo</strong> : demo123</li>
        </ul>

        <h3>基本認証の特徴</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>✅ メリット</h4>
            <ul>
              <li>実装が簡単</li>
              <li>サーバー側でセッション管理不要</li>
              <li>ステートレス</li>
            </ul>
          </div>
          <div className="feature-item">
            <h4>❌ デメリット</h4>
            <ul>
              <li>認証情報が毎回送信される</li>
              <li>Base64は暗号化ではない</li>
              <li>ログアウト機能がない</li>
            </ul>
          </div>
        </div>

        <h3>セキュリティ対策</h3>
        <ul>
          <li>必ずHTTPS通信を使用する</li>
          <li>適切なアクセス制御を実装する</li>
          <li>定期的なパスワード変更を促す</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicAuth;