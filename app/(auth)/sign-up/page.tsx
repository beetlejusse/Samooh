"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (response.data.success) {
        router.push('/sign-in');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9f5fa]">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#c94bc7] flex items-center justify-center mr-2">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-[#c94bc7]">Samooh</h1>
          </Link>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create your account</h2>
        <p className="text-gray-500 mb-6">Join 2,500+ students already on Samooh</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center mt-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-[#c94bc7] focus:ring-[#c94bc7] border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="/terms" className="text-[#6b4ee6] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#6b4ee6] hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`w-full py-3 px-4 rounded-lg font-medium text-white mt-4 ${
              isLoading 
                ? 'bg-[#d98ad7] cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#c94bc7] to-[#6b4ee6] hover:opacity-90 transition-opacity'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#f9f5fa] text-gray-500">
              Already have an account?
            </span>
          </div>
        </div>
        
        <Link href="/sign-in" className="mt-6 block">
          <button className="w-full py-3 px-4 rounded-lg font-medium text-[#6b4ee6] border border-[#6b4ee6] hover:bg-[#6b4ee6]/10 transition-colors">
            Sign In
          </button>
        </Link>
      </div>
      
      {/* Image Section - Hidden on mobile, visible on larger screens */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#c94bc7] to-[#6b4ee6] items-center justify-center">
        <div className="text-white text-center max-w-lg px-8">
          <h2 className="text-4xl font-bold mb-4">Connect, Learn & Grow at College Events</h2>
          <p className="text-lg opacity-90">
            Find hackathons, workshops, tech talks, and more. Connect with like-minded students and boost your skills.
          </p>
        </div>
      </div>
    </div>
  );
}
