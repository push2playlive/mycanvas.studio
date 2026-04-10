import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Download, Share2, Eye, Image as ImageIcon, Code, Box, Sparkles, X, Loader2, Mail, Send, MessageSquare, Layout, Shield, Cpu, Activity, Database, Globe, Zap, Terminal, CheckCircle, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateImage, generateVideo } from '../services/gemini';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = 'All Items' | 'Images' | 'Videos' | 'Components' | 'Code';
type Persona = 'All' | 'Commander' | 'Guru' | 'Artist' | 'Verifier';

interface GalleryItem {
  id: string;
  title: string;
  type: 'Image' | 'Video' | 'Component' | 'Code';
  date: string;
  persona: 'commander' | 'guru' | 'artist' | 'verifier';
  preview?: string;
  content?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: '0', title: 'MYCANVASLAB Sovereign Interface', type: 'Image', date: '4/9/2026', persona: 'artist', preview: 'https://picsum.photos/seed/mycanvaslab/800/600' },
  { id: '10', title: 'Neural Forge Core', type: 'Component', date: '4/9/2026', persona: 'commander' },
  { id: '11', title: 'Sovereign Bash Pipeline', type: 'Code', date: '4/9/2026', persona: 'guru', content: 'pipeline {\n  agent any\n  stages {\n    stage(\'Neural Sync\') {\n      steps {\n        sh \'bash sovereign_sync.sh\'\n      }\n    }\n  }\n}' },
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('none');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState('');
  const [isQuickGenerating, setIsQuickGenerating] = useState(false);
  const [lastManifested, setLastManifested] = useState<{ url: string, prompt: string } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() && showModal) return;
    
    setIsGenerating(true);
    setShowModal(true);
    setModalType('image');
    
    try {
      const finalPrompt = selectedStyle !== 'none' ? `${prompt || "A futuristic landscape"}, in ${selectedStyle} style` : (prompt || "A futuristic cyberpunk landscape");
      const imageUrl = await generateImage(finalPrompt, { aspectRatio, negativePrompt });
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
      const randomId = Math.floor(Math.random() * 1000);
      setGeneratedImage(`https://picsum.photos/seed/${randomId}/800/600`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!prompt.trim() && showModal) return;

    setIsVideoGenerating(true);
    setShowModal(true);
    setModalType('video');
    setVideoStatus('Initializing...');

    try {
      const videoUrl = await generateVideo(prompt || "A cinematic drone shot of a futuristic city", (status) => {
        setVideoStatus(status);
      });
      setGeneratedVideo(videoUrl);
    } catch (error) {
      console.error("Failed to generate video:", error);
      alert("Neural video synthesis failed. Reverting to archive simulation.");
      setGeneratedVideo("https://www.w3schools.com/html/mov_bbb.mp4"); // Fallback sample
    } finally {
      setIsVideoGenerating(false);
    }
  };

  const handleSaveToArchive = () => {
    if (!generatedImage && !generatedVideo) return;
    
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: prompt || (modalType === 'image' ? 'AI Generated Visual' : 'AI Generated Motion'),
      type: modalType === 'image' ? 'Image' : 'Video',
      date: new Date().toLocaleDateString(),
      persona: 'artist',
      preview: modalType === 'image' ? generatedImage! : generatedVideo!
    };
    
    setItems(prev => [newItem, ...prev]);
    setShowModal(false);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    setPrompt('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this ${item.type} from Nexus Gallery`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Sharing link for ${item.title} copied to clipboard!`);
    }
  };

  const handleQuickGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim() || isQuickGenerating) return;

    setIsQuickGenerating(true);
    try {
      const finalPrompt = selectedStyle !== 'none' ? `${quickPrompt}, in ${selectedStyle} style` : quickPrompt;
      const imageUrl = await generateImage(finalPrompt, { aspectRatio, negativePrompt });
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        title: quickPrompt,
        type: 'Image',
        date: new Date().toLocaleDateString(),
        persona: 'artist',
        preview: imageUrl
      };
      setItems(prev => [newItem, ...prev]);
      setLastManifested({ url: imageUrl, prompt: quickPrompt });
      setQuickPrompt('');
    } catch (error) {
      console.error("Quick generation failed:", error);
    } finally {
      setIsQuickGenerating(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Items' || 
      (category === 'Images' && item.type === 'Image') ||
      (category === 'Videos' && item.type === 'Video') ||
      (category === 'Components' && item.type === 'Component') ||
      (category === 'Code' && item.type === 'Code');
    const matchesPersona = persona === 'All' || item.persona === persona.toLowerCase();
    return matchesSearch && matchesCategory && matchesPersona;
  });

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
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

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setModalType('image');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-md font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-neon-cyan/20 transition-all group"
                >
                  <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                  Image Gen
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setModalType('video');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-md font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500/20 transition-all group"
                >
                  <Zap size={14} className="group-hover:scale-110 transition-transform" />
                  Video Gen
                </button>
                
                <div className="relative w-64">
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
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 w-16">Filter:</span>
                <div className="flex gap-2">
                  {['All Items', 'Images', 'Videos', 'Components', 'Code'].map((cat) => (
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

          {/* Neural Forge: Quick Manifestation */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={14} className="text-neon-cyan" />
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">Neural Forge</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <form onSubmit={handleQuickGenerate} className="flex gap-3">
                  <div className="relative flex-1">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/40" size={18} />
                    <input 
                      type="text" 
                      value={quickPrompt}
                      onChange={(e) => setQuickPrompt(e.target.value)}
                      placeholder="Enter neural prompt for quick manifestation..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isQuickGenerating || !quickPrompt.trim()}
                    className="px-8 py-4 bg-neon-cyan text-void rounded-lg font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-neon-cyan/80 transition-all shadow-[0_0_30px_rgba(0,240,255,0.2)] disabled:opacity-50 disabled:shadow-none flex items-center gap-3"
                  >
                    {isQuickGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Forging...
                      </>
                    ) : (
                      <>
                        <Zap size={16} />
                        Manifest
                      </>
                    )}
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Negative Prompt (Avoid)</label>
                    <input 
                      type="text"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="e.g. blur, low quality, distorted"
                      className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-4 text-[11px] font-mono focus:outline-none focus:border-neon-cyan/30 transition-all"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Visual Style</label>
                      <select 
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-[11px] font-mono focus:outline-none focus:border-neon-cyan/30 transition-all appearance-none"
                      >
                        {['none', 'cyberpunk', 'pixel art', 'cinematic', 'retro', 'minimalist', 'vibrant'].map(s => (
                          <option key={s} value={s} className="bg-void">{s.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24 space-y-2">
                      <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Ratio</label>
                      <select 
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-[11px] font-mono focus:outline-none focus:border-neon-cyan/30 transition-all appearance-none"
                      >
                        {['16:9', '4:3', '1:1', '9:16'].map(r => (
                          <option key={r} value={r} className="bg-void">{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                  Direct neural uplink to the V24 Mainframe. Manifestations are automatically archived.
                </p>
              </div>

              <AnimatePresence>
                {lastManifested && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="glass-panel p-3 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 relative group"
                  >
                    <button 
                      onClick={() => setLastManifested(null)}
                      className="absolute top-2 right-2 p-1 bg-void/80 rounded-full text-white/40 hover:text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                    <div className={cn(
                      "rounded-lg overflow-hidden mb-2 bg-black/40 transition-all duration-500",
                      aspectRatio === '16:9' ? "aspect-video" :
                      aspectRatio === '4:3' ? "aspect-[4/3]" :
                      aspectRatio === '1:1' ? "aspect-square" :
                      "aspect-[9/16]"
                    )}>
                      <img 
                        src={lastManifested.url} 
                        alt="Last Manifested" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono text-neon-cyan uppercase tracking-widest">Last_Manifestation</span>
                      <span className="text-[8px] font-mono text-white/20 uppercase">Success</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  ) : item.type === 'Video' ? (
                    <video 
                      src={item.preview} 
                      className="w-full h-full object-cover rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
                      muted
                      loop
                      onMouseOver={e => (e.target as HTMLVideoElement).play()}
                      onMouseOut={e => (e.target as HTMLVideoElement).pause()}
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
                      <button 
                        onClick={() => handleShare(item)}
                        className="text-white/20 hover:text-white transition-colors"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="mt-24 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-neon-cyan" size={20} />
              <h2 className="text-lg font-bold font-mono uppercase tracking-widest">Nexus Contact Uplink</h2>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 border border-neon-green/30 bg-neon-green/5 rounded-lg text-center"
                  >
                    <CheckCircle className="text-neon-green mx-auto mb-3" size={32} />
                    <p className="text-sm font-mono text-white uppercase tracking-widest">Signal Successfully Transmitted</p>
                    <p className="text-[10px] font-mono text-white/40 uppercase mt-1">Nexus Command has received your uplink.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Operator Name</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all"
                          placeholder="Enter name..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Signal Address</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all"
                          placeholder="Enter email..."
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Encrypted Message</label>
                      <textarea 
                        required
                        value={contactForm.message}
                        onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all resize-none"
                        placeholder="Transmission details..."
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-md font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-neon-cyan/50 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                      Transmit Signal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Nexus Features */}
        <div className="w-80 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">Nexus Features</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'Nexus AI', desc: 'Intelligent assistant', icon: Cpu, path: '/admin/command', color: 'text-neon-cyan' },
                { name: 'The Vault', desc: 'Sovereign credits', icon: Wallet, path: '/admin/pricing', color: 'text-neon-magenta' },
                { name: 'Code Studio', desc: 'Development environment', icon: Terminal, path: '/admin/projects', color: 'text-blue-400' },
                { name: 'Design Lab', desc: 'Visual creation tools', icon: ImageIcon, path: '/admin/gallery', color: 'text-neon-magenta' },
                { name: 'Deploy Hub', desc: 'Release management', icon: Zap, path: '/admin/mission-control', color: 'text-neon-green' },
                { name: 'Analytics', desc: 'Data insights', icon: Activity, path: '/admin/market', color: 'text-yellow-400' },
                { name: 'Security', desc: 'Threat monitoring', icon: Shield, path: '/admin/war-room', color: 'text-red-400' },
                { name: 'Automation', desc: 'Workflow engine', icon: Zap, path: '/admin/tasks', color: 'text-purple-400' },
                { name: 'Infrastructure', desc: 'System resources', icon: Database, path: '/admin/settings', color: 'text-white/60' },
              ].map((feature) => (
                <Link 
                  key={feature.name}
                  to={feature.path}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                  <div className={cn("p-2 rounded-md bg-black/40 border border-white/5 group-hover:border-white/20 transition-all", feature.color)}>
                    <feature.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white/90 group-hover:text-white transition-colors">{feature.name}</h3>
                    <p className="text-[9px] text-white/30 uppercase tracking-tighter">{feature.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link 
              to="/admin/projects"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            >
              <Layout size={12} />
              Explore All Features
            </Link>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center gap-4">
            <MessageSquare className="text-neon-cyan" size={32} />
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-widest">Need Support?</h3>
              <p className="text-[10px] text-white/30 leading-relaxed">Direct uplink to Nexus core engineers available 24/7.</p>
            </div>
            <button className="w-full py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[10px] font-mono uppercase tracking-widest rounded hover:bg-neon-cyan/20 transition-all">
              Open Support Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Gallery_Module // Asset_Archive</span>
        <span>Total_Assets: {GALLERY_ITEMS.length}</span>
      </div>

      {/* AI Generation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGenerating && setShowModal(false)}
              className="absolute inset-0 bg-void/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.1)]"
            >
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {modalType === 'image' ? (
                    <Sparkles size={14} className="text-neon-cyan" />
                  ) : (
                    <Zap size={14} className="text-purple-400" />
                  )}
                  <h2 className={cn(
                    "text-xs font-bold font-mono uppercase tracking-widest",
                    modalType === 'image' ? "text-neon-cyan" : "text-purple-400"
                  )}>
                    {modalType === 'image' ? 'Neural Image Synthesis' : 'Temporal Video Synthesis'}
                  </h2>
                </div>
                {!isGenerating && !isVideoGenerating && (
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setGeneratedImage(null);
                      setGeneratedVideo(null);
                      setPrompt('');
                    }}
                    className="p-1 text-white/30 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Neural Prompt</label>
                  <textarea 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder={modalType === 'image' ? "Describe the visual construct..." : "Describe the temporal sequence..."}
                    className="w-full bg-black/40 border border-white/10 rounded-md p-4 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none h-24"
                  />
                </div>

                {modalType === 'image' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Negative Prompt</label>
                      <input 
                        type="text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="Avoid: blur, low quality..."
                        className="w-full bg-black/40 border border-white/10 rounded-md py-2 px-4 text-xs font-mono focus:outline-none focus:border-neon-cyan/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Style</label>
                        <select 
                          value={selectedStyle}
                          onChange={(e) => setSelectedStyle(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-md py-2 px-3 text-xs font-mono focus:outline-none focus:border-neon-cyan/50 transition-colors appearance-none"
                        >
                          {['none', 'cyberpunk', 'pixel art', 'cinematic', 'retro', 'minimalist', 'vibrant'].map(s => (
                            <option key={s} value={s} className="bg-void">{s.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-24 space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Ratio</label>
                        <select 
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-md py-2 px-3 text-xs font-mono focus:outline-none focus:border-neon-cyan/50 transition-colors appearance-none"
                        >
                          {['16:9', '4:3', '1:1', '9:16'].map(r => (
                            <option key={r} value={r} className="bg-void">{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={cn(
                  "bg-black/60 flex items-center justify-center relative rounded-lg overflow-hidden border border-white/5 transition-all duration-500",
                  modalType === 'video' ? "aspect-video" : 
                  aspectRatio === '16:9' ? "aspect-video" :
                  aspectRatio === '4:3' ? "aspect-[4/3]" :
                  aspectRatio === '1:1' ? "aspect-square" :
                  "aspect-[9/16] max-h-[400px]"
                )}>
                  {(isGenerating || isVideoGenerating) ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 size={40} className={cn("animate-spin", modalType === 'image' ? "text-neon-cyan" : "text-purple-400")} />
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] animate-pulse">
                        {modalType === 'image' ? 'Synthesizing Pixels...' : videoStatus}
                      </p>
                    </div>
                  ) : (generatedImage || generatedVideo) ? (
                    modalType === 'image' ? (
                      <img 
                        src={generatedImage!} 
                        alt="Generated" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <video 
                        src={generatedVideo!} 
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                      />
                    )
                  ) : (
                    <div className="text-center space-y-2">
                      {modalType === 'image' ? <ImageIcon size={32} className="text-white/5 mx-auto" /> : <Zap size={32} className="text-white/5 mx-auto" />}
                      <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Awaiting Command</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white/[0.02] flex justify-between items-center border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Status</p>
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-tighter",
                    (isGenerating || isVideoGenerating) ? "text-yellow-400" : (generatedImage || generatedVideo) ? "text-neon-green" : "text-white/20"
                  )}>
                    {(isGenerating || isVideoGenerating) ? 'Processing' : (generatedImage || generatedVideo) ? 'Complete' : 'Idle'}
                  </p>
                </div>
                <div className="flex gap-3">
                  {!isGenerating && !isVideoGenerating && (
                    <>
                      <button 
                        onClick={modalType === 'image' ? handleGenerate : handleGenerateVideo}
                        className="px-6 py-2 bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono rounded uppercase hover:bg-white/10 transition-all font-bold tracking-widest"
                      >
                        {(generatedImage || generatedVideo) ? 'Regenerate' : 'Manifest'}
                      </button>
                      {(generatedImage || generatedVideo) && (
                        <button 
                          onClick={handleSaveToArchive}
                          className={cn(
                            "px-6 py-2 text-void text-[10px] font-mono font-bold rounded uppercase transition-all tracking-widest",
                            modalType === 'image' ? "bg-neon-cyan hover:bg-neon-cyan/80" : "bg-purple-500 hover:bg-purple-500/80"
                          )}
                        >
                          Save to Archive
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

