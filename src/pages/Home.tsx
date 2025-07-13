import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import WriterSpotlight from '../components/WriterSpotlight';
import CommunitySection from '../components/CommunitySection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <WriterSpotlight />
      <CommunitySection />
    </>
  );
};

export default Home;