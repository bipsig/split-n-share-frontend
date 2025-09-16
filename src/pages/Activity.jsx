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
  Check,
  Crown
} from 'lucide-react';
import { parseTime } from '../utils/parseTime';
import { parseAmount } from '../utils/parseAmount';
import ActivityPageComingSoon from '../components/ComingSoonFeatures/ActivityPageComingSoon';
import PageLayout from '../layouts/PageLayout';
import PageHeaderSection from '../layouts/PageHeaderSection';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageOverviewSection from '../layouts/PageOverviewSection';
import StatsCard from '../components/common/PageOverview/StatsCard';
import EmptyActivityTimeline from '../components/common/Activity/ActivityTimelineSection/EmptyActivityTimeline';
import ActivityTimelineItem from '../components/common/Activity/ActivityTimelineSection/ActivityTimelineItem';
import { useGetUserRecentActivityQuery } from '../redux/slices/api/usersApi';
import RecentActivitySkeleton from '../components/skeleton/RecentActivityPage/RecentActivitySkeleton';
import useUser from '../hooks/useUser';

const ActivityPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const { data: activities, isLoading: isActivitiesLoading, isError: isActivitesError } = useGetUserRecentActivityQuery();

  const activityData = activities ? activities.activities : [];

  const getActivityIcon = (type) => {
  switch (type) {
    // Expense activities
    case 'EXPENSE_CREATED': return <Plus className="w-5 h-5" />;
    case 'EXPENSE_UPDATED': return <Edit3 className="w-5 h-5" />;
    case 'EXPENSE_DELETED': return <AlertCircle className="w-5 h-5" />;
    
    // Payment activities
    case 'PAYMENT_MADE': return <CreditCard className="w-5 h-5" />;
    
    // Group activities
    case 'GROUP_CREATED': return <Users className="w-5 h-5" />;
    case 'GROUP_UPDATED': return <Edit3 className="w-5 h-5" />;
    case 'GROUP_DELETED': return <AlertCircle className="w-5 h-5" />;
    case 'GROUP_MEMBER_ADDED': return <UserPlus className="w-5 h-5" />;
    case 'GROUP_MEMBER_REMOVED': return <UserMinus className="w-5 h-5" />;
    case 'GROUP_ADMIN_PROMOTED': return <Crown className="w-5 h-5" />;
    case 'GROUP_ADMIN_DEMOTED': return <UserMinus className="w-5 h-5" />;
    
    // Notification activities
    case 'NOTIFICATION_REMINDER_SENT': return <Bell className="w-5 h-5" />;
    
    default: return <Activity className="w-5 h-5" />;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    // Expense activities
    case 'EXPENSE_CREATED': return 'from-blue-500 to-blue-600';
    case 'EXPENSE_UPDATED': return 'from-orange-500 to-orange-600';
    case 'EXPENSE_DELETED': return 'from-red-500 to-red-600';
    
    // Payment activities
    case 'PAYMENT_MADE': return 'from-green-500 to-green-600';
    
    // Group activities
    case 'GROUP_CREATED': return 'from-indigo-500 to-indigo-600';
    case 'GROUP_UPDATED': return 'from-purple-500 to-purple-600';
    case 'GROUP_DELETED': return 'from-red-500 to-red-600';
    case 'GROUP_MEMBER_ADDED': return 'from-purple-500 to-purple-600';
    case 'GROUP_MEMBER_REMOVED': return 'from-gray-500 to-gray-600';
    case 'GROUP_ADMIN_PROMOTED': return 'from-yellow-500 to-yellow-600';
    case 'GROUP_ADMIN_DEMOTED': return 'from-orange-500 to-orange-600';
    
    // Notification activities
    case 'NOTIFICATION_REMINDER_SENT': return 'from-yellow-500 to-yellow-600';
    
    default: return 'from-gray-500 to-gray-600';
  }
};

const getActivityBgColor = (type) => {
  switch (type) {
    // Expense activities
    case 'EXPENSE_CREATED': return 'from-blue-500/5 to-cyan-500/5';
    case 'EXPENSE_UPDATED': return 'from-orange-500/5 to-yellow-500/5';
    case 'EXPENSE_DELETED': return 'from-red-500/5 to-orange-500/5';
    
    // Payment activities
    case 'PAYMENT_MADE': return 'from-green-500/5 to-emerald-500/5';
    
    // Group activities
    case 'GROUP_CREATED': return 'from-indigo-500/5 to-blue-500/5';
    case 'GROUP_UPDATED': return 'from-purple-500/5 to-pink-500/5';
    case 'GROUP_DELETED': return 'from-red-500/5 to-orange-500/5';
    case 'GROUP_MEMBER_ADDED': return 'from-purple-500/5 to-pink-500/5';
    case 'GROUP_MEMBER_REMOVED': return 'from-gray-500/5 to-slate-500/5';
    case 'GROUP_ADMIN_PROMOTED': return 'from-yellow-500/5 to-amber-500/5';
    case 'GROUP_ADMIN_DEMOTED': return 'from-orange-500/5 to-yellow-500/5';
    
    // Notification activities
    case 'NOTIFICATION_REMINDER_SENT': return 'from-yellow-500/5 to-amber-500/5';
    
    default: return 'from-gray-500/5 to-slate-500/5';
  }
};

const getActivityTitle = (type) => {
  switch (type) {
    // Expense activities
    case 'EXPENSE_CREATED': return 'New expense added';
    case 'EXPENSE_UPDATED': return 'Expense updated';
    case 'EXPENSE_DELETED': return 'Expense deleted';
    
    // Payment activities
    case 'PAYMENT_MADE': return 'Payment made';
    
    // Group activities
    case 'GROUP_CREATED': return 'Group created';
    case 'GROUP_UPDATED': return 'Group updated';
    case 'GROUP_DELETED': return 'Group deleted';
    case 'GROUP_MEMBER_ADDED': return 'Member added';
    case 'GROUP_MEMBER_REMOVED': return 'Member removed';
    case 'GROUP_ADMIN_PROMOTED': return 'Admin promoted';
    case 'GROUP_ADMIN_DEMOTED': return 'Admin demoted';
    
    // Notification activities
    case 'NOTIFICATION_REMINDER_SENT': return 'Reminder sent';
    
    default: return 'Activity';
  }
};

const getActivityDescription = (activity, currentUsername) => {
  const { type, actor, context, recipients } = activity;
  const actorName = actor.username;
  const isCurrentUser = actorName === currentUsername;
  
  switch (type) {
    // Expense activities
    case 'EXPENSE_CREATED':
      return `${actorName} added "${context.transaction?.description || 'an expense'}" ${
        context.group?.groupName ? `to ${context.group.groupName}` : ''
      }`;
      
    case 'EXPENSE_UPDATED':
      return `${actorName} updated "${context.transaction?.description || 'an expense'}" ${
        context.group?.groupName ? `in ${context.group.groupName}` : ''
      }`;
      
    case 'EXPENSE_DELETED':
      return `${actorName} deleted "${context.transaction?.description || 'an expense'}" ${
        context.group?.groupName ? `from ${context.group.groupName}` : ''
      }`;
    
    // Payment activities
    case 'PAYMENT_MADE':
      const paymentAmount = context.transaction?.amount ? 
        `₹${context.transaction.amount.toFixed(2)}` : 'payment';
      const targetUser = context.targetUser?.username;

      if (targetUser) {
        return `${actorName} made a payment of  ${paymentAmount} ${`to ${targetUser}`}`;
      }
      return `${actorName} made a ${paymentAmount}`;
    
    // Group activities
    case 'GROUP_CREATED':
      return `${actorName} created ${
        isCurrentUser ? 'a new group' : 'the group'
      } "${context.group?.groupName || 'New Group'}"`;
      
    case 'GROUP_UPDATED':
      return `${actorName} updated the group "${context.group?.groupName || 'group'}" settings`;
      
    case 'GROUP_DELETED':
      return `${actorName} deleted the group "${context.group?.groupName || 'group'}"`;
      
    case 'GROUP_MEMBER_ADDED':
      const addedMember = context.targetUser?.username;
      if (addedMember === actorName) {
        return `${actorName} joined "${context.group?.groupName || 'the group'}"`;
      }
      return `${actorName} added ${addedMember || 'a member'} to "${context.group?.groupName || 'the group'}"`;
      
    case 'GROUP_MEMBER_REMOVED':
      const removedMember = context.targetUser?.username;
      if (removedMember === actorName) {
        return `${actorName} left the group "${context.group?.groupName || 'group'}"`;
      }
      return `${actorName} removed ${removedMember || 'a member'} from "${context.group?.groupName || 'the group'}"`;
      
    case 'GROUP_ADMIN_PROMOTED':
      const promotedUser = context.targetUser?.username;
      return `${actorName} promoted ${promotedUser || 'a member'} to admin in "${context.group?.groupName || 'the group'}"`;
      
    case 'GROUP_ADMIN_DEMOTED':
      const demotedUser = context.targetUser?.username;
      return `${actorName} removed admin privileges from ${demotedUser || 'a member'} in "${context.group?.groupName || 'the group'}"`;
    
    // Notification activities
    case 'NOTIFICATION_REMINDER_SENT':
      const reminderAmount = context.transaction?.amount ? 
        `about ₹${context.transaction.amount.toFixed(2)} payment` : '';
      const reminderTarget = context.targetUser?.username;
      
      if (isCurrentUser) {
        return `You reminded ${reminderTarget || 'someone'} ${reminderAmount}`;
      }
      return `${actorName} sent you a payment reminder ${reminderAmount}`;
    
    default:
      return `${actorName} performed an activity ${
        context.group?.groupName ? `in ${context.group.groupName}` : ''
      }`;
  }
};

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activityData.length },
    { value: 'expense_added', label: 'Expenses', count: activityData.filter(a => ['EXPENSE_CREATED', 'EXPENSE_UPDATED', 'EXPENSE_DELETED'].includes(a.type)).length },
    { value: 'payment_settled', label: 'Payments', count: activityData.filter(a => a.type === 'PAYMENT_MADE').length },
    { value: 'member_added', label: 'Groups', count: activityData.filter(a => ['GROUP_CREATED', 'GROUP_UPDATED', 'GROUP_DELETED',
      'GROUP_MEMBER_ADDED', 'GROUP_MEMBER_REMOVED', 'GROUP_ADMIN_PROMOTED', 'GROUP_ADMIN_DEMOTED',].includes(a.type)).length },
    { value: 'reminder_sent', label: 'Notifications', count: activityData.filter(a => ['NOTIFICATION_REMINDER_SENT'].includes(a.type)).length },
  ];

  const filteredActivities = activityData.filter(activity => {
  const typeFilter = filterType === 'all' || 
                    (filterType === 'expense_added' && ['EXPENSE_CREATED', 'EXPENSE_UPDATED', 'EXPENSE_DELETED'].includes(activity.type)) ||
                    (filterType === 'payment_settled' && activity.type === 'PAYMENT_MADE') ||
                    (filterType === 'member_added' && ['GROUP_CREATED', 'GROUP_UPDATED', 'GROUP_DELETED', 'GROUP_MEMBER_ADDED', 'GROUP_MEMBER_REMOVED', 'GROUP_ADMIN_PROMOTED', 'GROUP_ADMIN_DEMOTED'].includes(activity.type)) ||
                    (filterType === 'reminder_sent' && ['NOTIFICATION_REMINDER_SENT'].includes(activity.type));
  const readFilter = !showOnlyUnread || !activity.isRead;
  return typeFilter && readFilter;
});

  const unreadCount = activityData.filter(a => !a.isRead).length;
  const todayCount = activityData.filter(a => {
    const today = new Date().toDateString();
    const activityDate = new Date(a.createdAt).toDateString();
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

  if (isActivitiesLoading) {
    return <PageLayout>
      <RecentActivitySkeleton />
    </PageLayout>
  }

  if (isActivitesError) {
      return <PageLayout><p className="text-red-500">Failed to load recent activity data.</p></PageLayout>;
    }

  return (
    // <ActivityPageComingSoon />
    <PageLayout>

      <PageHeaderSection 
        heading={"Recent Activity"}
        subtitle={"Stay updated with all your activities"}
      >
        <HeaderButton variant='success' icon={CheckCircle2}>
          Mark All Read
        </HeaderButton>
        <HeaderButton variant='secondary' icon={Settings}>
          Settings
        </HeaderButton>
      </PageHeaderSection>
      
      <PageOverviewSection>
        <StatsCard
          icon={Activity}
          title={"Today's activity"}
          value={todayCount}
          subtitle={<p className="text-sm text-gray-600">New activities today</p>}
        />

        <StatsCard
          icon={BellRing}
          title={"Unread Items"}
          value={unreadCount}
          subtitle={<p className="text-sm text-gray-600">Require your attention</p>}
          colorTheme='orange'
        />

        <StatsCard
          icon={Clock}
          title={"Total Activities"}
          value={activities.count}
          subtitle={<p className="text-sm text-gray-600">All Time Activities</p>}
          colorTheme='purple'
        />
      </PageOverviewSection>


      {/* Filter & Options Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  filterType === option.value
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200/50'
                }`}
              >
                <span>{option.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  filterType === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showOnlyUnread}
                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Unread only</span>
            </label>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          {filteredActivities.length === 0 ? (
            <EmptyActivityTimeline showOnlyUnread={showOnlyUnread} />
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <ActivityTimelineItem activity={activity} getActivityColor={getActivityColor} getActivityIcon={getActivityIcon} getActivityBgColor={getActivityBgColor} getActivityTitle={getActivityTitle} getActivityDescription={getActivityDescription}/>
              ))}
            </div>
          )}

          {/* {filteredActivities.length > 0 && (
            <div className="text-center pt-6 border-t border-gray-200/50 mt-6">
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200/50">
                Load More Activities
              </button>
            </div>
          )} */}
        </div>
      </div>
    </PageLayout>
  );
};

export default ActivityPage;