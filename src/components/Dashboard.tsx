import React, { useEffect, useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { ShieldAlert, ShieldCheck, Zap, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <div className="p-8 text-slate-500 font-mono">Initializing Neural Network...</div>;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Security Overview</h2>
        <p className="text-slate-400 mt-1">Real-time monitoring and AI-driven anomaly detection</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Packets", value: stats.total_packets.toLocaleString(), icon: Zap, color: "text-blue-500", trend: "+12%" },
          { label: "Threats Blocked", value: stats.threats_blocked, icon: ShieldAlert, color: "text-red-500", trend: "-5%" },
          { label: "System Health", value: stats.system_health, icon: ShieldCheck, color: "text-green-500", trend: "Stable" },
          { label: "Uptime", value: stats.uptime, icon: Clock, color: "text-amber-500", trend: "100%" },
        ].map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item.label}
            className="bg-[#12121a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <item.icon className="w-12 h-12" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-full",
                item.trend.startsWith("+") ? "bg-green-500/10 text-green-500" : 
                item.trend.startsWith("-") ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
              )}>
                {item.trend}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{item.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#12121a] border border-white/5 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Network Traffic Analysis</h3>
              <p className="text-sm text-slate-500">Packet flow vs Detected anomalies (24h)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-slate-400">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-slate-400">Threats</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.traffic_history}>
                <defs>
                  <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  interval={3}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "12px" }}
                  itemStyle={{ fontSize: "12px" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="packets" 
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#colorPackets)" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: "#ef4444" }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#12121a] border border-white/5 p-8 rounded-3xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2">Threat Distribution</h3>
          <p className="text-sm text-slate-500 mb-8">Classification of detected attacks</p>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.threat_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.threat_distribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {stats.threat_distribution.map((item: any, i: number) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-mono text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/src/lib/utils";
