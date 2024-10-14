// src/ScreenCapture.tsx
import React, { useState, useRef } from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScreenCaptureProps {
    onCapture: (rect: Rect) => void;
  }

function ScreenCapture(props: ScreenCaptureProps ){

  const [isSelecting, setIsSelecting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSelecting(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setRect({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting) {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const newRect = {
        x: Math.min(startX, currentX),
        y: Math.min(startY, currentY),
        width: Math.abs(startX - currentX),
        height: Math.abs(startY - currentY),
      };
      setRect(newRect);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (rect) {
      props.onCapture(rect); // Передаём выбранную область
    }
  };

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        cursor: "crosshair",
        zIndex: 9999,
      }}
    >
      {rect && (
        <div
          style={{
            position: "absolute",
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            border: "2px solid red",
          }}
        />
      )}
    </div>
  );
};

export default ScreenCapture;
