import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LiveConsole = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogs([
      '[SYSTEM] Initializing Nexus OS Command Uplink...',
      '[SYSTEM] Secure connection established via Sector 7.',
      '[SYSTEM] Kernel v2.4.0-stable loaded.',
    ]);

    const intervalId = window.setInterval(() => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

      const messages = [
        `[HEARTBEAT] System Stable | CPU: 0.${Math.floor(Math.random() * 9)}%`,
        `[NETWORK] Ping: ${Math.floor(Math.random() * 40 + 10)}ms | Packet Verify: OK`,
        '[AUTH] Session Active: push2playlive',
        '[DB] Storage Sync: Complete',
        '[SECURITY] Perimeter Scan: Nominal',
        '[AGENT] Commander analyzing strategic vectors...',
        '[AGENT] Guru optimizing neural pathways...',
        '[SYSTEM] Memory cleanup performed: 124MB freed.',
      ];

      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const newLog = `> ${timestamp} ${randomMsg}`;

      setLogs((prev) => {
        const next = [...prev, newLog];
        if (next.length > 15) return next.slice(next.length - 15);
        return next;
      });
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4 font-mono text-[10px] overflow-hidden flex flex-col shadow-inner shadow-black group">
      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-neon-cyan" />
          <span className="text-white/40 font-bold tracking-[0.2em] uppercase">Live Console Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/20">
            <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-neon-green" />
            <span className="text-neon-green text-[8px] font-bold tracking-widest uppercase">Realtime</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-neon-cyan/70 hover:text-neon-cyan transition-colors cursor-default leading-relaxed flex gap-2"
            >
              <span className="text-white/20 select-none">[{i.toString().padStart(2, '0')}]</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-white/20 italic animate-pulse">Waiting for signal...</div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] text-white/20 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Activity size={8} /> 124ms</span>
          <span>Encrypted</span>
        </div>
        <span>Nexus_OS_v2.4</span>
      </div>
    </div>
  );
};
