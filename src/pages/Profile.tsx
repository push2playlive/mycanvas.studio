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
    <div className="nexus-container galaxy-bg selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="profile-header">
        <div className="avatar-orb">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={triggerFileInput}
            className="w-full h-full rounded-full bg-white/5 flex items-center justify-center overflow-hidden relative cursor-pointer group"
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Commander" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <img 
                src="https://picsum.photos/seed/commander/200/200" 
                alt="Commander Default" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-void/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={20} className="text-neon-cyan" />
            </div>
          </div>
          <div className="status-ring online"></div>
        </div>
        <div className="profile-info">
          <h1>COMMANDER <span className="text-neon-cyan">[USERNAME]</span></h1>
          <p className="rank">Rank: Lead Architect | Net: CommandNexus Alpha</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Missions</h3>
          <p>42</p>
        </div>
        <div className="stat-card">
          <h3>Neural Credits</h3>
          <p className="text-neon-magenta">850</p>
        </div>
        <div className="stat-card">
          <h3>Uptime</h3>
          <p className="text-neon-green">99.9%</p>
        </div>
      </div>

      <div className="bio-section">
        <h3>Pilot's Log</h3>
        <p>"Bolding my way through the code. Searching for the next creative galaxy."</p>
      </div>

      <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/[0.02] shadow-shield">
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

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Identity_Module // Encrypted_Data</span>
        <span>Clearance_Verified: OK</span>
      </div>
    </div>
  );
};
