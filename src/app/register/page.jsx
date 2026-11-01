'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Link as LinkIcon, HeartHandshake, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '', email: '', photoURL: '', password: ''
  });

  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
      toast.error("Please meet all password requirements!");
      return;
    }

    setLoading(true);
    try {
      // ✅ BetterAuth-এর signUp-এ 'image' ফিল্ডের মাধ্যমে photoURL পাঠানো হচ্ছে
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL, // ইমেজ সেভ করার জন্য
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        setLoading(false);
        return;
      }

      // সেশন ক্লিয়ার করে লগইন পেজে পাঠানো
      await authClient.signOut();

      toast.success("Account created successfully! Please login now.");
      router.push('/login');

    } catch (err) {
      toast.error("Something went wrong during registration!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
            <HeartHandshake size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Join the Movement</h2>
          <p className="mt-2 text-sm text-gray-500">Create an account to start driving social change</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600" placeholder="Ayon Banerjee" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" required className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600" placeholder="name@example.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {/* Image / Profile Photo URL Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="url" className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600" placeholder="https://images.unsplash.com/..." onChange={(e) => setFormData({...formData, photoURL: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input type={showPassword ? "text" : "password"} required className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600" placeholder="••••••••" onChange={(e) => setFormData({...formData, password: e.target.value})} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="mt-3 space-y-1">
              <div className={`flex items-center text-xs ${hasUpperCase ? 'text-green-600' : 'text-gray-400'}`}>
                {hasUpperCase ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />} At least one uppercase letter
              </div>
              <div className={`flex items-center text-xs ${hasLowerCase ? 'text-green-600' : 'text-gray-400'}`}>
                {hasLowerCase ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />} At least one lowercase letter
              </div>
              <div className={`flex items-center text-xs ${hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                {hasMinLength ? <Check size={14} className="mr-1" /> : <X size={14} className="mr-1" />} Minimum 6 characters
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 mt-6">
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500">Login here</Link>
        </div>
      </div>
    </div>
  );
}