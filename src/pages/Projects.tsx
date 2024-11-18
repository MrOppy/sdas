import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio built with React and Framer Motion",
      image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-portfolio.netlify.app",
      tags: ["React", "Framer Motion", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Music Discord Bot",
      description: "A feature-rich Discord music bot with web interface",
      image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-music-bot.netlify.app",
      tags: ["Discord.js", "Node.js", "Express"]
    },
    {
      id: 3,
      title: "Gallery System",
      description: "Dynamic image and video gallery with filtering",
      image: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-gallery.netlify.app",
      tags: ["React", "TypeScript", "Tailwind CSS"]
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;