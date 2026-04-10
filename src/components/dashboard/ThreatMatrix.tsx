import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Lock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Threat {
  id: string;
  type: string;
  source: string;
  status: 'BLOCKED' | 'MITIGATING' | 'ANALYZING';
  timestamp: string;
}

export const ThreatMatrix = () => {
  const [threats, setThreats] = useState<Threat[]>([]);

  useEffect(() => {
    const initialThreats: Threat[] = [
      { id: '1', type: 'SQL Injection', source: '192.168.1.45', status: 'BLOCKED', timestamp: new Date().toLocaleTimeString() },
      { id: '2', type: 'Bot Scrape', source: '45.67.23.11', status: 'BLOCKED', timestamp: new Date().toLocaleTimeString() },
      { id: '3', type: 'DDoS Burst', source: 'Global Cluster', status: 'MITIGATING', timestamp: new Date().toLocaleTimeString() },
    ];
    setThreats(initialThreats);

    const interval = setInterval(() => {
      const types = ['XSS Attempt', 'Brute Force', 'Bot Scrape', 'API Abuse', 'Header Injection'];
      const newThreat: Threat = {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        status: Math.random() > 0.3 ? 'BLOCKED' : 'MITIGATING',
        timestamp: new Date().toLocaleTimeString()
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-neon-magenta" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Threat Matrix</h3>
        </div>
        <div className="px-2 py-0.5 rounded bg-neon-magenta/10 border border-neon-magenta/20">
          <span className="text-[8px] font-mono text-neon-magenta uppercase animate-pulse">Shield Active</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
        <AnimatePresence initial={false}>
          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-neon-magenta/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-neon-magenta/10">
                  <Lock size={12} className="text-neon-magenta" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-white/80">{threat.type}</p>
                  <p className="text-[8px] font-mono text-white/30">{threat.source}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[8px] font-mono font-bold ${threat.status === 'BLOCKED' ? 'text-neon-magenta' : 'text-yellow-400'}`}>
                  {threat.status}
                </p>
                <p className="text-[8px] font-mono text-white/20">{threat.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
