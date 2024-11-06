import React from 'react';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Search size={32} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Keyword Manager
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;