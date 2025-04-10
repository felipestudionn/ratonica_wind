'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logos/Ratonicalogo.svg"
        alt="Ratonica"
        fill
        className="object-contain"
        priority
        quality={100}
      />
    </div>
  );
};

export default Logo;
