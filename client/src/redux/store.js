import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "../redux/reducers/user"
import {productReducer} from "../redux/reducers/product"

const Store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})

export default Store