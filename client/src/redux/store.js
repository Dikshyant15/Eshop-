import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./reducers/user"
import {productReducer} from "./reducers/product"
import {wishlistReducer} from "./reducers/wishlist"

const Store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        wishlist:wishlistReducer
    }
})

export default Store