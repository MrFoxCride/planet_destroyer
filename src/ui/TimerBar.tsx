import React, { useEffect, useState } from 'react';

interface Props {
  startTime: number;
  endTime: number;
  color?: string;
  onComplete?: () => void;
}

export const TimerBar = ({ startTime, endTime, color = '#3b82f6', onComplete }: Props) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (now >= endTime && onComplete) onComplete();
  }, [now, endTime, onComplete]);

  const total = endTime - startTime;
  const progress = Math.min(1, (now - startTime) / total);
  const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
        <div
          className="h-2"
          style={{ width: `${progress * 100}%`, backgroundColor: color }}
        />
      </div>
      <div className="text-xs text-white mt-1 text-center">{remaining}s</div>
    </div>
  );
};
