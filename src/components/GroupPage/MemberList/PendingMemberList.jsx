import { AlertCircle } from 'lucide-react';
import React from 'react'

const PendingMemberList = ({ groupData }) => {
  return (
    <div className="bg-yellow-50/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50">
      <div className="flex items-start gap-2">
        <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-700 font-medium break-words">
          You have {groupData.members.filter(m => m.status === 'pending').length} pending member request(s)
        </p>
      </div>
    </div>
  )
}

export default PendingMemberList;