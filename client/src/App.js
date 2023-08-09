import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage} from "./Routes.js"
import {RegisterPage} from "./Routes.js"
import {ActivationPage} from "./Routes.js"
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

        
      </Routes>

    </BrowserRouter>
  )
}

export default App