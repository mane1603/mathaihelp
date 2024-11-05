// background.ts
import axios from "axios";

async function getToken(): Promise<unknown> {
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

async function sendRequest(imgURL: string): Promise<string> {
  const token = await getToken();
  if (!token) return "No Token";

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
    chrome.storage.local.set({ lastScreenShot: new Date() }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving screenshot time:", chrome.runtime.lastError);
      }
    });
    return response.data.gptResponse;
  } catch (error) {
    console.error("Error in request:", error);
    return "No Token";
  }
}


chrome.runtime.onMessage.addListener(async (message: { type: string }, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  if (message.type === "get-user-data") {
    sendResponse("Hello from background");
    return true;
  } else if (message.type === "logout") {
    chrome.storage.local.remove("token", () => {
      sendResponse({ success: true });
    });
    // Required for async response in `chrome.runtime.onMessage`
    return true;
  } else if (message.type === "startAuth") {

    const authUrl = "http://localhost:5555/auth/google";
    try {
      const redirectUrl = await chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true,
      });

      if (chrome.runtime.lastError || !redirectUrl) {
        sendResponse({ success: false, error: chrome.runtime.lastError });
        return;  // Exit to avoid returning `true` without a response
      }
      const code = extractCodeFromRedirectUrl(redirectUrl);

      const response = await fetch("http://localhost:5555/auth/google/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (data.token) {
        chrome.storage.local.set({ token: data.token }, () => {
          sendResponse({ success: true, token: data.token });
        });
      } else {
        console.error("Failed to retrieve token from server.");
        sendResponse({ success: false });
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      sendResponse({ success: false, error: err });
    }

    return true;  // Indicate async response for `sendResponse`
  } else if (message.type === "get-user-data") {
    sendResponse("Hello from background");
  }
});

// chrome.runtime.onConnect.addListener(function (port) {
//   if (port.name === "popup-background") {
//     port.onMessage.addListener(function (message: { type: string }) {
//       if (message.type === "test") {
//         port.postMessage({ result: "screenshot taken" });
//       }
//     });
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener(async (message: { type: string; rect?: { x?: number; y?: number; width?: number; height?: number } }, sender, sendResponse) => {
  if (message.type === "captureSelection") {
    const { x = 0, y = 0, width = 0, height = 0 } = message.rect || {};

    if (width <= 0 || height <= 0) {
      console.error("Invalid rectangle dimensions:", message.rect);
      handleSend("", "responseDenied");
      return;
    }

    await chrome.tabs.captureVisibleTab({ format: "png" }, async (screenshotUrl) => {
      try {
        const response = await fetch(screenshotUrl);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);

        const offscreenCanvas = new OffscreenCanvas(width, height);
        const ctx = offscreenCanvas.getContext("2d");

        if (ctx) { // Check if ctx is not null
          ctx.drawImage(imageBitmap, x, y, width, height, 0, 0, width, height);
          const croppedBlob = await offscreenCanvas.convertToBlob();
          const reader = new FileReader();

          reader.readAsDataURL(croppedBlob);
          reader.onloadend = async () => {
            const croppedScreenshotUrl = reader.result?.toString();

            if (croppedScreenshotUrl) {
              handleSend("Loading...", "startDisplay");
              const result = await sendRequest(croppedScreenshotUrl);

              if (result && result === "No Token") {
                handleSend("", "responseDenied");
              } else if (result) {
                handleSend(result, "responseSuccess");
              }
            }
          };
        }
      } catch (error) {
        handleSend("", "responseDenied");
        console.error("Error in getting image:", error);
      }
    });
    return true;
  }
});

function extractCodeFromRedirectUrl(redirectUrl: string) {
  const urlParams = new URLSearchParams(new URL(redirectUrl).search);
  return urlParams.get("code");
}

function handleSend(message: any, messageType: string) {
  let hasSent = false;
  chrome.tabs.query(
      { active: true, currentWindow: true },
      async function send(tabs) {
        if (tabs[0].id && !hasSent) {
          await chrome.tabs.sendMessage(
              tabs[0].id,
              { type: messageType, response: message },
              (response) => {
                if (chrome.runtime.lastError) {
                  setTimeout(() => send(tabs), 400);
                } else if (response && response.success) {
                  hasSent = true;
                }
              }
          );
        }
      }
  );
}

export {};
