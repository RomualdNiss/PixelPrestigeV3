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
const REST_ROTATION: [number, number, number] = [-1.05, -2.15, 0];

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
  | "marbleVein"
  | "grainY"
  | "mineralNoise"
  | "frostNoise";

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
  texture.repeat.set(1, 1);
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

// Replace createPearlNoiseTexture — smooth radial gradient instead of random blobs
function createMarbleVeinTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const base = context.createLinearGradient(0, 0, resolvedSize, resolvedSize);
    base.addColorStop(0, "#fbfbf9");
    base.addColorStop(0.45, "#ece9e4");
    base.addColorStop(1, "#d7d3cd");
    context.fillStyle = base;
    context.fillRect(0, 0, resolvedSize, resolvedSize);

    for (let vein = 0; vein < 6; vein += 1) {
      const startY = resolvedSize * (0.12 + vein * 0.14) + (Math.random() - 0.5) * resolvedSize * 0.04;
      context.beginPath();
      context.moveTo(-resolvedSize * 0.05, startY);

      for (let step = 1; step <= 7; step += 1) {
        const x = (resolvedSize / 7) * step;
        const y =
          startY +
          Math.sin(step * 0.95 + vein) * resolvedSize * 0.038 +
          (Math.random() - 0.5) * resolvedSize * 0.028;
        context.lineTo(x, y);
      }

      context.strokeStyle = vein % 2 === 0 ? "rgba(122, 124, 130, 0.16)" : "rgba(255, 255, 255, 0.11)";
      context.lineWidth = Math.max(1, resolvedSize / 110);
      context.stroke();
    }

    const haze = context.createLinearGradient(0, 0, 0, resolvedSize);
    haze.addColorStop(0, "rgba(255, 255, 255, 0.12)");
    haze.addColorStop(0.45, "rgba(255, 255, 255, 0.02)");
    haze.addColorStop(1, "rgba(72, 74, 80, 0.05)");
    context.fillStyle = haze;
    context.fillRect(0, 0, resolvedSize, resolvedSize);
  });
}

// Replace createFrostNoiseTexture — smooth layered gradients instead of random ellipses
function createFrostNoiseTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    context.fillStyle = "rgb(188, 192, 198)";
    context.fillRect(0, 0, resolvedSize, resolvedSize);

    for (let i = 0; i < 7; i += 1) {
      const gradient = context.createLinearGradient(0, (resolvedSize / 7) * i, resolvedSize, (resolvedSize / 7) * (i + 1));
      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.028 + i * 0.006})`);
      gradient.addColorStop(0.5, "rgba(140, 146, 156, 0.05)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.024)");
      context.fillStyle = gradient;
      context.fillRect(0, (resolvedSize / 7) * i, resolvedSize, resolvedSize / 7);
    }
  });
}

/* Legacy electric texture generator kept commented out during the material refactor.
function createLightningTextureLegacy(size: number): Texture | null {
  return createCanvasTexture(size, (ctx, s) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, s, s);

    const drawBolt = (x1: number, y1: number, x2: number, y2: number, width: number, depth: number) => {
      if (depth === 0 || width < 0.4) return;

      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * (s * 0.18);
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * (s * 0.18);

      // Core bright line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(mx, my);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(180, 220, 255, ${0.6 + depth * 0.08})`;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();

      // Outer glow pass
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(mx, my);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(80, 160, 255, ${0.18 + depth * 0.04})`;
      ctx.lineWidth = width * 3.5;
      ctx.stroke();

      // Recurse both halves + occasional branch
      drawBolt(x1, y1, mx, my, width * 0.62, depth - 1);
      drawBolt(mx, my, x2, y2, width * 0.62, depth - 1);

      if (Math.random() > 0.52) {
        const branchX = mx + (Math.random() - 0.5) * s * 0.35;
        const branchY = my + (Math.random() - 0.5) * s * 0.35;
        drawBolt(mx, my, branchX, branchY, width * 0.38, depth - 2);
      }
    };

    // Draw 3–4 main bolts from different origins
    const bolts = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < bolts; i++) {
      const x1 = Math.random() * s;
      const y1 = Math.random() * s * 0.3;
      const x2 = x1 + (Math.random() - 0.5) * s * 0.5;
      const y2 = s * 0.7 + Math.random() * s * 0.3;
      drawBolt(x1, y1, x2, y2, s * 0.022, 6);
    }

    // Subtle electric haze overlay
    const haze = ctx.createRadialGradient(s * 0.5, s * 0.5, 0, s * 0.5, s * 0.5, s * 0.6);
    haze.addColorStop(0,   "rgba(40, 100, 200, 0.12)");
    haze.addColorStop(0.5, "rgba(20,  60, 160, 0.06)");
    haze.addColorStop(1,   "rgba(0,    0,   0, 0)");
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, s, s);
  });
}
*/

/* Legacy plasma texture generator kept commented out during the material refactor.
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
*/

/* Legacy carbon weave texture generator kept commented out during the material refactor.
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
*/

/* Legacy circuit texture generator kept commented out during the material refactor.
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
*/

function createMineralNoiseTexture(size: number): Texture | null {
  return createCanvasTexture(size, (context, resolvedSize) => {
    const image = context.createImageData(resolvedSize, resolvedSize);
    const data = image.data;

    for (let y = 0; y < resolvedSize; y += 1) {
      for (let x = 0; x < resolvedSize; x += 1) {
        const broad =
          Math.sin(x * 0.09) * 15 +
          Math.cos(y * 0.11) * 13 +
          Math.sin((x - y) * 0.05) * 10;
        const grit = (Math.random() - 0.5) * 18;
        const value = clamp(132 + broad + grit, 74, 196);
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

function createCubeTextures(quality: "high" | "low"): CubeTextureSet {
  const size = quality === "high" ? 168 : 96;

  return {
    microNoise: createMicroNoiseTexture(size),
    marbleVein: createMarbleVeinTexture(size),
    grainY: createBrushedTexture("y", size),
    mineralNoise: createMineralNoiseTexture(size),
    frostNoise: createFrostNoiseTexture(size),
  };
}

function disposeCubeTextures(textures: CubeTextureSet) {
  Object.values(textures).forEach((texture) => {
    texture?.dispose();
  });
}

// ─── OUTER FACE MATERIALS ────────────────────────────────────────────────────

function createOuterFaceMaterials(quality: "high" | "low"): Record<Face, FaceMaterial> {
  const isHigh = quality === "high";

  return {

    // ── R · DARK IRIDESCENT METAL ────────────────────────────────────────────────
    // Deep gunmetal base so it never blows out to white. Iridescence gives
    // the color-shift without washing everything out.
    R: {
      color: "#1a1428",           // very dark base — env map adds brightness
      roughness: isHigh ? 0.1 : 0.16,
      metalness: 0.02,
      emissive: "#0b0d10",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 1.4 : 1.1,   // was 3.2 — that was blowing it out
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      roughnessMapKey: "microNoise",
      metalnessMapKey: undefined,
      bumpMapKey: "microNoise",
      bumpScale: isHigh ? 0.01 : 0.006,
      iridescence: 0,
      iridescenceIOR: 1.5,                    // was 2.2 — caused white saturation
      iridescenceThicknessRange: undefined,
      specularIntensity: 0.96,
      specularColor: "#eef2f8",
    },

    // ── L · CARBON NEON ──────────────────────────────────────────────────────
    // Matte-black carbon weave that glows deep purple from within.
    // Circuit line emissive map creates a PCB trace effect.
    // Moderate clearcoat so highlights glide across the weave.
    L: {
      color: "#6f747a",
      roughness: isHigh ? 0.9 : 0.92,
      metalness: 0.02,
      emissive: "#111317",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 0.18 : 0.14,
      clearcoat: 0.02,
      clearcoatRoughness: 0.96,
      roughnessMapKey: "mineralNoise",
      bumpMapKey: "mineralNoise",
      bumpScale: isHigh ? 0.018 : 0.011,
      specularIntensity: 0.08,
      specularColor: "#d4d7dc",
    },

    // ── U · HOLOGRAPHIC GLASS ────────────────────────────────────────────────
    // Fully transmissive crystal. You can see through it. The attenuation
    // tints deep-path light violet, iridescence adds rainbow oil-slick
    // sheen at grazing angles, and the pearl bump gives it micro-texture.
    U: {
      color: "#ffffff",
      roughness: isHigh ? 0.05 : 0.1,
      metalness: 0,
      emissive: "#111317",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 1.18 : 0.92,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      roughnessMapKey: "microNoise",
      bumpMapKey: "microNoise",
      bumpScale: isHigh ? 0.003 : 0.0015,
      transmission: isHigh ? 0.97 : 0.74,
      thickness: isHigh ? 1.45 : 0.82,
      attenuationColor: "#f8fafc",
      attenuationDistance: isHigh ? 2.4 : 1.55,
      ior: 1.48,
      iridescence: 0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: undefined,
      sheen: 0,
      sheenColor: "#ffffff",
      sheenRoughness: 1,
      specularIntensity: 0.98,
      specularColor: "#ffffff",
      transparent: true,
      opacity: 0.93,
    },

    // ── D · FROSTED GLOW GLASS ───────────────────────────────────────────────
    // Semi-opaque slab like backlit etched acrylic. The frost roughness
    // blurs transmitted light into a soft halo. Inner purple emissive
    // leaks through the frost, making it look lit from behind.
    D: {
      color: "#eef1f4",
      roughness: isHigh ? 0.78 : 0.82,
      metalness: 0,
      emissive: "#111317",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 0.36 : 0.28,
      clearcoat: 0.12,
      clearcoatRoughness: 0.72,
      roughnessMapKey: "frostNoise",
      bumpMapKey: "frostNoise",
      bumpScale: isHigh ? 0.022 : 0.013,
      transmission: isHigh ? 0.46 : 0.24,
      thickness: isHigh ? 0.68 : 0.38,
      attenuationColor: "#f5f7fa",
      attenuationDistance: isHigh ? 1.16 : 0.72,
      ior: 1.16,
      sheen: 0,
      sheenColor: "#ffffff",
      sheenRoughness: 1,
      specularIntensity: 0.2,
      specularColor: "#ffffff",
      transparent: true,
      opacity: 0.92,
    },

    // ── F · NEON CORE ────────────────────────────────────────────────────────
    // The brightest face. Near-black base with maximum-intensity purple
    // emissive driven by the circuit map — hot traces look like they're
    // conducting electricity. High clearcoat creates reflective top layer
    // over the glowing surface, like epoxy over an LED panel.
    F: {
      color: "#f1efea",
      roughness: isHigh ? 0.38 : 0.44,
      metalness: 0.02,
      emissive: "#111317",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 0.52 : 0.4,
      clearcoat: 0.22,
      clearcoatRoughness: 0.42,
      roughnessMapKey: "microNoise",
      bumpMapKey: "marbleVein",
      bumpScale: isHigh ? 0.014 : 0.008,
      specularIntensity: 0.28,
      specularColor: "#ffffff",
    },

    // ── B · ELECTRIC STORM ───────────────────────────────────────────────────────
    // Near-black void with white-blue lightning bolts crackling across it.
    // emissiveMap drives the bolt glow, clearcoat adds a glass-panel sheen.
    B: {
      color: "#3a4047",
      roughness: isHigh ? 0.82 : 0.86,
      metalness: 0.03,
      emissive: "#101216",
      emissiveIntensity: 0,
      envMapIntensity: isHigh ? 0.22 : 0.18,
      clearcoat: 0.04,
      clearcoatRoughness: 0.92,
      roughnessMapKey: "mineralNoise",
      bumpMapKey: "mineralNoise",
      bumpScale: isHigh ? 0.016 : 0.01,
      specularIntensity: 0.1,
      specularColor: "#cfd4da",
    },
  };
}

// ─── INNER FACE MATERIAL ─────────────────────────────────────────────────────
// Visible where two cubies face each other — should look like a dark
// interior cavity, slightly reflective so the neon bleeds in.

function createInnerFaceMaterial(quality: "high" | "low"): FaceMaterial {
  return {
    color: quality === "high" ? "#171b21" : "#14181d",
    roughness: 0.88,
    metalness: 0.02,
    emissive: "#111317",
    emissiveIntensity: 0,
    envMapIntensity: quality === "high" ? 0.12 : 0.1,
    clearcoat: 0.02,
    clearcoatRoughness: 0.95,
    roughnessMapKey: "microNoise",
    bumpMapKey: "microNoise",
    bumpScale: quality === "high" ? 0.009 : 0.006,
    specularIntensity: 0.07,
    specularColor: "#c1c7cf",
  };
}

function linearFaceTint(face: Face, coords: [number, number, number]): number {
  const [x, y, z] = coords;

  if (face === "F" || face === "B") {
    return x * 0.018;
  }

  if (face === "R" || face === "L") {
    return y * 0.014;
  }

  return z * 0.012;
}

function materialForFace(
  face: Face,
  coords: [number, number, number],
  presets: Record<Face, FaceMaterial>,
): FaceMaterial {
  const base = presets[face];
  const tint = linearFaceTint(face, coords);
  const resolvedColor = face === "R" ? "#121317" : base.color;
  const color = new Color(resolvedColor);
  const envMapBase = face === "R" ? 0.78 : base.envMapIntensity;
  color.offsetHSL(0, 0, tint);

  return {
    ...base,
    color: color.getStyle(),
    roughness: clamp(base.roughness - tint * 0.06, 0.08, 0.96),
    emissiveIntensity:
      base.emissiveIntensity > 0 ? Math.max(0.008, base.emissiveIntensity + Math.abs(tint) * 0.01) : 0,
    envMapIntensity: Math.max(0.12, envMapBase + Math.abs(tint) * 0.04),
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

    cubeGroupRef.current.rotation.set(...REST_ROTATION);
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
      cubeGroup.rotation.x = MathUtils.lerp(cubeGroup.rotation.x, REST_ROTATION[0], 0.05);
      cubeGroup.rotation.z = MathUtils.lerp(cubeGroup.rotation.z, REST_ROTATION[2], 0.05);
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
            <ambientLight intensity={quality === "high" ? 0.72 : 0.58} />
            <hemisphereLight
              intensity={quality === "high" ? 0.42 : 0.34}
              color="#f3f5f7"
              groundColor="#181b20"
            />
            <directionalLight
              position={[5.8, 6.3, 4.4]}
              intensity={quality === "high" ? 2.05 : 1.68}
              color="#fcfdff"
            />
            <directionalLight
              position={[-4.8, 3.2, -3.8]}
              intensity={quality === "high" ? 0.56 : 0.44}
              color="#dde3ea"
            />
            <pointLight
              position={[-4.8, -2.4, 3]}
              intensity={quality === "high" ? 0.32 : 0.24}
              color="#dfe5ec"
            />
            <pointLight
              position={[3.8, 5.2, 4.6]}
              intensity={quality === "high" ? 1.32 : 0.96}
              color="#9052ff"
            />
            <pointLight
              position={[3.4, -1.8, -3.2]}
              intensity={quality === "high" ? 0.08 : 0.06}
              color="#6e6686"
            />
            <pointLight
              position={[0.8, 2.8, -4.6]}
              intensity={quality === "high" ? 0.06 : 0.04}
              color="#7c738f"
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
