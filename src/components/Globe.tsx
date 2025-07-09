import Globe from "react-globe.gl";
import { useState, useEffect } from "react";

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

export default function HexedGlobe() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then((data: CountriesData) => {
        setCountries(data.features);
      });
  }, []);

  const austinLocation = { lat: 30.26715, lng: -97.74306 };

  return (
    <div className="w-full h-screen">
      <Globe
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        hexPolygonColor={() => "#ffffff"}
        hexPolygonLabel={(d: object) => {
          const country = d as CountryFeature;
          return `
            <b>${country.properties.ADMIN} (${country.properties.ISO_A2})</b> <br />
            Population: <i>${country.properties.POP_EST}</i>
          `;
        }}
        htmlElementsData={[austinLocation]}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.01}
        htmlElement={() => {
          const el = document.createElement("div");
          el.innerHTML = `
            <div class="relative w-8 h-8">
              <div class="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></div>
              <div class="relative w-full h-full bg-red-600 rounded-full animate-pulse"></div>
            </div>`;
          return el;
        }}
      />
    </div>
  );
}