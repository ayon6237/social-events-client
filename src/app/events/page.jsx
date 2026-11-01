'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, CalendarDays, Users, ArrowRight, PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ["All", "Donation", "Cleanup", "Plantation", "Winter Relief", "Food Drive", "Health Camp", "Education"];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Backend theke real data fetch kora hocche
// Backend theke real data fetch kora hocche
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events');
        if (!res.ok) throw new Error("Failed to fetch events");
        
        const data = await res.json();
        
        // নতুন তৈরি করা ইভেন্টগুলো প্রথমে দেখানোর জন্য createdAt অনুযায়ী সর্ট করা হচ্ছে
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setEvents(sortedData);
      } catch (error) {
        toast.error("Could not load upcoming events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  // Search ebong Category filter logic (Backend er 'type' field use kore)
  const filteredEvents = events.filter(event => {
    const matchCategory = activeCategory === "All" || event.type === activeCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading amazing initiatives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold mb-4 border border-blue-100">
              <Sparkles size={16} /> Upcoming Social Initiatives
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Explore Active Drives
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Discover verified volunteer initiatives scheduled for upcoming dates. Past events are automatically excluded so you can focus on active drives that need your support.
            </p>
          </div>
          
          <Link 
            href="/create-event" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-sm whitespace-nowrap"
          >
            <PlusCircle size={20} /> Create Event
          </Link>
        </div>

        {/* Filter and Search Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === category 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-colors text-sm font-medium"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              
              <div className="relative h-56 w-full overflow-hidden">
                {/* Database theke asha thumbnail image */}
                <img 
                  src={event.thumbnail} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-700 shadow-sm">
                  {event.type}
                </div>
                
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
                  <CalendarDays size={16} />
                  {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 font-medium">
                  <MapPin size={16} className="text-blue-500" />
                  {event.location}
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium pt-4 border-t border-gray-100">
                  <Users size={16} className="text-blue-500" />
                  Organized by: <span className="text-gray-900 font-bold">{event.creatorEmail.split('@')[0]}</span>
                </div>

                <Link 
                  href={`/events/${event._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white px-4 py-3 rounded-lg font-bold transition-colors text-sm"
                >
                  View Details <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 mt-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <Search className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">No active drives match your search or category.</p>
          </div>
        )}

      </div>
    </div>
  );
}