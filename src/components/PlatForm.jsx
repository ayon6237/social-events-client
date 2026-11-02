import { Globe, HeartHandshake, Sparkles, Users } from 'lucide-react';
import React from 'react';

const PlatForm = () => {
    return (
        <div>
            {/* What We Do / Initiatives Categories Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Header */}
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

    {/* Initiative Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Card 1: Donation & Winter Relief */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group">
        <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <HeartHandshake size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Donation & Winter Relief</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Collect and distribute essential clothing, blankets, and financial support for underprivileged families during harsh winters.
        </p>
      </div>

      {/* Card 2: Environment & Cleanup */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group">
        <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Globe size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Cleanup & Plantation</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Organize neighborhood cleanup drives and tree-plantation campaigns to build a greener, cleaner, and healthier environment.
        </p>
      </div>

      {/* Card 3: Food Drive & Health Camps */}
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
        </div>
    );
};

export default PlatForm;