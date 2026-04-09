import React from 'react';
import { Globe } from 'lucide-react';

export function NexusGlobe() {
  return (
    <div className="relative aspect-square w-full max-w-[220px] mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/15 via-neon-green/10 to-transparent blur-2xl" />
      <div className="absolute inset-0 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm" />

      <div className="absolute inset-3 rounded-full border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <Globe className="h-16 w-16 text-white/35 animate-pulse" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/70 shadow-[0_0_24px_rgba(0,255,128,0.35)]" />
    </div>
  );
}
