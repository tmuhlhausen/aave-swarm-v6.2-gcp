'use client';
import { useEffect } from 'react';

export default function NeuralMap({ agents }: { agents: any[] }) {
  return (
    <div className="liquid-glass h-full p-6 rounded-3xl border border-cyan-500/30">
      <div className="text-cyan-400 text-sm mb-4 font-mono">NEURAL SYNAPSE MAP</div>
      <div className="space-y-3">
        {agents.map((a, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>Agent {i+1}</span>
            <span className={a.profit > 0 ? "text-emerald-400" : "text-red-400"}>
              {a.profit.toFixed(0)} USD
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
