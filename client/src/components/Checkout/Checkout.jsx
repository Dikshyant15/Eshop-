import React, { useState } from 'react'
import styles from "../../styles/styles";
import { useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { server } from "../../server";
import axios from 'axios';


const Checkout = () => {
  const { user } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");


  // console.log(userInfo)
  const subTotalPrice = cart.reduce((acc, currentItem) => {
    return acc + currentItem.discountPrice * currentItem.qty
  }, 0)


  const shipping =
    0.1 * subTotalPrice


  const handleSubmit = async (e) => {
    e.preventDefault()
    const couponName = couponCode
    await axios.get(`${server}/couponCode/get-coupon-code-name/${couponName}`).then((res) => {
      const shopId = res.data.couponCode?.shopId
      const couponCodeValue = res.data.couponCode?.value

      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);


        if (isCouponValid.length === 0) {
          toast.error("Invalid Coupon Code for the shop")
          setCouponCode("")
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );

          const discountPriceFromCoupon = eligiblePrice * couponCodeValue / 100
          setDiscountPrice(discountPriceFromCoupon);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }

    }
    )
  }
  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (address1 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please deliver the required information")
    }
    else {
      const shipingAddress = {
        address1, zipCode, country, city,
      }

      const shippingDetails = {
        shipingAddress,
        subTotalPrice,
        totalPrice,
        user,
        cart,
        discountPrice,
        shipping
      }

      localStorage.setItem("orderDetails", JSON.stringify(shippingDetails))
      navigate("/payment")
    }
  }


  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[55%]">
          <ShippingInfo user={user} userInfo={userInfo} setUserInfo={setUserInfo} country={country} setCountry={setCountry} city={city} setCity={setCity} zipCode={zipCode} setZipCode={setZipCode} couponCode={couponCode}
            couponCodeData={couponCodeData} discountPrice={discountPrice} address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2} />
        </div>

        <div className="w-full 800px:w-[45%] 800px:mt-0 mt-8">
          <CartData couponCode={couponCode} setCouponCode={setCouponCode} discountPercentenge={discountPercentenge} subTotalPrice={subTotalPrice} totalPrice={totalPrice} shipping={shipping} handleSubmit={handleSubmit} />
        </div>
      </div>

      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  )
}


const CartData = ({ couponCode, setCouponCode, subTotalPrice, totalPrice, shipping, discountPercentenge, handleSubmit }) => {
  return (
    <>
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
          <h5 className="text-[18px] font-[600]">{`${subTotalPrice}`}</h5>
        </div>
        <br />

        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">{`${shipping.toFixed(2)}`}</h5>
        </div>
      </div>

      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">{`${totalPrice}`}</h5>
      <br />

      <form onSubmit={handleSubmit}>
        <input type='text' value={couponCode} placeholder='Coupon code' required className={`${styles.input}`} onChange={(e) => setCouponCode(e.target.value)} />
        <button className={`${styles.button} text-white`}>Apply Code</button>
      </form>


    </>
  )
}

const ShippingInfo = ({ user, userInfo, setUserInfo, country, setCountry, city, setCity, zipCode, setZipCode, couponCode, couponCodeData, discountPrice, address1, setAddress1, address2, setAddress2 }) => {
  const [isChecked, setIsChecked] = useState(false);
  // console.log(country)


 
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCountry("")
    setCity("")
    setAddress1("")
    setZipCode("")
    if (!isChecked) {
      setCountry(user.addresses[0].country)
      setCity(user.addresses[0].city)
      setAddress1(user.addresses[0].address1)
      setAddress2(user.addresses[0].address2)
      setZipCode(user.addresses[0].zipCode)
    }
  };
  return (
    <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className={`text-[18px] cursor-pointer inline-block text-cyan-700`}
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose From saved address
      </h5>

      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3 cursor-pointer"
                  isChecked={isChecked}
                  onChange={handleCheckboxChange}
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};


export default Checkout