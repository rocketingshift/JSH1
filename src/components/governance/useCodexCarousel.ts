import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

// ── 3D depth arc (cinematic, spacious) ──
// Center card (delta=0): scale 1.0, opacity 1.0, xPercent 0, zIndex 100.
// Neighbours ±1: scale ~0.67, opacity ~0.62, xPercent ±110.
// Outer ±2: scale ~0.34, opacity ~0.24, xPercent ±220 — faded into the void.
const X_SPREAD = 110;
const SCALE_STEP = 0.28;
const OPACITY_STEP = 0.22;
const ROTATE_STEP = 9;
const DAMPING = 0.09; // lower = more lag / buttery glide toward target
const HOVER_SENSITIVITY = 0.006; // pointer hover movement → target nudge
const DRAG_SENSITIVITY = 0.009; // stronger nudge while button held (deliberate drag)
const TOUCH_SENS = 0.012; // mobile touch drag — slightly higher for responsiveness
const MAX_DELTA = 80; // cap a single movement event so a flick can't launch it
const DRAG_THRESHOLD = 6; // px — distinguish click vs drag

function wrappedDelta(i: number, c: number, count: number) {
  let d = i - c;
  while (d > count / 2) d -= count;
  while (d < -count / 2) d += count;
  return d;
}

const normalizeIndex = (n: number, count: number) => ((Math.round(n) % count) + count) % count;

export interface CodexCarousel {
  galleryRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  activeIndex: number;
  goTo: (index: number) => void;
  handleCardClick: (index: number) => void;
}

export function useCodexCarousel(count: number): CodexCarousel {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetRef = useRef(0); // desired position — accumulates all movement (free, no snap)
  const currentRef = useRef(0); // displayed position — eased toward target (this IS the glide)
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const lastTouchX = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDir = useRef<"h" | "v" | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Apply 3D transforms for every card given the continuous center.
  const renderCards = useCallback(() => {
    const c = currentRef.current;
    for (let i = 0; i < count; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const delta = wrappedDelta(i, c, count);
      const absD = Math.abs(delta);
      const xPercent = delta * X_SPREAD;
      const scale = Math.max(0.38, 1 - absD * SCALE_STEP);
      const opacity = Math.max(0.48, 1 - absD * OPACITY_STEP);
      const zIndex = Math.round(100 - absD * 30);
      const rotateY = -delta * ROTATE_STEP;
      // Giữ độ sắc nét cho các thẻ xa, chỉ thêm độ mờ nhẹ vi tế khi vượt quá delta > 1.4
      const blur = absD > 1.4 ? `blur(${Math.min(1.2, (absD - 1.4) * 1.5)}px)` : "none";
      gsap.set(el, { xPercent, scale, opacity, zIndex, rotateY, filter: blur });
    }
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const c = currentRef.current;
      let target = index;
      while (target - c > count / 2) target -= count;
      while (target - c < -count / 2) target += count;
      targetRef.current = target;
      draggingRef.current = false;
    },
    [count],
  );

  // Engine: damping loop (the glide) + hover/drag + keyboard.
  // The "inertia" is structural: target accumulates movement, current lags
  // behind via DAMPING — so a fast flick sends target far and the cards
  // glide all the way, exactly like the original seamless loop.
  useEffect(() => {
    if (!galleryRef.current) return;
    // Position cards synchronously on mount (no stacked-card flash).
    renderCards();

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * DAMPING;
      renderCards();
      const norm = normalizeIndex(currentRef.current, count);
      if (norm !== activeIndexRef.current) {
        activeIndexRef.current = norm;
        setActiveIndex(norm);
      }
    };

    // ── Pause the damping loop when the carousel is off-screen (mobile perf) ──
    let obs: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) gsap.ticker.add(tick);
            else gsap.ticker.remove(tick);
          }
        },
        { threshold: 0.05 },
      );
      obs.observe(galleryRef.current);
    }
    gsap.ticker.add(tick);

    // ── Pointer (desktop): hover glide needs NO button — just move the mouse ──
    const onPointerMove = (e: PointerEvent) => {
      const mv = gsap.utils.clamp(-MAX_DELTA, MAX_DELTA, e.movementX || 0);
      const sens = draggingRef.current ? DRAG_SENSITIVITY : HOVER_SENSITIVITY;
      if (draggingRef.current && Math.abs(e.movementX) > DRAG_THRESHOLD) {
        suppressClickRef.current = true;
      }
      targetRef.current += mv * sens;
    };
    const onPointerDown = () => {
      draggingRef.current = true;
      suppressClickRef.current = false;
    };
    const onPointerUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 80);
      }
    };

    // ── Touch (mobile) — direction-locked so vertical swipes scroll the
    //    page and only horizontal swipes spin the carousel ──
    const onTouchStart = (e: TouchEvent) => {
      draggingRef.current = true;
      suppressClickRef.current = false;
      lastTouchX.current = e.touches[0].clientX;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDir.current = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      const t = e.touches[0];
      // Lock direction on first significant movement
      if (!touchDir.current) {
        const ax = Math.abs(t.clientX - touchStartX.current);
        const ay = Math.abs(t.clientY - touchStartY.current);
        if (ax < 6 && ay < 6) return;
        touchDir.current = ax > ay ? "h" : "v";
      }
      if (touchDir.current === "v") return; // let the page scroll
      // Horizontal → spin carousel, stop the browser from interfering
      e.preventDefault();
      const dx = t.clientX - lastTouchX.current;
      lastTouchX.current = t.clientX;
      if (Math.abs(dx) > DRAG_THRESHOLD) suppressClickRef.current = true;
      targetRef.current -= dx * TOUCH_SENS;
    };
    const onTouchEnd = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        touchDir.current = null;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 80);
      }
    };

    // ── Keyboard ──
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(normalizeIndex(activeIndexRef.current, count) + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(normalizeIndex(activeIndexRef.current, count) - 1);
      }
    };

    const gallery = galleryRef.current;
    gallery.addEventListener("pointermove", onPointerMove);
    gallery.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    gallery.addEventListener("touchstart", onTouchStart, { passive: true });
    gallery.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    gallery.addEventListener("keydown", onKey);

    return () => {
      gsap.ticker.remove(tick);
      obs?.disconnect();
      gallery.removeEventListener("pointermove", onPointerMove);
      gallery.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      gallery.removeEventListener("touchstart", onTouchStart);
      gallery.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      gallery.removeEventListener("keydown", onKey);
    };
  }, [renderCards, goTo, count]);

  // Click a side card → glide it into the center.
  const handleCardClick = useCallback(
    (index: number) => {
      if (suppressClickRef.current) return;
      const delta = Math.abs(wrappedDelta(index, currentRef.current, count));
      if (delta >= 0.5) goTo(index);
    },
    [goTo, count],
  );

  return {
    galleryRef,
    cardRefs,
    activeIndex,
    goTo,
    handleCardClick,
  };
}
