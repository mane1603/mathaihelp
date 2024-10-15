// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Screenshot Extension Installed");
});

// background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);
  if (message.type === "captureSelection") {
    const { x, y, width, height } = message.rect;

    chrome.tabs.captureVisibleTab({ format: "png" }, (screenshotUrl) => {
      fetch(screenshotUrl)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob)) // Используем createImageBitmap вместо Image()
        .then(imageBitmap => {
          const offscreenCanvas = new OffscreenCanvas(width, height);
          const ctx = offscreenCanvas.getContext("2d");

          // Рисуем изображение с учетом выделенной области
          ctx?.drawImage(imageBitmap, x, y, width, height, 0, 0, width, height);

          // Получаем обрезанное изображение в формате Base64
          offscreenCanvas.convertToBlob().then(croppedBlob => {
            const reader = new FileReader();
            reader.readAsDataURL(croppedBlob);
            reader.onloadend = () => {
              const croppedScreenshotUrl = reader.result;

              // Отправляем ссылку на обрезанное изображение обратно
              function send() {
                chrome.runtime.sendMessage(
                  {
                    type: "screenshotTaken",
                    screenshotUrl: croppedScreenshotUrl
                  },
                  (response) => {
                    if (chrome.runtime.lastError) {
                      // An error means the content script is not ready, wait a bit and retry
                      setTimeout(() => send(), 100);
                    } else {
                      // No error means the message was sent successfully
                      console.log("Message sent successfully: ", {
                        type: "screenshotTaken",
                        screenshotUrl: croppedScreenshotUrl
                      });
                    }
                  }
                );
              }
              send();

              // chrome.runtime.sendMessage({
              //   type: "screenshotTaken",
              //   screenshotUrl: croppedScreenshotUrl
              // });
              
            };
          });
        })
        .catch(error => console.error("Ошибка при получении изображения:", error));
    });
  }
  return true;
});

export {}
