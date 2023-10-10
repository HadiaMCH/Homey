import React, { useState, useEffect } from 'react';

const CountdownTimer = (initialTime) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = time => (time < 10 ? `0${time}` : time);

  const days = Math.floor(remainingTime / (24 * 3600));
  const hours = Math.floor((remainingTime % (24 * 3600)) / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);

  return (
    <div>
      <p>
        Remaining Time: {days} days {formatTime(hours)} hours {formatTime(minutes)} minutes
      </p>
    </div>
  );
};

export default CountdownTimer;
