import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SWARM_MODULES, generateShape } from "./swarm-data";

const COUNT_DESKTOP = 2400;
const COUNT_MOBILE = 1400;

// reusable scratch vectors (avoid per-frame allocations)
const _camDir = new THREE.Vector3();
const _toAnchor = new THREE.Vector3();

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function makeParticleTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.12, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(0.7, "rgba(255,255,255,0.25)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* Ambient cosmic dust drifting through the void */
function CosmicDust({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = rand(-9, 9);
      pos[i * 3 + 1] = rand(-4, 4);
      pos[i * 3 + 2] = rand(-5, 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        size={0.06}
        color="#ffe699"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface Cluster {
  home: Float32Array;
  geom: THREE.BufferGeometry;
  mat: THREE.PointsMaterial;
  hitGeom: THREE.BoxGeometry;
  hitMat: THREE.MeshBasicMaterial;
}

export function ParticleSwarmMatrix({
  explodedRef,
  hoveredIdxRef,
  labelRefs,
  onSelectChapter,
  onActivate,
  isMobile,
}: {
  explodedRef: React.MutableRefObject<boolean>;
  hoveredIdxRef: React.MutableRefObject<number | null>;
  labelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onSelectChapter: (id: string) => void;
  onActivate: () => void;
  isMobile: boolean;
}) {
  const { camera, size } = useThree();
  const rootRef = useRef<THREE.Group>(null);
  const anchorRefs = useRef<(THREE.Object3D | null)[]>([]);
  const startRef = useRef<number | null>(null);
  const burstRef = useRef<{ idx: number; t0: number | null }>({ idx: -1, t0: null });
  const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

  const particleTex = useMemo(makeParticleTexture, []);

  const anchorCallbacks = useMemo(
    () =>
      SWARM_MODULES.map((_, i) => (el: THREE.Object3D | null) => {
        anchorRefs.current[i] = el;
      }),
    [],
  );

  const clusters = useMemo<Cluster[]>(() => {
    return SWARM_MODULES.map((m) => {
      const local = generateShape(m.shape, count);
      const home = new Float32Array(count * 3);
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);

      const dim = hexToRGB(m.dim);
      const bright = hexToRGB(m.bright);

      for (let i = 0; i < count; i++) {
        home[i * 3] = local[i * 3] + m.x;
        home[i * 3 + 1] = local[i * 3 + 1];
        home[i * 3 + 2] = local[i * 3 + 2];

        // entry scatter around the cluster
        pos[i * 3] = m.x + rand(-2.4, 2.4);
        pos[i * 3 + 1] = rand(-2, 2);
        pos[i * 3 + 2] = rand(-1.4, 1.4);

        const b = 0.55 + Math.random() * 0.45;
        col[i * 3] = (dim[0] + (bright[0] - dim[0]) * b) / 255;
        col[i * 3 + 1] = (dim[1] + (bright[1] - dim[1]) * b) / 255;
        col[i * 3 + 2] = (dim[2] + (bright[2] - dim[2]) * b) / 255;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: isMobile ? 0.16 : 0.19,
        map: particleTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const hitGeom = new THREE.BoxGeometry(1.8, 1.6, 0.8);
      const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
      });

      return { home, geom, mat, hitGeom, hitMat };
    });
  }, [count, particleTex, isMobile]);

  // per-particle jitter direction + phase (kept outside geometry attributes)
  const jitter = useMemo(() => {
    const dir = new Float32Array(SWARM_MODULES.length * count * 3);
    const phase = new Float32Array(SWARM_MODULES.length * count);
    for (let c = 0; c < SWARM_MODULES.length; c++) {
      for (let i = 0; i < count; i++) {
        const dx = rand(-1, 1);
        const dy = rand(-1, 1);
        const dz = rand(-1, 1);
        const l = Math.hypot(dx, dy, dz) || 1;
        dir[(c * count + i) * 3] = dx / l;
        dir[(c * count + i) * 3 + 1] = dy / l;
        dir[(c * count + i) * 3 + 2] = dz / l;
        phase[c * count + i] = Math.random() * Math.PI * 2;
      }
    }
    return { dir, phase };
  }, [count]);

  useEffect(() => {
    return () => {
      particleTex.dispose();
      clusters.forEach((c) => {
        c.geom.dispose();
        c.mat.dispose();
        c.hitGeom.dispose();
        c.hitMat.dispose();
      });
    };
  }, [clusters, particleTex]);

  useFrame(({ clock }, delta) => {
    if (!rootRef.current) return;
    const d = Math.min(delta, 0.05);
    const t = clock.getElapsedTime();
    if (startRef.current === null) startRef.current = t;
    const age = t - startRef.current;
    const assembled = Math.min(age / 1.7, 1);
    const eased = assembled < 1 ? 1 - Math.pow(1 - assembled, 3) : 1;

    // 🔥 Burst (firework) — set on click, auto-clears after ~0.85s
    const burst = burstRef.current;
    if (burst.idx >= 0 && burst.t0 === null) burst.t0 = t;
    const burstActive = burst.idx >= 0 && burst.t0 !== null;
    const burstAge = burstActive ? t - (burst.t0 as number) : 0;
    if (burstActive && burstAge > 0.85) burstRef.current = { idx: -1, t0: null };

    // Zero-gravity float: gentle vertical bob + faint yaw drift.
    rootRef.current.position.y = -0.2 + Math.sin(t * 0.5) * 0.06;
    rootRef.current.rotation.y = Math.sin(t * 0.12) * 0.04;
    rootRef.current.updateMatrixWorld(true);

    camera.getWorldDirection(_camDir);

    const exploded = explodedRef.current;
    const hovered = hoveredIdxRef.current;
    const v = new THREE.Vector3();

    for (let i = 0; i < clusters.length; i++) {
      const c = clusters[i];
      const m = SWARM_MODULES[i];
      const isHover = hovered === i;
      const isBurst = burstActive && burst.idx === i;
      const isBurstOther = burstActive && burst.idx !== i;
      const energy = isBurst ? 1.6 : exploded ? (isHover ? 1 : 0.55) : 0.16;
      const lerpW = isBurst ? 0 : 0.03 + eased * 0.14;
      const arr = c.geom.attributes.position.array as Float32Array;
      const base = i * count;

      for (let p = 0; p < count; p++) {
        const oi = base + p;
        const ox = jitter.dir[oi * 3];
        const oy = jitter.dir[oi * 3 + 1];
        const oz = jitter.dir[oi * 3 + 2];
        const ph = jitter.phase[oi];
        const jit =
          Math.sin(t * 1.6 + ph) * 0.045 * energy + Math.sin(t * 3.1 + ph * 1.7) * 0.02 * energy;

        if (isBurst) {
          // 🔥 radial firework — push each particle outward from the cluster
          // center, with a slight upward bias, decaying over ~0.55s
          const cx = m.x;
          const px = arr[p * 3];
          const py2 = arr[p * 3 + 1];
          const pz2 = arr[p * 3 + 2];
          let ddx = px - cx;
          let ddy = py2;
          let ddz = pz2;
          const ddl = Math.hypot(ddx, ddy, ddz) || 1;
          ddx /= ddl;
          ddy /= ddl;
          ddz /= ddl;
          const k = Math.max(0, 1 - burstAge / 0.55);
          const force = 7 * k * k + 0.6 * k;
          arr[p * 3] += ddx * force * d;
          arr[p * 3 + 1] += (ddy * 0.6 + 0.5) * force * d;
          arr[p * 3 + 2] += ddz * force * d;
        } else {
          const tx = c.home[p * 3] + ox * jit;
          const ty = c.home[p * 3 + 1] + oy * jit;
          const tz = c.home[p * 3 + 2] + oz * jit;
          arr[p * 3] += (tx - arr[p * 3]) * lerpW;
          arr[p * 3 + 1] += (ty - arr[p * 3 + 1]) * lerpW;
          arr[p * 3 + 2] += (tz - arr[p * 3 + 2]) * lerpW;
        }
      }
      c.geom.attributes.position.needsUpdate = true;

      let targetOp: number;
      if (isBurst) targetOp = 1.0;
      else if (isBurstOther) targetOp = 0.1 * Math.max(0, 1 - burstAge / 0.4);
      else targetOp = exploded ? (isHover ? 1.0 : 0.95) : 0.88;
      c.mat.opacity += (targetOp - c.mat.opacity) * d * 6;

      // project label anchor to screen — only show when it faces the camera
      const anchor = anchorRefs.current[i];
      const el = labelRefs.current[i];
      if (anchor && el) {
        anchor.getWorldPosition(v);
        _toAnchor.copy(v).sub(camera.position);
        const inFront = _toAnchor.dot(_camDir) > 0;
        v.project(camera);
        const sx = (v.x * 0.5 + 0.5) * size.width;
        const sy = (-v.y * 0.5 + 0.5) * size.height;
        const cur = parseFloat(el.style.opacity || "0") || 0;
        const opTarget = isBurst ? 1 : exploded && inFront ? (isHover ? 1 : 0.82) : 0;
        el.style.opacity = String(cur + (opTarget - cur) * 0.12);
        const sc = isBurst ? 1.12 : isHover ? 1.06 : 1;
        el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -100%) scale(${sc})`;
      }
    }
  });

  return (
    <group ref={rootRef} scale={isMobile ? 0.72 : 1.0} position={[0, -0.15, 0]}>
      <ambientLight intensity={1.2} color="#1a1a22" />
      <spotLight position={[0, 9, 6]} angle={0.8} penumbra={0.9} intensity={6.5} color="#fff4db" />
      <directionalLight position={[-8, 4, 4]} intensity={3.2} color="#ffcc44" />
      <directionalLight position={[8, 4, 4]} intensity={3.2} color="#00ffc4" />
      <pointLight position={[0, 0, 3]} intensity={3.0} color="#ffeaa7" distance={14} />

      <CosmicDust count={isMobile ? 80 : 160} />

      {clusters.map((c, i) => {
        const m = SWARM_MODULES[i];
        return (
          <React.Fragment key={m.id}>
            <points geometry={c.geom} material={c.mat} />
            {/* invisible hitbox for reliable pointer interaction */}
            <mesh
              geometry={c.hitGeom}
              material={c.hitMat}
              position={[m.x, 0, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                hoveredIdxRef.current = i;
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                if (hoveredIdxRef.current === i) hoveredIdxRef.current = null;
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onActivate();
              }}
              onClick={(e) => {
                e.stopPropagation();
                burstRef.current = { idx: i, t0: null };
                onSelectChapter(m.id);
              }}
            />
            <group ref={anchorCallbacks[i]} position={[m.x, 1.15, 0]} />
          </React.Fragment>
        );
      })}
    </group>
  );
}
