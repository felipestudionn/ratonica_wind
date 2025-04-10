"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <div className="flex items-center">
                <Image 
                  src="/logos/ratonica-r-logo.svg" 
                  alt="Ratonica" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10"
                />
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/app" className="text-[#8a6f5c] hover:text-[#a58778] text-sm font-medium transition-colors">
                App
              </Link>
              <Link href="/sale" className="text-[#8a6f5c] hover:text-[#a58778] text-sm font-medium transition-colors">
                Sale
              </Link>
              <Link href="/blog" className="text-[#8a6f5c] hover:text-[#a58778] text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link href="/professional" className="text-[#8a6f5c] hover:text-[#a58778] text-sm font-medium transition-colors">
                Professional
              </Link>
            </nav>
          </div>
          
          {/* Sign Up and Menu */}
          <div className="flex items-center gap-3">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-white text-black hover:bg-white/90 rounded-full px-4 py-2 text-sm font-medium"
            >
              Sign up
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-[#8a6f5c] hover:text-[#a58778] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/app" 
              className="text-[#8a6f5c] hover:text-[#a58778] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              App
            </Link>
            <Link 
              href="/sale" 
              className="text-[#8a6f5c] hover:text-[#a58778] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sale
            </Link>
            <Link 
              href="/blog" 
              className="text-[#8a6f5c] hover:text-[#a58778] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/professional" 
              className="text-[#8a6f5c] hover:text-[#a58778] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Professional
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
