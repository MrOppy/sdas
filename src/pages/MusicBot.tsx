import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicBot = () => {
  useEffect(() => {
    window.location.href = 'https://mroppy.xyz/seggsbot/index.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          className="w-16 h-16 mx-auto relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent" />
        </motion.div>
        <p className="text-xl mt-4">Redirecting to Music Bot Website...</p>
      </motion.div>
    </div>
  );
};

export default MusicBot;