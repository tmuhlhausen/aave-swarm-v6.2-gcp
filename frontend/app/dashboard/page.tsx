'use client';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Swarm3D from '../components/Swarm3D';
import NeuralMap from '../components/NeuralMap';
import RiskSphere from '../components/RiskSphere';
import TradeTimeline from '../components/TradeTimeline';
import CommandPalette from '../components/CommandPalette';
import { Toaster } from 'sonner';
import { Mic, Zap, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SwarmNexusV72() {
  const [agents, setAgents] = useState(/* your live data */);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);

  // Voice command example
  useEffect(() => {
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.onresult = (e: any) => {
      const command = e.results[0][0].transcript.toLowerCase();
      if (command.includes('awaken')) toast.success('All agents awakened!');
      // Add more commands here
    };
    // recognition.start(); // uncomment when ready
  }, []);

  return (
    <div className="min-h-screen bg-[#05040f] text-white overflow-hidden relative">
      <Toaster position="top-center" richColors />

      {/* Top Persistent HUD */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-cyan-500/30 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-4xl font-bold tracking-[8px] glitch">AAVE SWARM NEXUS</div>
            <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-400 rounded-full text-xs font-mono">CONSCIOUSNESS: <span className="text-emerald-400">97.3%</span></div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIsImmersive(!isImmersive)} className="liquid-glass px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105">
              {isImmersive ? 'EXIT IMMERSIVE' : 'IMMERSIVE MODE'}
            </button>
            <button onClick={() => setShowCommandPalette(true)} className="liquid-glass px-6 py-3 rounded-2xl flex items-center gap-2">
              <Mic className="w-4 h-4" /> VOICE COMMAND
            </button>
          </div>
        </div>
      </div>

      <div className="pt-20 grid grid-cols-12 gap-6 p-8 max-w-screen-2xl mx-auto">
        {/* LEFT: AGENT FLEET + NEURAL MAP */}
        <div className="col-span-2">
          <Rnd default={{ x: 0, y: 0, width: 320, height: 620 }} className="draggable-panel">
            <div className="liquid-glass h-full p-6 rounded-3xl">
              <NeuralMap agents={agents} />
            </div>
          </Rnd>
        </div>

        {/* CENTER: MASSIVE 3D ARENA */}
        <div className="col-span-7">
          <div className="relative h-[720px] rounded-3xl overflow-hidden border-2 border-cyan-500/50">
            <Swarm3D agentsData={agents} />
            <RiskSphere className="absolute top-8 right-8" />
          </div>
        </div>

        {/* RIGHT: INTELLIGENCE DECK */}
        <div className="col-span-3 space-y-6">
          <Rnd default={{ x: 0, y: 0, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-6 rounded-3xl">METRICS TAB CONTENT</div>
          </Rnd>
          <Rnd default={{ x: 0, y: 360, width: 380, height: 340 }} className="draggable-panel">
            <div className="liquid-glass h-full p-6 rounded-3xl">AI CO-PILOT CHAT</div>
          </Rnd>
        </div>
      </div>

      {/* BOTTOM TIMELINE */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-cyan-500/30 p-4">
        <TradeTimeline />
      </div>

      <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />

      {/* Profit Rain Container (add particle system component here later) */}
    </div>
  );
}
