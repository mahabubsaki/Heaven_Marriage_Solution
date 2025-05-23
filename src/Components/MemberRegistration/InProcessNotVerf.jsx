import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import toast from 'react-hot-toast';
import { imageUpload } from '../../Utils/ImageUpload';
import useAuth from '../../Hooks/Auth/useAuth';

const InProcessNotVerf = () => {

    const axiosSecure = useAxiosSecure();
    const qClinet = useQueryClient();
    const { user } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async (transactionData) => {
            const { data } = await axiosSecure.put('/transactionData', transactionData);
            return data;
        },
        onSuccess: () => {
            toast.success('Your Transaction Data Sended');
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
        await mutateAsync(transactionData);
        form.reset();
    };

    return (
        <div className='pb-5'>
            <p className="font-galada text-center text-2xl text-blue-400 my-3">Thank You!</p>
            <p className="font-galada">মুহতারাম! আপনার ফরমটি সয়ংক্রিয়ভাবে IMB অফিসে জমা হয়েছে।</p>
            <p className="font-galada">অনুগ্রহ করে ভেরিফিকেশন ও জয়েনিং চার্জ 1020 টাকা নির্দিষ্ট নাম্বার বা একাউন্টে পে করুন এবং টাকা পাঠানোর ডকোমেন্ট অথবা স্ক্রিনশর্ট নিম্নের অফিসিয়াল হোয়াটসঅ্যাপ নাম্বারে পাঠিয়ে দিন। আপনার সাক্ষাত সিডিউল কনফার্ম করা হবে এবং গুগল ম্যাপ ও ভিডিও লোকেশনের লিংক পাঠিয়ে দেওয়া হবে।</p>

            <p className="font-galada text-xl mt-2">টাকা পাঠানোর পর যেই হোয়াটসঅ্যাপ নাম্বারে স্ক্রিনসর্ট পাঠাবেন: (IMB অফিসিয়াল হোয়াটসঅ্যাপ):</p>
            <p className="font-galada font-bold text-red-600">01709-909505</p>

            <p className="font-galada text-xl mt-2">👉যে নাম্বারে বা একাউন্টে টাকা পাঠাবেন:</p>
            <p className="font-galada"><span className="font-semibold">সেন্ডমানি:</span> <span className='text-red-600'>01709-909505</span> (নগদ / বিকাশ / রকেট – পার্সোনাল)</p>

            <p className="font-galada font-semibold">Bank A/C:</p>
            <p className="font-galada">A/C Name: MD. MAMUNUR RASID</p>
            <p className="font-galada">A/C Number: 1681520000675</p>
            <p className="font-galada">Dutch Bangla Bank Limited</p>
            <p className="font-galada">Kushtia Branch (Routing Number: 090500949)</p>

            <p className="font-galada">মুতারাম! অনুগ্রহ করে টাকা এবং টাকা পাঠানোর স্ক্রিনশট নির্দিষ্ট নম্বরেই পাঠাবেন। অন্য কোনো নাম্বারে পাঠাবেন না।</p>
            <p className="font-galada">আপনার মেসেজে এর রেসপন্স ১ থেকে ৭২ ঘন্টার মধ্যে দেয়া হবে, ইনশাআল্লাহ।</p>
            <p className="font-galada">অনুগ্রহ করে দ্রুত রিপ্লাই না পেলে কষ্ট নিবেন না ।</p>
            <p className="font-galada">মাআস্সালাম।</p>


            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-xl bg-white shadow">
                <h2 className="text-xl font-bold text-center font-galada">লেনদেনের তথ্য ফর্ম</h2>

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
                    className="w-full bg-green-600 py-2 rounded hover:bg-green-700 font-semibold font-galada
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300
                    "
                >
                    সাবমিট করুন
                </button>
            </form>


        </div>
    );
};

export default InProcessNotVerf;