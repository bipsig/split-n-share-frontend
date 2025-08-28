import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Share2,
  IndianRupee,
  ReceiptIndianRupee
} from 'lucide-react';
import { getCategoryIcon } from '../utils/getCategoryIcon';
import { getCategoryColor } from '../utils/getCategoryColor';
import { parseAmount } from '../utils/parseAmount';
import { parseTime } from '../utils/parseTime';
import { getActiveMembers } from '../utils/members';
import PageLayout from '../layouts/PageLayout';
import StatsCard from '../components/common/PageOverview/StatsCard';
import TabNavigationBar from '../components/GroupPage/TabNavigationBar';
import SearchAndFilter from '../components/GroupPage/SearchAndFilter';
import EmptyTransactionList from '../components/GroupPage/TransactionList/EmptyTransactionList';
import TransactionList from '../components/GroupPage/TransactionList/TransactionList';
import MemberList from '../components/GroupPage/MemberList/MemberList';
import PendingMemberList from '../components/GroupPage/MemberList/PendingMemberList';
import MemberListHeader from '../components/GroupPage/MemberList/MemberListHeader';
import GroupBalanceHeader from '../components/GroupPage/GroupBalances/GroupBalanceHeader';
import GroupBalanceList from '../components/GroupPage/GroupBalances/GroupBalanceList/GroupBalanceList';
import { useGetIndividualGroupDetailsQuery, useGetIndividualGroupTransactionsQuery } from '../redux/slices/api/groupsApi';
import { useParams } from 'react-router-dom';
import GroupDetailPageSkeleton from '../components/skeleton/GroupDetailsPage/GroupDetailsSkeleton';
import MyBalancesTab from '../components/GroupPage/MyBalances/MyBalancesTab';
import useUser from '../hooks/useUser';

const GroupPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { username: currentUsername } = useUser();

  const { id } = useParams();
  const { data: group, isLoading: isGroupLoading, isError: isGroupError } = useGetIndividualGroupDetailsQuery(id);
  const { data: transactions, isLoading: isTransactionsLoading, isError: isTransactionsError} = useGetIndividualGroupTransactionsQuery(id);

  const groupData = group ? group.groupData : [];
  const transactionsData = transactions ? transactions.transactionsData : [];

  const filterOptions = [
    { id: 1, value: 'all', title: 'All Types' },
    { id: 2, value: 'expense', title: 'Expenses' },
    { id: 3, value: 'payment', title: 'Payments' }
  ];

  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type.toLowerCase() === filterType;

    return matchesSearch && matchesFilter;
  });

  if (isGroupLoading || isTransactionsLoading) {
    return <GroupDetailPageSkeleton />;
  }

  if (isGroupError || isTransactionsError) {
    return <PageLayout><p className="text-red-500">Failed to load group data.</p></PageLayout>;
  }

  return (
    <PageLayout>

      {/* Header Section */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200 flex-shrink-0">
            <ArrowLeft size={20} />
          </button>

          <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getCategoryColor(groupData.category)} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
            <div className="text-white">{getCategoryIcon(groupData.category, "large")}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent break-words">
                {groupData.name}
              </h1>
              {!groupData.isActive && (
                <span className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1 break-words">{groupData.description}</p>
            <p className="text-xs text-gray-500 break-words">Created {parseTime(groupData.createdAt)} • {getActiveMembers()} members</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
            <Plus size={16} sm:size={18} />
            <span>Add Expense</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
            <CreditCard size={16} sm:size={18} />
            <span>Settle Up</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
            <Share2 size={16} sm:size={18} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatsCard
          icon={IndianRupee}
          title={"Total Spent"}
          size="small"
          value={parseAmount(groupData.totalBalance)}
        />
        <StatsCard
          icon={Users}
          title={"Members"}
          value={groupData.members.length}
          size="small"
          colorTheme='yellow'
        />
        <StatsCard
          icon={ReceiptIndianRupee}
          title={"Transactions"}
          value={groupData.transactions.length}
          size="small"
          colorTheme='purple'
        />
        <StatsCard
          icon={groupData.userBalance > 0 ? TrendingUp : TrendingDown}
          title={"Your Balance"}
          value={parseAmount(groupData.userBalance)}
          colorTheme={groupData.userBalance > 0 ? 'green' : 'red'}
          size="small"
        />

      </div>

      {/* Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {/* Mobile Tab Navigation - Scrollable */}
        <TabNavigationBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        <div className="p-3 sm:p-6">
          {activeTab === 'transactions' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Search and Filter */}
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                filterOptions={filterOptions}
              />

              {/* Transactions List */}
              <div className="space-y-3 sm:space-y-4">
                {filteredTransactions.length === 0 ? (
                  <EmptyTransactionList
                    searchTerm={searchTerm}
                    filterType={filterType}
                  />
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TransactionList transaction={transaction} />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'balances' && (
            <MyBalancesTab user={currentUsername} transactionMatrix={groupData.transactionMatrix}/>
          )}

          {activeTab === 'group-balances' && (
            <div className="space-y-4">
              <GroupBalanceHeader />

              {groupData.members.map((member) => (
                <GroupBalanceList member={member} transactionMatrix={groupData.transactionMatrix} />
              ))}
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4">
              <MemberListHeader />

              {groupData.members.map((member) => (
                <MemberList member={member} />
              ))}

              {groupData.members.filter(m => m.status === 'pending').length > 0 && (
                <PendingMemberList groupData={groupData} />
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
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
    </PageLayout>
  );
};

export default GroupPage;