import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your Election Assistant. How can I help you analyze the data today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      const botMsg = { 
        role: 'bot', 
        text: getMockResponse(input) 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getMockResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('turnout')) return 'The current voter turnout is 67.4%, which is 1.5% higher than the 2019 elections.';
    if (q.includes('party a')) return 'Party A is showing a strong performance in urban regions, projected to win around 315 seats.';
    if (q.includes('swing')) return 'There is a significant swing of 8.4% towards neutral parties in southern constituencies.';
    return "That's an interesting question. My analysis shows that demographic shifts are playing a crucial role in this election cycle.";
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] h-[500px] glass-dark border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-primary-600/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-xl">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Election AI</h4>
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Online Analysis</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about election data..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:border-primary-500/50 transition-all text-white text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 rounded-xl text-white hover:bg-primary-400 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary-600 hover:bg-primary-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-primary-600/40 transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default AIChatbot;
