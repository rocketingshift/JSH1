import React, { useEffect, useRef } from "react";

/* ── Failure Timeline: 3 crashes → pivot to robotics (0 market) ── */
function FailureTimeline() {
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

  // 4 phases: 3 crashes (gold→dark) then the breakout (jade)
  const phases = [
    {
      x: 10,
      label: "AMD",
      year: "2000",
      detail: "$0 → $1B",
      tone: "fail",
      crash: "AMD mua ATI",
    },
    {
      x: 35,
      label: "Intel + Apple",
      year: "2008",
      detail: "MacBook Air",
      tone: "fail",
      crash: "Intel chấm dứt",
    },
    {
      x: 60,
      label: "Qualcomm",
      year: "2010",
      detail: "Android SoC",
      tone: "fail",
      crash: "Modem bị chặn",
    },
    {
      x: 88,
      label: "Robotics",
      year: "~2013",
      detail: "Thị trường 0 tỷ",
      tone: "win",
      crash: "Deep learning",
    },
  ];

  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">TIMELINE // 3 THẤT BẠI → PIVOT ROBOTICS</div>
      <div className="relative my-3 h-36">
        <svg viewBox="0 0 320 140" className="w-full h-full absolute inset-0">
          <defs>
            <linearGradient id="failGrad4" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.7" />
              <stop offset="70%" stopColor="var(--color-gold-dark)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* baseline */}
          <line
            x1="10"
            y1="110"
            x2="310"
            y2="110"
            stroke="var(--color-gold)"
            strokeOpacity="0.2"
            strokeWidth="0.8"
          />
          {/* the resilience path: peaks then crashes, then climbs to breakout */}
          <path
            className="viz-cost-curve"
            pathLength={100}
            d="M 10 95 C 25 40, 40 55, 50 75 S 75 90, 85 100 C 100 50, 120 60, 130 95 S 160 105, 170 95 C 190 45, 210 55, 220 90 S 270 30, 310 18"
            fill="none"
            stroke="url(#failGrad4)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* phase markers */}
          {phases.map((p, i) => (
            <g key={i}>
              <circle
                className="viz-ai-dot"
                cx={(p.x / 100) * 320}
                cy={p.tone === "win" ? 18 : p.x < 50 ? 55 : p.x < 70 ? 95 : 90}
                r="4"
                fill={p.tone === "win" ? "var(--color-jade)" : "var(--color-gold)"}
                fillOpacity="0.5"
                stroke={p.tone === "win" ? "var(--color-jade)" : "var(--color-gold)"}
                strokeOpacity="0.7"
                strokeWidth="0.6"
                style={{ transitionDelay: `${0.3 + i * 0.25}s` } as React.CSSProperties}
              />
            </g>
          ))}
        </svg>
        {/* labels row */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-1">
          {phases.map((p, i) => (
            <div
              key={i}
              className="viz-ai-dot text-center"
              style={
                {
                  width: "23%",
                  transitionDelay: `${0.4 + i * 0.25}s`,
                } as React.CSSProperties
              }
            >
              <div
                className={`font-mono text-[9px] sm:text-[10px] font-bold leading-tight ${
                  p.tone === "win"
                    ? "text-[var(--color-jade-glow)]"
                    : "text-[var(--color-gold-light)]"
                }`}
              >
                {p.label}
              </div>
              <div className="font-mono text-[7px] sm:text-[8px] text-[var(--color-foreground)]/45 leading-tight">
                {p.year}
              </div>
              <div
                className={`font-mono text-[7px] sm:text-[8px] leading-tight mt-0.5 ${
                  p.tone === "win"
                    ? "text-[var(--color-jade)]/80"
                    : "text-[var(--color-foreground)]/50"
                }`}
              >
                {p.tone === "win" ? p.detail : p.crash}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] font-mono text-[var(--color-foreground)]/50 text-center mt-1">
        3 lần thành công rực rỡ → 3 lần bị đóng cửa → robotics: nơi không có đối thủ
      </p>
    </div>
  );
}

/* ── No Customers = No Competitors: inverse paradox ── */
function NoCustomersNoCompetitors() {
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
      <div className="viz-title">NGHỊCH LÝ // KHÔNG KHÁCH HÀNG = KHÔNG ĐỐI THỦ</div>
      <div className="relative my-3">
        <svg viewBox="0 0 280 160" className="w-full h-auto">
          <defs>
            <linearGradient id="compGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-gold-dark)" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="custGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-jade)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-jade-glow)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Axes */}
          <line
            x1="30"
            y1="130"
            x2="270"
            y2="130"
            stroke="var(--color-gold)"
            strokeOpacity="0.25"
            strokeWidth="0.8"
          />
          <line
            x1="30"
            y1="130"
            x2="30"
            y2="20"
            stroke="var(--color-gold)"
            strokeOpacity="0.25"
            strokeWidth="0.8"
          />
          {/* Competitors curve — decreasing as customers decrease (right→left) */}
          <path
            className="viz-cost-curve"
            pathLength={100}
            d="M 270 30 C 200 50, 140 80, 90 110 S 45 128, 30 130"
            fill="none"
            stroke="url(#compGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Customers curve — also going down (left→right toward 0) */}
          <path
            className="viz-ai-curve"
            pathLength={100}
            d="M 30 40 C 90 55, 150 90, 210 118 S 260 128, 270 130"
            fill="none"
            stroke="url(#custGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          {/* Sweet spot: both at 0 = bottom-left corner */}
          <circle
            className="viz-ai-dot"
            cx="30"
            cy="130"
            r="6"
            fill="var(--color-jade)"
            fillOpacity="0.25"
            stroke="var(--color-jade)"
            strokeOpacity="0.7"
            strokeWidth="1"
            style={{ transitionDelay: "1.4s" } as React.CSSProperties}
          />
          <circle
            className="viz-ai-dot"
            cx="30"
            cy="130"
            r="12"
            fill="none"
            stroke="var(--color-jade)"
            strokeOpacity="0.3"
            strokeWidth="0.6"
            style={{ transitionDelay: "1.6s" } as React.CSSProperties}
          />
          {/* Labels */}
          <text
            x="245"
            y="22"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fill="var(--color-gold-light)"
            opacity="0.8"
          >
            Đối thủ
          </text>
          <text
            x="34"
            y="35"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fill="var(--color-jade-glow)"
            opacity="0.8"
          >
            Khách hàng
          </text>
          <text
            x="38"
            y="148"
            fontSize="7"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.4"
          >
            0
          </text>
          <text
            x="45"
            y="120"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-jade-glow)"
            opacity="0.9"
            className="viz-cost-zero"
          >
            0 / 0
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-gold)]/15">
          <div className="font-mono text-[8px] text-[var(--color-gold-light)]/80 leading-tight">
            Thị trường đông → nhiều đối thủ → tranh giành
          </div>
        </div>
        <div
          className="viz-fade-up p-2 rounded-md bg-black/30 border border-[var(--color-jade)]/20"
          style={{ transitionDelay: "0.4s" } as React.CSSProperties}
        >
          <div className="font-mono text-[8px] text-[var(--color-jade-glow)] leading-tight">
            Thị trường 0 → không ai quan tâm → tự do xây
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Resilience Loop: failure → learn → bounce → next opportunity (cyclical) ── */
function ResilienceLoop() {
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

  // SVG viewBox is 360 x 200 with center at (180, 100), radius 60
  // Left node at cx: 90, label at 78 (end) leaves 0..78 space for "Lướt tới cơ hội"
  // Right node at cx: 270, label at 282 (start) leaves 282..360 space for "Học kỹ năng mới"
  const steps = [
    { angle: -90, label: "Thất bại", tone: "fail", cx: 180, cy: 38 },
    { angle: 0, label: "Học kỹ năng mới", tone: "learn", cx: 242, cy: 100 },
    { angle: 90, label: "Bồi đắp bản lĩnh", tone: "grow", cx: 180, cy: 162 },
    { angle: 180, label: "Lướt tới cơ hội", tone: "next", cx: 118, cy: 100 },
  ];

  return (
    <div ref={ref} className="viz-container">
      <div className="viz-title">VÒNG LẶP KIÊN CƯỜNG // THẤT BẠI → CƠ HỘI</div>
      <div className="relative my-3">
        <svg viewBox="0 0 360 200" className="w-full h-auto">
          <defs>
            <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="var(--color-gold-dark)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Loop circle — dashed arc */}
          <circle
            cx="180"
            cy="100"
            r="62"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.2"
            strokeWidth="0.8"
            strokeDasharray="3 4"
          />
          {/* Flowing arc — the cycle direction */}
          <path
            className="viz-cost-curve"
            pathLength={100}
            d="M 180 38 A 62 62 0 1 1 118 100"
            fill="none"
            stroke="url(#loopGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Arrowhead at top — showing it loops */}
          <path
            className="viz-ai-dot"
            d="M 178 38 L 184 35 L 182 43 Z"
            fill="var(--color-jade)"
            style={{ transitionDelay: "1.4s" } as React.CSSProperties}
          />
          {/* Center label */}
          <text
            x="180"
            y="96"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-gold-light)"
            opacity="0.8"
            className="viz-cost-zero"
          >
            30 NĂM
          </text>
          <text
            x="180"
            y="108"
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            fill="var(--color-foreground)"
            opacity="0.5"
            className="viz-cost-zero"
          >
            KHÔNG BỎ CUỘC
          </text>
          {/* Step nodes */}
          {steps.map((s, i) => (
            <g key={i}>
              <circle
                className="viz-ai-dot"
                cx={s.cx}
                cy={s.cy}
                r="7"
                fill={s.tone === "fail" ? "var(--color-gold-dark)" : "var(--color-jade)"}
                fillOpacity="0.2"
                stroke={s.tone === "fail" ? "var(--color-gold)" : "var(--color-jade)"}
                strokeOpacity="0.7"
                strokeWidth="0.8"
                style={{ transitionDelay: `${0.3 + i * 0.2}s` } as React.CSSProperties}
              />
              <circle
                className="viz-ai-dot"
                cx={s.cx}
                cy={s.cy}
                r="2.5"
                fill={s.tone === "fail" ? "var(--color-gold)" : "var(--color-jade)"}
                style={{ transitionDelay: `${0.5 + i * 0.2}s` } as React.CSSProperties}
              />
              {/* Step label — positioned outside the node with plenty of room */}
              <text
                x={
                  s.angle === -90
                    ? 180
                    : s.angle === 90
                      ? 180
                      : s.angle === 0
                        ? s.cx + 14
                        : s.cx - 14
                }
                y={s.angle === -90 ? 22 : s.angle === 90 ? 182 : 104}
                textAnchor={s.angle === 0 ? "start" : s.angle === 180 ? "end" : "middle"}
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                fill={s.tone === "fail" ? "var(--color-gold-light)" : "var(--color-jade-glow)"}
                opacity="0.9"
                className="viz-ai-dot"
                style={{ transitionDelay: `${0.7 + i * 0.2}s` } as React.CSSProperties}
              >
                {s.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="text-[10px] font-mono text-[var(--color-foreground)]/50 text-center mt-1">
        Mỗi vòng: kỹ năng mới + bản lĩnh dày hơn · trở ngại = cơ hội
      </p>
    </div>
  );
}

export const CODE4_VIZ = {
  failureTimeline: FailureTimeline,
  noCustomersNoCompetitors: NoCustomersNoCompetitors,
  resilienceLoop: ResilienceLoop,
} satisfies Record<
  "failureTimeline" | "noCustomersNoCompetitors" | "resilienceLoop",
  () => React.ReactElement
>;
