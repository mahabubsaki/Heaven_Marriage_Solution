import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from 'react';

const ProductCard = ({ productData }) => {

    const { _id, image, category, price, availability, name } = productData;

    return (
        <Link to={`/product/${_id}`}>
            <div className="relative group h-[400px] min-w-[300px] bg-[#F9F6EE] text-black overflow-hidden shadow-xl">
                <div className=" min-h-52 h-full transition-transform duration-300 group-hover:scale-110 " style={{
                    backgroundImage: `url("${image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} />
                <p className="absolute font-semibold text-white top-3 right-3">{availability}</p>

                <div className="absolute bottom-0 z-10 bg-[#F9F6EE] w-full p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-base font-light">{category}</h1>
                        <p className="text-xl font-medium">${price}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xl">{name?.slice(0, 20)}</p>
                        <div className="flex justify-between mt-2">
                            <button><FaArrowRight></FaArrowRight></button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;