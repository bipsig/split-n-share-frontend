import React from 'react'
import TransactionIcon from './TransactionListItem/TransactionIcon';
import TransactionDetails from './TransactionListItem/TransactionDetails';
import TransactionAmount from './TransactionListItem/TransactionAmount';

const TransactionList = ({ 
  transaction,
  setActiveTransaction,
  setIsViewTransactionModalOpen,
  setIsDeleteTransactionModalOpen
}) => {
  return (
    <div key={transaction._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Transaction Type Icon */}
          <TransactionIcon transaction={transaction} />

          {/* Transaction Details */}
          <TransactionDetails transaction={transaction} />
        </div>

        {/* Amount and Actions */}
        <TransactionAmount 
          transaction={transaction} 
          setActiveTransaction={setActiveTransaction}
          setIsViewTransactionModalOpen={setIsViewTransactionModalOpen}
          setIsDeleteTransactionModalOpen={setIsDeleteTransactionModalOpen}
        />
      </div>
    </div>
  )
}

export default TransactionList;