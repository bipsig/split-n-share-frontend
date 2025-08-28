import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  User,
  Receipt,
  CreditCard,
  Home,
  Plane,
  Briefcase,
  Heart,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Plus
} from 'lucide-react';
import { getCategoryIcon } from '../utils/getCategoryIcon';
import { getCategoryColor } from '../utils/getCategoryColor';
import { parseAmount } from '../utils/parseAmount';
import { parseTime } from '../utils/parseTime';
import PageLayout from '../layouts/PageLayout';
import PageHeaderSection from '../layouts/PageHeaderSection';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageOverviewSection from '../layouts/PageOverviewSection';
import StatsCard from '../components/common/PageOverview/StatsCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import FilterSelect from '../components/common/FilterSelect/FilterSelect';
import { useGetUserTransactionDetailsQuery } from '../redux/slices/api/usersApi';
import AllExpensesPageSkeleton from '../components/skeleton/AllExpensesPage/AllExpensesSkeleton';
import TransactionListHeader from '../components/common/AllExpenses/TransactionList/TransactionListHeader';
import useUser from '../hooks/useUser';
import EmptyTransactionList from '../components/common/AllExpenses/TransactionList/EmptyTransactionList';
import TransactionListItem from '../components/common/AllExpenses/TransactionList/TransactionListItem';
import QuickStatsSection from '../components/common/AllExpenses/QuickStatsSection';

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { username: currentUsername } = useUser();

  const { data: transactions, isLoading: isTransactionsLoading, isError: isTransactionsError } = useGetUserTransactionDetailsQuery();

  const transactionsData = transactions ? transactions.transactionsData : [];

  const transactionTypeOptions = [
    {id: 1, value: 'all', title: 'All Types'},
    {id: 2, value: 'expense', title: 'Expenses'},
    {id: 3, value: 'payment', title: 'Payments'}
  ];

  const categoryTypeOptions = [
    { id: 1, value: 'all', title: 'All Categories'},
    { id: 2, value: 'Home', title: 'Home'},
    { id: 3, value: 'Trip', title: 'Trip'},
    { id: 4, value: 'Office', title: 'Office'},
    { id: 5, value: 'Friends', title: 'Friends'},
    { id: 6, value: 'Other', title: 'Other'},
  ]

  const sortingOptions = [
    { id: 1, value: 'newest', title: 'Newest First'},
    { id: 2, value: 'oldest', title: 'Oldest First'},
    { id: 3, value: 'amount-high', title: 'Amount: High to Low'},
    { id: 4, value: 'amount-low', title: 'Amount: Low to High'},
  ]

  // Dummy data based on the API response structure
  // const allTransactions = [
  //   {
  //     _id: 'trans1',
  //     description: 'Monthly Grocery Shopping',
  //     slug: 'monthly-grocery-shopping',
  //     amount: 3200,
  //     user_added: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     user_paid: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 800 },
  //       { user: 'user2', username: 'Jane Smith', share: 800 },
  //       { user: 'user3', username: 'Bob Wilson', share: 800 },
  //       { user: 'user4', username: 'Alice Brown', share: 800 }
  //     ],
  //     isSettled: false,
  //     groupId: 'group1',
  //     groupName: 'Family House',
  //     groupSlug: 'family-house',
  //     note: 'Weekly grocery haul from the supermarket',
  //     type: 'Expense',
  //     category: 'Home',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-25T15:45:00Z'
  //   },
  //   {
  //     _id: 'trans2',
  //     description: 'Flight Tickets to Mumbai',
  //     slug: 'flight-tickets-mumbai',
  //     amount: 15000,
  //     user_added: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     user_paid: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 7500 },
  //       { user: 'user2', username: 'Jane Smith', share: 7500 }
  //     ],
  //     isSettled: true,
  //     groupId: 'group2',
  //     groupName: 'Weekend Trip to Mumbai',
  //     groupSlug: 'weekend-trip-mumbai',
  //     note: 'Advance booking for business trip',
  //     type: 'Expense',
  //     category: 'Trip',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-20T09:30:00Z'
  //   },
  //   {
  //     _id: 'trans3',
  //     description: 'Team Lunch at Restaurant',
  //     slug: 'team-lunch-restaurant',
  //     amount: 2800,
  //     user_added: {
  //       userId: 'user3',
  //       username: 'Bob Wilson'
  //     },
  //     user_paid: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 700 },
  //       { user: 'user3', username: 'Bob Wilson', share: 700 },
  //       { user: 'user5', username: 'David Lee', share: 700 },
  //       { user: 'user6', username: 'Sarah Connor', share: 700 }
  //     ],
  //     isSettled: false,
  //     groupId: 'group3',
  //     groupName: 'Office Team Lunch',
  //     groupSlug: 'office-team-lunch',
  //     note: 'Monthly team outing at Italian restaurant',
  //     type: 'Expense',
  //     category: 'Office',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-18T13:20:00Z'
  //   },
  //   {
  //     _id: 'trans4',
  //     description: 'Settlement Payment',
  //     slug: 'settlement-payment',
  //     amount: 1500,
  //     user_added: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     user_paid: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: -1500 },
  //       { user: 'user2', username: 'Jane Smith', share: 1500 }
  //     ],
  //     isSettled: true,
  //     groupId: 'group2',
  //     groupName: 'Weekend Trip to Mumbai',
  //     groupSlug: 'weekend-trip-mumbai',
  //     note: 'Partial settlement for hotel expenses',
  //     type: 'Payment',
  //     category: 'Trip',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-15T18:30:00Z'
  //   },
  //   {
  //     _id: 'trans5',
  //     description: 'Movie Night Tickets',
  //     slug: 'movie-night-tickets',
  //     amount: 1200,
  //     user_added: {
  //       userId: 'user4',
  //       username: 'Alice Brown'
  //     },
  //     user_paid: {
  //       userId: 'user4',
  //       username: 'Alice Brown'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 300 },
  //       { user: 'user4', username: 'Alice Brown', share: 300 },
  //       { user: 'user7', username: 'Chris Evans', share: 300 },
  //       { user: 'user8', username: 'Maya Patel', share: 300 }
  //     ],
  //     isSettled: false,
  //     groupId: 'group4',
  //     groupName: 'Friends Movie Night',
  //     groupSlug: 'friends-movie-night',
  //     note: 'Latest Marvel movie premiere',
  //     type: 'Expense',
  //     category: 'Friends',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-12T19:45:00Z'
  //   },
  //   {
  //     _id: 'trans6',
  //     description: 'Electricity Bill - August',
  //     slug: 'electricity-bill-august',
  //     amount: 2500,
  //     user_added: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     user_paid: {
  //       userId: 'user3',
  //       username: 'Bob Wilson'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 625 },
  //       { user: 'user2', username: 'Jane Smith', share: 625 },
  //       { user: 'user3', username: 'Bob Wilson', share: 625 },
  //       { user: 'user4', username: 'Alice Brown', share: 625 }
  //     ],
  //     isSettled: true,
  //     groupId: 'group1',
  //     groupName: 'Family House',
  //     groupSlug: 'family-house',
  //     note: 'Monthly electricity bill for the house',
  //     type: 'Expense',
  //     category: 'Home',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-10T09:30:00Z'
  //   },
  //   {
  //     _id: 'trans7',
  //     description: 'Coffee Shop Meeting',
  //     slug: 'coffee-shop-meeting',
  //     amount: 450,
  //     user_added: {
  //       userId: 'user5',
  //       username: 'David Lee'
  //     },
  //     user_paid: {
  //       userId: 'user1',
  //       username: 'John Doe'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 150 },
  //       { user: 'user5', username: 'David Lee', share: 150 },
  //       { user: 'user9', username: 'Lisa Wong', share: 150 }
  //     ],
  //     isSettled: false,
  //     groupId: 'group3',
  //     groupName: 'Office Team Lunch',
  //     groupSlug: 'office-team-lunch',
  //     note: 'Client meeting at Starbucks',
  //     type: 'Expense',
  //     category: 'Office',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-08T11:15:00Z'
  //   },
  //   {
  //     _id: 'trans8',
  //     description: 'Uber to Airport',
  //     slug: 'uber-to-airport',
  //     amount: 800,
  //     user_added: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     user_paid: {
  //       userId: 'user2',
  //       username: 'Jane Smith'
  //     },
  //     users_involved: [
  //       { user: 'user1', username: 'John Doe', share: 400 },
  //       { user: 'user2', username: 'Jane Smith', share: 400 }
  //     ],
  //     isSettled: true,
  //     groupId: 'group2',
  //     groupName: 'Weekend Trip to Mumbai',
  //     groupSlug: 'weekend-trip-mumbai',
  //     note: 'Shared ride to catch morning flight',
  //     type: 'Expense',
  //     category: 'Trip',
  //     picturePath: '',
  //     currency: 'INR',
  //     createdAt: '2024-08-05T06:30:00Z'
  //   }
  // ];

  const categories = ['all', 'Home', 'Trip', 'Office', 'Friends', 'Other'];

  // const getCategoryIcon = (category) => {
  //   switch (category) {
  //     case 'Home': return <Home size={18} className="text-blue-600" />;
  //     case 'Trip': return <Plane size={18} className="text-purple-600" />;
  //     case 'Office': return <Briefcase size={18} className="text-green-600" />;
  //     case 'Friends': return <Heart size={18} className="text-pink-600" />;
  //     default: return <MoreHorizontal size={18} className="text-gray-600" />;
  //   }
  // };

  // const getCategoryColor = (category) => {
  //   switch (category) {
  //     case 'Home': return 'from-blue-500 to-blue-600';
  //     case 'Trip': return 'from-purple-500 to-purple-600';
  //     case 'Office': return 'from-green-500 to-green-600';
  //     case 'Friends': return 'from-pink-500 to-pink-600';
  //     default: return 'from-gray-500 to-gray-600';
  //   }
  // };

  // const parseAmount = (amount) => {
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     minimumFractionDigits: 2
  //   }).format(amount);
  // };

  // const getTimeAgo = (dateString) => {
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  //   if (diffInDays === 0) return 'Today';
  //   if (diffInDays === 1) return '1 day ago';
  //   if (diffInDays < 30) return `${diffInDays} days ago`;
  //   if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  //   return `${Math.floor(diffInDays / 365)} years ago`;
  // };

  // Filter and sort transactions
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.groupName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type.toLowerCase() === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'amount-high':
        return b.amount - a.amount;
      case 'amount-low':
        return a.amount - b.amount;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Calculate summary statistics
  const totalExpenses = transactionsData.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const totalPayments = transactionsData.filter(t => t.type === 'Payment').reduce((sum, t) => sum + t.amount, 0);
  const yourExpenses = transactionsData.filter(t => t.user_paid.username === currentUsername).reduce((sum, t) => sum + t.amount, 0);

  if (isTransactionsLoading) {
    return <AllExpensesPageSkeleton />
  }

  if (isTransactionsError) {
      return <PageLayout><p className="text-red-500">Failed to load transactions data.</p></PageLayout>;
    }

  return (
    <PageLayout>

      <PageHeaderSection
        heading="All Expenses"
        subtitle="Track all your transactions across groups"
      >
        <HeaderButton variant='primary' icon={Plus}>
          Add Expense
        </HeaderButton>
      </PageHeaderSection>

      <PageOverviewSection>
        <StatsCard
          icon={DollarSign}
          title={"Total Expenses"}
          value={parseAmount(totalExpenses)}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />

        <StatsCard
          icon={CreditCard}
          value={parseAmount(yourExpenses)}
          title={'Your Share'}
          colorTheme='green'
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />

        <StatsCard
          icon={DollarSign}
          title={"Transactions"}
          colorTheme='purple'
          value={transactionsData.length}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />
      </PageOverviewSection>

      {/* Filters and Search */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search transactions, groups or notes..."}
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <FilterSelect
                filterType={filterType}
                setFilterType={setFilterType}
                options={transactionTypeOptions} 
              />

              <FilterSelect
                filterType={filterCategory}
                setFilterType={setFilterCategory}
                options={categoryTypeOptions}
              />

              <ArrowUpDown size={20} className="text-gray-500" />

              <FilterSelect
                filterType={sortBy}
                setFilterType={setSortBy}
                options={sortingOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200/50">
          <TransactionListHeader sortedTransactions={sortedTransactions}/>
        </div>

        <div className="p-3 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {sortedTransactions.length === 0 ? (
              <EmptyTransactionList searchTerm={searchTerm} filterType={filterType} filterCategory={filterCategory} />
            ) : (
              sortedTransactions.map((transaction) => (
                <TransactionListItem transaction={transaction} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsSection sortedTransactions={sortedTransactions} transactionsData={transactionsData} totalExpenses={totalExpenses} totalPayments={totalPayments} />

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

export default Expenses;