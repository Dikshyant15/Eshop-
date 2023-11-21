export const addtoCart =(data)=>async(dispatch,getState)=>{
    dispatch({
        type: "addToCart",
        payload: data,
      });
    
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
      return data;
}