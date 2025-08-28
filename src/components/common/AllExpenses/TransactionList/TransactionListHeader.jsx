import { Download } from 'lucide-react';
import React from 'react'

const TransactionListHeader = ({ sortedTransactions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <h3 className="text-base lg:text-lg font-semibold text-gray-900">
        All Transactions
      </h3>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''}
        </span>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-all duration-200">
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  )
}

export default TransactionListHeader;