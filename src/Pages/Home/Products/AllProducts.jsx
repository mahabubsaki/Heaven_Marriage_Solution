import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/Axios/useAxiosCommon";
import React from 'react';
import { Link } from "react-router-dom";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";


import banner_1 from '/images/banner_1.webp';
import banner_2 from '/images/banner_2.webp';
import banner_3 from '/images/banner_3.webp';
import banner_4 from '/images/banner_4.webp';
import { FaHome, FaOpencart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const AllProducts = () => {
    const axiosCommon = useAxiosCommon();

    const { data = [] } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/products');
            return data;
        }
    });

    return (
        <div className="p-5 space-y-5">
            <div className="max-h-screen overflow-y-auto relative">

                {/* bottom fixed menu bar */}
                <div className="fixed bg-white w-full flex justify-evenly bottom-0 left-0">

                    <Link to='/'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <FaHome className="text-2xl" /> Home
                            </span>
                        </div>
                    </Link>

                    <Link to='/cart'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <FaOpencart className="text-2xl" />Cart
                            </span>
                        </div>
                    </Link>

                    <Link to='/profile'>
                        <div className="pt-2">
                            <span className="flex flex-col justify-center items-center font-raleway">
                                <CgProfile className="text-2xl" />Profile
                            </span>
                        </div>
                    </Link>
                </div>

                <div className="relative flex flex-col py-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <img src={banner_1} className="size-[30px] object-cover rounded-full" alt="" />
                        <Link to='/' className="font-bold text-2xl text-left">Heaven Shop</Link>
                    </div>
                    <div className="flex justify-between gap-2">
                        <input type="text" placeholder="search" className="bg-white w-full outline-none border p-2 rounded-lg" />
                        <button className="bg-[#373B4D] text-white px-4 py-1 rounded">Search</button>
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

                <div className="">
                    <p className="font-bold text-xl font-lexend mt-2">Products:</p>
                    <div className="grid grid-cols-3 gap-5 mb-14">
                        {data?.map((got) => (
                            <Link to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col items-center rounded-lg shadow-md h-[105px] w-[80px] overflow-hidden"
                            >
                                <img
                                    src={got?.image}
                                    alt=""
                                    className="object-cover h-[70px] w-full"
                                />
                                <p className="text-center font-raleway font-semibold text-[10px] mt-1 px-1 h-[50px]">
                                    {got?.name.length > 8 ? got?.name.slice(0, 8) + "..." : got?.name}
                                </p>
                                <p className="text-[10px]">{got?.price}</p>
                            </Link>
                        ))}
                        {data?.map((got) => (
                            <Link to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col items-center rounded-lg shadow-md h-[105px] w-[80px] overflow-hidden"
                            >
                                <img
                                    src={got?.image}
                                    alt=""
                                    className="object-cover h-[70px] w-full"
                                />
                                <p className="text-center font-raleway font-semibold text-[10px] mt-1 px-1 h-[50px]">
                                    {got?.name.length > 8 ? got?.name.slice(0, 8) + "..." : got?.name}
                                </p>
                                <p className="text-[10px]">{got?.price}</p>
                            </Link>
                        ))}
                        {data?.map((got) => (
                            <Link to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col items-center rounded-lg shadow-md h-[105px] w-[80px] overflow-hidden"
                            >
                                <img
                                    src={got?.image}
                                    alt=""
                                    className="object-cover h-[70px] w-full"
                                />
                                <p className="text-center font-raleway font-semibold text-[10px] mt-1 px-1 h-[50px]">
                                    {got?.name.length > 8 ? got?.name.slice(0, 8) + "..." : got?.name}
                                </p>
                                <p className="text-[10px]">{got?.price}</p>
                            </Link>
                        ))}
                        {data?.map((got) => (
                            <Link to={`/product/${got?._id}`}
                                key={got?._id}
                                className="flex flex-col items-center rounded-lg shadow-md h-[105px] w-[80px] overflow-hidden"
                            >
                                <img
                                    src={got?.image}
                                    alt=""
                                    className="object-cover h-[70px] w-full"
                                />
                                <p className="text-center font-raleway font-semibold text-[10px] mt-1 px-1 h-[50px]">
                                    {got?.name.length > 8 ? got?.name.slice(0, 8) + "..." : got?.name}
                                </p>
                                <p className="text-[10px]">{got?.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>




        </div>
    );
};

export default AllProducts;