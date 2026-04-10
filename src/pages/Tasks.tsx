import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Plus, Trash2, Calendar, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string; // ISO string
  priority: 'low' | 'medium' | 'high';
}

export const Tasks = () => {
  console.log('Tasks component rendering...');
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('nexus-tasks');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e);
    }
    return [
      { id: '1', text: 'Initialize Neural Core', completed: true, dueDate: new Date().toISOString(), priority: 'high' },
      { id: '2', text: 'Sync with Tokyo Relay', completed: false, dueDate: new Date(Date.now() + 86400000).toISOString(), priority: 'medium' },
      { id: '3', text: 'Audit Firewall Logs', completed: false, dueDate: new Date(Date.now() + 172800000).toISOString(), priority: 'low' },
    ];
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    localStorage.setItem('nexus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      completed: false,
      dueDate: newDueDate || new Date().toISOString(),
      priority: newPriority,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    setNewDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const isOverdue = (isoString: string) => {
    return new Date(isoString) < new Date() && isoString !== '';
  };

  const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'active' && !task.completed) || 
        (filterStatus === 'completed' && task.completed);
      return matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const weightA = priorityWeight[a.priority];
        const weightB = priorityWeight[b.priority];
        return sortOrder === 'asc' ? weightA - weightB : weightB - weightA;
      }
    });

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto bg-void/95 selection:bg-neon-cyan selection:text-void border-2 border-neon-magenta/20">
      <div className="fixed top-20 right-4 z-[100] px-3 py-1 bg-neon-magenta text-void text-[10px] font-mono font-bold rounded shadow-[0_0_20px_rgba(255,0,255,0.5)]">
        TASKS_ACTIVE
      </div>
      <div className="text-white text-xs mb-4 opacity-50 font-mono">[ SYSTEM_DEBUG: TASKS_MODULE_LOADED ]</div>
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-neon-cyan flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <ListTodo size={14} className="text-void" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tighter uppercase">
              Neural <span className="text-neon-cyan">Tasks</span>
            </h1>
          </div>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em]">
            Operational Objectives & Temporal Deadlines
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Active Protocols</p>
          <p className="text-xl font-bold font-mono text-neon-cyan">{tasks.filter(t => !t.completed).length}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Add Task Form */}
        <form onSubmit={addTask} className="glass-panel p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Enter new objective..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-neon-cyan text-void text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-neon-cyan/80 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center gap-2"
            >
              <Plus size={16} /> Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Calendar size={14} className="text-white/40" />
              <input
                type="datetime-local"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="bg-transparent text-[10px] font-mono text-white/60 focus:outline-none [color-scheme:dark]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/20 uppercase">Priority:</span>
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setNewPriority(p)}
                  className={cn(
                    "px-3 py-1 rounded text-[8px] font-mono uppercase tracking-widest border transition-all",
                    newPriority === p 
                      ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan" 
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-6 items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="space-y-2">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest">Filter Priority</span>
              <div className="flex gap-2">
                {(['all', 'low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={cn(
                      "px-3 py-1 rounded text-[8px] font-mono uppercase tracking-widest border transition-all",
                      filterPriority === p 
                        ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan" 
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest">Filter Status</span>
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={cn(
                      "px-3 py-1 rounded text-[8px] font-mono uppercase tracking-widest border transition-all",
                      filterStatus === s 
                        ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan" 
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest">Sort By</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded px-3 py-1 text-[10px] font-mono text-white/60 focus:outline-none focus:border-neon-cyan/50"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/60 hover:text-white transition-all uppercase"
            >
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  "glass-panel p-4 rounded-xl border transition-all flex items-center gap-4 group",
                  task.completed ? "opacity-50 border-white/5 bg-white/[0.01]" : "border-white/10 bg-white/[0.03] hover:border-white/20"
                )}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "transition-colors",
                    task.completed ? "text-neon-green" : "text-white/20 hover:text-white"
                  )}
                >
                  {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-mono transition-all truncate",
                    task.completed ? "line-through text-white/20" : "text-white/80"
                  )}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className={cn(
                      "flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-widest",
                      isOverdue(task.dueDate) && !task.completed ? "text-neon-magenta" : "text-white/20"
                    )}>
                      <Clock size={10} />
                      {formatDateTime(task.dueDate)}
                      {isOverdue(task.dueDate) && !task.completed && (
                        <span className="flex items-center gap-1 ml-2">
                          <AlertCircle size={8} /> Overdue
                        </span>
                      )}
                    </div>
                    <div className={cn(
                      "w-1 h-1 rounded-full",
                      task.priority === 'high' ? "bg-neon-magenta shadow-[0_0_5px_rgba(255,0,255,0.5)]" :
                      task.priority === 'medium' ? "bg-neon-cyan shadow-[0_0_5px_rgba(0,240,255,0.5)]" :
                      "bg-neon-green shadow-[0_0_5px_rgba(10,255,0,0.5)]"
                    )} />
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-white/10 hover:text-neon-magenta transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/5 rounded-xl">
              <p className="text-xs font-mono text-white/20 uppercase tracking-[0.3em]">No active objectives detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
        <span>Nexus_OS // Task_Module // Temporal_Engine_v1</span>
        <span>Checksum: 0x4D2A9B1E</span>
      </div>
    </div>
  );
};
