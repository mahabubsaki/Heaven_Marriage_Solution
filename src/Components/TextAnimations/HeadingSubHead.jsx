import { motion } from 'framer-motion';
import SplitString from '../../Utils/SplitString';
import underLineImg from '/images/underline_img2.png';
import React from 'react';


const HeadingSubHead = ({ heading = '', subHeading = '' }) => {
    const headingChars = SplitString(heading);
    const subHeadingChars = SplitString(subHeading);

    const charVariants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 }
    };


    return (
        <div>
            {/* heading */}
            <motion.h2
                initial="hidden"
                whileInView="reveal"
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
                className="text-[clamp(25px,5vw,30px)] font-bold mb-5 text-center">

                {headingChars.map((char, idx) => (
                    <motion.span key={idx} transition={{ duration: 0.5, ease: 'easeInOut' }} variants={charVariants} className='text-[#C3937C] font-galada'>
                        {char}
                    </motion.span>
                ))}

            </motion.h2>

            {/* subHeading */}
            <motion.h2
                initial="hidden"
                whileInView="reveal"
                transition={{ staggerChildren: 0.025 }}
                viewport={{ once: true }}
                className=" my-2 text-center text-[clamp(16px,3vw,20px)] font-galada">

                {subHeadingChars.map((char, idx) => (
                    <motion.span className='text-black' key={idx} transition={{ duration: 1.2 }} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}

            </motion.h2>

            <div className='flex justify-center'>
                <motion.img
                    initial={{ opacity: 0 }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 1.2,
                            ease: 'easeIn',
                            delay: 0.8
                        }
                    }}
                    viewport={{ once: true }}
                    src={underLineImg} className='h-[30px] -mt-3 object-contain' alt="" />
            </div>


        </div>
    );
};

export default HeadingSubHead;