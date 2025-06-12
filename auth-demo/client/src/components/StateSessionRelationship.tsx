import React from 'react';

const StateSessionRelationship: React.FC = () => {
  return (
    <div className="relationship-explanation">
      <h2>セッションとステートの関係（まとめ）</h2>
      
      <div className="demo-explanation">
        <p>
          ここまでで「セッション」と「ステートフル/ステートレス」について学びました。
          これらの概念の関係を整理しましょう。
        </p>
      </div>

      <div className="relationship-content">
        <h3>🔗 セッションとステートの関係性</h3>
        
        <div className="concept-comparison">
          <div className="concept-item">
            <h4>📊 ステート（状態）</h4>
            <p>「誰がログインしているか」「何をしていたか」などの<strong>情報そのもの</strong></p>
            <ul>
              <li>ユーザーID: user001</li>
              <li>権限: 管理者</li>
              <li>カート: 商品3点</li>
              <li>設定: ダークモード</li>
            </ul>
          </div>
          <div className="concept-item">
            <h4>⏰ セッション（仕組み）</h4>
            <p>その状態情報を<strong>管理する仕組み・期間</strong></p>
            <ul>
              <li>ログインからログアウトまでの期間</li>
              <li>状態情報の保存場所（メモリ/DB）</li>
              <li>セッションIDによる識別</li>
              <li>タイムアウト管理</li>
            </ul>
          </div>
        </div>
        
        <div className="analogy-box">
          <h4>🏪 日常での例え</h4>
          <div className="analogy-grid">
            <div className="analogy-item">
              <strong>ステート（状態）：</strong>
              <p>あなたが「VIP会員」で「Tシャツ3枚選択中」で「クレジット決済希望」という情報</p>
            </div>
            <div className="analogy-item">
              <strong>セッション（仕組み）：</strong>
              <p>店員があなたを覚えている期間と、その情報を管理するシステム</p>
            </div>
          </div>
        </div>

        <div className="auth-relationship-section">
          <h3>🔄 ステートフル/ステートレスとセッションの関係</h3>
          
          <div className="auth-comparison">
            <div className="auth-type-item">
              <h4>🏪 ステートフル認証</h4>
              <div className="auth-flow">
                <div className="flow-item">
                  <span className="flow-label">セッション管理:</span>
                  <span className="flow-desc">サーバー側で管理</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">データ送信:</span>
                  <span className="flow-desc">セッションID → サーバーに送信</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">状態保存:</span>
                  <span className="flow-desc">ステート（状態）→ サーバーで保存・管理</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">利点:</span>
                  <span className="flow-desc">サーバーが全てを制御</span>
                </div>
              </div>
            </div>
            
            <div className="auth-type-item">
              <h4>🌐 ステートレス認証</h4>
              <div className="auth-flow">
                <div className="flow-item">
                  <span className="flow-label">セッション管理:</span>
                  <span className="flow-desc">「セッション」概念は使わない</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">データ送信:</span>
                  <span className="flow-desc">JWT等のトークン → クライアントに送信</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">状態保存:</span>
                  <span className="flow-desc">ステート（状態）→ トークン内に含める</span>
                </div>
                <div className="flow-item">
                  <span className="flow-label">利点:</span>
                  <span className="flow-desc">サーバーは状態を保持しない</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-box">
          <h3>📋 理解のポイント</h3>
          <ul>
            <li><strong>ステート</strong>は「情報」、<strong>セッション</strong>は「管理の仕組み」</li>
            <li><strong>ステートフル</strong>では「セッション」でサーバーが状態管理</li>
            <li><strong>ステートレス</strong>では「セッション」を使わずトークンで状態を含める</li>
            <li>どちらも最終的には「ユーザーの状態を管理する」という同じ目的</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StateSessionRelationship;