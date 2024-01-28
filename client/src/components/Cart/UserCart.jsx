import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData } from '../../static/data';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { toast } from 'react-toastify';


const UserCart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))
  }

    const totalPrice = cart.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );  
  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data))
  }





  return (
    <div className="fixed top-0 left-0 w-full  bg-[#0000004b] h-screen z-10">
      <div className=" fixed top-0 left-0 w-[80%] 800px:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className='flex justify-center text-6xl mt-5 font-Poppins font-bold italic underline text-blue-800 decoration-solid'>
          <h3>My cart </h3>
        </div>
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5  fixed top-3 right-3  ">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`flex p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              <br />
              <div className="w-full border-t">
                {cart && cart.map((i, id) =>
                (
                  <CartSingleCard totalPrice={totalPrice} key={id} data={i} removeFromCartHandler={removeFromCartHandler} 
                  quantityChangeHandler={quantityChangeHandler} />
                ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )
        }
      </div>
    </div >
  )
}

const CartSingleCard = ({ data, removeFromCartHandler, quantityChangeHandler }) => {
  
  const [value, setValue] = useState(data.qty)

  const totalPrice = data.discountPrice * value

  const incrementHandler = (data) => {
    if (data.stock < value) {
      toast.error("No adequate stocks available")

    } else {
      setValue((prevValue) => prevValue + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
      toast.success("Item added successfully")
    }
  }

  const decrementHandler = (data) => {
    setValue((prevValue) => value === 1 ? 1 : prevValue - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
    toast.success("Item removed successfully")


  }
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] mb-5 ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => incrementHandler(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>


          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrementHandler(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        {<img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
           />
        }
        <div className="pl-[15px]">
          <b className='text-[17px]'>{data?.productName}</b>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            { `${data?.discountPrice} * ${value}`}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
          <span className="pl-[10px]">Stock:{data?.stock}</span>
        </div>
        <RxCross1
          color='#d02222'
          className="cursor-pointer ml-5"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  )

}

export default UserCart




