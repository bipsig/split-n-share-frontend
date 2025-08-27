import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Plus,
  Settings,
  MoreVertical,
  Home,
  Plane,
  Briefcase,
  Heart,
  Circle,
  Crown,
  Calendar,
  TrendingUp,
  TrendingDown,
  Receipt,
  DollarSign,
  User,
  Clock,
  Camera,
  Edit,
  Trash2,
  UserPlus,
  CreditCard,
  CheckCircle,
  XCircle,
  FileText,
  Share2,
  Download,
  Filter,
  Search,
  Eye,
  AlertCircle,
  Coins,
  Share,
  Share2Icon,
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
import SearchBar from '../components/common/SearchBar/SearchBar';
import FilterSelect from '../components/common/FilterSelect/FilterSelect';
import SearchAndFilter from '../components/GroupPage/SearchAndFilter';
import EmptyTransactionList from '../components/GroupPage/TransactionList/EmptyTransactionList';
import TransactionIcon from '../components/GroupPage/TransactionList/TransactionListItem/TransactionIcon';
import TransactionDetails from '../components/GroupPage/TransactionList/TransactionListItem/TransactionDetails';
import TransactionAmount from '../components/GroupPage/TransactionList/TransactionListItem/TransactionAmount';
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


  // Dummy group data
  // const groupData = {
  //   _id: '1',
  //   name: 'Family House',
  //   description: 'Monthly household expenses and utilities',
  //   category: 'Home',
  //   totalBalance: 2450.75,
  //   currency: 'INR',
  //   isActive: true,
  //   createdBy: 'user1',
  //   createdAt: '2024-01-15T10:30:00Z',
  //   picturePath: '',
  //   members: [
  //     { user: 'user1', username: 'John Doe', role: 'Admin', status: 'active', joinedAt: '2024-01-15T10:30:00Z' },
  //     { user: 'user2', username: 'Jane Smith', role: 'Member', status: 'active', joinedAt: '2024-01-16T14:20:00Z' },
  //     { user: 'user3', username: 'Bob Wilson', role: 'Member', status: 'active', joinedAt: '2024-01-17T09:15:00Z' },
  //     { user: 'user4', username: 'Alice Brown', role: 'Member', status: 'pending', joinedAt: '2024-01-18T16:45:00Z' }
  //   ],
  //   // User balances within the group
  //   memberBalances: [
  //     { userId: 'user1', username: 'John Doe', balance: 850.25 },
  //     { userId: 'user2', username: 'Jane Smith', balance: -450.75 },
  //     { userId: 'user3', username: 'Bob Wilson', balance: 200.50 },
  //     { userId: 'user4', username: 'Alice Brown', balance: -600.00 }
  //   ]
  // };

  // Dummy transactions data matching the transaction schema
  // const transactionsData = []
  // const transactionsData = [
  //   {
  //     _id: 'trans1',
  //     description: 'Electricity Bill - January',
  //     slug: 'electricity-bill-january',
  //     amount: 2500.00,
  //     user_added: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     user_paid: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 625.00 },
  //       { user: 'user2', username: 'Jane Smith', share: 625.00 },
  //       { user: 'user3', username: 'Bob Wilson', share: 625.00 },
  //       { user: 'user4', username: 'Alice Brown', share: 625.00 }
  //     ],
  //     isSettled: false,
  //     groupId: '1',
  //     groupSlug: 'family-house',
  //     note: 'Monthly electricity bill for the house',
  //     type: 'Expense',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-10T09:30:00Z'
  //   },
  //   {
  //     _id: 'trans2',
  //     description: 'Grocery Shopping - Weekly',
  //     slug: 'grocery-shopping-weekly',
  //     amount: 3200.00,
  //     user_added: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     user_paid: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 800.00 },
  //       { user: 'user2', username: 'Jane Smith', share: 800.00 },
  //       { user: 'user3', username: 'Bob Wilson', share: 800.00 },
  //       { user: 'user4', username: 'Alice Brown', share: 800.00 }
  //     ],
  //     isSettled: false,
  //     groupId: '1',
  //     groupSlug: 'family-house',
  //     note: 'Weekly grocery haul from the supermarket',
  //     type: 'Expense',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-08T15:45:00Z'
  //   },
  //   {
  //     _id: 'trans3',
  //     description: 'Internet Bill Payment',
  //     slug: 'internet-bill-payment',
  //     amount: 1500.00,
  //     user_added: {
  //       userId: 'user3',
  //       username: 'Bob Wilson'
  //     },
  //     user_paid: {
  //       userId: 'user3',
  //       username: 'Bob Wilson'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 375.00 },
  //       { user: 'user2', username: 'Jane Smith', share: 375.00 },
  //       { user: 'user3', username: 'Bob Wilson', share: 375.00 },
  //       { user: 'user4', username: 'Alice Brown', share: 375.00 }
  //     ],
  //     isSettled: true,
  //     groupId: '1',
  //     groupSlug: 'family-house',
  //     note: 'Monthly broadband internet bill',
  //     type: 'Expense',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-05T11:20:00Z'
  //   },
  //   {
  //     _id: 'trans4',
  //     description: 'Partial Payment to John',
  //     slug: 'partial-payment-to-john',
  //     amount: 1000.00,
  //     user_added: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     user_paid: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: -1000.00 },
  //       { user: 'user2', username: 'Jane Smith', share: 1000.00 }
  //     ],
  //     isSettled: true,
  //     groupId: '1',
  //     groupSlug: 'family-house',
  //     note: 'Partial settlement for previous expenses',
  //     type: 'Payment',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-03T18:30:00Z'
  //   },
  //   {
  //     _id: 'trans5',
  //     description: 'House Cleaning Service',
  //     slug: 'house-cleaning-service',
  //     amount: 800.00,
  //     user_added: {
  //       userId: 'user4',
  //       username: 'Alice Brown'
  //     },
  //     user_paid: {
  //       userId: 'user4',
  //       username: 'Alice Brown'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 200.00 },
  //       { user: 'user2', username: 'Jane Smith', share: 200.00 },
  //       { user: 'user3', username: 'Bob Wilson', share: 200.00 },
  //       { user: 'user4', username: 'Alice Brown', share: 200.00 }
  //     ],
  //     isSettled: false,
  //     groupId: '1',
  //     groupSlug: 'family-house',
  //     note: 'Professional cleaning service',
  //     type: 'Expense',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-01T14:15:00Z'
  //   }
  // ];

  const filterOptions = [
    { id: 1, value: 'all', title: 'All Types' },
    { id: 2, value: 'expense', title: 'Expenses' },
    { id: 3, value: 'payment', title: 'Payments' }
  ];

  const getTotalExpenses = () => {
    return transactionsData.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  };

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