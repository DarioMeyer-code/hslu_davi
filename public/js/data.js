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

  // Ländercodes: numerischer Kartencode -> ISO-3 und ISO-3 -> ISO-2 (für deutsche Namen)
  const iso3ByNum = new Map(countries.map(d => [d.iso_num, d.iso3]));
  const iso2ByIso3 = new Map(countries.map(d => [d.iso3, d.iso2]));

  // Länder, die irgendwann als Aufnahmeland vorkommen (sonst: «keine Daten»)
  const asylumCountries = new Set(flows.map(d => d.aufnahme));

  return { flows, populationByKey, iso3ByNum, iso2ByIso3, borders, world, asylumCountries };
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
// Ohne Auswahl (state.origin === null): nur Neuankünfte aus Nachbarländern.
// Mit Auswahl: nur Neuankünfte aus dem gewählten Herkunftsland (ab Schritt 5).
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
// Rückgabe: Array von { year, total, neighbours, share } (share = null ohne Neuankünfte)
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
