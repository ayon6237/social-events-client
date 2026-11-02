'use client';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';

const Subscription = () => {
    return (
        <div>
            {/* Community Alerts & Newsletter Subscription Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 p-8 sm:p-12 md:p-16 shadow-xl border border-blue-800/50 dark:border-gray-800 text-center text-white">
      
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        
        <div className="inline-flex items-center gap-2 bg-blue-700/40 dark:bg-blue-900/60 text-blue-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 border border-blue-600/40 backdrop-blur-sm">
          <Sparkles size={16} /> Stay Connected
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Never Miss a Local Initiative
        </h2>

        <p className="text-blue-100/80 dark:text-gray-300 text-base sm:text-lg mb-10 font-medium leading-relaxed">
          Get instant alerts when new volunteer drives, donation camps, or community cleanup events are launched in your area.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed to community alerts successfully! 🎉"); e.target.reset(); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            required 
            placeholder="Enter your email address..." 
            className="flex-grow px-5 py-4 rounded-xl bg-white/10 dark:bg-gray-800 border border-white/20 dark:border-gray-700 text-white placeholder-blue-200/60 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium backdrop-blur-sm transition-all"
          />
          <button 
            type="submit" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 shrink-0 text-sm"
          >
            Get Alerts <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-xs text-blue-200/60 dark:text-gray-400 mt-5 font-medium">
          We respect your privacy. Unsubscribe at any time with a single click.
        </p>

      </div>
    </div>
  </div>
</section>
        </div>
    );
};

export default Subscription;