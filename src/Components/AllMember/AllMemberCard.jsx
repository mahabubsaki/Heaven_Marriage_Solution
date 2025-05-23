import { Link } from "react-router-dom";
import WhiteButton from "../Shared/Buttons/WhiteButton";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/Auth/useAuth";
import Loading from "../../Pages/Loading/Loading";
import React from 'react';


const AllMemberCard = ({ data }) => {

    const { image, age, height, location, name, member_email } = data;
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async (sentRequest) => {
            const { data } = await axiosSecure.post('/sent_request', sentRequest);
            return data;
        },
        onSuccess: () => {
            toast.success('Request Sent Successfully');
        }
    });

    const handleRequest = async (e) => {
        if (e?.member_email === user?.email) return toast.error("can't sent own  request");
        const sentRequest = {
            request_from: user?.email,
            requested_user_image: e?.image,
            requested_user_name: e?.name,
            requested_email: e?.member_email,
            status: 'not verified',
            request_status: 'requested'
        };
        await mutateAsync(sentRequest);
    };

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col md:flex-row rounded-3xl shadow-xl md:mx-10">
            <div>
                <img src={image} className="w-full size-[300px] md:size-[400px] object-cover rounded-t-2xl md:rounded-l-2xl" alt="" />
            </div>
            <div className=" w-full flex flex-col justify-center px-8 my-5">
                <p className="text-2xl my-5 font-semibold">{name}</p>
                <div className="space-y-1">
                    <p className="text-[#6E7074]">বয়স : {age}</p>
                    <p className="text-[#6E7074]">উচ্চতা : {height}</p>
                    <p className="text-[#6E7074]">ঠিকানা : {location}</p>
                    <Link className="" to={`/user_details/${member_email}`}><span className="underline">বিস্তারিত</span></Link>
                </div>
                <div className="py-3 flex gap-5">
                    <button onClick={() => handleRequest(data)}>
                        <WhiteButton text={'প্রস্তাব পাঠান'} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllMemberCard;