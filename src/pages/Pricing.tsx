import React from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, Globe, Cpu, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PricingCard = ({ 
  tier, 
  price, 
  description, 
  features, 
  isPopular, 
  color 
}: { 
  tier: string; 
  price: string; 
  description: string; 
  features: string[]; 
  isPopular?: boolean;
  color: 'cyan' | 'magenta' | 'green'
}) => {
  const colorClasses = {
    cyan: 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5 shadow-[0_0_20px_rgba(0,240,255,0.1)]',
    magenta: 'text-neon-magenta border-neon-magenta/20 bg-neon-magenta/5 shadow-[0_0_20px_rgba(255,0,255,0.1)]',
    green: 'text-neon-green border-neon-green/20 bg-neon-green/5 shadow-[0_0_20px_rgba(10,255,0,0.1)]'
  };

  const buttonClasses = {
    cyan: 'bg-neon-cyan text-void hover:bg-neon-cyan/80',
    magenta: 'bg-neon-magenta text-void hover:bg-neon-magenta/80',
    green: 'bg-neon-green text-void hover:bg-neon-green/80'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "glass-panel p-8 rounded-xl border flex flex-col relative overflow-hidden",
        isPopular ? colorClasses[color] : "border-white/10 bg-white/[0.02]"
      )}
    >
      {isPopular && (
        <div className={cn(
          "absolute top-0 right-0 px-4 py-1 text-[8px] font-mono font-bold uppercase tracking-[0.2em]",
          buttonClasses[color]
        )}>
          Recommended
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold font-mono uppercase tracking-tighter mb-2">{tier}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold font-mono">{price}</span>
          <span className="text-white/30 text-xs font-mono">/mo</span>
        </div>
        <p className="mt-4 text-xs text-white/50 leading-relaxed">{description}</p>
      </div>

      <div className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-xs text-white/70">
            <Check size={14} className={cn(
              color === 'cyan' ? "text-neon-cyan" : color === 'magenta' ? "text-neon-magenta" : "text-neon-green"
            )} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button className={cn(
        "w-full py-3 rounded-md font-mono font-bold text-xs uppercase tracking-widest transition-all",
        isPopular ? buttonClasses[color] : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
      )}>
        Initialize Protocol
      </button>
    </motion.div>
  );
};

export const Pricing = () => {
  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-6"
        >
          <Shield size={12} className="text-neon-cyan" />
          <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.2em]">Access Protocols</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">
          Neural <span className="text-neon-cyan">Subscription</span>
        </h1>
        <p className="text-white/40 text-sm font-mono uppercase tracking-widest max-w-2xl mx-auto">
          Select your clearance level and unlock advanced Nexus OS capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        <PricingCard
          tier="Scout"
          price="$0"
          description="Basic access for independent operatives and neural explorers."
          color="cyan"
          features={[
            "Standard Neural Uplink",
            "Basic Agent Access (Commander)",
            "1GB Secure Storage",
            "Community Support",
            "Public Gallery Access"
          ]}
        />
        <PricingCard
          tier="Operative"
          price="$29"
          description="Enhanced capabilities for professional developers and strategists."
          isPopular
          color="magenta"
          features={[
            "High-Speed Neural Uplink",
            "All Agent Access (Guru, Artist, Verifier)",
            "10GB Secure Storage",
            "Priority Build Queue",
            "Private Project Streams",
            "GitHub Sync Integration"
          ]}
        />
        <PricingCard
          tier="Prime"
          price="$99"
          description="Full system control for elite architects and enterprise commanders."
          color="green"
          features={[
            "Ultra-Low Latency Uplink",
            "Unlimited Agent Instances",
            "100GB Secure Storage",
            "Dedicated Support Channel",
            "Custom Agent Training",
            "Advanced Security Audits",
            "White-label Deployment"
          ]}
        />
      </div>

      {/* Trust Badges */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
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
