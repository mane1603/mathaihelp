import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "./ScreenshotButton.css";
import axios from "axios";

interface IScrBtnProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  // setResult: (result: string) => void;
}

const ScreenshotButton: React.FC<IScrBtnProps> = (props) => {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    props.setIsLoading(true);

    props.setIsLoading(false);
  }, [imgURL]);

  // const handleScreenshot = () => {
  //   // Отправляем сообщение в background для начала захвата скриншота
  //   chrome.runtime.sendMessage({ type: "startSelection" }, (response) => {
  //     console.log("Popup sent startSelection message to background");
  //     // window.close(); // Закрываем popup после отправки команды
  //   });
  // };
  let hasSent = false;

  function handleScreenshot() {
    const maxRetries = 3;
    const retryDelay = 400;

    console.log("Screenshot button clicked");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (!tab || !tab.id) {
        console.error("No active tab found.");
        return;
      }

      const tabId = tab.id;

      async function injectContentScript() {
        try {
          await chrome.scripting.executeScript({
            target: { tabId },
            files: ["./dist/contentScript.js"]
          });
          console.log("Content script injected.");
        } catch (error) {
          console.error("Error injecting content script:", error);
        }
      }

      async function sendMessage() {
        return new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tabId, { type: "startSelection" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError.message);
              reject(chrome.runtime.lastError);
            } else if (response && response.success) {
              console.log("Message sent successfully: startSelection");
              resolve(response);
            } else {
              console.warn("No response from content script");
              reject(new Error("No response from content script"));
            }
          });
        });
      }

      async function attemptSendMessage() {
        for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
          try {
            await sendMessage();
            return; // Exit on success
          } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error);
            // Delay before next retry
            await new Promise((res) => setTimeout(res, retryDelay));
          }
        }
        console.error("Max retries reached, stopping attempts.");
      }

      // Inject the content script every time the function is called
      injectContentScript().then(attemptSendMessage);
    });
  }



  // function handleScreenshot() {
  //   if (!hasSent) {
  //     chrome.runtime.sendMessage(
  //       {
  //         type: "startSelection",
  //       },
  //       (response) => {
  //         if (chrome.runtime.lastError) {
  //           setTimeout(() => handleScreenshot(), 400);
  //           console.log("Message sent failed: ", "captureSelection");
  //         } else {
  //           return console.log("Message sent successfully: ", "captureSelection ");
  //         }
  //       }
  //     );
  //   }
  // }

  return (
    <button
      onClick={handleScreenshot} // TODO
      id="math-help-ai-captureButton"
      className="math-help-ai-main_button"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 7.91669C10.3418 7.91669 7.91663 10.3418 7.91663 13.3334V16.6667C7.91663 17.357 7.35698 17.9167 6.66663 17.9167C5.97627 17.9167 5.41663 17.357 5.41663 16.6667V13.3334C5.41663 8.9611 8.96104 5.41669 13.3333 5.41669H16.6666C17.357 5.41669 17.9166 5.97633 17.9166 6.66669C17.9166 7.35704 17.357 7.91669 16.6666 7.91669H13.3333Z"
          fill="white"
        />
        <path
          d="M6.66663 22.0834C7.35698 22.0834 7.91663 22.643 7.91663 23.3334V26.6667C7.91663 29.6582 10.3418 32.0834 13.3333 32.0834H16.6666C17.357 32.0834 17.9166 32.643 17.9166 33.3334C17.9166 34.0237 17.357 34.5834 16.6666 34.5834H13.3333C8.96104 34.5834 5.41663 31.0389 5.41663 26.6667V23.3334C5.41663 22.643 5.97627 22.0834 6.66663 22.0834Z"
          fill="white"
        />
        <path
          d="M33.3333 22.0834C34.0236 22.0834 34.5833 22.643 34.5833 23.3334V26.6667C34.5833 31.0389 31.0389 34.5834 26.6666 34.5834H23.3333C22.6429 34.5834 22.0833 34.0237 22.0833 33.3334C22.0833 32.643 22.6429 32.0834 23.3333 32.0834H26.6666C29.6582 32.0834 32.0833 29.6582 32.0833 26.6667V23.3334C32.0833 22.643 32.6429 22.0834 33.3333 22.0834Z"
          fill="white"
        />
        <path
          d="M23.3333 5.41669C22.6429 5.41669 22.0833 5.97633 22.0833 6.66669C22.0833 7.35704 22.6429 7.91669 23.3333 7.91669H26.6666C29.6582 7.91669 32.0833 10.3418 32.0833 13.3334V16.6667C32.0833 17.357 32.6429 17.9167 33.3333 17.9167C34.0236 17.9167 34.5833 17.357 34.5833 16.6667V13.3334C34.5833 8.9611 31.0389 5.41669 26.6666 5.41669H23.3333Z"
          fill="white"
        />
      </svg>
      Screenshot
    </button>
  );
};

export default ScreenshotButton;
