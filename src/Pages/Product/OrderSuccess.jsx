import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Shared/Navbar/Navbar";

const OrderSuccess = () => {
    const orderId = "#AR56662";
    const orderDate = "05 Jul 2025";
    const amount = 372;

    return (

        <div className="min-h-screen bg-white">
            <div>
                <h1 className="text-2xl pb-[60px] font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
                <Navbar />
            </div>

            <div className="flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md text-center space-y-6">
                    {/* Checkmark Icon */}
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle className="w-14 h-14 text-green-500" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <h2 className="text-green-600 text-2xl font-bold">
                            অর্ডার সফলভাবে সম্পন্ন হয়েছে!
                        </h2>
                        <p className="text-gray-700 text-sm mt-1">
                            ফালাহ বাজার থেকে কেনাকাটা করার জন্য আপনাকে আন্তরিকভাবে ধন্যবাদ।
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-4">
                        <Link to={'/products'} className="flex-1 bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition">
                            আরও শপিং করুন
                        </Link>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default OrderSuccess;
