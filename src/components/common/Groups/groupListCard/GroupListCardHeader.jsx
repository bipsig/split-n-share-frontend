import React from 'react'
import { getCategoryColor } from '../../../../utils/getCategoryColor'
import { MoreVertical } from 'lucide-react'
import { getGroupIcon } from '../../../../utils/getGroupIcon'

const GroupListCardHeader = ({ group }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Enhanced Icon Container */}
        <div className="relative flex-shrink-0">
          <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(group.category)} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
            <div className="text-white text-2xl">
              {getGroupIcon(group.selectedIcon)}
            </div>
          </div>
          {/* Decorative glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(group.category)} rounded-2xl blur-md opacity-20 -z-10`}></div>
        </div>

        {/* Group Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-gray-800 truncate">
              {group.name}
            </h3>
            {!group.isActive && (
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold border border-gray-200">
                Inactive
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 truncate">
              {group.description || 'No description'}
            </p>
          </div>
        </div>
      </div>

      {/* More Options Button */}
      <div className="relative">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  )
}

export default GroupListCardHeader;