import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, PieChart, Users, ShieldAlert, BarChart3, Settings, Menu, X, Shield, PlayCircle, Gauge, FileText, RotateCcw } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import MonitoringCenter from './pages/MonitoringCenter';
import ConstituencyExplorer from './pages/ConstituencyExplorer';
import AdminPanel from './pages/AdminPanel';
import ElectionSimulator from './pages/ElectionSimulator';
import TimelinePlayback from './pages/TimelinePlayback';
import ReportGenerator from './pages/ReportGenerator';
import Login from './pages/Login';
import AIChatbot from './components/AIChatbot';

// Temporary Mock Components for missing ones
const SettingsPage = () => <div className="p-10"><h2 className="text-3xl font-semibold">Settings</h2></div>;

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'Home';
  const breadcrumb = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="min-h-screen bg-transparent flex overflow-hidden">
      {/* Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '260px' : '80px' }}
        className="glass-dark border-r border-white/5 flex flex-col z-[60]"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent text-transparent bg-clip-text uppercase tracking-wider">ElectionAI</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
          <NavItem to="/analytics" icon={<BarChart3 size={20} />} label="Analytics" isOpen={isSidebarOpen} />
          <NavItem to="/constituencies" icon={<Users size={20} />} label="Explorer" isOpen={isSidebarOpen} />
          <NavItem to="/simulator" icon={<Gauge size={20} />} label="Simulator" isOpen={isSidebarOpen} />
          <NavItem to="/timeline" icon={<PlayCircle size={20} />} label="Timeline" isOpen={isSidebarOpen} />
          <NavItem to="/reports" icon={<FileText size={20} />} label="AI Reports" isOpen={isSidebarOpen} />
          <NavItem to="/monitoring" icon={<ShieldAlert size={20} />} label="Monitoring" isOpen={isSidebarOpen} />
          <NavItem to="/admin" icon={<Shield size={20} />} label="Admin Panel" isOpen={isSidebarOpen} />
        </nav>

        <div className="p-4 border-t border-white/5">
           <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 glass-dark border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="text-sm text-gray-400">Election AI / {breadcrumb}</div>
           <div className="flex items-center gap-4">
              <Link to="/login" className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary-600/20">Sign In</Link>
           </div>
        </header>
        <div className="p-8 pb-32">
          {children}
        </div>
        <AIChatbot />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, isOpen }) => (
  <Link to={to} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-all group">
    <div className="text-gray-400 group-hover:text-primary-400 transition-colors">{icon}</div>
    {isOpen && <span className="text-gray-300 group-hover:text-white font-medium">{label}</span>}
  </Link>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/monitoring" element={<MonitoringCenter />} />
          <Route path="/constituencies" element={<ConstituencyExplorer />} />
          <Route path="/simulator" element={<ElectionSimulator />} />
          <Route path="/timeline" element={<TimelinePlayback />} />
          <Route path="/reports" element={<ReportGenerator />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
