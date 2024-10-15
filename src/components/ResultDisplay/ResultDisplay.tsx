import React, { useEffect, useState } from 'react';
import styles from './ResultDisplay.module.css'

const ResultDisplay: React.FC<{result:string}> = (props) => {
  const [message, setMessage] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchResult = async () => {
  //     const storedResult = await chrome.storage.local.get('result');
  //     setResult(storedResult.result);
  //     setMessage(storedResult.message);
  //   };

  //   fetchResult();
  // }, []);

  return (
    <div className="result-display">
      {message && <p>{message}</p>}
      {props.result ? <p>{props.result}</p>: <p>No result to display.</p>}
    </div>
  );
};

export default ResultDisplay;
