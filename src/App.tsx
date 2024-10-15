import React, { useState } from 'react';
import ScreenshotButton from './components/ScreenshotButton/ScreenshotButton';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import Header from './components/Header/Header';
import './style.css'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  return (
    <div className="app-container">
      <Header/> 
      <ScreenshotButton isLoading = {isLoading} setIsLoading={setIsLoading} setResult={setResult}/>
      {result && <ResultDisplay result = {result}/>}
    </div>
  );
};

export default App;
