import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Shield, Zap, Activity } from 'lucide-react';

interface V24InitialProps {
  onComplete: () => void;
}

export const V24Initial: React.FC<V24InitialProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing V24 Mainframe...');
  const [cores, setCores] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const coreTimer = setInterval(() => {
      setCores((prev) => {
        if (prev >= 24) {
          clearInterval(coreTimer);
          return 24;
        }
        return prev + 1;
      });
    }, 100);

    const statusMessages = [
      'Neural Handshake Initiated...',
      'Dreadnought Power Grid Online...',
      'Sky Towers Stabilized...',
      'Behavioral Firewall Active...',
      'Sovereign Protocol v2.4.0 Loaded...',
      'System Sovereign.'
    ];

    let messageIndex = 0;
    const messageTimer = setInterval(() => {
      if (messageIndex < statusMessages.length) {
        setStatus(statusMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageTimer);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(coreTimer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 mb-4"
          >
            <Cpu size={48} className="text-neon-cyan animate-pulse" />
          </motion.div>
          <h2 className="text-3xl font-bold font-mono tracking-tighter uppercase text-white">
            V24 <span className="text-neon-cyan">Mainframe</span>
          </h2>
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Dreadnought Class Core</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Core Status</p>
              <p className="text-lg font-bold font-mono text-neon-cyan">CORES ACTIVE: {cores}/24</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Sync Rate</p>
              <p className="text-lg font-bold font-mono text-neon-magenta">{progress}%</p>
            </div>
          </div>

          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_20px_rgba(0,240,255,0.5)]"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Shield size={14} className={progress > 30 ? "text-neon-cyan" : "text-white/10"} />
              <Zap size={14} className={progress > 60 ? "text-neon-magenta" : "text-white/10"} />
              <Activity size={14} className={progress > 90 ? "text-neon-green" : "text-white/10"} />
            </div>
            <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest animate-pulse">
              {status}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-8">
          {[
            { label: 'Parallel Galaxies', status: progress > 50 ? 'READY' : 'SYNCING' },
            { label: 'DDoS Mitigation', status: progress > 70 ? 'ACTIVE' : 'STANDBY' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">{item.label}</p>
              <p className={item.status === 'READY' || item.status === 'ACTIVE' ? "text-[10px] font-mono font-bold text-neon-green" : "text-[10px] font-mono font-bold text-white/20"}>
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Scanning Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-full h-1/4 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent"
        />
      </div>
    </div>
  );
};
