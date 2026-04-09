import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, UserPlus, LogIn, Shield, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, confirmPassword, isLogin });
    // In a real app, you'd call an auth service here
  };

  return (
    <div className="h-full flex items-center justify-center p-6 bg-void relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 bg-white/[0.02] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
            {isLogin ? <LogIn className="text-neon-cyan" size={32} /> : <UserPlus className="text-neon-cyan" size={32} />}
          </div>
          <h1 className="text-3xl font-bold font-mono tracking-tighter uppercase text-white">
            {isLogin ? 'System' : 'New'}{' '}
            <span className="text-neon-cyan">{isLogin ? 'Access' : 'Identity'}</span>
          </h1>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">
            {isLogin ? 'Enter credentials for neural uplink' : 'Register new architect signature'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                Uplink Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-neon-cyan transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commander@nexus.os"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all placeholder:text-white/10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                Access Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-neon-cyan transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all placeholder:text-white/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/20 hover:text-neon-cyan transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Register Only) */}
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                    Verify Key
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-neon-cyan transition-colors">
                      <Shield size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm font-mono focus:outline-none focus:border-neon-cyan/50 transition-all placeholder:text-white/10"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/20 hover:text-neon-cyan transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="w-full group relative py-4 bg-neon-cyan text-void font-mono font-bold uppercase tracking-[0.2em] text-xs rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLogin ? 'Initiate Uplink' : 'Create Identity'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button
            onClick={toggleAuthMode}
            className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-neon-cyan transition-colors"
          >
            {isLogin ? "Don't have an identity? [Register]" : "Already have an identity? [Login]"}
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-[8px] font-mono text-white/10 uppercase tracking-[0.4em] pointer-events-none">
        <span>Nexus_OS // Auth_Module // Secure_Access_Only</span>
        <span>Encryption: AES-256-GCM</span>
      </div>
    </div>
  );
};
