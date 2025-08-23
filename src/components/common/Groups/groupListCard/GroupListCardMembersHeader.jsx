import React from 'react'
import { getPendingMembers } from '../../../../utils/members'

const GroupListCardMembersHeader = ({ group }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-gray-700">Members</p>
      {getPendingMembers(group.members) > 0 && (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
          {getPendingMembers(group.members)} pending
        </span>
      )}
    </div>
  )
}

export default GroupListCardMembersHeader
