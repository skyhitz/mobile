import React from 'react';
import NavBar from './NavBar';
import BackgroundImage from './BackgroundImage';
import MainWrapper from './MainWrapper';
import LandingFooter from './Footer';

const Home = () => (
  <BackgroundImage>
    <NavBar />
    <MainWrapper />
    <LandingFooter />
  </BackgroundImage>
);

export default Home;
