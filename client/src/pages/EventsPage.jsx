import React from "react";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import styles from "../styles/styles"
// import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  return (
    <>
      <Header activeHeading={4} />

      <div className={`${styles.normalFlex} font-bold text-yellow-500 text-4xl mt-28 pl-5`} >
        Popular Events
      </ div>

      <div className="mt-2 flex p-5">
        <EventCard active={true} />
      </div>
    </>
  );
};

export default EventsPage;