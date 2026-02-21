'use client';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Swarm3D from '../components/Swarm3D';
import NeuralMap from '../components/NeuralMap';
import RiskSphere from '../components/RiskSphere';
import TradeTimeline from '../components/TradeTimeline';
import CommandPalette from '../components/CommandPalette';

export default function SwarmNexusV72() {
  const [agents, setAgents] = useState(Array.from({ length: 5 }, (_, i) => ({ id: i, profit: Math.random() * 5000 - 1500 })));
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    const int = setInterval(() => setAgents(Array.from({ length: 5 }, (_, i) => ({ id: i, profit: Math.random() * 5000 - 1500 }))), 2200);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="min-h-screen bg-[#05040f] text-white">
      <div className="fixed top-0 inset-x-0 z-50 bg-black/90 border-b border-cyan-500/30 py-5 px-8 flex justify-between items-center">
        <div className="text-4xl font-bold tracking-[8px] glitch">AAVE SWARM NEXUS v7.2</div>
        <div className="flex gap-6 text-sm font-mono">
          <button onClick={() => setShowPalette(true)} className="liquid-glass px-6 py-3 rounded-2xl">VOICE / CMD</button>
          <div className="liquid-glass px-6 py-3 rounded-2xl">TORONTO • LIVE</div>
        </div>
      </div>

      <div className="pt-24 grid grid-cols-12 gap-6 p-8 max-w-screen-2xl mx-auto">
        {/* Left Neural Map */}
        <div className="col-span-2">
          <Rnd default={{ x: 0, y: 0, width: 340, height: 680 }} className="draggable-panel">
            <NeuralMap agents={agents} />
          </Rnd>
        </div>

        {/* Center 3D Swarm */}
        <div className="col-span-7">
          <Swarm3D agentsData={agents} />
          <RiskSphere className="absolute top-12 right-12" />
        </div>

        {/* Right Panels */}
        <div className="col-span-3 space-y-6">
          <Rnd default={{ x: 0, y: 0, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-8 rounded-3xl">TOTAL P&amp;L: <span className="text-6xl font-bold text-emerald-400">$47,291</span></div>
          </Rnd>
          <Rnd default={{ x: 0, y: 360, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-8 rounded-3xl">AI CO-PILOT READY</div>
          </Rnd>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8">
        <TradeTimeline />
      </div>

      <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
    </div>
  );
}
