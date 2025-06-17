import React from "react";
import Hero from "../components/Hero";
import FeatureDestination from "../components/featureDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
