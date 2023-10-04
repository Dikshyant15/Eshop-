import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import{LoginPage , 
HomePage, 
RegisterPage,
ActivationPage,
SellerActivationPage,
BestSelling,
Products, 
EventsPage,
FAQPage, 
ProfilePage,
ShopCreatePage, 
ShopLoginPage} from "./route/Routes.js"
import Store from "./redux/store.js";
import {  loadUser } from "./redux/actions/user";
import { loadSeller } from "./redux/actions/seller";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import axios from 'axios'
import ProtectedRoute from './route/protectedRoute.js'
import { AllProductPage, CreateEventsPage, ShopDashboardPage } from './route/ShopRoute.js'
import { ShopHomePage } from './ShopRoute.js'
import SellerProtectedRoute from './route/SellerProtectedRoute.js'
import CreateProductPage from './pages/Shop/CreateProductPage.jsx';

const App = () => {
  // const {isSeller} = useSelector((state)=>state.seller)

  useEffect(
    ()=>{
      Store.dispatch(loadUser())
      Store.dispatch(loadSeller())

      //  if(isSeller === true){return <Navigate to="/shop-home-page"/>}
    //   axios.get("`{server}/user/getUser",{withCredentials:true}).then((res)=>{
    //     toast.error(res.data.message)
    //   }).catch((error)=>{
    //     toast.error(error.response.data.message)
    //   })
    },[]
  )
  return (
    <BrowserRouter>
        {/*User Routes */}
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
        path="/"
        element={<HomePage />}
      />
      
      <Route
      path="/best-selling"
      element={<BestSelling />}
    />
      <Route
      path="/products"
      element={<Products />}
    />
      <Route
      path="/events"
      element={<EventsPage />}
    />
      <Route
      path="/faq"
      element={<FAQPage />}
    />
  
      <Route
      path="/profile"
      element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
    />

    {/*Shop Routes */}
    <Route
    path="/shop/activation/:activation_token"
    element={<SellerActivationPage />}
  />
    <Route
    path="/register-seller"
    element={<ShopCreatePage />}
  />
    <Route
    path="/shop-login"
    element={<ShopLoginPage />}
  />
    <Route
    path="/shop-home-page/:id"
    // element={<SellerProtectedRoute><ShopHomePage /></SellerProtectedRoute>}
    element={<ShopHomePage />}
  />
    <Route
    path="/shop-dashboard"
    element={<SellerProtectedRoute><ShopDashboardPage/></SellerProtectedRoute>}
          // element={<ShopDashboardPage />}
  />
    <Route
    path="/dashboard-create-product"
    element={<SellerProtectedRoute><CreateProductPage/></SellerProtectedRoute>}
  />
    <Route
    path="/dashboard-products"
    element={<SellerProtectedRoute><AllProductPage/></SellerProtectedRoute>}
  />
    <Route
    path="/dashboard-create-event"
    element={<SellerProtectedRoute><CreateEventsPage/></SellerProtectedRoute>}
  />
        
      </Routes>
      <ToastContainer
      position="top-center"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />  

    </BrowserRouter>
  )
}

export default App