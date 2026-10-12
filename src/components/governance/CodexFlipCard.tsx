import { RotateCw, ArrowRight } from "lucide-react";
import type { CodexCardData } from "./codex-cards-data";

interface CodexFlipCardProps {
  card: CodexCardData;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onCardClick?: () => void;
  variant?: "carousel" | "grid";
}

/**
 * Presentational flip card (front + back) shared by the 3D carousel item
 * and the static 5-card grid below it. The outer wrapper (li/div + ref +
 * onClick for the carousel) is handled by the parent.
 */
export function CodexFlipCard({
  card,
  isFlipped,
  onToggleFlip,
  onCardClick,
  variant = "grid",
}: CodexFlipCardProps) {
  const Icon = card.icon;

  return (
    <div
      className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-[var(--color-gold)]/35 ${
        isFlipped ? "rotate-y-180" : ""
      } ${variant === "carousel" ? "cursor-pointer touch-pan-y" : ""}`}
      onClick={variant === "carousel" ? onCardClick : undefined}
    >
      {/* ── MẶT TRƯỚC ── */}
      {variant === "carousel" ? (
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#141311] via-[#0d0d0f] to-black backface-hidden flex flex-col justify-between p-5 border border-white/5">
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest text-[var(--color-gold)] font-bold px-2 py-0.5 rounded bg-black/60 border border-[var(--color-gold)]/30">
              {card.number}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlip();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 hover:bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/40 text-[10px] font-mono text-[var(--color-gold-light)] hover:text-white transition-all cursor-pointer shadow-sm"
                title="Lật xem chi tiết mặt sau"
              >
                <RotateCw className="w-3 h-3 text-[var(--color-gold)]" />
                <span>Lật thẻ</span>
              </button>
              <div className="w-7 h-7 rounded-lg bg-black/60 border border-[var(--color-gold)]/30 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              </div>
            </div>
          </div>

          <div className="relative my-3 flex-1 rounded-xl overflow-hidden border border-[var(--color-gold)]/25 group/img">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 pt-1">
            <h4 className="font-display font-semibold text-base sm:text-lg text-[var(--color-gold-light)] leading-snug">
              {card.title}
            </h4>
            <p className="mt-1.5 font-sans text-xs text-[var(--color-foreground)]/85 leading-relaxed">
              {card.tagline}
            </p>
            <div className="mt-3 pt-2.5 border-t border-[var(--color-gold)]/20 flex items-center justify-between">
              <a
                href={`#${card.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-gold)] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>XEM LẠI</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <span className="font-mono text-[10px] text-[var(--color-foreground)]/50">
                {card.code}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── MẶT SAU ── */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#18150f] via-[#0f0e0c] to-black rotate-y-180 backface-hidden flex flex-col justify-between p-5 border border-[var(--color-gold)]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--color-gold)]/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--color-gold)] font-bold">
              {card.number}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[var(--color-gold-light)] uppercase">
              BẢN ĐỒ CHI TIẾT
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFlip();
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 hover:bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/40 text-[10px] font-mono text-[var(--color-gold-light)] transition-all cursor-pointer"
          >
            <RotateCw className="w-2.5 h-2.5 text-[var(--color-gold)]" />
            <span>Mặt trước</span>
          </button>
        </div>

        <div className="my-auto space-y-3 py-2 text-left overflow-y-auto max-h-[330px] pr-1">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-gold)] mb-1">
              NGUYÊN LÝ CỐT LÕI
            </span>
            <p className="font-sans text-xs sm:text-[13px] text-[var(--color-foreground)] leading-relaxed">
              {card.corePrinciple}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/60 border border-[var(--color-gold)]/25">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-jade)] mb-1">
              LỜI JENSEN NÓI
            </span>
            <p className="font-display italic text-xs sm:text-[13px] text-[var(--color-gold-light)] leading-relaxed">
              “{card.fullQuote}”
            </p>
          </div>

          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-gold)] mb-1">
              BÀI HỌC HÀNH ĐỘNG
            </span>
            <p className="font-sans text-xs text-[var(--color-foreground)]/85 leading-relaxed">
              {card.actionLesson}
            </p>
          </div>

          <div className="pt-2 border-t border-[var(--color-gold)]/15">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-foreground)]/60 mb-0.5">
              SẢN PHẨM MINH CHỨNG
            </span>
            <p className="font-sans text-xs font-semibold text-white">{card.product}</p>
            <p className="font-sans text-[11px] text-[var(--color-foreground)]/70">
              {card.productDesc}
            </p>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[var(--color-gold)]/20 flex items-center justify-between">
          <a
            href={`#${card.id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-gold)] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>CUỘN TỚI CHƯƠNG NÀY</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
