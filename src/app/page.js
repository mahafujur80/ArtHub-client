import Hero from '@/Components/HomePage/Hero';
import TopArtists from '@/Components/HomePage/TopArtist';
import React from 'react';
import FeatureCard from './feature-card/page';
import AllCategoryPage from './ArtWork-category/page';
import WhyChooseUs from '@/Components/HomePage/WhyChooseUs';
import HowItWorks from '@/Components/HomePage/HowItWorks';
import FAQ from '@/Components/HomePage/FAQ';
import Testimonial from '@/Components/HomePage/Testimonial';
import CallToAction from '@/Components/HomePage/CallToAction';

const MainPage = () => {
  return (
    <div className='min-h-screen py-5 bg-white'>
      <Hero/>
      <HowItWorks/>
      <FeatureCard/>
      <AllCategoryPage/>
      <TopArtists/>
      <WhyChooseUs/>
      <Testimonial/>
      <CallToAction/>
      <FAQ/>
    </div>
  );
};

export default MainPage;