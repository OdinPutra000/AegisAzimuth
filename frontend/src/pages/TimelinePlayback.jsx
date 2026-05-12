import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Calendar, History } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = [
  { time: '08:00 AM', event: 'Voting begins across all 543 constituencies.', turnout: '4.2%', status: 'Normal' },
  { time: '10:00 AM', event: 'High turnout reported in southern regions.', turnout: '18.5%', status: 'Active' },
  { time: '12:00 PM', event: 'Minor technical glitch in Zone 4 reported and resolved.', turnout: '32.1%', status: 'Alert' },
  { time: '02:00 PM', event: 'Voter turnout crosses 45% milestone.', turnout: '48.9%', status: 'Active' },
  { time: '04:00 PM', event: 'Last hour surge expected in urban centers.', turnout: '59.4%', status: 'Normal' },
  { time: '06:00 PM', event: 'Voting ends. Exit polls beginning to emerge.', turnout: '67.4%', status: 'Completed' },
];

const TimelinePlayback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && currentIndex < timelineData.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, 2000);
    } else {
      setIsPlaying(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Election Day Playback</h2>
          <p className="text-gray-400 mt-1">Review the progression of events and turnout patterns chronologically.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
           <button onClick={() => setCurrentIndex(0)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400"><History size={20}/></button>
           <button onClick={() => setIsPlaying(!isPlaying)} className="px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              {isPlaying ? <Pause size={18}/> : <Play size={18}/>}
              {isPlaying ? 'Pause' : 'Play Timeline'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Main View */}
         <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
               <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="glass-dark border border-primary-500/20 rounded-[40px] p-12 relative overflow-hidden h-[400px] flex flex-col justify-center"
               >
                  <div className="absolute top-10 right-10 flex items-center gap-2 text-primary-400">
                     <Calendar size={24} />
                     <span className="text-3xl font-black">{timelineData[currentIndex].time}</span>
                  </div>
                  
                  <div className="space-y-6">
                     <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        timelineData[currentIndex].status === 'Alert' ? 'bg-red-500/20 text-red-400' : 'bg-primary-500/20 text-primary-400'
                     }`}>
                        {timelineData[currentIndex].status} Status
                     </span>
                     <h3 className="text-5xl font-bold text-white leading-tight">
                        {timelineData[currentIndex].event}
                     </h3>
                     <div className="flex items-center gap-12 pt-8">
                        <div>
                           <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Turnout</div>
                           <div className="text-4xl font-black text-white">{timelineData[currentIndex].turnout}</div>
                        </div>
                        <div className="flex-1 max-w-[200px]">
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                               <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: timelineData[currentIndex].turnout }}
                                  className="h-full bg-primary-500"
                               ></motion.div>
                            </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </AnimatePresence>

            {/* Slider */}
            <div className="px-4">
               <input 
                  type="range"
                  min="0"
                  max={timelineData.length - 1}
                  value={currentIndex}
                  onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-500"
               />
               <div className="flex justify-between mt-4">
                  {timelineData.map((d, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentIndex(i)}
                      className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        i === currentIndex ? 'text-primary-400' : 'text-gray-600'
                      }`}
                    >
                      {d.time}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Log */}
         <GlassCard className="h-[550px] flex flex-col p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 font-bold text-white flex items-center gap-2">
               <History size={18} className="text-primary-400" />
               Event Log
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
               {timelineData.map((d, i) => (
                 <div 
                   key={i} 
                   onClick={() => setCurrentIndex(i)}
                   className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    i === currentIndex ? 'bg-primary-500/10 border-primary-500/50' : 'bg-transparent border-transparent hover:bg-white/5'
                   }`}
                 >
                    <div className="text-[10px] font-black text-primary-400 mb-1">{d.time}</div>
                    <div className={`text-xs ${i === currentIndex ? 'text-white font-medium' : 'text-gray-500'}`}>{d.event}</div>
                 </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};

export default TimelinePlayback;
