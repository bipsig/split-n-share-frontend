import React from 'react'

const ActivityTimelineItemHeader = ({ activity, getActivityTitle }) => {
  return (
    <div className="flex items-center gap-2 mb-1">
      <h4 className="font-semibold text-gray-800">{getActivityTitle(activity.type)}</h4>
      {!activity.isRead && (
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </div>
  )
}

export default ActivityTimelineItemHeader;