import React, { useState } from 'react';
import AuthSequenceDiagrams from './AuthSequenceDiagrams';

interface CognitoUser {
  username: string;
  email: string;
  attributes: {
    email_verified: boolean;
    preferred_username: string;
  };
}

interface CognitoAuthState {
  step: 'signIn' | 'signUp' | 'confirmSignUp' | 'authenticated' | 'mfa';
  user?: CognitoUser;
  confirmationCode?: string;
  mfaCode?: string;
}

const CognitoAuth: React.FC = () => {
  const [authState, setAuthState] = useState<CognitoAuthState>({ step: 'signIn' });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    mfaCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      // AWS Cognito サインインのシミュレーション
      await new Promise(resolve => setTimeout(resolve, 1000));

      // サンプルユーザーチェック
      if (formData.username === 'demo@example.com' && formData.password === 'TempPassword123!') {
        // MFAが必要なケースをシミュレート
        setAuthState({ step: 'mfa' });
        setResult('MFA認証が必要です。認証アプリで生成されたコードを入力してください。');
      } else if (formData.username === 'user@example.com' && formData.password === 'SecurePass123!') {
        // 通常のサインイン成功
        const user: CognitoUser = {
          username: 'user@example.com',
          email: 'user@example.com',
          attributes: {
            email_verified: true,
            preferred_username: 'user'
          }
        };
        setAuthState({ step: 'authenticated', user });
        setResult('サインインに成功しました！');
      } else {
        setResult('認証に失敗しました。ユーザー名またはパスワードが正しくありません。');
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      if (formData.password !== formData.confirmPassword) {
        setResult('パスワードが一致しません。');
        setLoading(false);
        return;
      }

      // AWS Cognito サインアップのシミュレーション
      await new Promise(resolve => setTimeout(resolve, 1500));

      setAuthState({ step: 'confirmSignUp' });
      setResult(
        `サインアップが完了しました。${formData.email} に確認コードを送信しました。` +
        '（デモ用確認コード: 123456）'
      );
    } catch (error) {
      setResult('サインアップに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.confirmationCode === '123456') {
        setAuthState({ step: 'signIn' });
        setResult('アカウントが確認されました。サインインしてください。');
        setFormData(prev => ({ ...prev, confirmationCode: '' }));
      } else {
        setResult('確認コードが正しくありません。');
      }
    } catch (error) {
      setResult('確認に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.mfaCode === '123456') {
        const user: CognitoUser = {
          username: 'demo@example.com',
          email: 'demo@example.com',
          attributes: {
            email_verified: true,
            preferred_username: 'demo'
          }
        };
        setAuthState({ step: 'authenticated', user });
        setResult('MFA認証に成功しました！');
      } else {
        setResult('MFAコードが正しくありません。（デモ用コード: 123456）');
      }
    } catch (error) {
      setResult('MFA認証に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setAuthState({ step: 'signIn' });
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      mfaCode: ''
    });
    setResult('サインアウトしました。');
  };

  const testCognitoAPI = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cognito/user-info', {
        headers: {
          'Authorization': `Bearer cognito-access-token-demo`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Cognito API呼び出し成功: ${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`API呼び出し失敗: ${data.error}`);
      }
    } catch (error) {
      setResult('ネットワークエラーが発生しました');
    }
  };

  return (
    <div className="auth-demo">
      <h2>AWS Cognito認証</h2>
      
      <div className="demo-explanation">
        <p>
          AWS Cognitoは、ユーザー認証、認可、ユーザー管理を提供するマネージドサービスです。
          サインアップ・サインイン、MFA、ソーシャルログインなどの機能を提供します。
        </p>
      </div>

      {authState.step === 'signIn' && (
        <div>
          <form onSubmit={handleSignIn} className="auth-form">
            <div className="form-group">
              <label htmlFor="cognito-username">メールアドレス:</label>
              <input
                type="email"
                id="cognito-username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                placeholder="user@example.com または demo@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cognito-password">パスワード:</label>
              <input
                type="password"
                id="cognito-password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder="パスワードを入力"
              />
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'サインイン中...' : 'サインイン'}
              </button>
              <button 
                type="button" 
                onClick={() => setAuthState({ step: 'signUp' })}
                className="secondary-btn"
              >
                アカウント作成
              </button>
            </div>
          </form>

          <div className="demo-info">
            <h3>サンプルアカウント</h3>
            <ul>
              <li><strong>user@example.com</strong> : SecurePass123! (通常サインイン)</li>
              <li><strong>demo@example.com</strong> : TempPassword123! (MFA必須)</li>
            </ul>
          </div>
        </div>
      )}

      {authState.step === 'signUp' && (
        <div>
          <form onSubmit={handleSignUp} className="auth-form">
            <div className="form-group">
              <label htmlFor="signup-email">メールアドレス:</label>
              <input
                type="email"
                id="signup-email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="your-email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-username">ユーザー名:</label>
              <input
                type="text"
                id="signup-username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                placeholder="ユーザー名"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">パスワード:</label>
              <input
                type="password"
                id="signup-password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                placeholder="8文字以上、大文字・小文字・数字・記号を含む"
              />
              <small>Cognitoのパスワードポリシー: 最低8文字、大文字・小文字・数字・特殊文字を含む</small>
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-password">パスワード確認:</label>
              <input
                type="password"
                id="signup-confirm-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                placeholder="パスワードを再入力"
              />
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'アカウント作成中...' : 'アカウント作成'}
              </button>
              <button 
                type="button" 
                onClick={() => setAuthState({ step: 'signIn' })}
                className="secondary-btn"
              >
                サインインに戻る
              </button>
            </div>
          </form>
        </div>
      )}

      {authState.step === 'confirmSignUp' && (
        <div>
          <form onSubmit={handleConfirmSignUp} className="auth-form">
            <div className="form-group">
              <label htmlFor="confirmation-code">確認コード:</label>
              <input
                type="text"
                id="confirmation-code"
                value={formData.confirmationCode}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmationCode: e.target.value }))}
                required
                placeholder="6桁の確認コードを入力"
                maxLength={6}
              />
              <small>メールで送信された6桁のコードを入力してください（デモ用: 123456）</small>
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? '確認中...' : 'アカウント確認'}
              </button>
              <button 
                type="button" 
                onClick={() => setAuthState({ step: 'signUp' })}
                className="secondary-btn"
              >
                戻る
              </button>
            </div>
          </form>
        </div>
      )}

      {authState.step === 'mfa' && (
        <div>
          <form onSubmit={handleMFA} className="auth-form">
            <div className="mfa-info">
              <h3>🔐 多要素認証（MFA）</h3>
              <p>セキュリティのため、認証アプリで生成されたコードを入力してください。</p>
            </div>

            <div className="form-group">
              <label htmlFor="mfa-code">MFAコード:</label>
              <input
                type="text"
                id="mfa-code"
                value={formData.mfaCode}
                onChange={(e) => setFormData(prev => ({ ...prev, mfaCode: e.target.value }))}
                required
                placeholder="6桁のMFAコードを入力"
                maxLength={6}
              />
              <small>Google AuthenticatorやAuthy等で生成されたコードを入力（デモ用: 123456）</small>
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? '認証中...' : 'MFA認証'}
              </button>
              <button 
                type="button" 
                onClick={() => setAuthState({ step: 'signIn' })}
                className="secondary-btn"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {authState.step === 'authenticated' && authState.user && (
        <div className="session-info">
          <h3>✅ 認証成功</h3>
          <div className="user-info">
            <p><strong>ユーザー名:</strong> {authState.user.username}</p>
            <p><strong>メール:</strong> {authState.user.email}</p>
            <p><strong>メール確認済み:</strong> {authState.user.attributes.email_verified ? 'はい' : 'いいえ'}</p>
            <p><strong>表示名:</strong> {authState.user.attributes.preferred_username}</p>
          </div>

          <div className="cognito-tokens">
            <h4>Cognitoトークン（模擬）:</h4>
            <div className="code-block">
              <div>Access Token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1Njc4OTAiLCJ0eXAiOiJKV1QifQ...</div>
              <div>ID Token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1Njc4OTAiLCJ0eXAiOiJKV1QifQ...</div>
              <div>Refresh Token: AQABAAAAAABnfiG-mA6NTae7CdWW7Qfd...</div>
            </div>
          </div>

          <div className="button-group">
            <button onClick={testCognitoAPI}>
              Cognito API呼び出しテスト
            </button>
            <button onClick={handleSignOut} className="logout-button">
              サインアウト
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className={`result-panel ${result.includes('成功') || result.includes('完了') ? 'success' : result.includes('失敗') || result.includes('正しくありません') ? 'error' : 'warning'}`}>
          <pre>{result}</pre>
        </div>
      )}

      <AuthSequenceDiagrams type="cognito" />

      <div className="demo-info">
        <h3>AWS Cognitoの特徴</h3>
        
        <div className="feature-grid">
          <div className="feature-item">
            <h4>✅ メリット</h4>
            <ul>
              <li>マネージドサービス（運用不要）</li>
              <li>スケーラブル</li>
              <li>多要素認証（MFA）内蔵</li>
              <li>ソーシャルログイン対応</li>
              <li>JWT標準準拠</li>
              <li>細かい権限制御</li>
            </ul>
          </div>
          <div className="feature-item">
            <h4>❌ デメリット</h4>
            <ul>
              <li>AWS依存</li>
              <li>カスタマイズに制限</li>
              <li>コスト（利用量に応じて）</li>
              <li>学習コストが高い</li>
            </ul>
          </div>
        </div>

        <h3>Cognitoの主要コンポーネント</h3>
        <ul>
          <li><strong>User Pool:</strong> ユーザー認証とユーザー管理</li>
          <li><strong>Identity Pool:</strong> AWS リソースへのアクセス制御</li>
          <li><strong>Hosted UI:</strong> カスタマイズ可能な認証UI</li>
          <li><strong>Triggers:</strong> Lambda関数による処理のカスタマイズ</li>
        </ul>

        <h3>認証フロー</h3>
        <ol>
          <li>ユーザーがサインアップ</li>
          <li>メールまたはSMSで確認コード送信</li>
          <li>コード確認でアカウント有効化</li>
          <li>サインイン実行</li>
          <li>MFA（有効な場合）</li>
          <li>JWTトークン発行（Access/ID/Refresh）</li>
        </ol>

        <h3>セキュリティ機能</h3>
        <ul>
          <li>適応認証（リスクベース認証）</li>
          <li>アカウント乗っ取り防止</li>
          <li>高度セキュリティ機能</li>
          <li>パスワードポリシーの強制</li>
          <li>ユーザー検証機能</li>
        </ul>

        <h3>実装例</h3>
        <div className="code-example">
          <h4>AWS SDK v3 サインアップ:</h4>
          <pre>{`
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const signUp = async (username, password, email) => {
  const command = new SignUpCommand({
    ClientId: "your-client-id",
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email }
    ]
  });
  
  return await client.send(command);
};
          `}</pre>
        </div>

        <h3>React実装例（Amplify）:</h3>
        <div className="code-example">
          <pre>{`
import { Auth } from 'aws-amplify';

// サインイン
const signIn = async () => {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Sign in success', user);
  } catch (error) {
    console.log('Sign in error', error);
  }
};

// MFA確認
const confirmSignIn = async (code) => {
  try {
    const user = await Auth.confirmSignIn(user, code, 'SOFTWARE_TOKEN_MFA');
    console.log('MFA success', user);
  } catch (error) {
    console.log('MFA error', error);
  }
};
          `}</pre>
        </div>
      </div>
    </div>
  );
};

export default CognitoAuth;