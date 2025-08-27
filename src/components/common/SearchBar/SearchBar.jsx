import { Search } from 'lucide-react';
import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (

    <div className="relative flex-1 w-full lg:w-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition-all duration-200 shadow-md"
      />
    </div>
  )
}

export default SearchBar;