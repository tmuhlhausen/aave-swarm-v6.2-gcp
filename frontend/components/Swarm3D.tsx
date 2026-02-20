'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import HolographicAgent from './HolographicAgent';

export default function Swarm3D({ agentsData }: { agentsData?: any[] }) {
  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl">
      <Canvas camera={{ position: [0, 8, 22], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 20, 10]} color="#00f5ff" intensity={1.5} />
        <pointLight position={[10, -10, -15]} color="#ff00ff" intensity={1} />

        <Stars radius={300} depth={60} count={8000} factor={3} saturation={0} fade speed={1} />

        {/* 5 living agents */}
        {[0,1,2,3,4].map((i) => (
          <HolographicAgent 
            key={i} 
            id={i} 
            position={[
              Math.sin((i * 1.3)) * 9,
              Math.cos(i * 0.8) * 4 + (i % 2 ? 3 : -3),
              Math.cos(i * 1.1) * 7
            ]}
            profit={agentsData?.[i]?.profit || (Math.random() * 2000 - 800)}
          />
        ))}

        <OrbitControls 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.15}
          minDistance={8}
          maxDistance={35}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      <div className="scanline" />
      <div className="absolute top-4 left-4 text-xs font-mono tracking-[4px] text-cyan-400/80">LIVE SWARM NEXUS • TORONTO REGION</div>
    </div>
  );
}
