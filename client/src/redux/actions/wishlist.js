//add to wishlist 
export const addToWishlist = (data) =>async(dispatch,getState)=>{
    dispatch({
        type:"addtoWishlist",
        payload: data
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist))
    return data
}

//remove from wishlist 
export const removeFromWishlist = (data) => async(dispatch,getState)=>{
    dispatch({
        type:"removefromWishlist",
        payload: data._id
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist))
    return data
}