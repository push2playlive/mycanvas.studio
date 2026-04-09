import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Download, Share2, Eye, Image as ImageIcon, Code, Box } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = 'All Items' | 'Images' | 'Components' | 'Code';
type Persona = 'All' | 'Commander' | 'Guru' | 'Artist' | 'Verifier';

interface GalleryItem {
  id: string;
  title: string;
  type: 'Image' | 'Component' | 'Code';
  date: string;
  persona: 'commander' | 'guru' | 'artist' | 'verifier';
  preview?: string;
  content?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', title: 'Glassmorphism Card', type: 'Component', date: '4/8/2026', persona: 'artist' },
  { id: '2', title: 'Dashboard Layout', type: 'Image', date: '4/7/2026', persona: 'artist', preview: 'https://picsum.photos/seed/dash/800/600' },
  { id: '3', title: 'API Schema', type: 'Code', date: '4/6/2026', persona: 'guru', content: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  role: \'admin\' | \'user\';\n}' },
  { id: '4', title: 'Navigation Component', type: 'Component', date: '4/5/2026', persona: 'artist' },
  { id: '5', title: 'Auth Flow Diagram', type: 'Image', date: '4/4/2026', persona: 'guru', preview: 'https://picsum.photos/seed/auth/800/600' },
  { id: '6', title: 'Security Config', type: 'Code', date: '4/3/2026', persona: 'verifier', content: 'export const securityConfig = {\n  jwtExpiry: \'24h\',\n  refreshTokenExpiry: \'7d\',\n  maxLoginAttempts: 5,\n};' },
  { id: '7', title: 'War Room Interface', type: 'Image', date: '4/2/2026', persona: 'commander', preview: 'https://picsum.photos/seed/war/800/600' },
  { id: '8', title: 'Data Pipeline', type: 'Code', date: '4/1/2026', persona: 'guru', content: 'async function processData() {\n  const raw = await fetch(\'/api/data\');\n  const parsed = await raw.json();\n  return parsed.filter(d => d.valid);\n}' },
  { id: '9', title: 'Status Badge', type: 'Component', date: '3/31/2026', persona: 'artist' },
];

const PERSONA_COLORS = {
  commander: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  guru: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  artist: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/20',
  verifier: 'bg-neon-green/10 text-neon-green border-neon-green/20',
};

export const Gallery = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All Items');
  const [persona, setPersona] = useState<Persona>('All');

  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Items' || 
      (category === 'Images' && item.type === 'Image') ||
      (category === 'Components' && item.type === 'Component') ||
      (category === 'Code' && item.type === 'Code');
    const matchesPersona = persona === 'All' || item.persona === persona.toLowerCase();
    return matchesSearch && matchesCategory && matchesPersona;
  });

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="flex flex-col gap-8 mb-12">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-neon-cyan flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <ImageIcon size={14} className="text-void" />
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
                Visual <span className="text-neon-cyan">Gallery</span>
              </h1>
            </div>
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
              Archived Neural Assets & Rendered Constructs
            </p>
          </div>
          
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search gallery..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 w-16">Filter:</span>
            <div className="flex gap-2">
              {['All Items', 'Images', 'Components', 'Code'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as Category)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all",
                    category === cat 
                      ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 w-16">By Persona:</span>
            <div className="flex gap-2">
              {['All', 'Commander', 'Guru', 'Artist', 'Verifier'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPersona(p as Persona)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all",
                    persona === p 
                      ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-xl overflow-hidden border border-white/5 group hover:border-white/20 transition-all bg-white/[0.02]"
          >
            <div className="aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center p-4">
              {item.type === 'Image' ? (
                <img 
                  src={item.preview} 
                  alt={item.title} 
                  className="w-full h-full object-cover rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              ) : item.type === 'Code' ? (
                <div className="w-full h-full bg-void/50 rounded-md p-4 font-mono text-[10px] text-neon-cyan/70 overflow-hidden">
                  <pre className="whitespace-pre-wrap">{item.content}</pre>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan/30">
                  <Box size={32} />
                </div>
              )}
              
              <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-3 bg-neon-cyan text-void rounded-full hover:scale-110 transition-transform">
                  <Eye size={18} />
                </button>
                <button className="p-3 bg-white/10 text-white rounded-full hover:scale-110 transition-transform">
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-white/20 uppercase">{item.type}</span>
                  </div>
                </div>
                <span className={cn(
                  "text-[8px] font-mono uppercase px-2 py-0.5 rounded-full border",
                  PERSONA_COLORS[item.persona]
                )}>
                  {item.persona}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <span className="text-[9px] font-mono text-white/10 uppercase">{item.date}</span>
                <div className="flex gap-2">
                  <button className="text-white/20 hover:text-white transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Gallery_Module // Asset_Archive</span>
        <span>Total_Assets: {GALLERY_ITEMS.length}</span>
      </div>
    </div>
  );
};

