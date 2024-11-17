import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MusicBot from './pages/MusicBot';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDark } = useThemeStore();

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-black text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <ThemeToggle />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/music-bot" element={<MusicBot />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;