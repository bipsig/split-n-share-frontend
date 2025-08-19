import React from 'react'
import UserProfileSectionCard from './UserProfileSectionCard';
import { AlertTriangle, Bell, Settings, Trash2 } from 'lucide-react';
import UserActionItem from './UserActionItem';

const UserAccountActions = ({ userData }) => {
  return (
    <UserProfileSectionCard
      icon={Settings}
      title="Account Actions"
      subtitle="Manage your account preferences"
      colorTheme="yellow"
    >
      <div className="space-y-4">
        <UserActionItem
          icon={() => <div className={`w-3 h-3 rounded-full ${userData.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>}
          title="Account Status"
          subtitle={userData.isActive ? 'Your account is active' : 'Your account is inactive'}
          actionText={userData.isActive ? 'Deactivate' : 'Activate'}
          variant="warning"
          iconBg={userData.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}
        />
        
        <UserActionItem
          icon={Bell}
          title="Export Data"
          subtitle="Download your account data"
          actionText="Export"
          variant="primary"
          iconBg="bg-blue-100 text-blue-600"
        />
        
        <UserActionItem
          icon={AlertTriangle}
          title="Delete Account"
          subtitle="Permanently delete your account and all data"
          actionText={<div className="flex items-center gap-2"><Trash2 size={16} />Delete</div>}
          variant="danger"
          iconBg="bg-red-100 text-red-600"
        />
      </div>
    </UserProfileSectionCard>
  );
};


export default UserAccountActions
