// ==========================================================================
// main.js – Einstieg: Daten laden, gemeinsamer Zustand, Ansichten verbinden
// ==========================================================================
import { loadData, computeMapValues } from "./data.js";
import { createMap } from "./map.js";

// Gemeinsamer Zustand aller Ansichten (Brushing & Linking):
// Zeitraum und gewähltes Herkunftsland (null = keins gewählt).
const INITIAL_STATE = { years: [1962, 2025], origin: null };
let state = { ...INITIAL_STATE };

let data;
let map;

// Jede Interaktion ruft setState auf. Danach werden alle Ansichten neu
// gezeichnet – so bleiben sie automatisch verknüpft.
function setState(changes) {
  state = { ...state, ...changes };
  render();
}

function render() {
  map.update(state, computeMapValues(data, state));

  const [from, to] = state.years;
  document.getElementById("period-label").textContent = from === to ? `${from}` : `${from}–${to}`;
  document.getElementById("map-title").textContent = state.origin
    ? "Neuankünfte aus dem gewählten Herkunftsland pro 1000 Einwohner"
    : "Neuankünfte aus Nachbarländern pro 1000 Einwohner";
}

async function init() {
  data = await loadData();
  map = createMap(document.getElementById("map"), document.getElementById("map-legend"), data);
  render();
}

init().catch(error => {
  console.error(error);
  document.getElementById("map").textContent = "Die Daten konnten nicht geladen werden.";
});

// Für die nächsten Schritte (Zeitachse, Herkunftsland) verfügbar machen
export { setState, INITIAL_STATE };
