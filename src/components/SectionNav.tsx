import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Gamepad2, Music } from 'lucide-react';

interface SectionNavProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SectionNav = ({ sections, activeSection, onSectionChange }: SectionNavProps) => {
  const sectionIcons = {
    LandingSection: { icon: Home, label: 'Home' },
    AboutMe: { icon: User, label: 'About Me' },
    TechnicalSkills: { icon: Code2, label: 'Skills' },
    GamesIPlay: { icon: Gamepad2, label: 'Games' },
    FavoriteTracks: { icon: Music, label: 'Music' }
  };

  return (
    <motion.div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 md:right-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {sections.map((section, index) => {
        const { icon: Icon, label } = sectionIcons[section];
        const isActive = activeSection === section;
        
        return (
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
                isActive
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-purple-500/50 group-hover:border-purple-500'
              } transition-colors duration-200`}
            />
            
            {isActive && (
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
              {/* Only show tooltip on desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileHover={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                className="absolute left-0 -translate-x-[calc(100%+1rem)] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
              >
                <motion.div
                  className="px-3 py-2 rounded-lg bg-purple-500 text-white text-sm whitespace-nowrap flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {label}
                  </motion.span>
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
        );
      })}
    </motion.div>
  );
};

export default SectionNav;