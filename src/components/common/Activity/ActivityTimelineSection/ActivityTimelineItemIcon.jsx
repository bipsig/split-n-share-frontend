import React from 'react'

const ActivityTimelineItemIcon = ({ activity, getActivityColor, getActivityIcon }) => {
  return (
    <div className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
      <div className="text-white">{getActivityIcon(activity.type)}</div>
    </div>
  )
}

export default ActivityTimelineItemIcon
