import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionNavProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SectionNav = ({ sections, activeSection, onSectionChange }: SectionNavProps) => {
  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section}
          onClick={() => {
            onSectionChange(section);
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative w-3 h-3"
          whileHover={{ scale: 1.2 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              activeSection === section
                ? 'bg-purple-500 border-purple-500'
                : 'border-purple-500/50 group-hover:border-purple-500'
            } transition-colors duration-200`}
          />
          {/* Glowing effect for active section */}
          {activeSection === section && (
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          <AnimatePresence>
            {/* Enhanced tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              whileHover={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="absolute left-0 -translate-x-[calc(100%+1rem)] top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <motion.div
                className="px-3 py-2 rounded-lg bg-purple-500 text-white text-sm whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut"
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {section.split(/(?=[A-Z])/).join(' ')}
                </motion.span>
                {/* Decorative line */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-purple-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SectionNav;