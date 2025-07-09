import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import useRole from '../../Hooks/Role/useRole';

const Admin = () => {

    const { user, loading } = useAuth();
    const navItems = [
        // { name: 'Add Product', to: '/dashboard/add_product' },
        { name: 'Users', to: '/dashboard/all_users' },
        { name: 'Members', to: '/dashboard/users' },
        { name: 'Add Products', to: '/dashboard/add_product' },
        { name: 'Product Orders', to: '/dashboard/product_orders' },
        // { name: 'Manage Sells', to: '/dashboard/manage_sells' },
        // { name: 'Manage Proposals', to: '/dashboard/manage_proposals' },
        { name: 'Transactions', to: '/dashboard/manage_transactions' },
        { name: 'My Products', to: '/dashboard/my_products' },
        // { name: 'Forms', to: '/dashboard/all_forms' },
        // { name: 'Banner Image', to: '' },
        // { name: 'Shop Image', to: '' },
    ];

    if (loading) return <Loading />;

    return (
        <div className='bg-[#c3cedf] min-h-[100dvh]'>

            <div className='grid grid-cols-2 w-full p-5 gap-4'>
                {
                    navItems.map((got, idx) => (
                        <Link key={idx} className='bg-[#c3cedf] shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6] text-gray-600 h-[100px] flex justify-center items-center rounded-full' to={got?.to}>
                            <p className=''>{got?.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Admin;