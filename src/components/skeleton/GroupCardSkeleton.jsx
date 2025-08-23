import React from 'react'

const GroupCardSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 animate-pulse">
    {/* Header skeleton */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
    </div>

    {/* Balance skeleton */}
    <div className="mb-4 text-center">
      <div className="h-3 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
      <div className="h-8 bg-gray-300 rounded w-24 mx-auto mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
    </div>

    {/* Stats skeleton */}
    <div className="flex justify-between items-center mb-4 py-3 px-4 bg-gray-50/80 rounded-lg">
      <div className="text-center">
        <div className="h-6 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <div className="h-6 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <div className="h-6 bg-gray-300 rounded w-12 mx-auto mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-8 mx-auto"></div>
      </div>
    </div>

    {/* Members skeleton */}
    <div className="mb-4">
      <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    {/* Footer skeleton */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
      <div className="h-3 bg-gray-200 rounded w-24"></div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default GroupCardSkeleton
