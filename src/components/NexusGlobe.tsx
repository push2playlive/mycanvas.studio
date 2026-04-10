import React, { useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// A tiny black pixel to prevent the default blue marble from loading
const BLACK_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

export const NexusGlobe = () => {
  const globeRef = useRef<any>();

  // Generate random points for the globe (neural nodes)
  const pointsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 40; i++) {
      data.push({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.4 + 0.1,
        color: ['#00f0ff', '#ff00ff', '#0aff00'][Math.floor(Math.random() * 3)]
      });
    }
    return data;
  }, []);

  // Generate a grid of dots for the surface (dotted look)
  const hexData = useMemo(() => {
    const data = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      for (let lng = -180; lng <= 180; lng += 5) {
        data.push({ lat, lng, value: 1 });
      }
    }
    return data;
  }, []);

  useEffect(() => {
    const initGlobe = () => {
      if (globeRef.current) {
        // Auto-rotate
        if (typeof globeRef.current.controls === 'function') {
          const controls = globeRef.current.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.8;
            controls.enableZoom = false;
          }
        }
        
        // Set initial camera position
        if (typeof globeRef.current.pointOfView === 'function') {
          globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
        }

        // Custom Globe Material
        if (typeof globeRef.current.getGlobeMaterial === 'function') {
          const globeMaterial = globeRef.current.getGlobeMaterial();
          if (globeMaterial) {
            globeMaterial.color = new THREE.Color(0x000000);
            globeMaterial.emissive = new THREE.Color(0x00f0ff);
            globeMaterial.emissiveIntensity = 0.1;
            globeMaterial.transparent = true;
            globeMaterial.opacity = 0.8;
            return true;
          }
        }
      }
      return false;
    };

    // Try to initialize
    let attempts = 0;
    const interval = setInterval(() => {
      if (initGlobe() || attempts > 20) {
        clearInterval(interval);
      }
      attempts++;
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-void">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={BLACK_PIXEL}
        showAtmosphere={true}
        atmosphereColor="#00f0ff"
        atmosphereDayAlpha={0.1}
        
        // Neural Nodes
        pointsData={pointsData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.4}
        
        // Dotted Surface
        hexBinPointsData={hexData}
        hexBinPointWeight="value"
        hexBinResolution={4}
        hexMargin={0.2}
        hexTopColor={() => 'rgba(0, 240, 255, 0.1)'}
        hexSideColor={() => 'rgba(0, 240, 255, 0.05)'}
      />
    </div>
  );
};
