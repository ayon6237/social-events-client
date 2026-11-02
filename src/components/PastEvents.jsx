'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, CalendarDays, Globe, HeartHandshake, ArrowRight, PlusCircle, Sparkles, MapPin, Loader2, History, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

// 🚨 নতুন এবং আকর্ষণীয় ছবির লিংকযুক্ত প্রিমিয়াম ডামি পাস্ট ইভেন্টস
const DUMMY_PAST_EVENTS = [
  {
    _id: 'dummy_past_1',
    title: 'Winter Warmth Blanket Distribution',
    type: 'Winter Relief',
    date: '2025-12-20',
    location: 'Mirpur 10, Dhaka',
    thumbnail: 'https://images.unsplash.com/photo-1785835394980-8c395e26ebdb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    description: 'Successfully distributed over 500 thick blankets and warm winter clothing to underprivileged pavement dwellers and rickshaw pullers.',
    creatorEmail: 'mirpur.volunteers@social.org'
  },
  {
    _id: 'dummy_past_2',
    title: 'Urban Riverside Cleanup Drive',
    type: 'Cleanup',
    date: '2026-01-15',
    location: 'Hatirjheel Lake Area, Dhaka',
    thumbnail: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800',
    description: 'A community-led environmental campaign where 120+ active volunteers gathered to clear plastic waste and restore the lakeside walkway.',
    creatorEmail: 'green.earth@social.org'
  },
  {
    _id: 'dummy_past_3',
    title: 'Free Health & Eye Care Camp',
    type: 'Health Camp',
    date: '2026-02-10',
    location: 'Uttara Sector 7, Dhaka',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    description: 'Provided free medical check-ups, blood pressure screenings, and essential eye medications to over 300 elderly citizens.',
    creatorEmail: 'uttara.care@social.org'
  },
  {
    _id: 'dummy_past_4',
    title: 'Community Tree Plantation Campaign',
    type: 'Plantation',
    date: '2026-02-28',
    location: 'Dhanmondi Lake, Dhaka',
    thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    description: 'Planted over 400 saplings across the lake perimeter with student volunteers to boost urban greenery and oxygen levels.',
    creatorEmail: 'eco.society@social.org'
  },
  {
    _id: 'dummy_past_5',
    title: 'Emergency Flood Relief Food Packets',
    type: 'Food Drive',
    date: '2026-03-05',
    location: 'Sylhet Sadar, Sylhet',
    thumbnail: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80&w=800',
    description: 'Delivered dry food packets, safe drinking water, and emergency medical aid to flood-affected families in remote villages.',
    creatorEmail: 'relief.corps@social.org'
  },
  {
    _id: 'dummy_past_6',
    title: 'Youth Digital Literacy Workshop',
    type: 'Education',
    date: '2026-03-18',
    location: 'Agargaon, Dhaka',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    description: 'Conducted a basic computer and internet safety training session for underprivileged school children to bridge the digital divide.',
    creatorEmail: 'edu.future@social.org'
  }
];

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const res = await fetch('http://localhost:5000/events');
        if (!res.ok) throw new Error("Failed to fetch events");
        
        const data = await res.json();
        const today = new Date().toISOString().split('T')[0];
        
        // Upcoming events
        const upcoming = data.filter(event => new Date(event.date).toISOString().split('T')[0] >= today);
        const sortedUpcoming = upcoming.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentEvents(sortedUpcoming.slice(0, 6));

        // Past events from DB + Fallback to DUMMY_PAST_EVENTS
        const dbPast = data.filter(event => new Date(event.date).toISOString().split('T')[0] < today);
        const combinedPast = [...dbPast, ...DUMMY_PAST_EVENTS];
        const sortedPast = combinedPast.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setPastEvents(sortedPast.slice(0, 6));

      } catch (error) {
        setPastEvents(DUMMY_PAST_EVENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-gray-950 dark:to-gray-950 -z-10"></div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-blue-200 dark:border-blue-900">
            <HeartHandshake size={18} />
            Connecting People, Creating Impact
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-[1.1] mb-6">
            Stand United. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Uplift Your Society.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
            Join a growing network of changemakers. Whether it is distributing winter supplies, organizing blood donation camps, or planting trees, every small step makes a huge difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-24 w-full sm:w-auto">
            <Link 
              href="/events" 
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none text-lg"
            >
              Explore Upcoming Events <ArrowRight size={20} />
            </Link>
            
            <Link 
              href="/create-event" 
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-800 px-8 py-4 rounded-xl font-bold transition-all text-lg"
            >
              <PlusCircle size={20} className="text-blue-600 dark:text-blue-400" /> Create an Event
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-blue-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
              <Users className="text-blue-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">10k+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Volunteers</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-indigo-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
              <CalendarDays className="text-indigo-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">500+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Drives</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-purple-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
              <Globe className="text-purple-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">50+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Cities</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-pink-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
              <HeartHandshake className="text-pink-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">100%</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Non-Profit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-blue-100 dark:border-blue-900">
              <Sparkles size={16} /> Core Focus Areas
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
              What Kind of Drives We Support
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-medium">
              Empowering communities by organizing diverse social initiatives where volunteers can step up and create real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Donation & Winter Relief</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Collect and distribute essential clothing, blankets, and financial support for underprivileged families during harsh winters.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group">
              <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Cleanup & Plantation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Organize neighborhood cleanup drives and tree-plantation campaigns to build a greener, cleaner, and healthier environment.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group">
              <div className="w-14 h-14 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Food & Health Drives</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Coordinate community food distribution programs and free medical check-up health camps for vulnerable populations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Upcoming Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-semibold mb-3 border border-blue-100 dark:border-blue-900">
                <Sparkles size={16} /> Upcoming Initiatives
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Recent Upcoming Events</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">Latest 6 community drives scheduled in your city. Get involved today.</p>
            </div>
            
            <Link 
              href="/events" 
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm md:text-base"
            >
              View All Events <ArrowRight size={18} />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-blue-600">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p className="font-medium text-sm">Loading recent events...</p>
            </div>
          ) : recentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentEvents.map((event) => (
                <div key={event._id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                  
                  <div className="relative h-52 w-full overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-700 dark:text-blue-400 shadow-sm">
                      {event.type}
                    </div>
                    
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-sm font-medium">
                      <CalendarDays size={16} />
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      <MapPin size={16} className="text-blue-500" />
                      {event.location}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5 font-medium pt-4 border-t border-gray-100 dark:border-gray-800">
                      <Users size={16} className="text-blue-500" />
                      Organized by: <span className="font-bold">{event.creatorEmail.split('@')[0]}</span>
                    </div>

                    <Link 
                      href={event._id.startsWith('dummy') ? '#' : `/events/${event._id}`}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm"
                    >
                      View Event <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">No recent upcoming events found in the database.</p>
            </div>
          )}

        </div>
      </section>

      {/* Past Completed Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm font-semibold mb-3 border border-gray-300 dark:border-gray-700">
                <History size={16} /> Past Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Completed Community Drives</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-1">Look back at the impactful initiatives successfully organized by our volunteers.</p>
            </div>
          </div>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event._id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full opacity-90">
                  
                  <div className="relative h-52 w-full overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[25%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-gray-900/80 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-200 shadow-sm flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-400" /> Completed
                    </div>
                    
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-sm font-medium">
                      <CalendarDays size={16} />
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      <MapPin size={16} className="text-gray-400" />
                      {event.location}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2 leading-relaxed flex-grow">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      <Users size={16} className="text-gray-400" />
                      Organized by: <span className="font-bold">{event.creatorEmail.split('@')[0]}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">No past events found.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}