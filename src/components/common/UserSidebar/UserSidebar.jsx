import React, { Fragment, useState } from 'react';
import { Activity, ChartLine, ChevronDown, ChevronUp, LayoutDashboard, LogOut, Logs, User, UsersRound } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { useGetUserGroupsQuery } from '../../../redux/slices/api/groupsApi';
import SidebarItemMenu from './SidebarItemMenu';
import SidebarItemGroup from './SidebarItemGroup';

const items = [
  {
    key: 1,
    title: 'Dashboard',
    path: '/user/dashboard',
    icon: LayoutDashboard
  },
  {
    key: 2,
    title: 'All expenses',
    path: '/user/all',
    icon: Logs
  },
  {
    key: 3,
    title: 'Groups',
    path: '/user/groups',
    icon: UsersRound
  },
  {
    key: 4,
    title: 'Activity',
    path: '/user/activity',
    icon: Activity
  },
  {
    key: 5,
    title: 'Reports',
    path: '/user/reports',
    icon: ChartLine
  },
];

const UserSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: groups, isLoading, isError } = useGetUserGroupsQuery();

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <Fragment>
      <aside className="fixed top-0 left-0 h-screen w-1/6 bg-gray-900 text-white shadow-lg">
        <label> Split n Share</label>
        <div className="p-6">
          <ul className="space-y-4">
            {items.map((item) => <SidebarItemMenu keyey={item.key} item={item} />)}
          </ul>

          <div className="my-6 border-t border-gray-700" />

          <label> Your Groups </label>
          <ul className="space-y-4">
            {isLoading ? (
              <li className="text-sm text-gray-400">Loading...</li>
            ) : isError ? (
              <li className="text-sm text-red-500">Failed to load</li>
            ) : groups?.groups?.length > 0 ? (
              groups?.groups?.map((group) => <SidebarItemGroup key={group.group} group={group} />)
            ) : (
              <li className="text-sm text-red-500">You are yet to join a group</li>
            )}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-700 relative">
          <button
            onClick={toggleMenuOpen}
            className="flex items-center gap-3 w-full hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
          >
            <User className="w-6 h-6 text-gray-300" />
            <div className="flex-1 text-left text-sm font-medium">Username</div>
            {menuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {menuOpen && (
            <div className="absolute bottom-16 left-4 bg-gray-800 rounded-md shadow-lg w-48 py-2 z-50">
              <Link to='/user/profile' className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-sm">
                <User size={16} /> Profile
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </aside>

      <main className="ml-[16.6667%] w-[83.3333%] p-6">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default UserSidebar;