// ==========================================================================
// timeline.js – Zeitachse mit Brush
// Zwei Panels mit gemeinsamer x-Achse (statt einer Grafik mit zwei y-Achsen):
//   oben:  Anteil der neuen Schutzsuchenden in Nachbarländern (Linie, 0–100 %)
//   unten: absolute Zahl neuer Schutzsuchender, aufgeteilt nach Nachbarland ja/nein (Balken)
// Mit dem Brush (Maus ziehen) wird ein Zeitraum gewählt; die Karte folgt.
// Brush-Grundlage nach der D3-Dokumentation zu d3.brushX
// (https://d3js.org/d3-brush) und dem Beispiel «Brush snapping»
// (Mike Bostock, https://observablehq.com/@d3/brush-snapping).
// ==========================================================================
import { formatCount, formatPercent } from "./format.js";

const WIDTH = 960;
const MARGIN = { top: 12, right: 16, bottom: 28, left: 56 };
const LINE_HEIGHT = 170;   // Höhe oberes Panel
const GAP = 44;            // Abstand zwischen den Panels (Platz für die Beschriftung unten)
const BAR_HEIGHT = 90;     // Höhe unteres Panel
const HEIGHT = MARGIN.top + LINE_HEIGHT + GAP + BAR_HEIGHT + MARGIN.bottom;

const FIRST_YEAR = 1962;
const LAST_YEAR = 2025;
const NOTE_YEAR = 2000;    // Erfassungsbruch: ab 2000 Asylgesuche weltweit

// Farben: Nachbarländer = Blau (wie auf der Karte), übrige = neutrales Grau
const COLOR_LINE = "#08519c";
const COLOR_NEIGHBOURS = "#6baed6";
const COLOR_OTHERS = "#cfd4d9";

const millions = value => value === 0 ? "0" : `${value / 1e6} Mio.`;

export function createTimeline(container, legendContainer, onYearsChange) {
  const innerWidth = WIDTH - MARGIN.left - MARGIN.right;

  // Jahre als Zahlen; ±0.5, damit jedes Jahr einen ganzen Balken breit ist
  const x = d3.scaleLinear()
    .domain([FIRST_YEAR - 0.5, LAST_YEAR + 0.5])
    .range([0, innerWidth]);
  const yShare = d3.scaleLinear().domain([0, 1]).range([LINE_HEIGHT, 0]);
  const yCount = d3.scaleLinear().range([BAR_HEIGHT, 0]);

  container.innerHTML = "";
  const svg = d3.select(container).append("svg")
    .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
    .attr("role", "img")
    .attr("aria-label", "Zeitachse: Anteil der neuen Schutzsuchenden in Nachbarländern und absolute Zahl neuer Schutzsuchender pro Jahr");

  const root = svg.append("g").attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);
  const linePanel = root.append("g");
  const barPanel = root.append("g").attr("transform", `translate(0,${LINE_HEIGHT + GAP})`);

  // --- Achsen (zurückhaltend: wenige Linien, graue Beschriftung) ---
  linePanel.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(yShare).ticks(4).tickFormat(formatPercent).tickSize(-innerWidth))
    .call(g => g.select(".domain").remove());

  const barAxis = barPanel.append("g").attr("class", "axis axis-y");

  // Beschriftung des unteren Panels (das obere ist durch den Titel beschriftet)
  barPanel.append("text").attr("class", "panel-label")
    .attr("x", 0).attr("y", -10).text("Neue Schutzsuchende pro Jahr (absolut)");

  barPanel.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${BAR_HEIGHT})`)
    .call(d3.axisBottom(x).tickValues(d3.range(1970, 2030, 10)).tickFormat(d3.format("d")));

  // --- Hinweislinie Erfassungsbruch 2000 (Tufte: Text direkt bei den Daten) ---
  const note = root.append("g").attr("class", "note")
    .attr("transform", `translate(${x(NOTE_YEAR - 0.5)},0)`);
  note.append("line").attr("y1", 0).attr("y2", LINE_HEIGHT + GAP + BAR_HEIGHT);
  note.append("text").attr("x", 4).attr("y", 10).text("ab 2000: Asylgesuche weltweit erfasst");

  // --- Datenebenen ---
  const bars = barPanel.append("g");
  const linePath = linePanel.append("path").attr("class", "share-line")
    .attr("stroke", COLOR_LINE);

  // --- Fadenkreuz für den Hover (Details on Demand) ---
  const crosshair = root.append("line").attr("class", "crosshair")
    .attr("y1", 0).attr("y2", LINE_HEIGHT + GAP + BAR_HEIGHT).attr("hidden", true);
  const dot = linePanel.append("circle").attr("class", "crosshair-dot")
    .attr("r", 4).attr("fill", COLOR_LINE).attr("hidden", true);
  const tooltip = d3.select(container).append("div").attr("class", "tooltip").attr("hidden", true);

  // --- Brush über beide Panels ---
  const brush = d3.brushX()
    .extent([[0, 0], [innerWidth, LINE_HEIGHT + GAP + BAR_HEIGHT]])
    .on("start", event => { if (event.sourceEvent) isBrushing = true; })
    .on("brush", brushed)
    .on("end", brushEnded);
  let isBrushing = false;   // true, solange der Nutzer mit der Maus zieht
  const brushGroup = root.append("g").attr("class", "brush").call(brush);

  // Pixel-Auswahl -> ganze Jahre: ein Jahr zählt, wenn die Auswahl
  // mindestens bis zur Mitte seines Balkens reicht
  function selectionToYears([x0, x1]) {
    const from = Math.max(FIRST_YEAR, Math.round(x.invert(x0)));
    const to = Math.min(LAST_YEAR, Math.round(x.invert(x1)));
    return [from, Math.max(from, to)];
  }

  function brushed(event) {
    if (!event.sourceEvent || !event.selection) return;   // nur echte Mausaktionen
    onYearsChange(selectionToYears(event.selection));      // Karte während dem Ziehen nachführen
  }

  function brushEnded(event) {
    if (!event.sourceEvent) return;   // eigener Aufruf von brush.move, nicht reagieren
    isBrushing = false;
    if (!event.selection) {
      onYearsChange([FIRST_YEAR, LAST_YEAR]);   // Klick ohne Ziehen = ganzer Zeitraum
      return;
    }
    // Auswahl auf ganze Jahre einrasten lassen
    const years = selectionToYears(event.selection);
    brushGroup.transition().duration(150).call(brush.move, [x(years[0] - 0.5), x(years[1] + 0.5)]);
    onYearsChange(years);
  }

  // Hover: Ereignisse kommen über die Brush-Fläche und steigen zum SVG auf
  let currentSeries = [];
  svg.on("pointermove", event => {
    const [px] = d3.pointer(event, root.node());
    const year = Math.round(x.invert(px));
    const d = currentSeries.find(item => item.year === year);
    if (!d) return hideHover();
    showHover(d, event);
  }).on("pointerleave", hideHover);

  function showHover(d, event) {
    crosshair.attr("hidden", null).attr("x1", x(d.year)).attr("x2", x(d.year));
    if (d.share !== null) dot.attr("hidden", null).attr("cx", x(d.year)).attr("cy", yShare(d.share));
    else dot.attr("hidden", true);

    tooltip.html("");
    tooltip.append("div").attr("class", "tooltip-title").text(d.year);
    tooltip.append("div").attr("class", "tooltip-value")
      .text(d.share === null ? "Keine neuen Schutzsuchenden" : `${formatPercent(d.share)} in Nachbarländern`);
    tooltip.append("div").text(`${formatCount(d.neighbours)} von ${formatCount(d.total)} neuen Schutzsuchenden`);

    const box = container.getBoundingClientRect();
    const px = event.clientX - box.left;
    tooltip.attr("hidden", null);
    const tipWidth = tooltip.node().offsetWidth;
    const left = px + 16 + tipWidth > box.width ? px - 16 - tipWidth : px + 16;
    tooltip.style("left", `${Math.max(0, left)}px`).style("top", "8px");
  }

  function hideHover() {
    crosshair.attr("hidden", true);
    dot.attr("hidden", true);
    tooltip.attr("hidden", true);
  }

  drawLegend(legendContainer);

  // Wird bei jeder Zustandsänderung aufgerufen
  function update(state, series) {
    currentSeries = series;

    // Unteres Panel: y-Skala an die aktuellen Daten anpassen
    yCount.domain([0, d3.max(series, d => d.total) || 1]).nice(3);
    barAxis.call(d3.axisLeft(yCount).ticks(3).tickFormat(millions).tickSize(-innerWidth))
      .call(g => g.select(".domain").remove());

    // Gestapelte Balken: unten Nachbarländer, darüber übrige Länder
    const barWidth = Math.max(1, x(1) - x(0) - 2);   // 2px Abstand zwischen Balken
    bars.selectAll("g.year")
      .data(series, d => d.year)
      .join(enter => {
        const g = enter.append("g").attr("class", "year");
        g.append("rect").attr("class", "bar-neighbours").attr("fill", COLOR_NEIGHBOURS);
        g.append("rect").attr("class", "bar-others").attr("fill", COLOR_OTHERS);
        return g;
      })
      .each(function (d) {
        const g = d3.select(this);
        const left = x(d.year) - barWidth / 2;
        g.select(".bar-neighbours")
          .attr("x", left).attr("width", barWidth)
          .attr("y", yCount(d.neighbours)).attr("height", BAR_HEIGHT - yCount(d.neighbours));
        g.select(".bar-others")
          .attr("x", left).attr("width", barWidth)
          .attr("y", yCount(d.total)).attr("height", yCount(d.neighbours) - yCount(d.total));
      });

    // Oberes Panel: Linie; Jahre ohne neue Schutzsuchende bleiben eine Lücke
    const line = d3.line()
      .defined(d => d.share !== null)
      .x(d => x(d.year))
      .y(d => yShare(d.share));
    linePath.attr("d", line(series));

    // Brush nachführen, wenn der Zeitraum von aussen geändert wurde
    // (Zurücksetzen oder Kontext-Tabelle). Nicht während der Nutzer selbst zieht.
    if (isBrushing) return;
    const [from, to] = state.years;
    const isFull = from === FIRST_YEAR && to === LAST_YEAR;
    const current = d3.brushSelection(brushGroup.node());
    if (isFull) {
      if (current) brushGroup.call(brush.move, null);
      return;
    }
    const target = [x(from - 0.5), x(to + 0.5)];
    if (!current || Math.abs(current[0] - target[0]) > 1 || Math.abs(current[1] - target[1]) > 1) {
      brushGroup.call(brush.move, target);
    }
  }

  return { update };
}

function drawLegend(legendContainer) {
  const legend = d3.select(legendContainer);
  legend.html("");
  const items = [
    ["line", COLOR_LINE, "Anteil in Nachbarländern (oben)"],
    ["rect", COLOR_NEIGHBOURS, "Neue Schutzsuchende in Nachbarländern (unten)"],
    ["rect", COLOR_OTHERS, "Neue Schutzsuchende in anderen Ländern (unten)"]
  ];
  for (const [kind, color, label] of items) {
    const item = legend.append("div").attr("class", "legend-item legend-item-inline");
    item.append("span")
      .attr("class", kind === "line" ? "legend-line" : "legend-swatch")
      .style("background", color);
    item.append("span").attr("class", "legend-label").text(label);
  }
}
