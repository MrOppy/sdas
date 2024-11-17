import React from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ name, image, platform }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group overflow-hidden rounded-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-300">{platform}</p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-purple-500/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default GameCard;