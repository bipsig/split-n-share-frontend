import React, { useState } from 'react';
import { 
  Activity, 
  Settings, 
  Filter,
  CheckCircle2,
  RefreshCw,
  BellRing,
  Clock
} from 'lucide-react';

// Skeleton loading component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
      {...props}
    />
  );
};

const RecentActivitySkeleton = () => {
  const [filterType, setFilterType] = useState('all');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: '—' },
    { value: 'expense_added', label: 'Expenses', count: '—' },
    { value: 'payment_settled', label: 'Settlements', count: '—' },
    { value: 'member_added', label: 'Groups', count: '—' },
    { value: 'reminder_sent', label: 'Notifications', count: '—' },
  ];

  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen p-6">
      
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div className="flex-1">
          <Skeleton className="h-7 sm:h-8 lg:h-9 w-48 sm:w-64 rounded mb-2" />
          <Skeleton className="h-4 w-72 sm:w-96 rounded" />
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg opacity-75">
            <CheckCircle2 size={18} />
            <span className="hidden sm:inline">Mark All Read</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium shadow-lg border border-gray-200/50 opacity-75">
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </div>
        </div>
      </div>

      {/* Activity Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg opacity-75">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <Skeleton className="h-4 w-24 mx-auto rounded mb-2" />
            <Skeleton className="h-8 lg:h-10 w-16 mx-auto rounded mb-3" />
            <Skeleton className="h-3 w-32 mx-auto rounded" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-orange-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg opacity-75">
              <BellRing className="w-6 h-6 text-white" />
            </div>
            <Skeleton className="h-4 w-20 mx-auto rounded mb-2" />
            <Skeleton className="h-8 lg:h-10 w-12 mx-auto rounded mb-3" />
            <Skeleton className="h-3 w-28 mx-auto rounded" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg opacity-75">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Skeleton className="h-4 w-24 mx-auto rounded mb-2" />
            <Skeleton className="h-8 lg:h-10 w-16 mx-auto rounded mb-3" />
            <Skeleton className="h-3 w-28 mx-auto rounded" />
          </div>
        </div>
      </div>

      {/* Filter & Options Section Skeleton */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 opacity-75 ${
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

          {/* Options */}
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 opacity-75">
              <input
                type="checkbox"
                checked={showOnlyUnread}
                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Unread only</span>
            </label>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 opacity-75">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline Skeleton */}
      <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="relative bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Activity Icon Skeleton */}
                  <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />

                  {/* Activity Content Skeleton */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Skeleton className="h-5 w-36 sm:w-48 rounded" />
                          {index < 3 && <div className="w-2 h-2 bg-blue-500 rounded-full opacity-75"></div>}
                        </div>
                        <Skeleton className="h-4 w-64 sm:w-80 rounded mb-2" />
                        
                        {/* Amount Display Skeleton */}
                        {index % 3 !== 2 && (
                          <div className="mt-2">
                            <Skeleton className="h-6 w-20 sm:w-24 rounded" />
                          </div>
                        )}

                        {/* Participants Skeleton */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, participantIndex) => (
                              <Skeleton 
                                key={participantIndex}
                                className="w-6 h-6 rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <Skeleton className="h-3 w-16 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Timestamp and Actions Skeleton */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Skeleton className="h-3 w-12 rounded" />
                        
                        {/* Quick Actions Skeleton */}
                        <div className="flex items-center gap-1">
                          <Skeleton className="w-6 h-6 rounded-lg" />
                          {index < 2 && <Skeleton className="w-6 h-6 rounded-lg" />}
                          <Skeleton className="w-6 h-6 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl pointer-events-none opacity-50"></div>
              </div>
            ))}
          </div>

          {/* Load More Skeleton */}
          <div className="text-center pt-6 border-t border-gray-200/50 mt-6">
            <div className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-medium shadow-lg border border-gray-200/50 opacity-75 inline-block">
              Load More Activities
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-pulse {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default RecentActivitySkeleton;