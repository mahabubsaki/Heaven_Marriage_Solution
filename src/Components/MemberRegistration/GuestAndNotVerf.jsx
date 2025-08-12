import React from 'react';
import useRole from '../../Hooks/Role/useRole';
import { Link } from 'react-router-dom';
import WhiteButton from '../Shared/Buttons/WhiteButton';
import BlackButton from '../Shared/Buttons/BlackButton';
import useAuth from '../../Hooks/Auth/useAuth';

const GuestAndNotVerf = () => {

    const { gender } = useRole();
    // console.log(gender);

    const { user } = useAuth();
    return (
        <div>
            <div className="space-y-1 mt-5 pb-5">
                <h1 className=" text-xl font-semibold">মুহতারাম ভাই, </h1>
                <p className=" text-xl font-semibold">আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ।</p>
                <p className=" text-justify"> Heaven Marriage Solution (HMS) কোনো সাধারণ ঘটকালি নয়—এটি একটি পূর্ণাঙ্গ, শরীয়াহ-সম্মত, দাওয়াতি প্ল্যাটফর্ম। এখানে আপনি শুধু বিয়ে সম্পন্ন করার সুযোগই পাবেন না, বরং একটি বরকতময়, সুন্নাহভিত্তিক দাম্পত্য জীবন গঠনের সহায়তাও পাবেন। আমাদের লক্ষ্য—বিবাহকে সহজ করা, হারামের পথ বন্ধ করা এবং ইসলামী মূল্যবোধে পরিবার গঠনকে উৎসাহিত করা।</p>
                <p className=" text-justify">
                    আপনি যদি একজন দ্বীনদার ভাই হিসেবে HMS থেকে বিবাহের জন্য সেবা গ্রহণ করতে চান, তাহলে আপনাকে সম্পূর্ণ আমানতের সাথে নিচের ধাপগুলো অনুসরণ করতে হবে:
                </p>

                <p className='text-justify text-xl font-bold'> রেজিস্ট্রেশন প্রক্রিয়া (পুরুষদের জন্য)</p>
                <ul>
                    <li className=" list-disc ml-16 text-justify">  প্রথম ধাপ: <br />
                        আমাদের ওয়েবসাইটে গিয়ে মূল বায়োডাটা রেজিস্ট্রেশন ফরমটি যথাযথভাবে পূরণ করে সাবমিট করুন। ফরমে ★ স্টার চিহ্নিত প্রশ্নগুলোর উত্তর দেওয়া বাধ্যতামূলক।</li>
                    <li className=" list-disc ml-16 text-justify">দ্বিতীয় ধাপ: <br />
                        ফরম সাবমিট করার পর আপনাকে স্বয়ংক্রিয়ভাবে একটি ট্রান্সাকশন ফর্মে রিডাইরেক্ট করা হবে।
                        <br />
                        এই ফর্মে যা করতে হবে:
                        <br />
                        আপনার নাম
                        <br />
                        যে নাম্বার থেকে টাকা পাঠানো হয়েছে সেটি
                        <br />
                        এবং টাকা পাঠানোর স্ক্রিনশট আপলোড করুন</li>
                    <li className=" list-disc ml-16 text-justify">তৃতীয় ধাপ: <br />
                        ট্রান্সাকশন ফর্ম সাবমিট করার পর কিছুক্ষণ অপেক্ষা করুন। আমাদের টিম দ্রুত আপনার তথ্য যাচাই করে আপনার প্রোফাইল ভেরিফাইড সদস্য হিসেবে অনুমোদন করবে।</li>
                </ul>
            </div>

            <div className="space-y-1 text-justify">
                <p className="font-semibold ">💳 রেজিস্ট্রেশন চার্জ:</p>
                <p className="text-justify">১০২০ টাকা মাত্র (বিকাশ/নগদ/রকেট – পার্সোনাল)
                    <br />
                    পেমেন্ট নাম্বার:
                    📱 01748919251
                    <br />
                    পেমেন্ট করার পর আপনি সরাসরি স্ক্রিনশট ট্রান্সাকশন ফর্মে সাবমিট করবেন।</p>

                <p className="text-justify text-xl font-bold">🔒 সাক্ষাৎ ছাড়া সদস্যপদ:</p>
                <p className="text-justify">আমাদের অফিসে সরাসরি সাক্ষাতের বিকল্প থাকলেও, ভাইদের ক্ষেত্রে সরাসরি সাক্ষাৎ আবশ্যক নয়। আপনি চাইলে অনলাইনেই পুরো প্রক্রিয়া সম্পন্ন করে সদস্য হতে পারেন। <br />
                    তবে কেউ চাইলে অফিসে এসে সাক্ষাৎ করে আরও গভীরভাবে আমাদের কার্যক্রম বুঝতে পারবেন।</p>


                <p className="text-justify text-xl font-bold">✅ সদস্য হওয়ার পর:</p>
                <p className="text-justify">ভেরিফিকেশন সম্পন্ন হলে আপনাকে HMS-এর সদস্য গ্রুপে যুক্ত করা হবে, যেখানে আপনি বিবাহযোগ্য বোনদের বায়োডাটা দেখে সুন্নাহভিত্তিকভাবে প্রস্তাব পাঠাতে পারবেন—মাসনা, সুলাছা, রুবা’আ বা ওয়াহেদা—যেভাবে আপনার জন্য শরীয়ত অনুমতি দেয়।
                    <br />
                    আপনি যদি HMS-এর আদর্শ ও নীতিমালার সাথে একমত হন এবং সত্যিকারভাবে একটি দ্বীনদার জীবনসঙ্গিনী খুঁজতে আগ্রহী হন—তাহলে এখনই ফর্মটি পূরণ করুন এবং ট্রান্সাকশন ফর্মে স্ক্রিনশট সাবমিট করুন।
                    <br />
                    আমরা আপনাকে স্বাগত জানাচ্ছি।
                    <br />
                    وَفِّقَكُمُ ٱللَّهُ لِمَا يُحِبُّ وَيَرْضَىٰ
                    – হ্যাভেন ম্যারিজ সল্যুশন টিম</p>

            </div>

            <div className='flex justify-center pb-5'>
                {gender === 'male' && <Link to='/men_form'><WhiteButton text='পুরুষ ফর্ম' /></Link>}
                {gender === 'female' && <Link to='/woman_form'><BlackButton text='মহিলা ফর্ম' /></Link>}
                {!gender && <div className='flex justify-center mb-5 gap-5'>
                    <Link to='/men_form'><WhiteButton text='পুরুষ ফর্ম' /></Link>
                    <Link to='/woman_form'><BlackButton text='মহিলা ফর্ম' /></Link>
                </div>}
            </div>


        </div>
    );
};

export default GuestAndNotVerf;