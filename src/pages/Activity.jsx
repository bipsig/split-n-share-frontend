import React, { useState } from 'react';
import { 
  Activity, 
  Settings, 
  Filter,
  CheckCircle2,
  Circle,
  Plus,
  CreditCard,
  Users,
  Edit3,
  Bell,
  Home,
  TrendingUp,
  TrendingDown,
  UserPlus,
  UserMinus,
  AlertCircle,
  DollarSign,
  Calendar,
  Clock,
  Eye,
  MoreHorizontal,
  RefreshCw,
  BellRing,
  Check
} from 'lucide-react';
import { parseTime } from '../utils/parseTime';
import { parseAmount } from '../utils/parseAmount';
import ActivityPageComingSoon from '../components/ComingSoonFeatures/ActivityPageComingSoon';

const ActivityPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Mock activity data with different types
  const activityData = [
    {
      id: 1,
      type: 'expense_added',
      title: 'New expense added',
      description: 'John Doe added "Grocery Shopping" to Family House',
      amount: 2450.50,
      user: 'John Doe',
      group: 'Family House',
      timestamp: '2025-08-15T14:30:00Z',
      isRead: false,
      participants: ['John Doe', 'Jane Smith', 'Bob Wilson'],
      metadata: { expenseId: 'exp_1', groupId: 'grp_1' }
    },
    {
      id: 2,
      type: 'payment_settled',
      title: 'Payment settled',
      description: 'Jane Smith settled ₹850.25 with John Doe',
      amount: 850.25,
      user: 'Jane Smith',
      group: null,
      timestamp: '2025-08-15T13:45:00Z',
      isRead: false,
      participants: ['Jane Smith', 'John Doe'],
      metadata: { settlementId: 'set_1' }
    },
    {
      id: 3,
      type: 'member_added',
      title: 'Member added',
      description: 'Alice Brown was added to "Goa Trip 2024"',
      amount: null,
      user: 'Mike Johnson',
      group: 'Goa Trip 2024',
      timestamp: '2025-08-15T12:20:00Z',
      isRead: true,
      participants: ['Mike Johnson', 'Alice Brown'],
      metadata: { groupId: 'grp_2', newMember: 'Alice Brown' }
    },
    {
      id: 4,
      type: 'expense_edited',
      title: 'Expense updated',
      description: 'Bob Wilson updated "Dinner at Restaurant" in Weekend Squad',
      amount: 1200.00,
      user: 'Bob Wilson',
      group: 'Weekend Squad',
      timestamp: '2025-08-15T11:15:00Z',
      isRead: true,
      participants: ['Bob Wilson', 'Emma White', 'Chris Lee'],
      metadata: { expenseId: 'exp_3', groupId: 'grp_4' }
    },
    {
      id: 5,
      type: 'reminder_sent',
      title: 'Reminder sent',
      description: 'You reminded Sarah Davis about ₹450.25 payment',
      amount: 450.25,
      user: 'You',
      group: 'Office Lunch Club',
      timestamp: '2025-08-15T10:30:00Z',
      isRead: true,
      participants: ['You', 'Sarah Davis'],
      metadata: { reminderId: 'rem_1' }
    },
    {
      id: 6,
      type: 'group_created',
      title: 'Group created',
      description: 'You created a new group "Gym Buddies"',
      amount: null,
      user: 'You',
      group: 'Gym Buddies',
      timestamp: '2025-08-15T09:45:00Z',
      isRead: false,
      participants: ['You'],
      metadata: { groupId: 'grp_5' }
    },
    {
      id: 7,
      type: 'balance_updated',
      title: 'Balance updated',
      description: 'Your balance in "Family House" changed to +₹320.75',
      amount: 320.75,
      user: 'System',
      group: 'Family House',
      timestamp: '2025-08-15T08:20:00Z',
      isRead: true,
      participants: [],
      metadata: { groupId: 'grp_1', balanceChange: 320.75 }
    },
    {
      id: 8,
      type: 'settlement_request',
      title: 'Settlement requested',
      description: 'Tom Anderson requested settlement for ₹675.50',
      amount: 675.50,
      user: 'Tom Anderson',
      group: 'Office Lunch Club',
      timestamp: '2025-08-15T07:10:00Z',
      isRead: true,
      participants: ['Tom Anderson', 'You'],
      metadata: { requestId: 'req_1' }
    },
    {
      id: 9,
      type: 'member_left',
      title: 'Member left',
      description: 'Chris Lee left the group "Weekend Squad"',
      amount: null,
      user: 'Chris Lee',
      group: 'Weekend Squad',
      timestamp: '2025-08-14T18:30:00Z',
      isRead: true,
      participants: ['Chris Lee'],
      metadata: { groupId: 'grp_4', leftMember: 'Chris Lee' }
    },
    {
      id: 10,
      type: 'expense_deleted',
      title: 'Expense deleted',
      description: 'Lisa Garcia deleted "Coffee Run" from Office Lunch Club',
      amount: 125.00,
      user: 'Lisa Garcia',
      group: 'Office Lunch Club',
      timestamp: '2025-08-14T16:45:00Z',
      isRead: true,
      participants: ['Lisa Garcia'],
      metadata: { deletedExpense: 'Coffee Run', groupId: 'grp_3' }
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'expense_added': return <Plus className="w-5 h-5" />;
      case 'payment_settled': return <CreditCard className="w-5 h-5" />;
      case 'member_added': return <UserPlus className="w-5 h-5" />;
      case 'member_left': return <UserMinus className="w-5 h-5" />;
      case 'expense_edited': return <Edit3 className="w-5 h-5" />;
      case 'reminder_sent': return <Bell className="w-5 h-5" />;
      case 'group_created': return <Users className="w-5 h-5" />;
      case 'balance_updated': return <TrendingUp className="w-5 h-5" />;
      case 'settlement_request': return <DollarSign className="w-5 h-5" />;
      case 'expense_deleted': return <AlertCircle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'expense_added': return 'from-blue-500 to-blue-600';
      case 'payment_settled': return 'from-green-500 to-green-600';
      case 'member_added': return 'from-purple-500 to-purple-600';
      case 'member_left': return 'from-gray-500 to-gray-600';
      case 'expense_edited': return 'from-orange-500 to-orange-600';
      case 'reminder_sent': return 'from-yellow-500 to-yellow-600';
      case 'group_created': return 'from-indigo-500 to-indigo-600';
      case 'balance_updated': return 'from-emerald-500 to-emerald-600';
      case 'settlement_request': return 'from-pink-500 to-pink-600';
      case 'expense_deleted': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'expense_added': return 'from-blue-500/5 to-cyan-500/5';
      case 'payment_settled': return 'from-green-500/5 to-emerald-500/5';
      case 'member_added': return 'from-purple-500/5 to-pink-500/5';
      case 'member_left': return 'from-gray-500/5 to-slate-500/5';
      case 'expense_edited': return 'from-orange-500/5 to-yellow-500/5';
      case 'reminder_sent': return 'from-yellow-500/5 to-amber-500/5';
      case 'group_created': return 'from-indigo-500/5 to-blue-500/5';
      case 'balance_updated': return 'from-emerald-500/5 to-green-500/5';
      case 'settlement_request': return 'from-pink-500/5 to-rose-500/5';
      case 'expense_deleted': return 'from-red-500/5 to-orange-500/5';
      default: return 'from-gray-500/5 to-slate-500/5';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activityData.length },
    { value: 'expense_added', label: 'Expenses', count: activityData.filter(a => a.type === 'expense_added').length },
    { value: 'payment_settled', label: 'Settlements', count: activityData.filter(a => a.type === 'payment_settled').length },
    { value: 'member_added', label: 'Groups', count: activityData.filter(a => ['member_added', 'member_left', 'group_created'].includes(a.type)).length },
    { value: 'reminder_sent', label: 'Notifications', count: activityData.filter(a => ['reminder_sent', 'settlement_request'].includes(a.type)).length },
  ];

  const filteredActivities = activityData.filter(activity => {
    const typeFilter = filterType === 'all' || 
                      activity.type === filterType || 
                      (filterType === 'member_added' && ['member_added', 'member_left', 'group_created'].includes(activity.type)) ||
                      (filterType === 'reminder_sent' && ['reminder_sent', 'settlement_request'].includes(activity.type));
    const readFilter = !showOnlyUnread || !activity.isRead;
    return typeFilter && readFilter;
  });

  const unreadCount = activityData.filter(a => !a.isRead).length;
  const todayCount = activityData.filter(a => {
    const today = new Date().toDateString();
    const activityDate = new Date(a.timestamp).toDateString();
    return today === activityDate;
  }).length;

  const markAsRead = (activityId) => {
    console.log('Mark as read:', activityId);
  };

  const markAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleQuickAction = (activity, action) => {
    console.log('Quick action:', action, 'for activity:', activity.id);
  };

  return (
    <ActivityPageComingSoon />
    // <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">
      
    //   {/* Header Section */}
    //   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
    //     <div>
    //       <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
    //         Recent Activity
    //       </h1>
    //       <p className="text-sm text-gray-600 mt-1">Stay updated with all your expense activities</p>
    //     </div>

    //     <div className="flex gap-3">
    //       <button 
    //         onClick={markAllAsRead}
    //         className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    //       >
    //         <CheckCircle2 size={18} />
    //         <span className="hidden sm:inline">Mark All Read</span>
    //       </button>
    //       <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50">
    //         <Settings size={18} />
    //         <span className="hidden sm:inline">Settings</span>
    //       </button>
    //     </div>
    //   </div>

    //   {/* Activity Summary Cards */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
    //       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
    //       <div className="relative z-10 text-center">
    //         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
    //           <Activity className="w-6 h-6 text-white" />
    //         </div>
    //         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
    //           Today's Activity
    //         </h3>
    //         <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{todayCount}</p>
    //         <p className="text-sm text-gray-600">New activities today</p>
    //       </div>
    //     </div>

    //     <div className="bg-gradient-to-br from-white via-white to-orange-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
    //       <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl"></div>
    //       <div className="relative z-10 text-center">
    //         <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
    //           <BellRing className="w-6 h-6 text-white" />
    //         </div>
    //         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
    //           Unread Items
    //         </h3>
    //         <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{unreadCount}</p>
    //         <p className="text-sm text-gray-600">Require your attention</p>
    //       </div>
    //     </div>

    //     <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
    //       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
    //       <div className="relative z-10 text-center">
    //         <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
    //           <Clock className="w-6 h-6 text-white" />
    //         </div>
    //         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
    //           Total Activities
    //         </h3>
    //         <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{activityData.length}</p>
    //         <p className="text-sm text-gray-600">All time activities</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Filter & Options Section */}
    //   <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
    //     <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
    //       {/* Filter Tabs */}
    //       <div className="flex flex-wrap gap-2">
    //         {filterOptions.map((option) => (
    //           <button
    //             key={option.value}
    //             onClick={() => setFilterType(option.value)}
    //             className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
    //               filterType === option.value
    //                 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
    //                 : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200/50'
    //             }`}
    //           >
    //             <span>{option.label}</span>
    //             <span className={`text-xs px-2 py-1 rounded-full ${
    //               filterType === option.value
    //                 ? 'bg-white/20 text-white'
    //                 : 'bg-gray-100 text-gray-600'
    //             }`}>
    //               {option.count}
    //             </span>
    //           </button>
    //         ))}
    //       </div>

    //       {/* Options */}
    //       <div className="flex gap-3">
    //         <label className="flex items-center gap-2 text-sm text-gray-700">
    //           <input
    //             type="checkbox"
    //             checked={showOnlyUnread}
    //             onChange={(e) => setShowOnlyUnread(e.target.checked)}
    //             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
    //           />
    //           <span>Unread only</span>
    //         </label>
    //         <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
    //           <RefreshCw size={18} />
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Activity Timeline */}
    //   <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
    //     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
    //     <div className="relative z-10">
    //       {filteredActivities.length === 0 ? (
    //         <div className="flex flex-col items-center justify-center text-center p-12">
    //           <div className="bg-gray-100 text-gray-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
    //             <Activity size={32} />
    //           </div>
    //           <h4 className="text-gray-800 font-semibold text-lg mb-2">No activities found</h4>
    //           <p className="text-gray-500 text-sm max-w-sm">
    //             {showOnlyUnread 
    //               ? "You're all caught up! No unread activities."
    //               : "No activities match your current filter criteria."}
    //           </p>
    //         </div>
    //       ) : (
    //         <div className="space-y-4">
    //           {filteredActivities.map((activity) => (
    //             <div 
    //               key={activity.id} 
    //               className={`relative bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md ${
    //                 !activity.isRead ? 'ring-2 ring-blue-500/20 bg-blue-50/30' : ''
    //               }`}
    //             >
    //               <div className="flex items-start gap-4">
    //                 {/* Activity Icon */}
    //                 <div className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
    //                   <div className="text-white">{getActivityIcon(activity.type)}</div>
    //                 </div>

    //                 {/* Activity Content */}
    //                 <div className="flex-1 min-w-0">
    //                   <div className="flex items-start justify-between mb-2">
    //                     <div>
    //                       <div className="flex items-center gap-2 mb-1">
    //                         <h4 className="font-semibold text-gray-800">{activity.title}</h4>
    //                         {!activity.isRead && (
    //                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    //                         )}
    //                       </div>
    //                       <p className="text-gray-600 text-sm">{activity.description}</p>
                          
    //                       {/* Amount Display */}
    //                       {activity.amount && (
    //                         <div className="mt-2">
    //                           <span className={`text-lg font-bold ${
    //                             activity.type === 'payment_settled' || activity.type === 'balance_updated'
    //                               ? activity.amount > 0 ? 'text-green-600' : 'text-red-600'
    //                               : 'text-gray-800'
    //                           }`}>
    //                             {parseAmount(activity.amount)}
    //                           </span>
    //                         </div>
    //                       )}

    //                       {/* Participants */}
    //                       {activity.participants.length > 0 && (
    //                         <div className="flex items-center gap-2 mt-2">
    //                           <div className="flex -space-x-2">
    //                             {activity.participants.slice(0, 3).map((participant, idx) => (
    //                               <div 
    //                                 key={idx}
    //                                 className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
    //                                 title={participant}
    //                               >
    //                                 {participant.charAt(0).toUpperCase()}
    //                               </div>
    //                             ))}
    //                             {activity.participants.length > 3 && (
    //                               <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
    //                                 +{activity.participants.length - 3}
    //                               </div>
    //                             )}
    //                           </div>
    //                           {activity.group && (
    //                             <div className="flex items-center gap-1 text-xs text-gray-500">
    //                               <Home size={12} />
    //                               <span>{activity.group}</span>
    //                             </div>
    //                           )}
    //                         </div>
    //                       )}
    //                     </div>

    //                     {/* Timestamp and Actions */}
    //                     <div className="flex items-center gap-2 flex-shrink-0">
    //                       <span className="text-xs text-gray-500">
    //                         {parseTime(activity.timestamp)}
    //                       </span>
                          
    //                       {/* Quick Actions */}
    //                       <div className="flex items-center gap-1">
    //                         {!activity.isRead && (
    //                           <button
    //                             onClick={() => markAsRead(activity.id)}
    //                             className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
    //                             title="Mark as read"
    //                           >
    //                             <Check size={14} />
    //                           </button>
    //                         )}
                            
    //                         {/* Context-specific quick actions */}
    //                         {activity.type === 'settlement_request' && (
    //                           <button
    //                             onClick={() => handleQuickAction(activity, 'settle')}
    //                             className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
    //                             title="Quick settle"
    //                           >
    //                             <CreditCard size={14} />
    //                           </button>
    //                         )}
                            
    //                         {activity.type === 'expense_added' && (
    //                           <button
    //                             onClick={() => handleQuickAction(activity, 'view')}
    //                             className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
    //                             title="View expense"
    //                           >
    //                             <Eye size={14} />
    //                           </button>
    //                         )}
                            
    //                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
    //                           <MoreHorizontal size={14} />
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               {/* Activity Background Overlay */}
    //               <div className={`absolute inset-0 bg-gradient-to-br ${getActivityBgColor(activity.type)} rounded-xl pointer-events-none`}></div>
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       {/* Load More */}
    //       {filteredActivities.length > 0 && (
    //         <div className="text-center pt-6 border-t border-gray-200/50 mt-6">
    //           <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200/50">
    //             Load More Activities
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ActivityPage;