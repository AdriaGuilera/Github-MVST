import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub username..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                   text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </form>
  );
}