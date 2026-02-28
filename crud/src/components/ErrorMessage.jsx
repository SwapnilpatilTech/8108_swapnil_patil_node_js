import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/employeeslice';
import { AlertCircle, X } from "lucide-react";

const ErrorMessage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.employee);

  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700 font-medium">Error</p>
        </div>
        <button
          onClick={() => dispatch(clearError())}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-red-600 mt-1">{error}</p>
    </div>
  );
};

export default ErrorMessage;