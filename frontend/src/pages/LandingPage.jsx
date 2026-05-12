import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, BarChart3, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-4xl"
      >
        <span className="px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-bold uppercase tracking-widest">
           The Future of Election Monitoring
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
           Analyze the <span className="bg-gradient-to-r from-primary-400 to-accent text-transparent bg-clip-text">Pulse</span> of Democracy
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
           Real-time data aggregation, AI-driven predictive insights, and transparent election monitoring powered by cutting-edge analytics.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
           <Link to="/dashboard" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/30 transition-all flex items-center gap-2 group">
              Explore Dashboard
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
           </Link>
           <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-lg font-bold transition-all">
              Watch Demo
           </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-32 w-full max-w-6xl">
         <FeatureCard 
            icon={<Shield className="text-primary-400" />} 
            title="Secure & Transparent" 
            desc="Blockchain-backed data integrity and audit logs for every vote."
         />
         <FeatureCard 
            icon={<Zap className="text-amber-400" />} 
            title="AI Insights" 
            desc="Natural language summaries that explain complex political shifts."
         />
         <FeatureCard 
            icon={<BarChart3 className="text-accent" />} 
            title="Live Analytics" 
            desc="Real-time visualization of voter turnout and swing patterns."
         />
         <FeatureCard 
            icon={<Globe className="text-blue-400" />} 
            title="Global Scale" 
            desc="Designed to monitor elections at national and regional levels."
         />
      </div>

      {/* Stats Preview */}
      <motion.div 
         initial={{ opacity: 0, y: 40 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="mt-32 w-full max-w-6xl glass-dark border border-white/5 rounded-[40px] p-12 relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[100px] -z-10"></div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
               <div className="text-5xl font-black text-white mb-2">968M+</div>
               <div className="text-gray-500 uppercase tracking-widest text-sm font-bold">Voters Monitored</div>
            </div>
            <div>
               <div className="text-5xl font-black text-white mb-2">543</div>
               <div className="text-gray-500 uppercase tracking-widest text-sm font-bold">Constituencies</div>
            </div>
            <div>
               <div className="text-5xl font-black text-white mb-2">99.9%</div>
               <div className="text-gray-500 uppercase tracking-widest text-sm font-bold">Data Accuracy</div>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 space-y-4">
     <div className="p-4 bg-white/5 rounded-[24px] mb-2">{icon}</div>
     <h3 className="text-xl font-bold text-white">{title}</h3>
     <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
