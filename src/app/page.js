import React from 'react';

import Hero from '@/components/Hero';
import PlatForm from '@/components/PlatForm';
import RecentEvents from '@/components/RecentEvents';

const page = () => {
  return (
    <div>
      <Hero />
      <PlatForm />
      <RecentEvents />
    </div>
  );
};

export default page;