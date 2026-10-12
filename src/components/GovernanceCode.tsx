import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CHAPTERS,
  PREAMBLE,
  SECTION_SUBTITLE,
  SECTION_TITLE,
  type Block,
  type Chapter,
} from "./governance/chapters-data";
import { DataViz } from "./governance/DataVizRouter";
import { CyberneticMatrix } from "./governance/CyberneticMatrix";
import { InteractiveCodexCards } from "./governance/InteractiveCodexCards";
import { QuoteCarousel } from "./governance/QuoteCarousel";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return (
        <motion.p
          {...reveal(0.02)}
          className="text-[var(--color-foreground)]/85 leading-[1.85] text-[15px] sm:text-[17px]"
        >
          {block.text}
        </motion.p>
      );
    case "q":
      return (
        <motion.blockquote
          {...reveal(0.02)}
          className="my-1 pl-5 border-l-2 border-[var(--color-gold)]/50 text-[var(--color-foreground)]/90 italic leading-[1.8] text-[15px] sm:text-[17px]"
        >
          {block.text}
        </motion.blockquote>
      );
    case "pull":
      return (
        <motion.figure {...reveal(0.04)} className="relative my-14 sm:my-16">
          {/* Soft amber radial glow — the cinematic pause moment */}
          <div className="absolute -inset-x-10 inset-y-0 bg-radial-[ellipse_at_center] from-[var(--color-gold)]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
          <div className="relative text-center px-4 sm:px-8 py-6">
            {/* Decorative open-quote glyph */}
            <span
              aria-hidden="true"
              className="block font-display text-7xl sm:text-8xl leading-[0.6] text-[var(--color-gold)]/25 mb-4 select-none"
            >
              “
            </span>
            <p className="font-display font-light text-2xl sm:text-3xl md:text-4xl leading-[1.22] text-[var(--color-gold-light)] tracking-tight">
              {block.text}
            </p>
            {/* Refined hairline + diamond flourish */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-gold)]/50" />
              <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
            </div>
          </div>
        </motion.figure>
      );
    case "h":
      return (
        <motion.h4
          {...reveal(0.02)}
          className="pt-6 font-mono text-xs tracking-[0.25em] uppercase text-[var(--color-jade-glow)]"
        >
          {block.text}
        </motion.h4>
      );
    case "lesson":
      return (
        <motion.div
          {...reveal(0.04)}
          className="mt-2 p-5 rounded-xl bg-[var(--color-jade)]/[0.06] border border-[var(--color-jade)]/25"
        >
          <p className="text-[var(--color-foreground)] leading-[1.8] text-[15px] sm:text-[17px]">
            {block.text}
          </p>
        </motion.div>
      );
    case "choice":
      return (
        <motion.div
          {...reveal(0.04)}
          className="my-6 p-5 rounded-xl bg-black/40 border border-[var(--color-gold)]/20 backdrop-blur-sm"
        >
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)]/85 mb-3">
            {block.title}
          </div>
          <div className="space-y-2 mb-4">
            {block.options.map((o, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-[13px] font-mono text-[var(--color-foreground)]/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/50" />
                {o}
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-jade)]/[0.08] border border-[var(--color-jade)]/30">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-jade)]">
              LỰA CHỌN: {block.chosen}
            </span>
            <p className="mt-1 text-[13px] text-[var(--color-foreground)]/85">{block.reason}</p>
          </div>
        </motion.div>
      );
    case "steps":
      return (
        <div className="my-6 space-y-3">
          {block.steps.map((s, i) => (
            <motion.div
              key={i}
              {...reveal(0.06 * i)}
              className="p-5 rounded-xl bg-white/[0.03] border border-[var(--color-gold)]/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/50 text-[var(--color-gold-light)] font-mono text-[10px] font-bold tracking-wider">
                  {s.step}
                </span>
                <h5 className="font-display font-bold uppercase text-sm sm:text-base text-[var(--color-foreground)]">
                  {s.title}
                </h5>
              </div>
              <p className="text-[14px] sm:text-[15px] text-[var(--color-gold-light)] font-medium leading-relaxed">
                {s.desc}
              </p>
              {s.detail && (
                <p className="mt-3 text-[14px] sm:text-[15px] text-[var(--color-foreground)]/90 leading-[1.8] whitespace-pre-line border-t border-[var(--color-gold)]/20 pt-3">
                  {s.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      );
    case "viz":
      return (
        <motion.div {...reveal(0.04)} className="my-6">
          <DataViz viz={block.viz} />
        </motion.div>
      );
    default:
      return null;
  }
}

function ChapterView({ chapter }: { chapter: Chapter }) {
  const Icon = chapter.icon;

  return (
    <article id={chapter.id} className="relative governance-chapter">
      {/* Spotlight — ambient amber bloom that follows the reader's focus */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 chapter-spotlight"
      />
      {/* ── Editorial content ── */}
      <div className="relative z-10 pt-24 sm:pt-36 pb-24 sm:pb-36">
        {/* Header — centered */}
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div {...reveal()} className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-9 h-9 rounded-xl border flex items-center justify-center animate-chapter-badge transition-all duration-700 overflow-hidden">
              {/* Inner ambient light blur */}
              <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <Icon className="w-4 h-4 animate-chapter-icon transition-all duration-700" />
            </div>
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-gold)]/85 uppercase">
              MẬT MÃ {chapter.number} / 05
            </span>
          </motion.div>

          <motion.h3 {...reveal(0.04)} className="font-display font-bold leading-[1.08]">
            <span className="block text-3xl sm:text-4xl lg:text-5xl text-[var(--color-gold-light)]">
              {chapter.subtitle}
            </span>
          </motion.h3>

          <motion.p
            {...reveal(0.08)}
            className="mt-4 font-sans italic text-[var(--color-gold-light)]/90 text-base sm:text-lg leading-relaxed"
          >
            {chapter.tagline}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {chapter.tags.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/20 font-mono text-[9px] uppercase tracking-wider text-[var(--color-gold-light)]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Wide cinematic still — full-bleed 21:9, centered */}
        <motion.div {...reveal(0.1)} className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
          <div className="relative rounded-xl overflow-hidden border border-[var(--color-gold)]/20 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.9)] group">
            <img
              src={chapter.image}
              alt={`Jensen Huang cinematic still for ${chapter.subtitle}`}
              className={`w-full aspect-[16/9] sm:aspect-[21/9] object-cover ${
                chapter.imageAlign === "top" ? "object-top" : "object-center"
              } cinematic-grade transition-transform duration-[1.4s] ease-out group-hover:scale-105`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 pointer-events-none" />
            {/* Filmic amber wash — unifies color grade across all chapter stills */}
            <div className="absolute inset-0 bg-[#d4af37]/5 pointer-events-none mix-blend-soft-light" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--color-gold)]/50" />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[var(--color-gold-light)] uppercase">
                  {chapter.subtitle}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Body — editorial reading column */}
        <div className="mx-auto max-w-6xl mt-10 relative px-4 sm:px-6">
          <div className="relative mx-auto max-w-4xl px-2 sm:px-4 space-y-4">
            {chapter.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function GovernanceCode() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.findIndex((el) => el === e.target);
            if (idx >= 0) setActiveChapter(idx);
          }
        });
      },
      { threshold: 0.4 },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="governance-section"
      className="relative w-full overflow-hidden text-[var(--color-foreground)] obsidian-surface"
    >
      {/* ── Clean Obsidian backdrop — deep space, no grids ── */}
      {/* IMAX film grain — fine organic texture for cinematic depth */}
      <div className="pointer-events-none absolute inset-0 z-0 film-grain" />

      {/* progress rail (left) */}
      <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40 h-[50vh] w-px bg-[var(--color-gold)]/15">
        <motion.div
          className="absolute top-0 left-0 w-px bg-gradient-to-b from-[var(--color-gold)] to-[var(--color-jade)]"
          style={{ height: progressHeight }}
        />
        <div className="absolute -left-[5px] flex flex-col justify-between h-full">
          {CHAPTERS.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="group relative"
              aria-label={`Go to chapter ${c.number}`}
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full border transition-all ${
                  i === activeChapter
                    ? "bg-[var(--color-gold)] border-[var(--color-gold)] scale-125 shadow-[0_0_10px_var(--color-gold)]"
                    : "bg-black border-[var(--color-gold)]/40 group-hover:border-[var(--color-gold)]"
                }`}
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-[var(--color-gold)]/0 group-hover:text-[var(--color-gold)]/80 transition-colors">
                {c.number}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Intro / Preamble — Redesigned Editorial Hero ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-32 sm:pt-40 pb-16 text-center">
        {/* Subtle Tech Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/20 bg-black/60 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-jade)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-jade)]" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-gold-light)] font-semibold">
            DOSSIER // ARCHIVE 2008–2027
          </span>
        </motion.div>

        {/* Monumental Section Title with Gold Halo & Precision Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="relative inline-block"
        >
          {/* Ambient Glow behind Title */}
          <div className="absolute -inset-x-12 -inset-y-6 bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent blur-2xl pointer-events-none" />

          <h2 className="relative font-display font-semibold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.08em] sm:tracking-[0.14em] leading-tight gradient-text-gold">
            {SECTION_TITLE}
          </h2>
        </motion.div>

        {/* Cinematographic Subtitle with Dual Hairlines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 sm:mt-8 max-w-3xl mx-auto flex items-center justify-center gap-3 sm:gap-5"
        >
          <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
          <p className="font-mono text-[11px] sm:text-[13px] md:text-sm uppercase tracking-[0.22em] text-[var(--color-gold-light)]/85 text-center leading-relaxed font-medium">
            {SECTION_SUBTITLE}
          </p>
          <span className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
        </motion.div>

        {/* ── Frameless Cinematic Narrative (Trang nhã, không khung viền) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="mt-14 sm:mt-20 mx-auto max-w-3xl space-y-10"
        >
          {/* Nhịp 1: Khởi đầu tương phản */}
          <div className="space-y-3 text-base sm:text-xl text-[var(--color-foreground)]/70 font-sans tracking-wide">
            <p>{PREAMBLE[0]}</p>
            <p>{PREAMBLE[1]}</p>
          </div>

          {/* Nhịp 2: Cú đặt cược lịch sử — Điểm nhấn điện ảnh lớn, không đóng khung */}
          <div className="relative py-8 sm:py-12 px-4 sm:px-8">
            {/* Vệt sáng nhiệt quang mờ phía sau câu then chốt */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent blur-2xl pointer-events-none" />

            {/* Đường chỉ vàng tối giản trên & dưới */}
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent mb-6" />

            <p className="relative font-display font-medium text-2xl sm:text-3xl md:text-4xl text-[var(--color-gold-light)] leading-[1.35] tracking-tight">
              {PREAMBLE[2]}
            </p>

            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent mt-6" />
          </div>

          {/* Nhịp 3: Tinh gọn, thanh thoát */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="font-sans text-base sm:text-lg text-[var(--color-foreground)]/80 leading-relaxed font-normal">
              {PREAMBLE[3]}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          {/* 3D Cybernetic Exploded Matrix — Core Interactive Centerpiece */}
          <CyberneticMatrix />
        </motion.div>
      </div>

      {/* ── Section Divider: Nằm giữa 5 thẻ mật mã và Chương 01 ── */}
      <div className="relative z-10 flex items-center justify-center gap-5 my-8 sm:my-12">
        <span className="h-px w-24 sm:w-44 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
        <span className="relative flex items-center justify-center w-5 h-5">
          {/* Ambient breathing color glow aura behind diamond */}
          <span className="absolute inset-0 rounded-full animate-diamond-aura pointer-events-none" />
          {/* Outer Breathing Diamond with shifting colors */}
          <span className="relative w-3 h-3 border transition-colors duration-500 animate-diamond-breath">
            {/* Inner secondary diamond */}
            <span className="absolute inset-0 border animate-diamond-inner pointer-events-none" />
          </span>
        </span>
        <span className="h-px w-24 sm:w-44 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
      </div>

      {/* ── Chapters ── */}
      <div className="relative z-10">
        {CHAPTERS.map((c) => (
          <ChapterView key={c.id} chapter={c} />
        ))}
      </div>

      {/* ── Closing Epic Synthesis: Tổng kết 5 Mật Mã ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-gold)]/25 bg-black/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-jade)] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[var(--color-gold-light)] uppercase font-semibold">
              TỔNG KẾT BẢN THẢO · 5 MẬT MÃ QUẢN TRỊ
            </span>
          </div>

          <h3 className="font-display font-semibold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-[var(--color-gold-light)] leading-tight max-w-3xl mx-auto">
            5 Mật Mã. Một Con Người.
            <span className="block mt-2 text-[var(--color-foreground)] font-normal text-xl sm:text-2xl md:text-3xl">
              Một Lối Đi Hiếm Ai Dám Chọn.
            </span>
          </h3>

          <p className="mt-6 max-w-2xl mx-auto font-sans text-sm sm:text-base text-[var(--color-foreground)]/75 leading-relaxed">
            Từ thị trường 0 tỷ đô đến công ty nghìn tỷ định hình nền văn minh công nghệ — đây không
            phải lý thuyết bàn giấy, mà là bản đồ hành động được tôi luyện trong lửa đạn.
          </p>
        </motion.div>

        {/* 5 Epic Codices Cards Carousel & Flip Grid */}
        <div className="mt-10 sm:mt-14">
          <InteractiveCodexCards />
        </div>

        {/* Golden Covenant Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 sm:mt-18 p-8 sm:p-10 rounded-3xl border border-[var(--color-gold)]/30 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.08)]"
        >
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-[var(--color-gold)]/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-jade)] font-semibold">
              TRIẾT LÝ HÀNH ĐỘNG CỐT LÕI
            </span>
            <p className="font-display italic text-lg sm:text-2xl text-[var(--color-gold-light)] leading-relaxed">
              “Bạn phải chịu đựng. Bạn phải vật lộn. Bạn phải nỗ lực. Bạn phải làm những điều khó
              khăn và vượt qua chúng thì mới thực sự trân trọng những gì bạn đã đạt được.”
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 font-mono text-xs text-[var(--color-gold)]/75 tracking-widest uppercase">
              <span>JENSEN HUANG</span>
              <span>·</span>
              <span>CHÂN LÝ ĐƯỢC THỬ LỬA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Section Divider — gold line marking the boundary to the next part ── */}
      <div className="relative z-10 flex items-center justify-center gap-5 pb-28">
        <span className="h-px w-28 sm:w-40 bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
        <span className="relative flex items-center justify-center w-5 h-5">
          <span className="absolute inset-0 rounded-full animate-diamond-aura pointer-events-none" />
          <span className="relative w-3 h-3 border transition-colors duration-500 animate-diamond-breath">
            <span className="absolute inset-0 border animate-diamond-inner pointer-events-none" />
          </span>
        </span>
        <span className="h-px w-28 sm:w-40 bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
      </div>

      {/* ── Quote Carousel: 18 quotes 3D rotating (Jensen's voice) ── */}
      <QuoteCarousel />
    </section>
  );
}
