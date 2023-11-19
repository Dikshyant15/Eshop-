import React from 'react'
import { useState } from 'react';
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import ProductCardDetails from '../ProductCardDetail/ProductCardDetails';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)

    const addtoWishlist = () => {
        setClick(!click)
    }
    const removefromWishlist = () => {
        setClick(!click)
    }
    console.log(click)
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg border-orange-500 border-2 mt-20">
            <img src={data.images && data.images[0]?.url} className="w-full h-[170px] object-contain" />
            <div class="px-6 py-4">
                <Link to={`/product/${data?._id}`}>
                    <h3 class="font-bold text-xl mb-2 cursor-pointer"> {data.productName}</h3>
                </Link>
                <p class="text-gray-700 text-base">
                    {data.description}
                </p>
                <p class="text-gray-700 text-base">
                    Category: {data.category}
                </p>
                <p class="text-gray-700 text-base">
                    Orginal Price: ${data.originalPrice}
                </p>
                <p class="text-gray-700 text-base">
                    Discount Price: ${data.discountPrice}
                </p>
                <p class="text-gray-700 text-base">
                    Sold Out: {data.sold_out}
                </p>
            </div>

            <div class="px-6 pt-4 pb-2 ">
                {click ? (<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineHeart title="Remove from wishlist" onClick={() => addtoWishlist()} /></span>)
                    : (<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiFillHeart title="Add to wishlist" onClick={() => removefromWishlist()} /></span>)}
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer "><AiFillStar /></span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineStar /></span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineEye title="Quick View" onClick={() => setOpen(!open)} /></span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineShoppingCart title="Add to cart" /></span>
            </div>
            {open ? <ProductCardDetails setOpen={setOpen} data={data} /> : null}
        </div >
    )
}

export default Card
