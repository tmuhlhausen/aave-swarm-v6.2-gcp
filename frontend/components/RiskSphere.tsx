'use client';

import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';

export default function RiskSphere({ className = "" }: { className?: string }) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <div className={`w-48 h-48 liquid-glass rounded-3xl overflow-hidden border border-red-500/30 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <Sphere ref={ref} args={[3.2, 64, 64]}>
            <meshStandardMaterial 
              color="#ff2d55" 
              emissive="#ff2d55" 
              emissiveIntensity={0.7} 
              wireframe 
            />
          </Sphere>
        </Suspense>
      </Canvas>
    </div>
  );
}
