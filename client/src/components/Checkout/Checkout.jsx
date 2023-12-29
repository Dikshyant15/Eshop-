import React, { useState } from 'react'
import styles from "../../styles/styles";
import { useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';

const Checkout = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { user } = useSelector((state) => state.user)

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[55%]">
          <ShippingInfo user={user} userInfo={userInfo} setUserInfo={setUserInfo} country={country} setCountry={setCountry} city={city} setCity={setCity} zipCode={zipCode} setZipCode={setZipCode} couponCode={couponCode}
            couponCodeData={couponCodeData} discountPrice={discountPrice} address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2} />
        </div>

        <div className="w-full 800px:w-[45%] 800px:mt-0 mt-8">
          <CartData />
        </div>
      </div>

      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
      // onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  )
}


const CartData = () => {
  return (
    <>
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
          <h5 className="text-[18px] font-[600]">$subTotalPrice</h5>
        </div>
        <br />

        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">$shipping.toFixed(2)</h5>
        </div>
      </div>

      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {/*discountPercentenge ? "$" + discountPercentenge.toString() : null*/}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">$totalPrice</h5>
      <br />

      <form>
        <input type='text' placeholder='Coupon code' required className={`${styles.input}`}/>
        <button className={`${styles.button} text-white`}>Apply Code</button>
      </form>


    </>
  )
}

const ShippingInfo = ({ user,  userInfo, setUserInfo, country, setCountry, city, setCity, zipCode, setZipCode, couponCode, couponCodeData, discountPrice, address1, setAddress1, address2, setAddress2 }) => {
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
                State.getAllStates().map((item) => (
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
        className="text-[18px] cursor-pointer inline-block"
        onClick = {() => setUserInfo(!userInfo)}
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
                  className="mr-3"
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