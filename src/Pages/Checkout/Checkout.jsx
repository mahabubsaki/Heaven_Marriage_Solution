import { useState } from "react";
import { Trash2, Wallet } from "lucide-react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // get all cart data------------------------------------------------------------------------
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/cart/${user?.email}`);
            return data;
        }
    });
    // console.log(cartData);



    // setDelivery
    const [delivery, setDelivery] = useState('');
    // console.log(delivery);


    // total price calculation
    const cartTotal = cartData.reduce((sum, item) => sum + item.total_price, 0);
    let deliveryCharge = 0;
    if (delivery === 'Inside Dhaka') {
        deliveryCharge = 60;
    } else if (delivery === 'Outside Dhaka') {
        deliveryCharge = 120;
    }
    const total = cartTotal + deliveryCharge;


    // add user cart data to the server
    const { mutateAsync: order } = useMutation({
        mutationFn: async (cartData) => {
            const { data } = await axiosSecure.post(`/orderData/${user?.email}`, cartData);
            return data;
        },
        onSuccess: () => {
            navigate('/order_success');
        }
    });


    // add user cart data to the server
    const { mutateAsync: placedOrder } = useMutation({
        mutationFn: async (placedOrderInfo) => {
            const { data } = await axiosSecure.post(`/placed_order_info`, placedOrderInfo);
            return data;
        },
        onSuccess: () => {
            toast.success('Thanks for buying !');
        }
    });




    // add user details to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const mobile = form.mobile.value;
        const address = form.address.value;

        if (!delivery) {
            return toast.error('Select a delivery method');
        }

        const formData = {
            name,
            buyer_email: user?.email,
            mobile,
            address,
            delivery,
            total
        };
        // console.table(formData);
        await placedOrder(formData);
        await order(cartData);
    };


    // delete a cart data
    const { mutateAsync: deleteItem } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/cartData/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Item deleted'),
                refetch();
        }
    });




    // console.table(data);

    const handleDelete = async (id) => {
        await deleteItem(id);
    };


    return (

        <div className="bg-white min-h-screen">
            <div>
                <h1 className="text-2xl pb-[40px] font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
                <Navbar />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-28">
                {/* Left Side - Form */}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
                    <h2 className="font-semibold">
                        অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে অর্ডার কনফার্ম বাটনে ক্লিক করুন
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input required name="name" className="border rounded p-2 text-sm" placeholder="আপনার নাম লিখুন" />
                        <div className="flex border rounded overflow-hidden">
                            <span className="bg-gray-100 px-2 py-2 text-sm">(BD)+88</span>
                            <input required name="mobile" className="flex-1 p-2 text-sm" placeholder="আপনার মোবাইল নাম্বার" />
                        </div>
                    </div>
                    <textarea required name="address" className="border rounded w-full p-2 text-sm" placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"></textarea>

                    <div>
                        <h3 className="font-semibold mb-2">🧾 আপনি কিভাবে পরিশোধ করতে চান</h3>
                        <div
                            className={`relative border rounded-md p-4 w-60 cursor-pointer transition-all bg-orange-50 border-orange-500 border-gray-300'
                                }`}
                        >
                            <div className="absolute top-2 right-2">
                                <span
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center border-orange-500
                                        }`}
                                >
                                    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                                </span>
                            </div>
                            <div className="flex justify-center mb-2">
                                <Wallet className="w-8 h-8 text-orange-500" />
                            </div>
                            <p className="text-center font-medium text-gray-800">Cash On Delivery</p>
                        </div>
                    </div>

                    <div className="fixed z-10 bottom-0 bg-white w-full p-5 left-0">
                        <div className="flex justify-evenly gap-10">
                            <div>
                                <p className="font-medium">সর্বমোট:</p>
                                <p className="font-bold font-mina">৳ {total}</p>
                            </div>
                            <button className="bg-orange-500 text-white w-full py-2 rounded font-semibold hover:bg-orange-600">
                                অর্ডার কনফার্ম করুন
                            </button>
                        </div>
                    </div>
                </form>

                {/* Right Side - Order Summary */}
                <div className="bg-[#E2E8F0] p-4 mx-3 rounded-xl space-y-4">
                    <h2 className="font-semibold">আপনার অর্ডার</h2>
                    {cartData.map((item) => (
                        <div key={item?._id} className="border rounded-lg p-3 flex gap-3 relative bg-white">
                            <img src={item?.image} alt="Product" className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <p className="text-xs text-orange-500">{item?.category}</p>
                                <h3 className="text-sm font-medium">{item?.product_name.split(' ').slice(0, 2).join(' ')}...</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-red-500 font-bold">৳ {item?.discountedPrice}</span>
                                    <span className="line-through text-gray-400">৳ {item?.main_price}</span>
                                    <span className="text-xs bg-red-100 text-red-500 px-1 rounded">{item?.discount}% OFF</span>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <p className="border border-gray-300 rounded text-sm px-1 py-0.5">{item?.variant}</p>
                                    <p className="text-sm">Quantity: {item?.quantity}</p>
                                    <p className="text-sm font-semibold">{item?.total_price} <span className="font-mina text-lg">৳</span></p>
                                </div>
                            </div>

                            <Trash2 onClick={() => handleDelete(item?._id)} className="text-red-500 absolute top-2 right-2 cursor-pointer" />
                        </div>
                    ))}

                    <div className="bg-orange-50 border border-orange-500 p-4 rounded shadow">
                        <h4 className="mb-2 text-gray-800 font-medium text-sm">ডেলিভারি মেথড নির্বাচন করুন</h4>
                        <div className="">
                            <div className="flex items-center gap-2 p-2">
                                <input type="radio" name="delivery" value="Inside Dhaka" onChange={(e) => setDelivery(e.target.value)} className="checked:bg-orange-500" />
                                <p>ঢাকার ভিতরে <span className="font-semibold font-mina">৳ 60</span></p>
                            </div>
                            <div className="flex items-center gap-2 p-2">
                                <input type="radio" name="delivery" value="Outside Dhaka" onChange={(e) => setDelivery(e.target.value)} className="checked:bg-orange-500" />
                                <p>ঢাকার বাইরে <span className="font-semibold font-mina">৳ 120</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">সর্বমোট</span>
                            <span className="font-mina">৳ {cartTotal}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-2">
                            <span className="font-medium">মোট পরিমাণ</span>
                            <span className="font-mina">৳ {cartTotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">ডেলিভারি চার্জ</span>
                            <span className="font-mina">৳{deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2 text-base">
                            <span className="">পরিশোধ করতে হবে</span>
                            <span className="font-mina">৳{total}</span>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
}
