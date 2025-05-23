import { Link } from "react-router-dom";
import React from 'react';

const FemaleCard = ({ data }) => {
    const { image, age, height, location, name, member_email } = data;


    return (
        <Link to={`/user_details/${member_email}`}>
            <div className="rounded max-w-[350px] w-full p-5 py-16 space-y-3 shadow-2xl">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-[#6E7074]">Age : {age}</p>
                <p className="text-[#6E7074]">Height : {height}</p>
                <p className="text-[#6E7074]">From : {location}</p>
            </div>
        </Link>
    );
};

export default FemaleCard;;