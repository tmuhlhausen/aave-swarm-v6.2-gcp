'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NeuralSwarm() {
  const group = useRef<THREE.Group>(null!);
  const nodes = Array.from({ length: 42 });

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group}>
      {nodes.map((_, i) => (
        <Sphere key={i} args={[0.12]} position={[
          Math.sin(i) * 5,
          Math.cos(i * 1.3) * 4,
          Math.cos(i) * 3
        ]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
        </Sphere>
      ))}
      {/* Connecting lines */}
      <line>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </line>
    </group>
  );
}

export default function SwarmNeuralNet() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <NeuralSwarm />
      <OrbitControls enablePan={false} enableZoom={true} />
    </>
  );
}
