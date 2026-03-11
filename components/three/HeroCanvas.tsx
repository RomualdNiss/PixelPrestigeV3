"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import type { Group, Texture } from "three";
import { ACESFilmicToneMapping, Color, Euler, MathUtils } from "three";
import { CanvasTexture, RepeatWrapping } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cn } from "@/lib/utils";

type Axis = "x" | "y" | "z";
type TurnDir = 1 | -1;
type Layer = -1 | 0 | 1;
type Face = "U" | "D" | "L" | "R" | "F" | "B";

type Move = {
  axis: Axis;
  layer: Layer;
  dir: TurnDir;
};

type ActiveMove = {
  move: Move;
  progress: number;
  cubieIds: string[];
};

type CubeControllerProps = {
  queueRef: MutableRefObject<Move[]>;
  draggingRef: MutableRefObject<boolean>;
  quality: "high" | "low";
};

const SPACING = 1.04;
const HALF_TURN = Math.PI / 2;

const RANDOM_MOVES: Move[] = [
  { axis: "y", layer: 1, dir: 1 },
  { axis: "y", layer: -1, dir: -1 },
  { axis: "x", layer: 1, dir: 1 },
  { axis: "x", layer: -1, dir: -1 },
  { axis: "z", layer: 1, dir: 1 },
  { axis: "z", layer: -1, dir: -1 },
];

type CubieDef = {
  id: string;
  coords: [number, number, number];
  faces: Face[];
};

type CubeTextureKey =
  | "microNoise"
  | "pearlNoise"
  | "grainX"
  | "grainY"
  | "frostNoise"
  | "plasmaNoise"
  | "carbonWeave"
  | "circuitLines";

type FaceMaterial = {
  color: string;
  roughness: number;
  metalness: number;
  emissive: string;
  emissiveIntensity: number;
  envMapIntensity: number;
  clearcoat: number;
  clearcoatRoughness: number;
  roughnessMapKey?: CubeTextureKey;
  metalnessMapKey?: CubeTextureKey;
  bumpMapKey?: CubeTextureKey;
  bumpScale?: number;
  ior?: number;
  transmission?: number;
  thickness?: number;
  attenuationColor?: string;
  attenuationDistance?: number;
  iridescence?: number;
  iridescenceIOR?: number;
  iridescenceThicknessRange?: [number, number];
  sheen?: number;
  sheenColor?: string;
  sheenRoughness?: number;
  specularIntensity?: number;
  specularColor?: string;
  emissiveMapKey?: CubeTextureKey;
  opacity?: number;
  transparent?: boolean;
  flatShading?: boolean;
};

function buildCubies(): CubieDef[] {
  const cubies: CubieDef[] = [];

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        if (x === 0 && y === 0 && z === 0) {
          continue;
        }

        const faces: Face[] = [];
        if (y === 1) faces.push("U");
        if (y === -1) faces.push("D");
        if (x === -1) faces.push("L");
        if (x === 1) faces.push("R");
        if (z === 1) faces.push("F");
        if (z === -1) faces.push("B");

        cubies.push({
          id: `${x}${y}${z}`,
          coords: [x, y, z],
          faces,
        });
      }
    }
  }

  return cubies;
}

const CUBIES = buildCubies();
const MATERIAL_ORDER: Face[] = ["R", "L", "U", "D", "F", "B"];

type CubeTextureSet = Record<CubeTextureKey, Texture | null>;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createCanvasTexture(
  size: number,
  draw: (context: CanvasRenderingContext2D, size: number) => void,
): Texture | null {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  draw(context, size);

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2.6, 2.6);
  texture.needsUpdate = true;
  return texture;
}

function createBrushedTexture(axis: "x" | "y", size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const image = context.createImageData(resolvedSize, resolvedSize);
    const data = image.data;

    for (let y = 0; y < resolvedSize; y += 1) {
      for (let x = 0; x < resolvedSize; x += 1) {
        const line = axis === "x" ? x : y;
        const cross = axis === "x" ? y : x;
        const macro = Math.sin(line * 0.19) * 20 + Math.sin(line * 0.53) * 11;
        const micro = Math.sin(line * 1.9 + cross * 0.05) * 8;
        const crossNoise = Math.sin(cross * 0.13) * 4;
        const value = clamp(126 + macro + micro + crossNoise + Math.random() * 14, 48, 228);
        const index = (y * resolvedSize + x) * 4;

        data[index] = value;
        data[index + 1] = value;
        data[index + 2] = value;
        data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createMicroNoiseTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const image = context.createImageData(resolvedSize, resolvedSize);
    const data = image.data;

    for (let y = 0; y < resolvedSize; y += 1) {
      for (let x = 0; x < resolvedSize; x += 1) {
        const broad =
          Math.sin(x * 0.14) * 18 +
          Math.cos(y * 0.17) * 16 +
          Math.sin((x + y) * 0.08) * 10;
        const micro = (Math.random() - 0.5) * 32;
        const value = clamp(138 + broad + micro, 58, 226);
        const index = (y * resolvedSize + x) * 4;

        data[index] = value;
        data[index + 1] = value;
        data[index + 2] = value;
        data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createPearlNoiseTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const gradient = context.createLinearGradient(0, 0, resolvedSize, resolvedSize);
    gradient.addColorStop(0, "rgb(242, 234, 255)");
    gradient.addColorStop(0.5, "rgb(206, 174, 255)");
    gradient.addColorStop(1, "rgb(255, 241, 255)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, resolvedSize, resolvedSize);

    context.globalAlpha = 0.18;
    for (let i = 0; i < resolvedSize * 0.18; i += 1) {
      const x = Math.random() * resolvedSize;
      const y = Math.random() * resolvedSize;
      const radius = 6 + Math.random() * (resolvedSize * 0.08);

      context.fillStyle = i % 2 === 0 ? "white" : "rgba(140,0,255,0.75)";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  });
}

function createFrostNoiseTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    context.fillStyle = "rgb(176, 176, 176)";
    context.fillRect(0, 0, resolvedSize, resolvedSize);

    context.globalAlpha = 0.14;
    for (let i = 0; i < resolvedSize * 0.22; i += 1) {
      const x = Math.random() * resolvedSize;
      const y = Math.random() * resolvedSize;
      const width = 4 + Math.random() * (resolvedSize * 0.12);
      const height = 4 + Math.random() * (resolvedSize * 0.05);

      context.fillStyle = i % 2 === 0 ? "white" : "rgba(90,90,90,0.8)";
      context.beginPath();
      context.ellipse(x, y, width, height, Math.random() * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  });
}

function createPlasmaTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const image = context.createImageData(resolvedSize, resolvedSize);
    const data = image.data;

    for (let y = 0; y < resolvedSize; y += 1) {
      for (let x = 0; x < resolvedSize; x += 1) {
        const nx = x / resolvedSize;
        const ny = y / resolvedSize;
        const wave =
          Math.sin(nx * 18 + ny * 7) +
          Math.cos(nx * 9 - ny * 16) +
          Math.sin((nx + ny) * 20);
        const energy = clamp(118 + wave * 38 + Math.sin(nx * 54) * 10, 32, 248);
        const index = (y * resolvedSize + x) * 4;

        data[index] = energy;
        data[index + 1] = energy;
        data[index + 2] = energy;
        data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createCarbonWeaveTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const image = context.createImageData(resolvedSize, resolvedSize);
    const data = image.data;
    const cell = Math.max(6, Math.floor(resolvedSize / 18));

    for (let y = 0; y < resolvedSize; y += 1) {
      for (let x = 0; x < resolvedSize; x += 1) {
        const tx = x % cell;
        const ty = y % cell;
        const diagonalA = tx < cell / 2 ? 28 : -8;
        const diagonalB = ty < cell / 2 ? 22 : -6;
        const weave = (tx + ty) % cell < cell / 2 ? 16 : -10;
        const value = clamp(86 + diagonalA + diagonalB + weave, 36, 196);
        const index = (y * resolvedSize + x) * 4;

        data[index] = value;
        data[index + 1] = value;
        data[index + 2] = value;
        data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  });
}

function createCircuitLinesTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, resolvedSize, resolvedSize);

    const lines = Math.max(10, Math.floor(resolvedSize / 10));
    context.strokeStyle = "white";
    context.lineWidth = Math.max(1, resolvedSize / 96);
    context.lineCap = "round";

    for (let i = 0; i < lines; i += 1) {
      const startX = Math.random() * resolvedSize;
      const startY = Math.random() * resolvedSize;
      const horizontal = Math.random() > 0.5;
      const length = resolvedSize * (0.12 + Math.random() * 0.32);

      context.beginPath();
      context.moveTo(startX, startY);

      if (horizontal) {
        const midX = clamp(startX + length * 0.55, 0, resolvedSize);
        const endY = clamp(startY + (Math.random() - 0.5) * resolvedSize * 0.22, 0, resolvedSize);
        context.lineTo(midX, startY);
        context.lineTo(midX, endY);
        context.lineTo(clamp(midX + length * 0.45, 0, resolvedSize), endY);
      } else {
        const midY = clamp(startY + length * 0.55, 0, resolvedSize);
        const endX = clamp(startX + (Math.random() - 0.5) * resolvedSize * 0.22, 0, resolvedSize);
        context.lineTo(startX, midY);
        context.lineTo(endX, midY);
        context.lineTo(endX, clamp(midY + length * 0.45, 0, resolvedSize));
      }

      context.stroke();

      context.fillStyle = "white";
      context.beginPath();
      context.arc(startX, startY, context.lineWidth * 1.4, 0, Math.PI * 2);
      context.fill();
    }
  });
}

function createCubeTextures(quality: "high" | "low"): CubeTextureSet {
  const size = quality === "high" ? 168 : 96;

  return {
    microNoise: createMicroNoiseTexture(size),
    pearlNoise: createPearlNoiseTexture(size),
    grainX: createBrushedTexture("x", size),
    grainY: createBrushedTexture("y", size),
    frostNoise: createFrostNoiseTexture(size),
    plasmaNoise: createPlasmaTexture(size),
    carbonWeave: createCarbonWeaveTexture(size),
    circuitLines: createCircuitLinesTexture(size),
  };
}

function disposeCubeTextures(textures: CubeTextureSet) {
  Object.values(textures).forEach((texture) => {
    texture?.dispose();
  });
}

function createInnerFaceMaterial(quality: "high" | "low"): FaceMaterial {
  return {
    color: quality === "high" ? "#120d19" : "#110c17",
    roughness: 0.54,
    metalness: 0.14,
    emissive: "#05030a",
    emissiveIntensity: 0.03,
    envMapIntensity: quality === "high" ? 0.42 : 0.32,
    clearcoat: 0.12,
    clearcoatRoughness: 0.62,
    roughnessMapKey: "microNoise",
    bumpMapKey: "microNoise",
    bumpScale: quality === "high" ? 0.025 : 0.014,
    specularIntensity: 0.38,
    specularColor: "#cdb7ff",
  };
}

function createOuterFaceMaterials(quality: "high" | "low"): Record<Face, FaceMaterial> {
  const isHigh = quality === "high";

  return {
    // Liquid Chrome Purple
    R: {
      color: "#dccfff",
      roughness: 0.05,
      metalness: 1,
      emissive: "#2d0d5f",
      emissiveIntensity: isHigh ? 0.11 : 0.07,
      envMapIntensity: isHigh ? 2.1 : 1.64,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      roughnessMapKey: "microNoise",
      metalnessMapKey: "microNoise",
      bumpMapKey: "microNoise",
      bumpScale: isHigh ? 0.018 : 0.01,
      specularIntensity: 1,
      specularColor: "#ffffff",
    },
    // Carbon Fiber Neon
    L: {
      color: "#0b0912",
      roughness: 0.56,
      metalness: 0.24,
      emissive: "#8c00ff",
      emissiveIntensity: isHigh ? 0.26 : 0.16,
      envMapIntensity: isHigh ? 0.92 : 0.7,
      clearcoat: 0.48,
      clearcoatRoughness: 0.22,
      roughnessMapKey: "carbonWeave",
      bumpMapKey: "carbonWeave",
      bumpScale: isHigh ? 0.045 : 0.024,
      emissiveMapKey: "circuitLines",
      specularIntensity: 0.72,
      specularColor: "#e7dbff",
    },
    // Holographic Glass
    U: {
      color: "#f4ebff",
      roughness: 0.16,
      metalness: 0.04,
      emissive: "#6f49b8",
      emissiveIntensity: isHigh ? 0.07 : 0.05,
      envMapIntensity: isHigh ? 1.08 : 0.82,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      roughnessMapKey: "pearlNoise",
      bumpMapKey: "pearlNoise",
      bumpScale: isHigh ? 0.02 : 0.012,
      transmission: isHigh ? 0.82 : 0.46,
      thickness: isHigh ? 1.1 : 0.62,
      attenuationColor: "#c17cff",
      attenuationDistance: isHigh ? 1.42 : 0.94,
      ior: 1.34,
      iridescence: isHigh ? 0.72 : 0.34,
      iridescenceIOR: 1.28,
      iridescenceThicknessRange: isHigh ? [220, 720] : [120, 320],
      sheen: isHigh ? 0.58 : 0.34,
      sheenColor: "#fff7ff",
      sheenRoughness: 0.28,
      specularIntensity: 1,
      specularColor: "#fff6ff",
      transparent: true,
      opacity: 0.98,
    },
    // Frosted Tech Glass
    D: {
      color: "#dbc7ff",
      roughness: 0.68,
      metalness: 0.04,
      emissive: "#312047",
      emissiveIntensity: isHigh ? 0.04 : 0.03,
      envMapIntensity: isHigh ? 0.76 : 0.58,
      clearcoat: 0.34,
      clearcoatRoughness: 0.44,
      roughnessMapKey: "frostNoise",
      bumpMapKey: "frostNoise",
      bumpScale: isHigh ? 0.03 : 0.018,
      transmission: isHigh ? 0.52 : 0.24,
      thickness: isHigh ? 0.56 : 0.3,
      attenuationColor: "#b789ff",
      attenuationDistance: isHigh ? 0.86 : 0.58,
      ior: 1.2,
      sheen: isHigh ? 0.14 : 0.08,
      sheenColor: "#f8f2ff",
      sheenRoughness: 0.72,
      specularIntensity: 0.62,
      specularColor: "#eee4ff",
      transparent: true,
      opacity: 0.94,
    },
    // Neon Core
    F: {
      color: "#26122f",
      roughness: 0.18,
      metalness: 0.34,
      emissive: "#a529ff",
      emissiveIntensity: isHigh ? 0.82 : 0.56,
      envMapIntensity: isHigh ? 1.06 : 0.82,
      clearcoat: 0.76,
      clearcoatRoughness: 0.16,
      roughnessMapKey: "microNoise",
      bumpMapKey: "microNoise",
      bumpScale: isHigh ? 0.024 : 0.014,
      emissiveMapKey: "circuitLines",
      specularIntensity: 0.86,
      specularColor: "#f7e9ff",
    },
    // Energy Plasma Panel
    B: {
      color: "#140a1f",
      roughness: 0.3,
      metalness: 0.18,
      emissive: "#d14dff",
      emissiveIntensity: isHigh ? 0.68 : 0.44,
      envMapIntensity: isHigh ? 0.98 : 0.76,
      clearcoat: 0.4,
      clearcoatRoughness: 0.26,
      roughnessMapKey: "plasmaNoise",
      bumpMapKey: "plasmaNoise",
      bumpScale: isHigh ? 0.038 : 0.022,
      emissiveMapKey: "plasmaNoise",
      sheen: isHigh ? 0.18 : 0.1,
      sheenColor: "#f0d8ff",
      sheenRoughness: 0.58,
      specularIntensity: 0.72,
      specularColor: "#efdfff",
    },
  };
}

function linearFaceTint(face: Face, coords: [number, number, number]): number {
  const [x, y, z] = coords;

  if (face === "F" || face === "B") {
    return x * 0.07;
  }

  if (face === "R" || face === "L") {
    return y * 0.06;
  }

  return z * 0.05;
}

function materialForFace(
  face: Face,
  coords: [number, number, number],
  presets: Record<Face, FaceMaterial>,
): FaceMaterial {
  const base = presets[face];
  const tint = linearFaceTint(face, coords);
  const color = new Color(base.color);
  color.offsetHSL(0, 0, tint);

  return {
    ...base,
    color: color.getStyle(),
    roughness: clamp(base.roughness - tint * 0.18, 0.04, 0.96),
    emissiveIntensity: Math.max(0.03, base.emissiveIntensity + Math.abs(tint) * 0.05),
    envMapIntensity: Math.max(0.24, base.envMapIntensity + Math.abs(tint) * 0.12),
  };
}

function textureFromKey(key: CubeTextureKey | undefined, textures: CubeTextureSet): Texture | undefined {
  if (!key) {
    return undefined;
  }

  return textures[key] ?? undefined;
}

function quarterRound(value: number) {
  return Math.round(value / HALF_TURN) * HALF_TURN;
}

function randomMove(): Move {
  const source = RANDOM_MOVES[Math.floor(Math.random() * RANDOM_MOVES.length)];
  return {
    ...source,
    dir: Math.random() > 0.5 ? source.dir : (source.dir * -1) as TurnDir,
  };
}

function CubeController({ queueRef, draggingRef, quality }: CubeControllerProps) {
  const cubeGroupRef = useRef<Group>(null);
  const rootRef = useRef<Group>(null);
  const pivotRef = useRef<Group>(null);
  const cubieRefs = useRef<Record<string, Group>>({});
  const activeMoveRef = useRef<ActiveMove | null>(null);
  const idleTimerRef = useRef(0);
  const nextMoveDelayRef = useRef(0.7);
  const cubeTextures = useMemo(() => createCubeTextures(quality), [quality]);
  const outerFaceMaterials = useMemo(() => createOuterFaceMaterials(quality), [quality]);
  const innerFaceMaterial = useMemo(() => createInnerFaceMaterial(quality), [quality]);

  useEffect(() => {
    if (!cubeGroupRef.current) {
      return;
    }

    cubeGroupRef.current.rotation.set(-0.47, 0.66, 0);
    cubeGroupRef.current.scale.setScalar(0.84);
  }, []);

  useEffect(() => {
    return () => {
      disposeCubeTextures(cubeTextures);
    };
  }, [cubeTextures]);

  const startMove = (move: Move) => {
    const root = rootRef.current;
    const pivot = pivotRef.current;

    if (!root || !pivot) {
      return;
    }

    pivot.rotation.set(0, 0, 0);
    pivot.position.set(0, 0, 0);

    const cubieIds = Object.entries(cubieRefs.current)
      .filter(([, cubie]) => {
        const axisValue =
          move.axis === "x"
            ? cubie.position.x
            : move.axis === "y"
              ? cubie.position.y
              : cubie.position.z;
        return Math.round(axisValue / SPACING) === move.layer;
      })
      .map(([id]) => id);

    cubieIds.forEach((id) => {
      const cubie = cubieRefs.current[id];
      if (cubie) {
        pivot.attach(cubie);
      }
    });

    activeMoveRef.current = {
      move,
      progress: 0,
      cubieIds,
    };
  };

  const finalizeMove = () => {
    const activeMove = activeMoveRef.current;
    const root = rootRef.current;
    const pivot = pivotRef.current;

    if (!activeMove || !root || !pivot) {
      activeMoveRef.current = null;
      return;
    }

    activeMove.cubieIds.forEach((id) => {
      const cubie = cubieRefs.current[id];

      if (!cubie) {
        return;
      }

      root.attach(cubie);
      cubie.position.set(
        Math.round(cubie.position.x / SPACING) * SPACING,
        Math.round(cubie.position.y / SPACING) * SPACING,
        Math.round(cubie.position.z / SPACING) * SPACING,
      );

      const euler = new Euler().setFromQuaternion(cubie.quaternion, "XYZ");
      cubie.rotation.set(
        quarterRound(euler.x),
        quarterRound(euler.y),
        quarterRound(euler.z),
      );
    });

    pivot.rotation.set(0, 0, 0);
    activeMoveRef.current = null;
  };

  useFrame((_, delta) => {
    const cubeGroup = cubeGroupRef.current;
    const pivot = pivotRef.current;

    if (!cubeGroup || !pivot) {
      return;
    }

    if (!activeMoveRef.current && queueRef.current.length > 0) {
      const move = queueRef.current.shift();
      if (move) {
        startMove(move);
      }
    }

    if (!draggingRef.current) {
      cubeGroup.rotation.y += delta * 0.18;
      cubeGroup.rotation.x = MathUtils.lerp(cubeGroup.rotation.x, -0.47, 0.05);
      cubeGroup.rotation.z = MathUtils.lerp(cubeGroup.rotation.z, 0, 0.05);
    }

    const activeMove = activeMoveRef.current;

    if (activeMove) {
      activeMove.progress = Math.min(1, activeMove.progress + delta * 2.5);
      const angle = activeMove.progress * HALF_TURN * activeMove.move.dir;
      pivot.rotation.set(
        activeMove.move.axis === "x" ? angle : 0,
        activeMove.move.axis === "y" ? angle : 0,
        activeMove.move.axis === "z" ? angle : 0,
      );

      if (activeMove.progress >= 1) {
        finalizeMove();
      }
      return;
    }

    if (!draggingRef.current) {
      idleTimerRef.current += delta;
      if (idleTimerRef.current >= nextMoveDelayRef.current) {
        queueRef.current.push(randomMove());
        idleTimerRef.current = 0;
        nextMoveDelayRef.current = 0.5 + Math.random() * 1.1;
      }
    }
  });

  return (
    <group ref={cubeGroupRef}>
      <group ref={rootRef}>
        {CUBIES.map((cubie) => (
          <group
            key={cubie.id}
            ref={(node) => {
              if (node) {
                cubieRefs.current[cubie.id] = node;
              }
            }}
            position={[
              cubie.coords[0] * SPACING,
              cubie.coords[1] * SPACING,
              cubie.coords[2] * SPACING,
            ]}
          >
            <mesh>
              <boxGeometry args={[0.92, 0.92, 0.92]} />
              {MATERIAL_ORDER.map((face, index) => {
                const material = cubie.faces.includes(face)
                  ? materialForFace(face, cubie.coords, outerFaceMaterials)
                  : innerFaceMaterial;

                return (
                  <meshPhysicalMaterial
                    key={`${cubie.id}-mat-${face}`}
                    attach={`material-${index}`}
                    color={material.color}
                    roughness={material.roughness}
                    metalness={material.metalness}
                    emissive={material.emissive}
                    emissiveIntensity={material.emissiveIntensity}
                    envMapIntensity={material.envMapIntensity}
                    clearcoat={material.clearcoat}
                    clearcoatRoughness={material.clearcoatRoughness}
                    roughnessMap={textureFromKey(material.roughnessMapKey, cubeTextures)}
                    metalnessMap={textureFromKey(material.metalnessMapKey, cubeTextures)}
                    bumpMap={textureFromKey(material.bumpMapKey, cubeTextures)}
                    bumpScale={material.bumpScale}
                    emissiveMap={textureFromKey(material.emissiveMapKey, cubeTextures)}
                    transmission={material.transmission}
                    thickness={material.thickness}
                    attenuationColor={material.attenuationColor}
                    attenuationDistance={material.attenuationDistance}
                    ior={material.ior}
                    iridescence={material.iridescence}
                    iridescenceIOR={material.iridescenceIOR}
                    iridescenceThicknessRange={material.iridescenceThicknessRange}
                    sheen={material.sheen}
                    sheenColor={material.sheenColor}
                    sheenRoughness={material.sheenRoughness}
                    specularIntensity={material.specularIntensity}
                    specularColor={material.specularColor}
                    opacity={material.opacity}
                    transparent={Boolean(material.transparent || material.opacity !== undefined)}
                    flatShading={material.flatShading}
                  />
                );
              })}
            </mesh>
          </group>
        ))}
      </group>
      <group ref={pivotRef} />
    </group>
  );
}

type HeroCanvasProps = {
  className?: string;
  frameClassName?: string;
  hitAreaClassName?: string;
  onContextLost?: () => void;
  quality?: "high" | "low";
};

export function HeroCanvas({
  className,
  frameClassName,
  hitAreaClassName,
  onContextLost,
  quality = "high",
}: HeroCanvasProps) {
  const queueRef = useRef<Move[]>([]);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const draggingRef = useRef(false);
  const cleanupContextRef = useRef<(() => void) | null>(null);
  const [interactionElement, setInteractionElement] = useState<HTMLDivElement | null>(null);

  const enableSelectionGuard = () => {
    document.body.classList.add("cube-drag-active");
  };

  const disableSelectionGuard = () => {
    document.body.classList.remove("cube-drag-active");
  };

  useEffect(() => {
    return () => {
      cleanupContextRef.current?.();
      disableSelectionGuard();
    };
  }, []);

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <div
          ref={setInteractionElement}
          className={cn("cube-hit-area", hitAreaClassName)}
          onDragStart={(event) => {
            event.preventDefault();
          }}
          onPointerCancelCapture={disableSelectionGuard}
          onPointerDownCapture={(event) => {
            event.preventDefault();
            enableSelectionGuard();
          }}
          onPointerUpCapture={disableSelectionGuard}
        />
        <div className={cn("cube-canvas-frame", frameClassName)}>
          <Canvas
            eventSource={interactionElement ?? undefined}
            gl={{
              antialias: false,
              alpha: true,
              depth: true,
              stencil: false,
              powerPreference: "low-power",
            }}
            camera={{ position: [5.4, 4.1, 5.7], fov: 34 }}
            dpr={quality === "high" ? [1, 1.1] : [0.8, 1]}
            onCreated={({ gl }) => {
              cleanupContextRef.current?.();
              gl.setClearColor("#000000", 0);
              gl.toneMapping = ACESFilmicToneMapping;
              gl.toneMappingExposure = quality === "high" ? 1.18 : 1.08;

              const canvas = gl.domElement;
              const handleLost = (event: Event) => {
                event.preventDefault();
                onContextLost?.();
              };

              canvas.addEventListener("webglcontextlost", handleLost, false);
              cleanupContextRef.current = () => {
                canvas.removeEventListener("webglcontextlost", handleLost, false);
              };
            }}
          >
            <ambientLight intensity={quality === "high" ? 0.72 : 0.62} />
            <hemisphereLight
              intensity={quality === "high" ? 0.56 : 0.46}
              color="#efe6ff"
              groundColor="#1c1428"
            />
            <directionalLight
              position={[5.8, 6.3, 4.4]}
              intensity={quality === "high" ? 1.86 : 1.56}
              color="#f4edff"
            />
            <directionalLight
              position={[-4.8, 3.2, -3.8]}
              intensity={quality === "high" ? 0.72 : 0.56}
              color="#cbb6ff"
            />
            <pointLight
              position={[-4.8, -2.4, 3]}
              intensity={quality === "high" ? 0.68 : 0.52}
              color="#ddcfff"
            />
            <pointLight
              position={[3.4, -1.8, -3.2]}
              intensity={quality === "high" ? 0.38 : 0.28}
              color="#8c00ff"
            />
            <pointLight
              position={[0.8, 2.8, -4.6]}
              intensity={quality === "high" ? 0.34 : 0.25}
              color="#a529ff"
            />

            <CubeController queueRef={queueRef} draggingRef={draggingRef} quality={quality} />

            <OrbitControls
              ref={controlsRef}
              domElement={interactionElement ?? undefined}
              makeDefault
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.08}
              minDistance={6.2}
              maxDistance={9.2}
              onStart={() => {
                enableSelectionGuard();
                draggingRef.current = true;
              }}
              onEnd={() => {
                disableSelectionGuard();
                draggingRef.current = false;
              }}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
