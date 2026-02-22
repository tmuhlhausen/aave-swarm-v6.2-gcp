'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import HolographicAgent from './HolographicAgent';

export default function Swarm3D({ agentsData }: { agentsData: any[] }) {
  return (
    <div className="relative w-full h-[720px] rounded-3xl overflow-hidden border border-cyan-500/30">
      <Canvas camera={{ position: [0, 10, 25] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 20, 10]} color="#00f5ff" intensity={2} />
        <Stars radius={300} depth={60} count={9000} factor={3} fade />
        {[0,1,2,3,4].map(i => (
          <HolographicAgent key={i} id={i} position={[
            Math.sin(i*1.4)*11, 
            Math.cos(i*0.9)*6, 
            Math.cos(i*1.2)*9
          ]} profit={agentsData[i]?.profit || 0} />
        ))}
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.2} />
        <EffectComposer><Bloom luminanceThreshold={0.5} height={400} /></EffectComposer>
      </Canvas>
      <div className="scanline" />
    </div>
  );
}
