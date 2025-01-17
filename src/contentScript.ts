import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import HintBox from './components/HintBox/HintBox'
{
  let startX = 0,
    startY = 0,
    isDrawing = false

  const overlay = document.createElement('div')
  overlay.className = 'math-help-ai-overlay'
  const selectionBox = document.createElement('div')
  selectionBox.className = 'math-help-ai-selection-box'

  const disableTextSelection = () => {
    document.body.style.userSelect = 'none' // Выключаем выделение текста
  }

  const handleScreenshot = async () => {
    let retryCount = 0;
    const maxRetries = 3;
    let hasSent = false;
    if (!hasSent && retryCount < maxRetries) {
      await chrome.runtime.sendMessage({ type: "startSelection" }, (response) => {
      })
    }
  }

  const enableTextSelection = () => {
    document.body.style.userSelect = '' // Включаем выделение текста
  }

  const resetSelection = () => {
    // Очищаем события, чтобы они не дублировались при следующем использовании

    isDrawing = false
    enableTextSelection()

    if (document.body.contains(selectionBox)) {
      document.body.removeChild(selectionBox)
    }
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay)
    }

    document.removeEventListener('mousedown', mouseDownHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
  //
  // const port = chrome.runtime.connect({ name: 'popup-background' })
  // port.postMessage({ type: 'test' })
  // port.onMessage.addListener(function (response) {
  // })

  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message.type === 'startSelection') {
        await sendResponse({ success: true })
        if (!document.body.contains(selectionBox)) {
          document.body.appendChild(selectionBox)
          selectionBox.style.width = '0'
          selectionBox.style.height = '0'
          selectionBox.style.left = '0'
          selectionBox.style.top = '0'
        }

        if (!document.body.contains(overlay)) {
          document.body.appendChild(overlay)
          const hints = document.createElement('div')
          hints.className = 'math-help-ai-hints-box'
          hints.innerHTML = `<div class='math-help-ai-hint'><svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M16.7803 9.78033C17.0732 9.48744 17.0732 9.01256 16.7803 8.71967C16.4874 8.42678 16.0126 8.42678 15.7197 8.71967L10.75 13.6893L8.28033 11.2197C7.98744 10.9268 7.51256 10.9268 7.21967 11.2197C6.92678 11.5126 6.92678 11.9874 7.21967 12.2803L10.2197 15.2803C10.5126 15.5732 10.9874 15.5732 11.2803 15.2803L16.7803 9.78033Z' fill='white'/><path fill-rule='evenodd' clip-rule='evenodd' d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z' fill='white'/></svg><b>&nbsp Screenshot Mode Enabled, </b>&nbsp click on page and drag to select<span> &nbsp one question</span></div><div class='math-help-ai-hint'>Use <span>&nbsp Esc</span>&nbsp to exit</div><div class='math-help-ai-hint'><svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M8 4.75C6.20507 4.75 4.75 6.20507 4.75 8V10C4.75 10.4142 4.41421 10.75 4 10.75C3.58579 10.75 3.25 10.4142 3.25 10V8C3.25 5.37665 5.37665 3.25 8 3.25H10C10.4142 3.25 10.75 3.58579 10.75 4C10.75 4.41421 10.4142 4.75 10 4.75H8Z' fill='white'/><path d='M4 13.25C4.41421 13.25 4.75 13.5858 4.75 14V16C4.75 17.7949 6.20507 19.25 8 19.25H10C10.4142 19.25 10.75 19.5858 10.75 20C10.75 20.4142 10.4142 20.75 10 20.75H8C5.37665 20.75 3.25 18.6234 3.25 16V14C3.25 13.5858 3.58579 13.25 4 13.25Z' fill='white'/><path d='M20 13.25C20.4142 13.25 20.75 13.5858 20.75 14V16C20.75 18.6234 18.6234 20.75 16 20.75H14C13.5858 20.75 13.25 20.4142 13.25 20C13.25 19.5858 13.5858 19.25 14 19.25H16C17.7949 19.25 19.25 17.7949 19.25 16V14C19.25 13.5858 19.5858 13.25 20 13.25Z' fill='white'/><path d='M14 3.25C13.5858 3.25 13.25 3.58579 13.25 4C13.25 4.41421 13.5858 4.75 14 4.75H16C17.7949 4.75 19.25 6.20507 19.25 8V10C19.25 10.4142 19.5858 10.75 20 10.75C20.4142 10.75 20.75 10.4142 20.75 10V8C20.75 5.37665 18.6234 3.25 16 3.25H14Z' fill='white'/></svg><svg width='54' height='18' viewBox='0 0 54 18' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M9.6001 3.07008C9.25243 2.78035 8.74742 2.78035 8.39976 3.07008L4.30209 6.4848C4.13328 6.62547 4.23276 6.90022 4.45249 6.90022C5.20356 6.90022 5.81243 7.50908 5.81243 8.26016V14.2127C5.81243 14.7305 6.23216 15.1502 6.74993 15.1502H11.2499C11.7677 15.1502 12.1874 14.7305 12.1874 14.2127V8.26016C12.1874 7.50908 12.7963 6.90022 13.5474 6.90022C13.7671 6.90022 13.8666 6.62547 13.6978 6.4848L9.6001 3.07008ZM7.67955 2.20583C8.44442 1.56843 9.55544 1.56844 10.3203 2.20583L14.418 5.62055C15.3951 6.43483 14.8193 8.02522 13.5474 8.02522C13.4176 8.02522 13.3124 8.13041 13.3124 8.26016V14.2127C13.3124 15.3518 12.389 16.2752 11.2499 16.2752H6.74993C5.61084 16.2752 4.68743 15.3518 4.68743 14.2127V8.26016C4.68743 8.1304 4.58224 8.02522 4.45249 8.02522C3.18054 8.02522 2.60475 6.43483 3.58188 5.62055L7.67955 2.20583Z' fill='#B300F4'/><path fill-rule='evenodd' clip-rule='evenodd' d='M22.875 2.4375C24.2212 2.4375 25.3125 3.52881 25.3125 4.875V6.1875H28.6875V4.875C28.6875 3.52881 29.7788 2.4375 31.125 2.4375C32.4712 2.4375 33.5625 3.52881 33.5625 4.875C33.5625 6.22119 32.4712 7.3125 31.125 7.3125H29.8125V10.6875H31.125C32.4712 10.6875 33.5625 11.7788 33.5625 13.125C33.5625 14.4712 32.4712 15.5625 31.125 15.5625C29.7788 15.5625 28.6875 14.4712 28.6875 13.125V11.8125H25.3125V13.125C25.3125 14.4712 24.2212 15.5625 22.875 15.5625C21.5288 15.5625 20.4375 14.4712 20.4375 13.125C20.4375 11.7788 21.5288 10.6875 22.875 10.6875H24.1875V7.3125H22.875C21.5288 7.3125 20.4375 6.22119 20.4375 4.875C20.4375 3.52881 21.5288 2.4375 22.875 2.4375ZM21.5625 4.875C21.5625 4.15013 22.1501 3.5625 22.875 3.5625C23.5999 3.5625 24.1875 4.15013 24.1875 4.875V6.1875H22.875C22.1501 6.1875 21.5625 5.59987 21.5625 4.875ZM32.4375 4.875C32.4375 5.59987 31.8499 6.1875 31.125 6.1875H29.8125V4.875C29.8125 4.15013 30.4001 3.5625 31.125 3.5625C31.8499 3.5625 32.4375 4.15013 32.4375 4.875ZM31.125 14.4375C30.4001 14.4375 29.8125 13.8499 29.8125 13.125V11.8125H31.125C31.8499 11.8125 32.4375 12.4001 32.4375 13.125C32.4375 13.8499 31.8499 14.4375 31.125 14.4375ZM21.5625 13.125C21.5625 12.4001 22.1501 11.8125 22.875 11.8125H24.1875V13.125C24.1875 13.8499 23.5999 14.4375 22.875 14.4375C22.1501 14.4375 21.5625 13.8499 21.5625 13.125ZM25.3125 10.6875V7.3125H28.6875V10.6875H25.3125Z' fill='#B300F4'/><path d='M43.77 15.2586C42.9018 15.2586 42.1198 15.1149 41.424 14.8274C40.734 14.5341 40.1619 14.1201 39.7076 13.5854C39.2591 13.0506 38.9659 12.4153 38.8279 11.6793L40.1216 11.4636C40.3286 12.2686 40.7656 12.9011 41.4326 13.3611C42.0996 13.8154 42.896 14.0425 43.8218 14.0425C44.4313 14.0425 44.9775 13.9476 45.4605 13.7579C45.9435 13.5624 46.323 13.2864 46.599 12.9299C46.875 12.5734 47.013 12.1508 47.013 11.662C47.013 11.34 46.9555 11.0669 46.8405 10.8426C46.7255 10.6126 46.5731 10.4229 46.3834 10.2734C46.1936 10.1239 45.9866 10.0003 45.7624 9.90252C45.5381 9.79902 45.3196 9.71564 45.1069 9.65239L41.9588 8.71227C41.5793 8.60302 41.2285 8.46502 40.9065 8.29827C40.5845 8.12577 40.3028 7.92164 40.0613 7.68589C39.8255 7.44439 39.6415 7.16264 39.5093 6.84064C39.377 6.51864 39.3109 6.15064 39.3109 5.73664C39.3109 5.03514 39.4949 4.42852 39.8629 3.91677C40.2309 3.40502 40.734 3.01114 41.3723 2.73514C42.0105 2.45914 42.7379 2.32402 43.5544 2.32977C44.3824 2.32977 45.1213 2.47639 45.771 2.76964C46.4265 3.06289 46.967 3.48264 47.3925 4.02889C47.818 4.56939 48.0998 5.21052 48.2378 5.95227L46.9095 6.19377C46.8233 5.65327 46.6249 5.18464 46.3144 4.78789C46.0039 4.39114 45.6071 4.08639 45.1241 3.87364C44.6469 3.65514 44.1208 3.54302 43.5458 3.53727C42.988 3.53727 42.4906 3.63214 42.0536 3.82189C41.6224 4.00589 41.2803 4.25889 41.0273 4.58089C40.7743 4.90289 40.6478 5.27089 40.6478 5.68489C40.6478 6.10464 40.7628 6.44102 40.9928 6.69402C41.2285 6.94702 41.516 7.14539 41.8553 7.28914C42.2003 7.43289 42.5338 7.55077 42.8558 7.64277L45.288 8.35864C45.541 8.42764 45.8371 8.52827 46.1764 8.66052C46.5214 8.78702 46.8549 8.97102 47.1769 9.21252C47.5046 9.44827 47.7749 9.75877 47.9876 10.144C48.2004 10.5293 48.3068 11.018 48.3068 11.6103C48.3068 12.1853 48.1918 12.6999 47.9618 13.1541C47.7375 13.6084 47.4184 13.9908 47.0044 14.3013C46.5961 14.6118 46.116 14.8475 45.564 15.0085C45.0178 15.1753 44.4198 15.2586 43.77 15.2586Z' fill='#B300F4'/></svg></div>`
          overlay.appendChild(hints)
        }
        selectionBox.style.display = 'block'
        overlay.style.display = 'block'

        document.addEventListener('keydown', function (e) {
          if (e.key == 'Escape') {
            resetSelection()
          }
        })

        document.addEventListener('mousedown', mouseDownHandler)
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
      }
      return true
    },
  )

  const mouseDownHandler = (e: MouseEvent) => {

    disableTextSelection()
    startX = e.pageX
    startY = e.pageY
    isDrawing = true

    selectionBox.style.left = `${startX}px`
    selectionBox.style.top = `${startY}px`
    selectionBox.style.width = '0'
    selectionBox.style.height = '0'
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isDrawing) return

    const currentX = e.pageX
    const currentY = e.pageY

    const width = currentX - startX
    const height = currentY - startY

    selectionBox.style.width = `${Math.abs(width)}px`
    selectionBox.style.height = `${Math.abs(height)}px`
    selectionBox.style.left = `${width < 0 ? currentX : startX}px`
    selectionBox.style.top = `${height < 0 ? currentY : startY}px`
  }

  const mouseUpHandler = async () => {
    isDrawing = false
    enableTextSelection()
    const rect = selectionBox.getBoundingClientRect()
    if (document.body.contains(selectionBox)) {
      document.body.removeChild(selectionBox)
    }
    let hasSent = false
    // Отправляем координаты обратно в расширение
    let currRetries = 0
    const maxRetries = 3
    async function send() {
      currRetries++
      if (!hasSent && currRetries < maxRetries) {
        const response = await chrome.runtime.sendMessage({
          type: 'captureSelection',
          rect: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        })
        if (response && response.success) {
          hasSent = true
        } else if (chrome.runtime.lastError) {
          if (chrome.runtime.lastError && chrome.runtime.lastError?.message?.includes("Receiving end does not exist")) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.id) {
              await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["./dist/contentScript.js"]
              });
              console.log("Content script injected.");
            }
          }else{
            setTimeout(() => send(), 400)
          }

        }
      }
    }
    send()

    resetSelection()

    document.removeEventListener('mousedown', mouseDownHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  let resultDisplay = document.createElement('div')
  document.body.appendChild(resultDisplay)

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'startDisplay') {
      sendResponse({ success: true })
      resetSelection()
      if (!resultDisplay) {
        resultDisplay = document.createElement('div')
        document.body.appendChild(resultDisplay)
      }

      resultDisplay.classList.add('math-help-ai-result-loading__box')
      resultDisplay.id = 'math-help-ai-result-loading__box'
      resultDisplay.innerHTML = `<p>Waiting for Math-Help AI answer...</p>`
      resultDisplay.style.display = 'block'
      const closeButton = document.getElementById(
        'math-help-ai-result-display__header__button',
      )
      const resetDisplay = function () {
        if (document.body.contains(resultDisplay)) {
          document.body.removeChild(resultDisplay)
        }
        resetSelection()
      }
      closeButton?.addEventListener('click', resetDisplay)
    }
    return true
  })

  // responseSuccess
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'responseSuccess') {
      sendResponse({ success: true })
      resetSelection()
      if (!resultDisplay) {
        resultDisplay = document.createElement('div')
        document.body.appendChild(resultDisplay)
        resultDisplay.className = 'math-help-ai-result-display__box'
      }

      let result = message.response.replace(/`/g, '').replace(/html/, '')

      resultDisplay.className = 'math-help-ai-result-display__box'
      resultDisplay.innerHTML = `<div class = 'math-help-ai-result-display__box__header'>
            <svg width="115" height="26" viewBox="0 0 115 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M113.066 19.9538V9.71503H115V19.9538H113.066Z" fill="#B300F4"/>
                    <path d="M102.79 19.9538L105.919 9.71503H108.805L111.934 19.9538H109.943L107.156 10.9238H107.526L104.781 19.9538H102.79ZM104.667 17.8207V16.0147H110.071V17.8207H104.667Z" fill="#B300F4"/>
                    <path d="M96.223 20.1671C95.5025 20.1671 94.8957 19.9893 94.4028 19.6338C93.9098 19.2735 93.5353 18.7877 93.2794 18.1762C93.0281 17.56 92.9025 16.8703 92.9025 16.1071C92.9025 15.3345 93.0281 14.6424 93.2794 14.0309C93.5353 13.4195 93.9098 12.9383 94.4028 12.5876C94.9005 12.2368 95.5096 12.0614 96.2301 12.0614C96.9411 12.0614 97.5526 12.2392 98.0645 12.5947C98.5812 12.9454 98.977 13.4266 99.2519 14.038C99.5269 14.6495 99.6643 15.3392 99.6643 16.1071C99.6643 16.875 99.5269 17.5647 99.2519 18.1762C98.977 18.7877 98.5812 19.2735 98.0645 19.6338C97.5526 19.9893 96.9388 20.1671 96.223 20.1671ZM92.6892 23.3667V12.2747H93.8197V17.9273H93.9619V23.3667H92.6892ZM96.0666 19.0081C96.5738 19.0081 96.9933 18.8801 97.3251 18.6241C97.6569 18.3682 97.9057 18.0221 98.0716 17.586C98.2376 17.1452 98.3205 16.6522 98.3205 16.1071C98.3205 15.5667 98.2376 15.0785 98.0716 14.6424C97.9105 14.2063 97.6593 13.8603 97.318 13.6043C96.9814 13.3484 96.5524 13.2204 96.031 13.2204C95.5333 13.2204 95.1209 13.3436 94.7938 13.5901C94.4668 13.8318 94.2226 14.1708 94.0615 14.6069C93.9003 15.0382 93.8197 15.5383 93.8197 16.1071C93.8197 16.6665 93.8979 17.1665 94.0544 17.6074C94.2155 18.0435 94.462 18.3871 94.7938 18.6384C95.1256 18.8848 95.5499 19.0081 96.0666 19.0081Z" fill="white"/>
                    <path d="M89.5818 19.9538V9.50177H90.8474V19.9538H89.5818Z" fill="white"/>
                    <path d="M84.6498 20.1671C83.8961 20.1671 83.2373 20.0012 82.6732 19.6693C82.1138 19.3328 81.6778 18.8659 81.3649 18.2686C81.0521 17.6666 80.8956 16.9651 80.8956 16.164C80.8956 15.325 81.0497 14.5998 81.3578 13.9883C81.6659 13.3721 82.0949 12.898 82.6447 12.5662C83.1993 12.2297 83.8487 12.0614 84.593 12.0614C85.3656 12.0614 86.0221 12.2392 86.5625 12.5947C87.1076 12.9502 87.5153 13.4574 87.7854 14.1163C88.0604 14.7751 88.1789 15.5596 88.141 16.4697H86.8611V16.0147C86.8469 15.0714 86.6549 14.3675 86.2852 13.9029C85.9155 13.4337 85.3656 13.199 84.6356 13.199C83.8535 13.199 83.2586 13.4503 82.8509 13.9527C82.4433 14.4552 82.2395 15.1757 82.2395 16.1142C82.2395 17.0196 82.4433 17.7211 82.8509 18.2189C83.2586 18.7166 83.8393 18.9654 84.593 18.9654C85.1001 18.9654 85.541 18.8493 85.9155 18.617C86.2899 18.3848 86.5838 18.0506 86.7971 17.6145L88.013 18.034C87.7143 18.7118 87.264 19.238 86.662 19.6125C86.0648 19.9822 85.394 20.1671 84.6498 20.1671ZM81.8128 16.4697V15.453H87.4868V16.4697H81.8128Z" fill="white"/>
                    <path d="M71.6912 19.9538V9.71503H72.9568V14.23H78.3463V9.71503H79.612V19.9538H78.3463V15.4316H72.9568V19.9538H71.6912Z" fill="white"/>
                    <path d="M65.8619 15.9934V14.9482H70.1281V15.9934H65.8619Z" fill="white"/>
                    <path d="M63.1602 19.9538V16.1071C63.1602 15.7421 63.127 15.3914 63.0606 15.0548C62.999 14.7183 62.8876 14.4173 62.7265 14.1518C62.57 13.8816 62.3567 13.6683 62.0865 13.5119C61.8211 13.3555 61.4845 13.2773 61.0769 13.2773C60.7593 13.2773 60.4701 13.3318 60.2094 13.4408C59.9535 13.5451 59.733 13.7062 59.5482 13.9243C59.3633 14.1423 59.2187 14.4173 59.1145 14.7491C59.0149 15.0761 58.9651 15.4625 58.9651 15.908L58.1332 15.6521C58.1332 14.9079 58.266 14.2703 58.5314 13.7394C58.8016 13.2038 59.1785 12.7938 59.6619 12.5093C60.1502 12.2202 60.7237 12.0756 61.3826 12.0756C61.8803 12.0756 62.3046 12.1538 62.6554 12.3103C63.0061 12.4667 63.2976 12.6753 63.5299 12.936C63.7622 13.1919 63.9447 13.4811 64.0774 13.8034C64.2101 14.121 64.3026 14.4457 64.3547 14.7775C64.4116 15.1046 64.44 15.4151 64.44 15.7089V19.9538H63.1602ZM57.6853 19.9538V9.71503H58.8229V15.3677H58.9651V19.9538H57.6853Z" fill="white"/>
                    <path d="M56.4178 19.9538C55.9627 20.0438 55.5124 20.0794 55.0669 20.0604C54.626 20.0462 54.2326 19.9585 53.8866 19.7974C53.5405 19.6314 53.2774 19.3755 53.0973 19.0294C52.9456 18.7261 52.8627 18.4203 52.8485 18.1122C52.839 17.7994 52.8342 17.4462 52.8342 17.0528V10.1417H54.0999V16.9959C54.0999 17.3088 54.1022 17.5766 54.107 17.7994C54.1165 18.0222 54.1662 18.2141 54.2563 18.3753C54.4269 18.6787 54.6971 18.8564 55.0669 18.9086C55.4413 18.9607 55.8916 18.9465 56.4178 18.8659V19.9538ZM51.2771 13.3199V12.2747H56.4178V13.3199H51.2771Z" fill="white"/>
                    <path d="M46.5986 20.1671C46.025 20.1671 45.5439 20.0628 45.1552 19.8542C44.7713 19.6409 44.4797 19.3612 44.2807 19.0152C44.0863 18.6692 43.9891 18.29 43.9891 17.8776C43.9891 17.4747 44.065 17.1263 44.2167 16.8324C44.3731 16.5337 44.5911 16.2872 44.8708 16.0929C45.1505 15.8938 45.4847 15.7374 45.8733 15.6236C46.2383 15.5241 46.646 15.4388 47.0963 15.3677C47.5514 15.2918 48.0112 15.2231 48.4757 15.1615C48.9402 15.0998 49.3739 15.0406 49.7769 14.9837L49.3218 15.2468C49.336 14.5642 49.1986 14.0594 48.9094 13.7323C48.625 13.4052 48.132 13.2417 47.4305 13.2417C46.966 13.2417 46.5583 13.3484 46.2075 13.5617C45.8615 13.7702 45.6174 14.1115 45.4752 14.5855L44.2735 14.2229C44.4584 13.5498 44.8163 13.0213 45.3472 12.6373C45.8781 12.2534 46.5773 12.0614 47.4447 12.0614C48.1415 12.0614 48.7388 12.187 49.2365 12.4382C49.7389 12.6847 50.0992 13.0592 50.3172 13.5617C50.4263 13.7987 50.495 14.057 50.5234 14.3367C50.5519 14.6116 50.5661 14.9008 50.5661 15.2041V19.9538H49.4427V18.1122L49.7058 18.2828C49.4166 18.9038 49.0113 19.3731 48.4899 19.6907C47.9732 20.0083 47.3428 20.1671 46.5986 20.1671ZM46.7906 19.1076C47.2456 19.1076 47.6391 19.0271 47.9709 18.8659C48.3074 18.7 48.5776 18.4843 48.7814 18.2189C48.9853 17.9487 49.118 17.6548 49.1796 17.3372C49.2507 17.1002 49.2886 16.8371 49.2934 16.548C49.3028 16.2541 49.3076 16.0289 49.3076 15.8725L49.7484 16.0645C49.336 16.1213 48.9307 16.1759 48.5326 16.228C48.1344 16.2801 47.7576 16.337 47.402 16.3986C47.0465 16.4555 46.7266 16.5243 46.4422 16.6048C46.2336 16.6712 46.0369 16.7565 45.852 16.8608C45.6719 16.9651 45.5249 17.1002 45.4112 17.2661C45.3022 17.4273 45.2476 17.6287 45.2476 17.8705C45.2476 18.079 45.2998 18.2781 45.4041 18.4677C45.5131 18.6573 45.679 18.8114 45.9018 18.9299C46.1293 19.0484 46.4256 19.1076 46.7906 19.1076Z" fill="white"/>
                    <path d="M32.6738 19.9538V9.71503H33.8257L37.6936 17.8705L41.5403 9.71503H42.7064V19.9466H41.5047V12.4951L38.0278 19.9538H37.3524L33.8755 12.4951V19.9538H32.6738Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0659 2.04327C14.2094 1.98443 14.371 1.98565 14.5136 2.04664L27.6564 7.67117C27.8665 7.7611 28.0018 7.96588 28 8.19142C27.9982 8.41695 27.8597 8.61961 27.6481 8.70626L21.7959 11.1034V14.7757C21.7959 14.9382 21.7245 15.0928 21.6001 15.1996C18.6522 17.7301 15.4743 18.2648 12.7146 17.8942C9.97691 17.5265 7.65262 16.2707 6.33281 15.2117C6.1997 15.1048 6.12245 14.9448 6.12245 14.7757V10.9715L0.35975 8.70942C0.143996 8.62473 0.00179513 8.41991 1.68629e-05 8.19129C-0.00176137 7.96266 0.137237 7.75573 0.351648 7.66779L14.0659 2.04327ZM7.26531 11.4202V14.5031C8.48156 15.4178 10.513 16.4632 12.8691 16.7796C15.2843 17.1039 18.0422 16.6648 20.6531 14.5164V11.5715L14.5053 14.0897C14.3675 14.1462 14.2127 14.1473 14.074 14.0929L7.26531 11.4202ZM2.08495 8.17557L14.2811 12.9631L25.969 8.17565L14.281 3.17373L2.08495 8.17557Z" fill="#B300F4"/>
                    <mask id="path-13-inside-1_25_1317" fill="white">
                    <path d="M25.5418 17.3323C25.8892 17.4627 26.0667 17.8509 25.9186 18.1911C24.9644 20.3819 23.4227 22.2717 21.4584 23.6477C19.3103 25.1523 16.7573 25.9721 14.1348 25.9993C11.5123 26.0265 8.94285 25.2598 6.76402 23.8C4.77161 22.4651 3.19102 20.6077 2.19161 18.4371C2.03642 18.1001 2.20586 17.7083 2.55048 17.5707C2.89509 17.4331 3.28421 17.602 3.4414 17.9381C4.33894 19.8573 5.7448 21.4997 7.51196 22.6837C9.46558 23.9926 11.7694 24.68 14.1208 24.6556C16.4723 24.6313 18.7614 23.8962 20.6874 22.5471C22.4297 21.3267 23.8012 19.6555 24.6587 17.7181C24.8089 17.3788 25.1944 17.2019 25.5418 17.3323Z"/>
                    </mask>
                    <path d="M25.5418 17.3323C25.8892 17.4627 26.0667 17.8509 25.9186 18.1911C24.9644 20.3819 23.4227 22.2717 21.4584 23.6477C19.3103 25.1523 16.7573 25.9721 14.1348 25.9993C11.5123 26.0265 8.94285 25.2598 6.76402 23.8C4.77161 22.4651 3.19102 20.6077 2.19161 18.4371C2.03642 18.1001 2.20586 17.7083 2.55048 17.5707C2.89509 17.4331 3.28421 17.602 3.4414 17.9381C4.33894 19.8573 5.7448 21.4997 7.51196 22.6837C9.46558 23.9926 11.7694 24.68 14.1208 24.6556C16.4723 24.6313 18.7614 23.8962 20.6874 22.5471C22.4297 21.3267 23.8012 19.6555 24.6587 17.7181C24.8089 17.3788 25.1944 17.2019 25.5418 17.3323Z" stroke="#B300F4" stroke-width="12" mask="url(#path-13-inside-1_25_1317)"/>
            </svg>
            <button class='math-help-ai-result-display__header__button' id='math-help-ai-result-display__header__button'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L10.9393 12L5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L12 13.0607L17.4697 18.5303C17.7626 18.8232 18.2374 18.8232 18.5303 18.5303C18.8232 18.2374 18.8232 17.7626 18.5303 17.4697L13.0607 12L18.5303 6.53033C18.8232 6.23744 18.8232 5.76256 18.5303 5.46967C18.2374 5.17678 17.7626 5.17678 17.4697 5.46967L12 10.9393L6.53033 5.46967Z" fill="white"/>
                </svg>
            </button>
        </div>
        
        <div class='math-help-ai-result-display__response'>
            ${result}
        </div>

        <div class='math-help-ai-result-display__footer'>
            <button class='math-help-ai-result-display__footer__screnshot_btn' id='screenshotButton'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4.75C6.20507 4.75 4.75 6.20507 4.75 8V10C4.75 10.4142 4.41421 10.75 4 10.75C3.58579 10.75 3.25 10.4142 3.25 10V8C3.25 5.37665 5.37665 3.25 8 3.25H10C10.4142 3.25 10.75 3.58579 10.75 4C10.75 4.41421 10.4142 4.75 10 4.75H8Z" fill="white"/>
                    <path d="M4 13.25C4.41421 13.25 4.75 13.5858 4.75 14V16C4.75 17.7949 6.20507 19.25 8 19.25H10C10.4142 19.25 10.75 19.5858 10.75 20C10.75 20.4142 10.4142 20.75 10 20.75H8C5.37665 20.75 3.25 18.6234 3.25 16V14C3.25 13.5858 3.58579 13.25 4 13.25Z" fill="white"/>
                    <path d="M20 13.25C20.4142 13.25 20.75 13.5858 20.75 14V16C20.75 18.6234 18.6234 20.75 16 20.75H14C13.5858 20.75 13.25 20.4142 13.25 20C13.25 19.5858 13.5858 19.25 14 19.25H16C17.7949 19.25 19.25 17.7949 19.25 16V14C19.25 13.5858 19.5858 13.25 20 13.25Z" fill="white"/>
                    <path d="M14 3.25C13.5858 3.25 13.25 3.58579 13.25 4C13.25 4.41421 13.5858 4.75 14 4.75H16C17.7949 4.75 19.25 6.20507 19.25 8V10C19.25 10.4142 19.5858 10.75 20 10.75C20.4142 10.75 20.75 10.4142 20.75 10V8C20.75 5.37665 18.6234 3.25 16 3.25H14Z" fill="white"/>
                </svg>
                &nbsp Screenshot
            </button>
            <button class='math-help-ai-result-display__footer__try-again_btn' id='tryAgainButton'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4697 3.53033C14.1768 3.23744 14.1768 2.76256 14.4697 2.46967C14.7626 2.17678 15.2374 2.17678 15.5303 2.46967L18.5303 5.46967C18.6045 5.54387 18.6599 5.62974 18.6965 5.72138C18.7277 5.79931 18.7452 5.8814 18.7491 5.96402C18.7497 5.97601 18.75 5.98801 18.75 6.00001C18.75 6.10089 18.7301 6.19712 18.694 6.28498C18.6587 6.37086 18.6069 6.45153 18.5385 6.52207C18.5354 6.52524 18.5323 6.52839 18.5292 6.5315L15.5303 9.53033C15.2374 9.82322 14.7626 9.82322 14.4697 9.53033C14.1768 9.23744 14.1768 8.76256 14.4697 8.46967L16.1893 6.75001H7C5.20507 6.75001 3.75 8.20508 3.75 10V16C3.75 16.4142 3.41421 16.75 3 16.75C2.58579 16.75 2.25 16.4142 2.25 16V10C2.25 7.37666 4.37665 5.25001 7 5.25001H16.1894L14.4697 3.53033Z" fill="white"/>
                    <path d="M21.75 8.00001C21.75 7.58579 21.4142 7.25001 21 7.25001C20.5858 7.25001 20.25 7.58579 20.25 8.00001V14C20.25 15.7949 18.7949 17.25 17 17.25L7.81066 17.25L9.53033 15.5303C9.82323 15.2374 9.82323 14.7626 9.53033 14.4697C9.23744 14.1768 8.76257 14.1768 8.46967 14.4697L5.46967 17.4697C5.39851 17.5408 5.34463 17.6228 5.30805 17.7102C5.27066 17.7994 5.25 17.8973 5.25 18C5.25 18.1057 5.27188 18.2064 5.31136 18.2976C5.34349 18.372 5.38822 18.4422 5.44557 18.5051C5.45425 18.5146 5.46317 18.5239 5.47233 18.533L8.46967 21.5303C8.76257 21.8232 9.23744 21.8232 9.53033 21.5303C9.82323 21.2374 9.82323 20.7626 9.53033 20.4697L7.81067 18.75H17C19.6234 18.75 21.75 16.6234 21.75 14V8.00001Z" fill="white"/>
                </svg>
                &nbsp Try again
            </button>
        </div>`
      const closeButton = document.getElementById(
        'math-help-ai-result-display__header__button',
      )
      const tryAgainButton = document.getElementById('tryAgainButton');
      const screenshotButton = document.getElementById('screenshotButton');

      tryAgainButton?.addEventListener('click', function() {
        handleScreenshot();
      });

      screenshotButton?.addEventListener('click', function() {
        handleScreenshot();
      });

      const resetDisplay = function () {
        if (document.body.contains(resultDisplay)) {
          document.body.removeChild(resultDisplay)
        }
        resetSelection()
      }
      closeButton?.addEventListener('click', resetDisplay)
    }
    return true
  })

  // Auth

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'startAuth') {
      chrome.runtime.sendMessage(message)
      return true
    }
  })

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'authSuccess') {
      const { userData } = message;
      console.log('Authenticated user data from content script:', userData);
      return true;
    }
  });
}
