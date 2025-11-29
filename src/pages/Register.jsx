import React, { useState } from 'react';
import { Loader2, UserPlus, User, Lock, Mail, Phone, MapPin, Briefcase, Eye, EyeOff, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BufferLength from '../layouts/BufferLength';
import RegisterFormTextInput from '../components/ui/Forms/RegisterForm/RegisterFormTextInput';
import { useRegisterMutation } from '../redux/slices/api/authApi';
import toast from 'react-hot-toast';

const Register = () => {
  const [register, { isLoading, isError, error, isSuccess }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    location: '',
    occupation: '',
    gender: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
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

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      if (formData.email && formData.username && formData.password && formData.firstName && formData.lastName && formData.gender) {
        const result = await register(formData).unwrap();

        if (result.success) {
          toast.success('Registered successfully! Please login.');
        }
      }
      else {
        toast.error('Please fill in all required fields');
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to register new user: ${err.data?.message || 'Login failed'}`);
    }
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 flex items-center justify-center p-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-4xl max-h-screen xl:max-h-none overflow-y-auto">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us to start managing your expenses</p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
              <Link to={'/login'}>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Back to Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RegisterFormTextInput
                  label="First Name"
                  Icon={User}
                  field="firstName"
                  handleInputChange={handleChange}
                  formData={formData}
                  required={true}
                  placeholder="Sagnik"
                />

                <RegisterFormTextInput
                  label="Last Name"
                  Icon={User}
                  field="lastName"
                  handleInputChange={handleChange}
                  formData={formData}
                  required={true}
                  placeholder="Das"
                />
              </div>

              {/* Email and Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RegisterFormTextInput
                  type='email'
                  label="Email"
                  Icon={Mail}
                  field="email"
                  handleInputChange={handleChange}
                  formData={formData}
                  required={true}
                  placeholder="sagnik.das@email.com"
                />

                <RegisterFormTextInput
                  label="Username"
                  Icon={User}
                  field="username"
                  handleInputChange={handleChange}
                  formData={formData}
                  required={true}
                  placeholder="sagnik.das"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <RegisterFormTextInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  Icon={Lock}
                  field="password"
                  handleInputChange={handleChange}
                  formData={formData}
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
                    formData.password && (
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

                <RegisterFormTextInput
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  Icon={Lock}
                  field="confirmPassword"
                  handleInputChange={handleChange}
                  formData={formData}
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
              </div>

              {/* Mobile and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RegisterFormTextInput
                  type="tel"
                  label="Mobile Number"
                  Icon={Phone}
                  field="mobileNumber"
                  handleInputChange={handleChange}
                  formData={formData}
                  placeholder="1234567890"
                />

                <RegisterFormTextInput
                  type='text'
                  label="Location"
                  Icon={MapPin}
                  field="location"
                  handleInputChange={handleChange}
                  formData={formData}
                  placeholder="Pune"
                  required={false}
                />
              </div>

              {/* Occupation and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RegisterFormTextInput
                  type='text'
                  label="Occupation"
                  Icon={Briefcase}
                  field="occupation"
                  handleInputChange={handleChange}
                  formData={formData}
                  placeholder="Software Engineer"
                  required={false}
                />


                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Error Message */}
              {isError && error && (
                <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-3">
                  <p className="text-sm text-red-700">
                    {error?.data?.message || error?.message || 'Registration failed. Please try again.'}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleRegister}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Footer Links */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to={'/login'} className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>

        <BufferLength />
      </div>
    </div>
  );
};

export default Register;