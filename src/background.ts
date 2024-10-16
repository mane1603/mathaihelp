// background.js
import axios from "axios";

async function sendRequest(imgURL: string) {
  const response = await axios
    .post("http://localhost:5555/image/upload", {
      url: imgURL,
    })
  return response
}


chrome.runtime.onInstalled.addListener(() => {
  console.log("Screenshot Extension Installed");
});


// background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startAuth') {
    const authUrl = 'http://localhost:5555/auth/google'; // URL для инициации OAuth

    chrome.identity.launchWebAuthFlow({
      url: authUrl,
      interactive: true
    }, (redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error('Ошибка при аутентификации:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError });
        return;
      }

      // Здесь можешь извлечь токен или данные пользователя из redirectUrl
      console.log('Redirect URL:', redirectUrl);
      sendResponse({ success: true, redirectUrl });
    });

    // Указывает Chrome, что ответ будет асинхронным
    return true;
  }
});




// background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message.type);
  if (message.type === "captureSelection") {
    const { x, y, width, height } = message.rect;

    if (!message.rect) return;

    chrome.tabs.captureVisibleTab({ format: "png" }, (screenshotUrl) => {
      fetch(screenshotUrl)
        .then((response) => response.blob())
        .then((blob) => createImageBitmap(blob)) // Используем createImageBitmap вместо Image()
        .then((imageBitmap) => {
          const offscreenCanvas = new OffscreenCanvas(width, height);
          const ctx = offscreenCanvas.getContext("2d");

          // Рисуем изображение с учетом выделенной области
          ctx?.drawImage(imageBitmap, x, y, width, height, 0, 0, width, height);

          // Получаем обрезанное изображение в формате Base64
          offscreenCanvas.convertToBlob().then( (croppedBlob) => {
            const reader = new FileReader();
            reader.readAsDataURL(croppedBlob);
            reader.onloadend =  async () => {
              const croppedScreenshotUrl = reader.result?.toString();

              if (croppedScreenshotUrl) {
                send('Loading...', 'startDisplay');
                sendRequest(croppedScreenshotUrl).then((result) => {
                  console.log(result);
                  send(result.data.gptResponse, 'responseSuccess');
                })
              }else{
                console.log('croppedScreenshotUrl does not exist');
              }

              // Отправляем ответ от сервера обратно в контент

              function send(message: any, messageType: string) {
                chrome.runtime.sendMessage(
                  {
                    type: messageType,
                    response: message,
                  }).then(
                  (res) => {
                    if (chrome.runtime.lastError) {
                      // An error means the content script is not ready, wait a bit and retry
                      setTimeout(() => send(message, messageType), 400);
                    } else {
                      // No error means the message was sent successfully
                      console.log("Message sent successfully from background: ", {
                        type: messageType,
                        response: message,
                      });
                    }
                  }
                );
              }
              // send();

              // chrome.runtime.sendMessage({
              //   type: "screenshotTaken",
              //   screenshotUrl: croppedScreenshotUrl
              // });
            };
          });
        })
        .catch((error) =>
          console.error("Ошибка при получении изображения:", error)
        );
    });
  }
  return true;
});

export {};
