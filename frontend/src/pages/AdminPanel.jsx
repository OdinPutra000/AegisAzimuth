import React, { useState } from 'react';
import { Users, FileUp, Settings, Shield, Trash2, CheckCircle, XCircle, Database, Activity } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const initialUsers = [
  { id: 1, name: 'Admin One', email: 'admin@election.ai', role: 'admin', status: 'active' },
  { id: 2, name: 'Analyst John', email: 'john@research.ai', role: 'analyst', status: 'active' },
  { id: 3, name: 'Researcher Sarah', email: 'sarah@data.org', role: 'analyst', status: 'pending' },
];

const datasets = [
  { id: 1, name: '2024_Exit_Poll_v1.csv', uploadedBy: 'Analyst John', size: '2.4 MB', date: '2026-05-10', status: 'approved' },
  { id: 2, name: 'Zone_4_Raw_Votes.json', uploadedBy: 'Researcher Sarah', size: '15.8 MB', date: '2026-05-12', status: 'pending' },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Administrative Control</h2>
          <p className="text-gray-400 mt-1">Manage users, datasets, and system configurations.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={16}/>} label="Users" />
          <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={<Database size={16}/>} label="Datasets" />
          <TabButton active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<Activity size={16}/>} label="System" />
        </div>
      </div>

      {activeTab === 'users' && (
        <GlassCard className="p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="p-6">Name</th>
                <th className="p-6">Email</th>
                <th className="p-6">Role</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialUsers.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-xs">{user.name[0]}</div>
                    <span className="text-white font-medium">{user.name}</span>
                  </td>
                  <td className="p-6 text-gray-400 text-sm">{user.email}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      user.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-primary-500/20 text-primary-400'
                    }`}>{user.role}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                       <span className="text-sm text-gray-300 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      {activeTab === 'data' && (
        <div className="space-y-6">
           <GlassCard className="bg-primary-600/5 border-dashed border-primary-500/30 flex flex-col items-center justify-center p-12 gap-4">
              <div className="p-4 bg-primary-500/10 rounded-full text-primary-400">
                 <FileUp size={40} />
              </div>
              <div className="text-center">
                 <h4 className="text-xl font-bold text-white">Upload New Dataset</h4>
                 <p className="text-gray-500 text-sm mt-1">Supports CSV, JSON, and XLS formats up to 50MB.</p>
              </div>
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-2xl text-sm font-bold shadow-lg shadow-primary-600/20 transition-all">Select File</button>
           </GlassCard>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datasets.map(d => (
                <GlassCard key={d.id} className="flex flex-col gap-4">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white/5 rounded-xl text-gray-400"><Database size={20}/></div>
                         <div>
                            <h4 className="text-white font-bold">{d.name}</h4>
                            <p className="text-xs text-gray-500">{d.size} • {d.date}</p>
                         </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                        d.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>{d.status}</span>
                   </div>
                   <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-gray-500">By {d.uploadedBy}</span>
                      <div className="flex gap-2">
                         <button className="p-2 hover:bg-white/5 rounded-lg text-green-400"><CheckCircle size={18}/></button>
                         <button className="p-2 hover:bg-white/5 rounded-lg text-red-400"><XCircle size={18}/></button>
                      </div>
                   </div>
                </GlassCard>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'system' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-2"><Shield size={20} className="text-primary-400"/> Security Settings</h3>
               <div className="space-y-4">
                  <ConfigToggle label="Enable Two-Factor Auth" active={true} />
                  <ConfigToggle label="Strict RBAC Enforcement" active={true} />
                  <ConfigToggle label="Log API Invocations" active={false} />
                  <ConfigToggle label="Encrypted PDF Export" active={true} />
               </div>
            </GlassCard>

            <GlassCard className="space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-2"><Settings size={20} className="text-accent"/> AI Module Configuration</h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">OpenAI Model</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 focus:outline-none focus:border-primary-500/50 transition-all text-white">
                        <option>GPT-4 Turbo (Current)</option>
                        <option>GPT-3.5 Turbo</option>
                        <option>Claude 3 Opus</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">Sentiment Analysis Depth</label>
                     <input type="range" className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary-500" />
                  </div>
               </div>
            </GlassCard>
         </div>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
      active ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-gray-500 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </button>
);

const ConfigToggle = ({ label, active }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-300 text-sm">{label}</span>
    <button className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-primary-500' : 'bg-white/10'}`}>
       <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </button>
  </div>
);

export default AdminPanel;
