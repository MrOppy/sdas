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
}

const ProjectCard = ({ id, title, description, image, preview, tags }: ProjectCardProps) => {
  // Create gradient text effect for number
  const numberStyle = {
    background: 'linear-gradient(to right, white 50%, transparent 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* Glass morphism card */}
      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        {/* Project image container */}
        <div className="relative h-48 overflow-hidden">
          {/* Project number overlay with gradient fade effect */}
          <div className="absolute top-4 left-4 z-10">
            <span 
              className="text-6xl font-bold"
              style={numberStyle}
            >
              {id}
            </span>
          </div>

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Preview button */}
          <motion.a
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Project
          </motion.a>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;