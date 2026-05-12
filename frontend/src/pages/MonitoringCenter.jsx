import React from 'react';
import { AlertCircle, CheckCircle, Clock, ShieldAlert, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const alerts = [
  { id: 1, type: 'critical', message: 'Suspicious voting pattern detected in Zone 4', time: '2 mins ago', status: 'investigating' },
  { id: 2, type: 'warning', message: 'Turnout delay reported in Northern Constituency', time: '15 mins ago', status: 'resolved' },
  { id: 3, type: 'info', message: 'New dataset uploaded for Central Region', time: '1 hour ago', status: 'pending' },
  { id: 4, type: 'critical', message: 'Potential data anomaly in candidate assets verification', time: '3 hours ago', status: 'flagged' },
];

const MonitoringCenter = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Election Monitoring Center</h2>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Search incidents..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-primary-500/50 transition-all" />
           </div>
           <button className="bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-500/30 transition-all">
              <ShieldAlert size={18} />
              Report Incident
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 space-y-4">
            {alerts.map((alert, i) => (
              <GlassCard key={alert.id} delay={i * 0.1} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    alert.type === 'critical' ? 'bg-red-500/10 text-red-500' : 
                    alert.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {alert.type === 'critical' ? <ShieldAlert size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{alert.message}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Clock size={12} />
                      <span>{alert.time}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="capitalize">{alert.status}</span>
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">Details</button>
              </GlassCard>
            ))}
         </div>

         <div className="space-y-6">
            <GlassCard>
               <h3 className="text-lg font-bold mb-4">System Health</h3>
               <div className="space-y-4">
                  <HealthItem label="API Connectivity" status="online" />
                  <HealthItem label="Blockchain Node" status="online" />
                  <HealthItem label="AI Processor" status="busy" />
                  <HealthItem label="DB Sync" status="online" />
               </div>
            </GlassCard>

            <GlassCard className="bg-primary-600/10 border-primary-500/20">
               <div className="flex items-center gap-3 text-primary-400 mb-3">
                  <CheckCircle size={20} />
                  <h3 className="font-bold">Transparency Score</h3>
               </div>
               <div className="text-4xl font-black text-white">98.4<span className="text-xl font-normal text-gray-500">/100</span></div>
               <p className="text-xs text-gray-400 mt-2">Verified by decentralized consensus protocol.</p>
            </GlassCard>
         </div>
      </div>
    </div>
  );
};

const HealthItem = ({ label, status }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></div>
      <span className="capitalize text-gray-300">{status}</span>
    </div>
  </div>
);

export default MonitoringCenter;
