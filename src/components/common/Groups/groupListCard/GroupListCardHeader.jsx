import React from 'react'
import { getCategoryColor } from '../../../../utils/getCategoryColor'
import { getCategoryIcon } from '../../../../utils/getCategoryIcon'
import { MoreVertical } from 'lucide-react'

const GroupListCardHeader = ({ group }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(group.category)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
          {getCategoryIcon(group.category)}
          <div className="text-white">{getCategoryIcon(group.category)}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-800 truncate">{group.name}</h3>
            {!group.isActive && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{group.description || 'No description'}</p>
        </div>
      </div>

      <div className="relative">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
          <MoreVertical  size={18} />
        </button>
      </div>
    </div>
  )
}

export default GroupListCardHeader;
