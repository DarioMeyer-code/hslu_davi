// ==========================================================================
// hypothesis.js – Hypothesen-Check über der Karte
// Zeigt für das gewählte Herkunftsland und den gewählten Zeitraum, ob die
// beiden Teile unserer Hypothese erfüllt sind. Gerechnet wird in data.js
// (computeHypothesis), hier wird nur der Text zusammengesetzt.
// ==========================================================================
import { computeHypothesis, MIN_DROP } from "./data.js";
import { formatRate, formatPercent, countryName } from "./format.js";

const STATUS = {
  yes: { label: "✓ erfüllt", css: "status-yes" },
  no:  { label: "✗ nicht erfüllt", css: "status-no" },
  na:  { label: "– nicht prüfbar", css: "status-na" }
};

// Datenbrüche (siehe Abschnitt Daten → Einschränkungen). Ein Zeitraum «enthält»
// einen Bruch, wenn er Jahre vor und ab dem Bruchjahr umfasst.
const DATA_BREAKS = [
  { year: 1990, label: "neue Kategorie flüchtlingsähnliche Situation" },
  { year: 2000, label: "Asylgesuche ab jetzt weltweit erfasst" },
  { year: 2011, label: "neue Kategorie vorübergehender Schutz" },
  { year: 2018, label: "neue Kategorie andere Schutzbedürftige" },
  { year: 2021, label: "neue Kategorie registrierte Asylsuchende" }
];

// Liste der Brüche im Zeitraum als kurzer Text, oder null ohne Bruch
function breaksInPeriod([from, to]) {
  const found = DATA_BREAKS
    .filter(b => from < b.year && b.year <= to)
    .map(b => `${b.year} (${b.label})`);
  // Vor 2000 kamen laufend Länder dazu: betrifft jeden mehrjährigen Zeitraum vor 2000
  if (from < to && from < 1999) found.unshift("bis 1999 (laufend mehr Länder erfasst)");
  return found.length > 0 ? found.join(", ") : null;
}

const period = ([from, to]) => (from === to ? `${from}` : `${from}–${to}`);

// Eine Zeile: Status-Pille, Teilaussage, ein kurzer Satz mit den Zahlen
function row(status, claim, detail) {
  const { label, css } = STATUS[status];
  return `<div class="check-row">
      <span class="status ${css}">${label}</span><strong>${claim}</strong>
      <p>${detail}</p>
    </div>`;
}

export function updateHypothesis(container, data, state) {
  // Ohne Herkunftsland gibt es nichts zu prüfen: nur ein Hinweis
  if (!state.origin) {
    container.innerHTML = `<p class="check-hint">
      <strong>Hypothese prüfen:</strong> Herkunftsland wählen (Klick auf die Karte oder Menü),
      dann zeigt dieser Kasten, ob unsere Hypothese für dieses Land und den Zeitraum zutrifft.</p>`;
    return;
  }

  const name = countryName(data, state.origin);
  const { part1, part2 } = computeHypothesis(data, state);

  const detail1 = part1.status === "na"
    ? `${name}: ${part1.reason}.`
    : `Nachbarländer: ${formatRate(part1.rateNeighbours)} pro 1000 Einwohner, übrige Welt: ${formatRate(part1.rateRest)}.`;

  const detail2 = part2.status === "na"
    ? `${part2.reason[0].toUpperCase()}${part2.reason.slice(1)}.`
    : `Anteil in Nachbarländern ${period(part2.before)}: ${formatPercent(part2.shareBefore)}, `
      + `${period(part2.after)}: ${formatPercent(part2.shareAfter)}`
      + (part2.status === "no" && part2.shareAfter < part2.shareBefore
        ? ` (Rückgang unter ${Math.round(MIN_DROP * 100)} Prozentpunkten, zählt als gleich geblieben).`
        : ".");

  const breaks = breaksInPeriod(state.years);
  const note = breaks
    ? `<p class="check-note"><span aria-hidden="true">⚠</span> <strong>Datenbrüche im Zeitraum:</strong>
        ${breaks}. Veränderungen können teilweise an der Erfassung liegen.
        <a href="#einschraenkungen">Mehr dazu</a></p>`
    : "";

  container.innerHTML = `
    <p class="check-title">Hypothese für ${name}, ${period(state.years)}</p>
    <div class="check-rows">
      ${row(part1.status, "Nachbarländer nehmen pro Einwohner am meisten auf", detail1)}
      ${row(part2.status, "Ihr Anteil an den neuen Schutzsuchenden nimmt ab", detail2)}
    </div>
    ${note}`;
}
