import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import useRole from '../../../Hooks/Role/useRole';
import { FaSortDown } from "react-icons/fa";


const FilterModal = ({
    isOpen,
    setIsOpen,
    maritalStatus,
    setMaritalStatus,
    district,
    setDistrict,
    income_source,
    setIncomeSource,
    ageDifferance,
    setAgeDifferance,
    handleFilterSubmit,
    setSearch,
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
                                    <option selected={maritalStatus === "অবিবাহিতা (বাকেরা)"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="অবিবাহিতা (বাকেরা)">অবিবাহিতা (বাকেরা)</option>
                                    <option selected={maritalStatus === "ডিভোর্স্ড (সন্তানসহ )"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="ডিভোর্স্ড (সন্তানসহ )">ডিভোর্স্ড (সন্তানসহ )</option>
                                    <option selected={maritalStatus === "ডিভোর্স্ড (সন্তান ছাড়া )"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="ডিভোর্স্ড (সন্তান ছাড়া )">ডিভোর্স্ড (সন্তান ছাড়া )</option>
                                    <option selected={maritalStatus === "বিধবা (সন্তানসহ)"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিধবা (সন্তানসহ)">বিধবা (সন্তানসহ)</option>
                                    <option selected={maritalStatus === "বিধবা (সন্তানছাড়া)"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিধবা (সন্তানছাড়া)">বিধবা (সন্তানছাড়া)</option>
                                    <option selected={maritalStatus === "বিবাহিত ( তিনজন স্ত্রী রয়েছে)"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'}`} value="বিবাহিত ( তিনজন স্ত্রী রয়েছে)">বিবাহিত ( তিনজন স্ত্রী রয়েছে)</option>

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
                                    <option selected={district === "ঢাকা"} className="bg-[#F9F6EE]" value="ঢাকা">    ঢাকা</option>
                                    <option selected={district === "গাজীপুর"} className="bg-[#F9F6EE]" value="গাজীপুর">  গাজীপুর</option>
                                    <option selected={district === "নারায়ণগঞ্জ"} className="bg-[#F9F6EE]" value="নারায়ণগঞ্জ">   নারায়ণগঞ্জ</option>
                                    <option selected={district === "টাঙ্গাইল"} className="bg-[#F9F6EE]" value="টাঙ্গাইল"> টাঙ্গাইল</option>
                                    <option selected={district === "কিশোরগঞ্জ"} className="bg-[#F9F6EE]" value="কিশোরগঞ্জ">    কিশোরগঞ্জ</option>
                                    <option selected={district === "মানিকগঞ্জ"} className="bg-[#F9F6EE]" value="মানিকগঞ্জ">    মানিকগঞ্জ</option>
                                    <option selected={district === "মুন্সিগঞ্জ"} className="bg-[#F9F6EE]" value="মুন্সিগঞ্জ">    মুন্সিগঞ্জ</option>
                                    <option selected={district === "রাজবাড়ী"} className="bg-[#F9F6EE]" value="রাজবাড়ী">  রাজবাড়ী</option>
                                    <option selected={district === "মাদারীপুর"} className="bg-[#F9F6EE]" value="মাদারীপুর"> মাদারীপুর</option>
                                    <option selected={district === "শরীয়তপুর"} className="bg-[#F9F6EE]" value="শরীয়তপুর">    শরীয়তপুর</option>
                                    <option selected={district === "গোপালগঞ্জ"} className="bg-[#F9F6EE]" value="গোপালগঞ্জ">    গোপালগঞ্জ</option>
                                    <option selected={district === "ফরিদপুর"} className="bg-[#F9F6EE]" value="ফরিদপুর"> ফরিদপুর</option>
                                    <option selected={district === "নরসিংদী"} className="bg-[#F9F6EE]" value="নরসিংদী">  নরসিংদী</option>
                                    <option selected={district === "চট্টগ্রাম"} className="bg-[#F9F6EE]" value="চট্টগ্রাম">    চট্টগ্রাম</option>
                                    <option selected={district === "কক্সবাজার"} className="bg-[#F9F6EE]" value="কক্সবাজার">    কক্সবাজার</option>
                                    <option selected={district === "বান্দরবান"} className="bg-[#F9F6EE]" value="বান্দরবান">    বান্দরবান</option>
                                    <option selected={district === "রাঙ্গামাটি"} className="bg-[#F9F6EE]" value="রাঙ্গামাটি"> রাঙ্গামাটি</option>
                                    <option selected={district === "খাগড়াছড়ি"} className="bg-[#F9F6EE]" value="খাগড়াছড়ি"> খাগড়াছড়ি</option>
                                    <option selected={district === "নোয়াখালী"} className="bg-[#F9F6EE]" value="নোয়াখালী">  নোয়াখালী</option>
                                    <option selected={district === "লক্ষ্মীপুর"} className="bg-[#F9F6EE]" value="লক্ষ্মীপুর">    লক্ষ্মীপুর</option>
                                    <option selected={district === "ফেনী"} className="bg-[#F9F6EE]" value="ফেনী">    ফেনী</option>
                                    <option selected={district === "চাঁদপুর"} className="bg-[#F9F6EE]" value="চাঁদপুর">  চাঁদপুর</option>
                                    <option selected={district === "ব্রাহ্মণবাড়িয়া"} className="bg-[#F9F6EE]" value="ব্রাহ্মণবাড়িয়া">  ব্রাহ্মণবাড়িয়া</option>
                                    <option selected={district === "কুমিল্লা"} className="bg-[#F9F6EE]" value="কুমিল্লা">  কুমিল্লা</option>
                                    <option selected={district === "ময়মনসিংহ"} className="bg-[#F9F6EE]" value="ময়মনসিংহ">    ময়মনসিংহ</option>
                                    <option selected={district === "জামালপুর"} className="bg-[#F9F6EE]" value="জামালপুর"> জামালপুর</option>
                                    <option selected={district === "নেত্রকোনা"} className="bg-[#F9F6EE]" value="নেত্রকোনা"> নেত্রকোনা</option>
                                    <option selected={district === "শেরপুর"} className="bg-[#F9F6EE]" value="শেরপুর">  শেরপুর</option>
                                    <option selected={district === "রাজশাহী"} className="bg-[#F9F6EE]" value="রাজশাহী">  রাজশাহী</option>
                                    <option selected={district === "নাটোর"} className="bg-[#F9F6EE]" value="নাটোর">   নাটোর</option>
                                    <option selected={district === "নওগাঁ"} className="bg-[#F9F6EE]" value="নওগাঁ">   নওগাঁ</option>
                                    <option selected={district === "চাঁপাইনবাবগঞ্জ"} className="bg-[#F9F6EE]" value="চাঁপাইনবাবগঞ্জ"> চাঁপাইনবাবগঞ্জ</option>
                                    <option selected={district === "জয়পুরহাট"} className="bg-[#F9F6EE]" value="জয়পুরহাট">    জয়পুরহাট</option>
                                    <option selected={district === "বগুড়া"} className="bg-[#F9F6EE]" value="বগুড়া">   বগুড়া</option>
                                    <option selected={district === "পাবনা"} className="bg-[#F9F6EE]" value="পাবনা">   পাবনা</option>
                                    <option selected={district === "সিরাজগঞ্জ"} className="bg-[#F9F6EE]" value="সিরাজগঞ্জ">    সিরাজগঞ্জ</option>
                                    <option selected={district === "খুলনা"} className="bg-[#F9F6EE]" value="খুলনা">   খুলনা</option>
                                    <option selected={district === "যশোর"} className="bg-[#F9F6EE]" value="যশোর">   যশোর</option>
                                    <option selected={district === "চুয়াডাঙ্গা"} className="bg-[#F9F6EE]" value="চুয়াডাঙ্গা"> চুয়াডাঙ্গা</option>
                                    <option selected={district === "মেহেরপুর"} className="bg-[#F9F6EE]" value="মেহেরপুর"> মেহেরপুর</option>
                                    <option selected={district === "নড়াইল"} className="bg-[#F9F6EE]" value="নড়াইল">  নড়াইল</option>
                                    <option selected={district === "বাগেরহাট"} className="bg-[#F9F6EE]" value="বাগেরহাট"> বাগেরহাট</option>
                                    <option selected={district === "ঝিনাইদহ"} className="bg-[#F9F6EE]" value="ঝিনাইদহ"> ঝিনাইদহ</option>
                                    <option selected={district === "কুষ্টিয়া"} className="bg-[#F9F6EE]" value="কুষ্টিয়া">  কুষ্টিয়া</option>
                                    <option selected={district === "সাতক্ষীরা"} className="bg-[#F9F6EE]" value="সাতক্ষীরা"> সাতক্ষীরা</option>
                                    <option selected={district === "বরিশাল"} className="bg-[#F9F6EE]" value="বরিশাল">  বরিশাল</option>
                                    <option selected={district === "ভোলা"} className="bg-[#F9F6EE]" value="ভোলা">    ভোলা</option>
                                    <option selected={district === "পটুয়াখালী"} className="bg-[#F9F6EE]" value="পটুয়াখালী"> পটুয়াখালী</option>
                                    <option selected={district === "ঝালকাঠি"} className="bg-[#F9F6EE]" value="ঝালকাঠি">  ঝালকাঠি</option>
                                    <option selected={district === "পিরোজপুর"} className="bg-[#F9F6EE]" value="পিরোজপুর"> পিরোজপুর</option>
                                    <option selected={district === "বরগুনা"} className="bg-[#F9F6EE]" value="বরগুনা">  বরগুনা</option>
                                    <option selected={district === "সিলেট"} className="bg-[#F9F6EE]" value="সিলেট">   সিলেট</option>
                                    <option selected={district === "মৌলভীবাজার"} className="bg-[#F9F6EE]" value="মৌলভীবাজার">    মৌলভীবাজার</option>
                                    <option selected={district === "হবিগঞ্জ"} className="bg-[#F9F6EE]" value="হবিগঞ্জ"> হবিগঞ্জ</option>
                                    <option selected={district === "সুনামগঞ্জ"} className="bg-[#F9F6EE]" value="সুনামগঞ্জ">    সুনামগঞ্জ</option>
                                    <option selected={district === "রংপুর"} className="bg-[#F9F6EE]" value="রংপুর">   রংপুর</option>
                                    <option selected={district === "দিনাজপুর"} className="bg-[#F9F6EE]" value="দিনাজপুর"> দিনাজপুর</option>
                                    <option selected={district === "ঠাকুরগাঁও"} className="bg-[#F9F6EE]" value="ঠাকুরগাঁও"> ঠাকুরগাঁও</option>
                                    <option selected={district === "পঞ্চগড়"} className="bg-[#F9F6EE]" value="পঞ্চগড়"> পঞ্চগড়</option>
                                    <option selected={district === "নীলফামারী"} className="bg-[#F9F6EE]" value="নীলফামারী"> নীলফামারী</option>
                                    <option selected={district === "কুড়িগ্রাম"} className="bg-[#F9F6EE]" value="কুড়িগ্রাম"> কুড়িগ্রাম</option>
                                    <option selected={district === "গাইবান্ধা"} className="bg-[#F9F6EE]" value="গাইবান্ধা"> গাইবান্ধা</option>
                                    <option selected={district === "লালমনিরহাট"} className="bg-[#F9F6EE]" value="লালমনিরহাট">   লালমনিরহাট</option>

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
                                    <option selected={income_source === "ব্যবসা"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="ব্যবসা">ব্যবসা</option>
                                    <option selected={income_source === "চাকরি"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="চাকরি">চাকরি</option>
                                    <option selected={income_source === "কৃষি"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="কৃষি">কৃষি</option>
                                    <option selected={income_source === "প্রবাস"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="প্রবাস">প্রবাস</option>
                                    <option selected={income_source === "ফ্রিল্যান্স"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="ফ্রিল্যান্স">ফ্রিল্যান্স</option>
                                    <option selected={income_source === "শিক্ষক"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="শিক্ষক">শিক্ষক</option>
                                    <option selected={income_source === "কারিগরি"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="কারিগরি">কারিগরি</option>
                                    <option selected={income_source === "আয় নেই"} className={`bg-[#F9F6EE] ${gender === 'male' && 'hidden'} `} value="আয় নেই">আয় নেই</option>

                                    {/* for woman */}
                                    <option selected={income_source === "ব্যবসা"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="ব্যবসা">ব্যবসা</option>
                                    <option selected={income_source === "চাকরি"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="চাকরি">চাকরি</option>
                                    <option selected={income_source === "ফ্রিল্যান্স"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="ফ্রিল্যান্স">ফ্রিল্যান্স</option>
                                    <option selected={income_source === "টিউশনি"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="টিউশনি">টিউশনি</option>
                                    <option selected={income_source === "সেলাই"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="সেলাই">সেলাই</option>
                                    <option selected={income_source === "কৃষি"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="কৃষি">কৃষি</option>
                                    <option selected={income_source === "আয় নেই"} className={`bg-[#F9F6EE] ${gender === 'female' && 'hidden'} `} value="আয় নেই">আয় নেই</option>
                                </select>
                            </div>


                            {/* বয়স */}
                            <div className="mb-4">


                                <div className='flex gap-2 flex-row'>
                                    <div>
                                        <label className="block font-semibold text-justify">আপনার পছন্দের নির্বাচন করুন</label>
                                        <select
                                            onChange={(e) => setAgeDifferance(e.target.value)}
                                            name="ageDifference"
                                            className="px-5 cursor-pointer text-sm w-full md:w-3/4 mt-1 h-10  border appearance-none border-gray-300 text-gray-500 rounded outline-none"
                                        >
                                            <option disabled selected value="">বয়স</option>
                                            <option selected={ageDifferance === "18 - 23"} value="18-23">18-23</option>
                                            <option selected={ageDifferance === "23 - 28"} value="23-28">23-28</option>
                                            <option selected={ageDifferance === "28 - 33"} value="28-33">28-33</option>
                                            <option selected={ageDifferance === "33 - 38"} value="33-38">33-38</option>
                                            <option selected={ageDifferance === "38 - 43"} value="38-43">38-43</option>
                                            <option selected={ageDifferance === "43 - 48"} value="43-48">43-48</option>
                                            <option selected={ageDifferance === "48 - 53"} value="48-53">48-53</option>
                                            <option selected={ageDifferance === "53 - 60"} value="53-60">53-60</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className='flex justify-center items-center gap-5'>
                            <button onClick={() => {
                                setDistrict('');
                                setAgeDifferance('');
                                setIncomeSource('');
                                setMaritalStatus('');
                                setSearch('');
                            }} className='px-4 py-1 
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300'>পরিষ্কার</button>
                        </div>



                    </div>


                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FilterModal;