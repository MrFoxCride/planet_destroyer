import React from 'react';

interface Props {
  amount: number;
}

export const DustFlyout = ({ amount }: Props) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-10 text-yellow-300 font-bold pointer-events-none animate-flyout">
      +{amount}
    </div>
  );
};
