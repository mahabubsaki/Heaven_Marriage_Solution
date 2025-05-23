import React from 'react';
import { GiSelfLove } from "react-icons/gi";
import loading from '/images/loading_screen.jpeg';


const Loading = () => {

    return (
        <div 
        className="flex justify-center relative items-center h-screen flex-col gap-10">
        <img src={loading} className='absolute' alt="" />
            <GiSelfLove className='text-red-500 relative text-5xl animate-ping' />
            <h1 className='text-2xl font-vibes relative mb-7'>Heaven Marriage Solutions</h1>
        </div>
    );
};

export default Loading;