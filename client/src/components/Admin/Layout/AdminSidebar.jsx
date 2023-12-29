import React,{useState} from 'react'
import { FiShoppingBag } from "react-icons/fi";
import {GrWorkshop} from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";

  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios"
  import {server} from "../../../server"
  import { toast } from "react-toastify";

const AdminSidebar = ({active,setActive}) => {
    // const [active,setActive] = useState(1)
    const navigate = useNavigate()
    return (
        <div className=' w-full h-full shadow-sm  p-4 pt-2  '>
            <div className='flex items-center w-full mb-8 cursor-pointer' onClick={() => setActive(1)} >
                <RxDashboard size={20} color={active === 1 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 1 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                Dashboard
                </span>
            </div>

            <div className='flex items-center w-full mb-8 cursor-pointer' onClick={() => setActive(2)}>
                <FiShoppingBag size={25} color={active === 2 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 2 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                All Orders
                                </span>
            </div>

            <div className='flex items-center w-full mb-8 cursor-pointer' onClick={() => setActive(3)}>
                <HiOutlineUserGroup size={25} color={active === 3 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 3 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    All Users
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(4) }
            >
                <BsHandbag size={20} color={active === 4 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 4 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    All Products
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(5)}
            >
                <GrWorkshop size={20} color={active === 5 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 5 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    All Sellers
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(6)}
            >
                <MdOutlineLocalOffer size={20} color={active === 6 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 6 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                   All Events
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(7)}
            >
                <CiMoneyBill size={20} color={active === 7 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 7 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                Withdraw Request
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={()=> setActive(8)}
            >
                <CiSettings size={20} color={active === 8 ?"red":""}  />
                <span
                    className={`pl-3 ${active === 8 ? "text-[red]": ""
                        } 800px:block hidden`}
                >
                    Settings
                </span>
            </div>
        </div>
    )
}

export default AdminSidebar