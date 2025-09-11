import { IndianRupee, IndianRupeeIcon, Plus, Scale, Target, UserPlus, Users, X } from "lucide-react";
import React, { useState } from "react";
import { distributeEqualSplit } from "../../utils/distributeEqualSplit";
import { parseAmount } from "../../utils/parseAmount";

const UsersSelectionModal = ({ isOpen, onClose, options, totalAmount, onSave, initialData }) => {
  const [splitType, setSplitType] = useState(initialData?.splitType || 'equal');
  const [selectedUsers, setSelectedUsers] = useState(initialData?.selectedUsers || []);
  const [customAmounts, setCustomAmounts] = useState(initialData?.customAmounts || {});

  // Get the equal split distribution
  const equalSplitDistribution = distributeEqualSplit(totalAmount, selectedUsers);
  const equalSplitAmount = selectedUsers.length > 0 ? Object.values(equalSplitDistribution)[0] || 0 : 0;

  const toggleUserSelection = (userId) => {
    const updatedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(updatedUsers);

    if (splitType === 'unequal') {
      const newCustomAmounts = { ...customAmounts };
      if (!selectedUsers.includes(userId) && updatedUsers.includes(userId)) {
        newCustomAmounts[userId] = 0;
      } else if (selectedUsers.includes(userId) && !updatedUsers.includes(userId)) {
        delete newCustomAmounts[userId];
      }
      setCustomAmounts(newCustomAmounts);
    }
  };

  const handleCustomAmountChange = (userId, amount) => {
    const numAmount = parseFloat(amount) || 0;
    setCustomAmounts(prev => ({
      ...prev,
      [userId]: numAmount
    }));
  };

  const handleSave = () => {
    // Create users_involved array with user and share structure
    const users_involved = selectedUsers.map(userId => {
      const user = options.find(option => option.value === userId);
      let share = 0;
      
      if (splitType === 'equal') {
        share = equalSplitDistribution[userId] || 0;
      } else {
        share = customAmounts[userId] || 0;
      }
      
      return {
        user: userId,
        share: parseFloat(share.toFixed(2))
      };
    });

    const splitData = {
      selectedUsers,
      splitType,
      customAmounts,
      equalSplitAmount: parseFloat(equalSplitAmount),
      equalSplitDistribution,
      users_involved // Add the formatted users_involved array
    };

    onSave(splitData);
    onClose();
  };

  const availableUsers = options.filter(user => !selectedUsers.includes(user.value));
  const selectedUserObjects = options.filter(user => selectedUsers.includes(user.value));

  // Calculate totals for validation
  const totalCustomAmount = Object.values(customAmounts).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0);
  const remainingAmount = totalAmount - totalCustomAmount;
  const isUnequalSplitValid = splitType === 'equal' || Math.abs(remainingAmount) < 0.01;

  // Calculate total of equal split for verification
  const totalEqualSplit = Object.values(equalSplitDistribution).reduce((sum, amount) => sum + amount, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[75vh] flex flex-col overflow-hidden">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Split Expense</h3>
              <p className="text-sm text-gray-600 mt-1">
                Choose who pays and how to split ₹{totalAmount && parseAmount(totalAmount)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* Split Type Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">How to split:</span>
                <div className="flex gap-2">
                  {['equal', 'unequal'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSplitType(type)}
                      className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${splitType === type
                        ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-200'
                        : 'text-gray-600 hover:bg-white/50'
                        }`}
                    >
                      {type === 'equal' ? (
                        <span className="flex items-center gap-2">
                          <Scale className="w-6 h-6 text-yellow-600" />
                          Split Equally
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Target className="w-6 h-6 text-red-900" />
                          Custom Amounts
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Equal Split Summary */}
            {splitType === 'equal' && selectedUsers.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  <div className="flex justify-between items-center">
                    <span>Split Distribution:</span>
                    <span className="font-medium">Total: {parseAmount(totalEqualSplit)}</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    {selectedUsers.length > 1 && Object.values(equalSplitDistribution).some(amount => amount !== equalSplitAmount) ?
                      `Minor rounding adjustments are distributed among users` :
                      `Each person pays exactly ${parseAmount(equalSplitAmount)}`
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Available Users */}
            {availableUsers.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Available users (click to add):
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableUsers.map((user) => (
                    <button
                      key={user.value}
                      type="button"
                      onClick={() => toggleUserSelection(user.value)}
                      className="group px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm hover:border-blue-300 hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium transition-colors">
                          {user.title.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.title}</span>
                        <Plus className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Users */}
            {selectedUserObjects.length > 0 ? (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Splitting between {selectedUserObjects.length} {selectedUserObjects.length === 1 ? 'person' : 'people'}:
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedUserObjects.map((user, index) => (
                    <div
                      key={user.value}
                      className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 transform hover:scale-[1.01]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'slideInUp 0.3s ease-out'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 border-2 border-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                          {user.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{user.title}</span>
                          <span className="text-xs text-gray-500">Group member</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {splitType === 'equal' ? (
                          <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            <IndianRupeeIcon className="w-4 h-4 text-gray-600" />
                            <span className="font-semibold text-gray-900">
                              {(equalSplitDistribution[user.value] || 0).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            <IndianRupee className="w-4 h-4 text-gray-600" />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={customAmounts[user.value] || ''}
                              onChange={(e) => handleCustomAmountChange(user.value, e.target.value)}
                              className="w-20 px-2 py-1 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-md text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleUserSelection(user.value)}
                          className="w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Validation for Unequal Split */}
                {splitType === 'unequal' && selectedUsers.length > 0 && (
                  <div className={`mt-4 p-3 rounded-lg border ${isUnequalSplitValid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                    }`}>
                    <div className="flex justify-between items-center text-sm">
                      <span className={isUnequalSplitValid ? 'text-green-800' : 'text-red-800'}>
                        Total Assigned: ₹{totalCustomAmount.toFixed(2)}
                      </span>
                      <span className={isUnequalSplitValid ? 'text-green-800' : 'text-red-800'}>
                        Remaining: ₹{remainingAmount.toFixed(2)}
                      </span>
                    </div>
                    {!isUnequalSplitValid && (
                      <div className="text-xs text-red-600 mt-1">
                        💡 Adjust amounts to match the total expense of ₹{totalAmount?.toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">No users selected</p>
                <p className="text-xs text-gray-500">Select users from above to start splitting the expense</p>
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className="flex flex-col items-start p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            {/* Summary line */}
            <div className="text-sm text-gray-600 w-full truncate mb-3">
              {selectedUsers.length > 0 ? (
                <div className="flex items-center justify-between">
                  <span>
                    {selectedUsers.length} participant{selectedUsers.length > 1 ? 's' : ''} selected
                  </span>
                  {splitType === 'equal' && (
                    <span className="font-medium">
                      Total: ₹{totalEqualSplit.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-gray-400">Select users to continue</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={selectedUsers.length === 0 || (splitType === 'unequal' && !isUnequalSplitValid)}
                className="px-8 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                Apply Split
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations and custom scrollbar */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
    </>
  );
};

export default UsersSelectionModal;