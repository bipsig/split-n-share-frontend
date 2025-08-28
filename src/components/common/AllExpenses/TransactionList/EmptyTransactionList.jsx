import { Receipt } from 'lucide-react';
import React from 'react'

const EmptyTransactionList = ({ searchTerm, filterType, filterCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12">
      <div className="bg-gray-100 text-gray-600 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
        <Receipt size={24} className="lg:w-8 lg:h-8" />
      </div>
      <h4 className="text-gray-800 font-semibold text-base lg:text-lg mb-2">No transactions found</h4>
      <p className="text-gray-500 text-sm max-w-sm">
        {searchTerm || filterType !== 'all' || filterCategory !== 'all'
          ? 'Try adjusting your search or filter criteria'
          : 'Your expense transactions will appear here'}
      </p>
    </div>
  )
}

export default EmptyTransactionList;