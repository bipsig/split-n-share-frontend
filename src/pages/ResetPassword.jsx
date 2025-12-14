import React, { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, KeyRound, User, Lock, Eye, EyeOff, TrendingUp, Cake, MapPinned, CheckCircle2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import BufferLength from '../layouts/BufferLength';
import { useIdentifyUserMutation, useResetPasswordMutation } from '../redux/slices/api/authApi';
import RegisterFormTextInput from '../components/ui/Forms/RegisterForm/RegisterFormTextInput';
import PrimaryButton from '../components/ui/Forms/RegisterForm/PrimaryButton';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [identifyUser, { isLoading: isIdentifying, isError: isIdentifyingError, error: identifyinError, isSuccess: isIdentifyingSuccess }] = useIdentifyUserMutation();
  const [resetPassword, { isLoading: isResetting, isError: isResettingError, error: resettingError, isSuccess: isResettingSuccess }] = useResetPasswordMutation();

  // Step management
  const [step, setStep] = useState(1); // 1: Identify User, 2: Reset Password, 3: Success
  const [resetToken, setResetToken] = useState('');

  // Step 1 form data
  const [identifyData, setIdentifyData] = useState({
    username: '',
    gender: '',
    dateOfBirth: '',
    birthCity: ''
  });

  // Step 2 form data
  const [resetData, setResetData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleIdentifyChange = (e) => {
    const { name, value } = e.target;
    setIdentifyData(prev => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData(prev => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  const handleIdentifyUser = async (e) => {
    e.preventDefault();

    if (!identifyData.username || !identifyData.gender || !identifyData.dateOfBirth || !identifyData.birthCity) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await identifyUser(identifyData).unwrap();

      if (result.success) {
        setResetToken(result.data.resetToken);
        setStep(2);
        toast.success('User verified successfully!');
      } else {
        toast.error(result.message || 'Verification failed');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Unable to verify user. Please check your information.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (resetData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await resetPassword(JSON.stringify({
        username: identifyData.username,
        newPassword: resetData.newPassword,
        resetToken: resetToken
      })).unwrap();

      if (result.success) {
        setStep(3);
        toast.success('Password reset successfully!');
      }
      else {
        toast.error(result.message || 'Password reset failed');
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error('Unable to reset password. Please try again.');
    }
  };

  const handleBackToIdentify = () => {
    setStep(1);
    setResetToken('');
    setResetData({ newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 flex items-center justify-center p-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Reset Password Card */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 && 'Reset Password'}
            {step === 2 && 'Create New Password'}
            {step === 3 && 'Password Reset'}
          </h1>
          <p className="text-gray-600">
            {step === 1 && 'Verify your identity to reset your password'}
            {step === 2 && 'Enter your new password'}
            {step === 3 && 'Your password has been updated'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Step 1: Identify User */}
          {step === 1 && (
            <form onSubmit={handleIdentifyUser} className="space-y-6">
              {/* Username Field */}
              <RegisterFormTextInput
                label="Username"
                Icon={User}
                field="username"
                handleInputChange={handleIdentifyChange}
                formData={identifyData}
                required={true}
                placeholder={"Enter your username"}
              />

              {/* Gender Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={identifyData.gender}
                  onChange={handleIdentifyChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-200 text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Date of Birth Field */}
              <RegisterFormTextInput
                type='date'
                label="Date of Birth"
                Icon={Cake}
                field="dateOfBirth"
                handleInputChange={handleIdentifyChange}
                formData={identifyData}
                placeholder="Select Date of Birth"
                required={true}
              />

              {/* Birth City Field */}
              <RegisterFormTextInput
                type='text'
                label="City of Birth"
                Icon={MapPinned}
                field="birthCity"
                handleInputChange={handleIdentifyChange}
                formData={identifyData}
                placeholder="Enter your birth city"
                required={true}
              />

              {/* Verify Button */}
              <PrimaryButton
                isLoading={isIdentifying}
                loadingText="Verifying..."
                buttonText="Verify Identity" 
              />

              {/* Back to Login */}
              <div className="text-center text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: Reset Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* New Password Field */}
              <RegisterFormTextInput
                type={showPassword ? "text" : "password"}
                label="New Password"
                Icon={Lock}
                field="newPassword"
                handleInputChange={handleResetChange}
                formData={resetData}
                required={true}
                placeholder="Enter password"
                showPasswordToggle={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                passwordStrengthMeter={
                  resetData.newPassword && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{getStrengthText()}</span>
                      </div>
                    </div>
                  )
                }
              />


              {/* Confirm Password Field */}
              <RegisterFormTextInput
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                Icon={Lock}
                field="confirmPassword"
                handleInputChange={handleResetChange}
                formData={resetData}
                required={true}
                placeholder="Confirm password"
                showPasswordToggle={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />

              {/* Reset Button */}
              <PrimaryButton
                isLoading={isResetting}
                loadingText="Resetting Password..."
                buttonText="Reset Password" 
              />

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBackToIdentify}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/50 text-gray-700 font-medium rounded-xl hover:bg-white/70 border border-gray-200/50 shadow-sm hover:shadow transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Verification</span>
              </button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">Your password has been updated successfully. You can now log in with your new password.</p>
              <Link to="/login">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Go to Login
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Text */}
        {step !== 3 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Need help? Contact our support team
          </p>
        )}

        <BufferLength />
      </div>
    </div>
  );
};

export default ResetPassword;