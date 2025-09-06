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
  ReceiptIndianRupee,
  Wallet2
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

const GroupDetailPageSkeleton = () => {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="w-full min-h-screen space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-3 sm:p-6">

      {/* Header Section Skeleton */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-start gap-3 sm:gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-all duration-200 flex-shrink-0">
            <ArrowLeft size={20} />
          </button>

          {/* Group Icon Skeleton */}
          <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
              {/* Group Name Skeleton */}
              <Skeleton className="h-6 sm:h-8 lg:h-9 w-48 sm:w-64 rounded" />
            </div>
            {/* Description Skeleton */}
            <Skeleton className="h-4 w-72 sm:w-96 rounded mb-1" />
            {/* Metadata Skeleton */}
            <Skeleton className="h-3 w-40 sm:w-48 rounded" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Skeleton className="h-10 sm:h-12 w-full sm:w-32 rounded-xl" />
          <Skeleton className="h-10 sm:h-12 w-full sm:w-28 rounded-xl" />
          <Skeleton className="h-10 sm:h-12 w-full sm:w-32 rounded-xl" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="relative z-10 text-center">
              {/* Icon Skeleton */}
              <Skeleton className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-4" />
              {/* Title Skeleton */}
              <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 mx-auto mb-1 sm:mb-2 rounded" />
              {/* Value Skeleton */}
              <Skeleton className="h-6 sm:h-8 lg:h-9 w-20 sm:w-28 mx-auto rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
          {[
            { id: 'transactions', label: 'Transactions', icon: Receipt },
            { id: 'balances', label: 'My Balances', icon: Wallet2 },
            { id: 'group-balances', label: 'All Balances', icon: Coins },
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

        {/* Tab Content Skeleton */}
        <div className="p-3 sm:p-6">
          {activeTab === 'transactions' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Search and Filter Skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <Skeleton className="flex-1 h-10 sm:h-12 rounded-xl" />
                <Skeleton className="w-full sm:w-32 h-10 sm:h-12 rounded-xl" />
              </div>

              {/* Transaction Items Skeleton */}
              <div className="space-y-3 sm:space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Transaction Icon Skeleton */}
                        <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0" />

                        {/* Transaction Details Skeleton */}
                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Title and badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Skeleton className="h-5 w-40 sm:w-48 rounded" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                          </div>

                          {/* Paid by */}
                          <Skeleton className="h-4 w-32 rounded" />

                          {/* Note */}
                          <Skeleton className="h-4 w-56 sm:w-72 rounded" />

                          {/* Users involved */}
                          <div className="flex items-center gap-2 mb-2">
                            <Skeleton className="h-3 w-20 rounded" />
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="w-6 h-6 rounded-full" />
                              ))}
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap gap-3 sm:gap-4">
                            <Skeleton className="h-3 w-16 rounded" />
                            <Skeleton className="h-3 w-24 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Amount and Actions Skeleton */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
                        <Skeleton className="h-8 sm:h-9 w-24 sm:w-28 rounded" />
                        <div className="flex gap-1 sm:gap-2">
                          <Skeleton className="w-8 h-8 rounded-lg" />
                          <Skeleton className="w-8 h-8 rounded-lg" />
                          <Skeleton className="w-8 h-8 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'balances' || activeTab === 'group-balances') && (
            <div className="space-y-4">
              <div className="text-center mb-4 sm:mb-6">
                <Skeleton className="h-6 sm:h-7 w-48 mx-auto mb-2 rounded" />
                <Skeleton className="h-4 w-56 mx-auto rounded" />
              </div>

              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-5 w-32 sm:w-40 rounded mb-1" />
                        <Skeleton className="h-4 w-20 sm:w-24 rounded" />
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <Skeleton className="h-8 sm:h-9 w-24 sm:w-28 rounded mb-2" />
                      <Skeleton className="h-7 sm:h-8 w-20 sm:w-24 rounded" />
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
                  <Skeleton className="h-6 sm:h-7 w-32 rounded mb-2" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>
                <Skeleton className="h-10 sm:h-11 w-32 sm:w-36 rounded-xl" />
              </div>

              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Skeleton className="h-5 w-24 sm:w-32 rounded" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <Skeleton className="h-4 w-28 rounded" />
                          <Skeleton className="h-4 w-16 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      {index === 3 && (
                        <>
                          <Skeleton className="h-7 sm:h-8 w-16 rounded-lg" />
                          <Skeleton className="h-7 sm:h-8 w-16 rounded-lg" />
                        </>
                      )}
                      <Skeleton className="w-8 h-8 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GroupDetailPageSkeleton;