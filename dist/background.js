(()=>{"use strict";chrome.runtime.onInstalled.addListener((function(){console.log("Screenshot Extension Installed")})),chrome.runtime.onMessage.addListener((function(e,n,t){if(console.log("Message received in background script:",e),"captureSelection"===e.type){var r=e.rect,o=r.x,c=r.y,s=r.width,a=r.height;chrome.tabs.captureVisibleTab({format:"png"},(function(e){fetch(e).then((function(e){return e.blob()})).then((function(e){return createImageBitmap(e)})).then((function(e){var n=new OffscreenCanvas(s,a),t=n.getContext("2d");null==t||t.drawImage(e,o,c,s,a,0,0,s,a),n.convertToBlob().then((function(e){var n=new FileReader;n.readAsDataURL(e),n.onloadend=function(){var e=n.result;!function n(){chrome.runtime.sendMessage({type:"screenshotTaken",screenshotUrl:e},(function(t){chrome.runtime.lastError?setTimeout((function(){return n()}),100):console.log("Message sent successfully: ",{type:"screenshotTaken",screenshotUrl:e})}))}()}}))})).catch((function(e){return console.error("Ошибка при получении изображения:",e)}))}))}return!0}))})();