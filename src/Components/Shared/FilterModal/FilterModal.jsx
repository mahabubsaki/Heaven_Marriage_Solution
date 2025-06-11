import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import useRole from '../../../Hooks/Role/useRole';
import { FaSortDown } from "react-icons/fa";


const FilterModal = ({
    isOpen,
    setIsOpen,
    setMaritalStatus,
    setDistrict,
    setIncomeSource,
    setLowestAge,
    setHighestAge,
    handleFilterSubmit,
}) => {

    const { gender } = useRole();
    // console.log(gender);


    return (
        <AnimatePresence>
            <div>
                {isOpen && <div onClick={() => setIsOpen(!isOpen)} className="bg-black/30 min-h-screen w-screen fixed top-0 left-0" />}
                <motion.div
                    initial={{}}
                    animate={{ x: isOpen ? -330 : 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{
                        transition: { duration: 0.3 },
                    }}
                    className={`${isOpen ? 'fixed' : 'hidden'}  md:py-5 right-[-330px] top-0 w-4/5 min-h-[100dvh] md:w-64 bg-white shadow-lg flex justify-center items-center`}
                >
                    <button
                        onClick={() => setIsOpen(!open)}
                        className={`${isOpen ? 'absolute' : ''} p-4 text-xl md:text-2xl text-black right-2 md:right-10 top-5`}
                    >
                        <RxCross2 />
                    </button>

                    {/* filtering div */}
                    <div>
                        <p className='text-center font-semibold mb-5 pb-3 border-b border-black'>নিজ এলাকায় {gender === 'male' ? "পাত্রী" : "পাত্র "} খুজুঁন</p>


                        {/* বৈবাহিক অবস্থা */}
                        <div>
                            <div className="mb-2">
                                <label className="block text-justify font-bold">বৈবাহিক অবস্থা</label>
                                <select
                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                    className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                >
                                    <option disabled selected className='' value="">বৈবাহিক অবস্থা নির্বাচন করুন</option>
                                    {/* for men */}
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="অবিবাহিতা (বাকেরা)">অবিবাহিতা (বাকেরা)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="ডিভোর্স্ড (সন্তানসহ )">ডিভোর্স্ড (সন্তানসহ )</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="ডিভোর্স্ড (সন্তান ছাড়া )">ডিভোর্স্ড (সন্তান ছাড়া )</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিধবা (সন্তানসহ)">বিধবা (সন্তানসহ)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিধবা (সন্তানছাড়া)">বিধবা (সন্তানছাড়া)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিবাহিত ( তিনজন স্ত্রী রয়েছে)">বিবাহিত ( তিনজন স্ত্রী রয়েছে)</option>

                                    {/* for woman */}
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="অবিবাহিতা (বাকেরা)">অবিবাহিতা (বাকেরা)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="ডিভোর্স্ড (সন্তানসহ )">ডিভোর্স্ড (সন্তানসহ )</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="ডিভোর্স্ড (সন্তান ছাড়া )">ডিভোর্স্ড (সন্তান ছাড়া )</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="বিধবা (সন্তানসহ)">বিধবা (সন্তানসহ)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="বিধবা (সন্তানছাড়া)">বিধবা (সন্তানছাড়া)</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'}`} value="খুনছা (মেয়ে হিজড়া)">খুনছা (মেয়ে হিজড়া)</option>
                                </select>
                            </div>


                            {/* জেলা */}
                            <div className="mb-4">
                                <label className="block font-semibold text-justify">জেলা</label>
                                <select
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                >
                                    <option disabled selected value="">জেলা নির্বাচন করুন</option>
                                    <option className="bg-[#F9F6EE]" value="ঢাকা">    ঢাকা</option>
                                    <option className="bg-[#F9F6EE]" value="গাজীপুর">  গাজীপুর</option>
                                    <option className="bg-[#F9F6EE]" value="নারায়ণগঞ্জ">   নারায়ণগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="টাঙ্গাইল"> টাঙ্গাইল</option>
                                    <option className="bg-[#F9F6EE]" value="কিশোরগঞ্জ">    কিশোরগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="মানিকগঞ্জ">    মানিকগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="মুন্সিগঞ্জ">    মুন্সিগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="রাজবাড়ী">  রাজবাড়ী</option>
                                    <option className="bg-[#F9F6EE]" value="মাদারীপুর"> মাদারীপুর</option>
                                    <option className="bg-[#F9F6EE]" value="শরীয়তপুর">    শরীয়তপুর</option>
                                    <option className="bg-[#F9F6EE]" value="গোপালগঞ্জ">    গোপালগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="ফরিদপুর"> ফরিদপুর</option>
                                    <option className="bg-[#F9F6EE]" value="নরসিংদী">  নরসিংদী</option>
                                    <option className="bg-[#F9F6EE]" value="চট্টগ্রাম">    চট্টগ্রাম</option>
                                    <option className="bg-[#F9F6EE]" value="কক্সবাজার">    কক্সবাজার</option>
                                    <option className="bg-[#F9F6EE]" value="বান্দরবান">    বান্দরবান</option>
                                    <option className="bg-[#F9F6EE]" value="রাঙ্গামাটি"> রাঙ্গামাটি</option>
                                    <option className="bg-[#F9F6EE]" value="খাগড়াছড়ি"> খাগড়াছড়ি</option>
                                    <option className="bg-[#F9F6EE]" value="নোয়াখালী">  নোয়াখালী</option>
                                    <option className="bg-[#F9F6EE]" value="লক্ষ্মীপুর">    লক্ষ্মীপুর</option>
                                    <option className="bg-[#F9F6EE]" value="ফেনী">    ফেনী</option>
                                    <option className="bg-[#F9F6EE]" value="চাঁদপুর">  চাঁদপুর</option>
                                    <option className="bg-[#F9F6EE]" value="ব্রাহ্মণবাড়িয়া">  ব্রাহ্মণবাড়িয়া</option>
                                    <option className="bg-[#F9F6EE]" value="কুমিল্লা">  কুমিল্লা</option>
                                    <option className="bg-[#F9F6EE]" value="ময়মনসিংহ">    ময়মনসিংহ</option>
                                    <option className="bg-[#F9F6EE]" value="জামালপুর"> জামালপুর</option>
                                    <option className="bg-[#F9F6EE]" value="নেত্রকোনা"> নেত্রকোনা</option>
                                    <option className="bg-[#F9F6EE]" value="শেরপুর">  শেরপুর</option>
                                    <option className="bg-[#F9F6EE]" value="রাজশাহী">  রাজশাহী</option>
                                    <option className="bg-[#F9F6EE]" value="নাটোর">   নাটোর</option>
                                    <option className="bg-[#F9F6EE]" value="নওগাঁ">   নওগাঁ</option>
                                    <option className="bg-[#F9F6EE]" value="চাঁপাইনবাবগঞ্জ"> চাঁপাইনবাবগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="জয়পুরহাট">    জয়পুরহাট</option>
                                    <option className="bg-[#F9F6EE]" value="বগুড়া">   বগুড়া</option>
                                    <option className="bg-[#F9F6EE]" value="পাবনা">   পাবনা</option>
                                    <option className="bg-[#F9F6EE]" value="সিরাজগঞ্জ">    সিরাজগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="খুলনা">   খুলনা</option>
                                    <option className="bg-[#F9F6EE]" value="যশোর">   যশোর</option>
                                    <option className="bg-[#F9F6EE]" value="চুয়াডাঙ্গা"> চুয়াডাঙ্গা</option>
                                    <option className="bg-[#F9F6EE]" value="মেহেরপুর"> মেহেরপুর</option>
                                    <option className="bg-[#F9F6EE]" value="নড়াইল">  নড়াইল</option>
                                    <option className="bg-[#F9F6EE]" value="বাগেরহাট"> বাগেরহাট</option>
                                    <option className="bg-[#F9F6EE]" value="ঝিনাইদহ"> ঝিনাইদহ</option>
                                    <option className="bg-[#F9F6EE]" value="কুষ্টিয়া">  কুষ্টিয়া</option>
                                    <option className="bg-[#F9F6EE]" value="সাতক্ষীরা"> সাতক্ষীরা</option>
                                    <option className="bg-[#F9F6EE]" value="বরিশাল">  বরিশাল</option>
                                    <option className="bg-[#F9F6EE]" value="ভোলা">    ভোলা</option>
                                    <option className="bg-[#F9F6EE]" value="পটুয়াখালী"> পটুয়াখালী</option>
                                    <option className="bg-[#F9F6EE]" value="ঝালকাঠি">  ঝালকাঠি</option>
                                    <option className="bg-[#F9F6EE]" value="পিরোজপুর"> পিরোজপুর</option>
                                    <option className="bg-[#F9F6EE]" value="বরগুনা">  বরগুনা</option>
                                    <option className="bg-[#F9F6EE]" value="সিলেট">   সিলেট</option>
                                    <option className="bg-[#F9F6EE]" value="মৌলভীবাজার">    মৌলভীবাজার</option>
                                    <option className="bg-[#F9F6EE]" value="হবিগঞ্জ"> হবিগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="সুনামগঞ্জ">    সুনামগঞ্জ</option>
                                    <option className="bg-[#F9F6EE]" value="রংপুর">   রংপুর</option>
                                    <option className="bg-[#F9F6EE]" value="দিনাজপুর"> দিনাজপুর</option>
                                    <option className="bg-[#F9F6EE]" value="ঠাকুরগাঁও"> ঠাকুরগাঁও</option>
                                    <option className="bg-[#F9F6EE]" value="পঞ্চগড়"> পঞ্চগড়</option>
                                    <option className="bg-[#F9F6EE]" value="নীলফামারী"> নীলফামারী</option>
                                    <option className="bg-[#F9F6EE]" value="কুড়িগ্রাম"> কুড়িগ্রাম</option>
                                    <option className="bg-[#F9F6EE]" value="গাইবান্ধা"> গাইবান্ধা</option>
                                    <option className="bg-[#F9F6EE]" value="লালমনিরহাট">   লালমনিরহাট</option>

                                </select>
                            </div>


                            {/* পেশা */}
                            <div className="mb-4">
                                <label className="block font-semibold text-justify">পেশা</label>
                                <select
                                    onChange={(e) => setIncomeSource(e.target.value)}
                                    name="income_source"
                                    className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                >
                                    <option disabled selected value="">পেশা নির্বাচন করুন</option>
                                    {/* for men */}
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="ব্যবসা">ব্যবসা</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="চাকরি">চাকরি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="কৃষি">কৃষি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="প্রবাস">প্রবাস</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="ফ্রিল্যান্স">ফ্রিল্যান্স</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="শিক্ষক">শিক্ষক</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="কারিগরি">কারিগরি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="আয় নেই">আয় নেই</option>

                                    {/* for woman */}
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="চাকরি">চাকরি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="ব্যবসা">ব্যবসা</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="ফ্রিল্যান্স">ফ্রিল্যান্স</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="টিউশনি">টিউশনি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="সেলাই">সেলাই</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="কৃষি">কৃষি</option>
                                    <option className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="আয় নেই">আয় নেই</option>
                                </select>
                            </div>


                            {/* বয়স */}
                            <div className="mb-4">


                                <div className='flex gap-2 flex-row'>
                                    <div>
                                        <label className="block font-semibold text-justify">ন্যূনতম বয়স</label>
                                        <select
                                            onChange={(e) => setLowestAge(e.target.value)}
                                            name="ageDifference"
                                            className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                        >
                                            <option disabled selected value="">সর্বনিম্ন বয়স</option>
                                            {Array.from({ length: 43 }, (_, i) => {
                                                const age = 18 + i;
                                                const banglaNumbers = age.toString().split('').map(d =>
                                                    ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'][+d]
                                                ).join('');
                                                return <option key={age} className="bg-[#F9F6EE]" value={age}>{banglaNumbers} বছর</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-justify">সর্বোচ্চ বয়স</label>
                                        <select
                                            onChange={(e) => setHighestAge(e.target.value)}
                                            name="ageDifference"
                                            className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                        >
                                            <option disabled selected value="">সর্বোচ্চ বয়স</option>
                                            {Array.from({ length: 43 }, (_, i) => {
                                                const age = 18 + i;
                                                const banglaNumbers = age.toString().split('').map(d =>
                                                    ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'][+d]
                                                ).join('');
                                                return <option key={age} className="bg-[#F9F6EE]" value={age}>{banglaNumbers} বছর</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <button onClick={handleFilterSubmit} className='px-4 py-1 w-[150px]
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300'>অনুসন্ধান</button>
                        </div>



                    </div>


                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FilterModal;