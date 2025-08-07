import { Users } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItemGroup = ({ group }) => {
  return (
    <Link to={`/user/groups/${group.groupId}`}>
      <li className="hover:text-primary-400 cursor-pointer flex items-center gap-2">
        <Users size={22} /> {group.title}
      </li>
    </Link>
  )
}

export default SidebarItemGroup;
