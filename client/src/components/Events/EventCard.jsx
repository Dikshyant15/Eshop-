import React, { useEffect } from 'react'
import styles from "../../styles/styles";
import {Link, useParams} from "react-router-dom"
import { productData } from '../../static/data'
import { useDispatch, useSelector } from 'react-redux';

const EventCard = ({data}) => {
  
    return (
        <div
            className={`w-full block bg-white rounded-lg lg:flex p-2`}
        >
            <div className="w-full lg:-w[50%] m-auto">
                {/*<img src={`${productData[0].images[0]?.url}`} alt="" />*/}
            </div>
            <div className="w-full lg:[w-50%] flex flex-col justify-center">
                <h2 className={`${styles.productTitle} mb-5`}>{data?.eventName}</h2>
                <p >{data?.description}</p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                            {data?.originalPrice}$
                        </h5>
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                            {data?.discountPrice}$
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                        {data?.sold_out} sold
                    </span>
                </div>
                {/*<CountDown productData[0]={productData[0]} />*/}
                <br />
                <div className="flex items-center">
                    <Link to={`/product/${data?._id}?isEvent=true`}>
                        <div className={`${styles.button} text-[#fff]`}>See Details</div>
                    </Link>
                    {/*<div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(productData[0])}>Add to cart</div>*/}
                </div>
            </div>
        </div>
    );
}

export default EventCard