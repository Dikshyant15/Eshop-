import React from 'react'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from '../styles/styles'
import Card from "../components/Route/ProductCard/Card"


const Products = () => {
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            <Card/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Products
