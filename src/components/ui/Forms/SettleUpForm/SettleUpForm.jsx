import React, { useEffect, useState } from 'react'
import FormInputSelect from '../FormComponents/FormInputSelect';
import { parseAmount } from '../../../../utils/parseAmount';
import FormInputBalanceSelector from '../FormComponents/FormInputBalanceSelector';
import { Loader2 } from 'lucide-react';
import FormInputField from '../FormComponents/FormInputField';
import { useGetCompleteGroupsSummaryQuery } from '../../../../redux/slices/api/groupsApi';
import useUser from '../../../../hooks/useUser';
import FormErrorMessage from '../FormComponents/FormErrorMessage';
import { useAddExpenseMutation } from '../../../../redux/slices/api/transactionsApi';
import toast from 'react-hot-toast';

const SettleUpForm = ({ userBalances, defaultGroup, setIsSettleUpModalOpen, refetchAPIFunction, defaultBalanceOptionUser }) => {

  const { data: groupsData, isLoading: groupsLoading, isError: isGroupsError } = useGetCompleteGroupsSummaryQuery();

  const [addExpense, { isLoading: expenseAddLoading, isError: expenseAddIsError, error: expenseAddError, isSuccess: expsenseAddsSuccess, data: expenseAddData }] = useAddExpenseMutation();

  const { username: currentUsername } = useUser();

  const availableOptions = Object.keys(userBalances)
    .map(username => {
      const balance = userBalances[username];
      const owesYou = balance > 0;
      const youOwe = balance < 0;

      return {
        id: username,
        value: username,
        title: owesYou
          ? `${username} owes you ${parseAmount(Math.abs(balance))}`
          : youOwe
            ? `You owe ${username} ${parseAmount(Math.abs(balance))}`
            : `${username} - Settled`,
        balance: balance,
        priority: youOwe ? 1 : owesYou ? 2 : 3,
        type: youOwe ? 'debt' : owesYou ? 'credit' : 'settled'
      };
    })
    .sort((a, b) => a.priority - b.priority);

  const [groupMembers, setGroupMembers] = useState([]);
  
  const [settleUpFormData, setSettleUpFormData] = useState({
    balanceOption: null,
    description: "",
    amount: null,
    groupId: defaultGroup || "",
    user_paid: "",
    users_involved: [],
    type: "Payment",
    note: ""
  });

  const handleInputChange = (field, value) => {

    setSettleUpFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'balanceOption') {
      setSettleUpFormData(prev => ({
        ...prev,
        note: `Settlement with ${value.value}`,
        amount: Math.abs(value.balance).toFixed(2),
        user_paid: `${value.type === 'debt' ? currentUsername : value.value}`,
        users_involved: `${value.type !== 'debt' ? currentUsername : value.value}`
      }))
    }
  };
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
  }, [defaultGroup, groupsData])

  useEffect(() => {
    if (defaultBalanceOptionUser) {
      const defaultBalanceOption = availableOptions.find((option) => option.value === defaultBalanceOptionUser);
      handleInputChange('balanceOption', defaultBalanceOption);
    }
  }, [defaultBalanceOptionUser, availableOptions]);




  const handleSettleUp = async () => {
    try {
      const payload = {
        amount: settleUpFormData.amount,
        user_paid: settleUpFormData.user_paid,
        users_involved: [
          {
            user: settleUpFormData.users_involved,
            share: settleUpFormData.amount
          }
        ],
        groupId: settleUpFormData.groupId,
        description: settleUpFormData.description,
        note: settleUpFormData.note,
        type: settleUpFormData.type
      }

      const result = await addExpense(payload).unwrap();

      if (result.success) {
        setIsSettleUpModalOpen(false);
        toast.success('New Payment Added Successfully');

        if (refetchAPIFunction) {
          refetchAPIFunction();
        }
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to add a new payment: ${err.data.message}`);
    }
  }

  const isFormValid = settleUpFormData.description && settleUpFormData.amount > 0 && settleUpFormData.users_involved && settleUpFormData.user_paid && settleUpFormData.user_paid !== settleUpFormData.users_involved;

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>

        <FormInputBalanceSelector
          label={"Select a Balance to Settle"}
          required={true}
          formObject={settleUpFormData}
          formObjectAttribute={'balanceOption'}
          handleChangeFunction={handleInputChange}
          options={availableOptions}
        />

        {settleUpFormData.balanceOption && (
          <>
            <FormInputField
              label={"Payment Description"}
              required={true}
              placeholder={"Enter a description"}
              formObject={settleUpFormData}
              formObjectAttribute={'description'}
              handleChangeFunction={handleInputChange}
            />

            <FormInputField
              label={"Amount"}
              required={true}
              placeholder={0}
              formObject={settleUpFormData}
              formObjectAttribute={'amount'}
              handleChangeFunction={handleInputChange}
              type='number'
            />

            <FormInputSelect
              label={"User Paid"}
              required={true}
              formObject={settleUpFormData}
              formObjectAttribute={'user_paid'}
              handleChangeFunction={handleInputChange}
              options={groupMembers}
              placeholder='Who Paid?'
            />

            <FormInputSelect
              label={"Paid to"}
              required={true}
              formObject={settleUpFormData}
              formObjectAttribute={'users_involved'}
              handleChangeFunction={handleInputChange}
              options={groupMembers}
              placeholder='Who Received?'
            />

            <FormInputField
              label={"Note"}
              required={false}
              placeholder={"Extra Information"}
              formObject={settleUpFormData}
              formObjectAttribute={'note'}
              handleChangeFunction={handleInputChange}
            />
          </>


        )}

      </div>

      {settleUpFormData.user_paid === settleUpFormData.users_involved &&
        <FormErrorMessage message={'Payer and receiver cannot be the same person.'} />
      }


      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setIsSettleUpModalOpen(false)}
          // disabled={isLoading}
          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSettleUp}
          disabled={!isFormValid}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 min-w-[120px]"
        >
          {expenseAddLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Adding...
            </>
          ) : (
            'Add Payment'
          )}
        </button>
      </div>

    </div>
  )
}

export default SettleUpForm;