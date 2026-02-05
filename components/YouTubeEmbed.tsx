'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YouTubeEmbed({ videoId, title = 'Vidéo YouTube' }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full my-8 rounded-xl overflow-hidden shadow-xl"
      style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
    >
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg cursor-pointer group"
          onClick={() => setIsLoaded(true)}
          whileHover={{ scale: 1.02 }}
        >
          {/* Thumbnail */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => {
              // Fallback to standard quality if maxres not available
              e.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
            }}
          />
          
          {/* Play Button */}
          <motion.div
            className="relative z-10 w-20 h-20 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center shadow-glow-md dark:shadow-glow-green-md group-hover:scale-110 transition-transform"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      )}

      {isLoaded && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </motion.div>
  );
}
