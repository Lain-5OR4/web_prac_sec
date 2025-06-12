import React, { useState, useRef, useEffect } from 'react';
import LazyMermaidDiagram from './LazyMermaidDiagram';

interface ZoomableMermaidDiagramProps {
  chart: string;
  id: string;
}

const ZoomableMermaidDiagram: React.FC<ZoomableMermaidDiagramProps> = ({ chart, id }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      // フルスクリーン時はズームをリセット
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
    }
  };

  // ESCキーでフルスクリーン終了
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  const containerClass = isFullscreen 
    ? 'mermaid-viewer-fullscreen' 
    : 'mermaid-viewer-normal';

  const cursorStyle = zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';

  return (
    <>
      <div className={containerClass}>
        <div className="mermaid-controls">
          <div className="zoom-controls">
            <button onClick={handleZoomOut} disabled={zoomLevel <= 0.5} title="縮小">
              🔍-
            </button>
            <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={handleZoomIn} disabled={zoomLevel >= 3} title="拡大">
              🔍+
            </button>
            <button onClick={handleResetZoom} title="リセット">
              ⚡
            </button>
          </div>
          <div className="view-controls">
            <button onClick={handleFullscreen} title={isFullscreen ? "通常表示" : "フルスクリーン"}>
              {isFullscreen ? '📱' : '🖥️'}
            </button>
            {isFullscreen && (
              <button onClick={() => setIsFullscreen(false)} title="閉じる" className="close-btn">
                ✕
              </button>
            )}
          </div>
        </div>

        <div 
          ref={containerRef}
          className="mermaid-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: cursorStyle }}
        >
          <div
            ref={contentRef}
            className="mermaid-content"
            style={{
              transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
              transformOrigin: '0 0'
            }}
          >
            <LazyMermaidDiagram chart={chart} id={id} />
          </div>
        </div>

        {isFullscreen && (
          <div className="fullscreen-info">
            <p>💡 操作方法: Ctrl+マウスホイールでズーム | ドラッグで移動 | ESCで終了</p>
          </div>
        )}
      </div>

      {isFullscreen && <div className="fullscreen-backdrop" onClick={() => setIsFullscreen(false)} />}
    </>
  );
};

export default ZoomableMermaidDiagram;