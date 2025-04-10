import React from 'react';
import { DupeMeterProps } from '@/lib/types';

const DupeMeter: React.FC<DupeMeterProps> = ({ score }) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-orange-400';
  };

  // Determine label based on score
  const getLabel = () => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 75) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
        <div 
          className="absolute inset-1 rounded-full flex items-center justify-center"
          style={{ 
            background: `conic-gradient(${getColor()} ${score}%, transparent ${score}%)`,
            clipPath: 'circle(50% at center)'
          }}
        />
        <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
          <span className="text-xl font-bold">{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium">{getLabel()}</span>
    </div>
  );
};

export default DupeMeter;
