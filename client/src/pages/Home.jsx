import React from "react";
import Hero from "../components/Hero";
import FeatureDestination from "../components/featureDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureDestination />
      <ExclusiveOffers />
      <Testimonial />
    </>
  );
};

export default Home;
