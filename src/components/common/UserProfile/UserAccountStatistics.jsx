import React from 'react'
import UserMiniStatsCard from './UserMiniStatsCard';
import UserProfileSectionCard from './UserProfileSectionCard';
import { Activity, Calendar, Crown, Users } from 'lucide-react';

const UserAccountStatistics = ({ userData }) => {
  return (
    <UserProfileSectionCard
      icon={Activity}
      title="Account Statistics"
      subtitle="Your activity overview"
      colorTheme="purple"
    >
      <div className="grid grid-cols-2 gap-4">
        <UserMiniStatsCard
          icon={Users}
          value={userData.groups.length}
          label="Active Groups"
          colorTheme="blue"
        />
        
        <UserMiniStatsCard
          icon={Activity}
          value={userData.transactions.length}
          label="Total Expenses"
          colorTheme="green"
        />
        
        <UserMiniStatsCard
          icon={Calendar}
          value="6M"
          label="Member For"
          colorTheme="purple"
        />
        
        <UserMiniStatsCard
          icon={Crown}
          value="2"
          label="Admin Groups"
          colorTheme="yellow"
        />
      </div>
    </UserProfileSectionCard>
  );
};

export default UserAccountStatistics
