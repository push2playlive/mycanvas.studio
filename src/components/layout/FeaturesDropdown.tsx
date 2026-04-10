import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Code, Palette, Rocket, BarChart3, Shield, Zap, Box, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FeaturesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURES = [
  { icon: Cpu, label: 'Nexus AI', desc: 'Intelligent assistant', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
  { icon: Code, label: 'Code Studio', desc: 'Development environment', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Palette, label: 'Design Lab', desc: 'Visual creation tools', color: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
  { icon: Rocket, label: 'Deploy Hub', desc: 'Release management', color: 'text-neon-green', bg: 'bg-neon-green/10' },
  { icon: BarChart3, label: 'Analytics', desc: 'Data insights', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: Shield, label: 'Security', desc: 'Threat monitoring', color: 'text-red-400', bg: 'bg-red-400/10' },
  { icon: Zap, label: 'Automation', desc: 'Workflow engine', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: Box, label: 'Infrastructure', desc: 'System resources', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
];

export const FeaturesDropdown = ({ isOpen, onClose }: FeaturesDropdownProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[50]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-16 right-6 w-[400px] glass-panel rounded-2xl border border-white/10 bg-void/90 backdrop-blur-2xl z-[60] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Nexus Features</h3>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              {FEATURES.map((feature, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-left group"
                >
                  <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", feature.bg, feature.color)}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/90 leading-none mb-1">{feature.label}</p>
                    <p className="text-[10px] font-mono text-white/30 truncate">{feature.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5">
              <button className="w-full py-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-neon-cyan/20 transition-all flex items-center justify-center gap-2">
                <ExternalLink size={14} />
                Explore All Features
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
