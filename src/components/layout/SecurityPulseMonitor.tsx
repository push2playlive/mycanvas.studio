import React, { useEffect, useState } from 'react';
import { Shield, Activity, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const SecurityPulseMonitor = () => {
  const [status, setStatus] = useState('SECURE');
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
      if (Math.random() > 0.95) {
        setStatus('MITIGATING');
        setTimeout(() => setStatus('SECURE'), 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-8 z-[60] flex items-center gap-4 bg-void/80 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full shadow-2xl">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Shield size={14} className={status === 'SECURE' ? "text-neon-green" : "text-neon-magenta animate-pulse"} />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${status === 'SECURE' ? 'bg-neon-green/20' : 'bg-neon-magenta/20'}`}
          />
        </div>
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Shield_Status:</span>
        <span className={`text-[8px] font-mono font-bold uppercase tracking-widest ${status === 'SECURE' ? 'text-neon-green' : 'text-neon-magenta'}`}>
          {status}
        </span>
      </div>

      <div className="w-px h-4 bg-white/10" />

      <div className="flex items-center gap-2">
        <Activity size={14} className="text-neon-cyan" />
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Neural_Pulse:</span>
        <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-1/2 h-full bg-neon-cyan/50"
          />
        </div>
      </div>
    </div>
  );
};
