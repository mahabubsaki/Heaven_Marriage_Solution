import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";


const SeeProductsModal = ({ isOpen, setIsOpen, data, }) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-violet-600 to-indigo-600 overflow-y-scroll h-[550px] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-center mb-2">
                                Review Product
                            </h3>

                            <div>
                                <p><span className="font-semibold text-2xl">{data?.name}</span></p>
                                <p>Mobile: <span className="font-semibold">{data?.mobile}</span></p>
                                <p>Delivery : <span className="font-semibold">{data?.address}</span></p>
                                <p><span className="font-semibold text-red-300">{data?.delivery}</span></p>
                                <p>total pay: <span className="font-semibold">{data?.total}</span></p>
                                <p className={`${data?.status === 'order listed' ? 'text-red-300' : 'text-green-300'} font-semibold`}>{data?.status}</p>
                            </div>

                            <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
                                {
                                    data?.products.map((got, idx) => (
                                        <div key={idx} className="bg-white flex flex-col justify-center items-center p-3 rounded-lg">
                                            <img src={got?.image} className="size-32 object-cover rounded-lg" alt="" />
                                            <p className="text-black font-semibold">{got?.product_name.split(' ').slice(0, 3).join(' ')}</p>
                                            <p className="text-black border border-black px-3 py-1 rounded">{got?.variant}</p>
                                            <p className="text-black font-semibold">{got?.quantity}  piece</p>
                                            <p className="text-black font-semibold">{got?.total_price} tk</p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                                >
                                    Back
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SeeProductsModal;