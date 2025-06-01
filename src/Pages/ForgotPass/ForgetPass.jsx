import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/Auth/useAuth';
import toast from 'react-hot-toast';

const ForgetPass = () => {

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { sendResetPasswordEmail } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        await sendResetPasswordEmail(email)
            .then(() => {
                setSubmitted(true);
                toast.success("A reset link has been sent to your email.");
            })
            .catch((error) => {
                console.error("Error sending reset email:", error);
                toast.error("Failed to send reset link. Please try again.");
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFEBD9] px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    পাসওয়ার্ড ভুলে গেছেন?
                </h2>
                {submitted ? (
                    <div className="text-green-600 text-center">
                        আপনার ইমেইলে একটি রিসেট লিংক পাঠানো হয়েছে।
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                ইমেইল ঠিকানা
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        >
                            রিসেট লিংক পাঠান
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-blue-600 hover:underline">
                        লগইনে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;