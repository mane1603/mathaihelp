import React, { useEffect, useState } from 'react';
import ScreenshotButton from './components/ScreenshotButton/ScreenshotButton';
import Header from './components/Header/Header';
import './style.css'
import AttempsLeft from './components/AttempsLeft/AttempsLeft';
import Navigation from './components/Navigation/Navigation';
import ScreenshotGuide from './components/ScreenshotGuide/ScreenshotGuide';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [auth, setAuth] = useState(false)
  // const [result, se tResult] = useState('')
  useEffect(() => {
    // Проверка токена при загрузке
    chrome.storage.local.get(["token"], (result) => {
      if (result.token) {
        setAuth(true);
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
