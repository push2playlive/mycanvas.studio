import React from 'react';
import { motion } from 'motion/react';
import { FolderKanban, Plus, MoreVertical, ExternalLink, Github, Clock, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Projects = () => {
  const projects = [
    { name: 'Nexus Dashboard', status: 'In Progress', progress: 75, color: 'neon-cyan', tasks: 12 },
    { name: 'Neural API V2', status: 'Completed', progress: 100, color: 'neon-green', tasks: 45 },
    { name: 'Void Runner Game', status: 'On Hold', progress: 30, color: 'neon-magenta', tasks: 8 },
    { name: 'Cyber-Auth Module', status: 'Review', progress: 90, color: 'neon-cyan', tasks: 24 },
  ];

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void selection:bg-neon-cyan selection:text-void">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-neon-green flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(10,255,0,0.4)]">
              <FolderKanban size={14} className="text-void" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
              Project <span className="text-neon-green">Nexus</span>
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
            Active Development Streams & Neural Constructs
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-void text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-neon-cyan/80 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-lg border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", 
                  project.color === 'neon-cyan' ? "bg-neon-cyan/10 text-neon-cyan" :
                  project.color === 'neon-magenta' ? "bg-neon-magenta/10 text-neon-magenta" :
                  "bg-neon-green/10 text-neon-green"
                )}>
                  <FolderKanban size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase">
                    <Clock size={10} /> Updated 2h ago
                  </div>
                </div>
              </div>
              <button className="text-white/20 hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                <span className="text-white/40">Development Progress</span>
                <span className={cn(
                  project.color === 'neon-cyan' ? "text-neon-cyan" :
                  project.color === 'neon-magenta' ? "text-neon-magenta" :
                  "text-neon-green"
                )}>{project.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  className={cn("h-full", 
                    project.color === 'neon-cyan' ? "bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]" :
                    project.color === 'neon-magenta' ? "bg-neon-magenta shadow-[0_0_10px_rgba(255,0,255,0.5)]" :
                    "bg-neon-green shadow-[0_0_10px_rgba(10,255,0,0.5)]"
                  )}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="w-6 h-6 rounded-full border-2 border-void bg-white/10 flex items-center justify-center text-[8px] font-mono">
                      A{n}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-white/20 uppercase">{project.tasks} Tasks</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-all">
                  <Github size={14} />
                </button>
                <button className="p-2 bg-white/5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-all">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Project_Module // Dev_Stream_v4</span>
        <span>Active_Streams: 4</span>
      </div>
    </div>
  );
};
