import React from 'react';

interface Props {
  amount: number;
  index: number;
}

const positions = [
  { x: -40, y: -30 },
  { x: 40, y: -30 },
  { x: 60, y: 0 },
  { x: 40, y: 30 },
  { x: -40, y: 30 },
];

export const DustFlyout = ({ amount, index }: Props) => {
  const pos = positions[index % positions.length];
  return (
    <div
      className="absolute left-1/2 top-1/2 text-white text-4xl font-bold pointer-events-none animate-flyout"
      style={{ transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)` }}
    >
      +{amount}
    </div>
  );
};
