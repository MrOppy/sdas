import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio built with React and Framer Motion, featuring smooth animations and responsive design.",
      image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-portfolio.netlify.app",
      tags: ["React", "Framer Motion", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Music Discord Bot",
      description: "A feature-rich Discord music bot with web interface for easy control and management.",
      image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-music-bot.netlify.app",
      tags: ["Discord.js", "Node.js", "Express"]
    },
    {
      id: 3,
      title: "Gallery System",
      description: "Dynamic image and video gallery with advanced filtering and smooth transitions.",
      image: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?auto=format&fit=crop&q=80&w=1000",
      preview: "https://mroppy-gallery.netlify.app",
      tags: ["React", "TypeScript", "Tailwind CSS"]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, featuring web applications and creative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              index={index}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;