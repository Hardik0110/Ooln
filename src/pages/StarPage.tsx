import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const StarPage = () => {
  const [stage, setStage] = useState(0); // 0: star entry, 1: mission text, 2: light spread
  const [expanded, setExpanded] = useState(false);

  // Progress through animation stages
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 2) {
        setStage(stage + 1);
      }
    }, stage === 0 ? 2000 : 3500);
    
    return () => clearTimeout(timer);
  }, [stage]);

  // Handle star expansion
  const expandStar = () => {
    setExpanded(true);
    setTimeout(() => setStage(2), 500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center  overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              background: `radial-gradient(circle, #4fd1c5, #2d3748)`,
            }}
          />
        ))}
      </div>
      
      {/* Stage 0: Star entry from bottom */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ y: 300, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 15,
              stiffness: 200,
              duration: 1.5
            }}
            className="relative z-20"
          >
            <div className="relative w-32 h-32">
              {/* Star glow */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-500/40 blur-xl"
              />
              
              {/* Star core */}
              <svg 
                width="128" 
                height="128" 
                viewBox="0 0 128 128" 
                className="relative z-10"
              >
                <path 
                  d="M64 0L79.5922 48.4078L128 64L79.5922 79.5922L64 128L48.4078 79.5922L0 64L48.4078 48.4078L64 0Z" 
                  fill="url(#starGradient)"
                />
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#f0abfc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 1: Mission statement */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-10 top-1/3 max-w-md z-10 text-right p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-light text-cyan-100 leading-relaxed"
            >
              "To equip everyday people with real-time AI that makes high-stakes decisions simple."
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={expandStar}
              className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-cyan-400/30 transition-all"
            >
              Continue Journey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Light spread and final text */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-30 flex flex-col items-center justify-center text-center"
          >
            {/* Expanding light effect */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.3 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20"
            />
            
            {/* Final text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
            >
              We made all of it.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-3xl font-light italic text-cyan-100"
            >
              Simple. Sophisticated.
            </motion.div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden z-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 2}px`,
                    height: `${Math.random() * 10 + 2}px`,
                    background: `radial-gradient(circle, #a5f3fc, #c084fc)`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                    opacity: [0.8, 0.2, 0.8],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle UI elements */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-cyan-100/50">
        The future of decision intelligence
      </div>
    </div>
  );
};

export default StarPage;