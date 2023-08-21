import {axios} from "axios"
import {server} from "../../server"

export const createProduct=( 
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images)=>{
        async(dispatch)=>{
            try {
                dispatch({type:productCreateRequest})

                const {data} = axios.post(`${server}/create-product`,{ 
                    name,
                    description,
                    category,
                    tags,
                    originalPrice,
                    discountPrice,
                    stock,
                    shopId,
                    images,
                })
                dispatch({type:productCreateSuccess,payload:data.product})
                
            } catch (error) {
                dispatch({type:productCreateFail,payload:error.response.data.message})

                
            }
        }

}