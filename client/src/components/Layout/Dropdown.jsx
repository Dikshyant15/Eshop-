import React from 'react'
import styles from '../../styles/styles'
import { useNavigate } from 'react-router-dom'


const Dropdown = ({ categoriesData,setDropDown }) => {
    const navigate = useNavigate()

    const handleCategorySelection=(category)=>{
        navigate(`/products?category=${category.title}`);
        setDropDown(false);
        window.location.reload();
    }
    return (
        <div className="pb-4 w-[272px] rounded shadow-sm absolute bg-gradient-to-r from-green-400 to-blue-500">
            {categoriesData.map((category, index) => (
                <div key={index} className={`${styles.normalFlex} cursor-pointer`}  onClick={()=>{handleCategorySelection(category)}}>
                    <img
                        src={category.image_Url}
                        style={{
                            width: "25px",
                            height: "25px",
                            objectFit: "contain",
                            marginLeft: "10px",
                            userSelect: "none",
                        }}
                        alt="image"
                    />
                    <span className ="ml-5">{category.title}</span>
                </div>

            ))
            }
        </div>
    )
}

export default Dropdown