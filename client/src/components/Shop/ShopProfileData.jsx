import React, { useEffect, useState } from 'react'
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from '../../redux/actions/product';


const ShopProfileData = () => {
  const [active, setActive] = useState(1)

  const {product} = useSelector((state)=> state.product)
  const {id} = useParams()
  const dispatch = useDispatch()


  useEffect(()=>{
    getAllProductsShop(id)
  },[dispatch])
  
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
          
        </div>
      </div>

    </div>
  );
};

export default ShopProfileData;


