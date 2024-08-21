const skeletonCardClass = 'bg-gray-100 rounded-md';
import React from 'react';

export const SkeletonCard = () => (
  <div className={'bg-white shadow-sm rounded-lg p-4 animate-pulse'}>
    <div className={`${skeletonCardClass} w-full h-24 mb-4`}></div>
    <div className={`${skeletonCardClass}  mb-4`}></div>
    <div className={`${skeletonCardClass} h-4 mb-2`}></div>
  </div>
);
