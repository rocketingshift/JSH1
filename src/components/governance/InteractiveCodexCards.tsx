import { useState } from "react";
import { CODEX_CARDS } from "./codex-cards-data";
import { useCodexCarousel } from "./useCodexCarousel";
import { CodexFlipCard } from "./CodexFlipCard";

const COUNT = CODEX_CARDS.length;

export function InteractiveCodexCards() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) =>
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));

  const { galleryRef, cardRefs, activeIndex, goTo, handleCardClick } = useCodexCarousel(COUNT);

  return (
    <div className="relative w-full my-6">
      {/* ── 3D Index Carousel (free cinematic glide + click-to-focus) ── */}
      <div className="relative w-full overflow-visible">
        {/* Header / instructions */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)] font-semibold">
              BỘ THẺ BÀI 3D · 5 SẢN PHẨM & MẬT MÃ
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-foreground)]/70">
            <span className="hidden sm:inline">Kéo trượt · vuốt · phím ← → · bấm thẻ để lật</span>
            <span className="sm:hidden">Vuốt trượt · bấm thẻ</span>
          </div>
        </div>

        {/* 3D Stage — no framing arrows, full-width cinematic arc */}
        <div
          ref={galleryRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="5 mật mã quản trị"
          className="relative h-[520px] sm:h-[680px] w-full cursor-grab active:cursor-grabbing overflow-visible touch-pan-y select-none flex items-center justify-center perspective-[2200px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/40 rounded-2xl"
        >
          {/* Center spotlight */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[540px] rounded-full bg-radial from-[var(--color-gold)]/10 via-[var(--color-gold)]/2 to-transparent blur-3xl pointer-events-none -z-10" />

          <ul
            className="absolute left-1/2 top-1/2 m-0 h-[480px] sm:h-[520px] w-[240px] sm:w-[260px] -translate-x-1/2 -translate-y-1/2 p-0 list-none touch-pan-y"
            style={{ touchAction: "pan-y" }}
          >
            {CODEX_CARDS.map((card, i) => (
              <li
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="codex-carousel-item absolute inset-0 m-0 p-0 list-none perspective-[1400px] will-change-transform pointer-events-auto touch-pan-y"
                onClick={() => handleCardClick(i)}
              >
                <CodexFlipCard
                  card={card}
                  isFlipped={!!flippedCards[i]}
                  onToggleFlip={() => toggleFlip(i)}
                  onCardClick={() => toggleFlip(i)}
                  variant="carousel"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Index dots 01 · 02 · 03 · 04 · 05 — direct navigation, never caging the stage */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CODEX_CARDS.map((card, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Đi tới ${card.title}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-all cursor-pointer ${
                  isActive
                    ? "border-[var(--color-gold)]/70 bg-[var(--color-gold)]/12 shadow-[0_0_18px_rgba(212,175,55,0.35)]"
                    : "border-white/10 hover:border-[var(--color-gold)]/40 bg-transparent"
                }`}
              >
                <span
                  className={`font-mono text-[11px] tracking-widest transition-colors ${
                    isActive
                      ? "text-[var(--color-gold-light)] font-bold"
                      : "text-[var(--color-foreground)]/55 group-hover:text-[var(--color-gold)]"
                  }`}
                >
                  {card.number}
                </span>
                {isActive && (
                  <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[var(--color-gold)]/80 max-w-[180px] truncate">
                    {card.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
