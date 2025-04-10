"use client";

import React from 'react';

interface DupeMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const DupeMeter: React.FC<DupeMeterProps> = ({ score, size = 'md' }) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 90) return '#10b981'; // green-500
    if (score >= 75) return '#34d399'; // green-400
    if (score >= 60) return '#fbbf24'; // yellow-400
    return '#fb923c'; // orange-400
  };

  // Determine label based on score
  const getLabel = () => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 75) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Fair Match';
  };

  // Determine size dimensions
  const getDimensions = () => {
    switch (size) {
      case 'sm': return 'w-10 h-10 text-xs';
      case 'lg': return 'w-24 h-24 text-2xl';
      default: return 'w-16 h-16 text-lg';
    }
  };

  const getInnerPadding = () => {
    switch (size) {
      case 'sm': return 'inset-2';
      case 'lg': return 'inset-4';
      default: return 'inset-3';
    }
  };

  const showLabel = size !== 'sm';

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${getDimensions()} rounded-full bg-gray-100 flex items-center justify-center`}>
        <div 
          className="absolute inset-0.5 rounded-full flex items-center justify-center"
          style={{ 
            background: `conic-gradient(${getColor()} ${score}%, transparent ${score}%)`,
            clipPath: 'circle(50% at center)'
          }}
        />
        <div className={`absolute ${getInnerPadding()} rounded-full bg-white flex items-center justify-center`}>
          <span className="font-bold">{score}%</span>
        </div>
      </div>
      {showLabel && <span className="mt-1 text-xs font-medium text-gray-600">{getLabel()}</span>}
    </div>
  );
};

export default DupeMeter;
