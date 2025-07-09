import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OolnLandingProps {
  isMainContent?: boolean;
}

const OolnLanding: React.FC<OolnLandingProps> = ({ isMainContent = false }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8"
        initial={{ opacity: 0, y: isMainContent ? 50 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isMainContent ? -50 : -30 }}
        transition={{ duration: 0.8 }}
      >
        {!isMainContent ? (
          <>
            <motion.h1
              className="text-4xl md:text-6xl text-white font-light tracking-wide mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to OOLN
            </motion.h1>
            
            <motion.div
              className="flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="w-6 h-10 border-2 border-white/60 rounded-full mb-2 relative">
                <motion.div
                  className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <p className="text-white/60 text-sm">Scroll to explore</p>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="text-center max-w-4xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl text-white font-thin tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Meet OOLN
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light mb-8 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Guiding Intelligence
              </motion.h2>
              
              <motion.div
                className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-8"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              
              <motion.p
                className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Experience the future of trading with OOLN's sophisticated real-time AI assistant. 
                Designed for traders and investors seeking intelligent guidance in the fast-paced world of finance.
              </motion.p>
            </motion.div>
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
            </motion.div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default OolnLanding;