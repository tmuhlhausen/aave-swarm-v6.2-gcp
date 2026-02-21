'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralMap({ agents }: { agents: any[] }) {
  return (
    <div className="liquid-glass h-full rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0,0,18] }}>
        <ambientLight intensity={0.6} />
        {agents.map((_, i) => (
          <mesh key={i} position={[Math.sin(i)*6, Math.cos(i)*5, 0]}>
            <sphereGeometry args={[0.8]} />
            <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" />
          </mesh>
        ))}
        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400">NEURAL LINKS • LIVE</div>
    </div>
  );
}
