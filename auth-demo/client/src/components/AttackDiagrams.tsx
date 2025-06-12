import React from 'react';

interface DiagramProps {
  attackType: string;
}

const AttackDiagrams: React.FC<DiagramProps> = ({ attackType }) => {
  const renderCredentialStuffingDiagram = () => (
    <div className="attack-diagram">
      <h4>🔄 クレデンシャルスタッフィング攻撃フロー</h4>
      <svg viewBox="0 0 800 400" className="diagram-svg">
        {/* データ漏洩元 */}
        <rect x="50" y="50" width="120" height="60" fill="#ff6b6b" stroke="#dc3545" strokeWidth="2" rx="5"/>
        <text x="110" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">データ漏洩</text>
        <text x="110" y="90" textAnchor="middle" fill="white" fontSize="10">サイトA</text>
        
        {/* 攻撃者 */}
        <rect x="300" y="50" width="120" height="60" fill="#dc3545" stroke="#a71e2a" strokeWidth="2" rx="5"/>
        <text x="360" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">攻撃者</text>
        <text x="360" y="90" textAnchor="middle" fill="white" fontSize="10">認証情報収集</text>
        
        {/* 標的サービス */}
        <rect x="550" y="50" width="120" height="60" fill="#28a745" stroke="#1e7e34" strokeWidth="2" rx="5"/>
        <text x="610" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">標的サービス</text>
        <text x="610" y="90" textAnchor="middle" fill="white" fontSize="10">サイトB</text>
        
        {/* 認証情報リスト */}
        <rect x="250" y="150" width="220" height="100" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="360" y="170" textAnchor="middle" fill="#856404" fontSize="12" fontWeight="bold">漏洩認証情報リスト</text>
        <text x="270" y="190" fill="#856404" fontSize="10">user1@example.com:password123</text>
        <text x="270" y="205" fill="#856404" fontSize="10">admin@site.com:admin123</text>
        <text x="270" y="220" fill="#856404" fontSize="10">victim@email.com:qwerty</text>
        <text x="270" y="235" fill="#856404" fontSize="10">test@domain.com:123456</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        {/* データ漏洩 → 攻撃者 */}
        <line x1="170" y1="80" x2="290" y2="80" stroke="#dc3545" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="230" y="75" textAnchor="middle" fill="#dc3545" fontSize="10">①認証情報入手</text>
        
        {/* 攻撃者 → リスト */}
        <line x1="360" y1="110" x2="360" y2="140" stroke="#dc3545" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="380" y="130" fill="#dc3545" fontSize="10">②リスト化</text>
        
        {/* 攻撃フロー */}
        <line x1="470" y1="200" x2="540" y2="200" stroke="#dc3545" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="505" y="195" textAnchor="middle" fill="#dc3545" fontSize="10">③自動ログイン試行</text>
        
        {/* 攻撃 → 標的 */}
        <line x1="540" y1="150" x2="580" y2="110" stroke="#dc3545" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* 被害者アカウント */}
        <circle cx="650" cy="200" r="30" fill="#ffc107" stroke="#fd7e14" strokeWidth="2"/>
        <text x="650" y="205" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">被害者</text>
        
        {/* 成功矢印 */}
        <line x1="620" y1="170" x2="650" y2="170" stroke="#28a745" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="635" y="165" textAnchor="middle" fill="#28a745" fontSize="10">④成功</text>
        
        {/* 攻撃成功表示 */}
        <rect x="550" y="280" width="150" height="40" fill="#dc3545" stroke="#a71e2a" strokeWidth="2" rx="5"/>
        <text x="625" y="295" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🚨 アカウント乗っ取り</text>
        <text x="625" y="310" textAnchor="middle" fill="white" fontSize="10">不正アクセス成功</text>
        
        <line x1="625" y1="230" x2="625" y2="270" stroke="#dc3545" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      </svg>
    </div>
  );

  const renderSessionHijackingDiagram = () => (
    <div className="attack-diagram">
      <h4>🕸️ セッションハイジャック攻撃フロー</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* 正当なユーザー */}
        <circle cx="100" cy="80" r="40" fill="#28a745" stroke="#1e7e34" strokeWidth="2"/>
        <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">正当ユーザー</text>
        
        {/* Webサーバー */}
        <rect x="350" y="50" width="100" height="60" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Webサーバー</text>
        <text x="400" y="90" textAnchor="middle" fill="white" fontSize="10">example.com</text>
        
        {/* 攻撃者 */}
        <circle cx="100" cy="250" r="40" fill="#dc3545" stroke="#a71e2a" strokeWidth="2"/>
        <text x="100" y="255" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">攻撃者</text>
        
        {/* ネットワーク（公衆Wi-Fi） */}
        <ellipse cx="225" cy="165" rx="80" ry="40" fill="#ffc107" stroke="#fd7e14" strokeWidth="2" opacity="0.3"/>
        <text x="225" y="160" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">公衆Wi-Fi</text>
        <text x="225" y="175" textAnchor="middle" fill="#856404" fontSize="9">暗号化されていない</text>
        
        {/* セッションID */}
        <rect x="500" y="140" width="120" height="50" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="560" y="160" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">セッションID</text>
        <text x="560" y="175" textAnchor="middle" fill="#856404" fontSize="9">ABC123XYZ</text>
        
        {/* 矢印とフロー */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
          <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#28a745"/>
          </marker>
        </defs>
        
        {/* 1. 正常ログイン */}
        <path d="M 140 80 Q 250 60 350 80" stroke="#28a745" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)"/>
        <text x="245" y="55" textAnchor="middle" fill="#28a745" fontSize="9">①正常ログイン</text>
        
        {/* 2. セッションID発行 */}
        <line x1="450" y1="80" x2="500" y2="160" stroke="#007bff" strokeWidth="2" markerEnd="url(#arrow)"/>
        <text x="475" y="120" textAnchor="middle" fill="#007bff" fontSize="9">②セッションID発行</text>
        
        {/* 3. 通信傍受 */}
        <path d="M 140 100 Q 200 130 180 180" stroke="#dc3545" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
        <text x="160" y="145" textAnchor="middle" fill="#dc3545" fontSize="9">③通信傍受</text>
        
        {/* 4. セッションID盗取 */}
        <line x1="305" y1="165" x2="500" y2="165" stroke="#dc3545" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrow)"/>
        <text x="400" y="155" textAnchor="middle" fill="#dc3545" fontSize="9">④セッションID盗取</text>
        
        {/* 5. なりすましアクセス */}
        <path d="M 140 250 Q 300 280 350 100" stroke="#dc3545" strokeWidth="3" fill="none" markerEnd="url(#arrow)"/>
        <text x="280" y="290" textAnchor="middle" fill="#dc3545" fontSize="9">⑤なりすましアクセス</text>
        
        {/* 警告メッセージ */}
        <rect x="50" y="300" width="300" height="30" fill="#f8d7da" stroke="#f5c6cb" strokeWidth="1" rx="3"/>
        <text x="200" y="315" textAnchor="middle" fill="#721c24" fontSize="10">🚨 攻撃者が被害者になりすましてサービスにアクセス</text>
      </svg>
    </div>
  );

  const renderJWTAttackDiagram = () => (
    <div className="attack-diagram">
      <h4>🔓 JWT攻撃フロー（アルゴリズム変更攻撃）</h4>
      <svg viewBox="0 0 800 400" className="diagram-svg">
        {/* 正常なJWT */}
        <rect x="50" y="50" width="200" height="80" fill="#e7f3ff" stroke="#007bff" strokeWidth="2" rx="5"/>
        <text x="150" y="70" textAnchor="middle" fill="#0056b3" fontSize="11" fontWeight="bold">正常なJWTトークン</text>
        <text x="150" y="85" textAnchor="middle" fill="#0056b3" fontSize="9">Header: {`{"alg": "HS256"}`}</text>
        <text x="150" y="100" textAnchor="middle" fill="#0056b3" fontSize="9">Payload: {`{"role": "user"}`}</text>
        <text x="150" y="115" textAnchor="middle" fill="#0056b3" fontSize="9">Signature: [valid]</text>
        
        {/* 攻撃者の操作 */}
        <rect x="300" y="50" width="150" height="80" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="375" y="70" textAnchor="middle" fill="#856404" fontSize="11" fontWeight="bold">攻撃者の操作</text>
        <text x="375" y="85" textAnchor="middle" fill="#856404" fontSize="9">1. ヘッダー解析</text>
        <text x="375" y="100" textAnchor="middle" fill="#856404" fontSize="9">2. アルゴリズム変更</text>
        <text x="375" y="115" textAnchor="middle" fill="#856404" fontSize="9">3. 権限変更</text>
        
        {/* 改ざんされたJWT */}
        <rect x="500" y="50" width="200" height="80" fill="#f8d7da" stroke="#dc3545" strokeWidth="2" rx="5"/>
        <text x="600" y="70" textAnchor="middle" fill="#721c24" fontSize="11" fontWeight="bold">改ざんされたJWT</text>
        <text x="600" y="85" textAnchor="middle" fill="#721c24" fontSize="9">Header: {`{"alg": "none"}`}</text>
        <text x="600" y="100" textAnchor="middle" fill="#721c24" fontSize="9">Payload: {`{"role": "admin"}`}</text>
        <text x="600" y="115" textAnchor="middle" fill="#721c24" fontSize="9">Signature: [removed]</text>
        
        {/* JWTの構造詳細 */}
        <rect x="100" y="180" width="600" height="120" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="400" y="200" textAnchor="middle" fill="#2c3e50" fontSize="12" fontWeight="bold">JWT構造の詳細</text>
        
        {/* Header */}
        <rect x="120" y="220" width="150" height="60" fill="#e74c3c" stroke="#c0392b" strokeWidth="1" rx="3"/>
        <text x="195" y="235" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Header</text>
        <text x="195" y="250" textAnchor="middle" fill="white" fontSize="8">{`{"alg": "HS256"}`}</text>
        <text x="195" y="265" textAnchor="middle" fill="white" fontSize="8">↓</text>
        <text x="195" y="275" textAnchor="middle" fill="white" fontSize="8">{`{"alg": "none"}`}</text>
        
        {/* Payload */}
        <rect x="290" y="220" width="150" height="60" fill="#9b59b6" stroke="#8e44ad" strokeWidth="1" rx="3"/>
        <text x="365" y="235" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Payload</text>
        <text x="365" y="250" textAnchor="middle" fill="white" fontSize="8">{`{"role": "user"}`}</text>
        <text x="365" y="265" textAnchor="middle" fill="white" fontSize="8">↓</text>
        <text x="365" y="275" textAnchor="middle" fill="white" fontSize="8">{`{"role": "admin"}`}</text>
        
        {/* Signature */}
        <rect x="460" y="220" width="150" height="60" fill="#3498db" stroke="#2980b9" strokeWidth="1" rx="3"/>
        <text x="535" y="235" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Signature</text>
        <text x="535" y="250" textAnchor="middle" fill="white" fontSize="8">[valid signature]</text>
        <text x="535" y="265" textAnchor="middle" fill="white" fontSize="8">↓</text>
        <text x="535" y="275" textAnchor="middle" fill="white" fontSize="8">[removed]</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="jwt-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        <line x1="250" y1="90" x2="290" y2="90" stroke="#ffc107" strokeWidth="2" markerEnd="url(#jwt-arrow)"/>
        <line x1="450" y1="90" x2="490" y2="90" stroke="#dc3545" strokeWidth="2" markerEnd="url(#jwt-arrow)"/>
        
        {/* 攻撃結果 */}
        <rect x="250" y="320" width="300" height="50" fill="#dc3545" stroke="#a71e2a" strokeWidth="2" rx="5"/>
        <text x="400" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🚨 権限昇格攻撃成功</text>
        <text x="400" y="355" textAnchor="middle" fill="white" fontSize="10">署名検証なしで管理者権限を取得</text>
      </svg>
    </div>
  );

  const renderPasswordSprayingDiagram = () => (
    <div className="attack-diagram">
      <h4>🔫 パスワードスプレー攻撃フロー</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* 攻撃者 */}
        <circle cx="100" cy="100" r="40" fill="#dc3545" stroke="#a71e2a" strokeWidth="2"/>
        <text x="100" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">攻撃者</text>
        
        {/* 一般的なパスワードリスト */}
        <rect x="200" y="50" width="150" height="100" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="275" y="70" textAnchor="middle" fill="#856404" fontSize="11" fontWeight="bold">共通パスワード</text>
        <text x="220" y="90" fill="#856404" fontSize="9">• password</text>
        <text x="220" y="105" fill="#856404" fontSize="9">• 123456</text>
        <text x="220" y="120" fill="#856404" fontSize="9">• admin</text>
        <text x="220" y="135" fill="#856404" fontSize="9">• qwerty</text>
        
        {/* ターゲット企業 */}
        <rect x="450" y="30" width="120" height="40" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="510" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ターゲット企業</text>
        
        {/* ユーザーアカウント群 */}
        <g>
          <circle cx="450" cy="120" r="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1"/>
          <text x="450" y="125" textAnchor="middle" fill="white" fontSize="8">User1</text>
          
          <circle cx="500" cy="120" r="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1"/>
          <text x="500" y="125" textAnchor="middle" fill="white" fontSize="8">User2</text>
          
          <circle cx="550" cy="120" r="20" fill="#28a745" stroke="#1e7e34" strokeWidth="1"/>
          <text x="550" y="125" textAnchor="middle" fill="white" fontSize="8">User3</text>
          
          <circle cx="600" cy="120" r="20" fill="#ffc107" stroke="#fd7e14" strokeWidth="2"/>
          <text x="600" y="125" textAnchor="middle" fill="white" fontSize="8">Admin</text>
        </g>
        
        {/* 攻撃パターン */}
        <rect x="50" y="200" width="700" height="80" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="400" y="220" textAnchor="middle" fill="#2c3e50" fontSize="12" fontWeight="bold">攻撃パターン：1つのパスワードで全アカウントを試行</text>
        
        {/* タイムライン */}
        <line x1="100" y1="250" x2="700" y2="250" stroke="#6c757d" strokeWidth="2"/>
        
        {/* 試行1 */}
        <circle cx="150" cy="250" r="8" fill="#dc3545"/>
        <text x="150" y="265" textAnchor="middle" fill="#dc3545" fontSize="8">試行1</text>
        <text x="150" y="275" textAnchor="middle" fill="#dc3545" fontSize="7">"password"</text>
        
        {/* 試行2 */}
        <circle cx="250" cy="250" r="8" fill="#dc3545"/>
        <text x="250" y="265" textAnchor="middle" fill="#dc3545" fontSize="8">試行2</text>
        <text x="250" y="275" textAnchor="middle" fill="#dc3545" fontSize="7">"123456"</text>
        
        {/* 試行3 */}
        <circle cx="350" cy="250" r="8" fill="#dc3545"/>
        <text x="350" y="265" textAnchor="middle" fill="#dc3545" fontSize="8">試行3</text>
        <text x="350" y="275" textAnchor="middle" fill="#dc3545" fontSize="7">"admin"</text>
        
        {/* 成功 */}
        <circle cx="450" cy="250" r="12" fill="#28a745"/>
        <text x="450" y="255" textAnchor="middle" fill="white" fontSize="8">成功</text>
        <text x="450" y="270" textAnchor="middle" fill="#28a745" fontSize="8">発見！</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="spray-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        {/* 攻撃フロー矢印 */}
        <line x1="140" y1="100" x2="190" y2="100" stroke="#dc3545" strokeWidth="2" markerEnd="url(#spray-arrow)"/>
        <line x1="350" y1="100" x2="440" y2="100" stroke="#dc3545" strokeWidth="2" markerEnd="url(#spray-arrow)"/>
        
        {/* 成功矢印 */}
        <line x1="450" y1="230" x2="600" y2="140" stroke="#28a745" strokeWidth="3" markerEnd="url(#spray-arrow)"/>
        
        {/* 特徴説明 */}
        <rect x="450" y="200" width="300" height="60" fill="#e7f3ff" stroke="#007bff" strokeWidth="1" rx="3"/>
        <text x="600" y="215" textAnchor="middle" fill="#0056b3" fontSize="10" fontWeight="bold">パスワードスプレーの特徴</text>
        <text x="470" y="230" fill="#0056b3" fontSize="8">• アカウントロックアウトを回避</text>
        <text x="470" y="240" fill="#0056b3" fontSize="8">• 低頻度で長期間の攻撃</text>
        <text x="470" y="250" fill="#0056b3" fontSize="8">• 検知されにくい</text>
      </svg>
    </div>
  );

  const renderSocialEngineeringDiagram = () => (
    <div className="attack-diagram">
      <h4>🎭 ソーシャルエンジニアリング攻撃フロー</h4>
      <svg viewBox="0 0 800 400" className="diagram-svg">
        {/* 攻撃者 */}
        <circle cx="100" cy="80" r="40" fill="#dc3545" stroke="#a71e2a" strokeWidth="2"/>
        <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">攻撃者</text>
        
        {/* 情報収集フェーズ */}
        <rect x="200" y="40" width="140" height="80" fill="#ffc107" stroke="#fd7e14" strokeWidth="2" rx="5"/>
        <text x="270" y="60" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">情報収集</text>
        <text x="220" y="80" fill="white" fontSize="9">• SNS調査</text>
        <text x="220" y="95" fill="white" fontSize="9">• 会社情報</text>
        <text x="220" y="110" fill="white" fontSize="9">• 人間関係</text>
        
        {/* フィッシングメール */}
        <rect x="200" y="150" width="140" height="80" fill="#17a2b8" stroke="#138496" strokeWidth="2" rx="5"/>
        <text x="270" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">フィッシング</text>
        <text x="270" y="185" textAnchor="middle" fill="white" fontSize="9">緊急通知メール</text>
        <text x="220" y="200" fill="white" fontSize="8">「セキュリティ違反が</text>
        <text x="220" y="210" fill="white" fontSize="8">検出されました」</text>
        <text x="220" y="220" fill="white" fontSize="8">→ 偽サイトへ誘導</text>
        
        {/* 被害者 */}
        <circle cx="500" cy="80" r="40" fill="#28a745" stroke="#1e7e34" strokeWidth="2"/>
        <text x="500" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">被害者</text>
        
        {/* 偽ログインページ */}
        <rect x="420" y="150" width="160" height="100" fill="#f8d7da" stroke="#dc3545" strokeWidth="2" rx="5"/>
        <text x="500" y="170" textAnchor="middle" fill="#721c24" fontSize="11" fontWeight="bold">偽ログインページ</text>
        <rect x="440" y="180" width="120" height="15" fill="white" stroke="#ccc" strokeWidth="1"/>
        <text x="450" y="190" fill="#666" fontSize="8">ユーザー名</text>
        <rect x="440" y="200" width="120" height="15" fill="white" stroke="#ccc" strokeWidth="1"/>
        <text x="450" y="210" fill="#666" fontSize="8">パスワード</text>
        <rect x="460" y="220" width="80" height="20" fill="#dc3545" stroke="#a71e2a" strokeWidth="1" rx="3"/>
        <text x="500" y="232" textAnchor="middle" fill="white" fontSize="8">ログイン</text>
        
        {/* 認証情報盗取 */}
        <rect x="600" y="150" width="120" height="60" fill="#dc3545" stroke="#a71e2a" strokeWidth="2" rx="5"/>
        <text x="660" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">認証情報盗取</text>
        <text x="660" y="185" textAnchor="middle" fill="white" fontSize="9">ID: victim@email.com</text>
        <text x="660" y="200" textAnchor="middle" fill="white" fontSize="9">PW: mypassword123</text>
        
        {/* 心理的操作 */}
        <ellipse cx="350" cy="300" rx="100" ry="30" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" opacity="0.8"/>
        <text x="350" y="295" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">心理的操作</text>
        <text x="350" y="310" textAnchor="middle" fill="#856404" fontSize="9">恐怖・緊急性・権威性</text>
        
        {/* 矢印とフロー */}
        <defs>
          <marker id="social-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
          <marker id="info-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ffc107"/>
          </marker>
        </defs>
        
        {/* 情報収集 */}
        <line x1="140" y1="80" x2="190" y2="80" stroke="#ffc107" strokeWidth="2" markerEnd="url(#info-arrow)"/>
        <text x="165" y="75" textAnchor="middle" fill="#ffc107" fontSize="9">①調査</text>
        
        {/* フィッシングメール送信 */}
        <path d="M 340 190 Q 400 150 460 80" stroke="#17a2b8" strokeWidth="2" fill="none" markerEnd="url(#social-arrow)"/>
        <text x="400" y="135" textAnchor="middle" fill="#17a2b8" fontSize="9">②偽メール</text>
        
        {/* 偽サイト誘導 */}
        <line x1="500" y1="120" x2="500" y2="140" stroke="#dc3545" strokeWidth="2" markerEnd="url(#social-arrow)"/>
        <text x="520" y="135" fill="#dc3545" fontSize="9">③誘導</text>
        
        {/* 認証情報入力 */}
        <line x1="580" y1="190" x2="590" y2="180" stroke="#dc3545" strokeWidth="2" markerEnd="url(#social-arrow)"/>
        <text x="600" y="175" fill="#dc3545" fontSize="9">④入力</text>
        
        {/* 攻撃成功 */}
        <path d="M 660 150 Q 700 100 500 120" stroke="#dc3545" strokeWidth="3" fill="none" markerEnd="url(#social-arrow)" strokeDasharray="5,5"/>
        <text x="650" y="120" textAnchor="middle" fill="#dc3545" fontSize="9">⑤乗っ取り成功</text>
        
        {/* 警告 */}
        <rect x="50" y="350" width="700" height="30" fill="#f8d7da" stroke="#f5c6cb" strokeWidth="1" rx="3"/>
        <text x="400" y="365" textAnchor="middle" fill="#721c24" fontSize="10">🚨 技術的防御では対策困難。人的教育とプロセス改善が重要</text>
      </svg>
    </div>
  );

  const renderMITMAttackDiagram = () => (
    <div className="attack-diagram">
      <h4>🕷️ 中間者攻撃（MITM）フロー</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* ユーザー */}
        <circle cx="100" cy="150" r="40" fill="#28a745" stroke="#1e7e34" strokeWidth="2"/>
        <text x="100" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ユーザー</text>
        
        {/* 攻撃者（中間者） */}
        <rect x="300" y="100" width="100" height="100" fill="#dc3545" stroke="#a71e2a" strokeWidth="2" rx="5"/>
        <text x="350" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">攻撃者</text>
        <text x="350" y="140" textAnchor="middle" fill="white" fontSize="9">（中間者）</text>
        <text x="350" y="160" textAnchor="middle" fill="white" fontSize="8">偽Wi-Fi</text>
        <text x="350" y="175" textAnchor="middle" fill="white" fontSize="8">"Free-WiFi"</text>
        
        {/* 正規サーバー */}
        <rect x="600" y="120" width="100" height="60" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="650" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">正規サーバー</text>
        <text x="650" y="160" textAnchor="middle" fill="white" fontSize="9">bank.com</text>
        
        {/* 通信フロー */}
        <g>
          {/* ユーザー → 攻撃者 */}
          <path d="M 140 130 L 290 130" stroke="#ffc107" strokeWidth="3" fill="none"/>
          <text x="215" y="125" textAnchor="middle" fill="#ffc107" fontSize="9">①HTTP通信</text>
          <text x="215" y="140" textAnchor="middle" fill="#ffc107" fontSize="8">ID:user PW:pass123</text>
          
          {/* 攻撃者 → サーバー */}
          <path d="M 400 150 L 590 150" stroke="#28a745" strokeWidth="2" fill="none"/>
          <text x="495" y="145" textAnchor="middle" fill="#28a745" fontSize="9">②HTTPS通信</text>
          <text x="495" y="160" textAnchor="middle" fill="#28a745" fontSize="8">正常なリクエスト</text>
          
          {/* レスポンス */}
          <path d="M 590 170 L 400 170" stroke="#007bff" strokeWidth="2" fill="none"/>
          <text x="495" y="185" textAnchor="middle" fill="#007bff" fontSize="8">③レスポンス</text>
          
          <path d="M 290 170 L 140 170" stroke="#dc3545" strokeWidth="3" fill="none"/>
          <text x="215" y="185" textAnchor="middle" fill="#dc3545" fontSize="8">④改ざんレスポンス</text>
        </g>
        
        {/* 盗聴内容 */}
        <rect x="200" y="220" width="300" height="80" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="350" y="240" textAnchor="middle" fill="#856404" fontSize="11" fontWeight="bold">傍受された情報</text>
        <text x="220" y="260" fill="#856404" fontSize="9">• ログイン認証情報（ID/パスワード）</text>
        <text x="220" y="275" fill="#856404" fontSize="9">• セッションクッキー</text>
        <text x="220" y="290" fill="#856404" fontSize="9">• 個人情報・機密データ</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="mitm-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
          <marker id="normal-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#28a745"/>
          </marker>
        </defs>
        
        <line x1="290" y1="130" x2="280" y2="130" markerEnd="url(#mitm-arrow)"/>
        <line x1="400" y1="150" x2="410" y2="150" markerEnd="url(#normal-arrow)"/>
        <line x1="400" y1="170" x2="390" y2="170" markerEnd="url(#normal-arrow)"/>
        <line x1="290" y1="170" x2="280" y2="170" markerEnd="url(#mitm-arrow)"/>
        
        {/* 盗聴矢印 */}
        <line x1="350" y1="200" x2="350" y2="210" stroke="#dc3545" strokeWidth="2" markerEnd="url(#mitm-arrow)"/>
        
        {/* セキュリティ警告 */}
        <rect x="50" y="50" width="200" height="60" fill="#f8d7da" stroke="#f5c6cb" strokeWidth="2" rx="5"/>
        <text x="150" y="70" textAnchor="middle" fill="#721c24" fontSize="10" fontWeight="bold">⚠️ セキュリティ警告</text>
        <text x="150" y="85" textAnchor="middle" fill="#721c24" fontSize="9">暗号化されていない</text>
        <text x="150" y="100" textAnchor="middle" fill="#721c24" fontSize="9">HTTP通信</text>
        
        {/* 対策 */}
        <rect x="550" y="50" width="200" height="60" fill="#d4edda" stroke="#c3e6cb" strokeWidth="2" rx="5"/>
        <text x="650" y="70" textAnchor="middle" fill="#155724" fontSize="10" fontWeight="bold">🛡️ 対策</text>
        <text x="650" y="85" textAnchor="middle" fill="#155724" fontSize="9">HTTPS必須</text>
        <text x="650" y="100" textAnchor="middle" fill="#155724" fontSize="9">証明書確認</text>
      </svg>
    </div>
  );

  const renderDiagram = () => {
    switch (attackType) {
      case 'credential-stuffing':
        return renderCredentialStuffingDiagram();
      case 'session-hijacking':
        return renderSessionHijackingDiagram();
      case 'jwt-attacks':
        return renderJWTAttackDiagram();
      case 'password-spraying':
        return renderPasswordSprayingDiagram();
      case 'social-engineering':
        return renderSocialEngineeringDiagram();
      case 'mitm-attack':
        return renderMITMAttackDiagram();
      default:
        return <div>図解を選択してください</div>;
    }
  };

  return (
    <div className="attack-diagrams-container">
      {renderDiagram()}
    </div>
  );
};

export default AttackDiagrams;