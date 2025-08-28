import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Settings, 
  Filter,
  Plus,
  CreditCard,
  Users,
  Edit3,
  Bell,
  TrendingUp,
  UserPlus,
  UserMinus,
  AlertCircle,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Zap,
  Target,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Eye,
  RefreshCw,
  BellRing,
  Check,
  ListChecks,
  History
} from 'lucide-react';

const ActivityPageComingSoon = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  // Cycle through animation phases for the coming soon effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mock features that will be available
  const upcomingFeatures = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Activity Feed",
      description: "Live updates of all expense activities, payments, and group changes as they happen",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Intelligent filtering and categorization of notifications based on your preferences",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Activity Tracking",
      description: "Monitor all group activities including member additions, expense updates, and settlements",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Activity History",
      description: "Complete historical timeline of all your expense and payment activities",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filtering",
      description: "Filter activities by type, group, date range, and custom criteria",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <ListChecks className="w-6 h-6" />,
      title: "Bulk Actions",
      description: "Mark multiple activities as read, archive, or perform batch operations",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  const stats = [
    { icon: <Activity className="w-6 h-6" />, label: "Activity Types", value: "10+" },
    { icon: <Bell className="w-6 h-6" />, label: "Notification Filters", value: "8" },
    { icon: <Clock className="w-6 h-6" />, label: "Real-time Updates", value: "∞" }
  ];

  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            Recent Activity
          </h1>
          <p className="text-sm text-gray-600 mt-1">Stay updated with all your expense activities</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 opacity-50 cursor-not-allowed">
            <CheckCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Mark All Read</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 opacity-50 cursor-not-allowed border border-gray-200/50">
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-ping"></div>

        <div className="relative z-10 text-center">
          {/* Main Icon with Animation */}
          <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-1000 ${
            animationPhase === 0 ? 'scale-100 rotate-0' : 
            animationPhase === 1 ? 'scale-110 rotate-3' : 
            'scale-105 rotate-1'
          }`}>
            <div className="relative">
              <Activity className="w-12 h-12 text-white" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-sm mb-6 shadow-lg animate-pulse">
            <Zap className="w-4 h-4" />
            <span>COMING SOON</span>
            <Star className="w-4 h-4" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Smart Activity Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We're building a comprehensive activity feed that will help you track all your expense activities, notifications, and group changes in real-time with intelligent filtering and organization.
          </p>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Development Progress</span>
              <span className="text-sm font-bold text-blue-600">80%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Notify Me Button */}
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            <Bell className="w-6 h-6" />
            <span>Notify Me When Ready</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <div className="text-white">{stat.icon}</div>
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {stat.label}
              </h3>
              <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{stat.value}</p>
              <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium text-xs">
                🚀 Coming Soon
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Features */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">What's Coming</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get ready for a powerful activity dashboard that will keep you informed about all your expense-related activities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      In Progress
                    </div>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Preview Mock */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Activity Preview</h3>
              <p className="text-sm text-gray-600">Here's what your activity feed will look like</p>
            </div>
          </div>

          {/* Mock Activity Items */}
          <div className="space-y-4">
            {[
              { icon: <Plus className="w-5 h-5" />, title: "New expense added", desc: "John added 'Grocery Shopping' to Family House", color: "from-blue-500 to-blue-600", time: "2 min ago" },
              { icon: <CreditCard className="w-5 h-5" />, title: "Payment settled", desc: "Sarah settled ₹850.25 with you", color: "from-green-500 to-green-600", time: "15 min ago" },
              { icon: <UserPlus className="w-5 h-5" />, title: "Member added", desc: "Alice was added to 'Weekend Trip'", color: "from-purple-500 to-purple-600", time: "1 hour ago" },
              { icon: <Edit3 className="w-5 h-5" />, title: "Expense updated", desc: "Mike updated 'Dinner' in Office Group", color: "from-orange-500 to-orange-600", time: "2 hours ago" }
            ].map((activity, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-gray-100 opacity-60">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <div className="text-white">{activity.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{activity.title}</h4>
                    <p className="text-gray-600 text-sm">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
            
            <div className="text-center py-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                And many more activity types coming soon!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="bg-gradient-to-br from-white via-white to-yellow-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Development Timeline</h3>
              <p className="text-sm text-gray-600">Track our progress as we build the activity dashboard</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Activity Data Models</p>
                <p className="text-sm text-gray-600">Database structure and API endpoints</p>
              </div>
              <span className="text-sm font-bold text-green-600">Completed</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Real-time Updates</p>
                <p className="text-sm text-gray-600">Live activity feed and notifications</p>
              </div>
              <span className="text-sm font-bold text-blue-600">In Progress</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 opacity-50">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Advanced Filtering</p>
                <p className="text-sm text-gray-600">Smart filters and search functionality</p>
              </div>
              <span className="text-sm font-bold text-gray-600">Coming Next</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 opacity-30">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Bulk Actions</p>
                <p className="text-sm text-gray-600">Mass operations and activity management</p>
              </div>
              <span className="text-sm font-bold text-gray-600">Future</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-white via-white to-indigo-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BellRing className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Stay Updated</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Be the first to know when your smart activity dashboard is ready
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPageComingSoon;