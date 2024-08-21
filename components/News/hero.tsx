import React from 'react';

export const Hero = () => {
  return (
    <div className="flex flex-col mb-8">
      <span className="text-[32px] font-sans">Your briefing</span>
      <span className="text-[16px] text-gray-500 font-sans">
        {new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </span>
    </div>
  );
};
