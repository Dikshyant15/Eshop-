import React, { useState } from 'react'
import styles from '../../styles/styles'
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import DropDown from "./Dropdown";
import Navbar from "./Navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, productData } from "../../static/data";
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = ({ activeHeading }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [searchInput, setSearchInput] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [dropDown, setDropDown] = useState(false)
    const [openWishlist, setOpenWishlist] = useState(false)
    const [openCart, setOpenCart] = useState(false)

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value
        setSearchInput(searchTerm)

        const filteredProducts =
            productData &&
            productData.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setSearchData(filteredProducts);

    }

    console.log(searchInput)
    console.log(searchData)

    return (
        <div className={`${styles.section}`}>
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                <div>
                    <Link to="/">
                        <img
                            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                            alt=""
                        />
                    </Link>
                </div>

                {/*search bar*/}
                <div className='w-[50%] relative'>
                    <input type="text" placeholder='Search for products' value={searchInput} onChange={handleSearchChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'></input>
                    <AiOutlineSearch
                        size={30}
                        className="absolute right-2 top-1.5 cursor-pointer"
                    />
                    {searchData && searchData.length !== 0 ? (
                        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                            {searchData &&
                                searchData.map((i, index) => {
                                    return (
                                        <Link to={`/product/${i?._id}`}>
                                            {/*<div className="w-full flex items-start-py-3">
                                    <img
                                      src={`${i?.images[0]?.url}`}
                                      alt=""
                                      className="w-[40px] h-[40px] mr-[10px]"
                                    />
                                </div>*/}
                                            <h1>{i?.name}</h1>
                                        </Link>
                                    );
                                })}
                        </div>
                    ) : null}
                </div>

                <div className={`${styles.button}`}>
                    <Link to="/register-seller">
                        <h1 className="text-[#fff] flex items-center">
                            <IoIosArrowForward className="ml-1" />Become Seller
                        </h1>
                    </Link>
                </div>

                < div className={`${"shadow-sm fixed top-20 left-0 z-10"} transition hidden 800px:flex items-center justify-between w-full bg-gradient-to-r from-green-400 to-blue-500 h-[100px]`}>
                    <div
                        className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
                    >
                        {/*categories*/}
                        <div className="ml-10" onClick={() => { setDropDown(!dropDown) }}>
                            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                                <button
                                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                                >
                                    All Categories
                                </button>
                                <IoIosArrowDown
                                    size={20}
                                    className="absolute right-2 top-4 cursor-pointer"
                                    onClick={() => setDropDown(!dropDown)}
                                />
                                {dropDown ?
                                    <DropDown
                                        categoriesData={categoriesData}
                                        setDropDown={setDropDown}
                                    /> : null}
                            </div>
                        </div>

                    </div>
                    {/*Navbar*/}
                    <div className={`${styles.noramlFlex}`}> <Navbar /></div>

                    <div className="flex">
                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => setOpenWishlist(true)}
                            >
                                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    {/*wishlist && wishlist.length*/}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className={`${styles.noramlFlex}`}>
                        <div
                            className="relative cursor-pointer mr-[15px]"
                            onClick={() => setOpenCart(true)}
                        >
                            <AiOutlineShoppingCart
                                size={30}
                                color="rgb(255 255 255 / 83%)"
                            />
                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {/*cart && cart.length*/}
                            </span>
                        </div>
                    </div>


                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                            {isAuthenticated ? (
                                <Link to="/profile">
                                    <img
                                        src={`${user?.avatar?.url}`}
                                        className="w-[35px] h-[35px] rounded-full"
                                        alt=""
                                    />
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                </Link>
                            )}
                        </div>
                    </div>




                </ div>
            </div>
        </div>
    )
}

export default Header

