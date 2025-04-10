import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Search } from 'lucide-react';
import { Button } from './Button';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Ratonica</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-black transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1">
            <User size={18} />
            <span>Sign In</span>
          </Button>
          <Button variant="default" size="sm" className="bg-black hover:bg-gray-800">
            <Search size={18} className="sm:mr-1" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
