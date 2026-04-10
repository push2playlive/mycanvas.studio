import React from 'react';
import { motion } from 'motion/react';
import { Shield, ShieldAlert, Users, Activity, Terminal, Cpu, Globe, Search } from 'lucide-react';
import { NetworkRadar } from '../components/war-room/NetworkRadar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const THREATS = [
  { id: 1, name: 'DDoS Attack', ip: '203.0.113.0/24', status: 'ACTIVE', time: '2m ago', color: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
  { id: 2, name: 'Brute Force', ip: '198.51.100.42', status: 'MITIGATED', time: '15m ago', color: 'text-neon-green', bg: 'bg-neon-green/10' },
  { id: 3, name: 'Port Scan', ip: '192.0.2.100', status: 'MONITORING', time: '1h ago', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { id: 4, name: 'Suspicious Login', ip: 'internal', status: 'RESOLVED', time: '3h ago', color: 'text-white/40', bg: 'bg-white/5' },
];

const TEAM = [
  { name: 'Commander', role: 'Lead', status: 'online', initial: 'C', color: 'bg-neon-cyan' },
  { name: 'Tactical', role: 'Analyst', status: 'online', initial: 'T', color: 'bg-blue-500' },
  { name: 'Support', role: 'Engineer', status: 'away', initial: 'S', color: 'bg-neon-magenta' },
  { name: 'Recon', role: 'Scout', status: 'online', initial: 'R', color: 'bg-neon-green' },
];

const OPERATIONS = [
  { name: 'Operation Firewall', team: 'Alpha Squad', progress: 78, status: 'active', color: 'bg-neon-green' },
  { name: 'Data Migration', team: 'Beta Team', progress: 0, status: 'pending', color: 'bg-yellow-400' },
  { name: 'Security Audit', team: 'Gamma Unit', progress: 100, status: 'completed', color: 'bg-neon-cyan' },
  { name: 'System Update', team: 'Delta Crew', progress: 45, status: 'in-progress', color: 'bg-blue-500' },
];

export const WarRoom = () => {
  const [isScanning, setIsScanning] = React.useState(true);

  return (
    <div className="h-full flex flex-col bg-void p-8 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neon-magenta/10 rounded-lg border border-neon-magenta/20">
            <Globe className="text-neon-magenta" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">War Room</h1>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Tactical Operations Center</p>
          </div>
        </div>
        <button 
          onClick={() => setIsScanning(!isScanning)}
          className={cn(
            "flex items-center gap-2 px-6 py-2 border font-mono text-xs uppercase tracking-widest rounded-md transition-all",
            isScanning 
              ? "bg-neon-magenta/10 border-neon-magenta/30 text-neon-magenta animate-pulse" 
              : "bg-white/5 border-white/10 text-white/40"
          )}
        >
          <Search size={14} />
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      {/* Alert Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-neon-magenta/5 border border-neon-magenta/20 rounded-xl flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-neon-magenta/10 flex items-center justify-center">
            <ShieldAlert className="text-neon-magenta" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-tight">CRITICAL ALERT: Elevated threat level detected</p>
            <p className="text-[10px] text-white/40 font-mono">3 active threats require immediate attention</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-neon-magenta/20 border border-neon-magenta/40 rounded text-[10px] font-mono text-neon-magenta uppercase font-bold">
          Threat Level: High
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Threat Monitor */}
        <div className="col-span-8 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-2">
              <Shield size={14} /> Threat Monitor
            </h3>
            <span className="text-[8px] font-mono text-white/20 uppercase">Live Feed</span>
          </div>
          <div className="p-4 space-y-4">
            {THREATS.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex gap-4">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5", threat.status === 'ACTIVE' ? 'bg-neon-magenta animate-pulse' : 'bg-white/20')} />
                  <div>
                    <p className="text-sm font-bold text-white/90">{threat.name}</p>
                    <p className="text-[10px] font-mono text-white/30">{threat.ip}</p>
                    {threat.status === 'ACTIVE' && (
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta text-[10px] font-mono rounded hover:bg-neon-magenta/20 transition-all">Block IP</button>
                        <button className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono rounded hover:bg-white/10 transition-all">Investigate</button>
                        <button className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono rounded hover:bg-white/10 transition-all">Ignore</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn("text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold", threat.bg, threat.color)}>
                    {threat.status}
                  </span>
                  <p className="text-[10px] font-mono text-white/20 mt-2">{threat.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Status */}
        <div className="col-span-4 space-y-6">
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-2">
                <Users size={14} /> Team Status
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {TEAM.map((member, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-void font-bold", member.color)}>
                      {member.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90 leading-none mb-1">{member.name}</p>
                      <p className="text-[10px] font-mono text-white/30 uppercase">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-mono", member.status === 'online' ? 'text-neon-green' : 'text-white/20')}>
                      {member.status}
                    </span>
                    <div className={cn("w-1.5 h-1.5 rounded-full", member.status === 'online' ? 'bg-neon-green' : 'bg-white/20')} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-white/20 uppercase mb-1">Protected</p>
              <p className="text-xl font-bold font-mono text-white">99.9%</p>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-white/20 uppercase mb-1">Active</p>
              <p className="text-xl font-bold font-mono text-white">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Operations */}
      <div className="glass-panel rounded-xl overflow-hidden mb-8">
        <div className="p-4 border-b border-white/5 bg-white/5">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-2">
            <Activity size={14} /> Active Operations
          </h3>
        </div>
        <div className="p-6 grid grid-cols-4 gap-8">
          {OPERATIONS.map((op, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-white/90 leading-none mb-1">{op.name}</p>
                  <p className="text-[10px] font-mono text-white/30 uppercase">{op.team}</p>
                </div>
                <span className={cn("text-[8px] font-mono px-1.5 py-0.5 rounded uppercase", 
                  op.status === 'active' ? 'bg-neon-green/10 text-neon-green' :
                  op.status === 'completed' ? 'bg-neon-cyan/10 text-neon-cyan' :
                  'bg-white/5 text-white/40'
                )}>
                  {op.status}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${op.progress}%` }}
                  className={cn("h-full", op.color)}
                />
              </div>
              <p className="text-[10px] font-mono text-white/20 text-right">{op.progress}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Network Radar */}
      <div className="glass-panel rounded-xl overflow-hidden h-80">
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-2">
            <Terminal size={14} /> Network Radar
          </h3>
        </div>
        <div className="flex-1 h-full relative">
          <NetworkRadar />
        </div>
      </div>
    </div>
  );
};
