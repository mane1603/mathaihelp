// background.js
import axios from "axios";

async function getToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token"], (result) => {
      if (result?.token) {
        resolve(result.token);
      } else {
        resolve(null);
      }
    });
  });
}

async function sendRequest(imgURL: string):Promise<string> {
  const token = await getToken().then(async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/image/upload",
        {
          url: imgURL,
          language: "English",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.gptResponse);
      
      return response.data.gptResponse;
    } catch (error) {
      console.error("Error in request:", error);
      return 'No Token';
    }
  }).catch(e => {
    console.log(e);
    return 'No Token'
  })
  return token
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
                        (response) => {
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
  if (message.type === "startSelection") {
    // Начинаем процесс захвата экрана
    console.log('Message recieved in Background');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id!, { type: "startSelection" });
      }
    });
    sendResponse({ success: true });
  }

  if (message.type === "captureSelection") {
    console.log("Message received in background script:", message.type);
    const { x, y, width, height } = message.rect;

    if (!message.rect) return;

    sendResponse({ success: true });

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
                await sendRequest(croppedScreenshotUrl).then((result) => {
                  console.log('RESULT AAAAAAA',result);
                  
                  if (result && result === 'No Token') {
                    handleSend('', "responseDenied");
                  }
                  else if(result){
                    console.log(result);
                    handleSend(result, "responseSuccess");
                  }

                }).catch(e => console.log(e));
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
  console.log("background.ts:134:4 code:", urlParams.get("code"));
  return urlParams.get("code");
}

function handleSend(message: any, messageType: string) {
  let hasSent = false
  chrome.tabs.query({ active: true, currentWindow: true }, 
    function send(tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: messageType, response: message },
        (response) => {
          if (chrome.runtime.lastError) {
            setTimeout(() => send(tabs), 400);
          }else if (response && response.success) {
            // Если получили успешный ответ от контентного скрипта
            hasSent = true;
            console.log(
              "Message sent successfully from background: ",
              messageType
            ) }
          else {
            console.log("No response from content script");
          }
        }
      );
    }
  });
}

export {};
