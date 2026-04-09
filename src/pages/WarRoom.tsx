import React from 'react';
import { motion } from 'motion/react';
import { Globe as GlobeIcon, Zap, Shield, Target, Activity, Users, Radio } from 'lucide-react';
import { TacticalMap } from '../components/TacticalMap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/[0.02]">
    <div className="flex items-center gap-3 mb-2">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</span>
    </div>
    <div className="text-xl font-bold font-mono text-white">{value}</div>
  </div>
);

export const WarRoom = () => {
  return (
    <div className="h-full flex flex-col bg-void selection:bg-neon-cyan selection:text-void relative overflow-hidden">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0 opacity-40">
        <TacticalMap />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-neon-magenta flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                <GlobeIcon size={14} className="text-void" />
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
                War <span className="text-neon-magenta">Room</span>
              </h1>
            </div>
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
              Global Neural Network & Operational Oversight
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-mono text-neon-green uppercase tracking-widest">Live Uplink</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-12 gap-8">
          {/* Left Stats */}
          <div className="col-span-3 space-y-4">
            <StatCard 
              label="Active Operatives" 
              value="1,244" 
              icon={Users} 
              color="bg-neon-cyan/10 text-neon-cyan" 
            />
            <StatCard 
              label="Neural Latency" 
              value="12ms" 
              icon={Zap} 
              color="bg-neon-magenta/10 text-neon-magenta" 
            />
            <StatCard 
              label="System Integrity" 
              value="99.9%" 
              icon={Shield} 
              color="bg-neon-green/10 text-neon-green" 
            />
            
            <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.02] mt-8">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                <Radio size={12} className="text-neon-magenta" /> Signal Strength
              </h3>
              <div className="space-y-2">
                {[80, 45, 90, 60, 75].map((w, i) => (
                  <div key={i} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      className="h-full bg-neon-cyan/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Space (Globe is here) */}
          <div className="col-span-6" />

          {/* Right Missions & Threats */}
          <div className="col-span-3 space-y-6">
            <div className="glass-panel h-[300px] rounded-xl border border-white/5 bg-white/[0.02] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Target size={14} className="text-neon-magenta" /> Active Missions
                </h3>
                <span className="text-[8px] font-mono text-white/20">4 Total</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[
                  { title: 'Project Nexus', status: 'In Progress', location: 'Tokyo, JP' },
                  { title: 'Neural Breach', status: 'Critical', location: 'Berlin, DE' },
                  { title: 'Data Extraction', status: 'Standby', location: 'San Francisco, US' },
                  { title: 'System Audit', status: 'Completed', location: 'London, UK' },
                ].map((mission, i) => (
                  <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-bold text-white/80 group-hover:text-white">{mission.title}</h4>
                      <span className={cn(
                        "text-[8px] font-mono uppercase px-1.5 py-0.5 rounded",
                        mission.status === 'Critical' ? "bg-neon-magenta/10 text-neon-magenta" :
                        mission.status === 'Completed' ? "bg-neon-green/10 text-neon-green" :
                        "bg-neon-cyan/10 text-neon-cyan"
                      )}>
                        {mission.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-mono text-white/20 uppercase">
                      <Activity size={10} />
                      <span>{mission.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel flex-1 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neon-magenta flex items-center gap-2">
                  <Shield size={14} /> Threat Matrix
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-pulse" />
                  <span className="text-[8px] font-mono text-neon-magenta uppercase">Live</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-[9px] space-y-2">
                {[
                  { ip: '192.168.1.42', type: 'DDoS_BLOCK', origin: 'RU', time: '0.2s ago' },
                  { ip: '45.12.99.102', type: 'BOT_SCRAPE', origin: 'CN', time: '1.4s ago' },
                  { ip: '102.44.12.8', type: 'SQL_INJECT', origin: 'BR', time: '3.1s ago' },
                  { ip: '88.21.4.55', type: 'BRUTE_FORCE', origin: 'US', time: '5.8s ago' },
                ].map((threat, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-neon-magenta">[{threat.origin}]</span>
                      <span className="text-white/60">{threat.ip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30">{threat.type}</span>
                      <span className="text-white/10">{threat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
          <span>Nexus_OS // War_Room // Global_Relay_Active</span>
          <span>Clearance_Level: 5</span>
        </div>
      </div>
    </div>
  );
};
