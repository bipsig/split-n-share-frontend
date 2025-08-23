import { Crown } from 'lucide-react'
import React from 'react'

const GroupListCardMemberList = ({ group }) => {
  return (
    <div className="flex items-center gap-2">
      {group.members?.slice(0, 4).map((member, idx) => (
        <div key={idx} className="relative group/member">
          <div className={`w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:scale-110 transition-transform duration-200 ${member.status === 'pending' ? 'opacity-50' : ''
            }`}>
            {member.username?.charAt(0).toUpperCase() || '?'}
          </div>
          {member.role === 'Admin' && (
            <Crown size={12} className="absolute -top-1 -right-1 text-yellow-500" />
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/member:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            <div className="flex items-center gap-1">
              {member.username}
              {member.role === 'Admin' && (
                <Crown size={10} className="text-yellow-400" />
              )}
              {member.status === 'pending' && (
                <span className="text-yellow-400">(Pending)</span>
              )}
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )) || []}
      {(group.members?.length || 0) > 4 && (
        <div className="relative group/more">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium cursor-pointer hover:bg-gray-300 transition-colors duration-200">
            +{group.members.length - 4}
          </div>

          {/* Tooltip for remaining members */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/more:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-48">
            <div className="space-y-1">
              <div className="font-medium mb-1">Other members:</div>
              {group.members?.slice(4).map((member, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  {member.username}
                  {member.role === 'Admin' && (
                    <Crown size={10} className="text-yellow-400" />
                  )}
                  {member.status === 'pending' && (
                    <span className="text-yellow-400">(Pending)</span>
                  )}
                </div>
              ))}
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupListCardMemberList
