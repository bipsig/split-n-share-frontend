import React from 'react'
import TransactionDetailsTags from './TransactionDetailsTags';
import TransactionUsers from './TransactionUsers';
import TransactionDetailsFooter from './TransactionDetailsFooter';

const TransactionDetails = ({ transaction }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base break-words">{transaction.description}</h3>
        <TransactionDetailsTags transaction={transaction}/>
      </div>

      <p className="text-sm text-gray-600 mb-2 break-words">
        Paid by <span className="font-medium">{transaction.user_paid.username}</span>
      </p>

      {transaction.note && (
        <p className="text-sm text-gray-500 mb-3 italic break-words">"{transaction.note}"</p>
      )}

      {/* Users Involved */}
      <TransactionUsers transaction={transaction} />

      <TransactionDetailsFooter transaction={transaction}/>
    </div>
  )
}

export default TransactionDetails;