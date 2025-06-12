import React, { Suspense, lazy } from 'react';
import MermaidErrorBoundary from './MermaidErrorBoundary';

// MermaidDiagramを遅延ロード
const MermaidDiagram = lazy(() => import('./MermaidDiagram'));

interface LazyMermaidDiagramProps {
  chart: string;
  id: string;
}

const LazyMermaidDiagram: React.FC<LazyMermaidDiagramProps> = ({ chart, id }) => {
  return (
    <MermaidErrorBoundary>
      <Suspense
        fallback={
          <div className="mermaid-container">
            <div className="mermaid-loading">
              シーケンス図コンポーネントを読み込み中...
            </div>
          </div>
        }
      >
        <MermaidDiagram chart={chart} id={id} />
      </Suspense>
    </MermaidErrorBoundary>
  );
};

export default LazyMermaidDiagram;