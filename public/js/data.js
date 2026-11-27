// ==========================================================================
// data.js – Daten laden und Kennzahlen berechnen
// Enthält nur Rechenfunktionen, nichts wird hier gezeichnet.
// ==========================================================================

// Alle aufbereiteten Dateien laden (erzeugt von scripts/prepare_data.py).
export async function loadData() {
  const [flows, population, countries, borders, world] = await Promise.all([
    d3.csv("data/flows.csv", d => ({
      jahr: +d.jahr,
      herkunft: d.herkunft,
      aufnahme: d.aufnahme,
      anzahl: +d.anzahl,
      nachbar: d.nachbar === "1"
    })),
    d3.csv("data/population.csv", d => ({ iso3: d.iso3, jahr: +d.jahr, einwohner: +d.einwohner })),
    d3.csv("data/countries.csv"),
    d3.csv("data/borders.csv"),
    d3.json("data/world-110m.json")
  ]);

  // Bevölkerung als Nachschlagetabelle: "CHE-2013" -> Einwohner
  const populationByKey = new Map(population.map(d => [`${d.iso3}-${d.jahr}`, d.einwohner]));

  // Alle Länder mit Bevölkerungszahlen (für «übrige Welt» im Hypothesen-Check)
  const populationCountries = [...new Set(population.map(d => d.iso3))];

  // Ländercodes: numerischer Kartencode -> ISO-3 und ISO-3 -> ISO-2 (für deutsche Namen)
  const iso3ByNum = new Map(countries.map(d => [d.iso_num, d.iso3]));
  const iso2ByIso3 = new Map(countries.map(d => [d.iso3, d.iso2]));

  // Länder, die irgendwann als Aufnahmeland vorkommen (sonst: «keine Daten»)
  const asylumCountries = new Set(flows.map(d => d.aufnahme));

  // Länder, aus denen irgendwann jemand geflohen ist (wählbar als Herkunftsland)
  const originCountries = [...new Set(flows.map(d => d.herkunft))];

  // Nachbarn pro Land: ISO-3 -> Set der angrenzenden Länder (in beide Richtungen)
  const neighboursOf = new Map();
  for (const { iso3_a, iso3_b } of borders) {
    if (!neighboursOf.has(iso3_a)) neighboursOf.set(iso3_a, new Set());
    if (!neighboursOf.has(iso3_b)) neighboursOf.set(iso3_b, new Set());
    neighboursOf.get(iso3_a).add(iso3_b);
    neighboursOf.get(iso3_b).add(iso3_a);
  }

  return {
    flows, populationByKey, populationCountries, iso3ByNum, iso2ByIso3, world,
    asylumCountries, originCountries, neighboursOf
  };
}

// Durchschnittliche Bevölkerung eines Landes im Zeitraum [von, bis].
// Jahre ohne Wert werden übersprungen. Ohne jeden Wert: null.
export function averagePopulation(data, iso3, [from, to]) {
  let sum = 0;
  let count = 0;
  for (let year = from; year <= to; year++) {
    const value = data.populationByKey.get(`${iso3}-${year}`);
    if (value) {
      sum += value;
      count++;
    }
  }
  return count > 0 ? sum / count : null;
}

// Werte für die Weltkarte, pro Aufnahmeland.
// Ohne Auswahl (state.origin === null): nur neue Schutzsuchende aus Nachbarländern.
// Mit Auswahl: nur neue Schutzsuchende aus dem gewählten Herkunftsland (ab Schritt 5).
// Rückgabe: Map ISO-3 -> { arrivals, perThousand, topOrigins }
export function computeMapValues(data, state) {
  const [from, to] = state.years;
  const arrivals = new Map();       // Aufnahmeland -> Anzahl
  const byOrigin = new Map();       // Aufnahmeland -> Map(Herkunftsland -> Anzahl)

  for (const row of data.flows) {
    if (row.jahr < from || row.jahr > to) continue;
    const counts = state.origin ? row.herkunft === state.origin : row.nachbar;
    if (!counts) continue;

    arrivals.set(row.aufnahme, (arrivals.get(row.aufnahme) || 0) + row.anzahl);
    if (!byOrigin.has(row.aufnahme)) byOrigin.set(row.aufnahme, new Map());
    const origins = byOrigin.get(row.aufnahme);
    origins.set(row.herkunft, (origins.get(row.herkunft) || 0) + row.anzahl);
  }

  const result = new Map();
  for (const iso3 of data.asylumCountries) {
    const total = arrivals.get(iso3) || 0;
    const population = averagePopulation(data, iso3, state.years);
    if (population === null) continue;   // ohne Bevölkerung kein Wert pro 1000

    // Die drei wichtigsten Herkunftsländer mit ihrem Anteil
    const origins = byOrigin.get(iso3) || new Map();
    const topOrigins = [...origins]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([origin, count]) => ({ origin, share: count / total }));

    result.set(iso3, { arrivals: total, perThousand: total / population * 1000, topOrigins });
  }
  return result;
}

// Werte für die Zeitachse, pro Jahr über den ganzen Zeitraum 1962–2025.
// Ohne Auswahl: alle Herkunftsländer. Mit Auswahl: nur das gewählte Land.
// Rückgabe: Array von { year, total, neighbours, share } (share = null ohne neue Schutzsuchende)
export function computeTimeline(data, state, [from, to] = [1962, 2025]) {
  const total = new Map();
  const neighbours = new Map();
  for (const row of data.flows) {
    if (state.origin && row.herkunft !== state.origin) continue;
    total.set(row.jahr, (total.get(row.jahr) || 0) + row.anzahl);
    if (row.nachbar) neighbours.set(row.jahr, (neighbours.get(row.jahr) || 0) + row.anzahl);
  }
  const result = [];
  for (let year = from; year <= to; year++) {
    const t = total.get(year) || 0;
    const n = neighbours.get(year) || 0;
    result.push({ year, total: t, neighbours: n, share: t > 0 ? n / t : null });
  }
  return result;
}

// Hypothesen-Check für ein gewähltes Herkunftsland und den gewählten Zeitraum.
// Teil 1: Nehmen die Nachbarländer pro Einwohner mehr auf als die übrige Welt?
//   neue Schutzsuchende in allen Nachbarländern ÷ deren Bevölkerung, verglichen mit
//   neuen Schutzsuchenden in allen anderen Ländern ÷ deren Bevölkerung (je × 1000).
// Teil 2: Sinkt der Anteil der Nachbarländer im Zeitraum?
//   Der Zeitraum wird in zwei Hälften geteilt. «Sinkt» heisst: in der zweiten
//   Hälfte mindestens 5 Prozentpunkte tiefer. Kleinere Schwankungen zählen
//   als «gleich geblieben».
// Rückgabe: { part1, part2 }; jeweils status "yes" | "no" | "na" und Kennzahlen
export const MIN_DROP = 0.05;

export function computeHypothesis(data, state) {
  const origin = state.origin;
  const [from, to] = state.years;
  const neighbours = data.neighboursOf.get(origin) || new Set();

  // Neue Schutzsuchende aus dem Herkunftsland zählen: in Nachbarländern / anderswo,
  // und für Teil 2 getrennt nach erster und zweiter Hälfte des Zeitraums
  const mid = Math.floor((from + to) / 2);
  let inNeighbours = 0;
  let elsewhere = 0;
  const halves = [{ total: 0, neighbours: 0 }, { total: 0, neighbours: 0 }];
  for (const row of data.flows) {
    if (row.herkunft !== origin || row.jahr < from || row.jahr > to) continue;
    if (row.nachbar) inNeighbours += row.anzahl;
    else elsewhere += row.anzahl;
    const half = halves[row.jahr <= mid ? 0 : 1];
    half.total += row.anzahl;
    if (row.nachbar) half.neighbours += row.anzahl;
  }

  // ---- Teil 1: pro 1000 Einwohner, Nachbarländer gegenüber übriger Welt ----
  let part1;
  if (neighbours.size === 0) {
    part1 = { status: "na", reason: "hat keine Landgrenze, also keine Nachbarländer" };
  } else if (inNeighbours + elsewhere === 0) {
    part1 = { status: "na", reason: "keine neuen Schutzsuchenden im gewählten Zeitraum" };
  } else {
    let popNeighbours = 0;
    let popRest = 0;
    for (const iso3 of data.populationCountries) {
      if (iso3 === origin) continue;                 // das Herkunftsland selbst zählt nicht
      const population = averagePopulation(data, iso3, state.years);
      if (!population) continue;
      if (neighbours.has(iso3)) popNeighbours += population;
      else popRest += population;
    }
    const rateNeighbours = inNeighbours / popNeighbours * 1000;
    const rateRest = elsewhere / popRest * 1000;
    part1 = { status: rateNeighbours > rateRest ? "yes" : "no", rateNeighbours, rateRest };
  }

  // ---- Teil 2: Anteil Nachbarländer, erste gegenüber zweiter Hälfte ----
  let part2;
  if (neighbours.size === 0) {
    part2 = { status: "na", reason: "ohne Landgrenze gibt es keinen Anteil der Nachbarländer" };
  } else if (from === to) {
    part2 = { status: "na", reason: "Zeitraum zu kurz (mindestens 2 Jahre wählen)" };
  } else if (halves[0].total === 0 || halves[1].total === 0) {
    part2 = { status: "na", reason: "nicht in beiden Hälften des Zeitraums neue Schutzsuchende" };
  } else {
    const shareBefore = halves[0].neighbours / halves[0].total;
    const shareAfter = halves[1].neighbours / halves[1].total;
    part2 = {
      status: shareAfter <= shareBefore - MIN_DROP ? "yes" : "no",
      shareBefore, shareAfter,
      before: [from, mid], after: [mid + 1, to]
    };
  }

  return { part1, part2 };
}
