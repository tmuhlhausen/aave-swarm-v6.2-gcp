'use client';
import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function RiskSphere() {
  const ref = useRef<any>(null);
  useFrame((state) => ref.current.rotation.y = state.clock.getElapsedTime() * 0.8);
  return (
    <div className="w-48 h-48 liquid-glass rounded-3xl overflow-hidden border border-red-500/30">
      <Canvas>
        <ambientLight />
        <Sphere ref={ref} args={[3.5, 64, 64]}>
          <meshStandardMaterial color="#ff2d55" emissive="#ff2d55" emissiveIntensity={0.6} wireframe />
        </Sphere>
      </Canvas>
    </div>
  );
}
