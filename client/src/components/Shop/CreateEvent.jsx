import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/actions/event";


const CreateEvent = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [price, setPrice] = useState()
    const [dPrice, setDprice] = useState()
    const [stock, setStock] = useState()
    const [images, setImages] = useState([])
    const [category, setCategory] = useState("")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { seller } = useSelector((state) => state.seller)
    const { error, success } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log(images)

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard");
            window.location.reload();
        }
    }, [dispatch, error, success]);

    //handle image change 
    const handleImageChange = (e) => {
        e.preventDefault()
        let files = Array.from(e.target.files)
        console.log(files)
        setImages((prevImages) => [...prevImages, ...files])
    }

    //handle start date change
    const handleStartDate = (e) => {
        const startDate = new Date(e.target.value)
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

        setStartDate(startDate)
        setEndDate(null)
        document.getElementById("end-date").min = minEndDate.toISOString().slice(
            0,
            10
        );
    }
    //handle end date change
    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate
        ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : "";

    const handleSubmit = (e) => {
        e.preventDefault()

        const newForm = new FormData()


        newForm.append("name", name)
        newForm.append("description", description)
        newForm.append("tags", tags)
        newForm.append("price", price)
        newForm.append("dPrice", dPrice)
        newForm.append("stock", stock)
        newForm.append("category", category)
        newForm.append("shopId", seller._id)
        newForm.append("startDate",startDate )
        newForm.append("endDate", endDate)

        images.forEach((image) => { newForm.append("images", image) })
        console.log(images)

        // dispatch(createProduct({name,description,tags,price,dPrice,stock,category,shopId:seller._id,images}))
        dispatch(createEvent(newForm))

    }
    return (
        <div className="w-[80%] ml-2 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll mt-5 mr-10">
            <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
            <form onSubmit={handleSubmit} >
                <br />
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product name..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                    >
                        <option value="Choose a category">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={(e) => { setTags(e.target.value) }}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product tags..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product price..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="dPrice"
                        value={dPrice}
                        onChange={(e) => { setDprice(e.target.value) }}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product price with discount..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(e) => { setStock(e.target.value) }}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name=""
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {images &&
                            images.map((i) => (
                                <img
                                    src={URL.createObjectURL(i)}
                                    key={i.lastModified}
                                    alt=""
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                    </div>
                    <br />
                    <div>
                        <label className="pb-2">
                            Event Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="price"
                            id="start-date"
                            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleStartDate}
                            min={today}
                            placeholder="Enter your event product stock..."
                        />
                    </div>
                    <br />
                    <div>
                        <label className="pb-2">
                            Event End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="price"
                            id="end-date"
                            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleEndDateChange}
                            min={minEndDate}
                            placeholder="Enter your event product stock..."
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Create"
                            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CreateEvent