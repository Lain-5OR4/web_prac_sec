import React from 'react';

const SessionDiagrams: React.FC = () => {
  const renderSessionBasicsDiagram = () => (
    <div className="state-diagram">
      <h4>🔄 セッションの基本概念</h4>
      <svg viewBox="0 0 800 300" className="diagram-svg">
        {/* HTTPの問題 */}
        <rect x="50" y="50" width="300" height="100" fill="#f8d7da" stroke="#dc3545" strokeWidth="2" rx="5"/>
        <text x="200" y="70" textAnchor="middle" fill="#721c24" fontSize="12" fontWeight="bold">❌ HTTPの問題</text>
        <text x="70" y="90" fill="#721c24" fontSize="10">ブラウザ「マイページ見せて」</text>
        <text x="70" y="105" fill="#721c24" fontSize="10">サーバー「あなた誰ですか？」</text>
        <text x="70" y="120" fill="#721c24" fontSize="10">→ 毎回忘れてしまう！</text>
        <text x="70" y="135" fill="#721c24" fontSize="9">（ステートレスな性質）</text>
        
        {/* セッションの解決 */}
        <rect x="450" y="50" width="300" height="100" fill="#d4edda" stroke="#28a745" strokeWidth="2" rx="5"/>
        <text x="600" y="70" textAnchor="middle" fill="#155724" fontSize="12" fontWeight="bold">✅ セッションで解決</text>
        <text x="470" y="90" fill="#155724" fontSize="10">ブラウザ「マイページ見せて（ID:ABC123）」</text>
        <text x="470" y="105" fill="#155724" fontSize="10">サーバー「ABC123さんですね！どうぞ」</text>
        <text x="470" y="120" fill="#155724" fontSize="10">→ 覚えていてくれる！</text>
        <text x="470" y="135" fill="#155724" fontSize="9">（セッション管理）</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="session-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#007bff"/>
          </marker>
        </defs>
        
        <line x1="360" y1="100" x2="440" y2="100" stroke="#007bff" strokeWidth="3" markerEnd="url(#session-arrow)"/>
        <text x="400" y="95" textAnchor="middle" fill="#007bff" fontSize="10" fontWeight="bold">セッション機能</text>
        
        {/* 比喩説明 */}
        <rect x="150" y="200" width="500" height="80" fill="#fff3cd" stroke="#ffc107" strokeWidth="1" rx="3"/>
        <text x="400" y="220" textAnchor="middle" fill="#856404" fontSize="12" fontWeight="bold">🏪 日常生活での例え</text>
        <text x="170" y="240" fill="#856404" fontSize="10">お店の店員さんがあなたを覚えていてくれる状況と同じ</text>
        <text x="170" y="255" fill="#856404" fontSize="10">「さっきの○○の商品を見てた方ですね！」</text>
        <text x="170" y="270" fill="#856404" fontSize="10">→ 一連の買い物（セッション）として記憶</text>
      </svg>
    </div>
  );

  const renderSessionLifecycleDiagram = () => (
    <div className="state-diagram">
      <h4>🔄 セッションのライフサイクル</h4>
      <svg viewBox="0 0 800 400" className="diagram-svg">
        {/* 1. ログイン */}
        <circle cx="100" cy="80" r="35" fill="#28a745" stroke="#1e7e34" strokeWidth="2"/>
        <text x="100" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">1. ログイン</text>
        <text x="100" y="95" textAnchor="middle" fill="white" fontSize="8">認証成功</text>
        
        {/* 2. セッション作成 */}
        <rect x="200" y="50" width="100" height="60" fill="#007bff" stroke="#0056b3" strokeWidth="2" rx="5"/>
        <text x="250" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2. セッション作成</text>
        <text x="250" y="85" textAnchor="middle" fill="white" fontSize="9">ID: ABC123</text>
        <text x="250" y="100" textAnchor="middle" fill="white" fontSize="9">データ保存</text>
        
        {/* 3. セッション利用 */}
        <ellipse cx="400" cy="80" rx="60" ry="35" fill="#17a2b8" stroke="#138496" strokeWidth="2"/>
        <text x="400" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3. セッション利用</text>
        <text x="400" y="90" textAnchor="middle" fill="white" fontSize="9">ページ閲覧</text>
        
        {/* 4. セッション終了 */}
        <rect x="550" y="50" width="100" height="60" fill="#6c757d" stroke="#495057" strokeWidth="2" rx="5"/>
        <text x="600" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4. セッション終了</text>
        <text x="600" y="85" textAnchor="middle" fill="white" fontSize="9">ログアウト</text>
        <text x="600" y="100" textAnchor="middle" fill="white" fontSize="9">データ削除</text>
        
        {/* 矢印 */}
        <defs>
          <marker id="lifecycle-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc3545"/>
          </marker>
        </defs>
        
        <line x1="135" y1="80" x2="190" y2="80" stroke="#dc3545" strokeWidth="2" markerEnd="url(#lifecycle-arrow)"/>
        <line x1="300" y1="80" x2="340" y2="80" stroke="#dc3545" strokeWidth="2" markerEnd="url(#lifecycle-arrow)"/>
        <line x1="460" y1="80" x2="540" y2="80" stroke="#dc3545" strokeWidth="2" markerEnd="url(#lifecycle-arrow)"/>
        
        {/* セッションデータ詳細 */}
        <rect x="150" y="150" width="500" height="120" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="400" y="170" textAnchor="middle" fill="#2c3e50" fontSize="12" fontWeight="bold">セッションデータの中身</text>
        
        {/* データ項目 */}
        <rect x="180" y="185" width="120" height="70" fill="#e7f3ff" stroke="#007bff" strokeWidth="1" rx="3"/>
        <text x="240" y="200" textAnchor="middle" fill="#0056b3" fontSize="10" fontWeight="bold">基本情報</text>
        <text x="190" y="215" fill="#0056b3" fontSize="9">SessionID: ABC123</text>
        <text x="190" y="230" fill="#0056b3" fontSize="9">UserID: user001</text>
        <text x="190" y="245" fill="#0056b3" fontSize="9">Role: admin</text>
        
        <rect x="320" y="185" width="120" height="70" fill="#fff3cd" stroke="#ffc107" strokeWidth="1" rx="3"/>
        <text x="380" y="200" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">時刻情報</text>
        <text x="330" y="215" fill="#856404" fontSize="9">LoginTime: 10:00</text>
        <text x="330" y="230" fill="#856404" fontSize="9">LastAccess: 10:30</text>
        <text x="330" y="245" fill="#856404" fontSize="9">Expires: 11:00</text>
        
        <rect x="460" y="185" width="120" height="70" fill="#f8d7da" stroke="#dc3545" strokeWidth="1" rx="3"/>
        <text x="520" y="200" textAnchor="middle" fill="#721c24" fontSize="10" fontWeight="bold">追加データ</text>
        <text x="470" y="215" fill="#721c24" fontSize="9">Cart: [商品A, 商品B]</text>
        <text x="470" y="230" fill="#721c24" fontSize="9">Language: ja</text>
        <text x="470" y="245" fill="#721c24" fontSize="9">Theme: dark</text>
        
        {/* タイムアウト説明 */}
        <rect x="200" y="300" width="400" height="60" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1" rx="3"/>
        <text x="400" y="320" textAnchor="middle" fill="#856404" fontSize="11" fontWeight="bold">⏰ セッションタイムアウト</text>
        <text x="220" y="340" fill="#856404" fontSize="9">• 30分間アクセスがないと自動削除</text>
        <text x="220" y="355" fill="#856404" fontSize="9">• セキュリティとリソース節約のため</text>
      </svg>
    </div>
  );

  const renderSessionStorageDiagram = () => (
    <div className="state-diagram">
      <h4>💾 セッションの保存場所</h4>
      <svg viewBox="0 0 800 350" className="diagram-svg">
        {/* サーバーメモリ */}
        <rect x="50" y="50" width="200" height="80" fill="#e7f3ff" stroke="#007bff" strokeWidth="2" rx="5"/>
        <text x="150" y="70" textAnchor="middle" fill="#0056b3" fontSize="12" fontWeight="bold">💾 サーバーメモリ</text>
        <text x="70" y="90" fill="#0056b3" fontSize="9">✅ 高速アクセス</text>
        <text x="70" y="105" fill="#0056b3" fontSize="9">❌ 再起動で消失</text>
        <text x="70" y="120" fill="#0056b3" fontSize="9">❌ 複数サーバーで共有困難</text>
        
        {/* データベース */}
        <rect x="300" y="50" width="200" height="80" fill="#fff3cd" stroke="#ffc107" strokeWidth="2" rx="5"/>
        <text x="400" y="70" textAnchor="middle" fill="#856404" fontSize="12" fontWeight="bold">🗄️ データベース</text>
        <text x="320" y="90" fill="#856404" fontSize="9">✅ 永続化</text>
        <text x="320" y="105" fill="#856404" fontSize="9">✅ 複数サーバーで共有</text>
        <text x="320" y="120" fill="#856404" fontSize="9">❌ アクセスが重い</text>
        
        {/* Redis */}
        <rect x="550" y="50" width="200" height="80" fill="#d4edda" stroke="#28a745" strokeWidth="2" rx="5"/>
        <text x="650" y="70" textAnchor="middle" fill="#155724" fontSize="12" fontWeight="bold">⚡ Redis</text>
        <text x="570" y="90" fill="#155724" fontSize="9">✅ 高速 + 永続化</text>
        <text x="570" y="105" fill="#155724" fontSize="9">✅ 複数サーバーで共有</text>
        <text x="570" y="120" fill="#155724" fontSize="9">✅ 自動期限切れ</text>
        
        {/* 実装例 */}
        <rect x="100" y="180" width="600" height="140" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" rx="5"/>
        <text x="400" y="200" textAnchor="middle" fill="#2c3e50" fontSize="12" fontWeight="bold">実装例</text>
        
        {/* メモリ実装 */}
        <rect x="120" y="210" width="180" height="90" fill="#e7f3ff" stroke="#007bff" strokeWidth="1" rx="3"/>
        <text x="210" y="225" textAnchor="middle" fill="#0056b3" fontSize="10" fontWeight="bold">JavaScript (Node.js)</text>
        <text x="130" y="245" fill="#0056b3" fontSize="8" fontFamily="monospace">{`const sessions = {`}</text>
        <text x="130" y="260" fill="#0056b3" fontSize="8" fontFamily="monospace">{`  "ABC123": {`}</text>
        <text x="130" y="275" fill="#0056b3" fontSize="8" fontFamily="monospace">{`    userId: "user001",`}</text>
        <text x="130" y="290" fill="#0056b3" fontSize="8" fontFamily="monospace">{`    loginTime: Date.now()`}</text>
        <text x="130" y="305" fill="#0056b3" fontSize="8" fontFamily="monospace">{`  }`}</text>
        
        {/* DB実装 */}
        <rect x="310" y="210" width="180" height="90" fill="#fff3cd" stroke="#ffc107" strokeWidth="1" rx="3"/>
        <text x="400" y="225" textAnchor="middle" fill="#856404" fontSize="10" fontWeight="bold">SQL</text>
        <text x="320" y="245" fill="#856404" fontSize="8" fontFamily="monospace">{`CREATE TABLE sessions (`}</text>
        <text x="320" y="260" fill="#856404" fontSize="8" fontFamily="monospace">{`  session_id VARCHAR(50),`}</text>
        <text x="320" y="275" fill="#856404" fontSize="8" fontFamily="monospace">{`  user_id VARCHAR(20),`}</text>
        <text x="320" y="290" fill="#856404" fontSize="8" fontFamily="monospace">{`  created_at TIMESTAMP`}</text>
        <text x="320" y="305" fill="#856404" fontSize="8" fontFamily="monospace">{`);`}</text>
        
        {/* Redis実装 */}
        <rect x="500" y="210" width="180" height="90" fill="#d4edda" stroke="#28a745" strokeWidth="1" rx="3"/>
        <text x="590" y="225" textAnchor="middle" fill="#155724" fontSize="10" fontWeight="bold">Redis</text>
        <text x="510" y="245" fill="#155724" fontSize="8" fontFamily="monospace">SET session:ABC123</text>
        <text x="510" y="260" fill="#155724" fontSize="8" fontFamily="monospace">    "user001"</text>
        <text x="510" y="275" fill="#155724" fontSize="8" fontFamily="monospace">    EX 3600</text>
        <text x="510" y="290" fill="#155724" fontSize="8" fontFamily="monospace"># 1時間で自動削除</text>
        
        {/* 推奨度 */}
        <text x="210" y="340" textAnchor="middle" fill="#6c757d" fontSize="9">推奨度: ⭐⭐</text>
        <text x="400" y="340" textAnchor="middle" fill="#6c757d" fontSize="9">推奨度: ⭐⭐⭐</text>
        <text x="590" y="340" textAnchor="middle" fill="#6c757d" fontSize="9">推奨度: ⭐⭐⭐⭐⭐</text>
      </svg>
    </div>
  );

  return (
    <div className="session-diagrams-container">
      <div className="auth-demo">
        <h2>セッションとは何か？</h2>
        
        <div className="demo-explanation">
          <p>
            「セッション」は認証システムの基礎概念です。お店の店員さんがあなたを覚えているように、
            Webサーバーがユーザーを「記憶」する仕組みを図解で理解しましょう。
          </p>
        </div>

        <div className="session-basics-section">
          <h3>🤔 なぜセッションが必要？</h3>
          {renderSessionBasicsDiagram()}
          
          <div className="concept-explanation">
            <h4>HTTPの特徴</h4>
            <p>
              HTTP通信は<strong>「ステートレス」</strong>な性質を持ちます。
              つまり、サーバーは前回のやり取りを覚えていません。
              これは効率的な反面、ユーザーの状態管理には不便です。
            </p>
            
            <h4>セッションによる解決</h4>
            <p>
              セッション機能により、サーバーは「この人は先ほどログインした○○さん」と
              識別できるようになります。これにより継続的なサービス提供が可能になります。
            </p>
          </div>
        </div>

        <div className="session-lifecycle-section">
          <h3>🔄 セッションの一生</h3>
          {renderSessionLifecycleDiagram()}
          
          <div className="lifecycle-explanation">
            <h4>1. セッション開始</h4>
            <p>ユーザーがログインに成功すると、サーバーは一意のセッションIDを生成し、ユーザー情報と関連付けて保存します。</p>
            
            <h4>2. セッション利用</h4>
            <p>以降のリクエストでセッションIDを送信することで、サーバーはユーザーを識別し、適切なレスポンスを返します。</p>
            
            <h4>3. セッション終了</h4>
            <p>ログアウトまたはタイムアウトにより、セッションデータは削除され、そのIDは無効になります。</p>
          </div>
        </div>

        <div className="session-storage-section">
          <h3>💾 セッションの保存場所</h3>
          {renderSessionStorageDiagram()}
          
          <div className="storage-explanation">
            <h4>保存場所の選択基準</h4>
            <ul>
              <li><strong>開発・小規模:</strong> サーバーメモリで十分</li>
              <li><strong>本格運用:</strong> データベースまたはRedis推奨</li>
              <li><strong>高トラフィック:</strong> Redis一択（高速+永続化）</li>
            </ul>
            
            <h4>実装時の注意点</h4>
            <ul>
              <li>セッションIDは推測困難な文字列にする</li>
              <li>適切な有効期限を設定する（通常30分〜2時間）</li>
              <li>HTTPS通信でセッションIDを保護する</li>
              <li>定期的な不要セッションのクリーンアップ</li>
            </ul>
          </div>
        </div>

        <div className="demo-info">
          <h3>よくある質問と回答</h3>
          
          <div className="faq-section">
            <div className="faq-item">
              <h4>Q: セッションIDが盗まれるとどうなる？</h4>
              <p>A: 攻撃者があなたになりすましてサービスを利用できてしまいます（セッションハイジャック）。HTTPS通信とHttpOnlyクッキーで対策しましょう。</p>
            </div>
            
            <div className="faq-item">
              <h4>Q: ブラウザを閉じてもセッションは残る？</h4>
              <p>A: はい、通常は残ります。セキュリティのため、共用PCでは必ずログアウトボタンを押してください。</p>
            </div>
            
            <div className="faq-item">
              <h4>Q: 複数のタブで同じサイトを開いたら？</h4>
              <p>A: 同じセッションを共有します。一つのタブでログアウトすると、他のタブでもログアウト状態になります。</p>
            </div>
            
            <div className="faq-item">
              <h4>Q: なぜタイムアウトがあるの？</h4>
              <p>A: セキュリティとサーバーリソース節約のためです。放置されたセッションの悪用を防ぎ、メモリ使用量も抑制できます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDiagrams;