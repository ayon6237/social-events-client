import Link from 'next/link';
import { Users, CalendarDays, Globe, HeartHandshake, ArrowRight, PlusCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden z-10">
        
        {/* Background Subtle Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-gray-950 dark:to-gray-950 -z-10"></div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Unique Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-blue-200 dark:border-blue-900">
            <HeartHandshake size={18} />
            Connecting People, Creating Impact
          </div>

          {/* Unique Headline with text-gradient */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-[1.1] mb-6">
            Stand United. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Uplift Your Society.
            </span>
          </h1>

          {/* Unique Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
            Join a growing network of changemakers. Whether it is distributing winter supplies, organizing blood donation camps, or planting trees, every small step makes a huge difference.
          </p>

          {/* Unique Buttons */}
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
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-blue-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
              <Users className="text-blue-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">10k+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Volunteers</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-indigo-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
              <CalendarDays className="text-indigo-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">500+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Drives</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-purple-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
              <Globe className="text-purple-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">50+</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Cities</span>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border-t-4 border-t-pink-500 border-x border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
              <HeartHandshake className="text-pink-500 mb-3" size={28} />
              <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-1">100%</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Non-Profit</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}