import React, { useState } from 'react'
import FormInputField from '../FormComponents/FormInputField';
import HeaderButton from '../../../common/PageHeader/HeaderButton';
import { useLazySearchUsersQuery } from '../../../../redux/slices/api/usersApi';
import { Search, Users, UserPlus, X, Check, Mail, Phone, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAddMembersMutation } from '../../../../redux/slices/api/groupsApi';

const AddMembersToGroupForm = ({
  setIsAddMembersModalOpen,
  groupId,
  existingMembers = [],
  refetchAPIFunction
}) => {
  const [searchUser, { isLoading: searchUserLoading, isError: searchUserIsError, error: searchUserError, isSuccess: searchUserSuccess }] = useLazySearchUsersQuery();

  const [addMembers, { isLoading: addMembersLoading, isError: addMembersIsError, error: addMembersError, isSuccess: addMembersSuccess }] = useAddMembersMutation();

  const [addMembersForm, setAddMembersForm] = useState({
    searchTerm: '',
    isSearchTermChanged: true
  });

  const handleInputChange = (field, value) => {
    if (field == 'searchTerm') {
      setAddMembersForm(prev => ({
        ...prev,
        isSearchTermChanged: true
      }));
    }

    setAddMembersForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [addedMembers, setAddedMembers] = useState([]);

  const handleSearch = async () => {
    if (!addMembersForm.searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setAddMembersForm(prev => ({
      ...prev,
      isSearchTermChanged: false
    }));

    const query = addMembersForm.searchTerm;
    console.log(query);

    try {
      const result = await searchUser({ query }).unwrap();

      const filteredUsers = result.users.filter(
        (user) =>
          !existingMembers.some((member) => member.user === user._id) &&
          !addedMembers.some((added) => added._id === user._id)
      );

      setSearchedUsers(filteredUsers);
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to search user: ${err?.data?.message || 'Unknown error'}`);
      setSearchedUsers([]);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  const toggleMemberAddition = (currentUser) => {
    if (addedMembers.some((user) => user._id === currentUser._id)) {
      setAddedMembers((prev) =>
        prev.filter((user) => user._id !== currentUser._id)
      );
    } else {
      setAddedMembers((prev) => [...prev, currentUser]);
    }
  };

  const handleAddMembers = async () => {
    if (addedMembers.length === 0) {
      toast.error('Please select at least one member to add');
      return;
    }

    const newMembers = addedMembers.map((member) => member.username);

    try {
      const result = await addMembers({
        groupId,
        newMembers
      }).unwrap();

      if (result.success) {
        setIsAddMembersModalOpen(false);
        toast.success('New Members added Successfully');

        refetchAPIFunction();
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to add new members: ${err.data.message}`);
    }
  };

  const getUserDisplayInfo = (member) => {
    return {
      avatar: member.firstName?.charAt(0)?.toUpperCase() || member.username?.charAt(0)?.toUpperCase() || 'U',
      name: member.firstName + ' ' + member.lastName,
      username: member.username,
      email: member.email,
      mobile: member.mobileNumber
    };
  };

  const isUserAdded = (userId) =>
    addedMembers.some((user) => user._id === userId);

  return (
    <div className='space-y-6'>
      {/* Search Section */}
      <div className="space-y-4">
        <FormInputField
          label={"Search for Users"}
          required={true}
          placeholder={"Search using email, username or mobile number"}
          formObject={addMembersForm}
          formObjectAttribute={'searchTerm'}
          handleChangeFunction={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <HeaderButton
          variant='glassBlue'
          icon={Search}
          size='sm'
          className='ml-auto'
          onClick={handleSearch}
          loading={searchUserLoading}
          disabled={searchUserLoading || !addMembersForm.searchTerm.trim()}
        >
          {searchUserLoading ? 'Searching...' : 'Search Users'}
        </HeaderButton>
      </div>

      {/* Search Results */}
      {(searchedUsers.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Search Results ({searchedUsers.length})
            </span>
          </div>

          <div className="space-y-2 max-h-[180px] overflow-y-auto border border-gray-200 rounded-xl p-2">
            {searchedUsers.map((member) => {
              const userInfo = getUserDisplayInfo(member);
              const isAdded = isUserAdded(member._id);

              return (
                <div
                  key={member._id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm ${isAdded
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  onClick={() => toggleMemberAddition(member)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${isAdded ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                      {userInfo.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-800 text-sm truncate">{userInfo.name}</div>
                      <div className="text-xs text-gray-600 truncate">@{userInfo.username}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        {userInfo.email && (
                          <div className="flex items-center gap-1 min-w-0">
                            <Mail className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="truncate">{userInfo.email}</span>
                          </div>
                        )}
                        {userInfo.mobile && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Phone className="w-2.5 h-2.5" />
                            <span>{userInfo.mobile}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isAdded
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                    }`}>
                    {isAdded && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Added Members */}
      {addedMembers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Added Members ({addedMembers.length})
            </span>
          </div>

          <div className="space-y-2 max-h-[180px] overflow-y-auto border border-green-200 rounded-xl p-2 bg-green-50">
            {addedMembers.map((member) => {
              const userInfo = getUserDisplayInfo(member);

              return (
                <div key={member._id} className="flex items-center justify-between p-2.5 bg-white border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {userInfo.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-800 text-sm truncate">{userInfo.name}</div>
                      <div className="text-xs text-gray-600 truncate">@{userInfo.username}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMemberAddition(member)}
                    className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-150 flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty States */}
      {searchedUsers.length === 0 && addMembersForm.searchTerm && !searchUserLoading && !addMembersForm.isSearchTermChanged && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No users found for "{addMembersForm.searchTerm}"</p>
          <p className="text-sm text-gray-400 mt-1">Try searching with a different term</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setIsAddMembersModalOpen(false)}
          disabled={addMembersLoading}
          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAddMembers}
          disabled={addedMembers.length === 0 || addMembersLoading}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 min-w-[140px]"
        >
          {addMembersLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Adding...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Add {addedMembers.length > 0 ? `${addedMembers.length} ` : ''}Member{addedMembers.length !== 1 ? 's' : ''}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default AddMembersToGroupForm;