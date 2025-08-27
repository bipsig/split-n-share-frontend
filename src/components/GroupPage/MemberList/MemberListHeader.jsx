import { UserPlus } from 'lucide-react';
import React from 'react'

const MemberListHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Group Members</h3>
        <p className="text-sm text-gray-600">Manage who's part of this group</p>
      </div>
      <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
        <UserPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span>Add Member</span>
      </button>
    </div>
  )
}

export default MemberListHeader;