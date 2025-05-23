import wedding_4 from '/images/wedding_4.webp';
import wedding_14 from '/images/wedding_14.webp';
import wedding_15 from '/images/wedding_15.webp';
import leaf_top from '/images/leaf_bottom.png';
import React from 'react';

const Gallary = () => {
    return (
        <div className="min-h-[100dvh] w-full bg-[#F9F6EE]">

            <div className="relative">
                {/* bg div */}
                <div className="absolute min-h-[100dvh] z-10 w-3/5 bg-[#EAD9C9]" />

                <div className="relative gap-3 md:gap-10 z-20 flex justify-between">
                    <div className='min-h-[100dvh] flex flex-col justify-center items-center'>
                        <img src={wedding_4} className='w-[350px] z-10' alt="" />
                        <img src={leaf_top} className='rotate-[rotate:-10deg] hidden md:block w-[150px] mt-[-100px]' alt="" />
                    </div>

                    <div className='min-h-[100dvh] flex flex-col justify-center space-y-10 items-center'>
                        <h1 className="text-[#787878] text-5xl mb-20">The Wedding Party</h1>
                        <img src={wedding_15} className='w-[800px]' alt="" />
                    </div>

                    <div className='min-h-[100dvh] flex flex-col justify-center items-center'>
                        <img src={wedding_14} className='w-[350px]' alt="" />
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Gallary;