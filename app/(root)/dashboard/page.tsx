"use client"

import { useState, useEffect } from "react"
import axios from "axios"

// Define the user type
interface User {
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  // Add other user properties as needed
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/fetchUser");
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-28 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="p-8">
          <div className="flex items-center gap-4">
            {user?.avatar ? (
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              {user?.username && (
                <p className="text-sm text-gray-500">@{user.username}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
