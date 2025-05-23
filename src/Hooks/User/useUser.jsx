import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import useAuth from "../Auth/useAuth";
import React from 'react';

const useUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // user data form usersCollection
    const { data = [], isLoading } = useQuery({
        queryKey: ['usersData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    });

    const email = user?.email;
    const image = data?.image;
    const gender = data?.gender;
    const phone = data?.phone;
    const name = data?.name;
    const status = data?.status;
    const role = data?.role;


    return { email, image, gender, phone, isLoading, name, data, role, status };
};

export default useUser;