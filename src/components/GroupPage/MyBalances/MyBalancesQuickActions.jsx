import { CreditCard, FileText, Share2 } from 'lucide-react';
import React from 'react'

const MyBalancesQuickActions = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 mt-6">
        <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Quick Actions</h4>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
            <CreditCard size={16} />
            <span>Settle All Debts</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
            <Share2 size={16} />
            <span>Send Reminder</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
            <FileText size={16} />
            <span>View History</span>
          </button>
        </div>
      </div>
  )
}

export default MyBalancesQuickActions;