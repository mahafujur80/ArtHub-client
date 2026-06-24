import Hero from '@/Components/HomePage/Hero';
import TopArtists from '@/Components/HomePage/TopArtist';
import React from 'react';

const MainPage = () => {
  return (
    <div className='min-h-screen  py-5'>
      <Hero/>
      <TopArtists/>
    </div>
  );
};

export default MainPage;