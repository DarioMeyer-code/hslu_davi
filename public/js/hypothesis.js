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

  container.innerHTML = `
    <p class="check-title">Hypothese für ${name}, ${period(state.years)}</p>
    <div class="check-rows">
      ${row(part1.status, "Nachbarländer nehmen pro Einwohner am meisten auf", detail1)}
      ${row(part2.status, "Ihr Anteil an den Neuankünften nimmt ab", detail2)}
    </div>`;
}
