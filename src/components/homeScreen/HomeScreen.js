import React from 'react';
import Header from '../header/Header';
import Arrivals from '../arrivals/Arrivals';
import Footer from '../footer/Footer';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <main>
        <Arrivals />
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;
