import React from 'react';
import { Activity, Loader2 } from 'lucide-react';
import TransactionItem from './TransactionItem';

const RecentActivitySection = ({ transactions, isLoading }) => {
  return (
    <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <p className="text-sm text-gray-600">Your latest transactions and updates</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200">
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          ) : (
            <>
              {transactions?.count === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="bg-purple-100 text-purple-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
                    <Activity size={28} />
                  </div>
                  <h4 className="text-gray-800 font-semibold text-lg mb-2">No recent transactions</h4>
                  <p className="text-gray-500 text-sm max-w-sm">Your latest expenses and settlements will appear here once you start using the app.</p>
                </div>
              ) : (
                <>
                  {transactions?.data?.map((transaction, index) => (
                    <TransactionItem 
                      key={index}
                      transaction={transaction}
                      index={index}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivitySection;