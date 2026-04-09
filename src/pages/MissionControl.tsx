import React, { useMemo, useState } from 'react';
import { Activity, Database, ShieldAlert, Users, X, Terminal, Shield, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ModalId = 'pricing' | 'maintenance' | 'users' | 'logs';

type ColorKey = 'blue' | 'red' | 'green' | 'purple';

const COLOR_CLASSES: Record<
  ColorKey,
  { borderHover: string; icon: string; glow: string; text: string }
> = {
  blue: {
    borderHover: 'hover:border-neon-cyan/50',
    icon: 'text-neon-cyan group-hover:text-neon-cyan/80',
    glow: 'shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    text: 'text-neon-cyan',
  },
  red: {
    borderHover: 'hover:border-neon-magenta/50',
    icon: 'text-neon-magenta group-hover:text-neon-magenta/80',
    glow: 'shadow-[0_0_15px_rgba(255,0,255,0.2)]',
    text: 'text-neon-magenta',
  },
  green: {
    borderHover: 'hover:border-neon-green/50',
    icon: 'text-neon-green group-hover:text-neon-green/80',
    glow: 'shadow-[0_0_15px_rgba(0,255,128,0.2)]',
    text: 'text-neon-green',
  },
  purple: {
    borderHover: 'hover:border-purple-500/50',
    icon: 'text-purple-500 group-hover:text-purple-400',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    text: 'text-purple-400',
  },
};

function ControlModule(props: {
  title: string;
  icon: typeof Database;
  color: ColorKey;
  onClick: () => void;
}) {
  const classes = COLOR_CLASSES[props.color];
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={props.onClick}
      className={cn(
        'flex flex-col items-center justify-center p-8 rounded-lg border border-white/10',
        'bg-white/5 backdrop-blur-md transition-all hover:bg-white/10',
        classes.borderHover,
        classes.glow,
        'group relative overflow-hidden'
      )}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <props.icon className={cn('w-10 h-10 mb-4 transition-colors', classes.icon)} />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
        {props.title}
      </span>
    </motion.button>
  );
}

export function MissionControl() {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const title = useMemo(() => {
    if (!activeModal) return '';
    return `${activeModal} Protocol`;
  }, [activeModal]);

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-neon-cyan flex items-center justify-center rounded-sm">
              <Shield size={14} className="text-void" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
              Nexus <span className="text-neon-cyan">Mission Control</span>
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
            Commander Active • Systems Nominal • Uplink Secure
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[10px] font-mono text-neon-green animate-pulse flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
            LIVE CONNECTION
          </div>
          <div className="text-[10px] font-mono text-white/20">
            SEC_LEVEL: ALPHA_9
          </div>
        </div>
      </div>

      {/* Core Systems */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
            Core Systems
          </h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ControlModule
            title="Pricing Engine"
            icon={Database}
            color="blue"
            onClick={() => setActiveModal('pricing')}
          />
          <ControlModule
            title="Maintenance"
            icon={ShieldAlert}
            color="red"
            onClick={() => setActiveModal('maintenance')}
          />
          <ControlModule
            title="Neural Core"
            icon={Cpu}
            color="purple"
            onClick={() => setActiveModal('logs')}
          />
          <ControlModule
            title="System Terminal"
            icon={Terminal}
            color="blue"
            onClick={() => setActiveModal('logs')}
          />
        </div>
      </div>

      {/* Personnel */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
            Personnel & Intelligence
          </h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ControlModule
            title="User Roster"
            icon={Users}
            color="green"
            onClick={() => setActiveModal('users')}
          />
          <ControlModule
            title="Activity Logs"
            icon={Activity}
            color="purple"
            onClick={() => setActiveModal('logs')}
          />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-void/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <h2 className="text-lg font-bold font-mono uppercase tracking-tighter text-neon-cyan">
                    {title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-white/30 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="h-48 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-md bg-black/40 text-white/20 font-mono text-xs uppercase tracking-widest gap-4">
                  <div className="flex gap-2">
                    <div className="w-1 h-4 bg-neon-cyan animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1 h-4 bg-neon-cyan animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1 h-4 bg-neon-cyan animate-bounce" />
                  </div>
                  Module Initializing...
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                    Abort
                  </button>
                  <button className="px-6 py-2 bg-neon-cyan text-void text-xs font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-neon-cyan/80 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    Execute Protocol
                  </button>
                </div>
              </div>

              {/* Decorative Footer */}
              <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/20 uppercase tracking-widest">
                <span>Nexus_OS // Protocol_Layer_v2</span>
                <span>Checksum: OK</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
