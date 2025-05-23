import BoxContent from "../../TextAnimations/BoxContent";
import stars from '/images/stars.png';
import leaf_top from '/images/leaf_top.png';
import leaf_bottom from '/images/leaf_bottom.png';
import useScreenSize from "../../../Hooks/ScreenSize/useScreenSize";
import BlackButton from "../Buttons/BlackButton";
import { Link } from "react-router-dom";
import React from 'react';



const ImgText = ({ heading, subHeading, lists, main_img, sub_img, reverse, btn, btnText, to }) => {

    const { width } = useScreenSize();
    const newWidth = width / 7.70;
    const newHeight = width / 5.5;



    return (
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 `}>
            <div className="lg:max-w-[60%] w-full relative">


                {/* image div */}
                <div className="">

                    {/* main image */}
                    <div>
                        <img src={main_img} className=" h-[250px] rounded-br-[150px] md:h-[600px] object-cover " alt="" />
                    </div>
                    {/* styles of the image */}
                    <div>
                        <img loading="lazy" src={stars} className="absolute size-[300px] top-[-180px] left-[-130px] object-contain" alt="" />
                        <img loading="lazy" src={stars} className="absolute size-[300px] top-[-150px] left-[-100px] object-contain" alt="" />
                        <img loading="lazy" src={leaf_top} className="absolute size-[200px] top-[-70px] left-[-50px] object-contain" alt="" />
                    </div>

                    {/* borders */}
                    <div className="absolute top-0 left-0 w-1/4 border-t-4 border-[#C3937C]"></div>
                    <div className="absolute top-0 left-0 h-1/4 border-l-4 border-[#C3937C]"></div>


                    {/* secondary image and design */}
                    <div>
                        {/* design */}
                        <img loading="lazy" src={leaf_bottom} className="hidden lg:block lg:absolute size-[200px] bottom-[275px] right-[20px] rotate-[rotate:290deg] object-contain" alt="" />
                        <img loading="lazy" src={stars} className="hidden lg:block lg:absolute size-[300px] lg:bottom-[13%] lg:right-[-2%] object-contain" alt="" />
                        {/* secondary img for smaller screen */}
                        <img
                            loading="lazy"
                            src={sub_img}
                            className={`lg:hidden h-[150px] md:h-[300px] absolute right-[-10%] bottom-[-20%] shadow-2xl  object-cover `} alt="" />
                        {/* secondary img for larger screen screen */}
                        <img
                            loading="lazy"
                            src={sub_img}
                            style={{ width: `${newWidth}px`, height: `${newHeight}px` }}
                            className={`hidden lg:block lg:absolute h-[320px] left-[50%] bottom-[200px] shadow-2xl  object-cover `} alt="" />
                    </div>


                </div>

            </div>

            {/* text div */}
            <div className="lg:max-w-[40%] w-full">
                <div className="my-10 space-y-10">
                    <BoxContent lists={lists} heading={heading} subHeading={subHeading} />
                    {
                        btn &&
                        <Link to={to}>
                            <p className="text-center py-2 mt-2 mb-16
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 font-semibold rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300 font-galada">{btnText}</p>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default ImgText;