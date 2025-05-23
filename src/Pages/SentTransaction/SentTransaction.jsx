import React from 'react';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import useAuth from '../../Hooks/Auth/useAuth';
import Loading from '../Loading/Loading';
import InProcessNotVerf from '../../Components/MemberRegistration/InProcessNotVerf';

const SentTransaction = () => {
    const { loading } = useAuth();

    if (loading) return <Loading />;
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className='mt-12 mb-5 px-8'>
                <InProcessNotVerf />
            </div>

        </div>
    );
};

export default SentTransaction;