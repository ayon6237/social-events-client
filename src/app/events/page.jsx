'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, CalendarDays, Users, ArrowRight, PlusCircle, Sparkles } from 'lucide-react';

// Temporary Dummy Data (Later will be fetched from backend)
const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Winter Clothes Distribution",
    category: "Donation",
    date: "Sun, Nov 15, 2026",
    location: "Mirpur 10, Dhaka",
    description: "Collecting and distributing warm clothes, jackets, sweaters, and shawls to underprivileged families.",
    organizer: "Mirpur Youth Volunteers",
    // Notun chobi: Charity / Donation Box er unique ekti chobi
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Blanket Distribution for the Needy",
    category: "Winter Relief",
    date: "Fri, Nov 20, 2026",
    location: "Mohammadpur, Dhaka",
    description: "Night-time blanket distribution drive across pavement dwellers, orphanages, and senior citizens.",
    organizer: "Mohammadpur Care Circle",
    // Notun chobi: Gorib manusher pashe daranor ekti symbolic chobi
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Dhanmondi Lake Clean-Up Campaign",
    category: "Cleanup",
    date: "Wed, Nov 25, 2026",
    location: "Dhanmondi Lake, Dhaka",
    description: "Join us this Saturday morning with gloves, bags, and tools to clear plastic waste from walkways.",
    organizer: "Green Dhaka Youth",
    // Notun chobi: Nature cleanup er ekdom alada ekti environment
    image: "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const CATEGORIES = ["All", "Donation", "Cleanup", "Plantation", "Winter Relief", "Food Drive", "Health Camp", "Education"];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredEvents = DUMMY_EVENTS.filter(event => {
    const matchCategory = activeCategory === "All" || event.category === activeCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section (Unique Design) */}
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
          
          {/* Category Pills */}
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

          {/* Search Bar */}
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
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              
              {/* Card Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-700 shadow-sm">
                  {event.category}
                </div>
                
                {/* Date on Image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
                  <CalendarDays size={16} />
                  {event.date}
                </div>
              </div>

              {/* Card Body */}
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
                  {event.organizer}
                </div>

                <Link 
                  href={`/events/${event.id}`}
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
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your category or search query.</p>
          </div>
        )}

      </div>
    </div>
  );
}