import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/Axios/useAxiosCommon";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { IoCall, IoReorderThreeSharp } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { BsFilterRight } from "react-icons/bs";

import banner_1 from '/images/shop_5.jpg';
import banner_2 from '/images/shop_6.jpg';
import banner_3 from '/images/shop_7.jpg';
import banner_4 from '/images/shop_8.jpg';
import { FaHome, FaOpencart, FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import CartSidebar from "../../../Components/Shared/Sidebar/CartSidebar";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import useAuth from "../../../Hooks/Auth/useAuth";
import FilterSortSidebar from "../../../Components/Shared/Sidebar/FilterSortSidebar";
import Loading from "../../Loading/Loading";


const AllProducts = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();


    // cart state
    const [CartIsOpen, setCartIsOpen] = useState(false);
    const [filterSortOpen, setFilterSortOpen] = useState(false);


    // filter and sort
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setFilter((prev) => [...prev, value]);
        } else {
            setFilter((prev) => prev.filter((v) => v !== value));
        }
    };

    // console.log(sort, filter);


    // get all cart data------------------------------------------------------------------------
    const { data: cartData = [], refetch, isLoading: cartLoading } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/cart/${user?.email}`);
            return data;
        }
    });



    // send query params to backend--------------------------------------------------------------
    const queryParams = new URLSearchParams();
    if (filter.length) queryParams.append('category', filter.join(','));
    if (sort) queryParams.append('sort', sort);
    if (search) queryParams.append('search', search);


    // all product data fetch
    const { data = [], isLoading } = useQuery({
        queryKey: ['allProduct', queryParams.toString()],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products?${queryParams.toString()}`);
            return data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchData = form.search.value;
        setSearch(searchData);
        form.reset();
    };

    if (loading || isLoading || cartLoading) return <Loading />;

    return (
        <div className="bg-gray-100">
            <div className="w-screen bg-[#FC8934] flex text-white py-2">
                <p className="w-[300px] mx-auto">আমাদের যেকোনো পন্য অর্ডার করতে কল বা হোয়াটসঅ্যাপ করুন: 01734874385</p>
            </div>

            <div className="max-h-screen overflow-y-auto relative px-3 pb-5">


                {/* cart */}
                <CartSidebar style={'top-0'} data={cartData} setIsOpen={setCartIsOpen} refetch={refetch} isOpen={CartIsOpen} />
                {/* filter sort side bar */}
                <FilterSortSidebar
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    handleCheckboxChange={handleCheckboxChange}
                    isOpen={filterSortOpen}
                    onClose={() => setFilterSortOpen(false)}
                    setSearch={setSearch}
                />


                {/* bottom fixed menu bar */}
                <div className="fixed bg-white w-full flex text-orange-400 justify-evenly bottom-0 left-0">

                    <Link to='/'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <FaHome className="text-2xl" /> Home
                            </span>
                        </div>
                    </Link>

                    <div className="pt-2">
                        <button onClick={() => setCartIsOpen(true)} className="flex flex-col justify-center items-center font-raleway">
                            <IoBag className="text-2xl" />Cart
                        </button>
                    </div>

                </div>

                <div className="relative flex justify-between items-center my-2 text-[#FC8934]">
                    <div className="flex items-center gap-2 ml-5 md:ml-0">
                        <img src="/images/shop_logo.png" alt="" className="size-[50px] object-cover" />
                        <div>
                            <p className="font-bold">Falah</p>
                            <p className="font-bold">Bazar</p>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <form onSubmit={handleSearch} className="relative">
                            <input type="text" name="search" className="w-[170px] border pl-2 pr-8 py-1 outline-none text-gray-600 border-orange-400 rounded-full h-[30px]" />
                            <button className="absolute right-3 top-2">
                                <FaMagnifyingGlass className="text-base" />
                            </button>
                        </form >
                        <button onClick={() => setFilterSortOpen(true)}>
                            <BsFilterRight className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* banner */}
                <div className="w-[85dvw] mx-auto h-[25dvh] md:h-[100dvh] my-1 md:min-h-screen">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        className="w-full rounded-xl h-full"
                    >
                        <SwiperSlide>
                            <img src={banner_1} alt="1" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_2} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_3} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={banner_4} alt="2" loading='lazy' className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>
                </div>


                {/* product card section */}
                <div className="">
                    <p className="font-bold text-xl my-4">সকল প্রডাক্ট</p>
                    <div className="grid grid-cols-2 gap-3 mb-14">
                        {data?.map((got) => (
                            <Link
                                to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col bg-white rounded p-3 shadow-md h-[350px] w-[165px] overflow-hidden border border-gray-200"
                            >
                                <img
                                    src={got?.images[0]}
                                    alt=""
                                    className="object-cover h-[120px] w-full"
                                />

                                <div className="flex flex-col flex-grow">
                                    <p className="text-xs text-orange-500 my-2">{got?.category}</p>
                                    <p className=" font-semibold">
                                        {got?.name.split(' ').slice(0, 3).join(' ')}
                                    </p>
                                    <div className="flex bg-slate-100 font-bold w-[60px] rounded">
                                        <p className="flex  items-center text-orange-400 border-r border-gray-300 p-1 gap-1">0<FaStar /> </p>
                                        <p className="flex items-center px-2">0</p>
                                    </div>
                                    <p className="text-red-600 font-semibold"> <span className=" font-mina">৳</span>{got?.discountedPrice}</p>
                                    <div className="flex gap-3 items-center">
                                        <p className="line-through text-gray-400"><span className=" font-mina">৳</span>{got?.price}</p>
                                        <p className="flex gap-3 bg-red-500 text-white px-2 rounded-lg">{got?.discount}% OFF</p>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <button className="p-2 border border-[#FC8934] text-[#FC8934] rounded-md"><IoBag /></button>
                                        <button className="px-2 bg-[#FC8934] text-white py-1 rounded w-full">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>


            </div>




        </div>
    );
};

export default AllProducts;