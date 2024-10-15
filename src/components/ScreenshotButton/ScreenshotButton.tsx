import React from "react";
import html2canvas from "html2canvas";
import "./ScreenshotButton.css";

const ScreenshotButton: React.FC = () => {
  function handleScreenshot() {
    const selectionBox = document.createElement("div");
    selectionBox.className = "selection-box";
    document.body.appendChild(selectionBox);
    let startX: number = 0;
    let startY: number = 0;
    let isDrawing = false;

    // ------------------------------------------------
    const mouseDownHandler = (e: MouseEvent) => {
      startX = e.pageX;
      startY = e.pageY;
      isDrawing = true;

      selectionBox.style.left = `${startX}px`;
      selectionBox.style.top = `${startY}px`;
      selectionBox.style.width = "0";
      selectionBox.style.height = "0";
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDrawing) return;

      const currentX = e.pageX;
      const currentY = e.pageY;

      const width = currentX - startX;
      const height = currentY - startY;

      selectionBox.style.width = `${Math.abs(width)}px`;
      selectionBox.style.height = `${Math.abs(height)}px`;
      selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
      selectionBox.style.top = `${height < 0 ? currentY : startY}px`;
    };

    const mouseUpHandler = () => {
      isDrawing = false;
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      const rect = selectionBox.getBoundingClientRect();
      document.body.removeChild(selectionBox);
      takeSelectedScreenshot(rect)
    };
    // ------------------------------------------------

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

  }

  function takeSelectedScreenshot(rect: DOMRect) {
    chrome.tabs.captureVisibleTab({ format: "png" }, function (screenshotUrl) {
      const img = new Image();
      img.src = screenshotUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(
          img,
          rect.left, // x-координата обрезки
          rect.top, // y-координата обрезки
          rect.width, // Ширина обрезки
          rect.height, // Высота обрезки
          0, // x-координата на canvas
          0, // y-координата на canvas
          canvas.width,
          canvas.height
        );

        const croppedScreenshotUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = croppedScreenshotUrl;
        link.download = "screenshot.png";
        link.click();
      };
    });
  }

  return (
    <button
      onClick={handleScreenshot} // TODO
      id="captureButton"
      className="main_button"
    >
      Screenshot
    </button>
  );
};

export default ScreenshotButton;
