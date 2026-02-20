'use client';
import { Canvas } from '@react-three/fiber';
import SwarmNeuralNet from '@/components/SwarmNeuralNet';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-cyan-400">
      <Canvas className="absolute inset-0">
        <SwarmNeuralNet />
      </Canvas>
      <div className="relative z-10 p-8">
        <button onClick={() => awakenSwarm()} className="neon-button">
          AWAKEN SWARM
        </button>
      </div>
    </div>
  );
}
