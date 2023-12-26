import React, { useState, useEffect } from 'react';

const Counter = ({ duration, targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const interval = duration / targetNumber;
    const counterInterval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        console.log(prevNumber);

        if (prevNumber >= targetNumber - 1) {
          clearInterval(counterInterval);
        }

        return prevNumber + 1;
      });
    }, interval);

    return () => {
      clearInterval(counterInterval);
    };
  }, [duration, targetNumber]);

  return (

      <>{currentNumber}</>

  );
};

export default Counter