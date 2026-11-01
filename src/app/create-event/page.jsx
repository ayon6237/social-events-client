'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { CalendarDays, MapPin, Image as ImageIcon, Type, AlignLeft, Send, Sparkles, FolderDot, AlertCircle, ArrowLeft } from 'lucide-react';

const CATEGORIES = ["Donation", "Cleanup", "Plantation", "Winter Relief", "Food Drive", "Health Camp", "Education"];

export default function CreateEvent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    date: '',
    location: '',
    image: '',
    description: ''
  });

  // Client-side date generation
  useEffect(() => {
    const currentDate = new Date();
    const formatted = currentDate.toISOString().split('T')[0];
    setTodayDate(formatted);
  }, []);

  // Private Route Protection
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to organize an event!");
      router.push('/login');
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (todayDate && formData.date < todayDate) {
        toast.error("Event date cannot be in the past!");
        return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error("Authentication error. Please login again.");
        return;
      }

      // 🚨 এখানে মূল পরিবর্তন করা হয়েছে: ব্যাকএন্ড স্কিমার সাথে নাম মেলানো হলো 🚨
      const eventData = {
        title: formData.title,
        description: formData.description,
        type: formData.category,        // category কে type বানানো হলো
        thumbnail: formData.image,      // image কে thumbnail বানানো হলো
        location: formData.location,
        date: formData.date,
        creatorEmail: session.user.email, 
        createdAt: new Date().toISOString()
      };

      const res = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(eventData)
      });

      if (!res.ok) {
        throw new Error("Failed to create event. Check backend server.");
      }

      toast.success("Event organized successfully!");
      router.push('/manage-events'); 
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="min-h-[80vh] flex items-center justify-center text-blue-600 font-bold">Checking credentials...</div>;
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Upcoming Events
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold mb-4 border border-blue-100">
            <Sparkles size={16} /> Be the Change
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Organize a New Initiative
          </h1>
          <p className="mt-2 text-gray-500">Fill in the details below to launch your community drive.</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" required className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-colors" placeholder="e.g., Winter Clothes Distribution" onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FolderDot className="h-5 w-5 text-gray-400" />
                  </div>
                  <select required className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    min={todayDate || undefined} 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white cursor-pointer"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-blue-600">
                  <AlertCircle size={14} />
                  <span>date must be in a future date (today or later)</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Location / Venue</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" required className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" placeholder="e.g., Mirpur 10, Dhaka" onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Image Banner URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="url" required className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" placeholder="https://images.unsplash.com/..." onChange={(e) => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Description</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <AlignLeft className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea required rows="4" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white resize-none" placeholder="Briefly describe what the event is about, who will benefit, and how volunteers can help..." onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button type="submit" disabled={loading} className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-md disabled:opacity-50 ml-auto">
                {loading ? "Publishing Event..." : (
                  <>Publish Event <Send size={18} /></>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}