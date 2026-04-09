import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { supabase } from '../../lib/supabase';

// Types for our Presence state
type UserLocation = {
  lat: number;
  lng: number;
  username?: string;
};

export const LiveGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeUsers, setActiveUsers] = useState<UserLocation[]>([]);
  
  // 1. Setup Supabase Presence
  useEffect(() => {
    if (!supabase.auth) return;

    // Generate a random location for THIS user (Simulated for now)
    const myLocation = {
      lat: (Math.random() - 0.5) * 160,
      lng: (Math.random() - 0.5) * 360,
      username: 'Commander-' + Math.floor(Math.random() * 1000),
    };

    const channel = supabase.channel('war-room-global');

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users: UserLocation[] = [];
        
        // Flatten the presence object into an array of locations
        Object.values(newState).forEach((presences: any) => {
          presences.forEach((p: any) => {
            if (p.location) users.push(p.location);
          });
        });
        
        setActiveUsers(users);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track our own location so others see us
          await channel.track({
            online_at: new Date().toISOString(),
            location: myLocation,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // 2. Setup COBE Globe
  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = (createGlobe as any)(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1, // 1 for dark mode aesthetics
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.02, 0.02, 0.02], // Void black base
      markerColor: [0, 0.94, 1], // Cyan markers for agents/users
      glowColor: [0, 0.2, 0.4],
      markers: activeUsers.map((u) => ({ location: [u.lat, u.lng], size: 0.05 })),
      onRender: (state: any) => {
        // Rotates the globe automatically
        state.phi = phi;
        phi += 0.003;
      },
    });


    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [activeUsers]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-void">
      <div className="absolute top-8 left-8 z-10 font-mono text-xs space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 bg-black/60 border border-neon-cyan/30 rounded-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          <span className="text-neon-cyan tracking-widest uppercase">
            Active Agents: {activeUsers.length || 1}
          </span>
        </div>
        <div className="px-3 py-2 bg-black/60 border border-white/10 rounded-sm backdrop-blur-sm text-white/50 uppercase tracking-tighter">
          Sector: Global_Presence_Monitor
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '800px',
          aspectRatio: '1',
        }}
      />

      <div className="absolute bottom-8 right-8 z-10 text-right font-mono text-[10px] text-white/30 uppercase">
        <p>Nexus OS v2.4.0</p>
        <p>Secure Uplink Established</p>
      </div>
    </div>
  );
};
