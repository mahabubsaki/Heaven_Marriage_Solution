import React, { use } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const GirlsVerified = () => {
    const path = useLocation()
    console.log(path);
    

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2    ">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className={`${path?.pathname === '/girls_verified' && 'px-10 mt-12'} `}>
                <div className="space-y-4 py-6 font-galada text-gray-800 text-justify">
                    {/* <p className="text-xl font-semibold text-green-600">Thank You মোহতারিমা। ফরম সাবমিশনের জন্য আপনাকে ধন্যবাদ!</p>

                    <p>আলহামদুলিল্লাহ, মোহতারিমা! আপনার প্রদত্ত তথ্য আমরা সফলভাবে গ্রহণ করেছি।</p>
                    <p>জাযাকুমুল্লাহু খাইর — আপনার আস্থা ও আন্তরিক সহযোগিতার জন্য।</p>

                    <p className="font-medium">বর্তমানে আপনার তথ্য যাচাই-বাছাই প্রক্রিয়াধীন রয়েছে।</p>
                    <p>ইনশাআল্লাহ, আমাদের টিম <span className="font-semibold text-blue-600">১ থেকে ৪৮ ঘণ্টার মধ্যে</span> আপনাকে রিপ্লাই প্রদান করবে।</p>
                    <p className="text-yellow-700">এই সময়ের মধ্যে সাড়া না পেলেও অনুগ্রহ করে উদ্বিগ্ন হবেন না — আমরা যথাসময়ে আপনাকে আপডেট জানাবো।</p>

                    <p className="pt-2">একবার ভেরিফিকেশন সম্পন্ন হয়ে গেলে, আপনি HMS-এর পরবর্তী কার্যক্রমে সম্পূর্ণভাবে অংশগ্রহণ করতে পারবেন।</p>
                    <p>আপনি প্রোফাইল ব্রাউজ করতে পারবেন, পছন্দের মোহতারামকে প্রস্তাব পাঠাতে পারবেন এবং আপনার জন্য আগত প্রস্তাবগুলোও দেখতে পারবেন। এক কথায় আমাদের সব ফিচারগুলো ব্যাবহার করতে পারবেন।</p>

                    <p className="pt-2">যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য আমাদের অফিসিয়াল নম্বরসমূহে যোগাযোগ করতে দ্বিধা করবেন না।</p>

                    <p className="text-lg font-semibold pt-4">মাআস্সালাম,</p>
                    <p className="text-xl font-bold text-purple-700">Heaven Marriage Solutions টিম।</p> */}
                    <p className="font-galada">আলহামদুলিল্লাহ! আপনার রেজিস্ট্রেশন সফলভাবে ভেরিফাইড হয়েছে।</p>
                    <p className="font-galada">জাযাকুমুল্লাহু খাইর — ধৈর্য ও আস্থার জন্য আপনাকে আন্তরিক শুভেচ্ছা।</p>

                    <h2 className="font-galada text-lg font-semibold">আপনি এখন যা করতে পারবেন:</h2>
                    <ul className="list-disc ml-6 font-galada">
                        <li>প্রোফাইল ব্রাউজ করতে পারবেন</li>
                        <li>পছন্দের মোহতারাম/মোহতারামাকে প্রস্তাব পাঠাতে পারবেন</li>
                        <li>অন্যদের পাঠানো প্রস্তাব গ্রহণ/বাতিল করতে পারবেন</li>
                        <li>HMS টিমের পক্ষ থেকে প্রোফেশনাল সাপোর্ট পেতে পারবেন</li>
                    </ul>

                    <h2 className="font-galada text-lg font-semibold">আপনার পরবর্তী করণীয়:</h2>
                    <ol className="list-decimal ml-6 font-galada">
                        <li>নিয়মিত প্রোফাইল ব্রাউজ করুন</li>
                        <li>আপনার পছন্দের প্রোফাইলগুলোতে আগ্রহ প্রকাশ করুন</li>
                        <li>ইনশাআল্লাহ, পরস্পর আগ্রহ থাকলে আমাদের টিম পরবর্তী ধাপ পরিচালনা করবে</li>
                        <li>যেকোনো সমস্যা বা প্রশ্নে আমাদের অফিসিয়াল নম্বরে যোগাযোগ করুন</li>
                    </ol>

                    <h2 className="font-galada text-lg font-semibold">মনে রাখবেন:</h2>
                    <p className="font-galada">আপনার নিয়ত ও ধৈর্যই এই যাত্রায় আপনাকে সবচেয়ে বেশি সাহায্য করবে, ইনশাআল্লাহ।</p>
                    <p className="font-galada">আমরা আছি আপনার পাশে।</p>

                    <h2 className="font-galada text-lg font-semibold">যেকোনো সহযোগিতা বা পরামর্শের জন্য যোগাযোগ করুন:</h2>
                    <ul className="font-galada space-y-1">
                        <li>১. মোহাম্মদ রাহেদ হোসেন মাহেদ (ফাউন্ডার, HMS) → <span className="font-semibold">+8801610371038</span></li>
                        <li>২. হাফিজুর রহমান হাফিজ (ফাউন্ডার এন্ড চেয়ারম্যন HMS ) → <span className="font-semibold">+8801925222525</span></li>
                        <li>৩. অফিসিয়াল ডিরেক্ট কল সাপোর্ট (ডকুমেন্ট ও প্রস্তাব সংক্রান্ত ) → <span className="font-semibold">+8801342665285</span></li>
                        <li>৩. অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট (ডকুমেন্ট ও প্রস্তাব সংক্রান্ত) → <span className="font-semibold">+8801342665286</span></li>
                    </ul>

                    <p className="font-galada">যোগাযোগ সময়: প্রতিদিন সকাল ০৯ টা থেকে রাত ০৯টা (বাংলাদেশ সময়)।</p>
                    <p className="font-galada">দ্রুত সহায়তার জন্য হোয়াটসঅ্যাপে মেসেজ দিতে পারেন।</p>

                    <p className="font-galada">আল্লাহ্‌ আপনাকে উত্তম জীবনসঙ্গী দান করুন এবং আপনার যাত্রাকে বরকতময় করুন।</p>
                    <p className="font-galada">মাআস্সালাম,</p>
                    <p className="font-galada text-xl">Heaven Marriage Solutions (HMS) টিম</p>
                </div>
            </div>

        </div>
    );
};

export default GirlsVerified;