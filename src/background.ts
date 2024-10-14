chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'screenshot_taken') {
    console.log('Скриншот успешно сделан и отправлен на сервер');
  }
});

export {}
