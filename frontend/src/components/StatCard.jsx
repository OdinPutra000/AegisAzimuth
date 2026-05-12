import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({ title, value, icon, trend, trendValue, color = "blue" }) => {
  const colors = {
    blue: "text-blue-400",
    pink: "text-pink-400",
    green: "text-green-400",
    amber: "text-amber-400"
  };

  return (
    <GlassCard className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</span>
        <div className={`${colors[color]} opacity-80`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {trend && (
          <span className={`text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </span>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
