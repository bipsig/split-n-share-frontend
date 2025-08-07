import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Activity, ChartLine, ChevronDown, ChevronUp, LayoutDashboard,
  LogOut, Logs, Menu, User, UsersRound, X
} from 'lucide-react';
import { useGetUserGroupsQuery } from '../../../redux/slices/api/groupsApi';
import { useLogoutMutation } from '../../../redux/slices/api/authApi';
import SidebarItemMenu from './SidebarItemMenu';
import SidebarItemGroup from './SidebarItemGroup';
import toast from 'react-hot-toast';

const items = [
  { key: 1, title: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
  { key: 2, title: 'All expenses', path: '/user/all', icon: Logs },
  { key: 3, title: 'Groups', path: '/user/groups', icon: UsersRound },
  { key: 4, title: 'Activity', path: '/user/activity', icon: Activity },
  { key: 5, title: 'Reports', path: '/user/reports', icon: ChartLine },
];

const UserSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: groups, isLoading, isError } = useGetUserGroupsQuery();
  const [logout] = useLogoutMutation();

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      if (result.success) toast.success('Logged out successfully!');
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-30 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Split n Share</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay with blur */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 
          transition-opacity duration-300 
          ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
          bg-white/30 backdrop-blur-sm
        `}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:relative 
        w-[280px] lg:w-[250px] 
        h-full 
        bg-gray-900 
        text-white 
        flex flex-col 
        justify-between 
        overflow-y-auto 
        transition-transform 
        duration-300 
        ease-in-out 
        z-50
        lg:z-auto
      `}>
        <div className="p-6">
          {/* Desktop Logo */}
          <h1 className="hidden lg:block text-xl font-bold mb-4">Split n Share</h1>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Split n Share</h1>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <ul className="space-y-4">
            {items.map((item) => (
              <SidebarItemMenu key={item.key} item={item} />
            ))}
          </ul>

          <div className="my-6 border-t border-gray-700" />
          <label className="text-sm text-gray-400">Your Groups</label>
          <ul className="space-y-2 mt-2">
            {isLoading ? (
              <li className="text-sm text-gray-400">Loading...</li>
            ) : isError ? (
              <li className="text-sm text-red-500">Failed to load</li>
            ) : groups?.groups?.length > 0 ? (
              groups.groups.map((group) => (
                <SidebarItemGroup key={group.group} group={group} />
              ))
            ) : (
              <li className="text-sm text-red-500">You are yet to join a group</li>
            )}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-700 relative">
          <button
            onClick={toggleMenuOpen}
            className="flex items-center gap-3 w-full hover:bg-gray-800 px-3 py-2 rounded-md"
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
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-sm">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-100 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserSidebar;
