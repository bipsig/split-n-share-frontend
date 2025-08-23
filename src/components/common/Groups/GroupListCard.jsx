import React from 'react'
import GroupListCardHeader from './groupListCard/groupListCardHeader';
import GroupListCardBalance from './groupListCard/GroupListCardBalance';
import GroupListCardsStats from './groupListCard/GroupListCardsStats';
import GroupListCardFooter from './groupListCard/GroupListCardFooter';
import GroupListCardMembersHeader from './groupListCard/GroupListCardMembersHeader';
import GroupListCardMemberList from './groupListCard/groupListCardMemberList';

const GroupListCard = ({ group }) => {

  return (
    <div key={group._id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-lg group relative overflow-hidden">

      {/* Group Header */}
      <GroupListCardHeader group={group} />

      {/* Balance Display */}
      <GroupListCardBalance group={group} />

      {/* Group Stats */}
      <GroupListCardsStats group={group} />

      {/* Members Preview */}
      <div className="mb-4">
        <GroupListCardMembersHeader group={group} />
        <GroupListCardMemberList group={group} />
      </div>

      {/* Footer */}
      <GroupListCardFooter group={group} />
    </div>
  )
}

export default GroupListCard;