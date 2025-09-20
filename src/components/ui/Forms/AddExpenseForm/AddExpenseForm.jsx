import React, { useEffect, useState } from 'react'
import FormInputField from '../FormComponents/FormInputField';
import { Loader2 } from 'lucide-react';
import { useGetCompleteGroupsSummaryQuery, useGetUserGroupsQuery } from '../../../../redux/slices/api/groupsApi';
import FormInputSelect from '../FormComponents/FormInputSelect';
import FormInputUsersInvolved from '../FormComponents/FormInputUsersInvolved';
import { useAddExpenseMutation } from '../../../../redux/slices/api/transactionsApi';
import toast from 'react-hot-toast';

const AddExpenseForm = ({ setIsAddExpenseModalOpen, refetchDashboardData, refetchAPIFunction, defaultGroup }) => {
  const { data: groupsData, isLoading: groupsLoading, isError: isGroupsError } = useGetCompleteGroupsSummaryQuery();

  const [addExpense, { isLoading: expenseAddLoading, isError: expenseAddIsError, error: expenseAddError, isSuccess: expsenseAddsSuccess, data: expenseAddData }] = useAddExpenseMutation();

  const [groupMembers, setGroupMembers] = useState([]);

  const [addExpenseDataForm, setAddExpenseDataForm] = useState({
    description: "",
    amount: null,
    groupId: defaultGroup || "",
    user_paid: "",
    users_involved: [],
    type: "Expense",
    note: ""
  });

  useEffect(() => {
    if (defaultGroup) {
      const requiredGroup = groupsData?.groupsSummary?.find((group) => group.id === defaultGroup);
      if (requiredGroup) {
        setGroupMembers(requiredGroup.members.map((member) => {
          return {
            id: member.user,
            value: member.username,
            title: member.username,
            role: member.role
          }
        }));
      }
    }
  }, [defaultGroup, groupsData] )

  const userGroups = groupsData?.groupsSummary?.map((group) => {
    return {
      id: group.id,
      value: group.id,
      title: group.name,
    }
  }) || [];

  const handleInputChange = (field, value) => {
    if (field === 'groupId' && value !== "") {
      const requiredGroup = groupsData?.groupsSummary?.find((group) => group.id === value);
      if (requiredGroup) {
        setGroupMembers(requiredGroup.members.map((member) => {
          return {
            id: member.user,
            value: member.username,
            title: member.username,
            role: member.role
          }
        }));
      }
      else {
        setGroupMembers([]);
      }
    }
    setAddExpenseDataForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddExpense = async () => {

    try {
      const result = await addExpense(addExpenseDataForm).unwrap();

      if (result.success) {
        setIsAddExpenseModalOpen(false);
        toast.success('New Expense Added Successfully');

        if (refetchAPIFunction) {
          refetchAPIFunction();
        }
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to add a new expense: ${err.data.message}`);
    }
  }

  const isFormValid = addExpenseDataForm.description && addExpenseDataForm.amount > 0 && addExpenseDataForm.groupId && addExpenseDataForm.users_involved.length > 0;

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <FormInputField
          label={"Expense Description"}
          required={true}
          placeholder={"Enter a description"}
          formObject={addExpenseDataForm}
          formObjectAttribute={'description'}
          handleChangeFunction={handleInputChange}
        />

        <FormInputSelect
          label={"Group"}
          required={true}
          formObject={addExpenseDataForm}
          formObjectAttribute={'groupId'}
          handleChangeFunction={handleInputChange}
          options={userGroups}
          isLoading={groupsLoading} 
        />

        <FormInputField
          label={"Amount"}
          required={true}
          placeholder={0}
          formObject={addExpenseDataForm}
          formObjectAttribute={'amount'}
          handleChangeFunction={handleInputChange}
          type='number'
        />

        <FormInputSelect
          label={"User Paid"}
          required={true}
          formObject={addExpenseDataForm}
          formObjectAttribute={'user_paid'}
          handleChangeFunction={handleInputChange}
          options={groupMembers}
          placeholder='Who Paid?'
        />

        <FormInputUsersInvolved
          label={"Users Involved"}
          required={true}
          formObject={addExpenseDataForm}
          formObjectAttribute={'users_involved'}
          handleChangeFunction={handleInputChange}
          options={groupMembers}
          totalAmount={parseFloat(addExpenseDataForm.amount) || 0}
        />

        <FormInputField
          label={"Note"}
          required={false}
          placeholder={"Extra Information"}
          formObject={addExpenseDataForm}
          formObjectAttribute={'note'}
          handleChangeFunction={handleInputChange}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setIsAddExpenseModalOpen(false)}
          disabled={expenseAddLoading}
          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAddExpense}
          disabled={!isFormValid || expenseAddLoading}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 min-w-[120px]"
        >
          {expenseAddLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Adding...
            </>
          ) : (
            'Add Expense'
          )}
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm;