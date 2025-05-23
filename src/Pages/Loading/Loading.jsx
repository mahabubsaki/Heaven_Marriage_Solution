import React from 'react';
import { GiSelfLove } from "react-icons/gi";

const Loading = () => {

    return (
        <div className="flex justify-center items-center h-screen flex-col gap-3">
            <GiSelfLove className='text-red-500 text-5xl animate-ping' />
            <h1 className='text-xl font-vibes'>Heaven Marriage Solutions</h1>
        </div>
    );
};

export default Loading;