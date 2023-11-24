import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData } from '../../static/data';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/wishlist';




const UserWishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data))
  }

  return (
    <div className="fixed top-0 right-0 w-full  bg-[#0000004b] h-screen z-10">
      <div className=" fixed top-0 right-0 w-[80%] 800px:w-[35%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className='flex justify-center text-6xl mt-5 font-Poppins font-bold italic underline text-blue-800 decoration-solid'>
          <h3>My Wishlist </h3>
        </div>
        {wishlist && wishlist.length === 0 ?
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
          :
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            {/* Item length */}
            <div className={`flex p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {wishlist && wishlist.map((i, id) =>
            (
              <CartSingleCard key={id} data={i} removeFromWishlistHandler={removeFromWishlistHandler} />
            )
            )}
          </div>
        }
      </div>
    </div>
  )
}

const CartSingleCard = ({ data, removeFromWishlistHandler }) => {
  const [value, setValue] = useState(1)
  const totalPrice = data.discountPrice * value;


  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          {/*<div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] mb-5 ${styles.noramlFlex} justify-center cursor-pointer`}
          >
            <HiPlus size={18} color="#fff" />
          </div>*/}


          {/*<div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
          //onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>*/}
        </div>
        {/*<img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />*/}
        <div className="pl-[15px]">
        <b className='text-[17px]'>{data?.productName}</b>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {/* ${data?.discountPrice} * {value}*/}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            {/* US${totalPrice}*/}
          </h4>
          <span className="pl-[10px]"><b>Stock:</b>{data?.stock}</span>
          <span className="pl-[10px]"><b>Price:</b>: ${totalPrice}</span>

        </div>
        <RxCross1
          className="cursor-pointer ml-16"
          color="red"
          onClick={() => removeFromWishlistHandler(data)}
        />
      </div>
    </div>
  )

}

export default UserWishlist