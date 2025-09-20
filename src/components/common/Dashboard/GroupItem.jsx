import React from 'react';
import { Users } from 'lucide-react';
// import { parseAmount } from '../utils/parseAmount';
import { parseGroupMembers } from '../../../utils/parseGroupMembers';
import { parseAmount } from '../../../utils/parseAmount';
import { Link } from 'react-router-dom';

const GroupItem = ({ group, index }) => {
  const subheading = parseGroupMembers(group.members);
  console.log (group)

  return (
    <div 
      key={index} 
      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md cursor-pointer"
    >
      <Link to={`/user/groups/${group.groupId}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{group.name}</p>
              <p className="text-sm text-gray-600">{subheading}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                group.type !== 'you owe' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
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