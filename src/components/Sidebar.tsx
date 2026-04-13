import React from "react";
import { Shield, LayoutDashboard, Activity, FileText, Settings, Terminal } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "simulation", label: "Threat Simulator", icon: Activity },
    { id: "logs", label: "Live Logs", icon: Terminal },
    { id: "docs", label: "Documentation", icon: FileText },
  ];

  return (
    <div className="w-64 border-r border-white/10 bg-[#0d0d12] flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/50">
          <Shield className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-white">CYBER-AI</h1>
          <p className="text-[10px] text-slate-500 font-mono">THREAT DETECTION</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-slate-500">SYSTEM STATUS</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-300 font-medium">All systems operational</p>
        </div>
      </div>
    </div>
  );
}
