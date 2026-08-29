"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/leaves.glb");

function FullscreenFloatingLeaves() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/leaves.glb");
  const { actions } = useAnimations(animations, group);

  // Play falling leaves animation loop
  useEffect(() => {
    const animName = Object.keys(actions)[0] || "idle";
    const currentAction = actions[animName];
    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
      currentAction.timeScale = 0.75;
    }
    return () => {
      currentAction?.fadeOut(0.3);
    };
  }, [actions]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.frustumCulled = false;
      }
    });
  }, [scene]);

  // Subtle, slow, and heavily damped cursor tracking
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    // Gentle rotation range (slow & little movement)
    const targetRotY = pointer.x * 0.55;
    const targetRotX = -pointer.y * 0.35;

    // Heavy smooth damping for luxurious weight
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY,
      delta * 1.8
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      delta * 1.8
    );

    // Minimal subtle positional drift
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      pointer.x * 0.8,
      delta * 1.5
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      pointer.y * 0.8,
      delta * 1.5
    );
  });

  return (
    <group
      ref={group}
      position={[0, 0, -1.0]}
      scale={1.45}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function LeavesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[6, 8, 5]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-6, -4, 2]} intensity={0.8} color="#C4E8C0" />

        <React.Suspense fallback={null}>
          <FullscreenFloatingLeaves />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
