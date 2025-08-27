import { Receipt } from 'lucide-react';
import React from 'react'

const EmptyTransactionList = ({ searchTerm, filterType }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12">
      <div className="bg-gray-100 text-gray-600 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
        <Receipt size={24} className="sm:w-8 sm:h-8" />
      </div>
      <h4 className="text-gray-800 font-semibold text-base sm:text-lg mb-2">No transactions found</h4>
      <p className="text-gray-500 text-sm max-w-sm">
        {searchTerm || filterType !== 'all'
          ? 'Try adjusting your search or filter criteria'
          : 'Start by adding your first expense to this group'}
      </p>
    </div>
  )
}

export default EmptyTransactionList;