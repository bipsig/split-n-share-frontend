import { Calendar, User } from 'lucide-react';
import React from 'react'
import { parseTime } from '../../../../utils/parseTime';

const TransactionDetailsFooter = ({ transaction }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <Calendar size={12} />
        <span>{parseTime(transaction.createdAt)}</span>
      </div>
      <div className="flex items-center gap-1 break-words">
        <User size={12} />
        <span>Added by {transaction.user_added.username}</span>
      </div>
    </div>
  )
}

export default TransactionDetailsFooter;