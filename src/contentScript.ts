import './style.css'
let startX = 0,
  startY = 0,
  isDrawing = false;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox);

const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

const disableTextSelection = () => {
  document.body.style.userSelect = "none"; // Выключаем выделение текста
};

const enableTextSelection = () => {
  document.body.style.userSelect = ""; // Включаем выделение текста 
};

const resetSelection = () => {  
  // Очищаем события, чтобы они не дублировались при следующем использовании

  isDrawing = false;
  enableTextSelection();

  if (document.body.contains(selectionBox)) {
    document.body.removeChild(selectionBox);
  }
  if (document.body.contains(overlay)) {
    document.body.removeChild(overlay);
  }

  document.removeEventListener("mousedown", mouseDownHandler);
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);

};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startSelection") {
    console.log("Message received in content script:", message.type);
    if (!document.body.contains(selectionBox)) {
      document.body.appendChild(selectionBox);
      selectionBox.style.width = '0';
      selectionBox.style.height = '0';
      selectionBox.style.left = '0';
      selectionBox.style.top = '0';
    }
    if (!document.body.contains(overlay)) {
      document.body.appendChild(overlay);
    }
    selectionBox.style.display = "block"; 
    overlay.style.display = "block"; 

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
  return true;
});

const mouseDownHandler = (e: MouseEvent) => {
  disableTextSelection()
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
  enableTextSelection()
  const rect = selectionBox.getBoundingClientRect();
  if (document.body.contains(selectionBox)) {
    document.body.removeChild(selectionBox);
  }

  // Отправляем координаты обратно в расширение
  function send() {
    chrome.runtime.sendMessage(
      {
        type: "captureSelection",
        rect: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        },
      },
      (response) => {
        if (chrome.runtime.lastError) {
          setTimeout(() => send(), 200);
        } else {
          console.log("Message sent successfully: ", {
            type: "captureSelection",
            rect: {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
            },
          });
        }
      }
    );
  }
  send();

  resetSelection()

  document.removeEventListener("mousedown", mouseDownHandler);
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

let resultDisplay = document.createElement('div');
document.body.appendChild(resultDisplay);


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startDisplay") {
    console.log("Message received in content script:", message.type);
    resetSelection();
    if(!resultDisplay){
      resultDisplay = document.createElement('div');
      document.body.appendChild(resultDisplay);
    }
    resultDisplay.style.width = '100px'
    resultDisplay.style.height = '100px'
    resultDisplay.style.backgroundColor = '#fff'
    resultDisplay.className = "result-display__box";

    resultDisplay.innerHTML = message.response;
    resultDisplay.style.display = 'block';
  }
  return true;
});

// responseSuccess
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.type === "responseSuccess") {
    console.log("Message received in content script:", message.type);
    resetSelection();
    if(!resultDisplay){
      resultDisplay = document.createElement('div');
      document.body.appendChild(resultDisplay);
    }
    resultDisplay.innerHTML = message.response;
  }
  return true;
});