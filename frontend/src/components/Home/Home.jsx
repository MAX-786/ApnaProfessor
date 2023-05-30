/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from './NavBar/NavBar'
import Hero from './Hero/Hero'
import CTA from './CTA/CTA'
import Footer from '../Footer/Footer'

const Home = () => {

  React.useEffect(() => {
    // Update the page title
    document.title = "KYPE | Know Your Professors Excusively";
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
      <CTA />
      <Footer />
    </>
  )
}

export default Home