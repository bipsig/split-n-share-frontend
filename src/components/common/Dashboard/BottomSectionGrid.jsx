import React from 'react';
import { TrendingUp } from 'lucide-react';
import ComingSoonCard from './ComingSoon';
import GroupsSection from './GroupsSection';

const BottomSectionGrid = ({ groupsData, isGroupsLoading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GroupsSection
        groupsData={groupsData}
        isLoading={isGroupsLoading}
      />
      
      <ComingSoonCard
        icon={TrendingUp}
        title="Monthly Summary"
        description="Get insights into your spending patterns"
        colorTheme="yellow"
        badge="🚀 Coming Soon"
      />
    </div>
  );
};

export default BottomSectionGrid;