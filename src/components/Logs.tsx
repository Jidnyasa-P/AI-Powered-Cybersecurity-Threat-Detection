import React, { useEffect, useState, useRef } from "react";
import { Terminal, Search, Filter, Download } from "lucide-react";
import { cn } from "@/src/lib/utils";

const LOG_TYPES = ["INFO", "WARNING", "CRITICAL", "SUCCESS"];

export default function Logs() {
  const [logs, setLogs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const type = LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)];
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message: generateMockMessage(type),
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateMockMessage = (type: string) => {
    switch(type) {
      case "CRITICAL": return "Potential SQL Injection detected on /api/v1/users";
      case "WARNING": return "Unusual traffic volume from external IP";
      case "SUCCESS": return "Firewall rules updated successfully";
      default: return "Routine packet inspection complete";
    }
  };

  return (
    <div className="p-8 space-y-6 h-screen flex flex-col overflow-hidden">
      <header className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live Network Logs</h2>
          <p className="text-slate-400 mt-1">Real-time packet inspection and system events</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-white/5 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="bg-[#0d0d12] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono text-slate-500">50 EVENTS CACHED</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-green-500/50 transition-colors w-64"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 scrollbar-hide" ref={scrollRef}>
          {logs.map((log) => (
            <div key={log.id} className="group flex items-center gap-4 py-1.5 px-3 rounded hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-green-500/50">
              <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
              <span className={cn(
                "font-bold shrink-0 w-20",
                log.type === "CRITICAL" ? "text-red-500" :
                log.type === "WARNING" ? "text-amber-500" :
                log.type === "SUCCESS" ? "text-green-500" : "text-blue-500"
              )}>
                {log.type}
              </span>
              <span className="text-slate-500 shrink-0 w-32">{log.ip}</span>
              <span className="text-slate-300 truncate">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
