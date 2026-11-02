'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, UserCircle, LogOut, LogIn, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Load saved theme
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
      toast.success("Light mode activated");
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
      toast.success("Dark mode activated");
    }
  };

  // Get session
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Logout function
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      localStorage.removeItem('access_token');
      setIsProfileDropdownOpen(false);
      toast.success("Logged out successfully!");
      router.push('/login');
      router.refresh(); 
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
             SocialEvents
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Upcoming Events
            </Link>

            {/* Dark & Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? (
                <Sun size={20} className="text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon size={20} className="text-blue-600 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Profile & Login / Logout Conditional UI */}
            {!user ? (
              <Link href="/login" className="flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors text-sm shadow-sm">
                <LogIn size={18} /> Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {/* Profile Icon with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                    title={user.name}
                  >
                    {user.image ? (
                      <img referrerPolicy='no-referrer' src={user.image} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-700 object-cover shadow-sm" />
                    ) : (
                      <UserCircle size={38} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors" />
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link href="/create-event" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">Create Event</Link>
                      <Link href="/manage-events" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">Manage Events</Link>
                      <Link href="/joined-events" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">Joined Events</Link>
                    </div>
                  )}
                </div>

                {/* Direct Logout Button next to profile icon */}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 px-4 py-2 rounded-xl font-bold transition-colors text-sm border border-red-100 dark:border-red-900/50"
                  title="Logout"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-blue-600" />}
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">Upcoming Events</Link>
          {!user ? (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white text-center rounded-xl font-bold mt-4">
              <LogIn size={18} /> Login
            </Link>
          ) : (
            <>
              <div className="px-3 py-2 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <Link href="/create-event" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Create Event</Link>
              <Link href="/manage-events" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Manage Events</Link>
              <Link href="/joined-events" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Joined Events</Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 mt-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl font-bold"
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
