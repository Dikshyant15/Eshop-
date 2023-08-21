import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage} from "./Routes.js"
import {HomePage} from "./Routes.js"
import {RegisterPage} from "./Routes.js"
import {ActivationPage} from "./Routes.js"
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
import axios from 'axios'

const App = () => {
  useEffect(
    ()=>{
      Store.dispatch(loadUser())
    //   axios.get("`{server}/user/getUser",{withCredentials:true}).then((res)=>{
    //     toast.error(res.data.message)
    //   }).catch((error)=>{
    //     toast.error(error.response.data.message)
    //   })
    },[]
  )
  return (
    <BrowserRouter>
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