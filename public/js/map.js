// ==========================================================================
// map.js – Weltkarte (Choroplethenkarte)
// Grundaufbau Projektion + geoPath + TopoJSON nach dem Muster der
// D3 Graph Gallery «Choropleth map» (https://d3-graph-gallery.com/choropleth),
// angepasst an unsere Daten, Farbklassen und Tooltips.
// ==========================================================================
import { formatCount, formatRate, formatPercent, countryName } from "./format.js";

const WIDTH = 960;
const HEIGHT = 470;

// Feste Klassen in Zehnerschritten (logarithmisch). Fest, damit eine Farbe
// immer dasselbe bedeutet, auch wenn sich der Zeitraum ändert.
const THRESHOLDS = [0.01, 0.1, 1, 10, 100];
// ColorBrewer «Blues», 7 Stufen; die hellste wird weggelassen, damit sich
// die unterste Klasse noch klar von «0» (weiss) abhebt.
const COLORS = d3.schemeBlues[7].slice(1);
const COLOR_ZERO = "#f1f3f5";   // sehr helles Grau, damit 0-Länder sichtbar bleiben
const COLOR_NO_DATA = "#cfd4d9";

const color = d3.scaleThreshold().domain(THRESHOLDS).range(COLORS);

const CLASS_LABELS = ["< 0.01", "0.01–0.1", "0.1–1", "1–10", "10–100", "≥ 100"];

export function createMap(container, legendContainer, data) {
  // Länderformen aus TopoJSON; Antarktis weglassen (keine Aufnahmen, viel Platz)
  const countries = topojson.feature(data.world, data.world.objects.countries)
    .features.filter(f => f.id !== "010");
  const borders = topojson.mesh(data.world, data.world.objects.countries, (a, b) => a !== b);
  // Küstenlinien (Kanten, die nur zu einem Land gehören), damit helle Länder
  // sich vom weissen Hintergrund abheben
  const coastlines = topojson.mesh(data.world, data.world.objects.countries, (a, b) => a === b);

  // Natural Earth 2: flächentreuer als Mercator (Empfehlung aus der Vorlesung)
  const projection = d3.geoNaturalEarth2()
    .fitSize([WIDTH, HEIGHT], { type: "FeatureCollection", features: countries });
  const path = d3.geoPath(projection);

  container.innerHTML = "";
  const svg = d3.select(container).append("svg")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
    .attr("role", "img")
    .attr("aria-label", "Weltkarte: Neuankünfte von Geflüchteten pro 1000 Einwohner");

  const countryPaths = svg.append("g")
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("class", "country")
    .attr("d", path);

  // Ländergrenzen und Küsten als eigene dünne Linien (statt Umriss pro Land: weniger Tinte)
  svg.append("path")
    .datum(borders)
    .attr("class", "country-borders")
    .attr("d", path);
  svg.append("path")
    .datum(coastlines)
    .attr("class", "coastlines")
    .attr("d", path);

  // Tooltip als HTML-Element über der Karte
  const tooltip = d3.select(container).append("div").attr("class", "tooltip").attr("hidden", true);

  drawLegend(legendContainer);

  let currentValues = new Map();
  let currentState = null;

  countryPaths
    .on("pointermove", (event, feature) => {
      showTooltip(tooltip, container, event, feature, currentValues, currentState, data);
      d3.select(event.currentTarget).classed("hover", true).raise();
    })
    .on("pointerleave", event => {
      tooltip.attr("hidden", true);
      d3.select(event.currentTarget).classed("hover", false);
    });

  // Wird bei jeder Änderung des Zustands aufgerufen
  function update(state, values) {
    currentState = state;
    currentValues = values;
    countryPaths.attr("fill", feature => {
      const iso3 = data.iso3ByNum.get(feature.id);
      const entry = values.get(iso3);
      if (!entry) return COLOR_NO_DATA;
      if (entry.arrivals === 0) return COLOR_ZERO;
      return color(entry.perThousand);
    });
  }

  return { update };
}

function drawLegend(legendContainer) {
  const legend = d3.select(legendContainer);
  legend.html("");

  const classes = legend.append("div").attr("class", "legend-classes");
  COLORS.forEach((c, i) => {
    const item = classes.append("div").attr("class", "legend-item");
    item.append("span").attr("class", "legend-swatch").style("background", c);
    item.append("span").attr("class", "legend-label").text(CLASS_LABELS[i]);
  });

  const extra = legend.append("div").attr("class", "legend-extra");
  for (const [fill, label] of [[COLOR_ZERO, "0"], [COLOR_NO_DATA, "keine Daten"]]) {
    const item = extra.append("div").attr("class", "legend-item legend-item-inline");
    item.append("span").attr("class", "legend-swatch legend-swatch-outline").style("background", fill);
    item.append("span").attr("class", "legend-label").text(label);
  }
}

function showTooltip(tooltip, container, event, feature, values, state, data) {
  const iso3 = data.iso3ByNum.get(feature.id);
  const name = countryName(data, iso3, feature.properties.name);
  const entry = values.get(iso3);
  const [from, to] = state.years;
  const period = from === to ? `${from}` : `${from}–${to}`;

  tooltip.html("");  // leeren; Inhalte unten nur mit .text() (sicher)
  tooltip.append("div").attr("class", "tooltip-title").text(name);

  if (!entry) {
    const note = feature.properties.name === "Kosovo"
      ? "Keine eigenen Daten (bei UNHCR zu Serbien gezählt)"
      : "Keine Daten";
    tooltip.append("div").attr("class", "tooltip-muted").text(note);
  } else if (entry.arrivals === 0) {
    tooltip.append("div").text(`Keine Neuankünfte aus Nachbarländern, ${period}`);
  } else {
    tooltip.append("div").attr("class", "tooltip-value")
      .text(`${formatRate(entry.perThousand)} pro 1000 Einwohner`);
    tooltip.append("div")
      .text(`${formatCount(entry.arrivals)} Neuankünfte aus Nachbarländern, ${period}`);
    // nur Herkunftsländer ab 1 %, sonst stünde dort «0 %»
    const top = entry.topOrigins
      .filter(d => d.share >= 0.01)
      .map(d => `${countryName(data, d.origin)} ${formatPercent(d.share)}`)
      .join(", ");
    if (top) tooltip.append("div").attr("class", "tooltip-muted").text(`Vor allem aus: ${top}`);
  }

  // Tooltip neben den Mauszeiger setzen, innerhalb der Karte halten
  const box = container.getBoundingClientRect();
  const x = event.clientX - box.left;
  const y = event.clientY - box.top;
  tooltip.attr("hidden", null);
  const tipWidth = tooltip.node().offsetWidth;
  const left = x + 16 + tipWidth > box.width ? x - 16 - tipWidth : x + 16;
  tooltip.style("left", `${Math.max(0, left)}px`).style("top", `${y + 16}px`);
}
