import React from 'react';

import Hero from '@/components/Hero';
import PlatForm from '@/components/PlatForm';
import RecentEvents from '@/components/RecentEvents';
import PastEvents from '@/components/PastEvents';

const page = () => {
  return (
    <div>
      <Hero />
      <PlatForm />
      <RecentEvents />
      <PastEvents />
    </div>
  );
};

export default page;