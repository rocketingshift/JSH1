import React, { useEffect, useRef } from "react";

/* ── Org Chart: traditional hierarchy vs Jensen's flat 60 direct reports ── */
function OrgChartFlat() {
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
      <div className="viz-title">CẤU TRÚC // CEO → 60 BÁO CÁO TRỰC TIẾP</div>
      <div className="grid grid-cols-2 gap-3 my-3">
        {/* Left: Traditional deep hierarchy */}
        <div className="viz-fade-up p-3 rounded-lg bg-black/40 border border-[var(--color-gold)]/20">
          <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-gold)]/75 mb-2 text-center">
            Truyền thống
          </div>
          <svg viewBox="0 0 120 90" className="w-full h-auto">
            <rect
              x="48"
              y="2"
              width="24"
              height="9"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.2"
              stroke="var(--color-gold)"
              strokeOpacity="0.5"
              strokeWidth="0.7"
            />
            <text
              x="60"
              y="8.5"
              textAnchor="middle"
              fontSize="4.5"
              fontFamily="var(--font-mono)"
              fill="var(--color-gold-light)"
            >
              CEO
            </text>
            <line
              x1="60"
              y1="11"
              x2="60"
              y2="16"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <line
              x1="24"
              y1="16"
              x2="96"
              y2="16"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <line
              x1="24"
              y1="16"
              x2="24"
              y2="21"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <line
              x1="60"
              y1="16"
              x2="60"
              y2="21"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <line
              x1="96"
              y1="16"
              x2="96"
              y2="21"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <rect
              x="12"
              y="21"
              width="24"
              height="8"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.12"
              stroke="var(--color-gold)"
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
            <rect
              x="48"
              y="21"
              width="24"
              height="8"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.12"
              stroke="var(--color-gold)"
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
            <rect
              x="84"
              y="21"
              width="24"
              height="8"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.12"
              stroke="var(--color-gold)"
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
            <line
              x1="24"
              y1="29"
              x2="24"
              y2="34"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.4"
            />
            <line
              x1="60"
              y1="29"
              x2="60"
              y2="34"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.4"
            />
            <line
              x1="96"
              y1="29"
              x2="96"
              y2="34"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.4"
            />
            <rect
              x="14"
              y="34"
              width="20"
              height="7"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.06"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.4"
            />
            <rect
              x="50"
              y="34"
              width="20"
              height="7"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.06"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.4"
            />
            <rect
              x="86"
              y="34"
              width="20"
              height="7"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.06"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeWidth="0.4"
            />
            <line
              x1="24"
              y1="41"
              x2="24"
              y2="46"
              stroke="var(--color-gold)"
              strokeOpacity="0.15"
              strokeWidth="0.4"
            />
            <line
              x1="60"
              y1="41"
              x2="60"
              y2="46"
              stroke="var(--color-gold)"
              strokeOpacity="0.15"
              strokeWidth="0.4"
            />
            <line
              x1="96"
              y1="41"
              x2="96"
              y2="46"
              stroke="var(--color-gold)"
              strokeOpacity="0.15"
              strokeWidth="0.4"
            />
            <rect
              x="16"
              y="46"
              width="16"
              height="6"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.04"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.3"
            />
            <rect
              x="52"
              y="46"
              width="16"
              height="6"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.04"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.3"
            />
            <rect
              x="88"
              y="46"
              width="16"
              height="6"
              rx="2"
              fill="var(--color-gold)"
              fillOpacity="0.04"
              stroke="var(--color-gold)"
              strokeOpacity="0.2"
              strokeWidth="0.3"
            />
          </svg>
          <div className="font-mono text-[8px] text-[var(--color-foreground)]/40 text-center mt-1">
            4+ cấp · thông tin đóng kín
          </div>
        </div>
        {/* Right: Jensen's flat structure */}
        <div
          className="viz-fade-up p-3 rounded-lg bg-black/40 border border-[var(--color-jade)]/25"
          style={{ transitionDelay: "0.4s" } as React.CSSProperties}
        >
          <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-jade)]/80 mb-2 text-center">
            Jensen Huang
          </div>
          <svg viewBox="0 0 120 90" className="w-full h-auto">
            <rect
              x="46"
              y="2"
              width="28"
              height="11"
              rx="2"
              fill="var(--color-jade)"
              fillOpacity="0.25"
              stroke="var(--color-jade)"
              strokeOpacity="0.6"
              strokeWidth="0.7"
            />
            <text
              x="60"
              y="9.5"
              textAnchor="middle"
              fontSize="5"
              fontFamily="var(--font-mono)"
              fill="var(--color-jade-glow)"
            >
              CEO
            </text>
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 18 + i * 10.5;
              return (
                <line
                  key={`l${i}`}
                  x1="60"
                  y1="13"
                  x2={x}
                  y2="46"
                  stroke="var(--color-jade)"
                  strokeOpacity="0.2"
                  strokeWidth="0.5"
                />
              );
            })}
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 18 + i * 10.5;
              return (
                <circle
                  key={`d${i}`}
                  cx={x}
                  cy="48"
                  r="3.2"
                  fill="var(--color-jade)"
                  fillOpacity="0.15"
                  stroke="var(--color-jade)"
                  strokeOpacity="0.5"
                  strokeWidth="0.5"
                  className="viz-ai-dot"
                  style={{ transitionDelay: `${0.3 + i * 0.06}s` } as React.CSSProperties}
                />
              );
            })}
            <text
              x="60"
              y="62"
              textAnchor="middle"
              fontSize="8"
              fontFamily="var(--font-mono)"
              fill="var(--color-jade-glow)"
              opacity="0.85"
            >
              60
            </text>
            <text
              x="60"
              y="69"
              textAnchor="middle"
              fontSize="4"
              fontFamily="var(--font-mono)"
              fill="var(--color-jade)"
              opacity="0.6"
            >
              BÁO CÁO TRỰC TIẾP
            </text>
          </svg>
          <div className="font-mono text-[8px] text-[var(--color-jade)]/60 text-center mt-1">
            1 cấp · thông tin mở rộng
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Broadcast Comms: 1-on-1 silos vs all-hands broadcast ── */
function BroadcastComms() {
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
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">THÔNG TIN // CHIA SẺ = QUYỀN LỰC NHÂN LÊN</div>
      <div className="grid grid-cols-2 gap-4 my-3">
        {/* Left: 1-on-1 — silos, fragmented */}
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24">
            <svg viewBox="0 0 96 96" className="w-full h-full">
              <circle
                cx="48"
                cy="48"
                r="7"
                fill="var(--color-gold)"
                fillOpacity="0.2"
                stroke="var(--color-gold)"
                strokeOpacity="0.5"
                strokeWidth="0.8"
              />
              <line
                x1="48"
                y1="48"
                x2="20"
                y2="24"
                stroke="var(--color-gold)"
                strokeOpacity="0.3"
                strokeWidth="0.7"
                strokeDasharray="2 2"
              />
              <circle
                cx="20"
                cy="24"
                r="4.5"
                fill="var(--color-gold)"
                fillOpacity="0.1"
                stroke="var(--color-gold)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              <line
                x1="48"
                y1="48"
                x2="76"
                y2="22"
                stroke="var(--color-gold)"
                strokeOpacity="0.2"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <circle
                cx="76"
                cy="22"
                r="4.5"
                fill="var(--color-gold)"
                fillOpacity="0.1"
                stroke="var(--color-gold)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              <line
                x1="48"
                y1="48"
                x2="24"
                y2="72"
                stroke="var(--color-gold)"
                strokeOpacity="0.2"
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <circle
                cx="24"
                cy="72"
                r="4.5"
                fill="var(--color-gold)"
                fillOpacity="0.1"
                stroke="var(--color-gold)"
                strokeOpacity="0.3"
                strokeWidth="0.5"
              />
              {/* Isolated node — NOT connected, shows silo */}
              <circle
                cx="72"
                cy="70"
                r="4.5"
                fill="var(--color-gold)"
                fillOpacity="0.08"
                stroke="var(--color-gold)"
                strokeOpacity="0.2"
                strokeWidth="0.4"
              />
            </svg>
          </div>
          <div className="mt-2 font-mono text-[10px] text-[var(--color-foreground)]/55">
            Họp 1-1
          </div>
          <div className="font-mono text-[9px] text-[var(--color-gold-light)]/70">
            Thông tin cô lập
          </div>
        </div>
        {/* Right: all-hands — broadcast to all */}
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 96 96" className="w-full h-full">
              <circle
                cx="48"
                cy="48"
                r="7"
                fill="var(--color-jade)"
                fillOpacity="0.3"
                stroke="var(--color-jade)"
                strokeOpacity="0.6"
                strokeWidth="0.8"
              />
              <circle
                cx="48"
                cy="48"
                r="18"
                fill="none"
                stroke="var(--color-jade)"
                strokeOpacity="0.3"
                strokeWidth="0.7"
              />
              <circle
                cx="48"
                cy="48"
                r="30"
                fill="none"
                stroke="var(--color-jade)"
                strokeOpacity="0.2"
                strokeWidth="0.5"
              />
              {angles.map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = 48 + 28 * Math.cos(rad);
                const y = 48 + 28 * Math.sin(rad);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--color-jade)"
                    fillOpacity="0.2"
                    stroke="var(--color-jade)"
                    strokeOpacity="0.5"
                    strokeWidth="0.5"
                    className="viz-ai-dot"
                    style={{ transitionDelay: `${0.4 + i * 0.08}s` } as React.CSSProperties}
                  />
                );
              })}
            </svg>
          </div>
          <div className="mt-2 font-mono text-[10px] text-[var(--color-foreground)]/55">
            All-hands
          </div>
          <div className="font-mono text-[9px] text-[var(--color-jade-glow)]">
            Cùng nghe · trao quyền
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Team Scale: 28,000 people, small team feel, punch above weight ── */
function TeamScale() {
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
      <div className="viz-title">ĐỘI NGŨ NHỎ · 28.000 NGƯỜI</div>
      <div className="my-4 flex flex-col items-center gap-4">
        <div className="viz-fade-up text-center">
          <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-jade-glow)]">
            28.000
          </span>
          <span className="font-mono text-[11px] text-[var(--color-foreground)]/50 ml-2">
            người
          </span>
        </div>
        <div className="flex items-end justify-center gap-4 sm:gap-6 my-2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-[var(--color-jade)]/60 viz-ai-dot"
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` } as React.CSSProperties}
                />
              ))}
            </div>
            <span className="font-mono text-[8px] text-[var(--color-jade-glow)] mt-0.5">
              Đội nhỏ
            </span>
          </div>
          <span className="font-display font-bold text-base sm:text-lg text-[var(--color-gold)]/80 pb-3">
            vs
          </span>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap gap-1 max-w-[80px] justify-center">
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[var(--color-gold)]/30 viz-ai-dot"
                  style={{ transitionDelay: `${0.5 + i * 0.05}s` } as React.CSSProperties}
                />
              ))}
            </div>
            <span className="font-mono text-[8px] text-[var(--color-gold-light)]/70 mt-0.5">
              Hạng cân nặng
            </span>
          </div>
        </div>
        <p className="font-mono text-[10px] text-[var(--color-muted-foreground)] text-center max-w-[280px]">
          &ldquo;Đấm vượt hạng cân&rdquo; · cảm giác đội nhỏ trong một đoàn quân 28.000 người
        </p>
      </div>
    </div>
  );
}

export const CODE3_VIZ = {
  orgChartFlat: OrgChartFlat,
  broadcastComms: BroadcastComms,
  teamScale: TeamScale,
} satisfies Record<"orgChartFlat" | "broadcastComms" | "teamScale", () => React.ReactElement>;
