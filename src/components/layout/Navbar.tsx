import React from 'react';
import { LayoutDashboard, Globe, Terminal, Image, FolderKanban, Settings, User, LogOut, Menu, X, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Shield, label: 'Mission Control', path: '/admin/mission-control' },
  { icon: Globe, label: 'War Room', path: '/admin/war-room' },
  { icon: Terminal, label: 'Command Centre', path: '/admin/command' },
  { icon: Image, label: 'Gallery', path: '/admin/gallery' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
];

const SYSTEM_ITEMS = [
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: User, label: 'Profile', path: '/admin/profile' },
];


export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 glass-panel rounded-md lg:hidden text-neon-cyan"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || true) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className={cn(
              "fixed top-0 left-0 z-40 h-full w-64 bg-void/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform lg:translate-x-0",
              !isOpen && "hidden lg:flex"
            )}
          >
            {/* Logo */}
            <div className="p-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                <Terminal size={18} className="text-void" />
              </div>
              <span className="font-mono font-bold tracking-tighter text-xl">
                NEXUS<span className="text-neon-cyan">OS</span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
              <div>
                <p className="px-4 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Navigation</p>
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all group",
                          isActive 
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon size={18} className={cn("transition-colors", isActive ? "text-neon-cyan" : "group-hover:text-neon-cyan")} />
                        <span className="text-sm font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="active-nav"
                            className="ml-auto w-1 h-1 rounded-full bg-neon-cyan shadow-[0_0_5px_rgba(0,240,255,1)]"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="px-4 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">System</p>
                <div className="space-y-1">
                  {SYSTEM_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all group",
                          isActive 
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon size={18} className={cn("transition-colors", isActive ? "text-neon-cyan" : "group-hover:text-neon-cyan")} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-white/50 hover:text-red-400 hover:bg-red-400/5 rounded-md transition-all group">
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
};
