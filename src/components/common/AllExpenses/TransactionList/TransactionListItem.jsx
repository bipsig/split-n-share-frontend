import React from 'react'
import TransactionListItemIcon from './TransactionListItemIcon';
import TransactionListItemDetails from './TransactionListItemDetails';
import TransactionListItemAmount from './TransactionListItemAmount';

const TransactionListItem = ({ transaction }) => {
  return (
    <div key={transaction._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-4">
        <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
          {/* Transaction and Category Icons */}
          <TransactionListItemIcon transaction={transaction} />

          {/* Transaction Details */}
          <TransactionListItemDetails transaction={transaction} />
        </div>

        {/* Amount and Actions */}
        <TransactionListItemAmount transaction={transaction} />
      </div>
    </div>
  )
}

export default TransactionListItem;