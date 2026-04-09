import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Shield, Terminal, Globe, Mail, Fingerprint, Activity, Cpu, Camera } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-neon-magenta flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(255,0,255,0.4)]">
              <User size={14} className="text-void" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
              User <span className="text-neon-magenta">Profile</span>
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
            Identity Verification & Clearance Level
          </p>
        </div>
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          ID: NX-7729-ALPHA
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-lg border border-white/5 bg-white/[0.02] flex flex-col items-center text-center">
            <div className="relative mb-6">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <div 
                onClick={triggerFileInput}
                className="w-32 h-32 rounded-full border-2 border-neon-cyan/30 p-1 cursor-pointer group relative transition-all hover:border-neon-cyan"
              >
                <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden relative">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User size={64} className="text-white/10 group-hover:text-neon-cyan/50 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-void/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} className="text-neon-cyan" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-green rounded-full border-4 border-void flex items-center justify-center shadow-[0_0_10px_rgba(10,255,0,0.5)]">
                <Shield size={14} className="text-void" />
              </div>
            </div>
            <h2 className="text-xl font-bold font-mono tracking-tight mb-1">Commander</h2>
            <p className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.2em] mb-4">Nexus Prime Architect</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-mono text-white/40 uppercase tracking-widest border border-white/5">Clearance: Lvl 9</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-mono text-white/40 uppercase tracking-widest border border-white/5">Status: Active</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg border border-white/5 bg-white/[0.02]">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
              <Fingerprint size={12} className="text-neon-magenta" /> Biometric Data
            </h3>
            <div className="space-y-3">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-neon-magenta"
                />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase">
                <span>Neural Sync Rate</span>
                <span className="text-neon-magenta">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-lg border border-white/5 bg-white/[0.02]">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
                <Mail size={12} className="text-neon-cyan" /> Secure Comms
              </h3>
              <p className="text-sm font-mono text-white/80">commander@nexus.os</p>
              <p className="text-[10px] font-mono text-white/20 uppercase mt-1">Primary Uplink Address</p>
            </div>
            <div className="glass-panel p-6 rounded-lg border border-white/5 bg-white/[0.02]">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
                <Globe size={12} className="text-neon-cyan" /> Origin Sector
              </h3>
              <p className="text-sm font-mono text-white/80">Neo-Tokyo // Sector 7</p>
              <p className="text-[10px] font-mono text-white/20 uppercase mt-1">Deployment Location</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-lg border border-white/5 bg-white/[0.02]">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
              <Activity size={12} className="text-neon-green" /> Recent Operational History
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Neural Core Initialization', time: '2h ago', status: 'Success', icon: Cpu },
                { action: 'War Room Uplink Established', time: '5h ago', status: 'Success', icon: Globe },
                { action: 'System Security Audit', time: '12h ago', status: 'Verified', icon: Shield },
                { action: 'Command Protocol Update', time: '1d ago', status: 'Complete', icon: Terminal },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded hover:border-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded text-white/20 group-hover:text-neon-cyan transition-colors">
                      <item.icon size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-white/80">{item.action}</p>
                      <p className="text-[8px] font-mono text-white/20 uppercase">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-neon-green uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Identity_Module // Encrypted_Data</span>
        <span>Clearance_Verified: OK</span>
      </div>
    </div>
  );
};
