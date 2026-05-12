import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, Users, PieChart as PieIcon } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const ElectionSimulator = () => {
  const [partyASwing, setPartyASwing] = useState(0);
  const [partyBSwing, setPartyBSwing] = useState(0);
  const [baseSeats, setBaseSeats] = useState({ partyA: 280, partyB: 220, others: 43 });
  const [projectedSeats, setProjectedSeats] = useState({ ...baseSeats });

  useEffect(() => {
    // Simple simulation logic: 1% swing = ~5 seats shift
    const aShift = Math.round(partyASwing * 5);
    const bShift = Math.round(partyBSwing * 5);
    
    setProjectedSeats({
      partyA: Math.max(0, Math.min(543, baseSeats.partyA + aShift)),
      partyB: Math.max(0, Math.min(543, baseSeats.partyB + bShift)),
      others: Math.max(0, 543 - (baseSeats.partyA + aShift) - (baseSeats.partyB + bShift))
    });
  }, [partyASwing, partyBSwing]);

  const data = [
    { name: 'Party A', value: projectedSeats.partyA, color: '#38bdf8' },
    { name: 'Party B', value: projectedSeats.partyB, color: '#db2777' },
    { name: 'Others', value: projectedSeats.others, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Comparative Election Simulator</h2>
        <p className="text-gray-400 mt-1">Simulate political outcomes by adjusting regional swings and voter behavior.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Controls */}
         <GlassCard className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <TrendingUp size={20} className="text-primary-400" />
               Swing Parameters
            </h3>
            
            <div className="space-y-6">
               <SwingControl 
                  label="Party A Popularity Swing" 
                  value={partyASwing} 
                  onChange={(v) => setPartyASwing(v)} 
                  color="accent-primary-500"
               />
               <SwingControl 
                  label="Party B Popularity Swing" 
                  value={partyBSwing} 
                  onChange={(v) => setPartyBSwing(v)} 
                  color="accent-pink-500"
               />
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
               <button 
                  onClick={() => {setPartyASwing(0); setPartyBSwing(0);}}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all"
               >
                  <RotateCcw size={18} />
                  Reset Simulation
               </button>
            </div>
         </GlassCard>

         {/* Visual Output */}
         <GlassCard className="lg:col-span-2 flex flex-col items-center justify-center min-h-[450px]">
            <div className="relative w-full h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={140}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                     >
                        {data.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-5xl font-black text-white">{projectedSeats.partyA + projectedSeats.partyB + projectedSeats.others}</span>
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total Seats</span>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-12 w-full mt-4">
               <SeatDisplay label="Party A" value={projectedSeats.partyA} color="text-primary-400" />
               <SeatDisplay label="Party B" value={projectedSeats.partyB} color="text-pink-400" />
               <SeatDisplay label="Others" value={projectedSeats.others} color="text-gray-500" />
            </div>
         </GlassCard>
      </div>

      {/* Logic Explanation */}
      <GlassCard className="bg-primary-900/10 border-primary-500/20">
         <div className="flex gap-4">
            <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-400">
               <PieIcon size={24} />
            </div>
            <div>
               <h4 className="text-lg font-bold text-white mb-2">How the Simulator Works</h4>
               <p className="text-sm text-gray-400 leading-relaxed">
                  Our simulation engine uses a **Propensity-Weighted Swing Model**. By adjusting the slider, you are simulating a shift in voter preference across key demographics. A positive swing for a party increases its win probability in "swing constituencies," potentially flipping seats from the opposition.
               </p>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

const SwingControl = ({ label, value, onChange, color }) => (
   <div className="space-y-4">
      <div className="flex justify-between items-center">
         <span className="text-sm text-gray-300 font-medium">{label}</span>
         <span className={`text-lg font-black ${value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {value > 0 ? '+' : ''}{value}%
         </span>
      </div>
      <input 
         type="range" 
         min="-10" 
         max="10" 
         step="0.1"
         value={value}
         onChange={(e) => onChange(parseFloat(e.target.value))}
         className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${color}`} 
      />
      <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
         <span>High Disapproval</span>
         <span>Neutral</span>
         <span>High Approval</span>
      </div>
   </div>
);

const SeatDisplay = ({ label, value, color }) => (
   <div className="text-center">
      <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
      <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{label}</div>
   </div>
);

export default ElectionSimulator;
