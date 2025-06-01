import BlackButton from "../../Components/Shared/Buttons/BlackButton";
import WhiteButton from "../../Components/Shared/Buttons/WhiteButton";
import HeadingSubHead from "../../Components/TextAnimations/HeadingSubHead";
import { motion } from 'framer-motion';
import useAuth from "../../Hooks/Auth/useAuth";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import useUser from "../../Hooks/User/useUser";
import useRole from "../../Hooks/Role/useRole";
import GuestAndNotVerf from "../../Components/MemberRegistration/GuestAndNotVerf";
import InProcessNotVerf from "../../Components/MemberRegistration/InProcessNotVerf";
import MemberVerified from "../../Components/MemberRegistration/MemberVerified";
import Transaction from "../../Components/MemberRegistration/Transaction";
import GirlsVerified from "../../Components/MemberRegistration/GirlsVerified";

const MemberRegistration = () => {

    const { user, loading } = useAuth();
    // const { gender, isLoading, email, name, data: sues } = useUser();
    const { role, status, isLoading: roleLoading, transaction_status } = useRole();

    // check if user previously submitted the form or not
    const axiosSecure = useAxiosSecure();
    const { data: formData = [], isLoading: formLoading } = useQuery({
        queryKey: ['check_form_submitted', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/check_form_user/${user?.email}`,);
            return data;
        }
    });

    const { data: profileUser = [], isLoading } = useQuery({
        queryKey: ['usersData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const gender = profileUser?.gender;

    // console.log(status, role, transaction_status);

    if (loading || isLoading || formLoading || roleLoading) return <Loading />;
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1,
                transition: {
                    ease: 'easeIn',
                    duration: 2,
                    delay: 1
                }
            }}
            viewport={{ once: true }}
            className="">

            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2    ">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className="px-10 mt-12">
                <HeadingSubHead heading="Heaven Marriage Solutions (HMS)" subHeading="বিশুদ্ধতা, বিশ্বস্ততা ও সুন্নাহ-সম্মত বিবাহের নির্ভরযোগ্য প্রতিষ্ঠান" />

                <div className="max-w-7xl mx-auto w-full space-y-5">

                    {/* for not verified and guest */}
                    {
                        !user &&
                        <GuestAndNotVerf />
                    }
                    {(status === 'not verified' && role === 'guest') && <GuestAndNotVerf />}


                    {/* not verified and in process
                    after the form submission
                    */}
                    {
                        status === 'in process' && role === 'in process' && transaction_status === 'not verified' && <InProcessNotVerf />
                    }

                    {/* transection send now wait for the transaction verification and become a member */}
                    {
                        transaction_status === 'in process' && status === 'in process' && role === 'in process' && <Transaction />
                    }
                    {
                        transaction_status === 'verified' && status === 'in process' && role === 'in process' && <Transaction />
                    }

                    {/* girls verified */}
                    {gender === 'female' && status === 'verified' && role === 'member' && <GirlsVerified />}

                    {/* member and verified */}
                    {
                        status === 'verified' && role === 'member' && transaction_status === 'verified' && <MemberVerified />
                    }


                </div>
            </div>


        </motion.div>
    );
};

export default MemberRegistration;