import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, User, CheckSquare } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'isAdmin') {
      setIsAdmin(checked);
    }
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userData = {
        username,
        email,
        password,
        is_admin: isAdmin
      };

      const response = await fetch('https://intervu-1-0.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the JWT token if provided in the response
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Start animation
      setIsAnimating(true);
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-black flex items-stretch m-0 p-0 overflow-hidden">
      <div className="w-full flex relative">
        {/* Purple diagonal overlay */}
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-700 transform ${isAnimating
              ? 'w-full skew-x-0 translate-x-0 transition-all duration-1000 ease-in-out'
              : 'w-1/2 skew-x-12 -translate-x-20'
            }`}
        />

        {/* Left side - Welcome message */}
        <div
          className={`w-1/2 flex pr-12 items-center justify-center z-10 transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div className="text-white text-center">
            <h2
              className="text-6xl font-bold mb-6 transform translate-y-0 opacity-100 transition-all duration-800 delay-200"
            >
              JOIN US TODAY!
            </h2>
            <p
              className="text-gray-300 text-xl transform translate-y-0 opacity-100 transition-all duration-800 delay-400"
            >
              Create an account and start your journey with us.
            </p>
          </div>
        </div>

        {/* Right side - Sign Up form */}
        <div
          className={`w-1/2 z-10 flex items-center justify-center px-20 transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div className="w-full max-w-md">
            <h2 className="text-5xl font-bold mb-12 text-white">Sign Up</h2>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-center gap-3 text-red-500">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className="w-full bg-gray-800 bg-opacity-40 rounded-lg border border-gray-600 text-white px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-lg"
                  placeholder="Username"
                  required
                  disabled={isLoading}
                />
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 bg-opacity-40 rounded-lg border border-gray-600 text-white px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-lg"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 bg-opacity-40 rounded-lg border border-gray-600 text-white px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-lg"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-800 bg-opacity-40 rounded-lg border border-gray-600 text-white px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 text-lg"
                  placeholder="Confirm Password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-800 bg-opacity-40"
                />
                <label htmlFor="isAdmin" className="text-gray-300">
                  Register as Admin
                </label>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 mt-8 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                  }`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-gray-400 text-center text-lg mt-6">
                Already have an account?{' '}
                <Link to='/login' className="text-purple-500 hover:text-purple-400 transition-colors">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
