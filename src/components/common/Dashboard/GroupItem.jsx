import React from 'react';
import { Users } from 'lucide-react';
import { parseGroupMembers } from '../../../utils/parseGroupMembers';
import { parseAmount } from '../../../utils/parseAmount';
import { Link } from 'react-router-dom';
import { getGroupIcon } from '../../../utils/getGroupIcon';

const GroupItem = ({ group, index }) => {
  const subheading = parseGroupMembers(group.members);
  
  const getIconGradient = () => {
    if (group.groupBalance > 0) {
      return 'from-green-400 to-emerald-500';
    } else if (group.groupBalance < 0) {
      return 'from-red-400 to-orange-500';
    } else {
      return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <div 
      key={index} 
      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md cursor-pointer group"
    >
      <Link to={`/user/groups/${group.groupId}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getIconGradient()} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
              <div className="text-white">
                {getGroupIcon(group.selectedIcon, "medium")}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800">{group.name}</p>
              <p className="text-sm text-gray-600">{subheading}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                group.type === 'you are owed' ? 
                'bg-green-200 text-green-700' : 
                group.type === 'you owe' ? 
                'bg-red-200 text-red-700' :
                'bg-gray-200 text-gray-700'
              }`}>
                {group.type}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${group.groupBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {group.groupBalance >= 0 ? '+' : '-'}{parseAmount(Math.abs(group.groupBalance))}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GroupItem;