import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
    const socialLinks = [
        { href: 'https://www.facebook.com/rahedhussain.mahed', icon: FaFacebook, bg: 'bg-blue-500' },
        { href: 'https://www.facebook.com/profile.php?id=61576781690251', icon: FaFacebook, bg: 'bg-blue-500' },
        { href: '', icon: FaInstagram, bg: 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500' }
    ];

    const whatsappNumbers = [
        '8801610371038',
        '8801342665286'
    ];

    return (
        <div className="bg-slate-800 text-gray-200 py-8 px-4 text-center space-y-6">
            <div>
                <h1 className="text-xl font-semibold">Heaven Marriage | হেভেন ম্যারেজ</h1>
                <p className="text-sm">heaven-marriage-solutions.com</p>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
                {whatsappNumbers.map((num, i) => (
                    <a
                        key={i}
                        href={`https://api.whatsapp.com/send?phone=${num}&text=Hello%2C%20I%27m%20interested%21`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-2 rounded-full hover:scale-105 transition"
                    >
                        <FaWhatsapp className="text-xl" />
                    </a>
                ))}

                {socialLinks.map(({ href, icon: Icon, bg }, i) => (
                    <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${bg} text-white hover:scale-105 transition`}
                    >
                        <Icon className="text-xl" />
                    </a>
                ))}
            </div>

            <div className="text-sm space-y-1">
                <p>কপিরাইট © 2025 – সমস্ত অধিকার সংরক্ষিত</p>
            </div>
        </div>
    );
};

export default Footer;
