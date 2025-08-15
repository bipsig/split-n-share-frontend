import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Settings, 
  Search, 
  Filter, 
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
  Minus,
  Edit,
  Trash2,
  UserPlus,
  ExternalLink
} from 'lucide-react';
import { parseTime } from '../utils/parseTime';
import { parseAmount } from '../utils/themes/parseAmount';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data matching the group model structure
  const groupsData = [
    {
      _id: '1',
      name: 'Family House',
      description: 'Monthly household expenses and utilities',
      category: 'Home',
      totalBalance: 2450.75,
      currency: 'INR',
      isActive: true,
      createdBy: 'user1',
      createdAt: '2025-06-15T10:30:00Z',
      members: [
        { user: 'user1', username: 'John Doe', role: 'Admin', status: 'active', joinedAt: '2024-01-15T10:30:00Z' },
        { user: 'user2', username: 'Jane Smith', role: 'Member', status: 'active', joinedAt: '2024-01-16T14:20:00Z' },
        { user: 'user3', username: 'Bob Wilson', role: 'Member', status: 'active', joinedAt: '2024-01-17T09:15:00Z' },
        { user: 'user4', username: 'Alice Brown', role: 'Member', status: 'pending', joinedAt: '2024-01-18T16:45:00Z' }
      ],
      transactions: [{ transaction: 'trans1' }, { transaction: 'trans2' }],
      userBalance: 850.25 // User's balance in this group (positive = they get back, negative = they owe)
    },
    {
      _id: '2',
      name: 'Goa Trip 2024',
      description: 'Beach vacation expenses - accommodation, food, activities',
      category: 'Trip',
      totalBalance: -1200.50,
      currency: 'INR',
      isActive: true,
      createdBy: 'user2',
      createdAt: '2024-02-01T08:15:00Z',
      members: [
        { user: 'user1', username: 'John Doe', role: 'Member', status: 'active', joinedAt: '2024-02-01T08:15:00Z' },
        { user: 'user2', username: 'Jane Smith', role: 'Admin', status: 'active', joinedAt: '2024-02-01T08:15:00Z' },
        { user: 'user5', username: 'Mike Johnson', role: 'Member', status: 'active', joinedAt: '2024-02-02T12:30:00Z' },
        { user: 'user6', username: 'Sarah Davis', role: 'Member', status: 'left', joinedAt: '2024-02-02T12:30:00Z' }
      ],
      transactions: [{ transaction: 'trans3' }, { transaction: 'trans4' }, { transaction: 'trans5' }],
      userBalance: -450.25
    },
    {
      _id: '3',
      name: 'Office Lunch Club',
      description: 'Weekly team lunches and coffee runs',
      category: 'Office',
      totalBalance: 675.00,
      currency: 'INR',
      isActive: true,
      createdBy: 'user1',
      createdAt: '2024-03-10T11:45:00Z',
      members: [
        { user: 'user1', username: 'John Doe', role: 'Admin', status: 'active', joinedAt: '2024-03-10T11:45:00Z' },
        { user: 'user7', username: 'Tom Anderson', role: 'Member', status: 'active', joinedAt: '2024-03-11T09:20:00Z' },
        { user: 'user8', username: 'Lisa Garcia', role: 'Member', status: 'active', joinedAt: '2024-03-12T15:10:00Z' }
      ],
      transactions: [{ transaction: 'trans6' }],
      userBalance: 225.00
    },
    {
      _id: '4',
      name: 'Weekend Squad',
      description: 'Movies, dinners, and weekend fun activities',
      category: 'Friends',
      totalBalance: 0,
      currency: 'INR',
      isActive: true,
      createdBy: 'user3',
      createdAt: '2024-03-20T19:30:00Z',
      members: [
        { user: 'user1', username: 'John Doe', role: 'Member', status: 'active', joinedAt: '2024-03-20T19:30:00Z' },
        { user: 'user3', username: 'Bob Wilson', role: 'Admin', status: 'active', joinedAt: '2024-03-20T19:30:00Z' },
        { user: 'user9', username: 'Emma White', role: 'Member', status: 'active', joinedAt: '2024-03-21T14:15:00Z' },
        { user: 'user10', username: 'Chris Lee', role: 'Member', status: 'pending', joinedAt: '2024-03-22T10:45:00Z' }
      ],
      transactions: [],
      userBalance: 0
    },
    {
      _id: '5',
      name: 'Gym Buddies',
      description: 'Shared gym membership and protein supplements',
      category: 'Other',
      totalBalance: -320.75,
      currency: 'INR',
      isActive: false,
      createdBy: 'user1',
      createdAt: '2024-01-05T07:00:00Z',
      members: [
        { user: 'user1', username: 'John Doe', role: 'Admin', status: 'left', joinedAt: '2024-01-05T07:00:00Z' },
        { user: 'user11', username: 'Ryan Taylor', role: 'Member', status: 'left', joinedAt: '2024-01-06T18:30:00Z' }
      ],
      transactions: [{ transaction: 'trans7' }],
      userBalance: -160.375
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Trip': return <Plane className="w-4 h-4" />;
      case 'Office': return <Briefcase className="w-4 h-4" />;
      case 'Friends': return <Heart className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
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

  const getActiveMembers = (members) => {
    return members.filter(member => member.status === 'active').length;
  };

  const getPendingMembers = (members) => {
    return members.filter(member => member.status === 'pending').length;
  };

  const filteredGroups = groupsData.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && group.isActive) ||
                         (filterStatus === 'inactive' && !group.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            Your Groups
          </h1>
          <p className="text-sm text-gray-600 mt-1">Manage your expense groups and track spending</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus size={18} />
            <span className="hidden sm:inline">New Group</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50">
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full lg:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium"
            >
              <option value="all">All Categories</option>
              <option value="Home">Home</option>
              <option value="Trip">Trip</option>
              <option value="Office">Office</option>
              <option value="Friends">Friends</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Groups Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">
              Total Groups
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3 text-center">{groupsData.length}</p>
            <p className="text-sm text-gray-600 text-center">{groupsData.filter(g => g.isActive).length} active</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-green-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">
              Total You're Owed
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-green-600 mb-3 text-center">
              {parseAmount(groupsData.reduce((sum, group) => sum + (group.userBalance > 0 ? group.userBalance : 0), 0))}
            </p>
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-red-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">
              Total You Owe
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-red-600 mb-3 text-center">
              {parseAmount(Math.abs(groupsData.reduce((sum, group) => sum + (group.userBalance < 0 ? group.userBalance : 0), 0)))}
            </p>
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          </div>
        </div>
      </div>

      {/* Groups List */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          {filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
                <Users size={32} />
              </div>
              <h4 className="text-gray-800 font-semibold text-lg mb-2">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? 'No groups found' : 'No groups yet'}
              </h4>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first group to start splitting expenses with friends and family'}
              </p>
              {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  + Create Your First Group
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <div key={group._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg group relative overflow-hidden">
                  
                  {/* Group Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(group.category)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        {getCategoryIcon(group.category)}
                        <div className="text-white">{getCategoryIcon(group.category)}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 truncate">{group.name}</h3>
                          {!group.isActive && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{group.description || 'No description'}</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Balance Display */}
                  <div className="mb-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Balance</p>
                    <div className={`text-2xl font-bold ${
                      group.userBalance > 0 ? 'text-green-600' : 
                      group.userBalance < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {group.userBalance === 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <Minus size={20} />
                          <span>Settled</span>
                        </div>
                      ) : (
                        <>
                          {group.userBalance > 0 ? '+' : ''}
                          {parseAmount(group.userBalance)}
                        </>
                      )}
                    </div>
                    {group.userBalance !== 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {group.userBalance > 0 ? "You'll get back" : "You owe"}
                      </p>
                    )}
                  </div>

                  {/* Group Stats */}
                  <div className="flex justify-between items-center mb-4 py-3 px-4 bg-gray-50/80 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">{getActiveMembers(group.members)}</p>
                      <p className="text-xs text-gray-500">Members</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">{group.transactions.length}</p>
                      <p className="text-xs text-gray-500">Expenses</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800">{parseAmount(Math.abs(group.totalBalance))}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>

                  {/* Members Preview */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Members</p>
                      {getPendingMembers(group.members) > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          {getPendingMembers(group.members)} pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {group.members.slice(0, 4).map((member, idx) => (
                        <div key={idx} className="relative">
                          <div className={`w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                            member.status === 'pending' ? 'opacity-50' : ''
                          }`}>
                            {member.username.charAt(0).toUpperCase()}
                          </div>
                          {member.role === 'Admin' && (
                            <Crown size={12} className="absolute -top-1 -right-1 text-yellow-500" />
                          )}
                        </div>
                      ))}
                      {group.members.length > 4 && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                          +{group.members.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>Created {parseTime(group.createdAt)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
  );
};

export default Groups;