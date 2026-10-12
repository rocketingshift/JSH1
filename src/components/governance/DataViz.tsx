import React, { useEffect, useRef } from "react";
import type { VizKey } from "./chapters-data";

/* ── Timeline 2008: 3 Falcon failures → 4th success → NASA → Tesla funding ── */
function Timeline2008() {
  const events = [
    { x: 8, title: "F1", subtitle: "Nổ", tone: "fail", pos: "bottom" },
    { x: 25, title: "F2", subtitle: "Nổ", tone: "fail", pos: "bottom" },
    { x: 42, title: "F3", subtitle: "Nổ", tone: "fail", pos: "bottom" },
    { x: 59, title: "F4", subtitle: "Bay!", tone: "win", pos: "bottom" },
    { x: 76, title: "NASA", subtitle: "1.5 tỷ đô", tone: "win", pos: "top" },
    { x: 92, title: "Tesla", subtitle: "Gọi vốn 18:00", tone: "win", pos: "bottom" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">TIMELINE // GIÁNG SINH 2008</div>
      <div className="relative h-32 sm:h-36 my-2">
        {/* Timeline track */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-gold)]/25 -translate-y-1/2" />
        {events.map((ev, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 viz-dot"
            style={{ left: `${ev.x}%`, transitionDelay: `${i * 0.12}s` }}
          >
            {/* Dot */}
            <span
              className={`block w-3 h-3 rounded-full border transition-all ${
                ev.tone === "win"
                  ? "bg-[var(--color-jade)] border-[var(--color-jade)] shadow-[0_0_12px_var(--color-jade)]"
                  : "bg-[var(--color-gold-dark)] border-[var(--color-gold)]/60"
              }`}
            />

            {/* Label - structured with title & subtitle to prevent text collisions */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap ${
                ev.pos === "top" ? "bottom-5" : "top-5"
              }`}
            >
              <div
                className={`font-mono text-[10px] sm:text-[11px] font-semibold leading-tight ${
                  ev.tone === "win"
                    ? "text-[var(--color-jade-glow)]"
                    : "text-[var(--color-gold-light)]"
                }`}
              >
                {ev.title}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-[var(--color-foreground)]/65 leading-tight mt-0.5">
                {ev.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Cost bars: commercial rocket vs raw materials (50–70×) ── */
function CostBars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">CHI PHÍ // 50–70× GAP</div>
      <div className="space-y-3 my-3">
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1">
            <span className="text-[var(--color-gold-light)]">Tên lửa thương mại</span>
            <span className="text-[var(--color-gold)]/70">100%</span>
          </div>
          <div className="h-3 rounded-full bg-black/60 border border-[var(--color-gold)]/30 overflow-hidden">
            <div
              className="viz-bar h-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold)]"
              style={{ ["--w" as string]: "100%", transitionDelay: "0.1s" } as React.CSSProperties}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-mono mb-1">
            <span className="text-[var(--color-jade-glow)]">Nguyên liệu thô</span>
            <span className="text-[var(--color-jade)]/80">~1.5%</span>
          </div>
          <div className="h-3 rounded-full bg-black/60 border border-[var(--color-gold)]/30 overflow-hidden">
            <div
              className="viz-bar h-full bg-gradient-to-r from-[var(--color-jade)] to-[var(--color-jade-glow)]"
              style={{ ["--w" as string]: "1.5%", transitionDelay: "0.45s" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
      <p className="text-[11px] font-mono text-[var(--color-muted-foreground)]">
        Hao phí nằm ở cách làm — không phải nguyên liệu.
      </p>
    </div>
  );
}

/* ── Pie growth: zero-sum (fixed) vs positive-sum (growing) ── */
function PieGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">CHIẾC BÁNH // TỔNG KHÁC ZERO</div>
      <div className="grid grid-cols-2 gap-4 my-3">
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold-dark)]/50" />
            <div className="viz-scale absolute inset-0 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/40" />
          </div>
          <div className="text-[11px] font-mono mt-2 text-[var(--color-muted-foreground)]">
            Tư duy = 0 · bánh cố định
          </div>
        </div>
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold-dark)]/50" />
            <div className="viz-grow absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-gold)]/30 to-[var(--color-jade)]/30 border border-[var(--color-jade)]/50" />
          </div>
          <div className="text-[11px] font-mono mt-2 text-[var(--color-jade-glow)]">
            Tạo giá trị · bánh nở ra
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── AI efficiency exponential growth: 10,000× from 2016→2024 ── */
function AIEfficiency10k() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">HIỆU QUẢ NĂNG LƯỢNG // AI · 2016—2024</div>
      <div className="relative my-3">
        <svg viewBox="0 0 320 160" className="w-full h-auto">
          <defs>
            <linearGradient id="aiCurveGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="aiAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-jade)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[40, 80, 120].map((y) => (
            <line
              key={y}
              x1="20"
              y1={y}
              x2="300"
              y2={y}
              stroke="var(--color-gold)"
              strokeOpacity="0.08"
              strokeDasharray="2 4"
            />
          ))}
          {/* X-axis baseline */}
          <line x1="20" y1="140" x2="300" y2="140" stroke="var(--color-gold)" strokeOpacity="0.3" />
          {/* Area fill under curve */}
          <path
            className="viz-ai-area"
            d="M 20 140 C 80 138, 140 128, 180 90 S 250 28, 300 12 L 300 140 L 20 140 Z"
            fill="url(#aiAreaGrad)"
          />
          {/* Exponential curve */}
          <path
            pathLength={100}
            className="viz-ai-curve"
            d="M 20 140 C 80 138, 140 128, 180 90 S 250 28, 300 12"
            fill="none"
            stroke="url(#aiCurveGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Start dot (2016) */}
          <circle
            className="viz-ai-dot"
            cx="20"
            cy="140"
            r="4"
            fill="var(--color-gold)"
            style={{ transitionDelay: "0.4s" } as React.CSSProperties}
          />
          {/* End dot (2024) */}
          <circle
            className="viz-ai-dot"
            cx="300"
            cy="12"
            r="5"
            fill="var(--color-jade)"
            style={{ transitionDelay: "1.6s" } as React.CSSProperties}
          />
        </svg>
        {/* Big 10.000× label overlay */}
        <div
          className="viz-fade-up absolute top-2 right-3 text-right"
          style={{ transitionDelay: "1.8s" } as React.CSSProperties}
        >
          <span className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-jade-glow)]">
            10.000×
          </span>
        </div>
      </div>
      <div className="flex justify-between text-[10px] font-mono text-[var(--color-foreground)]/50">
        <span>2016</span>
        <span className="text-[var(--color-jade)]/80">8 năm · 10.000×</span>
      </div>
    </div>
  );
}

/* ── Lightbulb comparison: 100W → 0.01W, same brightness ── */
function LightbulbCompare() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">BÓNG ĐÈN // CÙNG ĐỘ SÁNG</div>
      <div className="flex items-center justify-center gap-3 sm:gap-8 my-6">
        {/* Big bulb — 100W */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="viz-bulb-big relative flex items-center justify-center"
            style={{ width: 88, height: 88 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 65%)",
              }}
            />
            <svg viewBox="0 0 88 88" width="88" height="88">
              <circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <circle
                cx="44"
                cy="44"
                r="30"
                fill="var(--color-gold)"
                fillOpacity="0.1"
                stroke="var(--color-gold)"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              <circle cx="44" cy="44" r="14" fill="var(--color-gold-light)" fillOpacity="0.12" />
            </svg>
          </div>
          <span className="font-mono text-[11px] text-[var(--color-gold-light)]">100W</span>
        </div>

        {/* Arrow / multiplier */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="font-mono text-[8px] text-[var(--color-foreground)]/40">hiệu quả</span>
          <span className="font-display font-bold text-lg sm:text-xl text-[var(--color-jade-glow)]">
            ×10.000
          </span>
          <span className="font-mono text-[8px] text-[var(--color-foreground)]/40">năng lượng</span>
        </div>

        {/* Tiny bulb — 0.01W */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="viz-bulb-tiny relative flex items-center justify-center"
            style={{ width: 88, height: 88 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(56,180,216,0.3) 0%, transparent 65%)",
              }}
            />
            <svg viewBox="0 0 88 88" width="88" height="88">
              <circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="var(--color-jade)"
                strokeWidth="0.5"
                strokeOpacity="0.12"
              />
              <circle cx="44" cy="44" r="3" fill="var(--color-jade)" />
            </svg>
          </div>
          <span className="font-mono text-[11px] text-[var(--color-jade-glow)]">0.01W</span>
        </div>
      </div>
      <p className="text-[11px] font-mono text-[var(--color-foreground)]/50 text-center">
        Cùng độ sáng · năng lượng giảm 10.000 lần
      </p>
    </div>
  );
}

/* ── Marginal cost of intelligence → 0 ── */
function MarginalCostZero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">CHI PHÍ BIÊN // TRÍ TUỆ → 0</div>
      <svg viewBox="0 0 320 130" className="w-full h-auto my-2">
        <defs>
          <linearGradient id="costCurveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="costAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[30, 60, 90].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="300"
            y2={y}
            stroke="var(--color-gold)"
            strokeOpacity="0.08"
            strokeDasharray="2 4"
          />
        ))}
        {/* Area fill */}
        <path
          className="viz-ai-area"
          d="M 20 25 C 80 35, 140 70, 200 95 S 270 113, 300 115 L 300 115 L 20 115 Z"
          fill="url(#costAreaGrad)"
        />
        {/* Descending curve approaching zero */}
        <path
          pathLength={100}
          className="viz-cost-curve"
          d="M 20 25 C 80 35, 140 70, 200 95 S 270 113, 300 115"
          fill="none"
          stroke="url(#costCurveGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Zero dashed line */}
        <line
          className="viz-cost-zero"
          x1="20"
          y1="115"
          x2="300"
          y2="115"
          stroke="var(--color-jade)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeOpacity="0.6"
        />
        {/* Start dot */}
        <circle
          className="viz-ai-dot"
          cx="20"
          cy="25"
          r="4"
          fill="var(--color-gold)"
          style={{ transitionDelay: "0.4s" } as React.CSSProperties}
        />
        {/* End dot */}
        <circle
          className="viz-ai-dot"
          cx="300"
          cy="115"
          r="4"
          fill="var(--color-jade)"
          style={{ transitionDelay: "1.4s" } as React.CSSProperties}
        />
        {/* Zero label */}
        <text
          className="viz-cost-zero"
          x="312"
          y="119"
          fill="var(--color-jade)"
          fontSize="10"
          fontFamily="monospace"
          opacity="0.7"
        >
          0
        </text>
      </svg>
      <div className="flex justify-between text-[10px] font-mono text-[var(--color-foreground)]/50">
        <span className="text-[var(--color-gold-light)]">Trí tuệ đắt</span>
        <span className="text-[var(--color-jade)]/80">Trí tuệ ≈ 0</span>
      </div>
    </div>
  );
}

/* ── Market Zero: thị phần (chia bánh cố định) vs thị trường 0 tỷ ── */
function MarketZero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">THỊ TRƯỜNG // 0 TỶ = KHÔNG ĐỐI THỦ</div>
      <div className="grid grid-cols-2 gap-4 my-3">
        {/* Left: thị phần — cố định, chia nhau */}
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24">
            {/* Pie cut into competing slices */}
            <svg viewBox="0 0 96 96" className="w-full h-full">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              <path
                d="M 48 48 L 48 8 A 40 40 0 0 1 86 36 Z"
                fill="var(--color-gold)"
                fillOpacity="0.18"
                stroke="var(--color-gold)"
                strokeOpacity="0.4"
                strokeWidth="0.8"
              />
              <path
                d="M 48 48 L 86 36 A 40 40 0 0 1 76 76 Z"
                fill="var(--color-gold-dark)"
                fillOpacity="0.12"
                stroke="var(--color-gold)"
                strokeOpacity="0.3"
                strokeWidth="0.8"
              />
              <path
                d="M 48 48 L 76 76 A 40 40 0 0 1 20 76 Z"
                fill="var(--color-gold)"
                fillOpacity="0.08"
                stroke="var(--color-gold)"
                strokeOpacity="0.25"
                strokeWidth="0.8"
              />
              <path
                d="M 48 48 L 20 76 A 40 40 0 0 1 48 8 Z"
                fill="var(--color-gold-dark)"
                fillOpacity="0.1"
                stroke="var(--color-gold)"
                strokeOpacity="0.2"
                strokeWidth="0.8"
              />
            </svg>
          </div>
          <div className="mt-2 font-mono text-[10px] text-[var(--color-foreground)]/55 leading-tight">
            Thị phần
          </div>
          <div className="font-mono text-[9px] text-[var(--color-gold-light)]/70 leading-tight">
            Chia nhau · cố định
          </div>
        </div>
        {/* Right: 0 tỷ — không đối thủ, không cạnh tranh */}
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 96 96" className="w-full h-full">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="var(--color-jade)"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x="48"
                y="44"
                textAnchor="middle"
                fontSize="20"
                fontFamily="var(--font-mono)"
                fill="var(--color-jade-glow)"
                opacity="0.85"
              >
                0
              </text>
              <text
                x="48"
                y="58"
                textAnchor="middle"
                fontSize="7"
                fontFamily="var(--font-mono)"
                fill="var(--color-jade)"
                opacity="0.6"
              >
                TỶ $
              </text>
            </svg>
          </div>
          <div className="mt-2 font-mono text-[10px] text-[var(--color-foreground)]/55 leading-tight">
            Thị trường 0 tỷ
          </div>
          <div className="font-mono text-[9px] text-[var(--color-jade-glow)] leading-tight">
            Không đối thủ · tạo mới
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Industrial Revolutions: so sánh song song 2 cuộc cách mạng ── */
function IndustrialRevolutions() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">HAI CUỘC CÁCH MẠNG CÔNG NGHIỆP</div>
      <div className="space-y-3 my-3">
        {/* Revolution 1: nguyên tử → electron → điện */}
        <div className="viz-fade-up p-3 rounded-lg bg-black/40 border border-[var(--color-gold)]/20">
          <div className="font-mono text-[9px] tracking-wider uppercase text-[var(--color-gold)]/75 mb-2">
            Cách mạng I
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-[var(--color-gold-light)]">Nguyên tử</span>
            <span className="text-[var(--color-foreground)]/40">→</span>
            <span className="text-[var(--color-gold-light)]">Electron</span>
            <span className="text-[var(--color-foreground)]/40">→</span>
            <span className="text-[var(--color-gold)]/85">Điện</span>
          </div>
          <p className="mt-1.5 font-mono text-[9px] text-[var(--color-foreground)]/45 leading-tight">
            Bán theo kilowatt giờ
          </p>
        </div>
        {/* Revolution 2: electron → token → trí tuệ */}
        <div
          className="viz-fade-up p-3 rounded-lg bg-black/40 border border-[var(--color-jade)]/25"
          style={{ transitionDelay: "0.4s" } as React.CSSProperties}
        >
          <div className="font-mono text-[9px] tracking-wider uppercase text-[var(--color-jade)]/80 mb-2">
            Cách mạng AI
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-[var(--color-jade-glow)]">Electron</span>
            <span className="text-[var(--color-foreground)]/40">→</span>
            <span className="text-[var(--color-jade-glow)]">Token</span>
            <span className="text-[var(--color-foreground)]/40">→</span>
            <span className="text-[var(--color-jade)]">Trí tuệ</span>
          </div>
          <p className="mt-1.5 font-mono text-[9px] text-[var(--color-foreground)]/45 leading-tight">
            1.000.000 token trên mỗi đô la
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Token Factory: 1 token → 8 dạng trí tuệ tỏa ra ── */
function TokenFactory() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("viz-in")),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const outputs = [
    "Tiếng Anh",
    "Tiếng Pháp",
    "Protein",
    "Hóa chất",
    "Đồ họa",
    "Hình ảnh",
    "Video",
    "Robot",
  ];
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">NHÀ MÁY AI // TOKEN → TRÍ TUỆ</div>
      <div className="relative my-4 flex items-center justify-center min-h-[140px]">
        {/* Center source: 1 token */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
          <div
            className="viz-ai-dot w-12 h-12 rounded-full border-2 border-[var(--color-jade)]/50 flex items-center justify-center"
            style={{ transitionDelay: "0.2s" } as React.CSSProperties}
          >
            <span className="font-mono text-[10px] font-bold text-[var(--color-jade-glow)]">
              1$
            </span>
          </div>
          <div className="mt-1 font-mono text-[8px] text-[var(--color-foreground)]/45 leading-tight whitespace-nowrap">
            1.000.000
            <br />
            token
          </div>
        </div>
        {/* Radial outputs */}
        <div className="ml-24 mr-4 grid grid-cols-4 gap-x-3 gap-y-2.5 max-w-[260px]">
          {outputs.map((o, i) => (
            <div
              key={i}
              className="viz-ai-dot flex items-center gap-1.5"
              style={{ transitionDelay: `${0.6 + i * 0.08}s` } as React.CSSProperties}
            >
              <span className="w-1 h-1 rounded-full bg-[var(--color-jade)] shrink-0" />
              <span className="font-mono text-[9px] text-[var(--color-foreground)]/65 leading-tight whitespace-nowrap">
                {o}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] font-mono text-[var(--color-muted-foreground)] text-center">
        Tái cấu trúc token thành 8 dạng trí tuệ
      </p>
    </div>
  );
}

const VIZ: Record<VizKey, () => React.ReactElement> = {
  timeline2008: Timeline2008,
  costbars: CostBars,
  piegrowth: PieGrowth,
  aiEfficiency10k: AIEfficiency10k,
  lightbulbCompare: LightbulbCompare,
  marginalCostZero: MarginalCostZero,
  marketZero: MarketZero,
  industrialRevolutions: IndustrialRevolutions,
  tokenFactory: TokenFactory,
};

export function DataViz({ viz }: { viz: VizKey }) {
  const Comp = VIZ[viz];
  return <Comp />;
}
