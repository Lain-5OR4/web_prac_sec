import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class MermaidErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('MermaidErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mermaid-container">
          <div className="mermaid-error">
            <p>シーケンス図の表示中にエラーが発生しました</p>
            <details>
              <summary>詳細</summary>
              <pre>{this.state.error?.message || 'Unknown error'}</pre>
            </details>
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              再試行
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MermaidErrorBoundary;