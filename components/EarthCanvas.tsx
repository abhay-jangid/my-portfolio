"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/earth.glb");

function CosmicDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 250;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 30;
      pos[i + 1] = (Math.random() - 0.5) * 30;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#38BDF8" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function EarthScene() {
  const { scene } = useGLTF("/models/earth.glb");
  const modelRef = useRef<THREE.Group>(null);
  const cloudMeshRef = useRef<THREE.Mesh | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Configure multi-mesh materials for pristine color space and lighting response
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.frustumCulled = true;
        const name = (mesh.name || "").toLowerCase();

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.vertexColors = false;

          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
            mat.needsUpdate = true;
          }

          // 1. Terrain & Ocean Base Surface
          if (name.includes("psphere1") || name.includes("phong1")) {
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.roughness = 0.45;
            mat.metalness = 0.1;

            if (mat.emissiveMap) {
              mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
              mat.emissive.setHex(0xffffff);
              mat.emissiveIntensity = 1.5;
              mat.emissiveMap.needsUpdate = true;
            }
          }
          // 2. Cloud Formation Layer
          else if (name.includes("psphere4") || name.includes("lambert6")) {
            cloudMeshRef.current = mesh;
            mat.transparent = true;
            mat.opacity = 0.88;
            mat.depthWrite = false;
            mat.roughness = 0.8;
            mat.metalness = 0.0;
          }
          // 3. Atmospheric Scattering Layer
          else if (name.includes("psphere5") || name.includes("lambert7")) {
            mat.transparent = true;
            mat.opacity = 0.35;
            mat.depthWrite = false;
            mat.color.setHex(0x38bdf8);
            mat.roughness = 0.2;
            mat.metalness = 0.0;
          }

          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Cinematic orbital scroll choreography (Zoomed out so the full planet is always in frame)
  useFrame((state, delta) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += delta * 0.06;

    if (cloudMeshRef.current) {
      cloudMeshRef.current.rotation.y += delta * 0.015;
    }

    let targetCamPos = new THREE.Vector3(0, 0, 11.0); // Safely pulled back to see the whole Earth
    let targetModelPos = new THREE.Vector3(2.8, 0, 0);   // Framed neatly on the right side
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (scrollProgress > 0.7) {
      targetCamPos.set(0, 1.2, 9.5);
      targetModelPos.set(0, -0.2, 0);
    } else if (scrollProgress > 0.4) {
      targetCamPos.set(-1.2, 0.5, 8.5);
      targetModelPos.set(0.8, 0, 0);
    } else if (scrollProgress > 0.15) {
      targetCamPos.set(1.2, -0.3, 8.8);
      targetModelPos.set(-0.5, 0, 0);
    }

    camera.position.lerp(targetCamPos, delta * 3);
    camera.lookAt(targetLookAt);

    modelRef.current.position.x = THREE.MathUtils.damp(modelRef.current.position.x, targetModelPos.x, 3.5, delta);
    modelRef.current.position.y = THREE.MathUtils.damp(modelRef.current.position.y, targetModelPos.y, 3.5, delta);
    modelRef.current.position.z = THREE.MathUtils.damp(modelRef.current.position.z, targetModelPos.z, 3.5, delta);
  });

  // Scaled to 0.022 to account for the internal 97-unit Maya matrix
  return <primitive ref={modelRef} object={scene} scale={0.022} position={[2.8, 0, 0]} />;
}

export default function EarthBackground() {
  return (
    <div
      aria-hidden="true"
      className="hardware-accelerated fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-[#020617]"
    >
      <Canvas
        camera={{ position: [0, 0, 11.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[15, 12, 10]} intensity={3.0} color="#FFFFFF" />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color="#06B6D4" />

        <Environment preset="night" />
        <CosmicDust />
        <React.Suspense fallback={null}>
          <EarthScene />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export { EarthBackground as EarthCanvas, EarthBackground as SaturnCanvas, EarthBackground as SaturnBackground };
