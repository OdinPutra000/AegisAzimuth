import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { FileText, Download, Filter, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const swingData = [
  { region: 'North', swing: 4.5, turnout: 68 },
  { region: 'South', swing: -2.1, turnout: 72 },
  { region: 'East', swing: 8.2, turnout: 65 },
  { region: 'West', swing: 3.8, turnout: 70 },
  { region: 'Central', swing: 1.5, turnout: 66 },
];

const sentimentData = [
  { day: 'Mon', positive: 45, negative: 30, neutral: 25 },
  { day: 'Tue', positive: 50, negative: 25, neutral: 25 },
  { day: 'Wed', positive: 40, negative: 35, neutral: 25 },
  { day: 'Thu', positive: 60, negative: 20, neutral: 20 },
  { day: 'Fri', positive: 55, negative: 25, neutral: 20 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Deep Analytics & Reports</h2>
          <p className="text-gray-400 mt-1">Cross-referencing historical data with real-time sentiment.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
              <Filter size={18} />
              Filter Data
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-bold shadow-lg shadow-primary-600/20 transition-all">
              <Download size={18} />
              Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <GlassCard>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Zap className="text-amber-400" size={20} />
               Regional Swing Analysis
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={swingData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="region" stroke="#64748b" />
                     <YAxis stroke="#64748b" />
                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                     <Bar dataKey="swing" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         <GlassCard>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <FileText className="text-primary-400" size={20} />
               Public Sentiment Trend
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="day" stroke="#64748b" />
                     <YAxis stroke="#64748b" />
                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                     <Legend />
                     <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                     <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="border-accent/20">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Predictive Seat Forecasting</h3>
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">High Confidence</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ForecastItem party="Party A" seats="280-310" prob="85%" color="#38bdf8" />
            <ForecastItem party="Party B" seats="210-240" prob="72%" color="#db2777" />
            <ForecastItem party="Others" seats="40-60" prob="60%" color="#94a3b8" />
         </div>
      </GlassCard>
    </div>
  );
};

const ForecastItem = ({ party, seats, prob, color }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
     <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="text-sm font-medium text-gray-300">{party}</span>
     </div>
     <div className="text-2xl font-bold text-white mb-1">{seats}</div>
     <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Probability</span>
        <span className="text-xs font-bold text-green-400">{prob}</span>
     </div>
     <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: prob, backgroundColor: color }}></div>
     </div>
  </div>
);

export default AnalyticsPage;
