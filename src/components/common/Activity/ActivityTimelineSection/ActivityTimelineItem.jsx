import { Check, CreditCard, Eye, Home, MoreHorizontal } from 'lucide-react';
import React, { act } from 'react'
import { parseTime } from '../../../../utils/parseTime';
import { parseAmount } from '../../../../utils/parseAmount';
import ActivityTimelineItemIcon from './ActivityTimelineItemIcon';
import ActivityTimelineItemHeader from './ActivityTimelineItemHeader';
import ActivityTimelineItemAmount from './ActivityTimelineItemAmount';
import ActivityTimelineParticipants from './ActivityTimelineParticipants';
import ActivityTimelineItemTimestamp from './ActivityTimelineItemTimestamp';
import useUser from '../../../../hooks/useUser';

const ActivityTimelineItem = ({ activity, getActivityColor, getActivityIcon, getActivityBgColor, getActivityTitle, getActivityDescription }) => {
  const { username: currentUsername } = useUser();
  console.log (activity)
  return (
    <div
      key={activity.id}
      className={`relative bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md ${!activity.isRead ? 'ring-2 ring-blue-500/20 bg-blue-50/30' : ''
        }`}
    >
      <div className="flex items-start gap-4">
        {/* Activity Icon */}
        <ActivityTimelineItemIcon activity={activity} getActivityColor={getActivityColor} getActivityIcon={getActivityIcon} />

        {/* Activity Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <ActivityTimelineItemHeader activity={activity} getActivityTitle={getActivityTitle} />

              <p className="text-gray-600 text-sm">{getActivityDescription(activity, currentUsername)}</p>

              {/* Amount Display */}
              {activity.context.transaction?.amount && (
                <ActivityTimelineItemAmount activity={activity} />
              )}

              {/* Participants */}
              {activity.context.targetUser 
                ? <ActivityTimelineParticipants activity={activity} userData={[activity.context.targetUser]} />
                : <ActivityTimelineParticipants activity={activity} userData={activity.recipients} />}
            </div>

            {/* Timestamp and Actions */}
            <ActivityTimelineItemTimestamp activity={activity} />
          </div>
        </div>
      </div>

      {/* Activity Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getActivityBgColor(activity.type)} rounded-xl pointer-events-none`}></div>
    </div>
  )
}

export default ActivityTimelineItem;