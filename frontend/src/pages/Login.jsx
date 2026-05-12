import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    console.log('Login attempt:', email);
    localStorage.setItem('token', 'mock_token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto text-primary-400 mb-4">
               <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-wider">Access Panel</h2>
            <p className="text-gray-400 text-sm font-medium">Election AI Monitoring System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-500/50 transition-all text-white"
                  placeholder="admin@election.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-500/50 transition-all text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/register" className="text-primary-400 font-bold hover:underline">Request Access</Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;
