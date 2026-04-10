import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Target, Search, ShieldAlert, Activity, Globe, MessageSquare, TrendingUp, Briefcase, ExternalLink, Zap, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MarketLead {
  id: string;
  text: string;
  source: string;
  timestamp: string;
  type: 'complaint' | 'mention' | 'backlink' | 'hiring';
  status: 'new' | 'reviewed' | 'dispatched';
}

interface Trend {
  id: string;
  query: string;
  volume: string;
  growth: string;
  status: 'monitoring' | 'hijacked';
}

export const MarketDispatcher = () => {
  const [targetDomain, setTargetDomain] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'trends'>('leads');
  const [seoKeywords, setSeoKeywords] = useState<string[]>(['canvas design', 'online editor', 'svg creator']);
  
  const [trends, setTrends] = useState<Trend[]>([
    { id: 't1', query: 'Canva alternative 2024', volume: '45K', growth: '+120%', status: 'monitoring' },
    { id: 't2', query: 'free svg editor online', volume: '12K', growth: '+85%', status: 'monitoring' },
    { id: 't3', query: 'collaborative design tools', volume: '8K', growth: '+40%', status: 'hijacked' },
  ]);

  const [leads, setLeads] = useState<MarketLead[]>(() => {
    const saved = localStorage.getItem('nexus-market-leads');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'Looking for a Canva alternative that supports custom SVG exports without a subscription.', source: 'reddit.com/r/design', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'complaint', status: 'new' },
      { id: '2', text: 'YouTube Chat is getting too cluttered. Anyone tried utubechat.com yet?', source: 'twitter.com/tech_guru', timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'mention', status: 'reviewed' },
      { id: '3', text: 'Top 10 Design Tools for 2024 - Reviewing the competition.', source: 'designblog.io', timestamp: new Date(Date.now() - 86400000).toISOString(), type: 'backlink', status: 'new' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('nexus-market-leads', JSON.stringify(leads));
  }, [leads]);

  const handleHijack = (trendId: string) => {
    setTrends(prev => prev.map(t => {
      if (t.id === trendId) {
        const keyword = t.query.toLowerCase();
        if (!seoKeywords.includes(keyword)) {
          setSeoKeywords(prevK => [...prevK, keyword]);
        }
        return { ...t, status: 'hijacked' };
      }
      return t;
    }));
  };

  const handleDispatch = async () => {
    if (!targetDomain) return;
    setIsDeploying(true);
    
    // Simulate scraping delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newLead: MarketLead = {
      id: Math.random().toString(36).substr(2, 9),
      text: `Detected high-intent discussion regarding ${targetDomain} features on community forums.`,
      source: `community.${targetDomain}.com`,
      timestamp: new Date().toISOString(),
      type: 'mention',
      status: 'new'
    };

    setLeads([newLead, ...leads]);
    setIsDeploying(false);
    setTargetDomain('');
  };

  const getTypeColor = (type: MarketLead['type']) => {
    switch (type) {
      case 'complaint': return 'text-neon-magenta bg-neon-magenta/10';
      case 'mention': return 'text-neon-cyan bg-neon-cyan/10';
      case 'backlink': return 'text-neon-green bg-neon-green/10';
      case 'hiring': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-white/40 bg-white/5';
    }
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-neon-magenta flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(255,0,255,0.4)]">
              <Rocket size={14} className="text-void" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
              Market <span className="text-neon-magenta">Dispatcher</span>
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
            Offensive Growth Engine & Competitive Displacement
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest">Growth Shield Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Dispatch Control */}
        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <Target size={14} className="text-neon-magenta" /> Strategic Deployment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-white/20 uppercase mb-2 block">Target Domain</label>
                <input
                  type="text"
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="e.g. canva.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-magenta/50 transition-all"
                />
              </div>
              <button
                onClick={handleDispatch}
                disabled={isDeploying || !targetDomain}
                className={cn(
                  "w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                  isDeploying 
                    ? "bg-white/5 text-white/20 cursor-wait" 
                    : "bg-neon-magenta text-void hover:bg-neon-magenta/80 shadow-[0_0_30px_rgba(255,0,255,0.2)]"
                )}
              >
                {isDeploying ? (
                  <>
                    <Zap size={16} className="animate-spin" />
                    Deploying Agents...
                  </>
                ) : (
                  <>
                    <Rocket size={16} />
                    Attack Market: {targetDomain || 'Target'}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <TrendingUp size={14} className="text-neon-cyan" /> Growth Shield Abilities
            </h3>
            <div className="space-y-4">
              {[
                { icon: MessageSquare, label: 'Auto-Reply (AI)', desc: 'Draft competitive responses', action: () => setActiveTab('leads') },
                { icon: Zap, label: 'Trend Hijacking', desc: 'Boost SEO for spikes', action: () => setActiveTab('trends') },
                { icon: Briefcase, label: 'Hiring Signals', desc: 'Monitor dev expansion', action: () => {} },
              ].map((ability, i) => (
                <div 
                  key={i} 
                  onClick={ability.action}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                >
                  <div className="p-2 rounded-md bg-white/5 text-white/40 group-hover:text-neon-cyan transition-colors">
                    <ability.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/80">{ability.label}</p>
                    <p className="text-[10px] font-mono text-white/20">{ability.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <Search size={14} className="text-neon-green" /> Active SEO Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {seoKeywords.map((keyword, i) => (
                <span key={i} className="px-2 py-1 bg-neon-green/10 border border-neon-green/20 text-neon-green text-[9px] font-mono rounded uppercase">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Market Leads & Trends */}
        <div className="col-span-8 glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('leads')}
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 transition-colors",
                  activeTab === 'leads' ? "text-neon-cyan" : "text-white/40 hover:text-white"
                )}
              >
                <Terminal size={14} /> Intelligence Feed
              </button>
              <button 
                onClick={() => setActiveTab('trends')}
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 transition-colors",
                  activeTab === 'trends' ? "text-neon-magenta" : "text-white/40 hover:text-white"
                )}
              >
                <TrendingUp size={14} /> Trend Monitor
              </button>
            </div>
            <span className="text-[8px] font-mono text-white/20 uppercase">
              {activeTab === 'leads' ? `${leads.length} Active Leads` : `${trends.length} Trending Queries`}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {activeTab === 'leads' ? (
                leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className={cn("text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold", getTypeColor(lead.type))}>
                          {lead.type}
                        </span>
                        <span className="text-[10px] font-mono text-white/20">{new Date(lead.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-white/10 hover:text-neon-cyan transition-colors">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{lead.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/30">
                        <Globe size={12} />
                        <span>{lead.source}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono rounded hover:bg-neon-cyan/20 transition-all">
                          Dispatch Outreach
                        </button>
                        <button className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono rounded hover:bg-white/10 transition-all">
                          Archive
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                trends.map((trend) => (
                  <motion.div
                    key={trend.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-lg text-neon-magenta">
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{trend.query}</h4>
                          <div className="flex gap-3 mt-1">
                            <span className="text-[10px] font-mono text-white/40 uppercase">Vol: {trend.volume}</span>
                            <span className="text-[10px] font-mono text-neon-green uppercase">{trend.growth}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {trend.status === 'hijacked' ? (
                          <div className="flex items-center gap-2 text-neon-green font-mono text-[10px] uppercase">
                            <Zap size={12} />
                            Hijacked
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleHijack(trend.id)}
                            className="px-4 py-2 bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta text-[10px] font-mono rounded uppercase hover:bg-neon-magenta/20 transition-all"
                          >
                            Hijack Trend
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Market_Dispatcher // Offensive_Relay_Active</span>
        <span>Lead_Capture_Rate: 84%</span>
      </div>
    </div>
  );
};
