import React from 'react'
import { HandCoins, Home, Loader2, Users, Plus, TrendingUp, Activity, CreditCard, Bell } from 'lucide-react'
import { useGetFinancialSummaryQuery, useGetGroupsSummaryQuery, useGetRecentTransactionsQuery } from '../redux/slices/api/usersApi';
import { parseTime } from '../utils/parseTime';
import { parseGroupMembers } from '../utils/parseGroupMembers';
import { parseAmount } from '../utils/themes/parseAmount';

const Dashboard = () => {
  const { data: financialData, isLoading: isFinancialLoading, isError: isFinancialError } = useGetFinancialSummaryQuery();
  const { data: groupsData, isLoading: isGroupsLoading, isError: isGroupsError } = useGetGroupsSummaryQuery();
  const { data: recentTransactions, isLoading: isTransactionsLoading, isError: isTransactionsError } = useGetRecentTransactionsQuery();

  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">Manage your expenses and track your balance</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus size={18} />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50">
            <CreditCard size={18} />
            <span className="hidden sm:inline">Settle up</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Total Balance Card */}
        <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            {isFinancialLoading ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Total Balance
                </h3>
                <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{parseAmount(financialData.balance)}</p>
                <div className="text-sm text-gray-600 bg-gray-50/80 rounded-lg p-3">
                  You get <span className="font-semibold text-green-600">{parseAmount(financialData.youGetBack)}</span> ·
                  You owe <span className="font-semibold text-red-600">{parseAmount(financialData.youPay)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* You Owe Card */}
        <div className="bg-gradient-to-br from-white via-white to-red-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl"></div>
          <div className="relative z-10 h-full flex flex-col">
            {isFinancialLoading ? (
              <div className="flex justify-center items-center flex-1">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">You Owe</h3>
                </div>

                <div className="flex-1 min-h-0 max-h-60 overflow-y-auto custom-scrollbar">
                  {financialData?.peopleYouOwe.count == 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                      <div className="p-3 bg-green-100 rounded-full mb-3 shadow-sm">
                        <Home size={20} className="text-green-500" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">All Clear! 🎉</p>
                      <p className="text-xs text-gray-500">You don't owe anyone</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {financialData?.peopleYouOwe.data.map((element, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-medium">
                                  {element.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{element.username}</p>
                                <p className="text-xs text-gray-500">You owe</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">{parseAmount(element.amount)}</p>
                              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-300/50 text-red-600 bg-red-50/60 hover:bg-red-100/80 hover:shadow-md transition-all duration-200 text-xs font-medium">
                                <CreditCard size={12} />
                                Pay
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* You Are Owed Card */}
        <div className="bg-gradient-to-br from-white via-white to-green-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
          <div className="relative z-10 h-full flex flex-col">
            {isFinancialLoading ? (
              <div className="flex justify-center items-center flex-1">
                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <HandCoins className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">You Are Owed</h3>
                </div>

                <div className="flex-1 min-h-0 max-h-60 overflow-y-auto custom-scrollbar">
                  {financialData?.peopleWhoOweYou.count == 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                      <div className="p-3 bg-gray-100 rounded-full mb-3 shadow-sm">
                        <HandCoins size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">No pending payments 💸</p>
                      <p className="text-xs text-gray-500">Everyone's settled up</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {financialData?.peopleWhoOweYou.data.map((element, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-medium">
                                  {element.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{element.username}</p>
                                <p className="text-xs text-gray-500">Owes you</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-500">{parseAmount(element.amount)}</p>
                              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-green-300/50 text-green-600 bg-green-50/60 hover:bg-green-100/80 hover:shadow-md transition-all duration-200 text-xs font-medium">
                                <Bell size={12} />
                                Remind
                              </button>

                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
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
            {isTransactionsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            ) : (
              <>
                {recentTransactions.count === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100">
                    <div className="bg-purple-100 text-purple-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
                      <Activity size={28} />
                    </div>
                    <h4 className="text-gray-800 font-semibold text-lg mb-2">No recent transactions</h4>
                    <p className="text-gray-500 text-sm max-w-sm">Your latest expenses and settlements will appear here once you start using the app.</p>
                  </div>
                ) : (
                  <>
                    {recentTransactions.data.map((transaction, index) => {
                      const time = parseTime(transaction.creationTime);
                      return (
                        <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
                                <Home className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-gray-800">{transaction.title}</p>
                                  <span className="text-gray-400">•</span>
                                  <p className="text-sm text-gray-600">{transaction.groupName.name}</p>
                                </div>
                                <p className="text-xs text-gray-500">{transaction.userPaid} paid {parseAmount(transaction.amount)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Groups and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Your Groups */}
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Your Groups</h3>
                  <p className="text-sm text-gray-600">Manage your expense groups</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {isGroupsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : (
                <>
                  {groupsData?.count === 0 ? (
                    <div className="flex flex-col items-center justify-center h-60 text-gray-500">
                      <div className="p-4 bg-blue-100 rounded-full mb-4 shadow-lg">
                        <Users size={32} className="text-blue-500" />
                      </div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">No groups yet</p>
                      <p className="text-sm text-gray-500 mb-4 text-center">Create your first group to start splitting expenses with friends and family</p>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        + Create Group
                      </button>
                    </div>
                  ) : (
                    <>
                      {groupsData.data.map((group, index) => {
                        const subheading = parseGroupMembers(group.members);
                        return (
                          <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{group.name}</p>
                                  <p className="text-sm text-gray-600">{subheading}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${group.type !== 'you owe' ? 'bg-green-200 text-green-700' : ' bg-red-200 text-red-700'}`}>{group.type}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${group.groupBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {group.groupBalance > 0 ? '+' : '-'}{parseAmount(Math.abs(group.groupBalance))}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Summary - Coming Soon */}
        <div className="bg-gradient-to-br from-white via-white to-yellow-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Monthly Summary</h3>
            <p className="text-gray-600 mb-4">Get insights into your spending patterns</p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium">
              🚀 Coming Soon
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  )
}

export default Dashboard