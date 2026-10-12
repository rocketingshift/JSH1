import React, { useEffect, useRef } from "react";

/* ── Passion vs Happiness: misconception (flat) vs reality (dip → soar) ── */
function PassionHappiness() {
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
      <div className="viz-title">ĐAM MÊ // HIỂU LẪM vs THỰC TẾ</div>
      <div className="relative my-3">
        <svg viewBox="0 0 320 170" className="w-full h-auto">
          <defs>
            <linearGradient id="passionRealGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.6" />
              <stop offset="55%" stopColor="var(--color-gold-dark)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="passionMythGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Grid */}
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
          {/* X-axis */}
          <line x1="20" y1="150" x2="300" y2="150" stroke="var(--color-gold)" strokeOpacity="0.3" />

          {/* Myth curve — flat happy line (misconception) */}
          <path
            className="viz-cost-curve"
            pathLength={100}
            d="M 20 60 C 100 58, 200 62, 300 55"
            fill="none"
            stroke="url(#passionMythGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
          {/* Myth label */}
          <text
            x="28"
            y="50"
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="var(--color-gold-light)"
            opacity="0.5"
          >
            "Đam mê = hạnh phúc"
          </text>

          {/* Reality curve — dips into the valley of pain then soars to greatness */}
          <path
            className="viz-ai-curve"
            pathLength={100}
            d="M 20 55 C 70 60, 100 120, 140 125 S 190 110, 210 90 S 270 25, 300 15"
            fill="none"
            stroke="url(#passionRealGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Valley of pain marker */}
          <circle
            className="viz-ai-dot"
            cx="140"
            cy="125"
            r="4"
            fill="var(--color-gold-dark)"
            fillOpacity="0.6"
            stroke="var(--color-gold)"
            strokeOpacity="0.7"
            strokeWidth="0.6"
            style={{ transitionDelay: "1s" } as React.CSSProperties}
          />
          <text
            x="140"
            y="142"
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.5"
            className="viz-ai-dot"
            style={{ transitionDelay: "1.2s" } as React.CSSProperties}
          >
            vật lộn
          </text>
          {/* Greatness marker */}
          <circle
            className="viz-ai-dot"
            cx="300"
            cy="15"
            r="5"
            fill="var(--color-jade)"
            fillOpacity="0.7"
            style={{ transitionDelay: "1.8s" } as React.CSSProperties}
          />
          <text
            x="300"
            y="8"
            textAnchor="end"
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="var(--color-jade-glow)"
            opacity="0.9"
            className="viz-ai-dot"
            style={{ transitionDelay: "2s" } as React.CSSProperties}
          >
            vĩ đại
          </text>
          {/* Start */}
          <circle
            className="viz-ai-dot"
            cx="20"
            cy="55"
            r="3.5"
            fill="var(--color-gold)"
            style={{ transitionDelay: "0.3s" } as React.CSSProperties}
          />
          <text
            x="22"
            y="165"
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.4"
          >
            bắt đầu
          </text>
          <text
            x="280"
            y="165"
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.4"
          >
            thời gian →
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-gold)]/15">
          <div className="font-mono text-[8px] text-[var(--color-gold-light)]/70 leading-tight">
            Lạc quan ban đầu → hạnh phúc đều đều
          </div>
        </div>
        <div
          className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-jade)]/20"
          style={{ transitionDelay: "0.5s" } as React.CSSProperties}
        >
          <div className="font-mono text-[8px] text-[var(--color-jade-glow)] leading-tight">
            Chịu đựng → vượt qua → trân trọng
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Superpower Ranking: intelligence is NOT #1 ── */
function SuperpowerRanking() {
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

  const powers = [
    { rank: 1, label: "Khả năng chịu đựng nỗi đau", tone: "top" },
    { rank: 2, label: "Kiên trì làm việc lâu dài", tone: "high" },
    { rank: 3, label: "Vượt thất bại → nhìn cơ hội", tone: "high" },
    { rank: 4, label: "Trí thông minh", tone: "low" },
  ];

  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">SIÊU NĂNG LỰC // XẾP HẠNG CỦA JENSEN</div>
      <div className="space-y-2 my-3">
        {powers.map((p, i) => {
          const isTop = p.tone === "top";
          const isHigh = p.tone === "high";
          const isLow = p.tone === "low";
          const width = isTop ? "100%" : isHigh ? "88%" : "45%";
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] font-bold w-5 text-right shrink-0 ${
                  isLow ? "text-[var(--color-foreground)]/40" : "text-[var(--color-jade-glow)]"
                }`}
              >
                {p.rank}
              </span>
              <div className="flex-1 h-6 rounded-md bg-black/50 border border-[var(--color-gold)]/15 overflow-hidden relative">
                <div
                  className={`viz-bar h-full rounded-md flex items-center px-2 ${
                    isLow
                      ? "bg-gradient-to-r from-[var(--color-gold-dark)]/30 to-[var(--color-gold)]/20"
                      : isTop
                        ? "bg-gradient-to-r from-[var(--color-jade)] to-[var(--color-jade-glow)]"
                        : "bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-jade)]/70"
                  }`}
                  style={
                    {
                      ["--w" as string]: width,
                      transitionDelay: `${0.15 + i * 0.18}s`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={`font-mono text-[8px] sm:text-[9px] font-semibold whitespace-nowrap truncate ${
                      isLow ? "text-[var(--color-foreground)]/55" : "text-black/80"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] font-mono text-[var(--color-foreground)]/50 text-center mt-1">
        "Trí thông minh không đứng đầu danh sách" · chịu đựng + kiên trì = siêu năng lực
      </p>
    </div>
  );
}

/* ── Paradox Blessing: pain → greatness (the counterintuitive wish) ── */
function ParadoxBlessing() {
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
      <div className="viz-title">LỜI CHÚC NGƯỢC ĐỜI // ĐAU ĐỚN → VĨ ĐẠI</div>
      <div className="relative my-4 flex items-center justify-center min-h-[120px]">
        <svg viewBox="0 0 300 120" className="w-full h-auto">
          <defs>
            <linearGradient id="paradoxArrowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="var(--color-gold-dark)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Left node: pain */}
          <g className="viz-ai-dot" style={{ transitionDelay: "0.2s" } as React.CSSProperties}>
            <circle
              cx="40"
              cy="60"
              r="22"
              fill="var(--color-gold)"
              fillOpacity="0.1"
              stroke="var(--color-gold)"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            <text
              x="40"
              y="57"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--color-gold-light)"
              opacity="0.9"
            >
              đau
            </text>
            <text
              x="40"
              y="68"
              textAnchor="middle"
              fontSize="7"
              fontFamily="var(--font-mono)"
              fill="var(--color-gold)"
              opacity="0.6"
            >
              đớn
            </text>
          </g>

          {/* Arrow path — curving upward from pain to greatness */}
          <path
            className="viz-cost-curve"
            pathLength={100}
            d="M 66 60 C 120 62, 160 40, 200 28 S 240 18, 256 14"
            fill="none"
            stroke="url(#paradoxArrowGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <path
            className="viz-ai-dot"
            d="M 256 14 L 248 16 L 252 22 Z"
            fill="var(--color-jade)"
            style={{ transitionDelay: "1.6s" } as React.CSSProperties}
          />

          {/* Right node: greatness */}
          <g className="viz-ai-dot" style={{ transitionDelay: "1.4s" } as React.CSSProperties}>
            <circle
              cx="265"
              cy="40"
              r="28"
              fill="var(--color-jade)"
              fillOpacity="0.1"
              stroke="var(--color-jade)"
              strokeOpacity="0.6"
              strokeWidth="1"
            />
            {/* Aura ring */}
            <circle
              cx="265"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--color-jade)"
              strokeOpacity="0.25"
              strokeWidth="0.6"
              strokeDasharray="3 3"
            />
            <text
              x="265"
              y="37"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fill="var(--color-jade-glow)"
              opacity="0.9"
            >
              vĩ
            </text>
            <text
              x="265"
              y="48"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fill="var(--color-jade-glow)"
              opacity="0.9"
            >
              đại
            </text>
          </g>

          {/* Label under the curve */}
          <text
            x="150"
            y="100"
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.5"
            className="viz-fade-up"
            style={{ transitionDelay: "2s" } as React.CSSProperties}
          >
            "Tôi chúc bạn có thật nhiều đau đớn và gian khổ"
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-gold)]/15 text-center">
          <div className="font-mono text-[8px] text-[var(--color-gold-light)]/70 leading-tight">
            không dễ dàng
          </div>
        </div>
        <div
          className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-jade)]/20 text-center"
          style={{ transitionDelay: "0.5s" } as React.CSSProperties}
        >
          <div className="font-mono text-[8px] text-[var(--color-jade-glow)] leading-tight">
            mới trân trọng được
          </div>
        </div>
      </div>
    </div>
  );
}

export const CODE5_VIZ = {
  passionHappiness: PassionHappiness,
  superpowerRanking: SuperpowerRanking,
  paradoxBlessing: ParadoxBlessing,
} satisfies Record<
  "passionHappiness" | "superpowerRanking" | "paradoxBlessing",
  () => React.ReactElement
>;
