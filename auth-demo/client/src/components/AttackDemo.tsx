import React, { useState } from 'react';
import AttackDiagrams from './AttackDiagrams';

interface AttackScenario {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface AttackLog {
  timestamp: string;
  action: string;
  status: 'success' | 'failure' | 'info';
  details: string;
}

const AttackDemo: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = useState<string>('credential-stuffing');
  const [attackLogs, setAttackLogs] = useState<AttackLog[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [victimAccount] = useState({
    username: 'victim@example.com',
    password: 'password123',
    sessionId: 'session_abc123xyz',
    jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  });

  const attackScenarios: AttackScenario[] = [
    {
      id: 'credential-stuffing',
      name: 'クレデンシャルスタッフィング攻撃',
      description: '漏洩したアカウント情報を使い回して、他のサービスへの不正ログインを試行する攻撃',
      severity: 'high'
    },
    {
      id: 'session-hijacking',
      name: 'セッションハイジャック',
      description: '正当なユーザーのセッションIDを盗み、そのユーザーになりすます攻撃',
      severity: 'critical'
    },
    {
      id: 'jwt-attacks',
      name: 'JWT攻撃',
      description: 'JWTトークンの脆弱性を悪用した攻撃（アルゴリズム変更、署名なし等）',
      severity: 'high'
    },
    {
      id: 'password-spraying',
      name: 'パスワードスプレー攻撃',
      description: '一般的なパスワードを多数のアカウントに対して試行する攻撃',
      severity: 'medium'
    },
    {
      id: 'social-engineering',
      name: 'ソーシャルエンジニアリング',
      description: '人間の心理を利用してパスワードや機密情報を取得する攻撃',
      severity: 'critical'
    },
    {
      id: 'mitm-attack',
      name: '中間者攻撃（MITM）',
      description: '通信経路に割り込んで認証情報を傍受する攻撃',
      severity: 'high'
    }
  ];

  const addLog = (action: string, status: 'success' | 'failure' | 'info', details: string) => {
    const newLog: AttackLog = {
      timestamp: new Date().toLocaleTimeString(),
      action,
      status,
      details
    };
    setAttackLogs(prev => [newLog, ...prev].slice(0, 10)); // 最新10件のみ保持
  };

  const simulateCredentialStuffing = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', 'クレデンシャルスタッフィング攻撃を開始');
    
    const commonCredentials = [
      { email: 'admin@example.com', password: 'admin123' },
      { email: 'user@test.com', password: 'password' },
      { email: 'victim@example.com', password: 'password123' },
      { email: 'test@sample.com', password: '123456' }
    ];

    for (let i = 0; i < commonCredentials.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const cred = commonCredentials[i];
      addLog(
        'ログイン試行', 
        'info', 
        `${cred.email}:${cred.password} でログイン試行中...`
      );
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (cred.email === victimAccount.username && cred.password === victimAccount.password) {
        addLog('🚨 攻撃成功', 'success', `${cred.email} でログインに成功！アカウントが乗っ取られました`);
        break;
      } else {
        addLog('ログイン失敗', 'failure', `${cred.email} での認証に失敗`);
      }
    }
    
    setIsAttacking(false);
  };

  const simulateSessionHijacking = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', 'セッションハイジャック攻撃を開始');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('パケット傍受', 'info', '公衆Wi-Fiでの通信を監視中...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addLog('セッションID発見', 'success', `セッションID "${victimAccount.sessionId}" を発見`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('セッション盗用', 'success', '攻撃者が被害者のセッションIDを使用してアクセス');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addLog('🚨 乗っ取り完了', 'success', '被害者になりすましてサービスにアクセス成功');
    
    setIsAttacking(false);
  };

  const simulateJWTAttack = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', 'JWT攻撃を開始');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('JWTトークン解析', 'info', 'JWTトークンの構造を解析中...');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    addLog('アルゴリズム変更', 'info', 'ヘッダーのアルゴリズムを "none" に変更');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addLog('署名削除', 'info', 'トークンから署名部分を削除');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('権限昇格', 'success', 'ペイロードの権限を管理者に変更');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addLog('🚨 攻撃成功', 'success', '改ざんしたJWTで管理者権限を取得');
    
    setIsAttacking(false);
  };

  const simulatePasswordSpraying = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', 'パスワードスプレー攻撃を開始');
    
    const commonPasswords = ['password', '123456', 'admin', 'password123'];
    const userList = ['user1@corp.com', 'admin@corp.com', 'sales@corp.com', 'victim@example.com'];
    
    for (const password of commonPasswords) {
      addLog('パスワード試行', 'info', `共通パスワード "${password}" で全アカウントに試行`);
      
      for (const user of userList) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (user === victimAccount.username && password === victimAccount.password) {
          addLog('🚨 攻撃成功', 'success', `${user} のパスワードが "${password}" であることを発見`);
          setIsAttacking(false);
          return;
        } else {
          addLog('試行', 'failure', `${user}:${password} - 失敗`);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // レート制限回避のため間隔を空ける
    }
    
    setIsAttacking(false);
  };

  const simulateSocialEngineering = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', 'ソーシャルエンジニアリング攻撃を開始');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('情報収集', 'info', 'SNSから対象者の個人情報を収集中...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addLog('フィッシングメール', 'info', '緊急のパスワード変更を装ったメールを送信');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('偽サイト誘導', 'success', '被害者が偽のログインページにアクセス');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    addLog('認証情報取得', 'success', '被害者がフィッシングサイトで認証情報を入力');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addLog('🚨 攻撃成功', 'success', 'ユーザー名とパスワードを取得、アカウント乗っ取り完了');
    
    setIsAttacking(false);
  };

  const simulateMITMAttack = async () => {
    setIsAttacking(true);
    setAttackLogs([]);
    
    addLog('攻撃開始', 'info', '中間者攻撃（MITM）を開始');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('悪意のあるWi-Fi設置', 'info', '公衆の場に偽のWi-Fiアクセスポイントを設置');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    addLog('被害者接続', 'success', '被害者が偽のWi-Fiに接続');
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    addLog('通信傍受', 'info', 'HTTP通信（非暗号化）を監視中...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog('認証情報傍受', 'success', 'ログインフォームから認証情報を傍受');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    addLog('🚨 攻撃成功', 'success', '傍受した認証情報で正規サービスにログイン');
    
    setIsAttacking(false);
  };

  const executeAttack = () => {
    switch (selectedAttack) {
      case 'credential-stuffing':
        simulateCredentialStuffing();
        break;
      case 'session-hijacking':
        simulateSessionHijacking();
        break;
      case 'jwt-attacks':
        simulateJWTAttack();
        break;
      case 'password-spraying':
        simulatePasswordSpraying();
        break;
      case 'social-engineering':
        simulateSocialEngineering();
        break;
      case 'mitm-attack':
        simulateMITMAttack();
        break;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#28a745';
      case 'medium': return '#ffc107';
      case 'high': return '#fd7e14';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const selectedScenario = attackScenarios.find(s => s.id === selectedAttack);

  return (
    <div className="auth-demo">
      <h2>アカウント乗っ取り攻撃デモ</h2>
      
      <div className="demo-explanation vulnerability-warning">
        <p>
          <strong>⚠️ 重要な警告:</strong> 以下は教育目的のみのデモンストレーションです。
          実際のシステムに対してこれらの攻撃を行うことは犯罪行為です。
          このデモは認証システムのセキュリティの重要性を理解するためのものです。
        </p>
      </div>

      {/* 攻撃シナリオ選択 */}
      <div className="attack-scenario-selector">
        <h3>攻撃シナリオを選択</h3>
        <div className="scenario-grid">
          {attackScenarios.map(scenario => (
            <div 
              key={scenario.id}
              className={`scenario-card ${selectedAttack === scenario.id ? 'selected' : ''}`}
              onClick={() => setSelectedAttack(scenario.id)}
            >
              <div className="scenario-header">
                <h4>{scenario.name}</h4>
                <span 
                  className="severity-badge"
                  style={{ backgroundColor: getSeverityColor(scenario.severity) }}
                >
                  {scenario.severity.toUpperCase()}
                </span>
              </div>
              <p>{scenario.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 選択された攻撃の詳細 */}
      {selectedScenario && (
        <div className="selected-attack-details">
          <h3>選択された攻撃: {selectedScenario.name}</h3>
          <p>{selectedScenario.description}</p>
          
          {/* 攻撃フロー図解 */}
          <div className="attack-flow-diagram">
            <AttackDiagrams attackType={selectedAttack} />
          </div>
          
          <div className="victim-info">
            <h4>🎯 標的アカウント情報</h4>
            <div className="victim-details">
              <div className="info-item">
                <strong>ユーザー名:</strong> {victimAccount.username}
              </div>
              <div className="info-item">
                <strong>パスワード:</strong> {'*'.repeat(victimAccount.password.length)} (実際: {victimAccount.password})
              </div>
              {selectedAttack === 'session-hijacking' && (
                <div className="info-item">
                  <strong>セッションID:</strong> {victimAccount.sessionId}
                </div>
              )}
              {selectedAttack === 'jwt-attacks' && (
                <div className="info-item">
                  <strong>JWTトークン:</strong> {victimAccount.jwtToken}...
                </div>
              )}
            </div>
          </div>

          <div className="attack-controls">
            <button 
              onClick={executeAttack}
              disabled={isAttacking}
              className="attack-button"
            >
              {isAttacking ? '攻撃実行中...' : '攻撃を実行'}
            </button>
            
            {attackLogs.length > 0 && (
              <button 
                onClick={() => setAttackLogs([])}
                className="secondary-btn"
                disabled={isAttacking}
              >
                ログをクリア
              </button>
            )}
          </div>
        </div>
      )}

      {/* 攻撃ログ */}
      {attackLogs.length > 0 && (
        <div className="attack-log">
          <h4>🔍 攻撃ログ</h4>
          <div className="log-content">
            {attackLogs.map((log, index) => (
              <div key={index} className={`log-entry ${log.status}`}>
                <span className="log-timestamp">[{log.timestamp}]</span>
                <span className="log-action">{log.action}:</span>
                <span className="log-details">{log.details}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 対策とベストプラクティス */}
      <div className="countermeasures-section">
        <h3>🛡️ 各攻撃への対策</h3>
        
        <div className="countermeasures-grid">
          <div className="countermeasure-item">
            <h4>クレデンシャルスタッフィング対策</h4>
            <ul>
              <li>多要素認証（MFA）の実装</li>
              <li>レート制限とアカウントロックアウト</li>
              <li>CAPTCHAの導入</li>
              <li>異常なログインパターンの検知</li>
              <li>パスワード要件の強化</li>
            </ul>
          </div>

          <div className="countermeasure-item">
            <h4>セッションハイジャック対策</h4>
            <ul>
              <li>HTTPS通信の強制</li>
              <li>HTTPOnly・Secure Cookie属性</li>
              <li>セッションIDの定期更新</li>
              <li>IPアドレス・User-Agentの検証</li>
              <li>SameSite Cookie属性</li>
            </ul>
          </div>

          <div className="countermeasure-item">
            <h4>JWT攻撃対策</h4>
            <ul>
              <li>強力な署名アルゴリズムの使用</li>
              <li>"none"アルゴリズムの禁止</li>
              <li>適切な有効期限の設定</li>
              <li>JWT署名の厳密な検証</li>
              <li>機密情報をペイロードに含めない</li>
            </ul>
          </div>

          <div className="countermeasure-item">
            <h4>パスワードスプレー対策</h4>
            <ul>
              <li>アカウントレベルでのレート制限</li>
              <li>IP単位での制限</li>
              <li>異常なログインパターンの監視</li>
              <li>一般的なパスワードの禁止</li>
              <li>ログイン試行の監査ログ</li>
            </ul>
          </div>

          <div className="countermeasure-item">
            <h4>ソーシャルエンジニアリング対策</h4>
            <ul>
              <li>セキュリティ教育・啓発</li>
              <li>フィッシング対策ツール</li>
              <li>メール認証（DKIM、SPF）</li>
              <li>URLフィルタリング</li>
              <li>疑わしいメールの報告体制</li>
            </ul>
          </div>

          <div className="countermeasure-item">
            <h4>中間者攻撃対策</h4>
            <ul>
              <li>HTTPS/TLSの必須化</li>
              <li>証明書ピニング</li>
              <li>公衆Wi-Fiの使用注意</li>
              <li>VPNの使用推奨</li>
              <li>HSTS（HTTP Strict Transport Security）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 総合的なセキュリティ対策 */}
      <div className="comprehensive-security">
        <h3>🏰 総合的なセキュリティ対策</h3>
        
        <div className="security-layers">
          <div className="security-layer">
            <h4>1. 予防（Prevention）</h4>
            <ul>
              <li>強力な認証システムの実装</li>
              <li>セキュアなコーディングプラクティス</li>
              <li>定期的なセキュリティ教育</li>
              <li>パッチ管理と脆弱性対応</li>
            </ul>
          </div>

          <div className="security-layer">
            <h4>2. 検知（Detection）</h4>
            <ul>
              <li>ログ監視とSIEM</li>
              <li>異常検知システム</li>
              <li>侵入検知システム（IDS）</li>
              <li>リアルタイム脅威インテリジェンス</li>
            </ul>
          </div>

          <div className="security-layer">
            <h4>3. 対応（Response）</h4>
            <ul>
              <li>インシデント対応計画</li>
              <li>自動的なアカウント保護</li>
              <li>緊急時の通信手順</li>
              <li>フォレンジック調査体制</li>
            </ul>
          </div>

          <div className="security-layer">
            <h4>4. 回復（Recovery）</h4>
            <ul>
              <li>バックアップ・復旧手順</li>
              <li>事業継続計画（BCP）</li>
              <li>被害者への適切な対応</li>
              <li>再発防止策の実装</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="legal-notice">
        <h3>⚖️ 法的注意事項</h3>
        <p>
          不正アクセス行為は「不正アクセス行為の禁止等に関する法律」により処罰されます。
          他人のアカウントに不正にアクセスすることは犯罪行為であり、
          懲役や罰金が科せられる可能性があります。
          セキュリティテストは必ず許可された環境で、適切な手続きを経て実施してください。
        </p>
      </div>
    </div>
  );
};

export default AttackDemo;