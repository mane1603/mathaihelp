import React from 'react';
import ScreenshotButton from './components/ScreenshotButton/ScreenshotButton';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import Header from './components/Header/Header';
import './style.css'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header/> 
      <ScreenshotButton />
      <ResultDisplay />
    </div>
  );
};

export default App;
