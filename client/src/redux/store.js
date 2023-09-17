import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "../redux/reducers/user"
import {productReducer} from "../redux/reducers/product"
import {wishlistReducer} from "../redux/reducers/wishlist"

const Store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        wishlist:wishlistReducer
    }
})

export default Store