import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage} from "./Routes.js"
import {HomePage} from "./Routes.js"
import {RegisterPage} from "./Routes.js"
import {ActivationPage} from "./Routes.js"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

const App = () => {
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
      autoClose={5000}
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