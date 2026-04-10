import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Globe, Terminal, Image as ImageIcon, FolderKanban, Settings, Target, Wrench, ListTodo, Rocket, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DOCK_ITEMS = [
  { icon: Globe, label: 'Home', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ListTodo, label: 'Tasks', path: '/admin/tasks' },
  { icon: Rocket, label: 'Market', path: '/admin/market' },
  { icon: Target, label: 'War Room', path: '/admin/war-room' },
  { icon: Wrench, label: 'Command', path: '/admin/command' },
  { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: Wallet, label: 'The Vault', path: '/admin/account' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const Dock = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-2 bg-void/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {DOCK_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="relative group">
              <motion.div
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-3 rounded-xl transition-all duration-300 relative",
                  isActive 
                    ? "bg-neon-cyan/20 text-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,1)]"
                  />
                )}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-void border border-white/10 rounded text-[8px] font-mono uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
