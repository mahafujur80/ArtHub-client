import Hero from '@/Components/HomePage/Hero';
import TopArtists from '@/Components/HomePage/TopArtist';
import React from 'react';
import FeatureCard from './feature-card/page';
import AllCategoryPage from './ArtWork-category/page';

const MainPage = () => {
  return (
    <div className='min-h-screen  py-5'>
      <Hero/>
      <FeatureCard/>
      <AllCategoryPage/>
      <TopArtists/>
    </div>
  );
};

export default MainPage;