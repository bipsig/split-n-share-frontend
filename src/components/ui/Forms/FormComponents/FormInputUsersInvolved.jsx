import React, { useState, useEffect } from 'react'
import FormInputLabel from './FormInputLabel';
import { Check, Users, Calculator, DollarSign, X, Plus, Settings, Edit3, UserPlus } from 'lucide-react';
import UsersSelectionModal from '../../../modals/UserSelectionModal';
import { parseAmount } from '../../../../utils/parseAmount';

const FormInputUsersInvolved = ({ 
  label, 
  required, 
  formObject, 
  formObjectAttribute, 
  options, 
  handleChangeFunction, 
  totalAmount 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [splitData, setSplitData] = useState({
    selectedUsers: [],
    splitType: 'equal',
    customAmounts: {},
    equalSplitAmount: 0,
    equalSplitDistribution: {},
    users_involved: []
  });

  useEffect(() => {
    if (formObject[formObjectAttribute] && Array.isArray(formObject[formObjectAttribute])) {
      // If the form already has users_involved data, reconstruct the split data
      const existingUsersInvolved = formObject[formObjectAttribute];
      if (existingUsersInvolved.length > 0 && existingUsersInvolved[0].user && existingUsersInvolved[0].share !== undefined) {
        // This is the formatted data structure
        const selectedUsers = existingUsersInvolved.map(item => item.user);
        setSplitData(prev => ({
          ...prev,
          selectedUsers,
          users_involved: existingUsersInvolved
        }));
      } else {
        // This is the old format (just array of user IDs)
        setSplitData(prev => ({
          ...prev,
          selectedUsers: existingUsersInvolved
        }));
      }
    }
  }, [formObject, formObjectAttribute]);

  const handleSplitSave = (data) => {
    setSplitData(data);
    // Pass the formatted users_involved array to the form
    console.log('Saving split data:', data.users_involved);
    handleChangeFunction(formObjectAttribute, data.users_involved);
  };

  const getSelectedUserNames = () => {
    return options
      .filter(user => splitData.selectedUsers.includes(user.value))
      .map(user => user.title)
      .join(', ');
  };

  const getTotalSplitAmount = () => {
    if (splitData.users_involved && splitData.users_involved.length > 0) {
      return splitData.users_involved.reduce((total, user) => total + user.share, 0);
    }
    return 0;
  };

  const getSplitSummary = () => {
    if (splitData.users_involved && splitData.users_involved.length > 0) {
      if (splitData.splitType === 'equal') {
        const amounts = splitData.users_involved.map(user => parseAmount(user.share));
        return `Split: ${amounts.join(', ')}`;
      } else {
        return 'Custom amounts';
      }
    }
    return splitData.splitType === 'equal' 
      ? `~₹${splitData.equalSplitAmount?.toFixed(2)} per person`
      : 'Custom amounts';
  };

  return (
    <div className="space-y-2">
      <FormInputLabel label={label} required={required} />
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={options.length === 0}
        className={`w-full p-4 border-2 border-dashed rounded-xl transition-all ${
          splitData.selectedUsers.length > 0
            ? 'border-blue-300 bg-blue-50 hover:bg-blue-100'
            : 'border-gray-300 hover:border-gray-400 bg-white'
        } ${options.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-3">
          {splitData.selectedUsers.length > 0 ? (
            <div className="flex items-center gap-2 text-blue-600">
              <Check className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium text-sm">
                  {splitData.selectedUsers.length} user{splitData.selectedUsers.length > 1 ? 's' : ''} selected
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {getSelectedUserNames()} • {splitData.splitType} split
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-500">
              <UserPlus className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium text-sm">Select Users to Split Expense</div>
                <div className="text-xs">
                  {options.length === 0 
                    ? "Please select a group first" 
                    : `${options.length} users available`
                  }
                </div>
              </div>
            </div>
          )}
          <div className="ml-auto">
            <Edit3 className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </button>

      {/* Split Summary - Updated to show proper distribution info */}
      {splitData.selectedUsers.length > 0 && totalAmount > 0 && (
        <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
          💰 Total: {parseAmount(totalAmount)} • {getSplitSummary()}
          {splitData.users_involved.length > 0 && (
            <span className="ml-2 font-medium">
              (Sum: {parseAmount(getTotalSplitAmount())})
            </span>
          )}
        </div>
      )}

      {/* Detailed Split Breakdown - NEW */}
      {splitData.users_involved && splitData.users_involved.length > 0 && (
        <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="font-medium text-blue-800 mb-2">Split Breakdown:</div>
          <div className="space-y-1">
            {splitData.users_involved.map((userSplit, index) => {
              const userName = options.find(opt => opt.value === userSplit.user)?.title || userSplit.user;
              return (
                <div key={index} className="flex justify-between text-blue-700">
                  <span>{userName}</span>
                  <span className="font-medium">{parseAmount(userSplit.share)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      <UsersSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        options={options}
        totalAmount={totalAmount}
        onSave={handleSplitSave}
        initialData={splitData}
      />
    </div>
  );
};

export default FormInputUsersInvolved;