import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldAlert, ShieldCheck, Play, RefreshCcw, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Simulation() {
  const [packetSize, setPacketSize] = useState(1500);
  const [failedLogins, setFailedLogins] = useState(0);
  const [frequency, setFrequency] = useState(50);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const runSimulation = async () => {
    setLoading(true);
    setResult(null);
    
    const newLog = `[${new Date().toLocaleTimeString()}] Analyzing packet: size=${packetSize}, logins=${failedLogins}, freq=${frequency}...`;
    setLogs(prev => [newLog, ...prev].slice(0, 10));

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packet_size: packetSize,
          failed_logins: failedLogins,
          request_frequency: frequency
        })
      });
      const data = await res.json();
      
      // Artificial delay for "AI processing" feel
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        const resultLog = `[${new Date().toLocaleTimeString()}] Analysis complete: ${data.threat_detected ? "THREAT DETECTED" : "CLEAN"}`;
        setLogs(prev => [resultLog, ...prev].slice(0, 10));
      }, 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Threat Simulator</h2>
        <p className="text-slate-400 mt-1">Test the AI model with custom network parameters</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6 bg-[#12121a] border border-white/5 p-8 rounded-3xl">
          <div className="flex items-center gap-2 text-green-500 mb-4">
            <Terminal className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Input Parameters</h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">Packet Size (Bytes)</label>
                <span className="text-xs font-mono text-green-500">{packetSize} B</span>
              </div>
              <input 
                type="range" min="64" max="10000" step="64" value={packetSize}
                onChange={(e) => setPacketSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">Failed Login Attempts</label>
                <span className="text-xs font-mono text-green-500">{failedLogins}</span>
              </div>
              <input 
                type="range" min="0" max="20" step="1" value={failedLogins}
                onChange={(e) => setFailedLogins(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">Request Frequency (req/s)</label>
                <span className="text-xs font-mono text-green-500">{frequency}</span>
              </div>
              <input 
                type="range" min="1" max="1000" step="10" value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className={cn(
              "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
              loading 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-green-500 text-black hover:bg-green-400 glow-green"
            )}
          >
            {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
            {loading ? "ANALYZING..." : "RUN SIMULATION"}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-[#12121a] border border-white/5 p-8 rounded-3xl h-[280px] flex flex-col items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Info className="w-8 h-8 text-slate-500" />
                  </div>
                  <p className="text-slate-500 text-sm">Ready for analysis</p>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-green-500 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-green-500 font-mono text-xs animate-pulse">SCANNING PACKET HEADERS...</p>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "text-center p-8 rounded-2xl w-full h-full flex flex-col items-center justify-center transition-colors",
                    result.threat_detected ? "bg-red-500/10" : "bg-green-500/10"
                  )}
                >
                  {result.threat_detected ? (
                    <ShieldAlert className="w-16 h-16 text-red-500 mb-4 glow-red" />
                  ) : (
                    <ShieldCheck className="w-16 h-16 text-green-500 mb-4 glow-green" />
                  )}
                  <h4 className={cn(
                    "text-2xl font-black uppercase tracking-tighter",
                    result.threat_detected ? "text-red-500" : "text-green-500"
                  )}>
                    {result.threat_detected ? result.threat_type : "CLEAN TRAFFIC"}
                  </h4>
                  <div className="mt-4 flex gap-6">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Confidence</p>
                      <p className="text-lg font-mono text-white">{(result.confidence * 100).toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Latency</p>
                      <p className="text-lg font-mono text-white">12ms</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Console */}
          <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-xs h-[200px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-white/5 pb-2">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM LOGS</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
              {logs.length === 0 && <p className="text-slate-700 italic">Waiting for simulation...</p>}
              {logs.map((log, i) => (
                <p key={i} className={cn(
                  "transition-opacity",
                  i === 0 ? "text-green-400" : "text-slate-500 opacity-50"
                )}>
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
