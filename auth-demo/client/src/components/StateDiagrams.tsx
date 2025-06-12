import React from 'react';

interface StateDiagramProps {
  type: 'stateful' | 'stateless' | 'comparison';
}

const StateDiagrams: React.FC<StateDiagramProps> = ({ type }) => {
  const renderStatefulDiagram = () => (
    <div className="state-diagram">
      <h4>🏪 ステートフル認証（セッション認証）</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* クライアント */}
        <rect x="50" y="50" width="100" height="80" fill="#28a745" stroke="#1e7e34" strokeWidth="2" rx="5"/>
        <text x="100" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">クライアント</text>
        <text x="100" y="95" textAnchor="middle" fill="white" fontSize="10">ブラウザ</text>
        <text x="100" y="110" textAnchor="middle" fill="white" fontSize="9">セッションID保持</text>
        
        {/* サーバー */}
        <rect x="350" y="50" width="100" height="80" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Webサーバー</text>
        <text x="400" y="95" textAnchor="middle" fill="white" fontSize="10">状態を記憶</text>
        <text x="400" y="110" textAnchor="middle" fill="white" fontSize="9">セッション管理</text>
        
        {/* セッションストレージ */}
        <rect x="550" y="50" width="150" height="80" fill="#ffc107" stroke="#fd7e14" strokeWidth="2" rx="5"/>
        <text x="625" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">セッションストア</text>
        <text x="625" y="95" textAnchor="middle" fill="white" fontSize="10">状態データ保存</text>
        
        {/* セッションデータ詳細 */}
        <rect x="550" y="140" width="150" height="100" fill="#fff3cd" stroke="#ffc107" strokeWidth="1" rx="3"/>
        <text x="625" y="155" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">セッションデータ</text>
        <text x="565" y="175" fill="#856404" fontSize="9">SessionID: ABC123</text>
        <text x="565" y="190" fill="#856404" fontSize="9">UserID: user001</text>
        <text x="565" y="205" fill="#856404" fontSize="9">LoginTime: 10:30</text>
        <text x="565" y="220" fill="#856404" fontSize="9">LastAccess: 10:45</text>
        
        {/* 通信フロー */}
        <defs>
          <marker id="state-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        {/* 1. ログイン要求 */}
        <line x1="150" y1="70" x2="340" y2="70" stroke="#28a745" strokeWidth="2" markerEnd="url(#state-arrow)"/>
        <text x="245" y="65" textAnchor="middle" fill="#28a745" fontSize="9">①ログイン要求</text>
        
        {/* 2. セッション作成 */}
        <line x1="450" y1="85" x2="540" y2="85" stroke="#007bff" strokeWidth="2" markerEnd="url(#state-arrow)"/>
        <text x="495" y="80" textAnchor="middle" fill="#007bff" fontSize="9">②セッション作成</text>
        
        {/* 3. セッションID返却 */}
        <line x1="340" y1="100" x2="150" y2="100" stroke="#ffc107" strokeWidth="2" markerEnd="url(#state-arrow)"/>
        <text x="245" y="115" textAnchor="middle" fill="#ffc107" fontSize="9">③セッションID(Cookie)</text>
        
        {/* 4. 以降のリクエスト */}
        <path d="M 100 130 Q 400 180 400 130" stroke="#dc3545" strokeWidth="2" fill="none" markerEnd="url(#state-arrow)"/>
        <text x="250" y="170" textAnchor="middle" fill="#dc3545" fontSize="9">④以降のリクエスト（+SessionID）</text>
        
        {/* 5. セッション確認 */}
        <line x1="450" y1="110" x2="540" y2="140" stroke="#007bff" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="495" y="130" textAnchor="middle" fill="#007bff" fontSize="8">⑤セッション確認</text>
        
        {/* 特徴説明 */}
        <rect x="50" y="270" width="350" height="60" fill="#e7f3ff" stroke="#007bff" strokeWidth="1" rx="3"/>
        <text x="225" y="285" textAnchor="middle" fill="#0056b3" fontSize="11" fontWeight="bold">ステートフルの特徴</text>
        <text x="70" y="305" fill="#0056b3" fontSize="9">• サーバーが状態を記憶・管理</text>
        <text x="70" y="320" fill="#0056b3" fontSize="9">• セッションストレージが必要</text>
      </svg>
    </div>
  );

  const renderStatelessDiagram = () => (
    <div className="state-diagram">
      <h4>🌐 ステートレス認証（JWT認証）</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* クライアント */}
        <rect x="50" y="50" width="100" height="80" fill="#28a745" stroke="#1e7e34" strokeWidth="2" rx="5"/>
        <text x="100" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">クライアント</text>
        <text x="100" y="95" textAnchor="middle" fill="white" fontSize="10">ブラウザ</text>
        <text x="100" y="110" textAnchor="middle" fill="white" fontSize="9">JWT保持</text>
        
        {/* サーバー */}
        <rect x="350" y="50" width="100" height="80" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Webサーバー</text>
        <text x="400" y="95" textAnchor="middle" fill="white" fontSize="10">状態なし</text>
        <text x="400" y="110" textAnchor="middle" fill="white" fontSize="9">毎回検証</text>
        
        {/* JWT詳細 */}
        <rect x="550" y="50" width="180" height="120" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="640" y="70" textAnchor="middle" fill="#856404" fontSize="12" fontWeight="bold">JWTトークン</text>
        
        {/* JWT構造 */}
        <rect x="570" y="80" width="40" height="20" fill="#e74c3c" rx="2"/>
        <text x="590" y="92" textAnchor="middle" fill="white" fontSize="8">Header</text>
        
        <rect x="620" y="80" width="40" height="20" fill="#9b59b6" rx="2"/>
        <text x="640" y="92" textAnchor="middle" fill="white" fontSize="8">Payload</text>
        
        <rect x="670" y="80" width="40" height="20" fill="#3498db" rx="2"/>
        <text x="690" y="92" textAnchor="middle" fill="white" fontSize="8">Signature</text>
        
        <text x="640" y="115" textAnchor="middle" fill="#856404" fontSize="9">自己完結型データ</text>
        <text x="575" y="130" fill="#856404" fontSize="8">• ユーザー情報</text>
        <text x="575" y="145" fill="#856404" fontSize="8">• 権限情報</text>
        <text x="575" y="160" fill="#856404" fontSize="8">• 有効期限</text>
        
        {/* 通信フロー */}
        <defs>
          <marker id="stateless-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        {/* 1. ログイン要求 */}
        <line x1="150" y1="70" x2="340" y2="70" stroke="#28a745" strokeWidth="2" markerEnd="url(#stateless-arrow)"/>
        <text x="245" y="65" textAnchor="middle" fill="#28a745" fontSize="9">①ログイン要求</text>
        
        {/* 2. JWT生成 */}
        <line x1="450" y1="85" x2="540" y2="85" stroke="#007bff" strokeWidth="2" markerEnd="url(#stateless-arrow)"/>
        <text x="495" y="80" textAnchor="middle" fill="#007bff" fontSize="9">②JWT生成</text>
        
        {/* 3. JWT返却 */}
        <line x1="340" y1="100" x2="150" y2="100" stroke="#ffc107" strokeWidth="2" markerEnd="url(#stateless-arrow)"/>
        <text x="245" y="115" textAnchor="middle" fill="#ffc107" fontSize="9">③JWT返却</text>
        
        {/* 4. 以降のリクエスト */}
        <path d="M 100 130 Q 400 200 400 130" stroke="#dc3545" strokeWidth="2" fill="none" markerEnd="url(#stateless-arrow)"/>
        <text x="250" y="180" textAnchor="middle" fill="#dc3545" fontSize="9">④以降のリクエスト（+JWT）</text>
        
        {/* 5. JWT検証のみ */}
        <circle cx="400" cy="180" r="15" fill="#17a2b8" stroke="#138496" strokeWidth="2"/>
        <text x="400" y="185" textAnchor="middle" fill="white" fontSize="8">検証</text>
        <text x="430" y="185" fill="#17a2b8" fontSize="8">⑤JWT署名検証のみ</text>
        
        {/* 特徴説明 */}
        <rect x="50" y="250" width="350" height="80" fill="#e7f3ff" stroke="#007bff" strokeWidth="1" rx="3"/>
        <text x="225" y="270" textAnchor="middle" fill="#0056b3" fontSize="11" fontWeight="bold">ステートレスの特徴</text>
        <text x="70" y="290" fill="#0056b3" fontSize="9">• サーバーは状態を保持しない</text>
        <text x="70" y="305" fill="#0056b3" fontSize="9">• 各リクエストが独立</text>
        <text x="70" y="320" fill="#0056b3" fontSize="9">• 必要な情報はすべてトークンに含む</text>
        
        {/* ストレージなし表示 */}
        <text x="400" y="220" textAnchor="middle" fill="#6c757d" fontSize="10">❌ セッションストレージ不要</text>
      </svg>
    </div>
  );

  const renderComparisonDiagram = () => (
    <div className="state-diagram">
      <h4>⚖️ ステートフル vs ステートレス 比較</h4>
      <svg viewBox="0 0 800 450" className="diagram-svg">
        {/* ステートフル側 */}
        <rect x="50" y="30" width="320" height="180" fill="#e7f3ff" stroke="#007bff" strokeWidth="2" rx="5"/>
        <text x="210" y="50" textAnchor="middle" fill="#0056b3" fontSize="14" fontWeight="bold">ステートフル（セッション）</text>
        
        {/* ステートフル構成 */}
        <rect x="80" y="70" width="60" height="40" fill="#28a745" stroke="#1e7e34" strokeWidth="1" rx="3"/>
        <text x="110" y="92" textAnchor="middle" fill="white" fontSize="9">Client</text>
        
        <rect x="180" y="70" width="60" height="40" fill="#007bff" stroke="#0056b3" strokeWidth="1" rx="3"/>
        <text x="210" y="92" textAnchor="middle" fill="white" fontSize="9">Server</text>
        
        <rect x="280" y="70" width="60" height="40" fill="#ffc107" stroke="#fd7e14" strokeWidth="1" rx="3"/>
        <text x="310" y="85" textAnchor="middle" fill="white" fontSize="8">Session</text>
        <text x="310" y="100" textAnchor="middle" fill="white" fontSize="8">Store</text>
        
        {/* ステートフル接続線 */}
        <line x1="140" y1="90" x2="170" y2="90" stroke="#333" strokeWidth="1"/>
        <line x1="240" y1="90" x2="270" y2="90" stroke="#333" strokeWidth="1"/>
        
        {/* ステートフル特徴 */}
        <text x="70" y="130" fill="#0056b3" fontSize="10" fontWeight="bold">特徴:</text>
        <text x="70" y="145" fill="#0056b3" fontSize="9">✓ サーバーが状態管理</text>
        <text x="70" y="160" fill="#0056b3" fontSize="9">✓ 即座の無効化可能</text>
        <text x="70" y="175" fill="#0056b3" fontSize="9">✗ スケーリング困難</text>
        <text x="70" y="190" fill="#0056b3" fontSize="9">✗ メモリ使用量大</text>
        
        {/* ステートレス側 */}
        <rect x="430" y="30" width="320" height="180" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="590" y="50" textAnchor="middle" fill="#856404" fontSize="14" fontWeight="bold">ステートレス（JWT）</text>
        
        {/* ステートレス構成 */}
        <rect x="460" y="70" width="60" height="40" fill="#28a745" stroke="#1e7e34" strokeWidth="1" rx="3"/>
        <text x="490" y="92" textAnchor="middle" fill="white" fontSize="9">Client</text>
        
        <rect x="560" y="70" width="60" height="40" fill="#007bff" stroke="#0056b3" strokeWidth="1" rx="3"/>
        <text x="590" y="92" textAnchor="middle" fill="white" fontSize="9">Server</text>
        
        <text x="660" y="92" textAnchor="middle" fill="#6c757d" fontSize="9">❌ 状態保存なし</text>
        
        {/* ステートレス接続線 */}
        <line x1="520" y1="90" x2="550" y2="90" stroke="#333" strokeWidth="1"/>
        
        {/* JWT表現 */}
        <rect x="460" y="120" width="160" height="20" fill="#17a2b8" stroke="#138496" strokeWidth="1" rx="2"/>
        <text x="540" y="132" textAnchor="middle" fill="white" fontSize="8">JWT Token (自己完結)</text>
        
        {/* ステートレス特徴 */}
        <text x="450" y="155" fill="#856404" fontSize="10" fontWeight="bold">特徴:</text>
        <text x="450" y="170" fill="#856404" fontSize="9">✓ 高いスケーラビリティ</text>
        <text x="450" y="185" fill="#856404" fontSize="9">✓ メモリ効率良い</text>
        <text x="450" y="200" fill="#856404" fontSize="9">✗ トークン無効化困難</text>
        
        {/* パフォーマンス比較 */}
        <rect x="100" y="250" width="600" height="150" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="400" y="270" textAnchor="middle" fill="#2c3e50" fontSize="12" fontWeight="bold">パフォーマンス・スケーラビリティ比較</text>
        
        {/* グラフ軸 */}
        <line x1="150" y1="350" x2="650" y2="350" stroke="#333" strokeWidth="1"/>
        <line x1="150" y1="350" x2="150" y2="290" stroke="#333" strokeWidth="1"/>
        
        <text x="140" y="295" textAnchor="end" fill="#333" fontSize="8">高</text>
        <text x="140" y="345" textAnchor="end" fill="#333" fontSize="8">低</text>
        <text x="400" y="365" textAnchor="middle" fill="#333" fontSize="8">同時接続ユーザー数</text>
        
        {/* ステートフルのパフォーマンス曲線 */}
        <path d="M 180 340 Q 300 320 450 300 Q 550 290 620 270" stroke="#dc3545" strokeWidth="3" fill="none"/>
        <text x="300" y="315" fill="#dc3545" fontSize="9">ステートフル</text>
        <text x="300" y="325" fill="#dc3545" fontSize="8">(メモリ使用量増加)</text>
        
        {/* ステートレスのパフォーマンス線 */}
        <line x1="180" y1="325" x2="620" y2="320" stroke="#28a745" strokeWidth="3"/>
        <text x="400" y="315" fill="#28a745" fontSize="9">ステートレス</text>
        <text x="400" y="325" fill="#28a745" fontSize="8">(一定性能維持)</text>
        
        {/* スケーリング限界点 */}
        <line x1="450" y1="250" x2="450" y2="350" stroke="#ffc107" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="455" y="280" fill="#ffc107" fontSize="8">スケーリング</text>
        <text x="455" y="290" fill="#ffc107" fontSize="8">限界点</text>
      </svg>
    </div>
  );

  const renderDiagram = () => {
    switch (type) {
      case 'stateful':
        return renderStatefulDiagram();
      case 'stateless':
        return renderStatelessDiagram();
      case 'comparison':
        return renderComparisonDiagram();
      default:
        return <div>図解タイプを選択してください</div>;
    }
  };

  return (
    <div className="state-diagrams-container">
      {renderDiagram()}
    </div>
  );
};

export default StateDiagrams;