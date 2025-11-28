import SidebarItemMenu from './SidebarItemMenu';
import SidebarItemGroup from './SidebarItemGroup';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  LayoutDashboard,
  LogOut, 
  FileText, 
  Menu, 
  User, 
  Users, 
  X,
} from 'lucide-react';
import { useGetUserGroupsQuery } from '../../../redux/slices/api/groupsApi';
import { useLogoutMutation } from '../../../redux/slices/api/authApi';
import { useGetUserDetailsQuery } from '../../../redux/slices/api/usersApi';
import useUser from '../../../hooks/useUser';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../redux/slices/api/apiSlice';
import { useState, useEffect, useRef } from 'react';

const items = [
  { key: 1, title: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
  { key: 2, title: 'All expenses', path: '/user/all', icon: FileText },
  { key: 3, title: 'Groups', path: '/user/groups', icon: Users },
  { key: 4, title: 'Activity', path: '/user/activity', icon: Activity },
  { key: 5, title: 'Reports', path: '/user/reports', icon: BarChart3 },
];

const UserSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Create ref for the main content area
  const mainContentRef = useRef(null);

  // API hooks
  const { data: groups, isLoading, isError, refetch: sidebarGroupsRefetch } = useGetUserGroupsQuery();
  const { data: userInfo, isLoading: isUserLoading } = useGetUserDetailsQuery();
  const [logout] = useLogoutMutation();
  
  const { username } = useUser();
  const dispatch = useDispatch();

  const location = useLocation();

  // Reset scroll position when route changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      if (result.success) {
        toast.success('Logged out successfully!');
        dispatch(apiSlice.util.resetApiState());
      } 
    } catch (err) {
      console.error(err.message);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-30 px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Split n Share</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 
          transition-all duration-300 
          ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
          bg-black/20 backdrop-blur-sm
        `}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:relative 
        w-[280px] lg:w-[280px] 
        h-full 
        bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
        text-white 
        flex flex-col 
        justify-between 
        overflow-hidden
        transition-all 
        duration-300 
        ease-in-out 
        z-50
        lg:z-auto
        border-r border-gray-800
        shadow-2xl lg:shadow-none
      `}>
        
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 pb-4">
            {/* Desktop Logo */}
            <div className="hidden lg:flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Split n Share</h1>
                <p className="text-xs text-gray-400">Expense Management</p>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-lg font-bold">Split n Share</h1>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                Navigation
              </div>
              <ul className="space-y-1 list-none">
                {items.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <SidebarItemMenu 
                      key={item.key} 
                      item={item} 
                      isActive={item.path === location.pathname}
                    />
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* Groups Section */}
          <div className="px-6 flex-1 overflow-y-auto">
            <div className="border-t border-gray-700/50 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Your Groups
                </span>
                <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                  {groups?.groups?.length}
                </div>
              </div>
              
              <ul className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar list-none">
                {groups?.groups?.length > 0 ? (
                  groups.groups.map((group) => (
                    <SidebarItemGroup 
                      key={group.group} 
                      group={group} 
                      isActive={`/user/groups/${group.groupId}` === location.pathname}
                    />
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic px-3 py-4 text-center list-none">
                    No groups yet
                    <br />
                    <span className="text-xs text-gray-600">Create your first group to get started</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
            <div className="relative">
              <button
                onClick={toggleMenuOpen}
                className="flex items-center gap-3 w-full hover:bg-gray-800/50 px-3 py-3 rounded-xl transition-all duration-200 group"
              >
                {/* User Avatar Placeholder */}
                <div className="w-9 h-9 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center border-2 border-gray-600 group-hover:border-gray-500 transition-colors duration-200">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium text-white truncate">{username || 'Loading...'}</div>
                  <div className="text-xs text-gray-400">Premium Plan</div>
                </div>
                
                <div className="transition-transform duration-200">
                  {menuOpen ? 
                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  }
                </div>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 py-2 z-50 animate-in slide-in-from-bottom-2 duration-200">
                  <Link 
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    to='/user/profile' 
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 text-sm text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    <User size={16} className="text-gray-400" />
                    <span>View Profile</span>
                  </Link>
                  <hr className="border-gray-700 my-1" />
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 hover:text-red-400 text-sm text-gray-200 w-full transition-colors duration-200"
                  >
                    <LogOut size={16} className="text-gray-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - Outlet for child routes */}
      <main 
        ref={mainContentRef}
        className="flex-1 h-screen overflow-y-auto bg-gray-50 pt-16 lg:pt-0"
      >
        <div className="p-4 lg:p-6">
          <Outlet context={{ sidebarGroupsRefetch }}/>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
        
        @keyframes slide-in-from-bottom-2 {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }
        
        .duration-200 {
          animation-duration: 200ms;
        }
      `}</style>
    </div>
  );
};

export default UserSidebar;