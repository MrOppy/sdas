import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-colors duration-300 ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 text-yellow-400' 
          : 'bg-black/10 hover:bg-black/20 text-purple-600'
      }`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;