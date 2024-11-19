import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Video, Loader } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import VideoPlayer from '../components/VideoPlayer';
import EnhancedPagination from '../components/EnhancedPagination';
import Footer from '../components/Footer';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadMediaLinks = async () => {
      try {
        const imagesResponse = await fetch('https://dl.dropboxusercontent.com/scl/fi/rgx3ahu12718gw99619fb/image.txt?rlkey=sur1tg6h93zgmzfbgrplfj37g');
        const videosResponse = await fetch('https://dl.dropboxusercontent.com/scl/fi/gncxui3rfgundyez41wvg/video.txt?rlkey=6rojadlbml2ns0zy9i9m2fcpv');
        
        const imagesText = await imagesResponse.text();
        const videosText = await videosResponse.text();
        
        setMedia({
          images: imagesText.split('\n').filter(Boolean),
          videos: videosText.split('\n').filter(Boolean),
        });
      } catch (error) {
        console.error('Error loading media:', error);
        setMedia({
          images: [
            'https://initiate.alphacoders.com/download/images8/1348853/png',
            'https://initiate.alphacoders.com/download/images/1348852/png',
          ],
          videos: [
            'https://dl.dropboxusercontent.com/scl/fi/umrhli3wrswixsr6lmpp5/Sukuna-Edit-Roses-AMV.mp4?rlkey=4kmm56d6kalxs239djlpj83o9',
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    loadMediaLinks();
  }, []);

  const currentMedia = media[activeTab];
  const totalPages = Math.ceil(currentMedia.length / itemsPerPage);
  const currentItems = currentMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const TabButton = ({ type, icon: Icon }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setActiveTab(type);
        setCurrentPage(1);
      }}
      className={`relative flex items-center px-8 py-4 rounded-xl ${
        activeTab === type
          ? 'text-white'
          : 'text-gray-400 hover:text-white'
      } transition-colors duration-300`}
    >
      {activeTab === type && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span className="capitalize font-medium">{type}</span>
      </span>
    </motion.button>
  );

  const ImageCard = ({ url, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: index * 0.1 }}
        className="aspect-square relative group overflow-hidden rounded-lg"
      >
        <motion.img
          src={url}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg"
              onClick={() => window.open(url, '_blank')}
            >
              View Full Size
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Media Gallery
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"
          />
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-xl">
            <div className="flex space-x-2">
              <TabButton type="images" icon={ImageIcon} />
              <TabButton type="videos" icon={Video} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-8 h-8" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="container mx-auto"
            >
              <div className={`grid gap-6 ${
                activeTab === 'images' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {currentItems.map((url, index) => (
                  activeTab === 'images' ? (
                    <ImageCard key={url} url={url} index={index} />
                  ) : (
                    <motion.div
                      key={url}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VideoPlayer url={url} />
                    </motion.div>
                  )
                ))}
              </div>

              {totalPages > 1 && (
                <EnhancedPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;