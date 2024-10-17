// background.js
import axios from "axios";

async function sendRequest(imgURL: string) {
  const response = await axios.post("http://localhost:5555/image/upload", {
    url: imgURL,
    language: "English",
  });
  return response;
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Screenshot Extension Installed");
});

// background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startAuth") {
    console.log("Background script started Auth");

    const authUrl = "http://localhost:5555/auth/google"; // URL для инициации OAuth

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        console.log("Redirect URL:", redirectUrl);

        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Ошибка при аутентификации:", chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError });
          return;
        }

        const code = extractCodeFromRedirectUrl(redirectUrl); // Метод для извлечения данных пользователя

        fetch("http://localhost:5555/auth/google/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
              chrome.storage.local.set({ token: data.token }, () => {
                console.log("Token saved to Chrome storage:", data.token);

                // Отправка данных в контент-скрипт
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  (tabs) => {
                    if (tabs[0]?.id) {
                      chrome.tabs.sendMessage(
                        tabs[0].id,
                        { type: "authSuccess", token: data.token },
                        () => {
                          console.log("Token sent to content script");
                        }
                      );
                    }
                  }
                );
              });
            } else {
              console.error("Failed to retrieve token from server.");
            }
          })
          .catch((err) =>
            console.error("Error exchanging code for token:", err)
          );

        sendResponse({ success: true, code });
      }
    );

    // Указывает Chrome, что ответ будет асинхронным
    return true;
  }
});

// background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "captureSelection") {
    console.log("Message received in background script:", message.type);
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
          offscreenCanvas.convertToBlob().then((croppedBlob) => {
            const reader = new FileReader();
            reader.readAsDataURL(croppedBlob);
            reader.onloadend = async () => {
              const croppedScreenshotUrl = reader.result?.toString();

              if (croppedScreenshotUrl) {
                handleSend("Loading...", "startDisplay");
                sendRequest(croppedScreenshotUrl).then((result) => {
                  console.log(result);
                  handleSend(result.data.gptResponse, "responseSuccess");
                });
              } else {
                console.log("croppedScreenshotUrl does not exist");
              }
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

// For AUTH handler
function extractCodeFromRedirectUrl(redirectUrl: string) {
  const urlParams = new URLSearchParams(new URL(redirectUrl).search);
  console.log('background.ts:134:4 code:',urlParams.get("code"));
  return urlParams.get("code");
}

function handleSend(message: any, messageType: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, function send(tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: messageType, response: message },
        (response) => {
          if (chrome.runtime.lastError) {
            setTimeout(() => send(tabs), 400);
          } else {
            return console.log(
              "Message sent successfully from background: ",
              messageType,
              message
            );
          }
        }
      );
    }
  });
}

export {};
