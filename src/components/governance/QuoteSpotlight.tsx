import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Quote as QuoteIcon, Sparkles } from "lucide-react";
import type { QuoteData } from "./quotes-data";

interface QuoteSpotlightProps {
  /** Index of the quote currently in spotlight (or null when closed) */
  spotIndex: number | null;
  quotes: QuoteData[];
  /** total number of quotes — lets us wrap the index */
  total: number;
  /** Navigate to the previous quote (wraps to last) */
  onPrev: () => void;
  /** Navigate to the next quote (wraps to first) */
  onNext: () => void;
  /** Close the spotlight (flip back & shrink to the carousel) */
  onClose: () => void;
}

/**
 * Spotlight reading experience for the Quote Carousel.
 *
 * When the user taps a quote card it lifts out of the fan, scales up to the
 * center of the viewport, flips on rotateY(180°) to reveal the back face
 * (the full quote on a cinematic, softly-blurred image backdrop), and the
 * rest of the carousel dims behind a dark scrim. The reader can then move
 * quote-to-quote with swipe / arrows / keyboard, and close with swipe-down
 * / Esc / the X button — flipping back to the front face before it shrinks
 * back into the carousel.
 */
export function QuoteSpotlight({
  spotIndex,
  quotes,
  total,
  onPrev,
  onNext,
  onClose,
}: QuoteSpotlightProps) {
  const isActive = spotIndex !== null;
  const quote = isActive ? quotes[spotIndex!] : null;

  // ── Keyboard navigation (arrows + esc) ───────────────────────────────
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, onNext, onPrev, onClose]);

  // ── Swipe: horizontal = next/prev · vertical down = close ────────────
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      if (!start) return;
      touchStart.current = null;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const THRESHOLD = 48;
      // Horizontal swipe → prev/next (only if more horizontal than vertical)
      if (absX > THRESHOLD && absX > absY) {
        if (dx < 0) onNext();
        else onPrev();
        return;
      }
      // Vertical-down swipe → close
      if (dy > THRESHOLD && absY > absX) {
        onClose();
      }
    },
    [onNext, onPrev, onClose],
  );

  return (
    <AnimatePresence>
      {isActive && quote && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* ── Dark scrim + dimmed carousel behind ─────────────────── */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* ── Spotlight card (front→back flip, real rotateY 180°) ─── */}
          <div className="relative z-10 w-[min(92vw,440px)] [perspective:1800px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={quote.id}
                className="relative aspect-[3/4.2] w-full"
                initial={{ opacity: 0, scale: 0.82, rotateY: 0 }}
                animate={{ opacity: 1, scale: 1, rotateY: 180 }}
                exit={{ opacity: 0, scale: 0.82, rotateY: 0 }}
                transition={{
                  opacity: { duration: 0.28 },
                  scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  rotateY: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ── FRONT FACE (what the user tapped) ── */}
                <div
                  className="backface-hidden absolute inset-0 overflow-hidden rounded-[20px] border-2 border-[var(--color-gold)]/45 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={quote.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-gold-light)] px-2.5 py-0.5 rounded bg-black/70 border border-[var(--color-gold)]/50">
                      {quote.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)]/80">
                      Lật để đọc
                    </span>
                  </div>
                </div>

                {/* ── BACK FACE (full quote with distinct, visible cinematic image) ── */}
                <div
                  className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-gold)]/55 shadow-[0_30px_80px_rgba(0,0,0,0.95)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Cinematic image backdrop — distinct and clearly visible, no heavy blur/dim */}
                  <img
                    src={quote.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    draggable={false}
                  />

                  {/* Gradient overlays: top vignette for controls, bottom vignette for signature, and a soft readable pill/scrim behind the quote text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/85" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.85) 100%)",
                    }}
                  />

                  {/* Ambient theme glow accent from gold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(212,175,55,0.12), transparent 75%)",
                    }}
                  />

                  {/* Quote content */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[var(--color-gold-light)] px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[var(--color-gold)]/50 shadow-md">
                          {quote.number}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)]/90 font-semibold drop-shadow">
                          CÂU {quote.number}/18
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Đóng"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 backdrop-blur-md border border-[var(--color-gold)]/40 text-[var(--color-gold-light)] transition hover:bg-[var(--color-gold)]/25 hover:text-white hover:scale-105 cursor-pointer shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Center: Quote Icon + Quote Text inside a glass backdrop with distinct text shadow */}
                    <div className="my-auto py-2">
                      <div className="mb-3 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
                        <QuoteIcon className="h-4 w-4 text-[var(--color-gold)] drop-shadow" />
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
                      </div>

                      <div className="rounded-xl bg-black/45 backdrop-blur-[6px] border border-[var(--color-gold)]/20 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                        <p
                          className="font-display text-[1.05rem] leading-[1.55] text-[var(--color-gold-light)] sm:text-[1.22rem] text-center font-medium"
                          style={{
                            textShadow: "0 2px 14px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)",
                          }}
                        >
                          "{quote.text}"
                        </p>
                      </div>
                    </div>

                    {/* Footer bar */}
                    <div className="flex items-center justify-between border-t border-[var(--color-gold)]/25 bg-black/60 backdrop-blur-md -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 px-6 py-3.5 sm:px-7 rounded-b-[20px]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                        <span className="font-mono text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--color-gold-light)]">
                          JENSEN HUANG
                        </span>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[var(--color-foreground)]/70">
                        {spotIndex! + 1}/{total}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Desktop arrow nav (hidden on touch where swipe is primary) ── */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-between px-[3vw] sm:flex">
            <NavArrow direction="prev" onClick={onPrev} />
            <NavArrow direction="next" onClick={onNext} />
          </div>

          {/* ── Mobile bottom hint ── */}
          <div className="pointer-events-none absolute bottom-[4%] left-1/2 z-20 -translate-x-1/2 text-center sm:hidden">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-foreground)]/55">
              Vuốt ← → đổi câu · vuốt ↓ đóng
            </p>
          </div>

          {/* ── Desktop bottom hint ── */}
          <div className="pointer-events-none absolute bottom-[3%] left-1/2 z-20 hidden -translate-x-1/2 text-center sm:block">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-foreground)]/45">
              ← → đổi câu · Esc đóng
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Câu trước" : "Câu tiếp";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold)]/35 bg-black/60 text-[var(--color-gold-light)] backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--color-gold)]/70 hover:bg-[var(--color-gold)]/15 hover:text-white active:scale-95 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
