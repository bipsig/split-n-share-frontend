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
  Share2Icon
} from 'lucide-react';

const GroupPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Dummy group data
  const groupData = {
    _id: '1',
    name: 'Family House',
    description: 'Monthly household expenses and utilities',
    category: 'Home',
    totalBalance: 2450.75,
    currency: 'INR',
    isActive: true,
    createdBy: 'user1',
    createdAt: '2024-01-15T10:30:00Z',
    picturePath: '',
    members: [
      { user: 'user1', username: 'John Doe', role: 'Admin', status: 'active', joinedAt: '2024-01-15T10:30:00Z' },
      { user: 'user2', username: 'Jane Smith', role: 'Member', status: 'active', joinedAt: '2024-01-16T14:20:00Z' },
      { user: 'user3', username: 'Bob Wilson', role: 'Member', status: 'active', joinedAt: '2024-01-17T09:15:00Z' },
      { user: 'user4', username: 'Alice Brown', role: 'Member', status: 'pending', joinedAt: '2024-01-18T16:45:00Z' }
    ],
    // User balances within the group
    memberBalances: [
      { userId: 'user1', username: 'John Doe', balance: 850.25 },
      { userId: 'user2', username: 'Jane Smith', balance: -450.75 },
      { userId: 'user3', username: 'Bob Wilson', balance: 200.50 },
      { userId: 'user4', username: 'Alice Brown', balance: -600.00 }
    ]
  };

  // Dummy transactions data matching the transaction schema
  const transactionsData = [
    {
      _id: 'trans1',
      description: 'Electricity Bill - January',
      slug: 'electricity-bill-january',
      amount: 2500.00,
      user_added: {
        userId: 'user1',
        username: 'John Doe'
      },
      user_paid: {
        userId: 'user1',
        username: 'John Doe'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 625.00 },
        { user: 'user2', username: 'Jane Smith', share: 625.00 },
        { user: 'user3', username: 'Bob Wilson', share: 625.00 },
        { user: 'user4', username: 'Alice Brown', share: 625.00 }
      ],
      isSettled: false,
      groupId: '1',
      groupSlug: 'family-house',
      note: 'Monthly electricity bill for the house',
      type: 'Expense',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-10T09:30:00Z'
    },
    {
      _id: 'trans2',
      description: 'Grocery Shopping - Weekly',
      slug: 'grocery-shopping-weekly',
      amount: 3200.00,
      user_added: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      user_paid: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 800.00 },
        { user: 'user2', username: 'Jane Smith', share: 800.00 },
        { user: 'user3', username: 'Bob Wilson', share: 800.00 },
        { user: 'user4', username: 'Alice Brown', share: 800.00 }
      ],
      isSettled: false,
      groupId: '1',
      groupSlug: 'family-house',
      note: 'Weekly grocery haul from the supermarket',
      type: 'Expense',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-08T15:45:00Z'
    },
    {
      _id: 'trans3',
      description: 'Internet Bill Payment',
      slug: 'internet-bill-payment',
      amount: 1500.00,
      user_added: {
        userId: 'user3',
        username: 'Bob Wilson'
      },
      user_paid: {
        userId: 'user3',
        username: 'Bob Wilson'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 375.00 },
        { user: 'user2', username: 'Jane Smith', share: 375.00 },
        { user: 'user3', username: 'Bob Wilson', share: 375.00 },
        { user: 'user4', username: 'Alice Brown', share: 375.00 }
      ],
      isSettled: true,
      groupId: '1',
      groupSlug: 'family-house',
      note: 'Monthly broadband internet bill',
      type: 'Expense',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-05T11:20:00Z'
    },
    {
      _id: 'trans4',
      description: 'Partial Payment to John',
      slug: 'partial-payment-to-john',
      amount: 1000.00,
      user_added: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      user_paid: {
        userId: 'user2',
        username: 'Jane Smith'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: -1000.00 },
        { user: 'user2', username: 'Jane Smith', share: 1000.00 }
      ],
      isSettled: true,
      groupId: '1',
      groupSlug: 'family-house',
      note: 'Partial settlement for previous expenses',
      type: 'Payment',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-03T18:30:00Z'
    },
    {
      _id: 'trans5',
      description: 'House Cleaning Service',
      slug: 'house-cleaning-service',
      amount: 800.00,
      user_added: {
        userId: 'user4',
        username: 'Alice Brown'
      },
      user_paid: {
        userId: 'user4',
        username: 'Alice Brown'
      },
      users_involved: [
        { user: 'user1', username: 'John Doe', share: 200.00 },
        { user: 'user2', username: 'Jane Smith', share: 200.00 },
        { user: 'user3', username: 'Bob Wilson', share: 200.00 },
        { user: 'user4', username: 'Alice Brown', share: 200.00 }
      ],
      isSettled: false,
      groupId: '1',
      groupSlug: 'family-house',
      note: 'Professional cleaning service',
      type: 'Expense',
      picturePath: '',
      currency: 'INR',
      createdAt: '2024-08-01T14:15:00Z'
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Trip': return <Plane className="w-5 h-5" />;
      case 'Office': return <Briefcase className="w-5 h-5" />;
      case 'Friends': return <Heart className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
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

  const getActiveMembers = () => {
    return groupData.members.filter(member => member.status === 'active').length;
  };

  const getTotalExpenses = () => {
    return transactionsData.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  };

  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type.toLowerCase() === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-3 sm:p-6">

      {/* Header Section */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200 flex-shrink-0">
            <ArrowLeft size={20} />
          </button>

          <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getCategoryColor(groupData.category)} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
            <div className="text-white">{getCategoryIcon(groupData.category)}</div>
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
            <p className="text-xs text-gray-500 break-words">Created {getTimeAgo(groupData.createdAt)} • {getActiveMembers()} members</p>
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
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl sm:rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 sm:mb-2">
              Total Spent
            </h3>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 break-all">{parseAmount(getTotalExpenses())}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-green-50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl sm:rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 sm:mb-2">
              Members
            </h3>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">{getActiveMembers()}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-xl sm:rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
              <Receipt className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 sm:mb-2">
              Transactions
            </h3>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">{transactionsData.length}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-yellow-50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl sm:rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-lg">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 sm:mb-2">
              Group Balance
            </h3>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 break-all">{parseAmount(Math.abs(groupData.totalBalance))}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {/* Mobile Tab Navigation - Scrollable */}
        <div className="flex border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
          {[
            { id: 'transactions', label: 'Transactions', icon: Receipt },
            { id: 'balances', label: 'Balances', icon: Coins },
            { id: 'members', label: 'Members', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
                }`}
            >
              <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-6">
          {activeTab === 'transactions' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium"
                >
                  <option value="all">All Types</option>
                  <option value="expense">Expenses</option>
                  <option value="payment">Payments</option>
                </select>
              </div>

              {/* Transactions List */}
              <div className="space-y-3 sm:space-y-4">
                {filteredTransactions.length === 0 ? (
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
                ) : (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          {/* Transaction Type Icon */}
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${transaction.type === 'Expense'
                              ? 'bg-gradient-to-br from-red-500 to-red-600'
                              : 'bg-gradient-to-br from-green-500 to-green-600'
                            }`}>
                            {transaction.type === 'Expense' ? (
                              <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            ) : (
                              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            )}
                          </div>

                          {/* Transaction Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-800 text-sm sm:text-base break-words">{transaction.description}</h3>
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

                            <p className="text-sm text-gray-600 mb-2 break-words">
                              Paid by <span className="font-medium">{transaction.user_paid.username}</span>
                            </p>

                            {transaction.note && (
                              <p className="text-sm text-gray-500 mb-3 italic break-words">"{transaction.note}"</p>
                            )}

                            {/* Users Involved */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-xs text-gray-500 whitespace-nowrap">Split among:</span>
                              <div className="flex items-center gap-1">
                                {transaction.users_involved.slice(0, 3).map((user, idx) => (
                                  <div key={idx} className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                    {user.username.charAt(0).toUpperCase()}
                                  </div>
                                ))}
                                {transaction.users_involved.length > 3 && (
                                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium flex-shrink-0">
                                    +{transaction.users_involved.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
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
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
                          <p className={`text-xl sm:text-2xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                            } break-all text-right`}>
                            {transaction.type === 'Payment' ? '+' : ''}
                            {parseAmount(transaction.amount)}
                          </p>

                          <div className="flex gap-1 sm:gap-2">
                            <button className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                              <Eye size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                              <Edit size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                              <MoreVertical size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'balances' && (
            <div className="space-y-4">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Group Balance Overview</h3>
                <p className="text-sm text-gray-600">See who owes what in this group</p>
              </div>

              {groupData.memberBalances.map((member) => (
                <div key={member.userId} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-white text-sm sm:text-lg font-bold">
                          {member.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm sm:text-base break-words">{member.username}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {member.balance > 0 ? 'Gets back' : member.balance < 0 ? 'Owes' : 'Settled up'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className={`text-lg sm:text-2xl font-bold break-all ${member.balance > 0 ? 'text-green-600' :
                          member.balance < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                        {member.balance > 0 ? '+' : ''}
                        {parseAmount(member.balance)}
                      </p>
                      {member.balance !== 0 && (
                        <button className={`mt-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${member.balance < 0
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}>
                          {member.balance < 0 ? 'Settle Up' : 'Request'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Group Members</h3>
                  <p className="text-sm text-gray-600">Manage who's part of this group</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
                  <UserPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Add Member</span>
                </button>
              </div>

              {groupData.members.map((member) => (
                <div key={member.user} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm sm:text-lg font-bold">
                            {member.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {member.role === 'Admin' && (
                          <Crown size={14} className="sm:w-4 sm:h-4 absolute -top-1 -right-1 text-yellow-500" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800 text-sm sm:text-base break-words">{member.username}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${member.role === 'Admin'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                            }`}>
                            {member.role}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span className="break-words">Joined {getTimeAgo(member.joinedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {member.status === 'active' && (
                              <>
                                <CheckCircle size={12} className="text-green-500" />
                                <span className="text-green-600">Active</span>
                              </>
                            )}
                            {member.status === 'pending' && (
                              <>
                                <Clock size={12} className="text-yellow-500" />
                                <span className="text-yellow-600">Pending</span>
                              </>
                            )}
                            {member.status === 'left' && (
                              <>
                                <XCircle size={12} className="text-red-500" />
                                <span className="text-red-600">Left</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      {member.status === 'pending' && (
                        <>
                          <button className="px-3 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-200 transition-all duration-200 whitespace-nowrap">
                            Accept
                          </button>
                          <button className="px-3 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 transition-all duration-200 whitespace-nowrap">
                            Decline
                          </button>
                        </>
                      )}
                      <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                        <MoreVertical size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {groupData.members.filter(m => m.status === 'pending').length > 0 && (
                <div className="bg-yellow-50/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700 font-medium break-words">
                      You have {groupData.members.filter(m => m.status === 'pending').length} pending member request(s)
                    </p>
                  </div>
                </div>
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
    </div>
  );
};

export default GroupPage;