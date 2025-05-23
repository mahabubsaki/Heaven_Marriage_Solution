import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/Axios/useAxiosCommon";
import ProductCard from "../../Shared/Card/ProductCard";
import WhiteButton from "../../Shared/Buttons/WhiteButton";
import { Link } from "react-router-dom";
import React from 'react';

const Other = () => {

    const axiosCommon = useAxiosCommon();

    const { data = [] } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/products');
            return data;
        }
    });

    return (
        <div className="max-w-7xl w-full mx-auto my-36 px-8">
            <h1 className="my-10 text-4xl">Other facilities</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {
                    data.slice(0, 4).map((got, idx) => (
                        <ProductCard key={idx} productData={got} />
                    ))
                }
            </div>

            <div className=" max-w-[200px] w-full mx-auto my-10">
                <Link>
                    <WhiteButton text={'See All'} />
                </Link>
            </div>

        </div>
    );
};

export default Other;