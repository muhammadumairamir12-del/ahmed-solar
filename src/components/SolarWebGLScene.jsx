import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sparkles,
  PerspectiveCamera,
  ContactShadows,
} from '@react-three/drei';

function SolarPanelModel({ isRotating = true, tiltAngle = 0.35 }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef} rotation={[tiltAngle, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.0]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.055, 0]}>
        <boxGeometry args={[3.1, 0.01, 1.9]} />
        <meshPhysicalMaterial
          color="#0f172a"
          emissive="#1e3a8a"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.062, 0]}>
          <boxGeometry args={[0.015, 0.005, 1.88]} />
          <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
        <mesh key={`h-${i}`} position={[0, 0.062, z]}>
          <boxGeometry args={[3.08, 0.005, 0.015]} />
          <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.4]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function SunGlow() {
  const sunRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.position.x = Math.sin(t * 0.45) * 4;
      sunRef.current.position.z = Math.cos(t * 0.45) * 4;
    }
  });

  return (
    <group ref={sunRef} position={[3, 3, 3]}>
      <pointLight intensity={2.6} color="#f59e0b" distance={10} />
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

export default function SolarWebGLScene() {
  const [autoRotate] = useState(true);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 shadow-2xl border border-blue-500/20">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-400/30 text-xs font-semibold text-blue-200">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Interactive 3D Photovoltaic Simulation
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700">
        Drag to rotate · Scroll to zoom
      </div>

      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ touchAction: 'none' }}
      >
        <PerspectiveCamera makeDefault position={[0, 2.5, 4.5]} fov={45} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, -2, -5]} intensity={0.4} color="#3b82f6" />

        <SunGlow />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <SolarPanelModel isRotating={autoRotate} />
        </Float>

        <Sparkles count={36} scale={6} size={2} speed={0.35} color="#60a5fa" opacity={0.55} />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.55}
          scale={8}
          blur={2}
          far={4}
          color="#0284c7"
        />

        <OrbitControls
          enableZoom
          maxPolarAngle={Math.PI / 2.1}
          minDistance={2.5}
          maxDistance={7}
        />
      </Canvas>
    </div>
  );
}
