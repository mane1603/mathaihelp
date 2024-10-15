import React, { useEffect, useState } from 'react';
import styles from './ResultDisplay.module.css'

const ResultDisplay: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const storedResult = await chrome.storage.local.get('result');
      setResult(storedResult.result);
      setMessage(storedResult.message);
    };

    fetchResult();
  }, []);

  return (
    <div className="result-display">
      {message && <p>{message}</p>}
      {result ? <img src={result} alt="Screenshot result" /> : <p>No result to display.</p>}
    </div>
  );
};

export default ResultDisplay;
