import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreatePage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [zipCode, setZipCode] = useState()
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState([])

    const navigate = useNavigate()

    const handleFileInputChangeDemo= (e) => {
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

    const handleSubmitDemo = async (e) => {
        e.preventDefault();
        const config = { header: { "Content-Type": "multipart/form-data" } }
        const newFormData = new FormData()

        newFormData.append("name", name)
        newFormData.append("email", email)
        newFormData.append("password", password)
        newFormData.append("file", avatar)
        newFormData.append("zipCode", zipCode)
        newFormData.append("address", address)
        newFormData.append("phoneNumber", phoneNumber)

        axios.post(`${server}/shop/create-shop`, newFormData, config).then(
            (res) => {
                toast.success(res.data.message)
                setName("")
                setEmail("")
                setPassword("")
                setAvatar()
                setZipCode()
                setAddress("");
                setPhoneNumber();
                navigate("/shop-login")

                console.log(res)

            }
        ).catch((error) => {
            toast.error(error.response.data.message);

            console.log(error)
        });
    }



    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     axios
    //         .post(`${server}/shop/create-shop`, {
    //             name,
    //             email,
    //             password,
    //             avatar,
    //             zipCode,
    //             address,
    //             phoneNumber,
    //         })
    //         .then((res) => {
    //             toast.success(res.data.message);
    //             setName("");
    //             setEmail("");
    //             setPassword("");
    //             setAvatar();
    //             setZipCode();
    //             setAddress("");
    //             setPhoneNumber();
    //         })
    //         .catch((error) => {
    //             toast.error(error.response.data.message);
    //         });
    // }

    // const handleFileInputChange = (e) => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatar(reader.result);
    //         }
    //     };

    //     reader.readAsDataURL(e.target.files[0]);
    // };


    return (
        <>
            <div class="flex justify-center items-center w-screen h-screen bg-primary ">
                <div class="container mx-auto my-4 px-4 lg:px-20 mt-20">

                    <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div class="flex">
                            <h1 class="font-bold uppercase text-5xl">Register as  <br /> Seller</h1>
                        </div>
                        <form onSubmit={handleSubmitDemo}>
                            <div class="grid grid-cols-2 gap-5 md:grid-cols-3 mt-5">
                                <input name="name" value={name} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setName(e.target.value) }}
                                    type="text" placeholder="Name*" />
                                <input name="password" value={password} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setPassword(e.target.value) }}
                                    type="text" placeholder="Password*" />

                                <input name="email" value={email} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" placeholder="Email*" />
                                <input name="phone" value={phoneNumber} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setPhoneNumber(e.target.value) }}
                                    type="number" placeholder="Phone*" />
                                <input name="zip" value={zipCode} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setZipCode(e.target.value) }}
                                    type="number" placeholder="ZIP*" />
                                <input name="address" value={address} class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" onChange={(e) => { setAddress(e.target.value) }}
                                    type="adress" placeholder="Address*" />
                                <input
                                    onChange={handleFileInputChangeDemo}
                                    type="file"
                                    name="avatar"
                                    id="file-input"
                                    class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                />
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden ">
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <RxAvatar className="h-8 w-8" />
                                    )}
                                </span>
                            </div>

                            <div class="my-2 w-1/2 lg:w-1/4">
                                <button class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                    Register as Seller
                                </button>
                            </div>

                            <p>Already have an account?</p>
                            <Link to="/shop-login" className="text-blue-600 pl-2 text-2xl font-Roboto">
                                Sign in here!!
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

export default ShopCreatePage