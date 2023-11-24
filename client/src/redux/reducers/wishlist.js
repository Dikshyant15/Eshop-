import { createReducer } from "@reduxjs/toolkit";

const initialState = { 
    wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : []

}

export const wishlistReducer = createReducer(initialState,{
    addtoWishlist: (state,action)=>{
        const item = action.payload 
        const isItemExist = state.wishlist.find((i) => i._id === item._id)

            if (isItemExist) {
                return {
                    ...state,
                    wishlist: state.wishlist.map((i) => (i._id === isItemExist._id ? item : i)),
                };
            } else {
                return {
                    ...state,
                    wishlist: [...state.wishlist, item],
                };
            }

        
    },
    removefromWishlist: (state,action)=>{
        return{
            ...state,
            wishlist: state.wishlist.filter((i)=>i._id !== action.payload)
        }
        
    }

}

)

// export const wishlistReducer = createReducer(initialState, {
//     addtoWishlist: (state, action) => {
//       const item = action.payload;
//       const isItemExist = state.wishlist.find((i) => i._id === item._id);
  
//       if (isItemExist) {
//         return {
//           ...state,
//           wishlist: state.wishlist.map((i) => (i._id === isItemExist._id ? item : i)),
//         };
//       } else {
//         const updatedState = {
//           ...state,
//           wishlist: [...state.wishlist, item],
//         };
//         localStorage.setItem("wishlistItems", JSON.stringify(updatedState.wishlist));
//         return updatedState;
//       }
//     },
//     removefromWishlist: (state, action) => {
//       const updatedState = {
//         ...state,
//         wishlist: state.wishlist.filter((i) => i._id !== action.payload),
//       };
//       localStorage.setItem("wishlistItems", JSON.stringify(updatedState.wishlist));
//       return updatedState;
//     },
//   });
  