import React, { useState, useEffect } from 'react';
import { Shield, Bell, Wifi, Battery, Signal, Menu, Grid, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface TopBarProps {
  onMenuClick?: () => void;
  onFeaturesClick?: () => void;
}

export const TopBar = ({ onMenuClick, onFeaturesClick }: TopBarProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('nexus-theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = (localStorage.getItem('nexus-theme') as 'dark' | 'light') || 'dark';
      setTheme(currentTheme);
    };

    window.addEventListener('nexus-theme-change', handleThemeChange);
    return () => window.removeEventListener('nexus-theme-change', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('nexus-theme', newTheme);
    window.dispatchEvent(new Event('nexus-theme-change'));
    setTheme(newTheme);
  };

  return (
    <div className="h-14 border-b border-white/5 bg-void/50 backdrop-blur-md flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-white/40 hover:text-white transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_rgba(10,255,0,0.5)]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/80">Nexus Online</span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono uppercase tracking-widest">
          <span>Sector: 7-G</span>
          <span>Latency: 12ms</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-white/20">
          <Wifi size={14} />
          <Signal size={14} />
          <Battery size={14} />
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-white/40 hover:text-neon-cyan transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={onFeaturesClick}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <Grid size={18} />
          </button>
          <button className="text-white/40 hover:text-white transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-magenta rounded-full border-2 border-void" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-[10px] font-bold text-white/90 leading-none">COMMANDER</p>
              <p className="text-[8px] font-mono text-neon-cyan leading-none mt-1 uppercase">Clearance Level 5</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
              <Shield size={16} className="text-neon-cyan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
