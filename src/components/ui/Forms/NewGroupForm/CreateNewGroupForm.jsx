import React, { useState } from 'react'
import { iconOptionsData } from '../../../../data/IconOptionsData';
import FormInputField from '../FormComponents/FormInputField';
import FormInputTextArea from '../FormComponents/FormInputTextArea';
import FormInputSelect from '../FormComponents/FormInputSelect';
import FormInputIconSelect from '../FormComponents/FormInputIconSelect';
import { useCreateGroupMutation } from '../../../../redux/slices/api/groupsApi';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';


const NewGroupForm = ({ setIsNewGroupModalOpen, refetchFunction }) => {
  const [createGroup, { isLoading, isError, error, isSuccess, data }] = useCreateGroupMutation();
  const { sidebarGroupsRefetch } = useOutletContext();

  const [newGroupDataForm, setNewGroupDataForm] = useState({
    name: "",
    description: "",
    currency: '',
    category: "",
    selectedIcon: ""
  });

  const currencyOptions = [
    { id: 1, value: "", title: "Select currency" },
    { id: 2, value: "INR", title: "INR (₹)" },
    { id: 3, value: "USD", title: "USD ($)" },
    { id: 5, value: "GBP", title: "GBP (£)" },
    { id: 4, value: "EUR", title: "EUR (€)" },
  ]

  const categoryOptions = [
    { id: 1, value: '', title: 'Select Category' },
    { id: 2, value: 'Home', title: 'Home' },
    { id: 3, value: 'Trip', title: 'Trip' },
    { id: 4, value: 'Office', title: 'Office' },
    { id: 5, value: 'Friends', title: 'Friends' },
    { id: 6, value: 'Other', title: 'Other' },
  ]

  const handleInputChange = (field, value) => {
    setNewGroupDataForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateGroup = async () => {
    try {
      const result = await createGroup(newGroupDataForm).unwrap();
      console.log(result);

      if (result.success) {
        toast.success('New Group Created Successfully');

        refetchFunction();
        sidebarGroupsRefetch();
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to create a group: ${err.data.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Group Name */}
        <FormInputField
          label={"Group Name"}
          required={true}
          placeholder={"Enter group name"}
          formObject={newGroupDataForm}
          formObjectAttribute={'name'}
          handleChangeFunction={handleInputChange}
        />

        {/* Description */}
        <FormInputTextArea
          label={"Description"}
          required={false}
          placeholder={"Optional description for this group"}
          formObject={newGroupDataForm}
          formObjectAttribute={'description'}
          rowSize={3}
          handleChangeFunction={handleInputChange}
        />

        {/* Currency */}
        <FormInputSelect
          label={"Currency"}
          required={true}
          formObject={newGroupDataForm}
          formObjectAttribute={'currency'}
          handleChangeFunction={handleInputChange}
          options={currencyOptions}
        />

        {/* Category */}
        <FormInputSelect
          label={"Category"}
          required={true}
          formObject={newGroupDataForm}
          formObjectAttribute={'category'}
          handleChangeFunction={handleInputChange}
          options={categoryOptions}
        />

        {/* Icon Selection */}
        <FormInputIconSelect
          label={'Group Icon'}
          required={true}
          formObject={newGroupDataForm}
          formObjectAttribute={'selectedIcon'}
          handleChangeFunction={handleInputChange}
          options={iconOptionsData}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setIsNewGroupModalOpen(false)}
          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreateGroup}
          disabled={!newGroupDataForm.name || !newGroupDataForm.currency || !newGroupDataForm.category || !newGroupDataForm.selectedIcon}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
        >
          Create Group
        </button>
      </div>
    </div>
  )
}

export default NewGroupForm;