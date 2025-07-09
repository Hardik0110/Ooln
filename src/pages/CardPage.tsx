import React, { useState } from 'react';
import { motion } from 'framer-motion';

const cardData = [
  { title: 'Innovative AI', content: 'Experience cutting-edge intelligence at your fingertips.' },
  { title: 'Real-Time Insights', content: 'Make decisions with live data and dynamic analysis.' },
  { title: 'Global Reach', content: 'Access markets and opportunities around the world.' },
  { title: 'Secure & Reliable', content: 'Your data and trades protected with industry-leading security.' },
];

const CardsPage: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
      <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
        {cardData.map((card, i) => (
          <motion.div
            key={i}
            initial={{ x: i < 2 ? -200 : 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 1 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            className="relative bg-white/10 p-6 rounded-2xl backdrop-blur-md cursor-pointer"
          >
            {hovered === i && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 text-3xl"
              >
                🥺
              </motion.div>
            )}
            <h3 className="text-xl text-white mb-2">{card.title}</h3>
            <p className="text-white/80">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
