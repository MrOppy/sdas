import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  icon: Icon;
  index: number;
}

const SkillCard = ({ name, level, color, icon: IconComponent, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
      className="relative group"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
        style={{ background: `linear-gradient(45deg, ${color}88, transparent)` }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl overflow-hidden">
        {/* Skill icon with glow effect */}
        <div className="mb-4 relative">
          <motion.div
            className="absolute inset-0 blur-lg"
            style={{ backgroundColor: color, opacity: 0.3 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <IconComponent size={32} color={color} />
          </motion.div>
        </div>
        
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

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;