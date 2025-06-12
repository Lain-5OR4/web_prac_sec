import React, { useState } from 'react';
import './App.css';
import BasicAuth from './components/BasicAuth';
import SessionAuth from './components/SessionAuth';
import JWTAuth from './components/JWTAuth';
import CognitoAuth from './components/CognitoAuth';
import VulnerabilityDemo from './components/VulnerabilityDemo';
import AttackDemo from './components/AttackDemo';
import StateDiagrams from './components/StateDiagrams';
import SessionDiagrams from './components/SessionDiagrams';
import StateSessionRelationship from './components/StateSessionRelationship';

type AuthMethod = 'stateful-stateless' | 'basic' | 'session' | 'jwt' | 'cognito' | 'vulnerabilities' | 'attacks';

function App() {
  const [activeTab, setActiveTab] = useState<AuthMethod>('stateful-stateless');

  const tabs: { key: AuthMethod; label: string }[] = [
    { key: 'stateful-stateless', label: 'ステート管理' },
    { key: 'basic', label: '基本認証' },
    { key: 'session', label: 'セッション認証' },
    { key: 'jwt', label: 'JWT認証' },
    { key: 'cognito', label: 'AWS Cognito' },
    { key: 'vulnerabilities', label: '脆弱性例' },
    { key: 'attacks', label: '乗っ取り攻撃' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'stateful-stateless':
        return (
          <div className="auth-demo">
            <h2>ステートフルとステートレスの基礎</h2>
            
            <div className="demo-explanation">
              <p>
                認証システムを理解する上で重要な概念「ステートフル」と「ステートレス」について、
                図解とともに学びましょう。
              </p>
            </div>

            <div className="state-concept-section">
              <h3>📊 概念の比較</h3>
              <StateDiagrams type="comparison" />
            </div>

            <div className="session-basics-section">
              <h3>🤔 セッションとは何か？</h3>
              <SessionDiagrams />
            </div>

            <div className="state-examples-section">
              <h3>🏪 ステートフル認証の仕組み</h3>
              <StateDiagrams type="stateful" />
              
              <h3>🌐 ステートレス認証の仕組み</h3>
              <StateDiagrams type="stateless" />
            </div>

            <StateSessionRelationship />

            <div className="demo-info">
              <h3>実際の選択基準</h3>
              
              <div className="feature-grid">
                <div className="feature-item">
                  <h4>🏪 ステートフルを選ぶべき場面</h4>
                  <ul>
                    <li>従来のWebアプリケーション</li>
                    <li>リアルタイムな状態管理が必要</li>
                    <li>厳密なセッション制御が重要</li>
                    <li>単一サーバーでの運用</li>
                    <li>即座のログアウト機能が必須</li>
                  </ul>
                </div>
                
                <div className="feature-item">
                  <h4>🌐 ステートレスを選ぶべき場面</h4>
                  <ul>
                    <li>API中心のアプリケーション</li>
                    <li>マイクロサービス</li>
                    <li>モバイルアプリ</li>
                    <li>大規模分散システム</li>
                    <li>CDN・エッジ活用が重要</li>
                  </ul>
                </div>
              </div>

              <h3>パフォーマンスへの影響</h3>
              <div className="performance-comparison">
                <div className="performance-item">
                  <h4>ステートフル</h4>
                  <p><strong>メモリ使用量:</strong> ユーザー数に比例して増加</p>
                  <p><strong>スケーラビリティ:</strong> セッション共有が課題</p>
                  <p><strong>レスポンス:</strong> セッション確認のオーバーヘッド</p>
                </div>
                
                <div className="performance-item">
                  <h4>ステートレス</h4>
                  <p><strong>メモリ使用量:</strong> 一定（状態保存なし）</p>
                  <p><strong>スケーラビリティ:</strong> 水平拡張が容易</p>
                  <p><strong>レスポンス:</strong> トークン検証のみ</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'basic':
        return <BasicAuth />;
      case 'session':
        return <SessionAuth />;
      case 'jwt':
        return <JWTAuth />;
      case 'cognito':
        return <CognitoAuth />;
      case 'vulnerabilities':
        return <VulnerabilityDemo />;
      case 'attacks':
        return <AttackDemo />;
      default:
        return <BasicAuth />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Web認証デモアプリケーション</h1>
        <p>React + Hono で学ぶ認証システムの実装とセキュリティ</p>
      </header>

      <nav className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>⚠️ このアプリケーションは講義用のデモです。本番環境では使用しないでください。</p>
      </footer>
    </div>
  );
}

export default App
