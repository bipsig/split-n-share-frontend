import React from 'react'
import { parseTime } from '../../../../utils/parseTime';
import { Check, CreditCard, Eye, MoreHorizontal } from 'lucide-react';
import useUser from '../../../../hooks/useUser';

const ActivityTimelineItemTimestamp = ({ activity }) => {
  const {username: currentUsername } = useUser();
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-xs text-gray-500">
        {parseTime(activity.createdAt)}
      </span>

      {/* Quick Actions */}
      <div className="flex items-center gap-1">
        {!activity.isRead && (
          <button
            onClick={() => markAsRead(activity.id)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
            title="Mark as read"
          >
            <Check size={14} />
          </button>
        )}

        {/* Context-specific quick actions */}
        {(activity.type === 'NOTIFICATION_REMINDER_SENT' && activity.actor.username !== currentUsername) && (
          <button
            onClick={() => handleQuickAction(activity, 'settle')}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 cursor-pointer"
            title="Quick settle"
          >
            <CreditCard size={14} />
          </button>
        )}

        {(activity.type === 'EXPENSE_CREATED' || activity.type === 'EXPENSE_UPDATED') && (
          <button
            onClick={() => handleQuickAction(activity, 'view')}
            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer"
            title="View expense"
          >
            <Eye size={14} />
          </button>
        )}

        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  )
}

export default ActivityTimelineItemTimestamp;