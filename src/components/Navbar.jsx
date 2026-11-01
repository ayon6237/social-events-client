'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, UserCircle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // ডামি ইউজার স্টেট (লগইন অবস্থা দেখতে null এর জায়গায় { displayName: "Emon", photoURL: "" } দিতে পারেন)
  const user = null; 

  return (
    <nav className="bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* App Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
             SocialEvents
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Upcoming Events
            </Link>

            {/* Authentication / Profile Dropdown */}
            {!user ? (
              <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Login
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                  title={user.displayName} // হোভার করলে নাম দেখাবে
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover" />
                  ) : (
                    <UserCircle size={36} className="text-gray-500 hover:text-blue-600 transition-colors" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-2">
                    <Link href="/create-event" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Create Event</Link>
                    <Link href="/manage-events" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Manage Events</Link>
                    <Link href="/joined-events" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">Joined Events</Link>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link href="/events" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors">Upcoming Events</Link>
          {!user ? (
            <Link href="/login" className="block px-3 py-2 bg-blue-600 text-white text-center rounded-md mt-4 hover:bg-blue-700 transition-colors">Login</Link>
          ) : (
            <>
              <Link href="/create-event" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Create Event</Link>
              <Link href="/manage-events" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Manage Events</Link>
              <Link href="/joined-events" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Joined Events</Link>
              <button className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}