import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Personal Website",
      description: "Personal website built with React and Framer Motion, featuring smooth animations and responsive design.",
      image: "https://dl.dropboxusercontent.com/scl/fi/u66vdez7stg1wnsa5ngah/622FF06D-85E2-4C26-BD54-9792A341CF13.png?rlkey=a1ahbe1bljynjmdvr76shkrsc",
      preview: "https://celadon-phoenix-f41928.netlify.app/",
      tags: ["React", "Framer Motion", "Tailwind CSS"]
    },
    {
      id: 2,
      title: "Marketing Website",
      description: "Sleek marketing platform built with React and Framer Motion, combining minimalist aesthetics with smooth animations for a fully responsive user experience.",
      image: "https://dl.dropboxusercontent.com/scl/fi/5cmvks0v1lav36ps2plmu/60755599-6627-4FD5-9D40-D1147976DD93.png?rlkey=4drt75x255dq48v02dxbrtjuo",
      preview: "https://setuofc7.com",
      tags: ["React", "Framer Motion", "Tailwind CSS"]
    },
    {
      id: 3,
      title: "Signal Generator Web App",
      description: "Clean, minimalist trading dashboard that delivers time-synchronized Quotex signals across different market types",
      image: "https://dl.dropboxusercontent.com/scl/fi/tykci0h01vwyfxy3zr6ia/6E2CF6A7-76F1-4CAB-8F46-3BF2666D435F.png?rlkey=bxl1v8ri3a6tm8mabs1ur9twf",
      preview: "https://quotex.setuofc7.com",
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