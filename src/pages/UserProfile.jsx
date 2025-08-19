import React, { useState } from 'react';
import {
  User,
  Settings,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Lock,
  Bell,
  Trash2,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  Activity,
  Crown,
  Loader2
} from 'lucide-react';
import { parseAmount } from '../utils/themes/parseAmount';
import { parseTime } from '../utils/parseTime';
import { getInitials } from '../utils/getInitials';
import useUser from '../hooks/useUser';
import { useUpdateUserDetailsMutation } from '../redux/slices/api/usersApi';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [updateUserDetails, { isLoading, isError, error, isSuccess, data }] = useUpdateUserDetailsMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { user } = useUser();

  const userData = user?.userData || {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobileNumber: '',
    location: '',
    occupation: '',
    gender: '',
    picturePath: null,
    isActive: true,
    totalBalance: 0,
    createdAt: new Date().toISOString(),
    groups: [],
    transactions: []
  };

  const [editData, setEditData] = useState(userData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = async () => {
    
    const updatedFields = {
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      mobileNumber: editData.mobileNumber,
      location: editData.location,
      occupation: editData.occupation
    };

    try {
      const result = await updateUserDetails(updatedFields).unwrap();
      setIsEditing(false);

      toast.success('Changes saved successfully!')
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to update user: ${err.data.message}`);
    }
    
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(userData);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // setIsLoading(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">

      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
          <CheckCircle size={20} />
          <span>Changes saved successfully!</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Edit3 size={18} />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                <span className="hidden sm:inline">{isLoading ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50"
              >
                <X size={18} />
                <span className="hidden sm:inline">Cancel</span>
              </button>
            </>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-200/50">
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Profile Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Groups Joined
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{userData.groups.length}</p>
            <p className="text-sm text-gray-600">Active memberships</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Transactions
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{userData.transactions.length}</p>
            <p className="text-sm text-gray-600">Total expenses</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-white to-green-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Total Balance
            </h3>
            <p className={`text-3xl lg:text-4xl font-bold mb-3 ${userData.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseAmount(userData.totalBalance)}
            </p>
            <p className="text-sm text-gray-600">Current standing</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                <p className="text-sm text-gray-600">Your personal details and contact information</p>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
              <div className="relative">
                {userData.picturePath ? (
                  <img
                    src={userData.picturePath}
                    alt="Profile"
                    className="w-16 h-16 rounded-xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">
                      {getInitials(userData.firstName, userData.lastName)}
                    </span>
                  </div>
                )}
                {/* {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200 shadow-lg">
                    <Camera size={14} />
                  </button>
                )} */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{userData.firstName} {userData.lastName}</h4>
                <p className="text-sm text-gray-600">@{userData.username}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${userData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-500">{userData.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.firstName}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.lastName}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Username and gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    Username
                  </label>
                  <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                    <p className="text-gray-800">@{userData.username}</p>
                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    Gender
                  </label>
                  <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                    <p className="text-gray-800">{userData.gender}</p>
                    <p className="text-xs text-gray-500 mt-1">Gender cannot be changed</p>
                  </div>
                </div>
              </div>

              {/* Phone and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.mobileNumber}
                      onChange={(e) => setEditData({ ...editData, mobileNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Enter mobile number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.mobileNumber || 'Not provided'}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location and Occupation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.location || 'Not provided'}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={16} />
                    Occupation
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.occupation}
                      onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      placeholder="Enter your occupation"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                      <p className="text-gray-800">{userData.occupation || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} />
                  Member Since
                </label>
                <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                  <p className="text-gray-800">{parseTime(userData.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Account Settings */}
        <div className="space-y-6">
          {/* Security Settings */}
          <div className="bg-gradient-to-br from-white via-white to-red-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
                  <p className="text-sm text-gray-600">Manage your account security</p>
                </div>
              </div>

              {!isChangingPassword ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock size={20} className="text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-800">Password</p>
                          <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsChangingPassword(true)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all duration-200"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell size={20} className="text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-800">Notifications</p>
                          <p className="text-sm text-gray-600">Email notifications enabled</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                      {isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-gradient-to-br from-white via-white to-yellow-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Account Actions</h3>
                  <p className="text-sm text-gray-600">Manage your account preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${userData.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        <div className={`w-3 h-3 rounded-full ${userData.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Account Status</p>
                        <p className="text-sm text-gray-600">{userData.isActive ? 'Your account is active' : 'Your account is inactive'}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-200">
                      {userData.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <Bell size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Export Data</p>
                        <p className="text-sm text-gray-600">Download your account data</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all duration-200">
                      Export
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-red-50/60 backdrop-blur-sm rounded-xl border border-red-200/50 hover:bg-red-50/80 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-red-800">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all duration-200 flex items-center gap-2">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-gradient-to-br from-white via-white to-purple-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Account Statistics</h3>
                  <p className="text-sm text-gray-600">Your activity overview</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userData.groups.length}</p>
                  <p className="text-xs text-gray-600">Active Groups</p>
                </div>

                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userData.transactions.length}</p>
                  <p className="text-xs text-gray-600">Total Expenses</p>
                </div>

                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-800">6M</p>
                  <p className="text-xs text-gray-600">Member For</p>
                </div>

                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-800">2</p>
                  <p className="text-xs text-gray-600">Admin Groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
};

export default UserProfile;