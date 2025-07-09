// App.tsx
import React, { useState, useEffect } from 'react';
import OolnLanding from './pages/OolnLanding';
import GlobePage from './pages/GlobePage';
import StarPage from './pages/StarPage';
import CardsPage from './pages/CardPage';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [lastScrollTime, setLastScrollTime] = useState<number>(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < 3000) return;

      if (e.deltaY > 100 && currentSection < 4) {
        setCurrentSection(prev => prev + 1);
        setLastScrollTime(now);
      } else if (e.deltaY < -10 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        setLastScrollTime(now);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, lastScrollTime]);

  const generateStars = (count: number): JSX.Element[] =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white animate-pulse"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ));

  return (
    <>
      <style>{`
        body { overflow: hidden; }
        ::-webkit-scrollbar { display: none; }
        html { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-50">
        <div className="text-white text-xl font-medium">OOLN</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Join Waitlist
        </button>
      </header>

      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900">
        {/* Starfield & Nebula */}
        <div className="absolute inset-0">
          {generateStars(120)}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {currentSection === 0 && <OolnLanding />}
        {currentSection === 1 && <OolnLanding isMainContent />}
        {currentSection === 2 && (
          <GlobePage onRequestNextSection={() => setCurrentSection(3)} />
        )}
        {currentSection === 3 && <StarPage />}
        {currentSection === 4 && <CardsPage />}
      </div>
    </>
  );
};

export default App;
