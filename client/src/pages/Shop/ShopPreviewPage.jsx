import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, productData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const ShopPreviewPage = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px: w-full h-full bg-cover ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}>
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img
                                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>



            <div className={`${styles.section} bg-[#f5f5f5]`}>
                <div className="w-full 800px:flex py-10 justify-between">
                    <div className="800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[85vh] 800px:sticky top-10 left-0 z-10">
                        <ShopInfo isOwner={false} />
                    </div>
                    <div className="800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
                        <ShopProfileData isOwner={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPreviewPage