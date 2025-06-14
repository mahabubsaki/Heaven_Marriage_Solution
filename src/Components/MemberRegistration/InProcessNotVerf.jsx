import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import toast from 'react-hot-toast';
import { imageUpload } from '../../Utils/ImageUpload';
import useAuth from '../../Hooks/Auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';

const InProcessNotVerf = () => {

    const axiosSecure = useAxiosSecure();
    const qClinet = useQueryClient();
    const [logLoad, setLogLoad] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async (transactionData) => {
            const { data } = await axiosSecure.put('/transactionData', transactionData);
            return data;
        },
        onSuccess: () => {
            toast.success('Your Transaction Data Sended');
            navigate('/transaction_received');
            setLogLoad(false);
            qClinet.invalidateQueries(['usersData']);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const transaction_number = form.transaction_number.value;
        const screenshot = form.screenshot.files[0];
        const screenshotUrl = await imageUpload(screenshot);

        const transactionData = {
            name,
            transaction_number,
            screenshotUrl,
            transaction_status: 'in process',
            transaction_sentBy_user: user?.email
        };
        setLogLoad(true);
        await mutateAsync(transactionData);
        form.reset();
    };

    return (
        <div className='pb-5 space-y-4'>
            <p className=" text-justify text-2xl text-blue-400 my-3">Thank You!</p>
            <p className=" text-justify">আপনার ফর্মটি সফলভাবে HMS অফিসে জমা হয়েছে, আলহামদুলিল্লাহ।</p>
            <p className=" text-justify">পরবর্তী ধাপ: ভেরিফিকেশন ও জয়েনিং প্রসেস সম্পন্ন করার জন্য ১০২০ টাকা পাঠাতে অনুরোধ করছি
                {/* (ঈদুল আজহার আগ পর্যন্ত ৫০% ডিসকাউন্ট: ১০২০ টাকার পরিবর্তে মাত্র ৫১০ টাকা) */}
            </p>

            <p className=" text-justify text-xl mt-2">পেমেন্ট পাঠানোর বিকল্প মাধ্যমসমূহ:</p>
            <p className=" text-justify"><span className="font-semibold">Send Money (Nagad/Bkash/Rocket – Personal):</span> <span className='text-red-600'>01748919251</span> (নগদ / বিকাশ / রকেট – পার্সোনাল)</p>

            <p className=" text-justify font-semibold">Bank Transfer (Islami Bank):</p>
            <p className=" text-justify">A/C Name: MD. RAHED HUSSAIN MAHED</p>
            <p className=" text-justify">A/C Number: 20507770208518332</p>
            <p className=" text-justify">Branch: Pirer Bazar, Bishwanath, Sylhet</p>

            <p className=" text-justify">গুরুত্বপূর্ণ নির্দেশনা:</p>
            <p className=" text-justify">টাকা পাঠানোর পর অবশ্যই রসিদ/স্ক্রিনশট বা ছবি সংগ্রহ এবং  সংরক্ষণ করুন।</p>
            <p className=" text-justify">নিচের পেমেন্ট ভেরিফিকেশন ফর্মে “ডকুমেন্ট আপলোড” সেকশনে এটি আপলোড করুন, <br />
                অথবা অফিসিয়াল হোয়াটসঅ্যাপ নম্বরে পাঠিয়ে দিন: +8801342665286</p>


            <p className=" text-justify">অনুরোধ:</p>
            <p className=" text-justify">শুধুমাত্র উপরোক্ত নির্দিষ্ট নাম্বারে টাকা পাঠাবেন। <br />
                অন্য কোনো নাম্বারে পেমেন্ট করলে HMS আপনার রেজিস্ট্রেশন নিশ্চিত করতে পারবে না।</p>


            <p className=" text-justify">সবশেষে:</p>
            <p className=" text-justify">অবশ্যই পেমেন্ট ভেরিফিকেশন ফর্মটি পূরণ করুন,
                নচেৎ আপনার রেজিস্ট্রেশন প্রক্রিয়া সম্পূর্ণ হবে না।</p>

            <p className=" text-justify">মাআস্সালাম, <br />
                Heaven Marriage Solutions (HMS) টিম</p>



            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-xl bg-white shadow">
                <h2 className="text-xl font-bold text-center ">ভেরিফাই পেমেন্ট</h2>

                <div>
                    <label className="block font-semibold font-alkatra mb-1">আপনার নাম</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full border p-2 rounded font-alkatra"
                        placeholder="নাম লিখুন"
                    />
                </div>

                <div>
                    <label className="block font-semibold font-alkatra mb-1">যে নাম্বার থেকে টাকা পাঠিয়েছেন ।</label>
                    <input
                        type="number"
                        name="transaction_number"
                        required
                        className="w-full border p-2 rounded font-alkatra"
                        placeholder="মোবাইল নম্বর লিখুন"
                    />
                </div>

                <div>
                    <label className="block font-semibold font-alkatra mb-1">স্ক্রিনশর্ট (ছবি)</label>
                    <input
                        type="file"
                        name="screenshot"
                        required
                        className="w-full font-alkatra"
                    />
                </div>

                <button
                    type="submit"
                    disabled={logLoad}
                    className="w-full bg-green-600 py-2 rounded hover:bg-green-700 font-semibold 
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300
                    "
                >
                    {
                        logLoad ?
                            <AiOutlineLoading className='text-2xl font-bold animate-spin' />
                            :
                            "সাবমিট করুন"
                    }
                </button>
            </form>


        </div>
    );
};

export default InProcessNotVerf;