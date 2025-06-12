import React from 'react';
import ZoomableMermaidDiagram from './ZoomableMermaidDiagram';

interface AuthSequenceDiagramsProps {
  type: 'basic' | 'session' | 'jwt' | 'cognito';
}

const AuthSequenceDiagrams: React.FC<AuthSequenceDiagramsProps> = ({ type }) => {
  const getSequenceDiagram = () => {
    switch (type) {
      case 'basic':
        return `sequenceDiagram
    participant U as ユーザー
    participant B as ブラウザ
    participant S as サーバー
    
    Note over U,S: Basic認証のフロー
    
    U->>B: ログインページにアクセス
    B->>S: GET /protected
    S->>B: 401 Unauthorized + WWW-Authenticate
    B->>U: 認証ダイアログ表示
    U->>B: ユーザー名とパスワード入力
    
    Note over B: Base64エンコード username password
    
    B->>S: GET /protected Authorization Basic base64(user pass)
    
    alt 認証成功
        S->>B: 200 OK + コンテンツ
        B->>U: 保護されたページ表示
    else 認証失敗
        S->>B: 401 Unauthorized
        B->>U: 認証エラー表示
    end
    
    Note over U,S: 毎回のリクエストで認証情報を送信
    
    U->>B: 他のページにアクセス
    B->>S: GET /other Authorization Basic base64(user pass)
    S->>B: 200 OK + コンテンツ`;

      case 'session':
        return `sequenceDiagram
    participant U as ユーザー
    participant B as ブラウザ
    participant S as サーバー
    participant D as セッションDB
    
    Note over U,S: セッション認証のフロー
    
    U->>B: ログインページにアクセス
    B->>S: GET /login
    S->>B: ログインフォーム
    B->>U: フォーム表示
    
    U->>B: ユーザー名とパスワード入力
    B->>S: POST /login {username, password}
    
    alt 認証成功
        S->>D: セッション作成 sessionId + userId
        D->>S: 保存完了
        S->>B: 200 OK Set-Cookie sessionId abc123 HttpOnly
        B->>U: ログイン成功
        
        Note over B: セッションIDをCookieに保存
        
        U->>B: 保護されたページにアクセス
        B->>S: GET /protected Cookie sessionId abc123
        S->>D: セッション確認 sessionId abc123
        D->>S: ユーザー情報返却
        S->>B: 200 OK + コンテンツ
        B->>U: 保護されたページ表示
        
        U->>B: ログアウト
        B->>S: POST /logout Cookie sessionId abc123
        S->>D: セッション削除 sessionId abc123
        D->>S: 削除完了
        S->>B: 200 OK Set-Cookie sessionId Max-Age 0
        B->>U: ログアウト完了
        
    else 認証失敗
        S->>B: 401 Unauthorized
        B->>U: 認証エラー表示
    end`;

      case 'jwt':
        return `sequenceDiagram
    participant U as ユーザー
    participant B as ブラウザ
    participant S as サーバー
    
    Note over U,S: JWT認証のフロー
    
    U->>B: ログインページにアクセス
    B->>S: GET /login
    S->>B: ログインフォーム
    B->>U: フォーム表示
    
    U->>B: ユーザー名とパスワード入力
    B->>S: POST /api/auth/jwt/login {username, password}
    
    alt 認証成功
        Note over S: JWT生成 Header.Payload.Signature ペイロード {userId, username, role, exp}
        S->>B: 200 OK {token eyJhbGciOiJIUzI1NiIs...}
        B->>U: ログイン成功
        
        Note over B: JWTトークンをローカルストレージまたはメモリに保存
        
        U->>B: 保護されたページにアクセス
        B->>S: GET /api/protected/jwt Authorization Bearer eyJhbGciOiJIUzI1NiIs...
        
        Note over S: JWT検証 1 署名確認 2 有効期限確認 3 ペイロード抽出
        
        alt JWT有効
            S->>B: 200 OK + コンテンツ
            B->>U: 保護されたページ表示
        else JWT無効/期限切れ
            S->>B: 401 Unauthorized
            B->>U: 再ログイン要求
        end
        
        U->>B: ログアウト
        Note over B: クライアント側でトークン削除 ⚠️ サーバー側では無効化されない
        B->>U: ログアウト完了（見た目上）
        
    else 認証失敗
        S->>B: 401 Unauthorized
        B->>U: 認証エラー表示
    end
    
    Note over U,S: ⚠️ 重要 JWTは有効期限まで サーバー側で無効化できない`;

      case 'cognito':
        return `sequenceDiagram
    participant U as ユーザー
    participant B as ブラウザ
    participant A as アプリ
    participant C as AWS Cognito
    participant API as APIサーバー
    
    Note over U,API: AWS Cognito認証のフロー
    
    U->>B: ログインページにアクセス
    B->>A: ページ表示
    A->>U: Cognitoログインフォーム
    
    U->>A: ユーザー名とパスワード入力
    A->>C: POST /oauth2/token {username, password, grant_type}
    
    alt 認証成功
        Note over C: ユーザー認証 + JWT生成
        C->>A: 200 OK {access_token, id_token, refresh_token}
        A->>B: トークン保存
        B->>U: ログイン成功
        
        Note over B: 3種類のトークン access_token APIアクセス用 id_token ユーザー情報 refresh_token 更新用
        
        U->>B: 保護されたAPIにアクセス
        B->>API: GET /api/protected Authorization Bearer access_token
        
        API->>C: JWT検証（公開鍵で署名確認）
        
        alt トークン有効
            C->>API: 検証成功
            API->>B: 200 OK + データ
            B->>U: データ表示
        else トークン無効/期限切れ
            C->>API: 検証失敗
            API->>B: 401 Unauthorized
            
            Note over A: refresh_tokenで access_token更新
            A->>C: POST /oauth2/token refresh_token grant_type refresh_token
            C->>A: 新しいaccess_token
            A->>API: 再試行（新しいトークンで）
            API->>B: 200 OK + データ
            B->>U: データ表示
        end
        
        U->>B: ログアウト
        A->>C: POST /oauth2/revoke {token, token_type_hint}
        C->>A: トークン無効化完了
        A->>B: ローカルトークン削除
        B->>U: ログアウト完了
        
    else 認証失敗
        C->>A: 401 Unauthorized
        A->>U: 認証エラー表示
    end
    
    Note over U,API: Cognitoの特徴 マネージドサービス MFA対応 自動スケーリング トークン無効化可能`;

      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'basic':
        return 'Basic認証シーケンス図';
      case 'session':
        return 'セッション認証シーケンス図';
      case 'jwt':
        return 'JWT認証シーケンス図';
      case 'cognito':
        return 'AWS Cognito認証シーケンス図';
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'basic':
        return 'HTTPヘッダーでユーザー名とパスワードを毎回送信する最もシンプルな認証方式';
      case 'session':
        return 'サーバー側でセッション情報を管理し、クライアントにはセッションIDをCookieで送信';
      case 'jwt':
        return 'ステートレスなトークンベース認証。トークン自体にユーザー情報を含む';
      case 'cognito':
        return 'AWSのマネージド認証サービス。OAuth2.0/OpenID Connectに準拠';
      default:
        return '';
    }
  };

  return (
    <div className="sequence-diagram-section">
      <h3>📊 {getTitle()}</h3>
      <p className="diagram-description">{getDescription()}</p>
      <ZoomableMermaidDiagram 
        chart={getSequenceDiagram()} 
        id={`${type}-sequence-diagram`}
      />
    </div>
  );
};

export default AuthSequenceDiagrams;