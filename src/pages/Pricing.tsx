import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Shield, Zap, Globe, Cpu, Terminal, ArrowRight, Database, Code, Github } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Pricing = () => {
  const [isBuyout, setIsBuyout] = useState(false);
  const [credits, setCredits] = useState(100);

  // Dynamic Monthly Price Logic
  const getMonthlyPrice = (amt: number) => {
    if (amt <= 25) return 19;
    if (amt <= 45) return 29;
    if (amt <= 100) return 49;
    if (amt <= 1000) return 150;
    return (amt * 0.15).toFixed(0); // Volume scaling
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-6"
        >
          <Shield size={12} className="text-neon-cyan" />
          <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.2em]">Sovereign Access</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">
          Architect <span className="text-neon-cyan">Tier</span>
        </h1>
        <p className="text-white/40 text-sm font-mono uppercase tracking-widest max-w-2xl mx-auto">
          Full control over the Nexus limbs. Choose your uplink protocol.
        </p>
      </div>

      <div className="max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-cyan/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="px-3 py-1 bg-neon-cyan text-void text-[10px] font-mono font-bold uppercase tracking-widest rounded">
                Sovereign Access
              </div>
              <div className="text-white/20 font-mono text-[10px] uppercase tracking-widest">Protocol v4.2</div>
            </div>

            {/* THE SWITCH: Monthly vs One-Time Buyout */}
            <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/5">
              <button 
                onClick={() => setIsBuyout(false)}
                className={cn(
                  "flex-1 py-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                  !isBuyout ? "bg-neon-cyan text-void shadow-[0_0_20px_rgba(0,240,255,0.3)]" : "text-white/40 hover:text-white"
                )}
              >
                Monthly Subscription
              </button>
              <button 
                onClick={() => setIsBuyout(true)}
                className={cn(
                  "flex-1 py-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                  isBuyout ? "bg-neon-cyan text-void shadow-[0_0_20px_rgba(0,240,255,0.3)]" : "text-white/40 hover:text-white"
                )}
              >
                One-Time Buyout
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-1 text-neon-cyan mb-2">
                <span className="text-2xl font-mono font-bold">$</span>
                <span className="text-6xl font-mono font-bold tracking-tighter">
                  {isBuyout ? "930" : getMonthlyPrice(credits)}
                </span>
                {!isBuyout && <span className="text-xl font-mono text-white/20">/mo</span>}
              </div>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                {isBuyout ? "Lifetime Ownership" : "Neural Credit Uplink"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isBuyout ? (
                <motion.div
                  key="subscription"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                      Neural Credits
                    </label>
                    <div className="relative">
                      <select 
                        value={credits} 
                        onChange={(e) => setCredits(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-mono text-white focus:outline-none focus:border-neon-cyan/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value={25} className="bg-void">25 Credits ($19/mo)</option>
                        <option value={45} className="bg-void">45 Credits ($29/mo)</option>
                        <option value={100} className="bg-void">100 Credits ($49/mo)</option>
                        <option value={1000} className="bg-void">1,000 Credits ($150/mo)</option>
                        <option value={10000} className="bg-void">10,000 Credits ($1,500/mo)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                        <Zap size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Database, label: 'Cloud Storage' },
                      { icon: Cpu, label: 'Neural Compute' },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <feat.icon size={14} className="text-neon-cyan" />
                        <span className="text-[10px] font-mono text-white/60 uppercase">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="buyout"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Code, text: 'Lifetime Source Code Access' },
                    { icon: Github, text: 'Export to GitHub Repo' },
                    { icon: Shield, text: 'Remove "Built with Studio" Badge' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10">
                      <div className="p-2 bg-neon-cyan/10 rounded-lg">
                        <item.icon size={18} className="text-neon-cyan" />
                      </div>
                      <span className="text-xs font-mono text-white/80">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button className="w-full mt-8 group relative py-5 bg-neon-cyan text-void font-mono font-bold uppercase tracking-[0.3em] text-xs rounded-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isBuyout ? "Purchase Ownership" : "Activate Credits"}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 max-w-6xl mx-auto w-full">
        {[
          { icon: Shield, label: 'Secure Encryption', desc: 'AES-512-GCM' },
          { icon: Zap, label: 'Instant Uplink', desc: '12ms Latency' },
          { icon: Globe, label: 'Global Relay', desc: '24/7 Uptime' },
          { icon: Cpu, label: 'Neural Core', desc: 'Quantum Powered' },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <item.icon size={24} className="mx-auto mb-3 text-white/20" />
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 mb-1">{item.label}</h4>
            <p className="text-[8px] font-mono text-white/20 uppercase">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Billing_Module // Secure_Transactions</span>
        <span>Clearance_Required: ALL</span>
      </div>
    </div>
  );
};
