"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function AbstractShapes({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const [mx, my] = mouse.current;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mx * 0.15,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -my * 0.1,
      0.04
    );
  });

  const positions: [number, number, number][] = useMemo(
    () => [
      [1.8, 0.3, -1],
      [-1.6, -0.5, -0.5],
      [0.2, 1.4, -2],
      [-0.8, -1.2, -1.5],
      [2.2, -0.8, -3],
      [-2, 0.8, -2],
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Float
          key={i}
          speed={1 + i * 0.3}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh position={pos} scale={0.25 + (i % 3) * 0.12}>
            {i % 3 === 0 ? (
              <icosahedronGeometry args={[1, 1]} />
            ) : i % 3 === 1 ? (
              <octahedronGeometry args={[1]} />
            ) : (
              <torusGeometry args={[1, 0.35, 8, 20]} />
            )}
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.05}
              transmission={0.92}
              ior={1.4}
              chromaticAberration={0.03}
              anisotropy={0.1}
              color={i % 2 === 0 ? "#a8c4ff" : "#f0a8d8"}
            />
          </mesh>
        </Float>
      ))}

      {/* Ambient light planes */}
      <mesh position={[0, 0, -4]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#f0f4ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  useFrame(() => {
    const [mx, my] = mouse.current;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.3, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, my * 0.2, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CameraScene({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e8f0ff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color="#ffd6f0" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#0057ff" />
      <CameraRig mouse={mouse} />
      <AbstractShapes mouse={mouse} />
    </Canvas>
  );
}
