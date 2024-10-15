let startX = 0,
  startY = 0,
  isDrawing = false;
const selectionBox = document.createElement("div");
selectionBox.className = "selection-box";
document.body.appendChild(selectionBox);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  if (message.type === "startSelection") {
    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
  return true;
});

const mouseDownHandler = (e: MouseEvent) => {
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
          // An error means the content script is not ready, wait a bit and retry
          setTimeout(() => send(), 100);
        } else {
          // No error means the message was sent successfully
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
  //   chrome.runtime.sendMessage({
  //     type: "captureSelection",
  //     rect: {
  //       x: rect.left,
  //       y: rect.top,
  //       width: rect.width,
  //       height: rect.height
  //     }
  //   });

  document.removeEventListener("mousedown", mouseDownHandler);
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};
