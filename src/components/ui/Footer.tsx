"use client";

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-black/40 py-6 text-xs">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-black/60 font-medium">
              ratonica
            </Link>
            <span className="mx-2">·</span>
            <span className="text-black/40"> {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/about" className="text-black/40 hover:text-black/60 transition-colors">
              About
            </Link>
            <Link href="/terms" className="text-black/40 hover:text-black/60 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-black/40 hover:text-black/60 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-black/40 hover:text-black/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
