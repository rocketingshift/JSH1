import type { VizKey } from "./chapters-data";
import { DataViz as OriginalDataViz } from "./DataViz";
import { CODE3_VIZ } from "./viz-code3";
import { CODE4_VIZ } from "./viz-code4";
import { CODE5_VIZ } from "./viz-code5";

const CODE3_KEYS = new Set<VizKey>(["orgChartFlat", "broadcastComms", "teamScale"]);
const CODE4_KEYS = new Set<VizKey>([
  "failureTimeline",
  "noCustomersNoCompetitors",
  "resilienceLoop",
]);
const CODE5_KEYS = new Set<VizKey>(["passionHappiness", "superpowerRanking", "paradoxBlessing"]);

export function DataViz({ viz }: { viz: VizKey }) {
  if (CODE3_KEYS.has(viz)) {
    const Comp = CODE3_VIZ[viz as "orgChartFlat" | "broadcastComms" | "teamScale"];
    return <Comp />;
  }
  if (CODE4_KEYS.has(viz)) {
    const Comp =
      CODE4_VIZ[viz as "failureTimeline" | "noCustomersNoCompetitors" | "resilienceLoop"];
    return <Comp />;
  }
  if (CODE5_KEYS.has(viz)) {
    const Comp = CODE5_VIZ[viz as "passionHappiness" | "superpowerRanking" | "paradoxBlessing"];
    return <Comp />;
  }
  return <OriginalDataViz viz={viz} />;
}
