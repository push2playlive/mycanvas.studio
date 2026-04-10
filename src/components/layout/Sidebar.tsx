import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, LayoutDashboard, Globe, Terminal, Image as ImageIcon, FolderKanban, CreditCard, Settings, Wallet, User, LogIn, ListTodo, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ListTodo, label: 'Tasks', path: '/admin/tasks' },
  { icon: Rocket, label: 'Market', path: '/admin/market' },
  { icon: Globe, label: 'War Room', path: '/admin/war-room' },
  { icon: Terminal, label: 'Command', path: '/admin/command' },
  { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: CreditCard, label: 'Pricing', path: '/admin/pricing' },
];

const SYSTEM_ITEMS = [
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: Wallet, label: 'Billing', path: '/admin/pricing' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
];

import { AgentSwitcher } from '../Navigation/AgentSwitcher';

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 bg-void border-r border-white/5 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neon-cyan flex items-center justify-center">
                  <span className="text-void font-bold text-xl">N</span>
                </div>
                <span className="font-mono font-bold tracking-tighter text-xl uppercase">Nexus</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
              {/* Agent Switcher */}
              <div className="px-2">
                <AgentSwitcher />
              </div>

              {/* Navigation */}
              <div>
                <p className="px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-4">Navigation</p>
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-all group",
                          isActive 
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                            : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon size={18} className={cn(isActive ? "text-neon-cyan" : "text-white/40 group-hover:text-white")} />
                        {item.label}
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* System */}
              <div>
                <p className="px-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-4">System</p>
                <div className="space-y-1">
                  {SYSTEM_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-all group",
                          isActive 
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                            : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon size={18} className={cn(isActive ? "text-neon-cyan" : "text-white/40 group-hover:text-white")} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
              <Link
                to="/auth"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono text-neon-cyan hover:bg-neon-cyan/5 transition-all"
              >
                <LogIn size={18} />
                Sign In
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
