import React, { useState, useEffect } from 'react';

export const useCountUp = (duration, totalNumber) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp;
    let requestId;

    const updateCount = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * totalNumber));

      if (progress < duration) {
        requestId = requestAnimationFrame(updateCount);
      }
    };

    requestId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(requestId);
  }, [duration, totalNumber]);

  return count;
};