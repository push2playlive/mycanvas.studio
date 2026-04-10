import React from 'react';
import { Wallet, CheckCircle, Lock, ArrowUpRight, Shield } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Account = () => {
  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void galaxy-bg selection:bg-neon-cyan selection:text-void">
      <div className="max-w-4xl mx-auto w-full">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,255,204,0.1)]">
              <Wallet size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-mono tracking-tighter uppercase">The Vault</h2>
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">Sovereign Credit Management</p>
            </div>
          </div>
          <button className="px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(0,255,204,0.1)]">
            LIFETIME OWNER
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/[0.02] shadow-shield">
            <h3 className="text-sm font-bold font-mono uppercase tracking-[0.2em] text-white/60 mb-6 flex items-center gap-2">
              <Shield size={16} className="text-neon-cyan" /> Subscription Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Active Plan</p>
                <p className="text-xl font-bold text-white">Architect Tier</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Next Billing Cycle</p>
                <p className="text-sm font-mono text-white/80">May 10, 2026</p>
              </div>
              <button className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all flex items-center justify-center gap-2">
                Upgrade Credits <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/[0.02] shadow-shield">
            <h3 className="text-sm font-bold font-mono uppercase tracking-[0.2em] text-white/60 mb-6 flex items-center gap-2">
              <Lock size={16} className="text-neon-magenta" /> Authorized Connections
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'mycanvaslab.com', status: 'Active', icon: CheckCircle, color: 'text-neon-green' },
                { name: 'utubechat.com', status: 'Active', icon: CheckCircle, color: 'text-neon-green' },
                { name: 'hygieneteam.nz', status: 'Inactive', icon: Lock, color: 'text-white/20' },
              ].map((limb, i) => (
                <li key={i} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded hover:border-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <limb.icon size={14} className={limb.color} />
                    <span className="text-xs font-mono text-white/80">{limb.name}</span>
                  </div>
                  <span className={cn("text-[8px] font-mono uppercase tracking-widest", limb.color)}>
                    {limb.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/[0.02] shadow-shield">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-6">Recent Transactions</h3>
          <div className="space-y-2">
            {[
              { desc: 'Neural Credit Refill', amt: '+500', date: 'Apr 08, 2026' },
              { desc: 'Sovereign Buyout Protocol', amt: '-$930', date: 'Mar 15, 2026' },
              { desc: 'Monthly Uplink Fee', amt: '-$49', date: 'Mar 10, 2026' },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center p-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-xs font-mono text-white/80">{tx.desc}</p>
                  <p className="text-[8px] font-mono text-white/20 uppercase">{tx.date}</p>
                </div>
                <span className={cn(
                  "text-xs font-mono font-bold",
                  tx.amt.startsWith('+') ? "text-neon-green" : "text-white/60"
                )}>
                  {tx.amt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Vault_Module // Secure_Ledger</span>
        <span>Integrity_Check: PASSED</span>
      </div>
    </div>
  );
};
