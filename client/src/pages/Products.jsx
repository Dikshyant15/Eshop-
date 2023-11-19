import React, { useState, useEffect } from 'react'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from '../styles/styles'
import Card from "../components/Route/ProductCard/Card"
import { useSelector } from 'react-redux';



const Products = () => {
  const { allProducts } = useSelector((state) => state.product)
  const [data, setData] = useState([])


  useEffect(() => {
    setData(allProducts)
  },[allProducts])

  console.log(data)

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
          {data && data.map((i, index) => <Card data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Products
