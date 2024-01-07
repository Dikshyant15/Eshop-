import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {
  LoginPage,
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
  ShopLoginPage,
  ProductDetailPage,
  ShopPreviewPage,
  PaymentPage,
  CheckoutPage
} from "./route/Routes.js"
import {AdminDashboardPage} from "./route/AdminRoute.js";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user";
import { getAllSellersAdmin, loadSeller } from "./redux/actions/seller";
import { getAllProducts } from "./redux/actions/product";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import axios from 'axios'
import ProtectedRoute from './route/ProtectedRoute.js'
import { AllProductPage, CreateEventsPage, ShopDashboardPage, AllEventPage, AllOrderPage } from './route/ShopRoute.js'
import { ShopHomePage } from './ShopRoute.js'
import SellerProtectedRoute from './route/SellerProtectedRoute.js'
import ProtectedAdminRoute from './route/ProtectedAdminRoute.js'
import CreateProductPage from './pages/Shop/CreateProductPage.jsx';
import { getAllEvents } from './redux/actions/event.js';
import AllSeller from './components/Admin/AllSeller.jsx';

const App = () => {
  // const {isSeller} = useSelector((state)=>state.seller)

  useEffect(
    () => {
      Store.dispatch(loadUser())
      Store.dispatch(loadSeller())
      Store.dispatch(getAllProducts())
      Store.dispatch(getAllEvents())
      Store.dispatch(getAllSellersAdmin())

      //  if(isSeller === true){return <Navigate to="/shop-home-page"/>}
      //   axios.get("`{server}/user/getUser",{withCredentials:true}).then((res)=>{
      //     toast.error(res.data.message)
      //   }).catch((error)=>{
      //     toast.error(error.response.data.message)
      //   })
    }, []
  )
  return (
    <BrowserRouter>
      {/*User Routes */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />

        <Route
          path="/payment"
          element={
              <PaymentPage />
          }
        />
        <Route
          path="/checkout"
          element={
              <CheckoutPage />
          }
        />
        {/*<Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />*/}

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
          element={<SellerProtectedRoute><ShopHomePage /></SellerProtectedRoute>}
          // element={<ShopHomePage />}
        />
        <Route
          path="/shop-dashboard"
          element={<SellerProtectedRoute><ShopDashboardPage /></SellerProtectedRoute>}
        // element={<ShopDashboardPage />}
        />
        <Route
          path="/dashboard-create-product"
          element={<SellerProtectedRoute><CreateProductPage /></SellerProtectedRoute>}
        />
        <Route
          path="/dashboard-products"
          element={<SellerProtectedRoute><AllProductPage /></SellerProtectedRoute>}
        />
        <Route
          path="/dashboard-create-event"
          element={<SellerProtectedRoute><CreateEventsPage /></SellerProtectedRoute>}
        />
        <Route
          path="/dashboard-events"
          element={<SellerProtectedRoute><AllEventPage /></SellerProtectedRoute>}
        />
        <Route
          path="/dashboard-orders"
          element={<SellerProtectedRoute><AllOrderPage /></SellerProtectedRoute>}
        />
        <Route
          path="/shop/preview/:id"
          element={<SellerProtectedRoute><ShopPreviewPage /></SellerProtectedRoute>}
        />

         {/* Admin Routes */}
         <Route
         path="/admin-sellers"
         element={
           <ProtectedAdminRoute>
             <AllSeller />
           </ProtectedAdminRoute>
         }
       />
         <Route
         path="/admin/dashboard"
         element={
           <ProtectedAdminRoute>
             <AdminDashboardPage />
           </ProtectedAdminRoute>
         }
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