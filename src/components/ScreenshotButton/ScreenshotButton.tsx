import React from "react";
import html2canvas from "html2canvas";
import './ScreenshotButton.css'

const ScreenshotButton: React.FC = () => {
  const disableTextSelection = () => {
    document.body.style.userSelect = "none"; // Отключаем выделение текста
  };

  const enableTextSelection = () => {
    document.body.style.userSelect = ""; // Включаем выделение текста обратно
  };

  const handleScreenshot = async () => {
    const selectionBox = document.createElement("div");
    selectionBox.className = "selection-box";
    document.body.appendChild(selectionBox);

    const tabId = (await getActiveTabId()); // Получаем ID активной вкладки
    const elementHTML = await getElementFromTab(tabId, 'body'); // Получаем HTML тела страницы



    let startX: number = 0;
    let startY: number = 0;
    let isDrawing = false;

    const mouseDownHandler = (e: MouseEvent) => {
      disableTextSelection();
      startX = e.pageX;
      startY = e.pageY;
      isDrawing = true;

      selectionBox.style.left = `${startX}px`;
      selectionBox.style.top = `${startY}px`;
      selectionBox.style.width = "0";
      selectionBox.style.height = "0";
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDrawing) return;

      const currentX = e.pageX;
      const currentY = e.pageY;

      const width = currentX - startX;
      const height = currentY - startY;

      selectionBox.style.width = `${Math.abs(width)}px`;
      selectionBox.style.height = `${Math.abs(height)}px`;
      selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
      selectionBox.style.top = `${height < 0 ? currentY : startY}px`;
    };

    const mouseUpHandler = () => {
      isDrawing = false;
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      
      const rect = selectionBox.getBoundingClientRect();


      takeSelectedScreenshot(rect); // TODO


      document.body.removeChild(selectionBox);
      enableTextSelection();
    };

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const captureScreenshot = (rect: DOMRect, elementHTML: string) => {
    const targetElement = document.createElement('div');
    targetElement.innerHTML = elementHTML
    html2canvas(targetElement, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }).then((canvas: any) => {
      const dataUrl = canvas.toDataURL("image/png");

      // Отправка на сервер
      fetch("http://localhost:5555/images/upload", {
        method: "POST",
        body: JSON.stringify({ file: dataUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          chrome.storage.local.set({
            result: data.imageUrl,
            message: data.message,
          });
          
          alert(data.message);
        })
        .catch((err) => {
          console.error("Error uploading screenshot:", err);
          chrome.storage.local.set({ message: "Error uploading screenshot" });
        });
    });
  };



  function takeSelectedScreenshot(rect:DOMRect ) {
    // Захватываем видимую часть экрана
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (screenshotUrl) {
      // Создаем изображение из полученного URL
      const img = new Image();
      img.src = screenshotUrl;
  
      img.onload = () => {
        // Создаем canvas для обрезки
        const canvas = document.createElement('canvas');
        canvas.width = rect.width;  // Ширина выбранной области
        canvas.height = rect.height; // Высота выбранной области
  
        const ctx = canvas.getContext('2d');
  
        // Обрезаем нужную часть изображения
        ctx?.drawImage(
          img,
          rect.left,   // x-координата обрезки
          rect.top,    // y-координата обрезки
          rect.width,  // Ширина обрезки
          rect.height, // Высота обрезки
          0,           // x-координата на canvas
          0,           // y-координата на canvas
          canvas.width, 
          canvas.height
        );
  
        // Преобразуем canvas в data URL
        const croppedScreenshotUrl = canvas.toDataURL('image/png');
  
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.href = croppedScreenshotUrl;
        link.download = 'screenshot.png';
        link.click();
      };
    });
  }
  

  const getElementFromTab = async (tabId: number, selector: string) => {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (selector) => {
        const element = document.querySelector(selector);
        return element ? element.outerHTML : null; // Возвращаем HTML-строку элемента
      },
      args: [selector], // Передаем селектор в скрипт
    });
  
    return result.result; // Здесь будет HTML-строка или null, если элемент не найден
  };
  

  const capturePageScreenshot = () => {
  return new Promise((resolve) => {
    html2canvas(document.body).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      resolve({ dataUrl }); // Возвращаем объект с полем dataUrl
    });
  })};

  const getActiveTabId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id!;
  };


  function takeAllScreenshot(){
    chrome.tabs.captureVisibleTab({format:'png'}, function(screenshotUrl){
      const link = document.createElement('a');
      link.href = screenshotUrl;
      link.download = 'screenshot.png';
      link.click()
    })
  }

  return (
    <button onClick={handleScreenshot} id="captureButton" className="main_button">
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
