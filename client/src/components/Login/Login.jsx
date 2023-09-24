import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios"
import { toast } from "react-toastify"
import { server } from "../../server"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

      await axios
        .post(
          `${server}/user/login-user`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Login Success!");
          navigate("/");
           window.location.reload(true); 
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err)
        });
    };
  
  return (
    <div className="min-h-screen flex bg-blue-400 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-500">Login your account</h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-500'>Email</label>
              <div className='mt-1'>
                <input className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded shadow-sm placeholder-slate-200 focus:outline-none focus:border-blue-300' type='email' name='email' autoComplete='email' required value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
              </div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-500'>Password</label>
              <div className='mt-1 relative'>
                <input className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded shadow-sm placeholder-slate-200 focus:outline-none focus:border-blue-300' value={password} name='password' autoComplete='current-password' required type={visible ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }}></input>
                {visible ? <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                /> :
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />}
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative mt-2 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.normalFlex} w-full`}>
                <h4 className="mt-2">Register as an user?</h4>
                <Link to="/register" className="text-blue-600 pl-2 mt-2">
                  Sign Up
                </Link>
              </div>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login