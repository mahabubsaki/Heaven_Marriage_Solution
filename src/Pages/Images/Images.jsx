import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import { useMutation, useQuery } from '@tanstack/react-query';
import { imageUpload } from '../../Utils/ImageUpload';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { AiOutlineLoading } from 'react-icons/ai';
import { RxCross2 } from "react-icons/rx";
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Images = () => {

    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { email } = useParams();
    const [imgLoad, setImgLoad] = useState(false);

    const { data = [], refetch } = useQuery({
        queryKey: ['add_images', email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/images/${email}`);
            return data;
        }
    });

    // add image
    const { mutateAsync } = useMutation({
        mutationFn: async (image) => {
            const { data } = await axiosSecure.post('/image', image);
            return data;
        },
        onSuccess: () => {
            toast.success('Image Added Successfully');
            setImgLoad(false);
            refetch();
        }
    });

    // delete Image
    const { mutateAsync: deleteImg } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/imagesDelete/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Image deleted');
            refetch();
        }
    });

    const addImage = async (e) => {
        e.preventDefault();
        setImgLoad(true);
        const form = e.target;
        const image = form.image.files[0];
        const imageUrl = await imageUpload(image);
        const imageData = {
            image: imageUrl,
            user: user?.email
        };
        await mutateAsync(imageData);
    };


    const handleDelete = async (id) => {
        await deleteImg(id);
    };


    if (loading) return <Loading />;

    return (
        <div className='min-h-screen'>

            {/* for only other user to see */}
            {
                data.length === 0 && user?.email !== email &&
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className='font-galada text-xl'>কোনো ছবি পাওয়া যায়নি। হোমে ফিরে যান।</p>
                    <Link to="/" className="text-blue-500 underline mt-2 px-5 py-1">
                        হোম
                    </Link>
                </div>

            }

            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className='mt-16'>
                {
                    user?.email === email && <form className='flex flex-col ' onSubmit={addImage}>
                        <input type="file" name="image" placeholder='Add Images' className='border-dotted border-4 border-red-500 mx-5 p-10 file:rounded file:outline-none file:bg-red-500 file:text-white file:border-none file:p-4' />
                        <button className='bg-red-500 px-4 py-2 border border-red-500 flex justify-center text-white w-[100px] my-7 mx-auto'>
                            {
                                imgLoad ?
                                    <AiOutlineLoading className='text-white animate-spin font-bold text-3xl' />
                                    :
                                    "Submit"
                            }
                        </button>
                    </form>
                }

                <div
                    style={{ columns: '150px' }}
                    className="max-w-5xl w-full gap-2 mx-auto px-[7px]">
                    {
                        data.map(got => (
                            <div key={got?._id} className='relative'>
                                <img src={got?.image} alt="" className=" object-cover rounded w-[100%] mb-[7px]" />
                                {
                                    user?.email === email && <button onClick={() => handleDelete(got?._id)} className='text-white border-2 border-white bg-black size-5 text-xl text-center items-center flex justify-center font-bold rounded-full absolute top-1 right-1'><RxCross2 /> </button>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    );
};

export default Images;