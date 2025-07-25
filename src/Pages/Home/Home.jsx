import Footer from "../../Components/Main/Footer/Footer";
import Banner from "../../Components/Main/Home/Banner";
import ImgAlbum from "../../Components/Main/Home/ImgAlbum";
import Gradient from "../../Components/Shared/Buttons/Gradient";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import useAuth from "../../Hooks/Auth/useAuth";
import Loading from "../Loading/Loading";
import React from 'react';

const Home = () => {

    const { loading } = useAuth();

    if (loading) return <Loading />;

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />
            <Banner />
            <ImgAlbum />
            <div className='flex justify-center mb-5'>
                <Gradient engLang='Heaven Marriage' />
            </div>
        </div>
    );
};

export default Home;