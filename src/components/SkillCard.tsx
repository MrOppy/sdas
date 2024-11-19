import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  icon: string;
  index: number;
}

const SkillCard = ({ name, level, color, icon, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
      className="relative group"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
        style={{ background: `linear-gradient(45deg, ${color}88, transparent)` }}
      />
      
      {/* Card content */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl overflow-hidden">
        {/* Skill icon */}
        <div className="mb-4 text-4xl">{icon}</div>
        
        {/* Skill name and level */}
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
        <span className="text-sm mt-1 inline-block">{level}%</span>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
          <div className="absolute inset-0 rotate-45 transform origin-bottom-left">
            <div className="w-full h-full" style={{ backgroundColor: color }} />
          </div>
        </div>
      </div>

      {/* Hover effect particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;