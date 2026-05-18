import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Products from '../components/Products';
import PromoSection from '../components/PromoSection';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs /> 
      <Products />  
      <PromoSection />
      <PromoBanner /> 
      <Footer />  
    </>
  )
}

export default Home
