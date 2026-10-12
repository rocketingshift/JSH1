import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useHydrated } from "@tanstack/react-router";
import { Sparkles, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ParticleSwarmMatrix } from "./ParticleSwarmMatrix";
import { SWARM_MODULES } from "./swarm-data";

export function CyberneticMatrix() {
  const isMobile = useIsMobile();
  const hydrated = useHydrated();

  const [manualExplode, setManualExplode] = useState(false);
  const [areaHovered, setAreaHovered] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [inView, setInView] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const explodedRef = useRef(false);
  const hoveredIdxRef = useRef<number | null>(null);

  const exploded = manualExplode || areaHovered || mobileActive;

  const handleSelectChapter = (id: string) => {
    setBurstKey((k) => k + 1);
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  };

  // keep frame-loop refs in sync without re-rendering the canvas
  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const labelCallbacks = useMemo(
    () =>
      SWARM_MODULES.map((_, i) => (el: HTMLDivElement | null) => {
        labelRefs.current[i] = el;
      }),
    [],
  );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative w-full my-8 py-4 select-none">
      {/* Ambient background bloom */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#ffd700]/8 via-[#00d296]/3 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-jade)] animate-ping" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#e5b842] uppercase font-bold">
                GPU PARTICLE SWARM // 5 MẬT MÃ
              </span>
            </div>
            <p className="text-xs text-[var(--color-foreground)]/65 font-mono mt-0.5">
              {isMobile
                ? "Kéo để xoay quỹ đạo · chạm cụm hạt để tới chương"
                : "Kéo để xoay quỹ đạo · rê chuột để kích hoạt · chạm cụm hạt để tới chương"}
            </p>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setManualExplode(!manualExplode)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer self-start sm:self-auto ${
            exploded
              ? "bg-[#f5c542] text-black border-[#f5c542] shadow-[0_0_30px_rgba(245,197,66,0.7)]"
              : "bg-black/90 text-[#f5c542] border-[#f5c542]/50 hover:border-[#f5c542] hover:bg-[#f5c542]/10"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{exploded ? "HẠT GPU: BẬT" : "HẠT GPU: TẮT"}</span>
        </button>
      </div>

      {/* 3D Particle Swarm Stage */}
      <div
        ref={wrapRef}
        className="relative w-full"
        onMouseEnter={() => !isMobile && setAreaHovered(true)}
        onMouseLeave={() => setAreaHovered(false)}
      >
        <div className="relative w-full overflow-visible">
          <div className="relative w-full" style={{ height: isMobile ? "440px" : "620px" }}>
            {hydrated ? (
              <Canvas
                dpr={[1, 2]}
                frameloop={inView ? "always" : "never"}
                camera={{ position: [0, 1.4, 7.8], fov: 46 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ width: "100%", height: "100%", touchAction: "none" }}
              >
                <Suspense fallback={null}>
                  <ParticleSwarmMatrix
                    explodedRef={explodedRef}
                    hoveredIdxRef={hoveredIdxRef}
                    labelRefs={labelRefs}
                    onSelectChapter={handleSelectChapter}
                    onActivate={() => {
                      if (isMobile) setMobileActive(true);
                    }}
                    isMobile={!!isMobile}
                  />
                </Suspense>
                <OrbitControls
                  enablePan={false}
                  enableZoom={isMobile ? false : true}
                  minDistance={isMobile ? 5.5 : 4.5}
                  maxDistance={isMobile ? 10 : 12}
                  minPolarAngle={0.4}
                  maxPolarAngle={Math.PI / 2 + 0.4}
                  autoRotate
                  autoRotateSpeed={isMobile ? 0.35 : 0.55}
                  rotateSpeed={isMobile ? 0.6 : 0.85}
                  makeDefault
                />
              </Canvas>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#e5b842]/60 uppercase tracking-widest">
                Đang khởi tạo đám mây hạt GPU…
              </div>
            )}

            {/* Floating HUD labels — sleek, spacious, no tight bounding box */}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-visible">
              {SWARM_MODULES.map((m, i) => (
                <div
                  key={m.id}
                  ref={labelCallbacks[i]}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{ opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }}
                >
                  <div className="flex flex-col items-center gap-1 text-center select-none">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: m.edge, boxShadow: `0 0 10px ${m.edge}` }}
                      />
                      <span
                        className="font-mono text-sm sm:text-base font-bold tracking-wider whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                        style={{ color: m.edge }}
                      >
                        {m.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs tracking-wider uppercase text-white/90 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {m.subtitle}
                    </span>
                    <span
                      className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap"
                      style={{ color: `${m.edge}cc` }}
                    >
                      {m.highlight}
                    </span>
                  </div>

                  {/* 🔥 Burst flash — golden supernova overlay on select */}
                  {burstKey > 0 && (
                    <motion.div
                      key={burstKey}
                      className="absolute inset-0 pointer-events-none z-30"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(245,197,66,0.5), rgba(0,212,150,0.12) 45%, transparent 72%)",
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1.4] }}
                      transition={{ duration: 0.7, times: [0, 0.18, 1], ease: "easeOut" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
