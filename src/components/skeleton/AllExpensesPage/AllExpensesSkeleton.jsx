import React from 'react';
import { Plus } from 'lucide-react';

const AllExpensesPageSkeleton = () => {
  return (
    <div className="w-full min-h-screen space-y-4 lg:space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-3 sm:p-6">
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="h-6 lg:h-8 bg-gray-300 rounded-lg w-32 lg:w-40 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 lg:w-64 mt-2 animate-pulse"></div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg animate-pulse self-start sm:self-auto">
          <Plus size={16} className="text-transparent" />
          <div className="h-4 bg-gray-400 rounded w-20"></div>
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-gray-200/20 rounded-xl"></div>
            <div className="relative z-10 text-center">
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gray-300 rounded-lg lg:rounded-xl mx-auto mb-2 lg:mb-4 animate-pulse"></div>
              <div className="h-3 lg:h-4 bg-gray-200 rounded w-20 lg:w-24 mx-auto mb-1 lg:mb-2 animate-pulse"></div>
              <div className="h-5 lg:h-8 bg-gray-300 rounded w-16 lg:w-20 mx-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search Skeleton */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Search Skeleton */}
          <div className="relative flex-1">
            <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>

          {/* Filter Skeletons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="h-10 bg-gray-200 rounded-xl w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Transactions List Skeleton */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="h-5 lg:h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-7 bg-gray-200 rounded-lg w-16 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="p-3 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {/* Transaction Item Skeletons */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-gray-100 animate-pulse">
                <div className="flex flex-col lg:flex-row lg:items-start gap-3 lg:gap-4">
                  <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
                    {/* Icons Skeleton */}
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-xl"></div>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-lg self-center"></div>
                    </div>

                    {/* Transaction Details Skeleton */}
                    <div className="flex-1 min-w-0">
                      {/* Title and badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className="h-4 lg:h-5 bg-gray-300 rounded w-32 lg:w-40"></div>
                        <div className="h-5 bg-gray-200 rounded-full w-12"></div>
                        <div className="h-5 bg-gray-200 rounded-full w-14"></div>
                      </div>

                      {/* Group and paid by */}
                      <div className="h-4 bg-gray-200 rounded w-48 lg:w-64 mb-2"></div>

                      {/* Note */}
                      <div className="h-3 bg-gray-100 rounded w-36 lg:w-48 mb-3"></div>

                      {/* Users involved */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  </div>

                  {/* Amount and Actions Skeleton */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 lg:gap-2 flex-shrink-0">
                    <div className="h-6 lg:h-8 bg-gray-300 rounded w-16 lg:w-20"></div>
                    <div className="flex gap-1 lg:gap-2">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-lg"></div>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-lg"></div>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Activity Skeleton */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 lg:h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-white/50 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Skeleton */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 lg:h-6 bg-gray-300 rounded w-28 animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-10"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-300 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Summary Skeleton */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 lg:h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="text-center animate-pulse">
              <div className="h-8 lg:h-10 bg-gray-300 rounded w-20 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between items-center animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-4 bg-gray-300 rounded w-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllExpensesPageSkeleton;