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

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Dummy data based on the API response structure
  const allTransactions = [
    {
      _id: 'trans1',
      description: 'Monthly Grocery Shopping',
      slug: 'monthly-grocery-shopping',
      amount: 3200,
      user_added: {
        userId: 'user1',
        username: 'John Doe'
      },
      user_paid: {
        userId: 'user1',
        username: 'John Doe'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 800 },
        { user: 'user2', username: 'Jane Smith', share: 800 },
        { user: 'user3', username: 'Bob Wilson', share: 800 },
        { user: 'user4', username: 'Alice Brown', share: 800 }
      ],
      isSettled: false,
      groupId: 'group1',
      groupName: 'Family House',
      groupSlug: 'family-house',
      note: 'Weekly grocery haul from the supermarket',
      type: 'Expense',
      category: 'Home',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-25T15:45:00Z'
    },
    {
      _id: 'trans2',
      description: 'Flight Tickets to Mumbai',
      slug: 'flight-tickets-mumbai',
      amount: 15000,
      user_added: {
        userId: 'user1',
        username: 'John Doe'
      },
      user_paid: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 7500 },
        { user: 'user2', username: 'Jane Smith', share: 7500 }
      ],
      isSettled: true,
      groupId: 'group2',
      groupName: 'Weekend Trip to Mumbai',
      groupSlug: 'weekend-trip-mumbai',
      note: 'Advance booking for business trip',
      type: 'Expense',
      category: 'Trip',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-20T09:30:00Z'
    },
    {
      _id: 'trans3',
      description: 'Team Lunch at Restaurant',
      slug: 'team-lunch-restaurant',
      amount: 2800,
      user_added: {
        userId: 'user3',
        username: 'Bob Wilson'
      },
      user_paid: {
        userId: 'user1',
        username: 'John Doe'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 700 },
        { user: 'user3', username: 'Bob Wilson', share: 700 },
        { user: 'user5', username: 'David Lee', share: 700 },
        { user: 'user6', username: 'Sarah Connor', share: 700 }
      ],
      isSettled: false,
      groupId: 'group3',
      groupName: 'Office Team Lunch',
      groupSlug: 'office-team-lunch',
      note: 'Monthly team outing at Italian restaurant',
      type: 'Expense',
      category: 'Office',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-18T13:20:00Z'
    },
    {
      _id: 'trans4',
      description: 'Settlement Payment',
      slug: 'settlement-payment',
      amount: 1500,
      user_added: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      user_paid: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: -1500 },
        { user: 'user2', username: 'Jane Smith', share: 1500 }
      ],
      isSettled: true,
      groupId: 'group2',
      groupName: 'Weekend Trip to Mumbai',
      groupSlug: 'weekend-trip-mumbai',
      note: 'Partial settlement for hotel expenses',
      type: 'Payment',
      category: 'Trip',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-15T18:30:00Z'
    },
    {
      _id: 'trans5',
      description: 'Movie Night Tickets',
      slug: 'movie-night-tickets',
      amount: 1200,
      user_added: {
        userId: 'user4',
        username: 'Alice Brown'
      },
      user_paid: {
        userId: 'user4',
        username: 'Alice Brown'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 300 },
        { user: 'user4', username: 'Alice Brown', share: 300 },
        { user: 'user7', username: 'Chris Evans', share: 300 },
        { user: 'user8', username: 'Maya Patel', share: 300 }
      ],
      isSettled: false,
      groupId: 'group4',
      groupName: 'Friends Movie Night',
      groupSlug: 'friends-movie-night',
      note: 'Latest Marvel movie premiere',
      type: 'Expense',
      category: 'Friends',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-12T19:45:00Z'
    },
    {
      _id: 'trans6',
      description: 'Electricity Bill - August',
      slug: 'electricity-bill-august',
      amount: 2500,
      user_added: {
        userId: 'user1',
        username: 'John Doe'
      },
      user_paid: {
        userId: 'user3',
        username: 'Bob Wilson'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 625 },
        { user: 'user2', username: 'Jane Smith', share: 625 },
        { user: 'user3', username: 'Bob Wilson', share: 625 },
        { user: 'user4', username: 'Alice Brown', share: 625 }
      ],
      isSettled: true,
      groupId: 'group1',
      groupName: 'Family House',
      groupSlug: 'family-house',
      note: 'Monthly electricity bill for the house',
      type: 'Expense',
      category: 'Home',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-10T09:30:00Z'
    },
    {
      _id: 'trans7',
      description: 'Coffee Shop Meeting',
      slug: 'coffee-shop-meeting',
      amount: 450,
      user_added: {
        userId: 'user5',
        username: 'David Lee'
      },
      user_paid: {
        userId: 'user1',
        username: 'John Doe'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 150 },
        { user: 'user5', username: 'David Lee', share: 150 },
        { user: 'user9', username: 'Lisa Wong', share: 150 }
      ],
      isSettled: false,
      groupId: 'group3',
      groupName: 'Office Team Lunch',
      groupSlug: 'office-team-lunch',
      note: 'Client meeting at Starbucks',
      type: 'Expense',
      category: 'Office',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-08T11:15:00Z'
    },
    {
      _id: 'trans8',
      description: 'Uber to Airport',
      slug: 'uber-to-airport',
      amount: 800,
      user_added: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      user_paid: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 400 },
        { user: 'user2', username: 'Jane Smith', share: 400 }
      ],
      isSettled: true,
      groupId: 'group2',
      groupName: 'Weekend Trip to Mumbai',
      groupSlug: 'weekend-trip-mumbai',
      note: 'Shared ride to catch morning flight',
      type: 'Expense',
      category: 'Trip',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-05T06:30:00Z'
    }
  ];

  const categories = ['all', 'Home', 'Trip', 'Office', 'Friends', 'Other'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Home': return <Home size={18} className="text-blue-600" />;
      case 'Trip': return <Plane size={18} className="text-purple-600" />;
      case 'Office': return <Briefcase size={18} className="text-green-600" />;
      case 'Friends': return <Heart size={18} className="text-pink-600" />;
      default: return <MoreHorizontal size={18} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Home': return 'from-blue-500 to-blue-600';
      case 'Trip': return 'from-purple-500 to-purple-600';
      case 'Office': return 'from-green-500 to-green-600';
      case 'Friends': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const parseAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Filter and sort transactions
  const filteredTransactions = allTransactions.filter(transaction => {
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
  const totalExpenses = allTransactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const totalPayments = allTransactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + t.amount, 0);
  const yourExpenses = allTransactions.filter(t => t.user_paid.username === 'John Doe').reduce((sum, t) => sum + t.amount, 0);
  const unsettledCount = allTransactions.filter(t => !t.isSettled).length;

  return (
    <div className="w-full min-h-screen space-y-4 lg:space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-3 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">All Expenses</h1>
          <p className="text-sm text-gray-600 mt-1">Track all your transactions across groups</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 self-start sm:self-auto">
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
              <DollarSign className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 lg:mb-2">
              Total Expenses
            </h3>
            <p className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-800">{parseAmount(totalExpenses)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-green-50 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
              <CreditCard className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 lg:mb-2">
              You Paid
            </h3>
            <p className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-800">{parseAmount(yourExpenses)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
              <Receipt className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 lg:mb-2">
              Transactions
            </h3>
            <p className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-800">{allTransactions.length}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-yellow-50 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-4 shadow-lg">
              <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 lg:mb-2">
              Unsettled
            </h3>
            <p className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-800">{unsettledCount}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions, groups, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium min-w-28"
              >
                <option value="all">All Types</option>
                <option value="expense">Expenses</option>
                <option value="payment">Payments</option>
              </select>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium min-w-28"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium min-w-32"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200/50">
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
        </div>

        <div className="p-3 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {sortedTransactions.length === 0 ? (
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
            ) : (
              sortedTransactions.map((transaction) => (
                <div key={transaction._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-4">
                    <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
                      {/* Transaction and Category Icons */}
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg ${transaction.type === 'Expense'
                            ? 'bg-gradient-to-br from-red-500 to-red-600'
                            : 'bg-gradient-to-br from-green-500 to-green-600'
                          }`}>
                          {transaction.type === 'Expense' ? (
                            <Receipt className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          ) : (
                            <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          )}
                        </div>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-lg flex items-center justify-center shadow-md self-center">
                          {getCategoryIcon(transaction.category)}
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-800 text-sm lg:text-base break-words">{transaction.description}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${transaction.isSettled
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {transaction.isSettled ? 'Settled' : 'Pending'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${transaction.type === 'Expense'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                            }`}>
                            {transaction.type}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-2">
                          <p className="text-sm text-gray-600 break-words">
                            <span className="font-medium text-blue-600">{transaction.groupName}</span> • Paid by <span className="font-medium">{transaction.user_paid.username}</span>
                          </p>
                        </div>

                        {transaction.note && (
                          <p className="text-sm text-gray-500 mb-3 italic break-words">"{transaction.note}"</p>
                        )}

                        {/* Users Involved */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs text-gray-500 whitespace-nowrap">Split among:</span>
                          <div className="flex items-center gap-1">
                            {transaction.users_involved.slice(0, 4).map((user, idx) => (
                              <div key={idx} className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                            ))}
                            {transaction.users_involved.length > 4 && (
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium flex-shrink-0">
                                +{transaction.users_involved.length - 4}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1 whitespace-nowrap">
                            <Calendar size={12} />
                            <span>{getTimeAgo(transaction.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 break-words">
                            <User size={12} />
                            <span>Added by {transaction.user_added.username}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount and Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 lg:gap-2 flex-shrink-0">
                      <p className={`text-xl lg:text-2xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                        } break-all text-right`}>
                        {transaction.type === 'Payment' ? '+' : ''}
                        {parseAmount(transaction.amount)}
                      </p>

                      <div className="flex gap-1 lg:gap-2">
                        <button className="p-1.5 lg:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                          <Eye size={14} className="lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-1.5 lg:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                          <Edit size={14} className="lg:w-4 lg:h-4" />
                        </button>
                        <button className="p-1.5 lg:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                          <Trash2 size={14} className="lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
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
              const categoryTotal = allTransactions
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
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Monthly Summary</h3>
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
    </div>
  );
};

export default Expenses;