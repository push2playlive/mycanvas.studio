import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Shield, Cpu, Globe, Bell, Lock, Eye, Zap, Github, Terminal, Moon, Sun, Monitor } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SettingsTab = 'General' | 'Nexus Vault' | 'GitHub Sync' | 'Notifications';

const UserIcon = ({ size }: { size: number }) => <SettingsIcon size={size} />;
const DatabaseIcon = ({ size }: { size: number }) => <Shield size={size} />;

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General');
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>(() => {
    return (localStorage.getItem('nexus-theme') as 'dark' | 'light' | 'auto') || 'dark';
  });

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('nexus-theme', newTheme);
    window.dispatchEvent(new Event('nexus-theme-change'));
  };
  const [persona, setPersona] = useState('Commander');
  const [githubSync, setGithubSync] = useState(true);

  // API Keys
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('SUPABASE_URL') || '');
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem('SUPABASE_ANON_KEY') || '');

  const saveApiKeys = () => {
    localStorage.setItem('GEMINI_API_KEY', geminiKey);
    localStorage.setItem('SUPABASE_URL', supabaseUrl);
    localStorage.setItem('SUPABASE_ANON_KEY', supabaseKey);
    alert('Nexus Vault updated. Neural links re-established.');
  };

  const tabs: { id: SettingsTab, icon: any }[] = [
    { id: 'General', icon: UserIcon },
    { id: 'Nexus Vault', icon: DatabaseIcon },
    { id: 'GitHub Sync', icon: Github },
    { id: 'Notifications', icon: Bell },
  ];

  return (
    <div className="h-full flex flex-col bg-void selection:bg-neon-cyan selection:text-void">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 p-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-all",
                activeTab === tab.id 
                  ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon size={18} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <SettingsIcon size={32} className="text-neon-cyan" />
              <div>
                <h1 className="text-3xl font-bold font-mono tracking-tighter uppercase">Bridge Settings</h1>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">Articulate your Nexus experience</p>
              </div>
            </div>

            {activeTab === 'General' && (
              <div className="space-y-12">
                <section className="settings-panel shadow-shield p-8 glass-panel rounded-xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold font-mono uppercase tracking-tight mb-8 flex items-center gap-3">
                    <SettingsIcon size={24} className="text-neon-cyan" /> Bridge Settings
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="setting-group space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40">Visual Interface</label>
                      <select 
                        value={theme}
                        onChange={(e) => handleThemeChange(e.target.value as any)}
                        className="nexus-input w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all"
                      >
                        <option value="dark">Dark Matter (Default)</option>
                        <option value="nebula">Nebula Pulse</option>
                        <option value="solar">Solar Flare</option>
                        <option value="light">Light Mode</option>
                      </select>
                    </div>

                    <div className="setting-group">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Nexus Sync</label>
                      <div className="toggle-box flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg">
                        <span className="text-xs text-white/60 font-mono">Auto-sync missions across all apps</span>
                        <button
                          onClick={() => setGithubSync(!githubSync)}
                          className={cn(
                            "relative w-12 h-6 rounded-full transition-colors duration-300",
                            githubSync ? "bg-neon-cyan" : "bg-white/10"
                          )}
                        >
                          <motion.div
                            animate={{ x: githubSync ? 26 : 2 }}
                            className="absolute top-1 left-0 w-4 h-4 rounded-full bg-void"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="setting-group">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Security Level</label>
                        <span className="text-[10px] font-mono text-neon-cyan">Level 8</span>
                      </div>
                      <input type="range" min="1" max="10" defaultValue="8" className="nexus-slider w-full accent-neon-cyan" />
                      <p className="subtext text-[8px] font-mono text-white/20 uppercase mt-2">Current Shielding: High (Behavioral Firewall Active)</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Default Persona</label>
                    <select 
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
                      className="nexus-input w-full"
                    >
                      <option value="Commander">Commander</option>
                      <option value="Guru">Guru</option>
                      <option value="Artist">Artist</option>
                      <option value="Verifier">Verifier</option>
                    </select>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'Nexus Vault' && (
              <div className="space-y-12">
                <section className="settings-panel shadow-shield p-8 glass-panel rounded-xl border border-white/10 bg-white/[0.02]">
                  <h2 className="text-xl font-bold font-mono uppercase tracking-tight mb-8 flex items-center gap-3 text-neon-magenta">
                    <Shield size={24} /> Nexus Vault
                  </h2>
                  <p className="text-white/40 text-xs font-mono mb-8 uppercase tracking-widest">Secure storage for neural uplink credentials</p>
                  
                  <div className="space-y-8">
                    <div className="setting-group space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40">Gemini API Key</label>
                      <div className="relative">
                        <input 
                          type="password"
                          value={geminiKey}
                          onChange={(e) => setGeminiKey(e.target.value)}
                          placeholder="Enter Gemini API Key..."
                          className="nexus-input w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-magenta/50 transition-all"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      </div>
                    </div>

                    <div className="setting-group space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40">Supabase URL</label>
                      <input 
                        type="text"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://your-project.supabase.co"
                        className="nexus-input w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-magenta/50 transition-all"
                      />
                    </div>

                    <div className="setting-group space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40">Supabase Anon Key</label>
                      <div className="relative">
                        <input 
                          type="password"
                          value={supabaseKey}
                          onChange={(e) => setSupabaseKey(e.target.value)}
                          placeholder="Enter Supabase Anon Key..."
                          className="nexus-input w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-magenta/50 transition-all"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      </div>
                    </div>

                    <button 
                      onClick={saveApiKeys}
                      className="w-full py-4 bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-neon-magenta/20 transition-all shadow-[0_0_20px_rgba(255,0,255,0.1)]"
                    >
                      Commit to Vault
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Settings_Module // Secure_Access_Only</span>
        <span>Checksum: 0x8F2E4A1B</span>
      </div>
    </div>
  );
};

