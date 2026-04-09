import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Shield, Cpu, Globe, Bell, Lock, Eye, Zap, Github, Terminal, Moon, Sun, Monitor } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SettingsTab = 'General' | 'Nexus Vault' | 'GitHub Sync' | 'Notifications';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General');
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');
  const [persona, setPersona] = useState('Commander');
  const [githubSync, setGithubSync] = useState(true);

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
                <h1 className="text-3xl font-bold font-mono tracking-tighter uppercase">Settings</h1>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">Manage your Nexus Command configuration</p>
              </div>
            </div>

            {activeTab === 'General' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-lg font-bold font-mono uppercase tracking-tight mb-6">General Settings</h2>
                  
                  <div className="glass-panel p-8 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-neon-cyan/10 text-neon-cyan rounded-lg">
                        <Monitor size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Appearance</h3>
                        <p className="text-xs text-white/40 font-mono">Choose your preferred theme</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'auto', label: 'Auto', icon: Monitor, disabled: true },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => !t.disabled && setTheme(t.id as any)}
                          className={cn(
                            "flex flex-col items-center gap-4 p-6 rounded-xl border transition-all relative",
                            theme === t.id 
                              ? "bg-neon-cyan/5 border-neon-cyan/50 text-neon-cyan" 
                              : "bg-white/5 border-white/10 text-white/40 hover:border-white/20",
                            t.disabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <t.icon size={32} />
                          <span className="text-xs font-bold uppercase tracking-widest">{t.label}</span>
                          {theme === t.id && (
                            <span className="absolute bottom-2 text-[8px] font-mono uppercase tracking-widest">Active</span>
                          )}
                          {t.disabled && (
                            <span className="absolute bottom-2 text-[8px] font-mono uppercase tracking-widest">Coming soon</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Default Persona</label>
                    <select 
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all appearance-none"
                    >
                      <option value="Commander">Commander</option>
                      <option value="Guru">Guru</option>
                      <option value="Artist">Artist</option>
                      <option value="Verifier">Verifier</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-6 glass-panel rounded-xl border border-white/5 bg-white/[0.02]">
                    <div>
                      <h3 className="font-bold text-white">Auto-sync with GitHub</h3>
                      <p className="text-xs text-white/40 font-mono">Automatically sync changes to your linked repository</p>
                    </div>
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

const UserIcon = ({ size }: { size: number }) => <SettingsIcon size={size} />;
const DatabaseIcon = ({ size }: { size: number }) => <Shield size={size} />;
