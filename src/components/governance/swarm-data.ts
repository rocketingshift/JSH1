/* ── GPU Particle Swarm — 5 mật mã metadata + shape generators ── */

export type ShapeType = "streaks" | "zero" | "network" | "wave" | "flame";

export interface SwarmModule {
  index: number;
  number: string;
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  shape: ShapeType;
  theme: "gold" | "jade";
  x: number;
  dim: string;
  bright: string;
  edge: string;
}

export const SWARM_MODULES: SwarmModule[] = [
  {
    index: 0,
    number: "01",
    id: "mat-ma-01",
    title: "MẬT MÃ 01",
    subtitle: "Chạy Chứ Đừng Đi Bộ",
    highlight: "AI KHÔNG PHẢI TRÀO LƯU",
    shape: "streaks",
    theme: "gold",
    x: -5.6,
    dim: "#c89018",
    bright: "#fff2c8",
    edge: "#ffcc44",
  },
  {
    index: 1,
    number: "02",
    id: "mat-ma-02",
    title: "MẬT MÃ 02",
    subtitle: "Nhà Máy AI & Thị Trường $0B",
    highlight: "THỊ TRƯỜNG 0 TỶ ĐÔ",
    shape: "zero",
    theme: "jade",
    x: -2.8,
    dim: "#0aa878",
    bright: "#9affe8",
    edge: "#00ffc4",
  },
  {
    index: 2,
    number: "03",
    id: "mat-ma-03",
    title: "MẬT MÃ 03",
    subtitle: "Quản Trị Nhân Sự Xuất Sắc",
    highlight: "60 BÁO CÁO TRỰC TIẾP",
    shape: "network",
    theme: "gold",
    x: 0,
    dim: "#c89018",
    bright: "#fff2c8",
    edge: "#ffcc44",
  },
  {
    index: 3,
    number: "04",
    id: "mat-ma-04",
    title: "MẬT MÃ 04",
    subtitle: "Kiên Cường Qua Thất Bại",
    highlight: "3 LẦN PIVOT SINH TỬ",
    shape: "wave",
    theme: "jade",
    x: 2.8,
    dim: "#0aa878",
    bright: "#9affe8",
    edge: "#00ffc4",
  },
  {
    index: 4,
    number: "05",
    id: "mat-ma-05",
    title: "MẬT MÃ 05",
    subtitle: "Hãy Yêu Những Khó Khăn",
    highlight: "30+ NĂM KIÊN TRÌ",
    shape: "flame",
    theme: "gold",
    x: 5.6,
    dim: "#c89018",
    bright: "#fff2c8",
    edge: "#ffcc44",
  },
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/* Generate `count` particle home-positions (local, centered at origin) for a shape. */
export function generateShape(shape: ShapeType, count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let p = 0;
  const put = (x: number, y: number, z: number) => {
    if (p >= count) return;
    arr[p++] = x;
    arr[p++] = y;
    arr[p++] = z;
  };

  switch (shape) {
    case "streaks": {
      // Motion / speed — 6 rising diagonal streaks (acceleration lines)
      const streaks = 6;
      const per = Math.floor(count / streaks);
      for (let s = 0; s < streaks; s++) {
        const baseY = -0.55 + s * 0.2;
        const len = 1.7 + s * 0.04;
        for (let k = 0; k < per; k++) {
          const t = k / Math.max(1, per - 1);
          put(-0.95 + t * len, baseY + t * 0.55 + rand(-0.025, 0.025), rand(-0.07, 0.07));
        }
      }
      break;
    }
    case "zero": {
      // "Ø" — empty market: thick ring + diagonal slash
      const ringCount = Math.floor(count * 0.82);
      const inner = 0.4;
      const outer = 0.74;
      for (let i = 0; i < ringCount; i++) {
        const a = rand(0, Math.PI * 2);
        const r = inner + Math.pow(Math.random(), 0.5) * (outer - inner);
        put(Math.cos(a) * r, Math.sin(a) * r, rand(-0.06, 0.06));
      }
      for (let i = 0; i < count - ringCount; i++) {
        const t = rand(0, 1);
        put(-0.7 + t * 1.4, 0.7 - t * 1.4, rand(-0.06, 0.06));
      }
      break;
    }
    case "network": {
      // Hub + 60 spokes — flat org, 60 direct reports to one center
      const N = 60;
      const nodes: [number, number, number][] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rd = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        nodes.push([Math.cos(th) * rd * 0.78, y * 0.78, Math.sin(th) * rd * 0.78]);
      }
      const per = Math.floor(count / N);
      for (let n = 0; n < N; n++) {
        for (let k = 0; k < per; k++) {
          const t = Math.pow(Math.random(), 0.6); // bias outward from hub
          put(
            nodes[n][0] * t + rand(-0.02, 0.02),
            nodes[n][1] * t + rand(-0.02, 0.02),
            nodes[n][2] * t + rand(-0.02, 0.02),
          );
        }
      }
      break;
    }
    case "wave": {
      // Valley then rising peak — failure then recovery
      for (let i = 0; i < count; i++) {
        const t = i / Math.max(1, count - 1);
        const x = -0.95 + t * 1.9 + rand(-0.035, 0.035);
        const y = 0.5 * t - 0.32 * Math.exp(-Math.pow((t - 0.28) / 0.16, 2)) + rand(-0.05, 0.05);
        put(x, y, rand(-0.12, 0.12));
      }
      break;
    }
    case "flame": {
      // Teardrop flame pointing up — embrace the fire
      for (let i = 0; i < count; i++) {
        const v = Math.random();
        const h = Math.pow(v, 0.85);
        const width = Math.pow(1 - h, 1.15) * (0.85 + 0.25 * Math.sin(h * 7 + Math.random()));
        const ang = Math.random() * Math.PI * 2;
        const rad = width * 0.46 * Math.sqrt(Math.random());
        put(Math.cos(ang) * rad, (h - 0.42) * 1.25, Math.sin(ang) * rad * 0.55);
      }
      break;
    }
  }

  // safety fill for any rounding remainder
  while (p < count) put(rand(-0.9, 0.9), rand(-0.6, 0.6), rand(-0.1, 0.1));
  return arr;
}
