import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download,
  Maximize,
  Minimize,
  Loader
} from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
}

const VideoPlayer = ({ url, thumbnail }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const handleLoadedData = () => setIsVideoLoaded(true);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleDownload = () => {
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        src={url}
        poster={thumbnail}
        onClick={handlePlayPause}
        preload="metadata"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="w-8 h-8" />
          </motion.div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      {!isPlaying && !isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
          onClick={handlePlayPause}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-500"
          >
            <Play className="w-8 h-8" />
          </motion.div>
        </motion.div>
      )}

      {/* Video Controls */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">{formatTime(currentTime)}</span>
          <div 
            ref={progressRef}
            className="relative flex-grow h-1 bg-white/10 rounded-full cursor-pointer group/progress hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            {/* Buffered Progress */}
            <div 
              className="absolute h-full bg-white/30 rounded-full"
              style={{ width: `${(buffered / duration) * 100}%` }}
            />
            {/* Playback Progress */}
            <div 
              className="absolute h-full bg-purple-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              {/* Thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full scale-0 group-hover/progress:scale-100 transition-transform duration-150" />
            </div>
          </div>
          <span className="text-sm font-medium">-{formatTime(duration - currentTime)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-1 hover:text-purple-500 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          {/* Volume Controls */}
          <div className="flex items-center gap-2 group/volume">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMuteToggle}
              className="p-1 hover:text-purple-500 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </motion.button>
            <div className="relative w-20 h-1 bg-white/10 rounded-full group-hover/volume:h-2 transition-all duration-200">
              <div 
                className="absolute h-full bg-purple-500 rounded-full"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full scale-0 group-hover/volume:scale-100 transition-transform duration-150" />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-grow" />

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDownload}
            className="p-1 hover:text-purple-500 transition-colors"
          >
            <Download size={20} />
          </motion.button>

          {/* Fullscreen Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFullscreenToggle}
            className="p-1 hover:text-purple-500 transition-colors"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;