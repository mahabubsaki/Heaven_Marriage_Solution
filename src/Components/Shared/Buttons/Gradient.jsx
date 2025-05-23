import React from 'react';
import { Link } from 'react-router-dom';

const Gradient = ({ engLang = '' }) => {
    return (
        <div>
            <button
                className="px-4 mx-5 flex items-center gap-2 w-[340px]
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 font-semibold rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300 flex-col"
            >
                <div className="flex flex-row gap-3">
                    <span className="inline-flex font-semibold font-marck text-2xl">{engLang}</span>
                    <span className="inline-flex pt-1 font-galada">সম্পর্কে জানতে</span>
                </div>
                <Link className='text-center -mt-1 font-galada text-blue-400 underline'>ক্লিক করুন !</Link>
            </button>

        </div>
    );
};

export default Gradient;