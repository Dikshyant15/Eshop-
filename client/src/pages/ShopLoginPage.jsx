import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const ShopLoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios
            .post(`${server}/shop/shop-login`, {
                email,
                password,
            })
            .then((res) => {
                toast.success(res.data.message);
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    return (
        <>
            <div class="flex justify-center items-center w-screen h-screen bg-primary ">
                <div class="container mx-auto my-4 px-4 lg:px-20 mt-20">

                    <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div class="flex">
                            <h1 class="font-bold uppercase text-5xl">Login your  <br /> Seller Account</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="grid grid-cols-2 gap-5 md:grid-cols-3 mt-5">
                                <input name="email" value={email} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" placeholder="Email*" />

                                <input name="password" value={password} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setPassword(e.target.value) }}
                                    type="text" placeholder="Password*" />




                            </div>
                            <div class="my-2 w-1/2 lg:w-1/4">
                                <button class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                    LOGIN
                                </button>
                            </div>

                            <p>Don't have an account?</p>
                            <Link to="/register-seller" className="text-blue-600 pl-2 text-2xl font-Roboto">
                                Sign up here!!
                            </Link>
                        </form>
                    </div>

                    <div
                        class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                        <div class="flex flex-col text-white">
                            <h1 class="font-bold uppercase text-4xl my-4">Drop in our office</h1>
                            <p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                                tincidunt arcu diam,
                                eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
                            </p>

                            <div class="flex my-4 w-2/3 lg:w-1/2">
                                <div class="flex flex-col">
                                    <i class="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div class="flex flex-col">
                                    <h2 class="text-2xl">Main Office</h2>
                                    <p class="text-gray-400">5555 Tailwind RD, Pleasant Grove, UT 73533</p>
                                </div>
                            </div>


                            <div class="flex my-4 w-2/3 lg:w-1/2">
                                <div class="flex flex-col">
                                    <i class="fas fa-phone-alt pt-2 pr-2" />
                                </div>
                                <div class="flex flex-col">
                                    <h2 class="text-2xl">Call Us</h2>
                                    <p class="text-gray-400">Tel: xxx-xxx-xxx</p>
                                    <p class="text-gray-400">Fax: xxx-xxx-xxx</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default ShopLoginPage