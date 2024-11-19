import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { Image as ImageIcon, Video, Loader } from 'lucide-react';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [media, setMedia] = useState({ images: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      className={`flex items-center px-6 py-3 rounded-lg ${
        activeTab === type
          ? 'bg-purple-500 text-white'
          : 'bg-white/5 hover:bg-white/10'
      } transition-colors duration-200`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </motion.button>
  );

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Media Gallery
        </motion.h1>

        <div className="flex justify-center space-x-4 mb-12">
          <TabButton type="images" icon={ImageIcon} />
          <TabButton type="videos" icon={Video} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'images' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((url, index) => (
                    <motion.div
                      key={url}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-square relative group"
                    >
                      <img
                        src={url}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-4 py-2 bg-white text-black rounded-lg"
                          onClick={() => window.open(url, '_blank')}
                        >
                          View Full Size
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentItems.map((url, index) => (
                    <motion.div
                      key={url}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-video bg-black/20 rounded-lg overflow-hidden"
                    >
                      <ReactPlayer
                        url={url}
                        width="100%"
                        height="100%"
                        controls
                        light
                        playing={false}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
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