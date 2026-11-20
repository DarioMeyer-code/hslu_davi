// ==========================================================================
// format.js – Zahlen und Ländernamen für die Anzeige
// ==========================================================================

// Schweizer Zahlenformat: 1'234'567 und Dezimalpunkt
const swissLocale = d3.formatLocale({
  decimal: ".",
  thousands: "'",
  grouping: [3],
  currency: ["CHF ", ""]
});

export const formatCount = swissLocale.format(",.0f");

// Werte pro 1000 Einwohner: kleine Werte mit mehr Nachkommastellen
export function formatRate(value) {
  if (value === 0) return "0";
  if (value < 0.01) return "< 0.01";
  if (value < 1) return swissLocale.format(".2f")(value);
  if (value < 10) return swissLocale.format(".1f")(value);
  return swissLocale.format(",.0f")(value);
}

export const formatPercent = swissLocale.format(".0%");

// Deutsche Ländernamen liefert der Browser selbst (Intl.DisplayNames),
// dafür braucht es den zweistelligen ISO-Code.
const regionNames = new Intl.DisplayNames(["de-CH"], { type: "region" });

// Kartenländer ohne ISO-Code (Name aus der Kartendatei, hier übersetzt)
const namesWithoutCode = {
  "Kosovo": "Kosovo",
  "N. Cyprus": "Nordzypern",
  "Somaliland": "Somaliland"
};

export function countryName(data, iso3, fallback = "") {
  const iso2 = data.iso2ByIso3.get(iso3);
  if (iso2) return regionNames.of(iso2);
  return namesWithoutCode[fallback] || fallback || iso3;
}
