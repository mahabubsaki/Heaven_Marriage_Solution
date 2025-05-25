import React from 'react';

import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from './Logo';
import useAuth from '../../../Hooks/Auth/useAuth';
import useRole from '../../../Hooks/Role/useRole';
const TitleSection = ({ open }) => {
    const { user } = useAuth();
    const { name } = useRole();

    return (
        <div className="mb-3 border-b border-slate-300 pb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-3">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <span className="block text-xs font-semibold">{name || user?.displayName}</span>
                            <span className="block text-xs break-all">{user?.email}</span>
                        </motion.div>
                    )}
                </div>
                {open && <FiChevronDown className="mr-2" />}
            </div>
        </div>
    );
};

export default TitleSection;