import React from 'react'
import styles from "../../styles/styles";
import {Link} from "react-router-dom"
import { productData } from '../../static/data'
import { useSelector } from 'react-redux';

const EventCard = () => {
  
    return (
        <div
            className={`w-full block bg-white rounded-lg lg:flex p-2`}
        >
            <div className="w-full lg:-w[50%] m-auto">
                {/*<img src={`${productData[0].images[0]?.url}`} alt="" />*/}
            </div>
            <div className="w-full lg:[w-50%] flex flex-col justify-center">
                <h2 className={`${styles.productTitle} mb-5`}>{productData[0].name}</h2>
                <p >{productData[0].description}</p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                            {productData[0].originalPrice}$
                        </h5>
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                            {productData[0].discountPrice}$
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                        {productData[0].sold_out} sold
                    </span>
                </div>
                {/*<CountDown productData[0]={productData[0]} />*/}
                <br />
                <div className="flex items-center">
                    <Link to={`/product/${productData[0]._id}?isEvent=true`}>
                        <div className={`${styles.button} text-[#fff]`}>See Details</div>
                    </Link>
                    {/*<div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(productData[0])}>Add to cart</div>*/}
                </div>
            </div>
        </div>
    );
}

export default EventCard