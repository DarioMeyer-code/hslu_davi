// ==========================================================================
// crises.js – Kontext-Tabelle zu grossen Fluchtbewegungen
// Fest eingetragen sind nur Land, Zeitraum und ein kurzer Kontext.
// Ausgewählt wurden die zehn Herkunftsländer mit den höchsten Neuankünften
// in einem einzelnen Jahr (laut flows.csv). Die Zahlen in der Tabelle werden
// beim Laden aus den Daten berechnet.
// ==========================================================================
import { formatCount, formatPercent, countryName } from "./format.js";

export const CRISES = [
  { origin: "AFG", years: [1979, 1989], context: "Sowjetische Intervention und Krieg in Afghanistan" },
  { origin: "IRQ", years: [1991, 1991], context: "Golfkrieg und Niederschlagung der Aufstände" },
  { origin: "RWA", years: [1994, 1996], context: "Völkermord an den Tutsi und seine Folgen" },
  { origin: "SRB", years: [1998, 1999], context: "Kosovokrieg (Kosovo ist bei UNHCR Serbien zugeordnet)" },
  { origin: "SYR", years: [2011, 2025], context: "Bürgerkrieg in Syrien" },
  { origin: "SSD", years: [2013, 2020], context: "Bürgerkrieg im Südsudan" },
  { origin: "VEN", years: [2015, 2025], context: "Politische und wirtschaftliche Krise in Venezuela" },
  { origin: "MMR", years: [2017, 2018], context: "Vertreibung der Rohingya aus Myanmar" },
  { origin: "UKR", years: [2022, 2025], context: "Russischer Angriffskrieg gegen die Ukraine" },
  { origin: "SDN", years: [2023, 2025], context: "Krieg im Sudan" }
];

// Summe der Neuankünfte aus einem Herkunftsland im Zeitraum, davon in Nachbarländern
function summarize(data, origin, [from, to]) {
  let total = 0;
  let neighbours = 0;
  for (const row of data.flows) {
    if (row.herkunft !== origin || row.jahr < from || row.jahr > to) continue;
    total += row.anzahl;
    if (row.nachbar) neighbours += row.anzahl;
  }
  return { total, share: total > 0 ? neighbours / total : 0 };
}

// Tabelle füllen; onShow(crisis) stellt Land und Zeitraum in den Ansichten ein
export function renderCrisesTable(tbody, data, onShow) {
  tbody.innerHTML = "";
  for (const crisis of CRISES) {
    const { total, share } = summarize(data, crisis.origin, crisis.years);
    const [from, to] = crisis.years;
    const row = tbody.insertRow();
    row.insertCell().textContent = countryName(data, crisis.origin);
    row.insertCell().textContent = from === to ? `${from}` : `${from}–${to}`;
    row.insertCell().textContent = crisis.context;
    const totalCell = row.insertCell();
    totalCell.textContent = formatCount(total);
    totalCell.className = "number";
    const shareCell = row.insertCell();
    shareCell.textContent = formatPercent(share);
    shareCell.className = "number";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "link-button";
    button.textContent = "anzeigen";
    button.setAttribute("aria-label", `${countryName(data, crisis.origin)} ${from}–${to} in Karte und Zeitachse anzeigen`);
    button.addEventListener("click", () => onShow(crisis));
    row.insertCell().append(button);
  }
}
