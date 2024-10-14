"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension installed");
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'screenshot_taken') {
        console.log('Скриншот успешно сделан и отправлен на сервер');
    }
});
