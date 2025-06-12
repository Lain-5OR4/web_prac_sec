import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

// Mermaidの初期化を一度だけ実行
let isInitialized = false;

const MermaidDiagram: React.FC<MermaidDiagramProps> = React.memo(({ chart, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    if (!isInitialized) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          sequence: {
            showSequenceNumbers: true,
            wrap: true,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            actorFontSize: 14,
            actorFontFamily: '"Open Sans", sans-serif',
            noteFontSize: 11,
            noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
            messageFontSize: 12,
            messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif'
          },
          themeVariables: {
            primaryColor: '#007bff',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#0056b3',
            lineColor: '#6c757d',
            actorBkg: '#f8f9fa',
            actorBorder: '#007bff',
            actorTextColor: '#495057',
            signalColor: '#495057',
            signalTextColor: '#495057',
            labelBoxBkgColor: '#e9ecef',
            labelBoxBorderColor: '#007bff',
            noteBkgColor: '#fff3cd',
            noteBorderColor: '#ffc107',
            noteTextColor: '#856404',
            activationBkgColor: '#e3f2fd',
            activationBorderColor: '#2196f3'
          }
        });
        isInitialized = true;
      } catch (initError) {
        console.error('Mermaid initialization error:', initError);
      }
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const renderMermaid = async () => {
      if (!chart) return;

      try {
        setError(null);
        setIsRendered(false);
        setSvgContent('');

        // 一意のIDを生成してレンダリング
        const uniqueId = `mermaid-${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Mermaidでレンダリング（DOMに直接追加せず、SVG文字列を取得）
        const { svg } = await mermaid.render(uniqueId, chart);
        
        if (isCancelled) return;

        // SVGコンテンツをstateに設定
        setSvgContent(svg);
        setIsRendered(true);

      } catch (renderError) {
        if (!isCancelled) {
          console.error('Mermaid rendering error:', renderError);
          const errorMessage = renderError instanceof Error ? renderError.message : String(renderError);
          setError(errorMessage);
          setIsRendered(false);
        }
      }
    };

    const timer = setTimeout(renderMermaid, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="mermaid-container">
        <div className="mermaid-error">
          <p>シーケンス図の描画に失敗しました</p>
          <details>
            <summary>詳細</summary>
            <pre>{error}</pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid-container">
      <div ref={containerRef} className="mermaid" id={id}>
        {isRendered && svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <div className="mermaid-loading">シーケンス図を読み込み中...</div>
        )}
      </div>
    </div>
  );
});

// 表示名を設定
MermaidDiagram.displayName = 'MermaidDiagram';

export default MermaidDiagram;