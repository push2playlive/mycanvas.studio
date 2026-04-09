import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TacticalMap } from '../components/TacticalMap';

export function Home() {
  return (
    <div className="h-screen w-screen bg-void overflow-hidden relative flex flex-col items-center justify-center selection:bg-neon-cyan selection:text-void">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0 opacity-60">
        <TacticalMap />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-8">
            <Shield size={12} className="text-neon-cyan" />
            <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em]">Secure Neural Link Established</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold font-mono tracking-tighter uppercase mb-4 text-white">
            Nexus <span className="text-neon-cyan drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">OS</span>
          </h1>
          <p className="text-white/40 text-sm md:text-lg font-mono uppercase tracking-[0.5em] max-w-2xl mx-auto leading-relaxed">
            The Neural Operating System for the <span className="text-white/80">Next Generation</span> of Architects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/admin">
              <button className="group relative px-12 py-5 bg-neon-cyan text-void font-mono font-bold uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]">
                <span className="relative z-10 flex items-center gap-3">
                  Enter Command Center <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </Link>
            <Link to="/auth">
              <button className="group relative px-12 py-5 border border-white/10 text-white font-mono font-bold uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:bg-white/5">
                <span className="relative z-10 flex items-center gap-3">
                  System Login <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          <div className="flex gap-12">
            {[
              { icon: Shield, label: 'Secure', color: 'text-neon-cyan' },
              { icon: Zap, label: 'Fast', color: 'text-neon-magenta' },
              { icon: Cpu, label: 'Intelligent', color: 'text-neon-green' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/20 group hover:text-white/40 transition-colors">
                <item.icon size={16} className={item.color} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      {/* Bottom Info */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-white/10" />
          <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">Nexus_OS // v2.4.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">Neural_Link: Active</span>
          <div className="w-12 h-px bg-white/10" />
        </div>
      </div>
    </div>
  );
}
