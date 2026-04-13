import React from "react";
import { BookOpen, Code2, FolderTree, Github, CheckCircle2, AlertCircle } from "lucide-react";

export default function Documentation() {
  return (
    <div className="p-8 space-y-12 max-w-4xl mx-auto pb-24">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest">
          Project Blueprint
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">AI-Powered Cybersecurity Threat Detection</h2>
        <p className="text-xl text-slate-400 leading-relaxed">
          An industry-oriented project designed to showcase the application of Machine Learning in identifying and mitigating cyber threats.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <BookOpen className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold">1. Project Explanation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5">
            <h4 className="font-bold text-white mb-2">What is it?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              A system that uses Artificial Intelligence to analyze network traffic patterns and identify malicious activities like DoS attacks, Brute Force, and Malware behavior in real-time.
            </p>
          </div>
          <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5">
            <h4 className="font-bold text-white mb-2">Why AI?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Traditional rule-based systems (IDS/IPS) struggle with "Zero-Day" attacks. AI learns from data to detect subtle anomalies that humans or static rules might miss.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <FolderTree className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold">2. Folder Structure</h3>
        </div>
        <div className="bg-black/50 p-8 rounded-3xl border border-white/10 font-mono text-sm text-slate-300">
          <pre>{`AI-Cyber-Threat-Detection/
├── data/           # Raw & Processed Datasets (NSL-KDD, CICIDS)
├── notebooks/      # Jupyter Notebooks for EDA & Model Training
├── src/            # Modular Python Code for Detection Pipeline
├── models/         # Saved .pkl files (Random Forest, Isolation Forest)
├── outputs/        # Evaluation reports and confusion matrices
├── images/         # Screenshots for README
└── main.py         # Entry point for the detection system`}</pre>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <Code2 className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold">3. Tech Stack</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Python", desc: "Core Logic" },
            { name: "Pandas", desc: "Data Cleaning" },
            { name: "Scikit-learn", desc: "ML Models" },
            { name: "Flask", desc: "API Layer" },
            { name: "Recharts", desc: "Visualization" },
            { name: "Tailwind", desc: "UI Styling" },
            { name: "React", desc: "Frontend" },
            { name: "Express", desc: "Backend" },
          ].map(tech => (
            <div key={tech.name} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <p className="text-white font-bold text-sm">{tech.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <Github className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold">4. GitHub Proof Strategy</h3>
        </div>
        <div className="space-y-4">
          {[
            "Daily Commits: Show progress over 7 days (Setup -> Data -> Model -> UI).",
            "Professional README: Include architecture diagrams and performance metrics.",
            "Demo Video: Record the simulator detecting a DoS attack.",
            "Documentation: Explain the 'Why' behind every feature selection.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-[#12121a] p-4 rounded-xl border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <AlertCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-bold">5. Predicted Interview Questions</h3>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "What is the objective of this project?",
              a: "To build an AI system that analyzes network traffic and classifies behavior as normal or malicious using machine learning models like Random Forest."
            },
            {
              q: "What real-world problem does this solve?",
              a: "It detects intrusion attempts, malware activity, and unusual network behavior that traditional rule-based systems might miss, preventing data breaches."
            },
            {
              q: "What evaluation metrics did you use?",
              a: "Accuracy, Precision, Recall, and F1-score. Recall is critical here to ensure actual threats are not missed (minimizing false negatives)."
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#12121a] p-6 rounded-2xl border border-white/5 space-y-2">
              <p className="text-green-500 font-bold text-sm">Q: {item.q}</p>
              <p className="text-slate-400 text-sm leading-relaxed">A: {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <div>
          <h4 className="text-amber-500 font-bold text-sm">Industry Tip</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            When presenting this in interviews, focus on the **Feature Engineering** phase. Explain how you converted raw packet data into meaningful features like "Flow Duration" or "Inter-arrival Time". This shows deep technical understanding beyond just calling `model.fit()`.
          </p>
        </div>
      </div>
    </div>
  );
}
