import React from 'react';
import Gradient from '../../Shared/Buttons/Gradient';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {


    const socialLinks = [
        { link: 'https://www.facebook.com/rahedhussain.mahed?rdid=sEK0iSSpyWU8Qnmm&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A3azCmEmu%2F#', icon: FaFacebook, class: 'bg-blue-400 text-white' },
        { link: 'https://www.facebook.com/profile.php?id=61576781690251&rdid=9creaqW8e9MpupMu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F152n9WsSF5C%2F#', icon: FaFacebook, class: 'bg-blue-400 text-white' },
        { link: '', icon: IoLogoYoutube, class: 'bg-red-400 text-white' },
        { link: '', icon: FaTwitter, class: 'bg-blue-400' },
        { link: '', icon: AiFillTikTok, class: 'text-white bg-black' },
    ];

    return (
        <div className='space-y-5 pb-5'>
            <div className='flex justify-center'>
                <Gradient engLang='Heaven Group' />
            </div>
            <div className='flex flex-row gap-3 justify-center'>
                <div className='flex justify-center gap-3 items-center flex-row'>
                    <a
                        href="https://api.whatsapp.com/send?phone=8801610371038&text=Hello%2C%20I%27m%20interested%21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-1 rounded-full"
                    >
                        <FaWhatsapp className='text-2xl' />
                    </a>

                    <a
                        href="https://api.whatsapp.com/send?phone=8801342665286&text=Hello%2C%20I%27m%20interested%21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-1 rounded-full"
                    >
                        <FaWhatsapp className='text-2xl' />
                    </a>
                </div>


                <div className='flex flex-row gap-3 justify-center items-center'>
                    {
                        socialLinks.map((got, idx) => {
                            const IconComponent = got.icon;
                            return (
                                <a
                                    key={idx}
                                    href={got?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={` text-white p-1 rounded-full ${got?.class}`}
                                >
                                    <IconComponent className="text-2xl" />
                                </a>
                            );
                        })
                    }
                </div>


            </div>
        </div>
    );
};

export default Footer;