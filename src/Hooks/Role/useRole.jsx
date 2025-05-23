import { useQuery } from "@tanstack/react-query";
import useAuth from "../Auth/useAuth";
import useAxiosSecure from "../Axios/useAxiosSecure";
import React from 'react';

const useRole = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading } = useQuery({
        queryKey: ['getRole'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        },
        enabled: !!user?.email
    });

    const role = data?.role;
    const name = data?.name;
    const status = data?.status;
    const gender = data?.gender;
    const image = data?.image;
    const transaction_status = data?.transaction_status;

    return { role, status, isLoading, gender, image, data, name, transaction_status };
};

export default useRole;
