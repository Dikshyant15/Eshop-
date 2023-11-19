import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product';
import axios from 'axios'
import { server } from '../../server';
import { toast } from 'react-toastify';


const ShopInfo = ({ isOwner }) => {
    const [data, setData] = useState([])
    const { product } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllProductsShop(id))
        axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
            setData(res.data.shopInfo)
        }
        ).catch((error) =>
            console.log(error)
        )

    }, [])

    const logoutHandler = async () => {
        axios.post(`${server}/shop/logout`, { withCredentials: true }).then((res) => {
            toast.success("Logout Successful")

        })
        window.location.reload();

    }

    console.log(data)
    return (
        <div className='w-full py-5'>
            <div className="w-full flex item-center justify-center">
                {/*<img
                    src={`${data.avatar?.url}`}
                    alt=""
                    className="w-[150px] h-[150px] object-cover rounded-full"
                />*/}
            </div>

            <div>
                <h3 className="text-center py-2 text-[20px] ">{data.name}</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                    {data.description}
                </p>
            </div>

            <div className="p-3">
                <h5 className="font-[600]">Address</h5>
                <h4 className="text-[#000000a6]">{data.address}</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Phone Number</h5>
                <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Total Products</h5>
                <h4 className="text-[#000000a6]">{product && product.length}</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Shop Ratings</h5>
                <h4 className="text-[#000000b0]"></h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Joined On</h5>
                <h4 className="text-[#000000b0]">{data.createdAt}</h4>
            </div>




            {isOwner && <div className="py-3 px-4">
                <Link to="/settings">
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                        <button className="text-white">Edit Shop</button>
                    </div>
                </Link>
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}

                >
                    <button className="text-white" onClick={logoutHandler}>Log Out</button>
                </div>
            </div>}
        </div>
    )
}

export default ShopInfo