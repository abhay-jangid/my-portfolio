"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/elaina.glb");

function BackgroundScenery() {
  const texture = useTexture("/images/anime-sky-bg.jpg");

  return (
    <mesh position={[0, 0, -4.5]}>
      <planeGeometry args={[14, 8]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function ElainaPortrait() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/elaina.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.frustumCulled = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    const animName = Object.keys(actions)[0] || "Take 001";
    const currentAction = actions[animName];
    if (currentAction) {
      currentAction.reset().fadeIn(0.4).play();
    }
    return () => {
      currentAction?.fadeOut(0.3);
    };
  }, [actions]);

  // Enhanced cursor tracking: smoothly follows pointer across X and Y axes
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    // Target rotations derived from cursor position
    const baseRotationY = -0.32;
    const targetRotY = baseRotationY + pointer.x * 0.35;
    const targetRotX = -pointer.y * 0.15;

    // Smooth dampening interpolation
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      delta * 5.0
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      delta * 5.0
    );
  });

  return (
    <group
      ref={group}
      position={[0.85, -4.35, 0.1]}
      scale={1.85}
      rotation={[0, -0.32, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#FFF6EE" />
        <directionalLight position={[-5, 3, 2]} intensity={0.8} color="#D9E6F8" />

        <React.Suspense fallback={null}>
          <BackgroundScenery />
          <ElainaPortrait />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
