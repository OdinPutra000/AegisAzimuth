import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, Vote, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';

const data = [
  { name: '2014', partyA: 280, partyB: 200, turnout: 66 },
  { name: '2019', partyA: 303, partyB: 240, turnout: 67 },
  { name: '2024 (Est)', partyA: 315, partyB: 260, turnout: 69 },
];

const partyData = [
  { name: 'Party A', value: 315, color: '#38bdf8' },
  { name: 'Party B', value: 260, color: '#db2777' },
  { name: 'Others', value: 85, color: '#94a3b8' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Voters" value="968M" icon={<Users size={24}/>} trend="up" trendValue="4.2" color="blue" />
        <StatCard title="Voter Turnout" value="67.4%" icon={<Vote size={24}/>} trend="up" trendValue="1.5" color="pink" />
        <StatCard title="Constituencies" value="543" icon={<MapPin size={24}/>} color="amber" />
        <StatCard title="Swing Factor" value="8.4%" icon={<TrendingUp size={24}/>} trend="up" trendValue="2.1" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <h3 className="text-xl font-semibold mb-6">Historical Performance & Projections</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db2777" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="partyA" stroke="#38bdf8" fillOpacity={1} fill="url(#colorA)" />
                <Area type="monotone" dataKey="partyB" stroke="#db2777" fillOpacity={1} fill="url(#colorB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Seat Share */}
        <GlassCard>
          <h3 className="text-xl font-semibold mb-6">Current Seat Projection</h3>
          <div className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={partyData}
                   innerRadius={80}
                   outerRadius={100}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {partyData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold">660</span>
                <span className="text-gray-400 text-xs">Total Seats</span>
             </div>
          </div>
          <div className="space-y-3 mt-4">
            {partyData.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                  <span className="text-sm text-gray-300">{p.name}</span>
                </div>
                <span className="text-sm font-bold">{p.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* AI Summary Section */}
      <GlassCard className="bg-gradient-to-br from-primary-900/20 to-transparent border-primary-500/20">
         <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-400">
               <TrendingUp size={24} />
            </div>
            <div className="space-y-2">
               <h3 className="text-lg font-bold text-white">AI-Generated Insights</h3>
               <p className="text-gray-300 leading-relaxed">
                  Based on current data trends, <span className="text-primary-400 font-medium">Party A</span> is projected to gain a significant lead in urban clusters, while <span className="text-accent font-medium">Party B</span> is showing resilience in rural demographics. Voter turnout is expected to hit a record <span className="text-white font-bold">69.2%</span>, potentially favoring a change in the current political landscape.
               </p>
               <div className="flex gap-4 mt-4">
                  <button className="text-xs font-bold text-primary-400 uppercase tracking-widest hover:text-white transition-colors">Generate Full Report</button>
                  <button className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Download PDF</button>
               </div>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
