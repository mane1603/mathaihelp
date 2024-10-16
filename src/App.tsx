import React, { useState } from 'react';
import ScreenshotButton from './components/ScreenshotButton/ScreenshotButton';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import Header from './components/Header/Header';
import './style.css'
import AttempsLeft from './components/AttempsLeft/AttempsLeft';
import Navigation from './components/Navigation/Navigation';
import ScreenshotGuide from './components/ScreenshotGuide/ScreenshotGuide';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [result, setResult] = useState('')
  return (
    <div className="app-container">
      <Header/> 
      <AttempsLeft/>
      <ScreenshotButton isLoading = {isLoading} setIsLoading={setIsLoading} />
      {/* {result && <ResultDisplay result = {result}/>} */}

      <ScreenshotGuide/>

      <Navigation/>
      
    </div>
  );
};

export default App;
