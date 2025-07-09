import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Globe from 'react-globe.gl';

interface CountryFeature {
  type: string;
  properties: {
    ADMIN: string;
    ISO_A2: string;
    POP_EST: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface CountriesData {
  type: string;
  features: CountryFeature[];
}

interface Location {
  lat: number;
  lng: number;
}

interface GlobePageProps {
  onRequestNextSection: () => void;
}

const GlobePage: React.FC<GlobePageProps> = ({ onRequestNextSection }) => {
  const [focusedOnAustin, setFocusedOnAustin] = useState<boolean>(false);
  const [centered, setCentered] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const globeRef = useRef<any>(null);
  const austinLocation: Location = { lat: 30.26715, lng: -97.74306 };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((res) => res.json())
      .then((data: CountriesData) => setCountries(data.features));
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!focusedOnAustin && e.deltaY > 30) {
        if (!centered) {
          setCentered(true);
        } else {
          setFocusedOnAustin(true);
          globeRef.current?.pointOfView(
            { lat: austinLocation.lat, lng: austinLocation.lng, altitude: 0.8 },
            3000
          );
        }
      } else if (focusedOnAustin && e.deltaY < -30) {
        setFocusedOnAustin(false);
        globeRef.current?.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 3000);
      } else if (centered && e.deltaY < -30) {
        setCentered(false);
      } else if (focusedOnAustin && e.deltaY > 30) {
        onRequestNextSection();
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [focusedOnAustin, centered, onRequestNextSection]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: focusedOnAustin ? 1.3 : centered ? 1.1 : 1,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <Globe
          ref={globeRef}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundColor="rgba(0,0,0,0)"
          hexPolygonsData={countries}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonUseDots={true}
          hexPolygonColor={() => 'rgba(255,255,255,0.5)'}
          hexPolygonLabel={(d: object): string => {
            const country = d as CountryFeature;
            return `
              <div class="bg-gray-900/80 text-white p-2 rounded-md text-sm shadow-md">
                <b>${country.properties.ADMIN} (${country.properties.ISO_A2})</b> <br />
                Population: <i>${country.properties.POP_EST.toLocaleString()}</i>
              </div>
            `;
          }}
          htmlElementsData={[austinLocation]}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.01}
          htmlElement={() => {
            const el = document.createElement('div');
            el.innerHTML = `
              <div class="relative w-8 h-8">
                <div class="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></div>
                <div class="relative w-full h-full bg-red-600 rounded-full animate-pulse"></div>
              </div>`;
            return el;
          }}
          onGlobeReady={() => {
            globeRef.current.pointOfView(
              { lat: 0, lng: 0, altitude: 2.5 },
              0
            );
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-20 w-full max-w-3xl px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: centered ? 0 : 1,
          y: centered ? -50 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-blue-600 via-red-500 to-indigo-400 bg-clip-text text-transparent bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-md shadow-lg tracking-wide leading-relaxed">
          "We envision a world where every person will navigate decisions with clarity, confidence, and control."
        </h2>
      </motion.div>

      {focusedOnAustin && (
        <motion.div
          className="absolute bottom-8 text-center z-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 tracking-wide">
            Austin, Texas
          </div>
          <div className="text-base sm:text-lg text-white/70 mt-1">OOLN Headquarters</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GlobePage;