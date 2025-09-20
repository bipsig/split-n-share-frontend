import { AlertCircle } from 'lucide-react';

const FormErrorMessage = ({ message }) => (
  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
    <AlertCircle className="w-4 h-4 flex-shrink-0" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default FormErrorMessage;