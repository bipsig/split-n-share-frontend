import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItem = ({ item }) => {
  return (
    <Link to={item.path}>
      <li className="hover:text-primary-400 cursor-pointer flex items-center gap-2">
        <item.icon size={22} /> {item.title}
      </li>
    </Link>
  )
}

export default SidebarItem;
