'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { create } from 'zustand';

// === Same typed store as your page.tsx (duplicated for zero import issues) ===
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
// === End of store ===

export default function Swarm3D() {
  const agents = useSwarmStore((s) => s.agents);

  const groupRef = useRef<THREE.Group>(null!);

  const agentPositions = useMemo(() => {
    return agents.length > 0 
      ? agents.map((a, i) => ({
          ...a,
          x: (Math.random() - 0.5) * 14,
          y: (Math.random() - 0.5) * 9,
          z: (Math.random() - 0.5) * 8,
        }))
      : Array.from({ length: 8 }, (_, i) => ({
          id: i,
          profit: Math.random() * 5000 - 1500,
          x: (Math.random() - 0.5) * 14,
          y: (Math.random() - 0.5) * 9,
          z: (Math.random() - 0.5) * 8,
        }));
  }, [agents]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.07;
    }
  });

  return (
    <div className="w-full h-[620px] rounded-3xl overflow-hidden border border-cyan-500/30">
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }} style={{ background: '#05040f' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#67e8f9" />
        <pointLight position={[-15, -15, -15]} intensity={1.2} color="#ff2d55" />

        <group ref={groupRef}>
          {agentPositions.map((agent, i) => (
            <mesh key={i} position={[agent.x, agent.y, agent.z]}>
              <sphereGeometry args={[0.8, 64, 64]} />
              <meshStandardMaterial 
                color={agent.profit > 0 ? "#22ff88" : "#ff2266"} 
                emissive={agent.profit > 0 ? "#22ff88" : "#ff2266"} 
                emissiveIntensity={0.9}
              />
            </mesh>
          ))}
        </group>

        <Stars radius={120} depth={50} count={400} factor={4} saturation={0} fade speed={1} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={8} 
          maxDistance={28} 
          autoRotate 
          autoRotateSpeed={0.2}
        />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.7}
            luminanceSmoothing={0.9}
            height={400}
            intensity={1.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
