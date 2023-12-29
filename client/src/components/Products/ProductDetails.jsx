import React, { useState } from 'react'
import ProductCardDetails from '../Route/ProductCardDetail/ProductCardDetails'
import styles from '../../styles/styles'
import { toast } from 'react-toastify'
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/actions/cart";


//comment section and wishlist checker on page load left

{/*<ProductCardDetails data={data} />*/ }

const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0)
  const [click, setClick] = useState(false)
  const [count, setCount] = useState(1)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const addtoWishlistHandler = (data) => {
    console.log(data)
    setClick(!click)
    dispatch(addToWishlist(data))
    toast.success("Item added to wishlist")
  }

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
    toast.success("Item removed from wishlist")
  }

  const addtoCartHandler = (id) => {
    console.log(id)
    const isItemExist = cart && cart.find((i) => i._id === id)
    if (isItemExist) {
      toast.error("Item already exists")
    } else {
      if (data.stock < 1) {
        toast.error("Item out of stock")
      } else {
        const cartData = { ...data, qty: count }
        dispatch(addToCart(cartData));
        console.log(cartData)
        toast.success("Item added to cart successfully!");
      }
    }
  }


  const incrementCount = () => {
    setCount(count + 1)
  }
  const decrementCount = () => {
    setCount(count - 1)
    if (count === 0) {
      setCount(1)
      toast.error("Item count invalid")
    }
  }

  return (
    <div className="bg-white mt-28" >
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${select === 0 ? "border" : "null"
                          } cursor-pointer`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                        // onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.productName}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className=" inline-flex gap-6">
                  <div
                    className={`${styles.button} bg-[#000]  rounded-[4px] h-11`}
                  //onClick={handleMessageSubmit} 
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>

                  <div
                    className={`${styles.button}  rounded-[4px] h-11 flex items-center`}
                    onClick={() => addtoCartHandler(data?._id)}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>


                  <div className='mr-12'>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        color="red"
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addtoWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ProductDetails