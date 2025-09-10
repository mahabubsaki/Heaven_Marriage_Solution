import React from 'react';
import { GiSelfLove } from "react-icons/gi";
import loading from '/images/loading_screen.jpeg';
import img from '/images/logo.png';

const Loading = () => {

    return (
        <div
            className="flex justify-center relative items-center h-screen flex-col gap-10">
            <img src={img} alt="" />
        </div>
    );
};

export default Loading;