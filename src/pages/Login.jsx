import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/slices/api/authApi';
import toast from 'react-hot-toast';
import { Loader2, LogIn, User, Lock, Eye, EyeOff, TrendingUp } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  
  const username = useRef();
  const password = useRef();
  const rememberMe = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");

    if (savedUsername && username.current) {
      username.current.value = savedUsername;
      rememberMe.current.checked = true;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const toRemember = rememberMe.current.checked;

    const credentials = {
      username: username.current.value,
      password: password.current.value
    };

    try {
      const result = await login(credentials).unwrap();

      if (result.success) {
        if (toRemember) {
          localStorage.setItem("rememberedUsername", credentials.username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }

        navigate('/user/dashboard');
        toast.success('Logged in successfully!');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to login: ${err.data?.message || 'Login failed'}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your expenses</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  ref={username}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={password}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                ref={rememberMe}
                id="rememberMe"
                className="w-4 h-4 text-blue-600 bg-white/50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-3">
                <p className="text-sm text-red-700">
                  {error?.data?.message || error?.message || 'Login failed'}
                </p>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="bg-green-50/80 border border-green-200/50 rounded-xl p-3">
                <p className="text-sm text-green-700">Login successful!</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
              Forgot password?
            </a>
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to={'/register'} href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;