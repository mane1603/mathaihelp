import React from "react";
import html2canvas from "html2canvas";
import "./ScreenshotButton.css";

const ScreenshotButton: React.FC = () => {
  function handleScreenshot() {
    // Слушаем результат
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("Message received in ScreenshotButton script:", message);
      
      if (message.type === "screenshotTaken") {
        const screenshotUrl = message.screenshotUrl;

        const link = document.createElement("a");
        link.href = screenshotUrl;
        link.download = "screenshot.png";
        link.click();
      }
    });

    
    // Отправляем сообщение контентному скрипту для начала выделения области
    console.log("Screenshot button clicked");


    chrome.tabs.query({ active: true, currentWindow: true }, function send(tabs) {
      console.log("Screenshot button clicked");
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "startSelection" }, (response) => {
          if (chrome.runtime.lastError) {
            // An error means the content script is not ready, wait a bit and retry
            setTimeout(() => send(tabs), 100);
          } else {
            // No error means the message was sent successfully
            console.log("Message sent successfully: ", { type: "startSelection" });
          }
        });
      
      }
    });

    
  }


  return (
    <button
      onClick={handleScreenshot} // TODO
      id="captureButton"
      className="main_button"
    >
      Screenshot
    </button>
  );
};

export default ScreenshotButton;
