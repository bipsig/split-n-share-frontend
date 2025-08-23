import React from 'react'
import GroupCardSkeleton from './GroupCardSkeleton';

const GroupsListSkeleton = () => (
  <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
    <div className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <GroupCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

export default GroupsListSkeleton;
