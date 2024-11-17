import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

const NavLink = ({ to, children }) => {
  const { isDark } = useThemeStore();

  return (
    <Link to={to} className="relative group">
      <motion.span 
        className={`relative z-10 px-4 py-2 block transition-colors duration-200 ${
          isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'
        }`}
        whileHover={{ y: -2 }}
      >
        {children}
      </motion.span>
      <motion.div
        className={`absolute inset-0 rounded-lg -z-0 ${
          isDark 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
            : 'bg-gradient-to-r from-purple-400 to-pink-400'
        }`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-current"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

export default NavLink;