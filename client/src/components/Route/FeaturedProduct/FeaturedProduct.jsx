import React, { useState, useEffect } from 'react'
import styles from "../../../styles/styles";
import Card from "../ProductCard/Card"
import { productData } from '../../../static/data'
import { useSelector } from 'react-redux';



const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product)

  const [data, setData] = useState([])

  useEffect(() => {
    setData(allProducts)
  },[])
  console.log(data)


  return (
    <div>
      <div className={`${styles.section} hidden sm:block`}>
        <div className={`${styles.normalFlex} text-orange-500 text-4xl`} >
          Featured Product
        </ div>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >

          < div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]" >
            {data && data.map((i, index) =>
            (
              <Card key={index} data={i} />

            )
            )}
          </div >
        </div>
      </div>
    </div>
  )
}
export default FeaturedProduct
