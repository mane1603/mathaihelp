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


document.getElementById('captureButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'start-selection' });
  });
});

