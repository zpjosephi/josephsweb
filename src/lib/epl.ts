import raw from "@/data/epl-players.json";

export type Player = {
  name: string;
  club: string;
  /** Season end year: 2023 means 2022/23. */
  season: number;
  age: number;
  /** Transfermarkt market value, millions of euros. */
  value: number;
  english: boolean;
  homegrown: boolean;
  goals: number;
  assists: number;
  minutes: number;
  bigSix: boolean;
  newSigning: boolean;
};

type Row = [string, string, number, number, number, number, number, number, number, number, number, number];

export const players: Player[] = (raw.rows as Row[]).map((r) => ({
  name: r[0],
  club: r[1],
  season: r[2],
  age: r[3],
  value: r[4],
  english: r[5] === 1,
  homegrown: r[6] === 1,
  goals: r[7],
  assists: r[8],
  minutes: r[9],
  bigSix: r[10] === 1,
  newSigning: r[11] === 1,
}));

export const dataSource = raw.source;

export function seasonLabel(season: number) {
  return `${season - 1}/${String(season).slice(2)}`;
}

export function euros(m: number) {
  if (m >= 10) return `€${Math.round(m)}m`;
  if (m >= 1) return `€${m.toFixed(1).replace(/\.0$/, "")}m`;
  return `€${Math.round(m * 1000)}k`;
}

/**
 * Model results. Age terms come from the thesis fixed-effects model (HC1 robust SE).
 * Nationality and home-grown can't be estimated by fixed effects (they never change
 * within a player), so those two come from a Mundlak re-estimate of the same data,
 * clustered by player, with the Jordan Ayew nationality flag corrected.
 */
export const model = {
  age: 1.186,
  ageSquared: -0.023,
  english: { pct: 9, p: 0.45 },
  homegrown: { pct: -32, p: 0.001 },
} as const;

export const peakAge = -model.age / (2 * model.ageSquared);
