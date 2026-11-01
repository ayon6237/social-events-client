'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client'; // BetterAuth Client

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();

  // BetterAuth থেকে রিয়েল-টাইম ইউজার সেশন নেওয়া হচ্ছে
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // লগআউট ফাংশন
  const handleLogout = async () => {
    try {
      // ১. BetterAuth থেকে লগআউট
      await authClient.signOut();
      
      // ২. লোকাল স্টোরেজ থেকে Express JWT টোকেন মুছে ফেলা
      localStorage.removeItem('access_token');
      
      // ৩. ড্রপডাউন বন্ধ করা এবং টোস্ট দেখানো
      setIsProfileDropdownOpen(false);
      toast.success("Logged out successfully!");
      
      // ৪. লগইন পেজে পাঠিয়ে দেওয়া
      router.push('/login');
      router.refresh(); 
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
             SocialEvents
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Upcoming Events
            </Link>

            {/* User Login/Logout UI */}
            {!user ? (
              <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Login
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                  title={user.name}
                >
                  {user.image ? (
                    <img referrerPolicy='no-referrer' src={user.image} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover" />
                  ) : (
                    <UserCircle size={36} className="text-gray-500 hover:text-blue-600 transition-colors" />
                  )}
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/create-event" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Create Event</Link>
                    <Link href="/manage-events" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Manage Events</Link>
                    <Link href="/joined-events" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Joined Events</Link>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link href="/events" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors">Upcoming Events</Link>
          {!user ? (
            <Link href="/login" className="block px-3 py-2 bg-blue-600 text-white text-center rounded-md mt-4 hover:bg-blue-700 transition-colors">Login</Link>
          ) : (
            <>
              <div className="px-3 py-2 mb-2 bg-gray-50 rounded-md">
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
              </div>
              <Link href="/create-event" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Create Event</Link>
              <Link href="/manage-events" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Manage Events</Link>
              <Link href="/joined-events" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Joined Events</Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}