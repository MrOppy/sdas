import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isLoading, setIsLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transitionEnd: { display: "none" }}}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Animated circles background */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ 
              scale: [1, 2, 2, 1],
              opacity: [0.5, 0.2, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <div className={`w-32 h-32 rounded-full border-2 border-purple-500/30`} />
          </motion.div>
        ))}

        {/* Main content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%"],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Hello There
            </motion.h1>
            <motion.p
              className="text-4xl mt-4 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Welcome to my website
            </motion.p>
          </motion.div>

          {/* Animated loader */}
          <motion.div
            className="relative w-16 h-16 mx-auto"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-purple-500" />
            <div className="absolute inset-0 rounded-full border-r-2 border-pink-500 rotate-45" />
            <div className="absolute inset-0 rounded-full border-b-2 border-purple-500 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;