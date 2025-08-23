import React from 'react'
import { getCategoryColor } from '../../../utils/getCategoryColor';
import { getCategoryIcon } from '../../../utils/getCategoryIcon';
import { getActiveMembers, getPendingMembers } from '../../../utils/members';
import { parseAmount } from '../../../utils/parseAmount';
import { Calendar, Crown, Edit, ExternalLink, Minus, MoreVertical } from 'lucide-react';
import { parseTime } from '../../../utils/parseTime';

const GroupListCard = ({ group }) => {
  return (
    <div key={group._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg group relative overflow-hidden">

      {/* Group Header */}
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
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Balance Display */}
      <div className="mb-4 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Balance</p>
        <div className={`text-2xl font-bold ${group.userBalance > 0 ? 'text-green-600' :
          group.userBalance < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
          {group.userBalance === 0 ? (
            <div className="flex items-center justify-center gap-2">
              <Minus size={20} />
              <span>Settled</span>
            </div>
          ) : (
            <>
              {group.userBalance > 0 ? '+' : ''}
              {parseAmount(group.userBalance)}
            </>
          )}
        </div>
        {group.userBalance !== 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {group.userBalance > 0 ? "You'll get back" : "You owe"}
          </p>
        )}
      </div>

      {/* Group Stats */}
      <div className="flex justify-between items-center mb-4 py-3 px-4 bg-gray-50/80 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800">{getActiveMembers(group.members)}</p>
          <p className="text-xs text-gray-500">Members</p>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800">{group.transactions?.length || 0}</p>
          <p className="text-xs text-gray-500">Expenses</p>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800">{parseAmount(Math.abs(group.totalBalance))}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      {/* Members Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Members</p>
          {getPendingMembers(group.members) > 0 && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
              {getPendingMembers(group.members)} pending
            </span>
          )}
        </div>
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
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} />
          <span>Created {parseTime(group.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm">
            <ExternalLink size={16} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
            <Edit size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupListCard;