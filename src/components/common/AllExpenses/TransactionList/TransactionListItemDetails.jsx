import { Calendar, User } from 'lucide-react';
import React from 'react'
import { parseTime } from '../../../../utils/parseTime';
import TransactionDetailsTags from '../../../GroupPage/TransactionList/TransactionListItem/TransactionDetailsTags';
import TransactionUsers from '../../../GroupPage/TransactionList/TransactionListItem/TransactionUsers';
import TransactionDetailsFooter from '../../../GroupPage/TransactionList/TransactionListItem/TransactionDetailsFooter';

const TransactionListItemDetails = ({ transaction }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-bold text-gray-800 text-sm lg:text-base break-words">{transaction.description}</h3>
        <TransactionDetailsTags transaction={transaction} />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <p className="text-sm text-gray-600 break-words">
          <span className="font-medium text-blue-600">{transaction.groupTitle}</span> • Paid by <span className="font-medium">{transaction.user_paid.username}</span>
        </p>
      </div>

      {transaction.note && (
        <p className="text-sm text-gray-500 mb-3 italic break-words">"{transaction.note}"</p>
      )}

      <TransactionUsers transaction={transaction} />

      <TransactionDetailsFooter transaction={transaction} />
    </div>
  )
}

export default TransactionListItemDetails;