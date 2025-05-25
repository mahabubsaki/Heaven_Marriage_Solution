import React from 'react';
import Transaction from '../../Components/MemberRegistration/Transaction';
import Navbar from '../../Components/Shared/Navbar/Navbar';

const TransactionReceived = () => {
    return (
        <div className='pb-1'>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className='mt-12 mb-5 px-8'>
                <Transaction/>
            </div>

        </div>
    );
};

export default TransactionReceived;