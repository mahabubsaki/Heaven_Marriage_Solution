import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import mahed from '/images/mahed.jpeg';

const TeamCard = () => {
    const teamMembers = [
        {
            name: 'মোহাম্মদ রাহেদ হোসেন মাহেদ খাঁন ',
            title: 'FOUNDER & CEO ',
            image: mahed,
            bio: 'Heaven Group and Heaven Marriage Solutions. ',
            social: {
                facebook: '#',
                linkedin: '#',
                email: 'mailto:someone@example.com'
            }
        },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 mt-5 pb-5">
            <h2 className="text-xl font-bold mb-4 text-gray-800">আমাদের কর্মকর্তাগণ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-56 h-56 rounded-full object-cover mb-4 border-4 border-[#cbd5e1]"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.title}</p>
                        <p className="mt-3 text-gray-600 text-sm">{member.bio}</p>
                        <div className="flex gap-4 mt-4 text-gray-500">
                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-blue-600" />
                            </a>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="text-green-700" />
                            </a>
                            <a href={member.social.email}>
                                <FaEnvelope className="" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamCard;