'use client';

import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Swarm3D from '../components/Swarm3D';
import NeuralMap from '../components/NeuralMap';
import RiskSphere from '../components/RiskSphere';
import TradeTimeline from '../components/TradeTimeline';
import CommandPalette from '../components/CommandPalette';
import { create } from 'zustand';

// === TYPED ZUSTAND STORE (fixes TS error) ===
interface SwarmState {
  agents: any[];
  synergy: number;
  setLiveData: (data: { agents: any[]; synergy: number }) => void;
}

const useSwarmStore = create<SwarmState>((set) => ({
  agents: [],
  synergy: 0,
  setLiveData: (data) => set({ agents: data.agents, synergy: data.synergy }),
}));
// === END OF STORE ===

export default function SwarmNexusV72() {
  const [agents, setAgents] = useState(Array.from({ length: 5 }, (_, i) => ({ id: i, profit: Math.random() * 5000 - 1500 })));
  const liveAgents = useSwarmStore((s) => s.agents);
  const [showPalette, setShowPalette] = useState(false);

  // Real-time WebSocket to your live GKE swarm (connects to actual trading agents)
  useEffect(() => {
    const ws = new WebSocket('wss://34.130.231.227:8080/ws'); // ← your current LoadBalancer IP
    ws.onopen = () => console.log('🟢 Connected to Aave Swarm Backend');
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        useSwarmStore.getState().setLiveData(data);
      } catch {}
    };
    ws.onclose = () => console.log('🔴 Disconnected — retrying...');
    return () => ws.close();
  }, []);

  // Live demo profit updates (replace with real data from WS later)
  useEffect(() => {
    const int = setInterval(() => {
      setAgents(Array.from({ length: 5 }, (_, i) => ({ id: i, profit: Math.random() * 5000 - 1500 })));
    }, 2200);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="min-h-screen bg-[#05040f] text-white overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/90 border-b border-cyan-500/30 py-5 px-8 flex justify-between items-center">
        <div className="text-4xl font-bold tracking-[8px] glitch">AAVE SWARM NEXUS v7.2</div>
        <div className="flex gap-6 text-sm font-mono">
          <button 
            onClick={() => setShowPalette(true)} 
            className="liquid-glass px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            VOICE / CMD
          </button>
          <div className="liquid-glass px-6 py-3 rounded-2xl">TORONTO • LIVE</div>
        </div>
      </div>

      <div className="pt-24 grid grid-cols-12 gap-6 p-8 max-w-screen-2xl mx-auto">
        {/* Left: Neural Map */}
        <div className="col-span-2">
          <Rnd default={{ x: 0, y: 0, width: 340, height: 680 }} className="draggable-panel">
            <NeuralMap agents={agents} />
          </Rnd>
        </div>

        {/* Center: Stunning 3D Swarm Visualization */}
        <div className="col-span-7 relative">
          <Swarm3D />
          <RiskSphere className="absolute top-12 right-12" />
        </div>

        {/* Right: Stats Panels */}
        <div className="col-span-3 space-y-6">
          <Rnd default={{ x: 0, y: 0, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-8 rounded-3xl flex flex-col justify-center">
              <div className="text-sm opacity-70">TOTAL P&amp;L</div>
              <div className="text-6xl font-bold text-emerald-400">$47,291</div>
            </div>
          </Rnd>
          <Rnd default={{ x: 0, y: 360, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-8 rounded-3xl">AI CO-PILOT READY</div>
          </Rnd>
        </div>
      </div>

      {/* Bottom Timeline */}
      <div className="fixed bottom-8 left-8 right-8">
        <TradeTimeline />
      </div>

      <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
    </div>
  );
}
