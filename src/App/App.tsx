import React, { useState } from "react";
import styles from 'App.module.css'
import ScreenCapture from "../components/ScreenCapture";


function App() {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCaptureArea = (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    setIsCapturing(false);

    // Использование Chrome API для захвата экрана
    chrome.desktopCapture.chooseDesktopMedia(
      ["screen", "window"],
      async (streamId) => {
        if (!streamId) {
          console.error("Не удалось получить доступ к экрану.");
          return;
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: streamId,
            } as any,
          });

          const video = document.createElement("video");
          video.srcObject = stream;

          // После того как видео загружено, создаем canvas и обрезаем его
          video.onloadedmetadata = () => {
            video.play();

            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");

            if (context) {
              // Рисуем видео на Canvas
              context.drawImage(
                video,
                0,
                0,
                video.videoWidth,
                video.videoHeight
              );

              // Обрезаем Canvas по выбранной области
              const croppedCanvas = document.createElement("canvas");
              croppedCanvas.width = rect.width;
              croppedCanvas.height = rect.height;

              const croppedContext = croppedCanvas.getContext("2d");
              croppedContext?.drawImage(
                canvas,
                rect.x, // Координаты начала обрезки по X
                rect.y, // Координаты начала обрезки по Y
                rect.width,
                rect.height,
                0,
                0,
                rect.width,
                rect.height
              );

              // Преобразуем обрезанный canvas в Blob и отправляем на сервер
              croppedCanvas.toBlob(async (blob) => {
                if (blob) {
                  const formData = new FormData();
                  formData.append("screenshot", blob, "screenshot.png");

                  await fetch("http://localhost:5555/image/upload", {
                    method: "POST",
                    body: formData,
                  });
                }
              }, "image/png");

              // Останавливаем стрим, чтобы прекратить захват видео
              stream.getTracks().forEach((track) => track.stop());
            }
          };
        } catch (error) {
          console.error("Ошибка при захвате экрана:", error);
        }
      }
    );
  };


  return (
    <div className={styles.app_bg}>
      <h1>Math-Help AI</h1>
      <button onClick={() => setIsCapturing(true)}>Сделать скриншот</button>
      {isCapturing && <ScreenCapture onCapture={handleCaptureArea} />}
    </div>
  );
}

export default App;
