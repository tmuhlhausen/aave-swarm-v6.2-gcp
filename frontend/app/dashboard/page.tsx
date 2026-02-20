'use client';
import { Canvas } from '@react-three/fiber';
import SwarmNeuralNet from '@/components/SwarmNeuralNet';
import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  const [status, setStatus] = useState("Swarm Offline");
  const [workers, setWorkers] = useState(1);
  const [profit, setProfit] = useState(0);

  const awakenSwarm = async () => {
    setStatus("Awakening Swarm...");
    // Simulate activation
    setTimeout(() => {
      setStatus("Swarm Active – Agents Coordinating");
      setWorkers(3);
      setProfit(47.32);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_0.8px,transparent_1px)] [background-size:30px_30px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-7xl font-bold tracking-tighter neon-text">AAVE SWARM v6.2</h1>
            <p className="text-xl opacity-70">Google Cloud • Toronto • AI Agents • Auto-Scaling</p>
          </div>
          <button
            onClick={awakenSwarm}
            className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-black text-2xl font-bold rounded-2xl transition-all active:scale-95 shadow-2xl shadow-cyan-500/50"
          >
            AWAKEN SWARM
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 3D Neural Swarm */}
          <div className="col-span-12 lg:col-span-8 h-[620px] border border-cyan-500/30 rounded-3xl overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 12] }}>
              <SwarmNeuralNet />
            </Canvas>
            <div className="absolute bottom-8 left-8 glass p-6 rounded-2xl">
              <div className="text-4xl font-bold">{profit.toFixed(2)} USDC</div>
              <div className="text-sm opacity-70">LIVE PROFIT VAULT • TORONTO REGION</div>
            </div>
          </div>

          {/* Live Metrics */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-10 h-10" />
                <div>
                  <div className="text-5xl font-bold">{workers}</div>
                  <div className="text-sm opacity-70">GPU SPOT PODS ACTIVE</div>
                </div>
              </div>
              <div className="h-2 bg-cyan-950 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-cyan-400 animate-pulse" />
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-4">
                <Zap className="w-10 h-10" />
                <div className="text-xl">Status: <span className="font-bold text-emerald-400">{status}</span></div>
              </div>
            </div>

            <button className="w-full py-6 text-xl font-bold border border-red-500/50 hover:bg-red-500/10 rounded-2xl transition">
              PANIC BUTTON – PAUSE SWARM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
