import React from 'react'

const SearchFilterSkeleton = () => (
  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 animate-pulse">
    <div className="flex flex-col lg:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full lg:w-auto">
        <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="w-32 h-12 bg-gray-300 rounded-xl"></div>
        <div className="w-28 h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export default SearchFilterSkeleton
