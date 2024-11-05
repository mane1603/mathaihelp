import React, { useEffect, useState } from 'react';
import ScreenshotButton from './components/ScreenshotButton/ScreenshotButton';
import Header from './components/Header/Header';
import './style.css'
import AttempsLeft from './components/AttempsLeft/AttempsLeft';
import Navigation from './components/Navigation/Navigation';
import ScreenshotGuide from './components/ScreenshotGuide/ScreenshotGuide';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    chrome.storage.local.set({ token: 'mane@domain.com' }, () => {});
    const checkToken = () => {
        chrome.storage.local.get(["token"], (result) => {
            if (result.token) {
                setAuth(true);
            }
            setIsLoading(false);
        });
    };

    useEffect(() => {
        // Initial token check
        checkToken();

        // Listen for authSuccess message from background script
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "authSuccess") {
                checkToken(); // Re-check token after successful authentication
            }
        });
    }, []);


  // Добавляем listener для обновления состояния при получении сообщения
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "authSuccess" && message.token) {
      setAuth(true);  // Обновляем состояние
    }
  });
  
  
  return (
    <div className="math-help-ai-app-container" id = 'math-help-ai__app-container'>
      <Header auth = {auth} setAuth = {setAuth}/> 
      <AttempsLeft/>
      <ScreenshotButton isLoading = {isLoading} setIsLoading={setIsLoading} />
      <ScreenshotGuide/>
      <Navigation/>
    </div>
  );
};

export default App;
