import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import { FaRegStar, FaShare, FaStar } from "react-icons/fa6";
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { Building, Home, Truck, CreditCard, Star, PhoneCall, Search, ShoppingCart, Zap } from "lucide-react";

// react zoom
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { TiMessages } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { IoBag } from 'react-icons/io5';
import CartSidebar from '../../Components/Shared/Sidebar/CartSidebar';
import DragCloseDrawer from '../../Components/Shared/Modal/SelectProductModal/DragCloseDrawer';

const Product = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { product_id } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // images
    const [selectedImage, setSelectedImage] = useState("");
    const [selectVarient, setSelectVarient] = useState("");

    // 

    // cart sidebar
    const [CartIsOpen, setCartIsOpen] = useState(false);

    // add cart or buy now dragDrawerOpen state
    const [dragDrawerOpen, setDragDrawerOpen] = useState(false);

    // getproduct data---------------------------------------------------------------------------
    const { data = [], isLoading } = useQuery({
        queryKey: ['product', product_id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/product/${product_id}`);
            return data;
        }
    });
    const { category, description, discount, discountedPrice, images, name, price, variant, } = data;

    // more product-----------------------------------------------------------------------------
    const { data: more_product = [] } = useQuery({
        queryKey: ['moreProduct', data?.category, data?._id],
        queryFn: async () => {
            const { data: more } = await axiosSecure.get(
                `/more_product?category=${data?.category}&id=${data?._id?.toString()}`
            );
            return more;
        }

    });

    // console.log(more_product);

    // get all cart data------------------------------------------------------------------------
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/cart/${user?.email}`);
            return data;
        }
    });

    // add to cart---------------------------------------------------------------------------
    const { mutateAsync } = useMutation({
        mutationFn: async (add) => {
            const { data } = await axiosSecure.post('/cart', add);
            return data;
        },
        onSuccess: () => {
            toast.success('Added Successfully, Check Your Cart !');
            setDragDrawerOpen(false);
            setCartIsOpen(true);
            setQuantity(1);
            refetch();
        }
    });

    // add to cart and instant buy now---------------------------------------------------------------------------
    const { mutateAsync: buyNow } = useMutation({
        mutationFn: async (add) => {
            const { data } = await axiosSecure.post('/buy_cart', add);
            return data;
        },
        onSuccess: () => {
            setDragDrawerOpen(false);
            setQuantity(1);
            refetch();
            navigate('/checkout');
        }
    });


    const handleCart = async (productDetails) => {
        if (!selectVarient) {
            return toast.error('You must select one varient at least');
        }
        const addCartData = {
            buyer: user?.email,
            product_name: productDetails?.name,
            quantity,
            main_price: productDetails?.price,
            discount: productDetails?.discount,
            discountedPrice: productDetails?.discountedPrice,
            total_price: productDetails?.discountedPrice * quantity,
            category: productDetails?.category,
            variant: selectVarient,
            all_variant: productDetails?.variant,
            image: productDetails?.images[0]
        };
        // console.table(addCartData);
        await mutateAsync(addCartData);
        setDragDrawerOpen(false);
    };

    const handleBuy = async (productDetails) => {
        if (!selectVarient) {
            return toast.error('You must select one varient at least');
        }
        const addCartData = {
            buyer: user?.email,
            product_name: productDetails?.name,
            quantity,
            main_price: productDetails?.price,
            discount: productDetails?.discount,
            discountedPrice: productDetails?.discountedPrice,
            total_price: productDetails?.discountedPrice * quantity,
            category: productDetails?.category,
            variant: selectVarient,
            all_variant: productDetails?.variant,
            image: productDetails?.images[0]
        };
        // console.table(addCartData);
        await buyNow(addCartData);
    };


    if (loading, isLoading) return <Loading />;

    // console.log(data);


    return (
        <div className=" w-full lg:px-10  bg-white min-h-screen" >
            <div>
                <h1 className="text-2xl pb-[60px] font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
                <Navbar />
            </div>

            <div className=" border-t-[1px] flex flex-col lg:flex-row items-center border-[#BEBEBE] lg:p-6 md:gap-10 gap-3 ">

                {/* Left Image Section */}
                <div className="flex flex-col gap-3">
                    <div className="w-[300px] h-[300px] border rounded overflow-hidden flex items-center justify-center">
                        <Zoom>
                            <img
                                src={selectedImage ? selectedImage : images[0]}
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                        </Zoom>
                    </div>
                    <div className="flex gap-2">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                src={img}
                                alt="thumb"
                                className={`w-16 h-16 object-cover border cursor-pointer rounded ${selectedImage === img ? 'ring-2 ring-blue-400' : ''
                                    }`}
                            />
                        ))}
                    </div>
                </div>


                {/* right side product description */}
                <div className="flex-1 space-y-5 px-4">
                    <p className='text-orange-500 mt-2 font-semibold'>{category}</p>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {name}
                    </h2>

                    <div className='space-y-2 my-2'>
                        <div className='flex gap-4'>
                            <div className='flex border-r border-gray-300 px-4 items-center gap-2'>
                                <div className='flex'>
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                </div>
                                0
                            </div>
                            <div>0 রেটিং</div>
                        </div>

                        <div className='flex gap-4'>
                            <p className='flex gap-2 border-r pr-3 items-center'><span className='text-cyan-400'><TiMessages /></span> 0 প্রশ্ন ও উত্তর</p>
                            <button className='flex items-center'><FaShare />শেয়ার করুন</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-2xl flex items-center font-bold text-gray-800">৳ {discountedPrice}</p>
                        <p className="line-through text-gray-400 flex items-center">৳ {price}</p>
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            {discount}% OFF
                        </span>
                    </div>

                    <div className="mt-4 border-y-8 py-4 px-2">
                        <p className="font-medium mb-1 text-sm">নির্বাচন করুন:</p>
                        <div className="flex gap-2">
                            {
                                variant?.split(',').map((variant, idx) => (
                                    <button key={idx} onClick={() => setSelectVarient(variant)} className={`border px-4 py-1 rounded ${selectVarient === variant ? 'border-orange-500' : ''} text-gray-500 `}>{variant}</button>
                                ))
                            }
                        </div>
                    </div>

                    {/* ডেলিভারি চার্জ ------------------------------------------------------------------------------------------------------------*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg shadow-sm bg-gray-100 max-w-xl mx-auto">
                        <div className="flex items-start gap-3">
                            <Building className="text-gray-600 mt-1" size={24} />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">ডেলিভারি চার্জ:</p>
                                <p className="text-sm text-gray-600">ঢাকার ভিতরে - ৬০ টাকা</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Home className="text-gray-600 mt-1" size={24} />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">ডেলিভারি চার্জ:</p>
                                <p className="text-sm text-gray-600">ঢাকার বাইরে - ১২০ টাকা</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Truck className="text-gray-600 mt-1" size={24} />
                            <div>
                                <p className="text-sm text-gray-700">সারাদেশে ক্যাশ অন ডেলিভারি</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CreditCard className="text-gray-600 mt-1" size={24} />
                            <div>
                                <p className="text-sm text-gray-700">নিরাপদ পেমেন্ট করার সহজ মাধ্যম</p>
                            </div>
                        </div>
                    </div>


                    {/* প্রোডাক্ট ডিটেইলসঃ ---------------------------------------------------------------------------------------*/}
                    <div className='space-y-3'>
                        <h1 className='text-xl font-semibold'>প্রোডাক্ট ডিটেইলসঃ</h1>
                        <ul>
                            {
                                description.split('.').map((description, idx) => (
                                    <li key={idx} className='list-disc ml-10'>{description}</li>
                                ))
                            }
                        </ul>

                        <div className="border border-orange-400 bg-orange-50 rounded-md p-4 max-w-lg mx-auto text-center">
                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                                আরও কিছু জানার থাকলে
                            </h2>

                            <p className="text-sm md:text-base text-gray-700 flex justify-center items-center gap-1">
                                কল করুন:
                                <PhoneCall className="text-orange-500 h-4 w-4" />
                                <span className="text-orange-600 font-bold text-lg">01748919251</span>
                            </p>
                        </div>

                    </div>


                    {/* রেটিং ও রিভিউ: ----------------------------------------------------------------------------------------*/}
                    <div className='border-y-8 py-4'>
                        <p className='text-left text-xl font-semibold'>রেটিং ও রিভিউ:</p>
                        <div className="w-full max-w-md mx-auto p-4 text-center">

                            <h2 className="text-3xl font-bold">0</h2>

                            <div className="flex justify-center items-center my-2">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} className="h-5 w-5 text-gray-300" fill="none" />
                                ))}
                            </div>

                            <p className="text-sm text-gray-600 mb-4">০ গুলো রেটিং</p>

                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-2">
                                        <span className="w-4">{star}</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-gray-400 w-0"></div>
                                        </div>
                                        <span className="w-4 text-gray-500">0</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* এই প্রডাক্ট সম্পর্কে প্রশ্ন ও উত্তর */}
                    <div className='space-y-3'>
                        <p className='text-xl font-semibold'>এই প্রডাক্ট সম্পর্কে প্রশ্ন ও উত্তর (0)</p>
                        <div className="flex items-center border border-gray-200 bg-gray-50 rounded-full px-4 py-2 max-w-xs w-full">
                            <Search className="text-gray-700 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="এই প্রডাক্টি সম্পর্কে সার্চ করুন"
                                className="bg-transparent flex-1 outline-none px-2 text-sm text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>


                    {/* একই ক্যাটাগরির আরও প্রোডাক্ট --------------------------------------------------------------------------------------*/}
                    <div className='border-y-8 py-5'>
                        <p className="text-xl font-semibold">একই ক্যাটাগরির আরও প্রোডাক্ট</p>

                        <div className="grid grid-cols-2 gap-3 mb-10 py-3">
                            {more_product?.slice(0, 4).map((got) => (
                                <Link
                                    to={`/product/${got?._id}`}
                                    key={got?._id}
                                    className="flex flex-col bg-white rounded p-3 shadow-md h-[350px] w-[165px] overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={got?.images[0]}
                                        alt=""
                                        className="object-cover h-[120px] w-full"
                                    />

                                    <div className="flex flex-col flex-grow">
                                        <p className="text-xs text-orange-500 my-2">{got?.category}</p>
                                        <p className=" font-semibold">
                                            {got?.name.split(' ').slice(0, 3).join(' ')}
                                        </p>
                                        <div className="flex bg-slate-100 font-bold w-[60px] rounded">
                                            <p className="flex  items-center text-orange-400 border-r border-gray-300 p-1 gap-1">0<FaStar /> </p>
                                            <p className="flex items-center px-2">0</p>
                                        </div>
                                        <p className="text-red-600 font-semibold"> <span className=" font-mina">৳</span>{got?.discountedPrice}</p>
                                        <div className="flex gap-3 items-center">
                                            <p className="line-through text-gray-400"><span className=" font-mina">৳</span>{got?.price}</p>
                                            <p className="flex gap-3 bg-red-500 text-white px-2 rounded-lg">{got?.discount}% OFF</p>
                                        </div>

                                        <div className="mt-auto flex gap-2">
                                            <button className="p-2 border border-[#FC8934] text-[#FC8934] rounded-md"><IoBag /></button>
                                            <button className="px-2 bg-[#FC8934] text-white py-1 rounded w-full">
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>

                    </div>

                    {/* dragDrawerOpen modal -----------------------------------------------------------------------------------------------*/}
                    <DragCloseDrawer open={dragDrawerOpen} setOpen={setDragDrawerOpen}>
                        <div className="mx-auto max-w-2xl space-y-4text-black">
                            <h2 className="text-2xl font-bold">
                                নির্বাচন করুন
                            </h2>

                            <div className='flex gap-3 my-2'>
                                <img src={data?.images[0]} className='h-24 w-24 object-cover rounded' alt="" />
                                <div>
                                    <p className='text-orange-400 text-sm font-semibold'>{data?.category}</p>
                                    <p className='font-semibold '>{data?.name}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="flex text-red-500 items-center font-bold ">৳ {data?.discountedPrice}</p>
                                        <p className="line-through text-gray-400 flex items-center">৳ {data?.price}</p>
                                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            {data?.discount}% OFF
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <p className='text-[13px]'>নির্বাচন করুন:</p>
                                <div className='flex gap-2'>
                                    {
                                        variant?.split(',').map((variant, idx) => (
                                            <button key={idx}
                                                onClick={() => setSelectVarient(variant)}
                                                className={`border border-gray-300 px-4 py-1 rounded-md text-gray-500 hover:bg-gray-100 ${selectVarient === variant ? 'border-orange-500' : ''}`}>{variant}</button>
                                        ))
                                    }
                                    <div className="flex items-center gap-1 border rounded px-2">
                                        <button disabled={quantity === 0} onClick={() => setQuantity(quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center my-4">
                                {/* Add to Cart */}
                                <button
                                    onClick={() => handleCart(data)}
                                    className="bg-cyan-500 flex items-center gap-1 text-white px-7 py-2 rounded hover:bg-cyan-600 text-sm font-medium">
                                    <ShoppingCart className="w-6 h-6" />
                                    কার্টে রাখুন
                                </button>

                                {/* Buy Now */}
                                <button onClick={() => handleBuy(data)} className="bg-orange-500 flex items-center gap-1 text-white px-7 py-2 rounded hover:bg-orange-600 text-sm font-medium">
                                    <Zap className="w-6 h-6" />
                                    এখনই কিনুন
                                </button>
                            </div>

                            <div>
                                <p className='text-center text-cyan-500 text-xs'>প্রোডাক্টির বিস্তারিত দেখতে ক্লিক করুন</p>
                            </div>

                        </div>
                    </DragCloseDrawer >

                    {/* cart side bar */}
                    <CartSidebar style='-top-5' data={cartData} refetch={refetch} isOpen={CartIsOpen} setIsOpen={setCartIsOpen} />


                    <div className="mt-6 flex gap-4 fixed bottom-0 bg-white left-0 w-full border-t py-3">
                        <div className="flex flex-col gap-4 mx-auto items-center">

                            <div className="flex gap-4 my-1">
                                {/* Add to Cart */}
                                <button
                                    onClick={() => setDragDrawerOpen(true)}
                                    className="bg-cyan-500 flex items-center gap-1 text-white px-8 py-4 rounded-lg hover:bg-cyan-600 text-sm font-medium">
                                    <ShoppingCart className="w-6 h-6" />
                                    কার্টে রাখুন
                                </button>

                                {/* Buy Now */}
                                <button
                                    onClick={() => setDragDrawerOpen(true)}
                                    className="bg-orange-500 flex items-center gap-1 text-white px-8 py-4 rounded-lg hover:bg-orange-600 text-sm font-medium">
                                    <Zap className="w-6 h-6" />
                                    এখনই কিনুন
                                </button>
                            </div>

                            {/* Call Section */}
                            <div className="flex items-center gap-1 text-gray-800 text-sm font-medium">
                                কল করুন:
                                <PhoneCall className="text-orange-500 w-4 h-4" />
                                <span className="text-orange-600 font-bold text-base">01748919251</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

        </div>
    );
};

export default Product;