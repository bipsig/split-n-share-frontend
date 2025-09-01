import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount';
import useUser from '../../../../hooks/useUser';

const ActivityTimelineItemAmount = ({ activity }) => {
  const {username: currentUsername} = useUser();
  return (
    <div className="mt-2">
      <span className={`text-lg font-bold ${activity.type === 'PAYMENT_MADE'
        ? activity.actor.username === currentUsername ? 'text-red-600' : 'text-green-600'
        : 'text-blue-800'
        }`}>
        {parseAmount(activity.context.transaction.amount)}
      </span>
    </div>
  )
}

export default ActivityTimelineItemAmount;