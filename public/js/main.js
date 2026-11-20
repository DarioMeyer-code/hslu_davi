// ==========================================================================
// main.js – Einstieg: Daten laden, gemeinsamer Zustand, Ansichten verbinden
// ==========================================================================
import { loadData, computeMapValues, computeTimeline } from "./data.js";
import { createMap } from "./map.js";
import { createTimeline } from "./timeline.js";
import { countryName } from "./format.js";

// Gemeinsamer Zustand aller Ansichten (Brushing & Linking):
// Zeitraum und gewähltes Herkunftsland (null = keins gewählt).
const INITIAL_STATE = { years: [1962, 2025], origin: null };
let state = { ...INITIAL_STATE };

let data;
let map;
let timeline;

const originSelect = document.getElementById("origin-select");
const resetButton = document.getElementById("reset-button");

// Jede Interaktion ruft setState auf. Danach werden alle Ansichten neu
// gezeichnet – so bleiben sie automatisch verknüpft.
function setState(changes) {
  state = { ...state, ...changes };
  render();
}

function render() {
  map.update(state, computeMapValues(data, state));
  timeline.update(state, computeTimeline(data, state));

  // Bedienleiste und Titel an den Zustand anpassen
  const [from, to] = state.years;
  document.getElementById("period-label").textContent = from === to ? `${from}` : `${from}–${to}`;
  originSelect.value = state.origin || "";

  const name = state.origin ? countryName(data, state.origin) : null;
  document.getElementById("map-title").textContent = name
    ? `Neuankünfte aus ${name} pro 1000 Einwohner`
    : "Neuankünfte aus Nachbarländern pro 1000 Einwohner";
  document.getElementById("timeline-title").textContent = name
    ? `Anteil der Neuankünfte aus ${name}, die in Nachbarländern ankamen`
    : "Anteil der Neuankünfte in Nachbarländern pro Jahr";
}

// Dropdown mit allen Herkunftsländern füllen, alphabetisch nach deutschem Namen
function fillOriginSelect() {
  const options = data.originCountries
    .map(iso3 => ({ iso3, name: countryName(data, iso3) }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
  for (const { iso3, name } of options) {
    const option = document.createElement("option");
    option.value = iso3;
    option.textContent = name;
    originSelect.append(option);
  }
}

async function init() {
  data = await loadData();

  // Klick auf ein Land: als Herkunftsland wählen, erneuter Klick hebt die Auswahl auf
  map = createMap(
    document.getElementById("map"),
    document.getElementById("map-legend"),
    data,
    iso3 => setState({ origin: state.origin === iso3 ? null : iso3 })
  );

  // Brush auf der Zeitachse ändert den Zeitraum -> Karte zeichnet sich neu (Linking)
  timeline = createTimeline(
    document.getElementById("timeline"),
    document.getElementById("timeline-legend"),
    years => setState({ years })
  );

  fillOriginSelect();
  originSelect.addEventListener("change", () => setState({ origin: originSelect.value || null }));
  resetButton.addEventListener("click", () => setState({ ...INITIAL_STATE }));
  originSelect.disabled = false;
  resetButton.disabled = false;

  render();
}

init().catch(error => {
  console.error(error);
  document.getElementById("map").textContent = "Die Daten konnten nicht geladen werden.";
});
