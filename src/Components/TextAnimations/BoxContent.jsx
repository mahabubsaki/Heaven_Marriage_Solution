import { motion } from 'framer-motion';
import SplitString from '../../Utils/SplitString';
import React from 'react';

const BoxContent = ({ heading = '', subHeading = '', lists = '' }) => {

    // heading
    const headingChars = SplitString(heading);
    const subHeadingChars = SplitString(subHeading);

    const charVariants = {
        hidden: { opacity: 0 },
        reveal: { opacity: 1 }
    };

    const containerVariants = {
        hidden: { opacity: 0, },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    // Individual <li> variants
    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    };

    return (
        <div>
            {/* top heading */}
            <motion.h2
                initial="hidden"
                whileInView="reveal"
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
                className="mb-2 font-semibold text-center">

                {headingChars.map((char, idx) => (
                    <motion.span className='text-black text-[clamp(25px,4vw,30px)] font-galada' key={idx} transition={{ duration: 0.5 }} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}

            </motion.h2>


            {/* subHeading */}
            <motion.h2
                initial="hidden"
                whileInView="reveal"
                transition={{ staggerChildren: 0.05 }}
                viewport={{ once: true }}
                className="mb-2 font-semibold">

                {subHeadingChars.map((char, idx) => (
                    <motion.span className='text-[#C3937C] font-galada' key={idx} transition={{ duration: 0.5 }} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}

            </motion.h2>

            {/* lists */}
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="pl-5"
            >
                {lists.map((text, index) => (
                    <motion.li className="pt-2 text-black list-disc text-[clamp(12px,3vw,15px)] font-galada" key={index} variants={itemVariants}>
                        {text}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default BoxContent;