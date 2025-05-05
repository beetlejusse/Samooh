"use client"

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        router.push('/dashboard'); 
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9f5fa]">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-2">
              <span className="text-white text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-[#c94bc7]">Samooh</h1>
          </Link>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in to your account</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94bc7] focus:border-transparent"
            />
          </div>
          
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-[#6b4ee6] hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              isLoading 
                ? 'bg-[#d98ad7] cursor-not-allowed' 
                : 'bg-[#c94bc7] hover:bg-[#b33fb1] transition-colors'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#f9f5fa] text-gray-500">
              Don't have an account?
            </span>
          </div>
        </div>
        
        <Link href="/sign-up" className="mt-6 block">
          <button className="w-full py-3 px-4 rounded-lg font-medium text-[#6b4ee6] border border-[#6b4ee6] hover:bg-[#6b4ee6]/10 transition-colors">
            Create an account
          </button>
        </Link>
      </div>
      
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
