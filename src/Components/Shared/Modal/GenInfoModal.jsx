import { Dialog, DialogPanel } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/Auth/useAuth";
import WhiteButton from "../Buttons/WhiteButton";
import { imageUpload } from "../../../Utils/ImageUpload";
import React from 'react';
import { useNavigate } from "react-router-dom";


const GenInfoModal = ({ isOpen, setIsOpen }) => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async (paymentInfo) => {
            const { data } = await axiosSecure.put(`/payment_info/${user?.email}`, paymentInfo);
            return data;
        },
        onSuccess: () => {
            toast.success('ভেরিফিকেশন এর জন্য অপেক্ষা করুন ।');
            navigate('/');
            setIsOpen(!isOpen);
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const imageUrl = await imageUpload(image);
        const mobile = form.mobile.value;
        const ammount = form.ammount.value;
        const waNumber = form.waNumber.value;
        const address = form.address.value;
        const transaction_code = form.transaction_code.value;
        const gender = form.gender.value;
        const additional_text = form.additional_text.value;

        const paymentInfo = {
            name,
            image: imageUrl,
            mobile,
            ammount,
            waNumber,
            address,
            transaction_code,
            gender,
            additional_text,
            email: user?.email
        };

        await mutateAsync(paymentInfo);

    };


    return (
        <div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(!isOpen)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-[300px] rounded-xl border p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 max-h-[400px] overflow-y-auto"
                        >

                            <h1 className="text-center font-kaushan font-semibold text-2xl">Payment Information and Profile Info</h1>

                            <form onSubmit={handleSubmit} className="text-white">
                                <div className="flex flex-col gap-5 m-10">

                                    <div className=" w-full">
                                        <label className="block font-lexend">Your Name</label>
                                        <input required className="bg-none outline-none placeholder:text-gray-500 border-b border-black" type="text" name='name' />
                                    </div>

                                    <div>
                                        <label className="block font-lexend">Upload Documents</label>
                                        <input required className="max-w-[220px] mt-2 px-3 rounded-3xl border w-full" type="file" name="image" id="" />
                                    </div>

                                    <div className=" w-full">
                                        <label className="block font-lexend">Whatsapp Number</label>
                                        <input required className="bg-none outline-none placeholder:text-gray-500 border-b border-black" type="text" name='waNumber' />
                                    </div>

                                    <div className=" w-full">
                                        <label className="block font-lexend">Address</label>
                                        <input required className="bg-none outline-none placeholder:text-gray-500 border-b border-black" type="text" name='address' />
                                    </div>

                                    <div className=" w-full">
                                        <label className="block font-lexend">Payment Mobile Number</label>
                                        <input required className="bg-none outline-none placeholder:text-gray-500 border-b border-black" type="text" name='mobile' />
                                    </div>
                                    <div className=" w-full">
                                        <label className="block font-lexend">Payment Ammount</label>
                                        <input required className="bg-none outline-none placeholder:text-gray-500 border-b border-black" type="text" name='ammount' />
                                    </div>

                                    <div className=" w-full">
                                        <label className="block font-lexend">Transaction Code</label>
                                        <input className="outline-none placeholder:text-gray-500 border-b border-black" type="text" name='transaction_code' />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-1">Your Gender</label>
                                        <select
                                            required
                                            name='gender'
                                            className="px-5 cursor-pointer w-28 md:w-3/4 h-10 border-b appearance-none border-black rounded-sm outline-none"
                                        >
                                            <option disabled selected value="">Select</option>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block mb-1">Additional Text</label>
                                        <textarea name="additional_text" className="border outline-none" cols={30} rows={4} id=""></textarea>
                                    </div>

                                </div>

                                <div className="flex justify-center" >
                                    <button>
                                        <WhiteButton text='Submit' />
                                    </button>
                                </div>
                            </form>


                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default GenInfoModal;