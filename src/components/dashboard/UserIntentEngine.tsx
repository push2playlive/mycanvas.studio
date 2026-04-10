import React, { useEffect, useState } from 'react';
import { Activity, User, MousePointer2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Intent {
  id: string;
  user: string;
  action: string;
  intent: string;
  confidence: number;
}

export const UserIntentEngine = () => {
  const [intents, setIntents] = useState<Intent[]>([]);

  useEffect(() => {
    const initialIntents: Intent[] = [
      { id: '1', user: 'User_882', action: 'Hovering Pricing', intent: 'Purchase Propensity', confidence: 0.85 },
      { id: '2', user: 'User_124', action: 'Searching "API"', intent: 'Technical Integration', confidence: 0.92 },
      { id: '3', user: 'User_567', action: 'Idle on Dashboard', intent: 'Retention Risk', confidence: 0.45 },
    ];
    setIntents(initialIntents);

    const interval = setInterval(() => {
      const actions = ['Clicking "Deploy"', 'Reading Docs', 'Viewing Gallery', 'Updating Profile', 'Exporting Data'];
      const intentTypes = ['Conversion', 'Exploration', 'Engagement', 'Churn Risk', 'Support Need'];
      const newIntent: Intent = {
        id: Math.random().toString(36).substr(2, 9),
        user: `User_${Math.floor(Math.random() * 999)}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        intent: intentTypes[Math.floor(Math.random() * intentTypes.length)],
        confidence: Math.random()
      };
      setIntents(prev => [newIntent, ...prev].slice(0, 10));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-neon-cyan" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest">User Intent Engine</h3>
        </div>
        <div className="px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/20">
          <span className="text-[8px] font-mono text-neon-cyan uppercase tracking-widest">Live Pulse</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
        <AnimatePresence initial={false}>
          {intents.map((intent) => (
            <motion.div
              key={intent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-neon-cyan/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-neon-cyan/10">
                  <User size={12} className="text-neon-cyan" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-white/80">{intent.user}</p>
                  <p className="text-[8px] font-mono text-white/30">{intent.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-mono font-bold text-neon-cyan uppercase tracking-tighter">
                  {intent.intent}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neon-cyan" 
                      style={{ width: `${intent.confidence * 100}%` }} 
                    />
                  </div>
                  <span className="text-[8px] font-mono text-white/20">{Math.round(intent.confidence * 100)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
