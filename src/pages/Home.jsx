import React from 'react';
import Landing from '../components/Landing';
import Explore from '../components/Explore';
import Loader from "../components/Loader";

const Home = () => {
  return (
    <>
    <Landing />
    <Explore />
    <Loader />
    </>
  );
}

export default Home;

