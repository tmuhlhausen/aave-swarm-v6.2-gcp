'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicAgent({ id, position, profit }: { id: number; position: [number,number,number]; profit: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const color = profit >= 0 ? '#00ff9d' : '#ff2d55';

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * (0.4 + id*0.15);
    groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + id) * 1.2;
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[1.8, 64, 64]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.9} roughness={0} />
      </Sphere>
      <pointLight color={color} intensity={4} distance={8} />
    </group>
  );
}
