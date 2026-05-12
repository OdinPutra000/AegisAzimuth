import React, { useState } from 'react';
import { FileText, Download, Check, Loader2, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const ReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(['Summary', 'Regional']);

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setReportReady(false);
    
    // Simulate complex AI report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white">Advanced AI Report Generator</h2>
        <p className="text-gray-400">Select parameters to generate a comprehensive election analysis report in PDF/XLS format.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <GlassCard className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <Sparkles size={20} className="text-amber-400" />
               Report Configuration
            </h3>
            
            <div className="space-y-4">
               <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">Inclusion Modules</label>
               <div className="grid grid-cols-2 gap-3">
                  {['Summary', 'Regional', 'Sentiment', 'Demographic', 'Swing Analysis', 'Predictions'].map(type => (
                    <button 
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                        selectedTypes.includes(type) 
                        ? 'bg-primary-500/10 border-primary-500/50 text-white' 
                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                      }`}
                    >
                       {type}
                       {selectedTypes.includes(type) && <Check size={14} className="text-primary-400" />}
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4 pt-4">
               <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">Output Format</label>
               <div className="flex gap-4">
                  <button className="flex-1 p-4 bg-white/5 border border-primary-500/50 rounded-2xl flex flex-col items-center gap-2">
                     <FileText size={24} className="text-primary-400" />
                     <span className="text-xs font-bold text-white">PDF (Standard)</span>
                  </button>
                  <button className="flex-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                     <Download size={24} className="text-gray-500" />
                     <span className="text-xs font-bold text-gray-500">Excel (Raw)</span>
                  </button>
               </div>
            </div>
         </GlassCard>

         <div className="space-y-6 flex flex-col justify-center">
            <GlassCard className="bg-primary-600/5 border-primary-500/20 text-center p-12 relative overflow-hidden">
               <AnimatePresence mode="wait">
                  {!isGenerating && !reportReady && (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                       <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto text-primary-400">
                          <FileText size={40} />
                       </div>
                       <h4 className="text-lg font-bold text-white">Ready to Generate</h4>
                       <p className="text-sm text-gray-500">Your report will include {selectedTypes.length} modules based on the latest verified data.</p>
                       <button 
                        onClick={handleGenerate}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/30 transition-all"
                       >
                          Generate AI Report
                       </button>
                    </motion.div>
                  )}

                  {isGenerating && (
                    <motion.div 
                      key="generating"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="space-y-6 py-10"
                    >
                       <Loader2 size={64} className="text-primary-500 animate-spin mx-auto" />
                       <div>
                          <h4 className="text-lg font-bold text-white">AI Engine Working</h4>
                          <p className="text-sm text-gray-500 mt-2">Cross-referencing 543 constituencies and public sentiment indices...</p>
                       </div>
                       <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3 }}
                            className="h-full bg-primary-500"
                          ></motion.div>
                       </div>
                    </motion.div>
                  )}

                  {reportReady && (
                    <motion.div 
                      key="ready"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                       <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400">
                          <Check size={48} strokeWidth={3} />
                       </div>
                       <h4 className="text-lg font-bold text-white">Report Generated!</h4>
                       <p className="text-sm text-gray-500">Your custom election analysis report is ready for download.</p>
                       <div className="flex gap-4">
                          <button 
                            className="flex-1 py-4 bg-primary-600 hover:bg-primary-500 rounded-2xl text-lg font-bold shadow-xl shadow-primary-600/30 transition-all flex items-center justify-center gap-2"
                          >
                             <Download size={20} />
                             Download PDF
                          </button>
                          <button 
                            onClick={() => setReportReady(false)}
                            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10"
                          >
                             <RotateCcw size={24} className="text-gray-400" />
                          </button>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </GlassCard>

            <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-amber-500/80">
               <AlertCircle size={20} className="shrink-0" />
               <p className="text-xs leading-relaxed">Note: Generated reports are based on snapshots. For live updates, please refer to the Real-Time Monitoring Center.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
