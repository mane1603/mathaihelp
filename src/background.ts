// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Screenshot Extension Installed");
});

// Пример слушателя для получения сообщения
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "screenshotTaken") {
    console.log("Screenshot was taken:", request.data);
    sendResponse({ status: "success" });
  }
});
export {}
