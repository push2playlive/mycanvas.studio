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
                {activeModal === 'pricing' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Monthly Revenue</p>
                        <p className="text-xl font-bold font-mono text-neon-cyan">$142,850.00</p>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Active Subscriptions</p>
                        <p className="text-xl font-bold font-mono text-neon-green">1,240</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] space-y-2">
                      <p className="text-white/20 uppercase">Recent Transactions</p>
                      <div className="flex justify-between text-white/60">
                        <span>TX_9421_ARCHITECT</span>
                        <span className="text-neon-green">+$930.00</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>TX_9420_CREDITS</span>
                        <span className="text-neon-green">+$49.00</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'maintenance' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-neon-magenta/5 border border-neon-magenta/20">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="text-neon-magenta" size={20} />
                        <div>
                          <p className="text-xs font-bold text-white">Critical Update Required</p>
                          <p className="text-[10px] text-white/40 font-mono">Kernel v4.2.1-patch-9 is pending</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert('Kernel Update Initiated')}
                        className="px-3 py-1 bg-neon-magenta text-white text-[10px] font-mono rounded uppercase"
                      >
                        Update
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono text-white/40 uppercase">System Health</p>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-neon-green" />
                      </div>
                      <div className="flex justify-between text-[8px] font-mono text-white/20">
                        <span>CPU: 12%</span>
                        <span>MEM: 4.2GB / 32GB</span>
                        <span>DISK: 82%</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'users' && (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                      {[
                        { name: 'Commander_Zero', role: 'Admin', status: 'Online' },
                        { name: 'Neural_Architect', role: 'Developer', status: 'Online' },
                        { name: 'Ghost_Protocol', role: 'Security', status: 'Offline' },
                        { name: 'Data_Miner', role: 'Analyst', status: 'Online' },
                      ].map((user, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", user.status === 'Online' ? 'bg-neon-green' : 'bg-white/10')} />
                            <span className="text-xs font-mono text-white/80">{user.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/20 uppercase">{user.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModal === 'logs' && (
                  <div className="bg-black/60 p-4 rounded-lg border border-white/10 font-mono text-[10px] h-64 overflow-y-auto space-y-1">
                    <p className="text-neon-cyan">[08:42:12] Uplink established via Tokyo_Relay_04</p>
                    <p className="text-white/40">[08:42:15] Handshake complete. Protocol: AES-512</p>
                    <p className="text-neon-magenta">[08:43:01] WARNING: Unauthorized probe detected from 192.168.1.42</p>
                    <p className="text-neon-green">[08:43:02] Firewall active. Threat neutralized.</p>
                    <p className="text-white/40">[08:44:10] Syncing neural architecture with GitHub...</p>
                    <p className="text-neon-cyan">[08:45:00] System heartbeat nominal.</p>
                    <p className="text-white/20">[08:45:30] Idle state entered.</p>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={() => {
                      alert(`${title} Executed Successfully`);
                      setActiveModal(null);
                    }}
                    className="px-6 py-2 bg-neon-cyan text-void text-xs font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-neon-cyan/80 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  >
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
