import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInformation,

} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
// import { getAllOrdersOfUser } from "../../redux/actions/order";


const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user)

  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
    toast.success("User information updated successfully")

  }
  return (
    <div className="w-full mt-30 border" >
      {/* profile */}
      {active === 1 && (
        <>
          <div className=" top-16 ">
            <div className="flex justify-center w-full">
              <div className="relative top-16">
                <img
                  src="https://via.placeholder.com/120x120"
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5 mt-6">
              <form aria-required={true} onSubmit={handleSubmit}>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Full Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={name}
                      onChange={(e) => { setName(e.target.value) }}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                  </div>

                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Enter your password</label>
                    <input
                      type="password"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                </div>
                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </>
      )}
      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <UserAddress />
        </div>
      )}
    </div>
  );
};


const AllOrders = () => {


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,


    },
  ];

  const rows = [

  ];



  return (
    <div className="pl-8 pt-1 mt-12">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};


const AllRefundOrders = () => {





  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

    },
  ];

  const row = [];


  return (
    <div className="pl-8 pt-1 mt-12">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};


const TrackOrder = () => {


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,

    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,

    },
  ];

  const row = [];



  return (
    <div className="pl-8 pt-1 mt-12">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};



const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5 mt-16">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const UserAddress = () => {
  const [open, setOpen] = useState(false)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [addressType, setAddressType] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [zipCode, setZipCode] = useState("")
  const dispatch = useDispatch()

  

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const { user } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
      e.preventDefault()
      if (city==="" || country==="" || addressType===""|| address1==="" || zipCode==="" ) {
        toast.error("Please fill the required fields")
        
      } else {
        
        dispatch(updateUserAddress(city,country,addressType,address1,address2,zipCode))
        toast.success("Address registered")
        // window.location.reload(true); 
      }
  setOpen(false)
  setCity("")
  setCountry("")
  setAddressType("")
  setAddress1("")
  setAddress2("")
  setZipCode("")

}
  const handleDelete = (item) => {
    try {
      const id = item._id
      console.log(id)
      dispatch(deleteUserAddress(id))
      toast.success("User address deleted successfully")
      // window.location.reload(true); 

      
    } catch (error) {
      console.log(error)
      
    }

  }
  return (
    <div className="w-full px-5 mt-20">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center pt-20  ">
          <div className="w-[85%] h-[58vh] bg-white rounded shadow  overflow-y-scroll relative ">
            <div className="w-full flex justify-end p-3 ">
              <RxCross1
                size={30}
                color="red"
                onClick={() => setOpen(!open)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full p-4 grid grid-cols-3 grid-rows-3 gap-5">
                  <div className="w-full pb-2 ">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[85%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="w-[85%] block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[85%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="w-[85%] block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[85%]`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input} w-[85%]`}
                      // required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input} w-[85%]`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[85%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2 w-[85%]"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-[105%] pb-2 ml-96">
                    <button
                      type="submit"
                      className={`${styles.button}  mt-5 cursor-pointer bg-blue-600 text-white w-full `}
                      required
                      readOnly
                    >Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                Address 1: {item.address1} | Address 2: {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};


export default ProfileContent