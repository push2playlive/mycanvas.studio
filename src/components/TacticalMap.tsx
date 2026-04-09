import React, { useEffect, useRef, useMemo, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Stylized dark world map texture
const WORLD_MAP_URL = "https://unpkg.com/three-globe/example/img/earth-dark.jpg";

const ACTIVE_NODES = [
  { name: 'utubechat.com', lat: 40.7128, lng: -74.0060, city: 'New York' },
  { name: 'hygieneteam.nz', lat: -36.8485, lng: 174.7633, city: 'Auckland' },
  { name: 'nexus-core', lat: 51.5074, lng: -0.1278, city: 'London' },
  { name: 'tokyo-relay', lat: 35.6762, lng: 139.6503, city: 'Tokyo' },
  { name: 'berlin-node', lat: 52.5200, lng: 13.4050, city: 'Berlin' },
  { name: 'sydney-outpost', lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { name: 'brazil-uplink', lat: -23.5505, lng: -46.6333, city: 'São Paulo' },
];

export const TacticalMap = () => {
  const globeRef = useRef<any>();
  const [threats, setThreats] = useState<any[]>([]);
  const [traffic, setTraffic] = useState<any[]>([]);

  // Generate traffic pulses between random nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const startNode = ACTIVE_NODES[Math.floor(Math.random() * ACTIVE_NODES.length)];
      const endNode = ACTIVE_NODES[Math.floor(Math.random() * ACTIVE_NODES.length)];
      
      if (startNode !== endNode) {
        const newPulse = {
          startLat: startNode.lat,
          startLng: startNode.lng,
          endLat: endNode.lat,
          endLng: endNode.lng,
          color: '#00f0ff',
          arcAlt: 0.2
        };
        setTraffic(prev => [...prev.slice(-10), newPulse]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate random threats
  useEffect(() => {
    const interval = setInterval(() => {
      const targetNode = ACTIVE_NODES[Math.floor(Math.random() * ACTIVE_NODES.length)];
      const attackerLat = (Math.random() - 0.5) * 160;
      const attackerLng = (Math.random() - 0.5) * 360;

      plotThreat(attackerLat, attackerLng, targetNode);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const plotThreat = (lat: number, lng: number, target: any) => {
    const newThreat = {
      startLat: lat,
      startLng: lng,
      endLat: target.lat,
      endLng: target.lng,
      color: ['#ff0055', '#ff9900'][Math.floor(Math.random() * 2)],
      arcAlt: 0.3
    };
    setThreats(prev => [...prev.slice(-5), newThreat]);
    
    // Trigger a "ping" effect on the target
    if (globeRef.current) {
      // We could add a temporary point or ring here
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-void">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={WORLD_MAP_URL}
        showAtmosphere={true}
        atmosphereColor="#00f0ff"
        atmosphereDayAlpha={0.1}

        // Active Nodes (Green Beacons)
        pointsData={ACTIVE_NODES}
        pointColor={() => '#0aff00'}
        pointAltitude={0.05}
        pointRadius={0.6}
        pointsMerge={true}
        pointLabel={(d: any) => `
          <div class="glass-panel p-2 border border-neon-green/30 rounded text-[10px] font-mono">
            <div class="text-neon-green font-bold">${d.name}</div>
            <div class="text-white/60">${d.city}</div>
            <div class="text-neon-green/80 mt-1">STATUS: ACTIVE</div>
          </div>
        `}

        // Threat Tracers & Traffic
        arcsData={[...threats, ...traffic]}
        arcColor={(d: any) => d.color}
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashAnimateTime={1500}
        arcStroke={0.5}
        arcAltitude="arcAlt"

        // Custom Globe Material
        onGlobeReady={() => {
          const globeMaterial = globeRef.current.getGlobeMaterial();
          globeMaterial.color = new THREE.Color(0x040404);
          globeMaterial.emissive = new THREE.Color(0x00f0ff);
          globeMaterial.emissiveIntensity = 0.05;
        }}
      />
    </div>
  );
};
