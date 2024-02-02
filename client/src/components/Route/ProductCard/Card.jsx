import React from 'react'
import { useState,useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"
import { addToCart } from '../../../redux/actions/cart';
import { addToWishlist } from '../../../redux/actions/wishlist';
import { removeFromWishlist } from '../../../redux/actions/wishlist';
import Rating from '../../Products/Rating';


const Card = ({ data }) => {
    const [click, setClick] = useState(true)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    const { wishlist } = useSelector((state) => state.wishlist)

    // console.log(cart)

    // useEffect(() => {
    //     if (wishlist && wishlist.find((i) => i._id === data._id)) {
    //       setClick(true);
    //     } else {
    //       setClick(false);
    //     }
    //   }, [wishlist]);
    

    const addtoWishlist = (data) => {
        console.log(data)
        setClick(!click)
        dispatch(addToWishlist(data))
        toast.success("Item added to wishlist")
        
    }
    const removefromWishlist = (data) => {
        console.log(data)
        setClick(!click)
        dispatch(removeFromWishlist(data))
        // dispatch(removeFromWishlist({ data }));
        toast.success("Item removed from wishlist")
    }
    //cart details stored in local storage
    const addtoCartHandler = (id) => {
        console.log(id)
        const isItemExist = cart && cart.find((i) => i._id === id)

        if (isItemExist) {
            toast.error("Item already in the cart")
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addToCart(cartData));
                console.log(cartData)
                toast.success("Item added to cart successfully!");
            }
        }

    }

    // const addtoWishlist = (id) => {
    //     console.log(id)
    //     const isItemExist = wishlist && wishlist.find((i) => i._id === id)

    //     if (isItemExist) {
    //         toast.error("Item already in the wishlist")
    //     } else {
            
            
    //             const wishlistData = { ...data };
    //             dispatch(addToWishlist(wishlistData));
    //             console.log(wishlistData)
    //             toast.success("Item added to wishlist successfully!");
    //             setClick(!click)

            
    //     }

    // }
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
                <div class="px-6 py-4">
                    <Rating rating={data?.rating}/>
                </div>
            <div class="px-6 pt-4 pb-2 ">
                {click ?
                    (<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                        <AiOutlineHeart title="Remove from wishlist" onClick={() => addtoWishlist(data)} />
                    </span>)
                    : (<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                        <AiFillHeart title="Add to wishlist" onClick={() => removefromWishlist(data)} />
                    </span>)}
                {/*<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer "><AiFillStar /></span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineStar /></span>*/}
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineEye title="Quick View" onClick={() => setOpen(!open)} /></span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><AiOutlineShoppingCart title="Add to cart" onClick={() => addtoCartHandler(data._id)} /></span>
            </div>
            {open ? <ProductCardDetails setOpen={setOpen} data={data} /> : null}
        </div >
    )
}

export default Card
