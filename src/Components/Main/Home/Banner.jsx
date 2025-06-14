
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import banner_1 from '/images/banner_1.webp';
import wedding_4 from '/images/wedding_4.webp';
import banner_3 from '/images/banner_3.webp';
import banner_4 from '/images/banner_4.webp';
import banner_5 from '/images/banner_5.jpeg';
import banner_7 from '/images/banner_7.jpeg';
import banner_2 from '/images/banner_2.webp';
import bg_image from '/images/png-clipart-heart-hanging-from-a-tree-color-flowers-removebg-preview.png';
import corner from '/images/corner.png';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import underLineImg from '/images/underline_img2.png';


const Banner = () => {
    const pagination = {
        clickable: true,
    };
    return (
        <div className="w-full bg-[#EFEBD9] mt-11">

            <div
                className="flex justify-center text-center font-galada flex-col relative bg-no-repeat bg-contain pt-5">
                <img src={corner} className='size-[100px] object-contain absolute left-[2%] top-2' alt="" />
                <p className='capitalize font-semibold text-[#C3937C] text-[clamp(40px,8vw,96px)]'>Heaven marriage</p>
                <p className='capitalize font-semibold text-[#C3937C] text-3xl'>solutions</p>
                <p className='text-[clamp(18px,4vw,25px)] px-5 mt-3 font-galada'>
                    বিশুদ্ধতা, বিশ্বস্ততা ও সুন্নাহ-সম্মত বিবাহের নির্ভরযোগ্য প্রতিষ্ঠান
                </p>
                <img src={corner} className='size-[100px] object-contain absolute rotate-180 right-[2%] bottom-[50%]' alt="" />
                <img src={underLineImg} className='h-[30px] px-5 mb-5' alt="" />
            </div>



            {/* slide */}
            <div className="w-[90dvw] mx-auto h-[25dvh] md:h-[100dvh] md:min-h-screen">
                <div className='absolute w-[85dvw] mx-auto md:min-h-screen h-[25dvh] bg-black/5 z-10' />
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    pagination={pagination}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination]}
                    className="w-full rounded-2xl h-full"
                >
                    <SwiperSlide>
                        <img src={banner_5} alt="1" loading='lazy' className="w-full h-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={wedding_4} alt="2" loading='lazy' className="w-full h-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner_2} alt="2" loading='lazy' className="w-full h-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner_4} alt="2" loading='lazy' className="w-full h-full object-cover" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner_7} alt="2" loading='lazy' className="w-full h-full object-cover" />
                    </SwiperSlide>
                </Swiper>
            </div>


        </div>
    );
};

export default Banner;