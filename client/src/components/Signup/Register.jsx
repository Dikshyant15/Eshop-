import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import axios from "axios"
import { toast } from "react-toastify"
import { server } from "../../server"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [avatar, setAvatar] = useState([]);

    // console.log(avatar)
    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
        console.log(file)


        //     const reader = new FileReader();

        //     reader.onload = () => {
        //         if (reader.readyState === 2) {
        //             setAvatar(reader.result);
        //         }
        //     };

        //     reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { header: { "Content-Type": "multipart/form-data" } }
        const newFormData = new FormData()

        newFormData.append("file", avatar)
        newFormData.append("username", username)
        newFormData.append("email", email)
        newFormData.append("password", password)

        axios.post(`${server}/user/create-user`, newFormData, config).then(
            (res) => {
                toast.success(res.data.message)
                setAvatar()
                setEmail("")
                setPassword("")
                setUsername("")
                navigate("/login")

                console.log(res)

            }
        ).catch((error) => {
            toast.error(error.response.data.message);

            console.log(error)
        });




        // axios.post(`${server}/user/create-user`, { username, email, password, avatar }).then(
        //     (res) => {
        //         toast.success(res.data.message)
        //         setAvatar()
        //         setEmail("")
        //         setPassword("")
        //         setUsername("")
        //     }
        // ).catch((error) => {
        //     toast.error(error.response.data.message);
        // });
    }

    return (
        <div>
            <div className="min-h-screen flex bg-blue-400 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-500">Signup as an user</h2>
                </div>
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='username' className='block text-sm font-medium text-gray-500'>Name</label>
                                <div className='mt-1'>
                                    <input className='appearance-none block w-full px-3 py-2 border border-gray-500 rounded shadow-sm placeholder-slate-200 focus:outline-none focus:border-blue-300' type='text' name='username' autoComplete='username' required value={username} onChange={(e) => { setUsername(e.target.value) }}></input>
                                </div>
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
                                <div className='mt-1 relative'>
                                    <label
                                        htmlFor="avatar"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <div className="mt-2 flex items-center">
                                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                            {avatar ? (
                                                <img
                                                    src={avatar[0]}
                                                    alt="avatar"
                                                    className="h-full w-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <RxAvatar className="h-8 w-8" />
                                            )}
                                        </span>
                                        <label
                                            htmlFor="file-input"
                                            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                name="avatar"
                                                id="file-input"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={handleFileInputChange}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
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
                                    <h4 className="mt-2">Already have an account?</h4>
                                    <Link to="/login" className="text-blue-600 pl-2 mt-2">
                                        Sign In
                                    </Link>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register