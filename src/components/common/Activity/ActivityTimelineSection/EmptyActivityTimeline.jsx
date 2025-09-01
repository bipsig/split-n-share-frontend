import { Activity } from 'lucide-react';
import React from 'react'

const EmptyActivityTimeline = ({ showOnlyUnread }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12">
      <div className="bg-gray-100 text-gray-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
        <Activity size={32} />
      </div>
      <h4 className="text-gray-800 font-semibold text-lg mb-2">No activities found</h4>
      <p className="text-gray-500 text-sm max-w-sm">
        {showOnlyUnread
          ? "You're all caught up! No unread activities."
          : "No activities match your current filter criteria."}
      </p>
    </div>
  )
}

export default EmptyActivityTimeline;