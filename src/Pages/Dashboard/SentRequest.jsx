import React, { useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import HeadingSubHead from '../../Components/TextAnimations/HeadingSubHead';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import default_img from '/images/default_img.jpg';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import useRole from '../../Hooks/Role/useRole';

const SentRequest = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { gender } = useRole();

    // styles for the table data
    const searchStyles = [
        'rounded-full',
        'rounded-xl',
    ];

    // fetch all the data
    const { data = [], isLoading } = useQuery({
        queryKey: ['my_requests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my_requests/${user?.email}`);
            return data;
        }
    });



    // contact 
    const handleClick = () => {
        const phoneNumber = `8801734874385`; // Admin's number
        const message = `
✅ বিয়ের প্রস্তাব গৃহীত হয়েছে!

🔹 প্রস্তাবদাতা: Shaif Ahamed Sojib
📧 ইমেইল: ricoreven@gmail.com

🔹 প্রাপক: Snigdha Akter
📧 ইমেইল: kaiserreven@gmail.com

দয়া করে পরবর্তী ধাপের জন্য আমাদের সহায়তা করুন।
`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };




    if (loading || isLoading) return <Loading />;

    return (
        <div className='pb-5 bg-[#c3cedf] min-h-[100dvh]'>
            <div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-600 p-2">Heaven Marriage</h1>
                </div>
                <Navbar text={'text-gray-600'} />

                <div className='mt-16  flex justify-center items-center flex-col'>


                    {
                        data.length === 0 ? <p className='text-center my-32 font-alkatra text-2xl mx-5'>দুঃখিত, আপনি এখনও কোনও প্রস্তাব পাঠাননি।</p> : <div>

                            <p className='font-bold text-gray-600 mb-3 text-xl'>প্রেরিত প্রস্তাব সমূহ</p>
                            {
                                data.map((got, idx) => (
                                    <div key={idx}>

                                        <div
                                            className={`flex mb-4 items-center px-5 py-3 gap-3 bg-[#c3cedf] shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6] text-gray-600 rounded-full w-72 md:w-96`}
                                        >
                                            <div className='w-1/4'>
                                                {
                                                    gender === 'male' && <img src={got?.to_image || female_default} className='size-12 object-cover rounded-full' alt="" />
                                                }
                                                {
                                                    gender === 'female' && <img src={got?.to_image || male_default} className='size-12 object-cover rounded-full' alt="" />
                                                }
                                            </div>
                                            <div className='w-3/6 flex flex-col text-sm'>
                                                <p className=' text-black'>{got?.to_name.split(' ').slice(0, 2).join(' ')}</p>
                                                <p className={`${got?.request_status === 'requested' ? 'text-red-800' : 'text-blue-700'}`}>{got?.request_status}</p>
                                            </div>
                                            <div className='w-2/6'>
                                                {
                                                    got?.request_status === 'accepted' ?
                                                        <button onClick={() => handleClick(got?.to_whatsapp_number)} className='text-black text-sm shadow-[inset_4px_4px_5px_rgba(0,0,0,0.3),4px_4px_8px_rgba(0,0,0,0.1)] rounded-full px-2 py-1'>
                                                            Contact
                                                        </button>
                                                        :
                                                        <Link to={`/user_details/${got?.to}`} className="shadow-[inset_4px_4px_5px_rgba(0,0,0,0.3),4px_4px_8px_rgba(0,0,0,0.1)] rounded-full px-2 py-1">Details</Link>
                                                }
                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    }




                </div>


            </div>

        </div>
    );
};

export default SentRequest;