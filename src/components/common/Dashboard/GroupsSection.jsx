import React from 'react';
import { Users, Loader2 } from 'lucide-react';
import GroupItem from './GroupItem';

const GroupsSection = ({ groupsData, isLoading }) => {
  return (
    <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Your Groups</h3>
              <p className="text-sm text-gray-600">Manage your expense groups</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <>
              {groupsData?.count === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-500">
                  <div className="p-4 bg-blue-100 rounded-full mb-4 shadow-lg">
                    <Users size={32} className="text-blue-500" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">No groups yet</p>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    Create your first group to start splitting expenses with friends and family
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    + Create Group
                  </button>
                </div>
              ) : (
                <>
                  {groupsData?.data?.map((group, index) => (
                    <GroupItem 
                      key={index}
                      group={group}
                      index={index}
                    />
                  ))}
                </>
              )}
            </>
          )}
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
    </div>
  );
};

export default GroupsSection;