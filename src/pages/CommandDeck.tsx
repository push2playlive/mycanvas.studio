import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AGENTS } from '../lib/constants';
import { LiveGlobe } from '../components/war-room/LiveGlobe';
import { Send, Sparkles, Shield, Cpu, Activity, Database, Globe } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LiveConsole } from '../components/dashboard/LiveConsole';
import { generateAppCode } from '../services/gemini';
import { Sandpack } from "@codesandbox/sandpack-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CommandDeck = () => {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  const [message, setMessage] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'monitor' | 'build'>('monitor');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'agent', text: string }[]>([]);

  const handleSendMessage = async () => {
    if (!message.trim() || isBuilding) return;
    
    const userPrompt = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userPrompt }]);
    
    // Check if it's a build request
    const isBuildRequest = userPrompt.toLowerCase().includes('build') || 
                          userPrompt.toLowerCase().includes('create') || 
                          userPrompt.toLowerCase().includes('app') ||
                          userPrompt.toLowerCase().includes('code');

    if (isBuildRequest) {
      setIsBuilding(true);
      setViewMode('build');
      try {
        const code = await generateAppCode(userPrompt, selectedAgent.systemPrompt);
        setGeneratedCode(code);
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `Neural architecture constructed. Initializing Build Mode preview...` 
        }]);
      } catch (error) {
        console.error("Failed to generate app:", error);
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `ERROR: Uplink failed. Could not generate neural architecture.` 
        }]);
      } finally {
        setIsBuilding(false);
      }
    } else {
      // Just a normal chat message (simulated for now, or could call Gemini for text too)
      setChatHistory(prev => [...prev, { 
        role: 'agent', 
        text: `Acknowledged. Processing request in ${selectedAgent.role} mode...` 
      }]);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 p-8 overflow-y-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: '2.4M', trend: '+12.5%', icon: Activity, color: 'text-neon-cyan' },
          { label: 'Active Users', value: '18.2K', trend: '+8.3%', icon: Globe, color: 'text-neon-magenta' },
          { label: 'Avg Response', value: '124ms', trend: '-15.2%', icon: Cpu, color: 'text-neon-green' },
          { label: 'Error Rate', value: '0.12%', trend: '-0.05%', icon: Shield, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-bold font-mono">{stat.value}</h3>
              <span className={cn("text-[10px] font-mono", stat.trend.startsWith('+') ? 'text-neon-green' : 'text-neon-magenta')}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Left Column: Main View (Monitor or Build) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-panel rounded-lg overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode('monitor')}
                className={cn(
                  "flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors",
                  viewMode === 'monitor' ? "text-neon-cyan" : "text-white/40 hover:text-white"
                )}
              >
                <Globe size={14} /> Monitor
              </button>
              <button 
                onClick={() => setViewMode('build')}
                className={cn(
                  "flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors",
                  viewMode === 'build' ? "text-neon-cyan" : "text-white/40 hover:text-white"
                )}
              >
                <Cpu size={14} /> Build Mode
              </button>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
              {generatedCode && viewMode === 'build' && (
                <button 
                  onClick={() => setGeneratedCode(null)}
                  className="hover:text-neon-magenta transition-colors uppercase"
                >
                  [Clear Build]
                </button>
              )}
              <span className="flex items-center gap-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", isBuilding ? "bg-neon-magenta animate-pulse" : "bg-neon-green")} /> 
                {isBuilding ? 'GENERATING...' : 'READY'}
              </span>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[500px] bg-black/20">
            {viewMode === 'monitor' ? (
              <LiveGlobe />
            ) : (
              <div className="h-full w-full p-4">
                {generatedCode ? (
                  <Sandpack
                    template="react"
                    theme="dark"
                    files={{
                      "/App.js": generatedCode,
                    }}
                    options={{
                      showNavigator: true,
                      showTabs: true,
                      externalResources: [
                        "https://cdn.tailwindcss.com",
                        "https://unpkg.com/lucide-react",
                        "https://unpkg.com/motion"
                      ],
                    }}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-white/20 font-mono text-sm gap-4">
                    <div className="w-16 h-16 border border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                      <Cpu size={32} />
                    </div>
                    <p>Initialize a build request via Agent Command</p>
                    <p className="text-[10px] opacity-50 uppercase tracking-widest">Example: "Build a login page with neon effects"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Agent Command */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel rounded-lg flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-white/5 bg-white/5">
            <span className="font-mono text-xs uppercase tracking-widest">Agent Command</span>
          </div>
          
          {/* Agent Selector */}
          <div className="p-4 grid grid-cols-2 gap-2">
            {AGENTS.map((agent) => {
              const colorStyles: Record<string, string> = {
                'neon-cyan': 'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan',
                'neon-magenta': 'bg-neon-magenta/10 border-neon-magenta/50 text-neon-magenta',
                'neon-green': 'bg-neon-green/10 border-neon-green/50 text-neon-green',
                'yellow-400': 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400',
              };
              const activeStyle = colorStyles[agent.color] || 'bg-white/10 border-white/50 text-white';
              const inactiveStyle = 'bg-white/5 border-white/10 hover:border-white/20 text-white/50';
              const indicatorColor: Record<string, string> = {
                'neon-cyan': 'bg-neon-cyan',
                'neon-magenta': 'bg-neon-magenta',
                'neon-green': 'bg-neon-green',
                'yellow-400': 'bg-yellow-400',
              };

              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    "p-3 rounded-md border transition-all text-left relative overflow-hidden group",
                    selectedAgent.id === agent.id ? activeStyle : inactiveStyle
                  )}
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-1 h-full",
                    indicatorColor[agent.color] || 'bg-white'
                  )} />
                  <p className={cn("text-[10px] font-mono uppercase tracking-tighter mb-1")}>
                    {agent.role}
                  </p>
                  <p className="text-sm font-bold">{agent.name}</p>
                </button>
              );
            })}
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto font-mono text-xs scrollbar-hide">
            <div className="p-3 bg-white/5 border border-white/5 rounded-md">
              <p className="text-neon-cyan mb-2">[{selectedAgent.name.toUpperCase()}_INITIALIZED]</p>
              <p className="text-white/70 leading-relaxed">
                {selectedAgent.description}
              </p>
            </div>

            {chatHistory.map((chat, i) => (
              <div key={i} className={cn(
                "p-3 rounded-md border",
                chat.role === 'user' ? "bg-white/5 border-white/10 ml-4" : "bg-neon-cyan/5 border-neon-cyan/20 mr-4"
              )}>
                <p className={cn(
                  "text-[10px] uppercase mb-1",
                  chat.role === 'user' ? "text-white/40" : "text-neon-cyan"
                )}>
                  {chat.role === 'user' ? 'COMMANDER' : selectedAgent.name.toUpperCase()}
                </p>
                <p className="text-white/80 leading-relaxed">{chat.text}</p>
              </div>
            ))}
            
            {isBuilding && (
              <div className="p-3 bg-neon-magenta/10 border border-neon-magenta/30 rounded-md animate-pulse">
                <p className="text-neon-magenta mb-1">[GENERATING_CODE...]</p>
                <p className="text-white/50">Agent {selectedAgent.name} is constructing the neural architecture...</p>
              </div>
            )}
            
            <div className="mt-auto pt-4 space-y-4">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Command ${selectedAgent.name}...`}
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-md p-4 text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none font-mono"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button className="p-2 glass-panel rounded-md hover:text-neon-cyan transition-colors">
                    <Sparkles size={16} />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={isBuilding}
                    className="p-2 bg-neon-cyan text-void rounded-md hover:bg-neon-cyan/80 transition-colors disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Shield size={10} /> Secure Uplink</span>
                <span className="flex items-center gap-1"><Database size={10} /> Ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Console */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="h-[250px]"
      >
        <LiveConsole />
      </motion.div>
    </div>
  );
};



