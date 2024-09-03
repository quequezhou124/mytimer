"use client";  

import { useState, useEffect } from 'react';

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0); 
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive === true && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60;
    setSeconds(totalSeconds);
    setIsActive(true);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lime-300 text-white">
      <div className="text-8xl font-mono">
        {String(Math.floor(seconds / 3600)).padStart(2, '0')}:
        {String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:
        {String(seconds % 60).padStart(2, '0')}
      </div>
      <div className="flex space-x-4 mt-4">
        <input
          type="number"
          className="px-4 py-2 text-lime-900 rounded"
          placeholder="Hours"
          onChange={(e) => setHours(Number(e.target.value))}
          disabled={isActive}
          min="0"
        />
        <input
          type="number"
          className="px-4 py-2 text-lime-900 rounded"
          placeholder="Minutes"
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={isActive}
          min="0"
          max="59"
        />
        <button
          className="px-4 py-2 bg-lime-500 rounded"
          onClick={startTimer}
          disabled={isActive || (hours <= 0 && minutes <= 0)}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-orange-400 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
