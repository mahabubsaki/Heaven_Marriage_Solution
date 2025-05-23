
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

// react stripe js
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/Axios/useAxiosSecure';
import useAuth from '../../../Hooks/Auth/useAuth';
import Loading from '../../../Pages/Loading/Loading';
import WhiteButton from '../Buttons/WhiteButton';
import useRole from '../../../Hooks/Role/useRole';


const BuyModal = ({ open, setOpen, product }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data } = useRole();

    // Buying Data
    const { mutateAsync } = useMutation({
        mutationFn: async (purchaseData) => {
            const { data } = await axiosSecure.post('/sellingHub', purchaseData);
            return data;
        },
        onSuccess: () => {
            toast.success('Your Product is on process, please wait for the confirmation');
            setOpen(!open);
        }
    });


    const { name, price, uuId } = product;

    const handleSubmit = async (e) => {
        const purchaseData = {
            product_name: name,
            product_quantity: 1,
            product_price: price,
            product_uuId: uuId,
            status: 'on_request',
            buyer_name: data?.name,
            buyer_number: data?.mobile,
            buyer_email: user?.email,
        };
        await mutateAsync(purchaseData);
    };



    if (loading) return <Loading />;
    return (
        <div>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none text-black" onClose={() => setOpen(!open)} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#8C8C8C]/80  ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded bg-[#BEBEBE] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className=" text-3xl text-center my-5 font-light">
                                Review
                            </DialogTitle>
                            <div className='flex justify-between px-5'>
                                <p className='font-raleway'>{name}</p>
                                <p>{price}</p>
                            </div>

                            <div className='mt-2 border-t border-black ' />
                            <div>
                                <p className='text-right mr-5'><span className='font-semibold'>Total : </span> {price}</p>
                            </div>

                            <div className="mt-4">

                                {/* user Details */}
                                <div className='font-raleway space-y-2'>
                                    <p>{user?.displayName}</p>
                                    <p><span className='font-semibold'>Email:</span> {user?.email}</p>
                                    <p><span className='font-semibold'>Payment:</span> {price}</p>

                                    <div className='flex justify-center' onClick={handleSubmit}>
                                        <WhiteButton text='Buy Now' />
                                    </div>
                                </div>

                            </div>
                        </DialogPanel>
                    </div>
                </div >
            </Dialog >
        </div >
    );
};

export default BuyModal;


