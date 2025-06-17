import React from 'react';

const UserDetailsForm = ({ data = [], got = [], heading = '' }) => {

    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-4'>
            <p className='text-xl font-bold border-b py-2 border-black'>{heading}</p>
            <div className='border border-gray-200 p-4 rounded-lg space-y-2'>
                {
                    got.map((gotData, index) => (
                        <div key={index} className='mb-2 border-b rounded space-y-3 py-1'>
                            <p className=" text-[15px] text-justify font-medium">{gotData?.question} </p>
                            <p className="bg-white text-xs text-justify text-gray-600 ">{data?.[gotData?.name] || 'কোন উত্তর নেই'}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserDetailsForm;