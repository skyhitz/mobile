import React from 'react';
import NavBar from './NavBar';
import BackgroundImage from './BackgroundImage';
import MainWrapper from './MainWrapper';
// import Footer from 'app/components/footer/footer';

const Home = () => (
  <BackgroundImage>
    <NavBar />
    <MainWrapper />
    {/* <Footer /> */}
  </BackgroundImage>
);

export default Home;
