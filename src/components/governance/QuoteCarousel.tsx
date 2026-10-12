import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote as QuoteIcon } from "lucide-react";
import { QUOTES } from "./quotes-data";
import { QuoteSpotlight } from "./QuoteSpotlight";

gsap.registerPlugin(Draggable, ScrollTrigger);

const TOTAL = QUOTES.length; // 18
const DEGREE = 360 / TOTAL; // 20°
// Bán kính vòng cung: R × (20° in rad) ≈ cardWidth → mép dưới chồng khít, trên tõe ra như quạt.
// Desktop card ~360px → R ≈ 1050px; Mobile card ~240px → R ≈ 700px.
const PIVOT_R_DESKTOP = "1050px";
const PIVOT_R_MOBILE = "700px";
const getPivotR = () => {
  if (typeof window === "undefined") return PIVOT_R_DESKTOP;
  return window.innerWidth < 640 ? PIVOT_R_MOBILE : PIVOT_R_DESKTOP;
};

export function QuoteCarousel() {
  const pivotR = useRef(getPivotR());
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spotIndex, setSpotIndex] = useState<number | null>(null);
  const hasTriggeredRef = useRef(false);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);
  const goToIndexRef = useRef<(i: number) => void>(() => {});
  const openSpotRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current || !cardsRef.current) return;
    const items = gsap.utils.toArray<HTMLElement>(".quote-item", itemsRef.current);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      // ── GIAI ĐOẠN 1: ĐẶT TRẠNG THÁI KHỞI ĐẦU ──
      // Mọi thẻ thu nhỏ scale: 0.5, xếp chồng ở tâm với góc nghiêng nhẹ
      items.forEach((item, index) => {
        const sign = Math.floor((index / 2) % 2) ? 1 : -1;
        const value = Math.floor((index + 4) / 4) * 4;
        const initRot = index > TOTAL - 3 ? 0 : sign * value;
        gsap.set(item, {
          rotation: initRot,
          scale: 0.5,
          opacity: 0,
          transformOrigin: "center center",
        });
      });

      // Hàm kích hoạt chuỗi hiệu ứng: bay vào từ 2 bên -> chồng thành 1 đống -> tãi ra thành vòng cung
      const playEntrance = () => {
        if (hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;

        const tl = gsap.timeline();

        // ── GIAI ĐOẠN 2: BAY TỪ HAI BÊN MÀN HÌNH VÀO ĐỐNG TÂM ──
        items.forEach((item, index) => {
          tl.fromTo(
            item,
            {
              x: () =>
                index % 2
                  ? window.innerWidth + item.clientWidth * 4
                  : -window.innerWidth - item.clientWidth * 4,
              y: () => window.innerHeight - item.clientHeight,
              rotation: index % 2 ? 200 : -200,
              scale: 4,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 0.5,
              opacity: 1,
              rotation: () => {
                const sign = Math.floor((index / 2) % 2) ? 1 : -1;
                const value = Math.floor((index + 4) / 4) * 4;
                return index > TOTAL - 3 ? 0 : sign * value;
              },
              ease: "power4.out",
              duration: 1,
              delay: 0.15 * Math.floor(index / 2),
            },
            0,
          );
        });

        // ── GIAI ĐOẠN 3: TÃI ĐỐNG RA THÀNH VÒNG CUNG BỘ BÀI ──
        const fanOutTime = 0.15 * (TOTAL / 2 - 1) + 1;
        items.forEach((item, index) => {
          const rotationAngle = index * DEGREE;
          const finalRotation = index > TOTAL / 2 ? -DEGREE * (TOTAL - index) : rotationAngle;

          tl.to(item, { scale: 1, duration: 0.1 }, fanOutTime);
          tl.to(
            item,
            {
              transformOrigin: `center ${pivotR.current}`,
              rotation: finalRotation,
              duration: 1.2,
              ease: "power1.out",
            },
            fanOutTime,
          );
        });
      };

      // Kích hoạt khi người dùng cuộn tới phần các câu quote
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => playEntrance(),
      });

      const updateActive = (rot: number) => {
        // Thẻ ở đỉnh (12 giờ) là thẻ đang được kích hoạt
        let idx = Math.round(-rot / DEGREE) % TOTAL;
        idx = ((idx % TOTAL) + TOTAL) % TOTAL;
        setActiveIndex(idx);
      };

      // ── DRAGGABLE: XOAY VÒNG TRÒN VÀ BÁM VỀ THẺ GẦN NHẤT ──
      // allowNativeTouchScrolling: true → vertical swipes scroll the page, only
      // horizontal/rotational drags spin the carousel. Prevents the "stuck" feel.
      let start = 0;
      const draggableInst = Draggable.create(cardsRef.current, {
        type: "rotation",
        inertia: false,
        allowNativeTouchScrolling: true,
        // Mobile fix: Draggable preventDefault triệt tiêu synthetic `click`,
        // nên React onClick không kích hoạt trên touch. Dùng onClick riêng của
        // Draggable (chỉ kích hoạt khi chạm KHÔNG kèm kéo) để mở Spotlight.
        onClick: function () {
          const ev = this.pointerEvent as Event | undefined;
          if (!ev || !ev.target) return;
          const cardEl = (ev.target as HTMLElement).closest(".quote-item");
          if (!cardEl || !cardEl.parentElement) return;
          const idx = Array.prototype.indexOf.call(cardEl.parentElement.children, cardEl);
          if (idx >= 0 && idx < TOTAL) openSpotRef.current(idx);
        },
        onDragStart: function () {
          start = this.rotation;
        },
        onDragEnd: function () {
          const rotation = this.rotation;
          const offset = Math.abs(rotation - start);
          let target: number;
          if (rotation > start) {
            target = offset < DEGREE / 2 ? rotation - offset : rotation + (2 * DEGREE - offset);
          } else {
            target = offset < DEGREE / 2 ? rotation + offset : rotation - (2 * DEGREE - offset);
          }
          target = Math.round(target / DEGREE) * DEGREE;
          gsap.to(cardsRef.current, {
            rotation: target,
            duration: 0.8,
            ease: "power2.out",
            onUpdate: () => updateActive(target),
          });
        },
        onDrag: () => {
          if (!cardsRef.current) return;
          updateActive(gsap.getProperty(cardsRef.current, "rotation") as number);
        },
      });

      // ── goToIndex: xoay băng chuyền về đúng thẻ i (đường ngắn nhất) ──
      // Dùng cho điều hướng trong Spotlight — carousel xoay theo dưới lớp mờ.
      goToIndexRef.current = (i: number) => {
        if (!cardsRef.current) return;
        const current = gsap.getProperty(cardsRef.current, "rotation") as number;
        let target = -i * DEGREE;
        const turns = Math.round((current - target) / 360);
        target = target + turns * 360;
        gsap.to(cardsRef.current, {
          rotation: target,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => updateActive(target),
        });
      };

      return () => {
        draggableInst.forEach((d) => d.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Spotlight handlers ──
  const openSpot = useCallback((i: number) => {
    setActiveIndex(i);
    setSpotIndex(i);
  }, []);
  openSpotRef.current = openSpot;

  const closeSpot = useCallback(() => setSpotIndex(null), []);

  const nextSpot = useCallback(() => {
    setSpotIndex((prev) => {
      if (prev === null) return null;
      const next = (prev + 1) % TOTAL;
      setActiveIndex(next);
      goToIndexRef.current(next);
      return next;
    });
  }, []);

  const prevSpot = useCallback(() => {
    setSpotIndex((prev) => {
      if (prev === null) return null;
      const prev2 = (prev - 1 + TOTAL) % TOTAL;
      setActiveIndex(prev2);
      goToIndexRef.current(prev2);
      return prev2;
    });
  }, []);

  // ── Drag vs click detection on the cards ──
  const onCardPointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onCardClick = useCallback(
    (i: number) => (e: React.MouseEvent) => {
      const down = pointerDownRef.current;
      pointerDownRef.current = null;
      if (down) {
        const dist = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        if (dist > 8) return; // it was a drag, not a tap
      }
      openSpot(i);
    },
    [openSpot],
  );

  const isOpen = spotIndex !== null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 obsidian-surface overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 film-grain" />

      {/* ── Section heading ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/20 bg-black/60 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-gold-light)] font-semibold">
            LỜI JENSEN NÓI · 18 CÂU
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-semibold uppercase text-2xl sm:text-3xl md:text-4xl tracking-[0.08em] text-[var(--color-gold-light)] gradient-text-gold"
        >
          Băng Chuyền Tri Thức
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 font-sans text-sm sm:text-base text-[var(--color-foreground)]/70 max-w-xl mx-auto"
        >
          Kéo vòng tròn để xoay 18 câu nói được thử lửa. Chạm một thẻ để lật mặt sau và đọc trọn vẹn
          câu nói.
        </motion.p>
      </div>

      {/* ── 3D Circular Carousel stage (uốn cung theo quạt bài) ── */}
      <div className="relative z-10 w-full overflow-hidden" ref={itemsRef}>
        <div
          className="quote-stage relative mx-auto h-[520px] sm:h-[660px] md:h-[720px] transition-opacity duration-300"
          style={{ transformStyle: "preserve-3d", opacity: isOpen ? 0.35 : 1 }}
        >
          <div
            ref={cardsRef}
            className="quote-cards absolute left-1/2 top-[12%] sm:top-[15%]"
            style={{
              transformOrigin: `center ${pivotR.current}`,
              transformStyle: "preserve-3d",
            }}
          >
            {QUOTES.map((q, i) => (
              <div
                key={q.id}
                className="quote-item absolute cursor-pointer"
                style={{
                  left: "50%",
                  top: 0,
                  width: "clamp(220px, 24vw, 380px)",
                  height: "clamp(320px, 35vw, 540px)",
                  transform: "translateX(-50%)",
                }}
                onPointerDown={onCardPointerDown}
                onClick={onCardClick(i)}
              >
                <Quote3DCard quote={q} active={i === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-foreground)]/50">
            Kéo để xoay · thả để bám · chạm để lật
          </p>
        </div>
      </div>

      {/* ── Reading zone: full quote of the active card (quick view) ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 mt-6 sm:mt-10">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl border border-[var(--color-gold)]/25 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-md p-6 sm:p-10 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          {/* Amber radial */}
          <div className="absolute inset-0 bg-radial-[circle_at_top] from-[var(--color-gold)]/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col items-center text-center gap-4 sm:gap-5">
            <div className="flex items-center gap-3">
              <QuoteIcon className="w-4 h-4 text-[var(--color-gold)]/70" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold-light)] font-bold">
                CÂU {QUOTES[activeIndex].number} / 18
              </span>
              <QuoteIcon className="w-4 h-4 text-[var(--color-gold)]/70" />
            </div>
            <p className="font-display text-lg sm:text-2xl md:text-3xl leading-[1.45] text-[var(--color-gold-light)] tracking-tight">
              "{QUOTES[activeIndex].text}"
            </p>
            <button
              type="button"
              onClick={() => openSpot(activeIndex)}
              className="mt-1 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/45 bg-[var(--color-gold)]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold-light)] transition hover:bg-[var(--color-gold)]/20 hover:text-white cursor-pointer"
            >
              <QuoteIcon className="w-3.5 h-3.5" />
              Lật thẻ để đọc trọn vẹn
            </button>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--color-foreground)]/55">
              <span className="h-px w-10 bg-[var(--color-gold)]/40" />
              <span>JENSEN HUANG</span>
              <span className="h-px w-10 bg-[var(--color-gold)]/40" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Spotlight: full-screen flip reading experience ── */}
      <QuoteSpotlight
        spotIndex={spotIndex}
        quotes={QUOTES}
        total={TOTAL}
        onPrev={prevSpot}
        onNext={nextSpot}
        onClose={closeSpot}
      />
    </section>
  );
}

// ── Individual 3D card in the carousel (style thẻ bài viền chuẩn, quạt chồng khít) ──
function Quote3DCard({ quote, active }: { quote: (typeof QUOTES)[number]; active: boolean }) {
  return (
    <div
      className={`relative w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden border-[6px] sm:border-[8px] cursor-grab active:cursor-grabbing select-none transition-all duration-500 ${
        active
          ? "border-[var(--color-gold)] shadow-[0_0_45px_rgba(212,175,55,0.45)]"
          : "border-black/90 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
      }`}
    >
      {/* Background image — cinematic color */}
      <img
        src={quote.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700"
        style={{ transform: active ? "scale(1.04)" : "scale(1)" }}
        draggable={false}
      />
      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(7,7,9,0.3) 50%, rgba(7,7,9,0.85) 100%)",
          opacity: active ? 0.6 : 0.8,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/35"
        style={{ opacity: active ? 0.65 : 0.8 }}
      />
      {/* Content overlays */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 pointer-events-none">
        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-[11px] sm:text-xs font-bold tracking-widest px-2.5 py-0.5 rounded ${
              active
                ? "text-[var(--color-gold-light)] bg-black/80 border border-[var(--color-gold)]/60"
                : "text-white/80 bg-black/60"
            }`}
          >
            {quote.number}
          </span>
          {active && (
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-[var(--color-gold)]/90 font-semibold px-2 py-0.5 rounded bg-black/70 border border-[var(--color-gold)]/30">
              CHẠM ĐỂ LẬT
            </span>
          )}
        </div>
        <div className="flex items-end justify-center pb-1">
          <QuoteIcon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              active ? "text-[var(--color-gold)]" : "text-white/50"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
