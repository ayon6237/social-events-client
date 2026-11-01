'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { CalendarDays, MapPin, Loader2, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function JoinedEvents() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Private Route & Data Fetching
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view your joined events!");
      router.push('/login');
      return;
    }

    if (session?.user?.email) {
      fetchJoinedEvents();
    }
  }, [session, isPending, router]);

 const fetchJoinedEvents = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:5000/joined-events/${session.user.email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch joined events");
      
      const data = await res.json();
      
      // ✅ এখানে সর্টিং করা হচ্ছে: যেটি আগে জয়েন করা হয়েছে (Oldest/First joined), সেটি সবার আগে দেখাবে
      const sortedJoinedEvents = data.sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));
      
      setJoinedEvents(sortedJoinedEvents);
    } catch (error) {
      toast.error("Could not load your joined events.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isPending || isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading your volunteer schedule...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-semibold mb-4 border border-green-100">
              <HeartHandshake size={16} /> Volunteer Dashboard
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Joined Initiatives</h1>
            <p className="mt-2 text-gray-500">Events you have committed to volunteer for.</p>
          </div>
          <Link href="/events" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm">
             Explore More Events <ArrowRight size={18} />
          </Link>
        </div>

        {/* Events Grid */}
        {joinedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((item) => {
              // ব্যাকএন্ডের populate("eventId") এর কারণে আসল ইভেন্ট ডেটা eventId এর ভেতর থাকবে
              const event = item.eventId; 
              if (!event) return null; // ইভেন্ট যদি ডিলিট হয়ে গিয়ে থাকে তবে এটি স্কিপ করবে

              return (
                <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative group">
                  
                  {/* Joined Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                    <CheckCircle2 size={14} /> Joined
                  </div>

                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
                      <CalendarDays size={16} />
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 w-fit mb-3">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 font-medium">
                      <MapPin size={16} className="text-blue-500" />
                      {event.location}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-medium">
                        Joined on: {new Date(item.joinedAt).toLocaleDateString()}
                      </div>
                      <Link 
                        href={`/events/${event._id}`}
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600 mb-6">
              <HeartHandshake size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No joined events yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't volunteered for any community drives yet. Explore upcoming events and make an impact today!
            </p>
            <Link 
              href="/events" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-sm"
            >
              Explore Events <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}