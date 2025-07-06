import { motion } from "framer-motion";
import { Trash2, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartSidebar = ({ isOpen, setIsOpen, data, refetch, style }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // new category
    const [newCategory, setNewCategory] = useState('');
    console.log(newCategory);


    const [product, setProduct] = useState({});



    // total price
    const total = data.reduce((sum, item) => sum + item.total_price, 0);



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

    const handleDelete = async (id) => {
        await deleteItem(id);
    };


    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed ${style} right-0 w-[90%] md:w-[400px] h-full bg-white shadow-lg z-50 flex flex-col`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">কার্ট লিস্ট ({data?.length} টি প্রডাক্ট)</h2>
                <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {data.map((item) => (
                    <div key={item?._id} className="border rounded p-3 flex gap-3 relative">
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

                {/* Continue Shopping */}
                <div className="text-center text-cyan-600 font-medium cursor-pointer mt-4">
                    + আরো শপিং করুন
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t p-4 flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm">সর্বমোট:</p>
                    <p className="text-lg font-bold"><span className="text-xl font-mina">৳</span> {total}</p>
                </div>
                <Link
                    // onClick={() => handleBuyNow()}
                    to='/checkout'
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-1">
                    এখনই কিনুন →
                </Link>
            </div>
        </motion.div >
    );
};

export default CartSidebar;
