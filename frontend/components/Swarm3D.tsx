'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { create } from 'zustand';

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

function Scene({ agents }: { agents: any[] }) {
  const groupRef = useRef<THREE.Group>(null!);

  const agentPositions = useMemo(() => {
    return agents.length > 0 
      ? agents.map((a, i) => ({
          x: (Math.random() - 0.5) * 14,
          y: (Math.random() - 0.5) * 9,
          z: (Math.random() - 0.5) * 8,
          profit: a.profit,
        }))
      : Array.from({ length: 8 }, () => ({
          x: (Math.random() - 0.5) * 14,
          y: (Math.random() - 0.5) * 9,
          z: (Math.random() - 0.5) * 8,
          profit: Math.random() * 5000 - 1500,
        }));
  }, [agents]);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.07;
  });

  return (
    <>
      <group ref={groupRef}>
        {agentPositions.map((pos, i) => (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.85, 64, 64]} />
            <meshStandardMaterial 
              color={pos.profit > 0 ? "#22ff88" : "#ff2266"} 
              emissive={pos.profit > 0 ? "#22ff88" : "#ff2266"} 
              emissiveIntensity={1.1}
            />
          </mesh>
        ))}
      </group>
      <Stars radius={150} depth={60} count={500} factor={4} saturation={0} fade speed={0.8} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={10} maxDistance={35} autoRotate autoRotateSpeed={0.15} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.8} height={500} intensity={2.2} />
      </EffectComposer>
    </>
  );
}

export default function Swarm3D() {
  const agents = useSwarmStore((s) => s.agents);

  return (
    <div className="w-full h-[620px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#05040f]">
      <Canvas camera={{ position: [0, 0, 22], fov: 42 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[20, 20, 20]} intensity={2.5} color="#67e8f9" />
        <pointLight position={[-20, -20, -20]} intensity={1.5} color="#ff2d55" />
        <Scene agents={agents} />
      </Canvas>
    </div>
  );
}
