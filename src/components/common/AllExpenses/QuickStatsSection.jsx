import { Calendar, CreditCard, Receipt, TrendingUp } from 'lucide-react';
import React from 'react'
import { getCategoryIcon } from '../../../utils/getCategoryIcon';
import { getCategoryColor } from '../../../utils/getCategoryColor';

const QuickStatsSection = ({ sortedTransactions, transactionsData, totalExpenses, totalPayments }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Activity</h3>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div className="space-y-3">
          {sortedTransactions.slice(0, 3).map((transaction) => (
            <div key={transaction._id} className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${transaction.type === 'Expense'
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-green-500 to-green-600'
                }`}>
                {transaction.type === 'Expense' ? (
                  <Receipt className="w-4 h-4 text-white" />
                ) : (
                  <CreditCard className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{transaction.description}</p>
                <p className="text-xs text-gray-600">{transaction.groupName}</p>
              </div>
              <p className={`text-sm font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.type === 'Payment' ? '+' : ''}₹{transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Category Breakdown</h3>
          <Receipt className="w-5 h-5 text-purple-600" />
        </div>
        <div className="space-y-3">
          {['Home', 'Trip', 'Office', 'Friends'].map((category) => {
            const categoryTotal = transactionsData
              .filter(t => t.category === category && t.type === 'Expense')
              .reduce((sum, t) => sum + t.amount, 0);
            const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses * 100) : 0;

            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">₹{categoryTotal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getCategoryColor(category)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Overall Summary</h3>
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-gray-800">₹{totalExpenses}</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expenses</span>
              <span className="text-sm font-semibold text-red-600">₹{totalExpenses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payments</span>
              <span className="text-sm font-semibold text-green-600">₹{totalPayments}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-800">Net Amount</span>
              <span className={`text-sm font-bold ${(totalExpenses - totalPayments) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                ₹{Math.abs(totalExpenses - totalPayments)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickStatsSection;