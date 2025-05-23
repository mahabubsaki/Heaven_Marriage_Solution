import React from 'react';

import { motion } from "framer-motion";
import useAuth from '../../../Hooks/Auth/useAuth';
import useRole from '../../../Hooks/Role/useRole';
const Logo = () => {

    const { user } = useAuth();
    const { image } = useRole();

    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md"
        >
            <img src={image || user?.photoURL} alt="" className='size-10 rounded object-cover' />
        </motion.div>
    );
};

export default Logo;