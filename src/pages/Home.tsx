import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Code2, Sparkles, Gamepad2, User } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';
import SectionNav from '../components/SectionNav';
import SkillCard from '../components/SkillCard';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('LandingSection');
  const { scrollY } = useScroll();

  const sections = [
    'LandingSection',
    'AboutMe',
    'TechnicalSkills',
    'GamesIPlay',
    'FavoriteTracks'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section,
        element: document.getElementById(section)
      }));

      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollPosition;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if the section is in view (with some buffer for better UX)
          if (scrollPosition >= sectionTop - viewportHeight / 3 && 
              scrollPosition < sectionBottom - viewportHeight / 3) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Rest of your existing code remains the same...
  const skills = [
    { name: 'React', level: 90, color: '#61DAFB', icon: '⚛️' },
    { name: 'TypeScript', level: 85, color: '#3178C6', icon: '📘' },
    { name: 'Tailwind CSS', level: 95, color: '#06B6D4', icon: '🎨' },
    { name: 'Node.js', level: 80, color: '#339933', icon: '🟢' },
    { name: 'Next.js', level: 75, color: '#000000', icon: '▲' },
    { name: 'Git', level: 85, color: '#F05032', icon: '📦' },
    { name: 'Figma', level: 70, color: '#F24E1E', icon: '🎯' },
    { name: 'AWS', level: 65, color: '#FF9900', icon: '☁️' }
  ];

  const spotifyTracks = [
    { id: '1', url: 'https://open.spotify.com/embed/track/0dHjeOAPtaSLhSyj5QN1KK?utm_source=generator' },
    { id: '2', url: 'https://open.spotify.com/embed/track/3hRV0jL3vUpRrcy398teAU?utm_source=generator' },
    { id: '3', url: 'https://open.spotify.com/embed/track/5pRElcsPZrgZXkoON2o5Go?utm_source=generator' },
    { id: '4', url: 'https://open.spotify.com/embed/track/1SKPmfSYaPsETbRHaiA18G?utm_source=generator' },
    { id: '5', url: 'https://open.spotify.com/embed/track/3tvX2wHfcDlr7rKdoSLCUO?utm_source=generator' },
    { id: '6', url: 'https://open.spotify.com/embed/track/7piw04hPQZ1OHZ9Fq9JOXR?utm_source=generator' },
  ];

  const games = [
    { name: 'GTA V ONLINE', platform: 'PC', image: 'https://dl.dropboxusercontent.com/scl/fi/05vapvvmqwvt9silf5ha4/gta-online-u1ipnwowk3bs7wrx.jpg?rlkey=8jeh7vuf0ieerlpxrkpqd9hs5' },
    { name: 'Free Fire', platform: 'Mobile/PC', image: 'https://dl.dropboxusercontent.com/scl/fi/8oe6ew2c3b557ly2odo81/free-fire-resort-island-3zxwkr4no39l70c4.jpg?rlkey=tmzz1we71atrty3njmf487y4u' },
    { name: 'Genshin Impact', platform: 'Mobile/PC', image: 'https://dl.dropboxusercontent.com/scl/fi/lchr94n4c9m1hbpefrop1/genshin-impact-xiao-lantern-festival-e19cw004vsi9sgfe.jpg?rlkey=52sgb688fujn52gbeby2mhiez' },
    { name: 'Wuthering Waves', platform: 'Mobile/PC', image: 'https://dl.dropboxusercontent.com/scl/fi/svn4g9xdb4ay8hzj67mva/wuthering-waves-game-artwork-6maoyl284x6bdt5f.jpg?rlkey=7rqpyq3iqjjchs9063z354g4b' },
    { name: 'Honkai Star Rail', platform: 'Mobile/PC', image: 'https://dl.dropboxusercontent.com/scl/fi/pq10dzjn38i72dtzewskc/honkai-star-rail-adventure-awaits-1eqppnliudoeb9b4.jpg?rlkey=niocnjpswowvqgqdnzqznzdwv' },
    { name: 'Brawlhalla', platform: 'Mobile/PC', image: 'https://dl.dropboxusercontent.com/scl/fi/hw40svarsv7eun6rn85mu/AllUnlocked_1920x1080-1.jpg?rlkey=mwzk2fexl9294z9tj16v43pyq' },
  ];

  const socialLinks = [
    { icon: faFacebook, url: 'https://www.facebook.com/mroppy69', color: 'hover:text-blue-500' },
    { icon: faInstagram, url: 'https://www.instagram.com/mroppy21', color: 'hover:text-pink-500' },
    { icon: faDiscord, url: 'http://discordapp.com/users/387161872136273922', color: 'hover:text-indigo-500' },
    { icon: faYoutube, url: 'https://www.youtube.com/@mroppy', color: 'hover:text-red-500' },
  ];

  const personalInfo = [
    {
      title: "Location & Background",
      items: [
        { icon: "📍", label: "Location", value: "Dhaka, Bangladesh" },
        { icon: "🎓", label: "Education", value: "Diploma in Civil Engineering" },
        { icon: "💼", label: "Currently Working on", value: "Front-end Web Developement" },
        { icon: "🌐", label: "Languages", value: "Bangla, English, Hindi, Urdhu" }
      ]
    },
    {
      title: "Professional Journey",
      items: [
        { icon: "💻", label: "Experience", value: "6+ Months in Web Dev" },
        { icon: "🎯", label: "Specialization", value: "Front-end Development" },
        { icon: "🚀", label: "Projects", value: "6+ Completed" },
        { icon: "🏆", label: "Goal", value: "SEO Optimization" }
      ]
    },
    {
      title: "Personal Interests",
      items: [
        { icon: "🎮", label: "Gaming", value: "Competitive & Casual" },
        { icon: "🎨", label: "Anime", value: "Somewhat Regular" },
        { icon: "🎵", label: "Music", value: "All Genre" },
        { icon: "📚", label: "Learning", value: "Always Growing" }
      ]
    }
  ];

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} setIsLoading={setIsLoading} />;
  }

  return (
    <div className="pt-16 overflow-x-hidden">
      <SectionNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Hero Section */}
      <section 
        id="LandingSection"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm{' '}
              <motion.span
                className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent relative inline-block"
                animate={{
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                MR. OPPY
              </motion.span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 h-20">
              <TypeAnimation
                sequence={[
                  'Front-end Web Developer',
                  2000,
                  'Gaming Enthusiast',
                  2000,
                  'Level 0 Rizzler',
                  2000,
                ]}
                repeat={Infinity}
              />
            </div>
            
            <motion.div 
              className="flex justify-center space-x-6 mt-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {socialLinks.map(({ icon, url, color }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  className={`p-3 bg-white/5 rounded-full hover:bg-white/10 ${color} transition-all duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={icon} className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Me Section */}
      <section 
        id="AboutMe"
        className="min-h-screen py-20 bg-gradient-to-b from-black via-purple-900/10 to-black flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            <User className="inline-block mr-2 mb-1" />
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {personalInfo.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg blur-xl" />
                <div className="relative bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10 h-full transform transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.items.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 group"
                      >
                        <span className="text-2xl group-hover:scale-125 transition-transform">
                          {item.icon}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">{item.label}</p>
                          <p className="text-white group-hover:text-purple-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section 
        id="TechnicalSkills"
        className="min-h-screen py-20 flex items-center relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            <Code2 className="inline-block mr-2 mb-1" />
            Technical Skills
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Section */}
      <section 
        id="GamesIPlay"
        className="min-h-screen py-20 bg-black/50 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            <Gamepad2 className="inline-block mr-2 mb-1" />
            Games I Play
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        </div>
      </section>

      {/* Favorite Music Section */}
      <section 
        id="FavoriteTracks"
        className="min-h-screen py-20 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            <Sparkles className="inline-block mr-2 mb-1" />
            Favorite Tracks
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotifyTracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-video"
              >
                <iframe
                  src={track.url}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="encrypted-media"
                  className="rounded-lg"
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;