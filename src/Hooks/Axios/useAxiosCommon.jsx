import axios from "axios";
import React from 'react';
const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;