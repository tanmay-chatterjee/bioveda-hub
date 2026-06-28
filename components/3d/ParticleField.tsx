'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';
import * as THREE from 'three';

// ─── Particle system ──────────────────────────────────────────────────────────

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const { size } = useThree();

  // Generate random positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  // Track mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / size.width) * 2 - 1,
        -(e.clientY / size.height) * 2 + 1
      );
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle drift
      positions[i3] += velocities[i3] + Math.sin(t * 0.3 + i) * 0.0005;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.2 + i) * 0.0005;

      // Wrap around bounds
      if (positions[i3] > 6) positions[i3] = -6;
      if (positions[i3] < -6) positions[i3] = 6;
      if (positions[i3 + 1] > 6) positions[i3 + 1] = -6;
      if (positions[i3 + 1] < -6) positions[i3 + 1] = 6;

      // Mouse repel
      const dx = positions[i3] - mouseRef.current.x * 5;
      const dy = positions[i3 + 1] - mouseRef.current.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        const force = (1.5 - dist) / 1.5 * 0.02;
        positions[i3] += (dx / dist) * force;
        positions[i3 + 1] += (dy / dist) * force;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.z = t * 0.01;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: new THREE.Color('#22c55e'),
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      }),
    []
  );

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

export function ParticleField() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const count = isMobile ? 250 : isTablet ? 500 : 1000;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      className="!absolute inset-0"
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <Particles count={count} />
    </Canvas>
  );
}
