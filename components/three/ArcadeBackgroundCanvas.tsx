"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fond néon pixelisé + dithering, sombre pour préserver la lisibilité du contenu.
// Réagit à la souris (lueur) et au scroll (déphasage des ondes).
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uBg;

  void main() {
    float aspect = uRes.x / uRes.y;
    // pixelisation : on quantifie l'UV en cellules carrées
    float cells = 120.0;
    vec2 cellSize = vec2(cells, cells / aspect);
    vec2 px = floor(vUv * cellSize) / cellSize;

    // champ d'ondes lent, déphasé par le scroll
    float wave = sin((px.x * 3.0 + px.y * 2.0) * 3.1415 + uTime * 0.5 + uScroll * 2.0);
    float field = 0.5 + 0.5 * wave;

    // lueur autour de la souris
    float d = distance(vec2(px.x * aspect, px.y), vec2(uMouse.x * aspect, uMouse.y));
    float glow = smoothstep(0.55, 0.0, d);

    vec3 col = uBg;
    col = mix(col, uColorB, field * 0.16);
    col = mix(col, uColorA, glow * 0.45);

    // vignette : bords plus sombres
    float vig = smoothstep(1.25, 0.25, distance(vUv, vec2(0.5)));
    col *= mix(0.72, 1.0, vig);

    // dithering rétro (grain ordonné par blocs de 4px)
    float dith = fract(sin(dot(floor(vUv * uRes / 4.0), vec2(12.9898, 78.233))) * 43758.5453);
    col += (dith - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const { viewport, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const target = useMemo(() => new THREE.Vector2(0.5, 0.5), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uColorA: { value: new THREE.Color("#a529ff") },
      uColorB: { value: new THREE.Color("#8c00ff") },
      uBg: { value: new THREE.Color("#0e0f15") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    const u = uniforms;
    u.uTime.value = state.clock.elapsedTime;
    target.set((state.pointer.x + 1) / 2, (state.pointer.y + 1) / 2);
    u.uMouse.value.lerp(target, 0.04);
    u.uScroll.value = typeof window !== "undefined" ? window.scrollY * 0.0012 : 0;
    u.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ArcadeBackgroundCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ShaderPlane />
    </Canvas>
  );
}
