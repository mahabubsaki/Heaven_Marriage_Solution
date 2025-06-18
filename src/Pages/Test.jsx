import React from 'react';
import { Search } from 'lucide-react';

const Test = () => {

    const searchStyles = [
        'rounded-full',
        'rounded-xl',
        'rounded-full h-12',
        'rounded-xl h-12'
    ];

    return (
        <div>
            <div className="min-h-screen bg-[#c3cedf] flex flex-col justify-center items-center gap-6 p-10 font-sans">
                {searchStyles.map((style, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className={`flex items-center px-5 py-3 bg-[#c3cedf] shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6] text-gray-600 ${style} w-72 md:w-96`}
                        >
                            <input
                                type="text"
                                placeholder="Search...."
                                className="bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-500"
                            />
                        </div>
                        <div className="p-3 bg-[#c3cedf] shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6] rounded-full">
                            <Search size={20} className="text-gray-600" />
                        </div>
                    </div>
                    // awdawdaw
                ))}
            </div>
        </div>
    );
};

export default Test;