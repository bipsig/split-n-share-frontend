import { Calendar, Edit, ExternalLink } from 'lucide-react'
import React from 'react'
import { parseTime } from '../../../../utils/parseTime'
import { Link } from 'react-router-dom'

const GroupListCardFooter = ({ group }) => {
  console.log (group);
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar size={12} />
        <span>Created {parseTime(group.createdAt)}</span>
      </div>
      <div className="flex gap-2">
        <Link to={`/user/groups/${group.id}`}>
          <button className="cursor-pointer p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm">
            <ExternalLink size={16} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
            <Edit size={16} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default GroupListCardFooter
