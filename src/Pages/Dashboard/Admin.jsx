import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import useRole from '../../Hooks/Role/useRole';

const Admin = () => {

    const { user, loading } = useAuth();
    const navItems = [
        { name: 'Add Product', to: '/dashboard/add_product' },
        { name: 'Manage Users', to: '/dashboard/users' },
        { name: 'Manage Sells', to: '/dashboard/manage_sells' },
        { name: 'Manage Proposals', to: '/dashboard/manage_proposals' },
        { name: 'Manage Transactions', to: '/dashboard/manage_transactions' },
        { name: 'Banner Image', to: '' },
        { name: 'Shop Image', to: '' },
    ];

    if (loading) return <Loading />;

    return (
        <div className='my-10'>
            <p className='font-bold font-lexend text-2xl ml-5'>Admin Pannel</p>


            <div className='grid grid-cols-4 w-full p-5 gap-4'>
                {
                    navItems.map((got, idx) => (
                        <div key={idx} className='bg-black rounded-xl gap-2 px-16 py-5 w-1/2 col-span-2 flex justify-center flex-col items-center text-center'>
                            <p className='text-white font-lexend'>{got?.name}</p>
                            <Link className='text-white font-lexend text-xs underline text-nowrap' to={got?.to}>Go To</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Admin;