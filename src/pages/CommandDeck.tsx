import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AGENTS } from '../lib/constants';
import { TacticalMap } from '../components/TacticalMap';
import { Send, Sparkles, Shield, Cpu, Activity, Database, Globe, Video, Play, Download, X, Terminal, Zap, Lock, Eye } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LiveConsole } from '../components/dashboard/LiveConsole';
import { generateAppCode, generateVideo } from '../services/gemini';
import { Sandpack } from "@codesandbox/sandpack-react";
import { ThreatMatrix } from '../components/dashboard/ThreatMatrix';
import { UserIntentEngine } from '../components/dashboard/UserIntentEngine';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CommandDeck = () => {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  const [message, setMessage] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'monitor' | 'build' | 'video'>('monitor');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  const [buildStatus, setBuildStatus] = useState('');

  const handleSendMessage = async (forceBuild = false) => {
    if (!message.trim() || isBuilding) return;
    
    const userPrompt = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userPrompt }]);
    
    // Check if it's a build request
    const isBuildRequest = forceBuild || 
                          userPrompt.toLowerCase().includes('build') || 
                          userPrompt.toLowerCase().includes('create') || 
                          userPrompt.toLowerCase().includes('app') ||
                          userPrompt.toLowerCase().includes('code');

    // Check if it's a video request
    const isVideoRequest = userPrompt.toLowerCase().includes('video') || 
                          userPrompt.toLowerCase().includes('generate video') || 
                          userPrompt.toLowerCase().includes('movie');

    if (isVideoRequest) {
      setIsGeneratingVideo(true);
      setViewMode('video');
      setBuildStatus('Initializing...');
      
      window.dispatchEvent(new CustomEvent('nexus-console-log', { 
        detail: { message: `Initializing Veo video synthesis: ${userPrompt.substring(0, 30)}...`, type: 'info' } 
      }));

      try {
        const url = await generateVideo(userPrompt, {}, (status) => {
          setBuildStatus(status);
          window.dispatchEvent(new CustomEvent('nexus-console-log', { 
            detail: { message: status, type: 'info' } 
          }));
        });
        setVideoUrl(url);
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `Temporal synthesis complete. Video stream ready for playback.` 
        }]);
        window.dispatchEvent(new CustomEvent('nexus-console-log', { 
          detail: { message: `Video generation successful.`, type: 'success' } 
        }));
      } catch (error) {
        console.error("Failed to generate video:", error);
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `ERROR: Video synthesis failed. Neural uplink interrupted.` 
        }]);
        window.dispatchEvent(new CustomEvent('nexus-console-log', { 
          detail: { message: `Video failed: ${error instanceof Error ? error.message : 'Unknown error'}`, type: 'error' } 
        }));
      } finally {
        setIsGeneratingVideo(false);
        setBuildStatus('');
      }
      return;
    }

    if (isBuildRequest) {
      setIsBuilding(true);
      setViewMode('build');
      
      // Log to console
      const logEvent = new CustomEvent('nexus-console-log', { 
        detail: { 
          message: `Initializing neural build sequence: ${selectedAgent.name} Agent active.`,
          type: 'info'
        } 
      });
      window.dispatchEvent(logEvent);

      try {
        const code = await generateAppCode(userPrompt, selectedAgent.systemPrompt);
        setGeneratedCode(code);
        
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `Neural architecture constructed by ${selectedAgent.name}. Initializing Build Mode preview...` 
        }]);

        window.dispatchEvent(new CustomEvent('nexus-console-log', { 
          detail: { message: `Build successful. Preview ready.`, type: 'success' } 
        }));
      } catch (error) {
        console.error("Failed to generate app:", error);
        setChatHistory(prev => [...prev, { 
          role: 'agent', 
          text: `ERROR: Uplink failed. Could not generate neural architecture.` 
        }]);
        window.dispatchEvent(new CustomEvent('nexus-console-log', { 
          detail: { message: `Build failed: ${error instanceof Error ? error.message : 'Unknown error'}`, type: 'error' } 
        }));
      } finally {
        setIsBuilding(false);
      }
    } else {
      // Just a normal chat message
      setChatHistory(prev => [...prev, { 
        role: 'agent', 
        text: `Acknowledged. Processing request in ${selectedAgent.role} mode...` 
      }]);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 p-8 overflow-y-auto bg-void/50 backdrop-blur-sm">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'V24 Core Load', value: '12%', trend: 'OPTIMAL', icon: Cpu, color: 'text-neon-cyan' },
          { label: 'Fleet Status', value: 'SOVEREIGN', trend: 'STABLE', icon: Globe, color: 'text-neon-magenta' },
          { label: 'Threat Blocks', value: '1,422', trend: '+124/hr', icon: Shield, color: 'text-neon-green' },
          { label: 'Neural Sync', value: '99.9%', trend: 'LOCKED', icon: Activity, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-lg relative overflow-hidden group border-white/5 hover:border-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-bold font-mono text-white">{stat.value}</h3>
              <span className={cn("text-[10px] font-mono", stat.trend === 'OPTIMAL' || stat.trend === 'STABLE' || stat.trend === 'LOCKED' ? 'text-neon-green' : 'text-neon-magenta')}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Column: Tactical Feeds */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 glass-panel p-4 rounded-lg border-white/5"
          >
            <ThreatMatrix />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 glass-panel p-4 rounded-lg border-white/5"
          >
            <UserIntentEngine />
          </motion.div>
        </div>

        {/* Center Column: Main View (Monitor or Build) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-6 glass-panel rounded-lg overflow-hidden flex flex-col border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
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
                <Globe size={14} /> Tactical Map
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
              <button 
                onClick={() => setViewMode('video')}
                className={cn(
                  "flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors",
                  viewMode === 'video' ? "text-neon-cyan" : "text-white/40 hover:text-white"
                )}
              >
                <Video size={14} /> Video Mode
              </button>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", (isBuilding || isGeneratingVideo) ? "bg-neon-magenta animate-pulse" : "bg-neon-green")} /> 
                {isBuilding ? 'GENERATING CODE...' : isGeneratingVideo ? 'SYNTHESIZING VIDEO...' : 'V24_ONLINE'}
              </span>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[500px] bg-black/20">
            {viewMode === 'monitor' ? (
              <TacticalMap />
            ) : viewMode === 'build' ? (
              <div className="h-full w-full p-4 flex flex-col">
                {/* Build content remains same but styled */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse" />
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Neural Build Preview</span>
                  </div>
                </div>
                {generatedCode ? (
                  <div className="flex-1 rounded-lg overflow-hidden border border-white/10">
                    <Sandpack
                      template="react"
                      theme="dark"
                      files={{ "/App.js": generatedCode }}
                      options={{
                        showNavigator: true,
                        showTabs: true,
                        editorHeight: "100%",
                        externalResources: [
                          "https://cdn.tailwindcss.com",
                          "https://unpkg.com/lucide-react",
                          "https://unpkg.com/motion"
                        ],
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/20 font-mono text-sm gap-4">
                    <div className="w-16 h-16 border border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                      <Cpu size={32} />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-white/60">Initialize Build Mode</p>
                      <p className="text-[10px] uppercase tracking-[0.3em]">Neural architecture pending command</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full p-4 flex flex-col">
                {/* Video content remains same */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Neural Video Synthesis</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  {videoUrl ? (
                    <div className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
                      <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-6">
                      <div className={cn("w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center transition-all duration-500", isGeneratingVideo ? "border-neon-cyan animate-spin-slow" : "border-white/10")}>
                        <Video size={40} className={cn(isGeneratingVideo ? "text-neon-cyan" : "text-white/10")} />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-white/60 font-mono uppercase tracking-widest">{isGeneratingVideo ? buildStatus : 'Temporal Engine Ready'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Agent Command */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass-panel rounded-lg flex flex-col overflow-hidden border-white/5"
        >
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest">Agent Command</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-neon-cyan" />
              <div className="w-1 h-1 rounded-full bg-neon-magenta" />
              <div className="w-1 h-1 rounded-full bg-neon-green" />
            </div>
          </div>
          
          {/* Agent Selector */}
          <div className="p-4 grid grid-cols-1 gap-2">
            {AGENTS.map((agent) => {
              const isActive = selectedAgent.id === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    "p-3 rounded-md border transition-all text-left relative overflow-hidden group",
                    isActive ? "bg-white/10 border-white/20" : "bg-white/5 border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-1 h-full transition-all",
                    isActive ? "bg-neon-cyan" : "bg-white/10"
                  )} />
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] font-mono uppercase tracking-tighter text-white/40">{agent.role}</p>
                    {isActive && <Sparkles size={10} className="text-neon-cyan animate-pulse" />}
                  </div>
                  <p className={cn("text-xs font-bold font-mono", isActive ? "text-white" : "text-white/60")}>{agent.name}</p>
                </button>
              );
            })}
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto font-mono text-[10px] scrollbar-hide">
            {chatHistory.length === 0 && (
              <div className="p-3 bg-white/5 border border-white/5 rounded-md">
                <p className="text-neon-cyan mb-2">[{selectedAgent.name.toUpperCase()}_INITIALIZED]</p>
                <p className="text-white/50 leading-relaxed">{selectedAgent.description}</p>
              </div>
            )}

            {chatHistory.map((chat, i) => (
              <div key={i} className={cn(
                "p-3 rounded-md border",
                chat.role === 'user' ? "bg-white/5 border-white/10" : "bg-neon-cyan/5 border-neon-cyan/20"
              )}>
                <p className={cn(
                  "text-[8px] uppercase mb-1 font-bold",
                  chat.role === 'user' ? "text-white/40" : "text-neon-cyan"
                )}>
                  {chat.role === 'user' ? 'COMMANDER' : selectedAgent.name.toUpperCase()}
                </p>
                <p className="text-white/80 leading-relaxed">{chat.text}</p>
              </div>
            ))}
            
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
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-md p-3 text-xs focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none font-mono text-white"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button 
                    onClick={() => handleSendMessage(true)}
                    disabled={isBuilding}
                    className="p-1.5 glass-panel rounded-md hover:text-neon-magenta transition-colors group relative"
                  >
                    <Sparkles size={14} />
                  </button>
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={isBuilding}
                    className="p-1.5 bg-neon-cyan text-void rounded-md hover:bg-neon-cyan/80 transition-colors disabled:opacity-50"
                  >
                    <Send size={14} />
                  </button>
                </div>
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
        className="h-[200px]"
      >
        <LiveConsole />
      </motion.div>
    </div>
  );
};



