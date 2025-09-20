import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, DollarSign, User, AlertCircle, IndianRupee } from 'lucide-react';
import { parseAmount } from '../../../../utils/parseAmount';

const FormInputBalanceSelector = ({
  label = "Select a Balance to Settle",
  required = true,
  formObject,
  formObjectAttribute,
  handleChangeFunction,
  options = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  const selectedValue = formObject[formObjectAttribute];
  
  // Fixed: Handle both object and string values for backward compatibility
  const selectedOption = typeof selectedValue === 'object' && selectedValue !== null
    ? selectedValue // If it's already an object, use it directly
    : options.find(opt => opt.value === selectedValue || opt.id === selectedValue); // Otherwise find by value/id

  const handleSelect = (option) => {
    // Store the entire option object instead of just the value
    handleChangeFunction(formObjectAttribute, option);
    setIsOpen(false);
  };

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      const handleResize = () => updateDropdownPosition();
      const handleScroll = () => updateDropdownPosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        const dropdown = document.getElementById('balance-selector-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const getBalanceDisplayInfo = (option) => {
    const isDebt = option.type === 'debt'; // You owe them
    const isCredit = option.type === 'credit'; // They owe you
    
    if (isDebt) {
      return {
        primaryText: option.id,
        secondaryText: `You owe ${parseAmount(Math.abs(option.balance))}`,
        amountText: `${parseAmount(Math.abs(option.balance))}`,
        amountColor: 'text-red-600',
        bgGradient: 'from-red-500 to-red-600',
        helperText: 'you owe'
      };
    } else if (isCredit) {
      return {
        primaryText: option.id,
        secondaryText: `Owes you ${parseAmount(Math.abs(option.balance))}`,
        amountText: `${parseAmount(Math.abs(option.balance))}`,
        amountColor: 'text-green-600',
        bgGradient: 'from-green-500 to-green-600',
        helperText: 'owes you'
      };
    } else {
      return {
        primaryText: option.id,
        secondaryText: 'Settled up',
        amountText: `${parseAmount(0)}`,
        amountColor: 'text-gray-500',
        bgGradient: 'from-gray-400 to-gray-500',
        helperText: 'settled'
      };
    }
  };

  const DropdownContent = () => (
    <div
      id="balance-selector-dropdown"
      className="bg-white border-2 border-gray-100 rounded-2xl shadow-xl overflow-hidden"
      style={{
        position: 'absolute',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        zIndex: 9999,
        maxHeight: '240px'
      }}
    >
      <div className="max-h-60 overflow-y-auto">
        {options.length === 0 ? (
          <div className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No outstanding balances to settle</p>
          </div>
        ) : (
          options.map((option) => {
            const displayInfo = getBalanceDisplayInfo(option);
            const isSelected = selectedOption && (
              selectedOption.id === option.id || 
              selectedOption.value === option.value
            );
            
            return (
              <button
                key={option.id || option.value}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 hover:bg-gray-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                  isSelected ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${displayInfo.bgGradient} rounded-full flex items-center justify-center shadow-sm`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{displayInfo.primaryText}</p>
                      <p className="text-sm text-gray-500">{displayInfo.helperText}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${displayInfo.amountColor} text-lg`}>{displayInfo.amountText}</p>
                    <p className="text-xs text-gray-400">to settle</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  // Fixed: Updated to work with option objects
  const getSelectedDisplayInfo = () => {
    if (!selectedOption) return null;
    return getBalanceDisplayInfo(selectedOption);
  };

  const selectedDisplayInfo = getSelectedDisplayInfo();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {/* Main Selector Button */}
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {selectedDisplayInfo ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${selectedDisplayInfo.bgGradient} rounded-full flex items-center justify-center shadow-md`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{selectedDisplayInfo.primaryText}</p>
                  <p className={`text-sm font-medium ${selectedDisplayInfo.amountColor}`}>{selectedDisplayInfo.secondaryText}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="text-gray-500">Select a person to settle with</p>
                  <p className="text-xs text-gray-400">Choose someone to settle balances</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          )}
        </button>

        {/* Dropdown rendered in portal */}
        {isOpen && createPortal(<DropdownContent />, document.body)}
      </div>
    </div>
  );
};

export default FormInputBalanceSelector;