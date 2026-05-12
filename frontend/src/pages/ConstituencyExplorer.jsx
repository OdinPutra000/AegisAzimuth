import React, { useState } from 'react';
import { Search, MapPin, Users, TrendingUp, Info, User } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const constituencies = [
  { id: 1, name: 'Mumbai North', state: 'Maharashtra', turnout: '64.5%', winner: 'Party A', margin: '125,000' },
  { id: 2, name: 'Bangalore South', state: 'Karnataka', turnout: '71.2%', winner: 'Party B', margin: '45,000' },
  { id: 3, name: 'Delhi Central', state: 'Delhi', turnout: '68.9%', winner: 'Party A', margin: '82,000' },
  { id: 4, name: 'Kolkata West', state: 'West Bengal', turnout: '75.4%', winner: 'Party C', margin: '12,500' },
];

const ConstituencyExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = constituencies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Constituency Explorer</h2>
          <p className="text-gray-400 mt-1">Deep dive into regional demographics and candidate profiles.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or state..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-500/50 transition-all text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filtered.map((c) => (
            <button 
              key={c.id} 
              onClick={() => setSelected(c)}
              className={`w-full text-left p-5 rounded-2xl transition-all border ${
                selected?.id === c.id 
                ? 'bg-primary-500/10 border-primary-500/50' 
                : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white">{c.name}</h4>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{c.state}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className="text-green-400" />
                  {c.turnout}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {c.winner}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <GlassCard className="border-primary-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-primary-500/10 rounded-3xl text-primary-400">
                        <MapPin size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white">{selected.name}</h3>
                        <p className="text-gray-400 flex items-center gap-2">
                          {selected.state} Region • General Constituency
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Winner (2019)</div>
                      <div className="text-2xl font-black text-primary-400">{selected.winner}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                       <div className="text-gray-500 text-xs font-bold uppercase mb-2">Total Voters</div>
                       <div className="text-2xl font-bold text-white">1.2M</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                       <div className="text-gray-500 text-xs font-bold uppercase mb-2">Voter Turnout</div>
                       <div className="text-2xl font-bold text-green-400">{selected.turnout}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                       <div className="text-gray-500 text-xs font-bold uppercase mb-2">Victory Margin</div>
                       <div className="text-2xl font-bold text-white">{selected.margin}</div>
                    </div>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard>
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Users size={20} className="text-accent" />
                      Demographic Breakdown
                    </h4>
                    <div className="space-y-4">
                      <ProgressItem label="Urban" value={65} color="bg-primary-500" />
                      <ProgressItem label="Rural" value={35} color="bg-accent" />
                      <ProgressItem label="Literacy Rate" value={82} color="bg-green-500" />
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Info size={20} className="text-amber-400" />
                      Candidate Comparison
                    </h4>
                    <div className="space-y-3">
                       <CandidateItem name="Rahul Sharma" party="Party A" age={45} status="Leading" />
                       <CandidateItem name="Anjali Devi" party="Party B" age={52} status="Trailing" />
                       <CandidateItem name="Vikram Singh" party="Party C" age={38} status="Neutral" />
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border border-white/5">
                <MapPin size={64} className="text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-500">Select a constituency to view detailed analysis</h3>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProgressItem = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-bold">{value}%</span>
    </div>
    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full ${color}`}
      ></motion.div>
    </div>
  </div>
);

const CandidateItem = ({ name, party, age, status }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">
        {name[0]}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{name}</div>
        <div className="text-xs text-gray-500">{party} • Age: {age}</div>
      </div>
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
      status === 'Leading' ? 'bg-green-500/20 text-green-400' : 
      status === 'Trailing' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
    }`}>{status}</span>
  </div>
);

export default ConstituencyExplorer;
