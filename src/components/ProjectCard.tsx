import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  preview: string;
  tags: string[];
  index?: number;
}

const ProjectCard = ({ id, title, description, image, preview, tags, index = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-colors duration-300"
    >
      {/* Project number overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div 
          className="absolute top-0 left-0 pl-6 pt-6"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent'
          }}
        >
          <span className="text-[8rem] font-bold leading-none">
            {id}
          </span>
        </div>
      </div>

      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 p-6">
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preview button */}
        <a
          href={preview}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-white font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Project
          </motion.button>
        </a>
      </div>

      {/* Hover effects */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(600px circle at 0% 0%, rgba(147,51,234,0.1), transparent)',
                'radial-gradient(600px circle at 100% 100%, rgba(147,51,234,0.1), transparent)',
                'radial-gradient(600px circle at 0% 0%, rgba(147,51,234,0.1), transparent)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;