import React, { useEffect, useState } from 'react'
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../redux/actions/product';
import Card from '../Route/ProductCard/Card'


const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1)

  const { product } = useSelector((state) => state.product)
  const { events } = useSelector((state) => state.event)
  const { id } = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    getAllProductsShop(id)
  }, [dispatch])

  console.log(product)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"
                } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px] mr-5`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {active === 1 && (<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[22px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {product &&
          product.map((i, index) => (<Card data={i} key={index} />))}
      </div>)}
    </div>
  );
};

export default ShopProfileData;


