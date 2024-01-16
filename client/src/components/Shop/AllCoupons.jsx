import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Button } from '@mui/material';

const AllCoupons = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    const [coupouns, setCoupouns] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [value, setValue] = useState(null);
    const { seller } = useSelector((state) => state.seller);
    const { product } = useSelector((state) => state.product);

    useEffect(() => {
        axios.get(`${server}/couponCode/get-couponCode/${seller._id}`, 
            { withCredentials: true }).then((res) => {
                setCoupouns(res.data.couponCodeBySellerId)
            })
            }, [])


        const handleSubmit = async (e) => {
            try {
                e.preventDefault()
                await axios.post(`${server}/couponCode/create-new-couponCode`, { name, minAmount, maxAmount, selectedProduct, value, shopId: seller._id },
                    { withCredentials: true }).then((res) => {
                        toast.success(res.data.message)
                        setOpen(false)
                        setName("")
                        setMinAmout(null)
                        setMaxAmount(null)
                        setValue(null)
                        setSelectedProduct(null)
                    })

            } catch (error) {
                toast.error(error.response.data.message);
            }

        }

        const handleDelete = async(id) => {
            await axios.delete(`${server}/couponCode/delete-couponCode-id/${id}`, 
            { withCredentials: true }).then((res) => {
                toast.success(res.data.message)
                window.location.reload();
            
            })
        }
        const columns = [
            { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
            {
                field: "name",
                headerName: "Coupon Code",
                minWidth: 180,
                flex: 1.4,
            },
            {
                field: "price",
                headerName: "Value",
                minWidth: 100,
                flex: 0.6,
            },
            {
                field: "Delete",
                flex: 0.8,
                minWidth: 120,
                headerName: "",
                type: "number",
                sortable: false,
                renderCell: (params) => {
                    return (
                        <>
                            <Button onClick={() => handleDelete(params.id)}>
                                <AiOutlineDelete size={20} />
                            </Button>
                        </>
                    );
                },
            },
        ];

        const row = [];

        coupouns &&
            coupouns.forEach((item) => {
                row.push({
                    id: item._id,
                    name: item.name,
                    price: item.value + " %",
                    sold: 10,
                });
            });

        return (
            <>
                <div className="w-full mx-8 pt-1 mt-10 bg-white p-2">
                    <div className='flex text-4xl justify-center'>All Coupon Codes</div>
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                            onClick={() => setOpen(!open)}
                        >
                            <span className="text-white">Create Coupon Code</span>
                        </div>
                    </div>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                    {open && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1
                                        size={30}
                                        color='red'
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <h5 className="text-[30px] font-Poppins text-center">
                                    Create Coupon code
                                </h5>
                                {/* create coupoun code */}
                                <form aria-required={true} onSubmit={handleSubmit}>
                                    <br />
                                    <div>
                                        <label className="pb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code name..."
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">
                                            Discount Percentenge{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={value}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code value..."
                                            onChange={(e) => setValue(e.target.value)}

                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Min Amount</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={minAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code min amount..."
                                            onChange={(e) => setMinAmout(e.target.value)}

                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Max Amount</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={maxAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter your coupon code max amount..."
                                            onChange={(e) => setMaxAmount(e.target.value)}

                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Selected Product</label>
                                        <select
                                            className="w-full mt-2 border h-[35px] rounded-[5px]"
                                            value={selectedProduct}
                                            onChange={(e) => setSelectedProduct(e.target.value)}
                                        >
                                            <option value="Choose your selected products">
                                                Choose a selected product
                                            </option>
                                            {product &&
                                                product.map((i) => (
                                                    <option value={i.productName} key={i.productName}>
                                                        {i.productName}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <br />
                                    <div>
                                        <button
                                            type="submit"
                                            value="Create"
                                            className={`${styles.button} mt-2 appearance-none block w-full px-3 h-[35px]} text-white`}
                                        >Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

            </>
        );
    }

export default AllCoupons