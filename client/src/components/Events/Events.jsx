import React, { useEffect } from 'react'
import styles from "../../styles/styles";
import EventCard from "../Events/EventCard"
import { useSelector } from 'react-redux';


const Events = () => {
  const {allEvent} = useSelector((state)=>state.event)
  console.log(allEvent)

  
    return (
        <div>
        <div className={`${styles.section} hidden sm:block`}>
        <div className={`${styles.normalFlex} text-orange-500 text-4xl`} >
          Events
        </ div>
            <div
              className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
            >
                <EventCard data={allEvent && allEvent[0]}/>            
            </div>
          </div>
        </div>
    )
}
export default Events
