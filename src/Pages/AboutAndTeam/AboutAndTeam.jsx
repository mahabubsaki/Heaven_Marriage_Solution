import React from 'react';
import underLineImg from '/images/underline_img2.png';

import Navbar from '../../Components/Shared/Navbar/Navbar';
import TeamCard from '../../Components/Shared/Card/TeamCard';


const AboutAndTeam = () => {
    return (
        <div className='min-h-[100dvh] w-full'>
            {/* navbar section */}
            <div>
                <div>
                    <h1 className="text-2xl font-bold text-[#C3937C] p-2    ">Heaven Marriage</h1>
                </div>
                <Navbar />
            </div>

            <div className='mt-14 px-4 space-y-3'>
                {/* মুহতারাম/মুহতারামা! intro */}
                <div className='text-justify'>
                    <p className='text-center text-xl font-galada text-[#C3937C]'>মুহতারাম / মুহতারামা!  </p>
                    <img className='h-[30px] object-contain -mt-3 w-[300px]' src={underLineImg} alt="" />
                    <p className='text-sm'>আসসালামু আলাইকুম। আপনারা ইতিপূর্বে অবগত আছেন যে HMS কোনো সাধারণ ঘটকালি প্রতিষ্ঠান নয়। এটি ইসলামী শরিয়াহ-সম্মত দাওয়াতী প্ল্যাটফর্ম, যেখানে বিবাহ, তালাক ও দাম্পত্য জীবনের শরয়ী সমাধান প্রদান করা হয়। আমরা কেবল বিবাহ সম্পন্ন করাই না, বরং একটি সুখী, বরকতময় ও টেকসই দাম্পত্য জীবন গঠনে সহায়তা করি। আমাদের লক্ষ্য ইসলামী অনুশাসন মেনে বিবাহকে সহজ করা, হারাম থেকে বাঁচানো এবং সুন্নাহ অনুযায়ী পরিবার গঠন করা।</p>
                </div>

                {/* HMS এর পরিচিতি  */}
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-center text-xl font-galada text-[#C3937C]'>HMS এর পরিচিতি </p>
                    <img className='h-[30px] object-contain -mt-3 w-[300px]' src={underLineImg} alt="" />
                    <p className='text-justify text-sm'>HMS কোনো সাধারণ ঘটকালি প্রতিষ্ঠান নয়। এটি ইসলামী শরিয়াহ-সম্মত দাওয়াতী প্ল্যাটফর্ম, যেখানে বিবাহ, তালাক ও দাম্পত্য জীবনের শরয়ী সমাধান প্রদান করা হয়। আমরা কেবল বিবাহ সম্পন্ন করাই না, বরং একটি সুখী, বরকতময় ও টেকসই দাম্পত্য জীবন গঠনে সহায়তা করি। আমাদের লক্ষ্য ইসলামী অনুশাসন মেনে বিবাহকে সহজ করা, হারাম থেকে বাঁচানো এবং সুন্নাহ অনুযায়ী পরিবার গঠন করা।</p>
                </div>

                {/* HMS এর লক্ষ্য ও উদ্দেশ্যঃ */}
                <div className=''>
                    <p className='text-center text-xl font-galada text-[#C3937C]'>HMS এর লক্ষ্য ও উদ্দেশ্যঃ</p>
                    <img className='h-[30px] object-contain -mt-3 w-[300px]' src={underLineImg} alt="" />
                    <p className='text-sm'>HMS কোনো প্রচলিত ঘটক অফিস নয়। এটা এমন একটি ঈমানদারী ও সুন্নাহভিত্তিক প্ল্যাটফর্ম, যেখানে আমরা:</p>
                    <ul className='list-disc pl-12 text-justify space-y-1 text-sm'>
                        <li> HMS – Heaven Marriage Solutions হালাল ভালোবাসার পথে এক বিশ্বস্ত রাহবার</li>
                        <li> “বিয়ে শুধু সম্পর্ক নয়, এটা সুন্নাহ। ভালোবাসা শুধু আবেগ নয়, এটা ইবাদত।”</li>
                        <li>সময়মতো হালাল সম্পর্ক গড়তে সহায়তা করি যেন যুবক-যুবতীরা হারামের আগুনে পুড়ে না যায়, বরং জান্নাতের পথে হাঁটতে পারে।</li>
                        <li>সুন্নাহসম্মত বিবাহের সংস্কৃতি গড়ে তুলি সহজ, স্বচ্ছ ও শরীয়াহভিত্তিক পদ্ধতিতে বিয়েকে ফিরিয়ে আনি মূলধারায়।</li>
                        <li>অবহেলিত ও একাকী নারীদের পাশে দাঁড়াই বিধবা, ডিভোর্সি, এতিমা, অসুন্দরী কিংবা বয়সী—সব নারীর জন্য সম্মানজনক বিবাহের ব্যবস্থা করি।</li>
                        <li>একাধিক বিবাহে শরঈ সাহস ও ভারসাম্য তৈরি করি, যে ভাইরা ন্যায় ও ইনসাফের সাথে মাসনা করতে চায়—তাদেরকে প্রফেশনাল শরয়ী গাইডলাইন দিই।</li>
                        <li>হারাম প্রেম ও অবৈধ সম্পর্ক থেকে বাঁচাতে সচেষ্ট থাকি, যুব সমাজকে প্রেমের নামে ফিতনা থেকে রক্ষা করে হালাল পথে সুন্দর জীবন গড়তে দাওয়াত দিই।</li>
                        <li>ইসলামি দৃষ্টিকোণ থেকে দাম্পত্য রাহনুমায়ী করি</li>
                    </ul>
                </div>


                {/*HMS এর কর্মকতাগণ  */}
                <div>
                    <TeamCard />
                </div>

            </div>
        </div>
    );
};

export default AboutAndTeam;