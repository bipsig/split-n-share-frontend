import { User2Icon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItemGroup = ({ group }) => {
  return (
    <Link to={`/user/groups/${group.group}`}>
      <li className="hover:text-primary-400 cursor-pointer flex items-center gap-2">
        <User2Icon size={22} /> {group.groupSlug}
      </li>
    </Link>
  )
}

export default SidebarItemGroup;
