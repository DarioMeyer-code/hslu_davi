"""
Datenaufbereitung für das DAVI-Projekt «Nachbarländer als Hauptaufnahmeländer?»

Liest die Rohdaten aus Projekt/Data/, bereinigt sie und schreibt kleine
CSV-/JSON-Dateien nach public/data/, die D3 im Browser lädt.
Zusätzlich entsteht scripts/kontrollbericht.txt mit allem, was entfernt
oder nicht zugeordnet wurde, und mit nachgerechneten Kennzahlen.

Ausführen im Repo-Hauptordner:
    pip install -r scripts/requirements.txt
    python3 scripts/prepare_data.py
"""

import csv
import shutil
from collections import defaultdict
from pathlib import Path

import openpyxl   # liest Excel-Dateien
import pycountry  # ISO-Ländercodes: 2-stellig, 3-stellig, numerisch

# ---------------------------------------------------------------------------
# Pfade
# ---------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "Projekt" / "Data"
OUT = ROOT / "public" / "data"
REPORT = ROOT / "scripts" / "kontrollbericht.txt"

UNHCR_FILE = RAW / "UNHCR_Flow_Data.xlsx"
BORDERS_FILE = RAW / "GEODATASOURCE-COUNTRY-BORDERS.CSV"
POPULATION_FILE = RAW / "WorldBank_Population_SP.POP.TOTL.csv"
MAP_FILE = RAW / "countries-110m.json"

FIRST_YEAR, LAST_YEAR = 1962, 2025

# Alles, was im Kontrollbericht landen soll, sammeln wir in dieser Liste.
report_lines = []


def report(text=""):
    """Zeile in den Kontrollbericht schreiben und auch im Terminal zeigen."""
    print(text)
    report_lines.append(text)


def fmt(number):
    """Zahl mit Schweizer Tausendertrennzeichen, z. B. 1'234'567."""
    return f"{number:,.0f}".replace(",", "'")


# ---------------------------------------------------------------------------
# 1. Ländercodes: Zuordnungstabellen aus pycountry
# ---------------------------------------------------------------------------
# UNHCR und Weltbank nutzen ISO-3 (CHE), GeoDataSource ISO-2 (CH),
# die Weltkarte numerische Codes (756). pycountry kennt alle drei.
iso2_to_iso3 = {c.alpha_2: c.alpha_3 for c in pycountry.countries}
iso3_to_iso2 = {c.alpha_3: c.alpha_2 for c in pycountry.countries}
iso3_to_num = {c.alpha_3: c.numeric for c in pycountry.countries}
valid_iso3 = set(iso3_to_iso2)

# ---------------------------------------------------------------------------
# 2. Grenzen (GeoDataSource): welche Länder sind Nachbarn?
# ---------------------------------------------------------------------------
neighbours = set()        # Paare (iso3_a, iso3_b), in beide Richtungen
unmatched_borders = set()

with open(BORDERS_FILE, encoding="utf-8") as f:
    for row in csv.DictReader(f):
        a2, b2 = row["country_code"], row["country_border_code"]
        if not b2:
            continue  # Länder ohne Landgrenze (Inseln) haben eine leere Zeile
        if a2 in iso2_to_iso3 and b2 in iso2_to_iso3:
            a3, b3 = iso2_to_iso3[a2], iso2_to_iso3[b2]
            neighbours.add((a3, b3))
            neighbours.add((b3, a3))
        else:
            unmatched_borders.add((a2, b2))


# Grenzen im Wandel: Die Grenzen oben gelten heute. Bis 2010 gehörte der
# heutige Südsudan zu Sudan, und UNHCR zählt Menschen von dort bis 2010 als
# «Sudan». Damals grenzte Sudan deshalb auch an Uganda, Kenia und Kongo (DR).
# Regel: Bis zum angegebenen Jahr erbt das Land die Nachbarn des Gebiets.
HISTORICAL_BORDERS = [
    # (Land, damals enthaltenes Gebiet, gilt bis und mit Jahr)
    ("SDN", "SSD", 2010),
]
historical_neighbours = {}   # (iso3_a, iso3_b) -> letztes Jahr, in dem sie Nachbarn waren
for country, part, until in HISTORICAL_BORDERS:
    for a, b in neighbours:
        if a == part and b != country and (country, b) not in neighbours:
            historical_neighbours[(country, b)] = until
            historical_neighbours[(b, country)] = until


def is_neighbour(origin, asylum, year):
    """Nachbarn heute oder (bei Grenzen im Wandel) im betreffenden Jahr."""
    if (origin, asylum) in neighbours:
        return True
    until = historical_neighbours.get((origin, asylum))
    return until is not None and year <= until


# ---------------------------------------------------------------------------
# 3. UNHCR-Fluchtbewegungen einlesen und bereinigen
# ---------------------------------------------------------------------------
# Blatt DATA, Spalten: origin, OriginISO, OriginName, asylum, AsylumISO,
# AsylumName, AsylumRegion, PT (Kategorie), Year, Count.
# Die Namensspalten sind Excel-Formeln und werden leer gelesen -> wir
# verwenden nur die ISO-3-Spalten.
workbook = openpyxl.load_workbook(UNHCR_FILE, read_only=True)
sheet = workbook["DATA"]
rows = sheet.iter_rows(values_only=True)
header = next(rows)
col = {name: i for i, name in enumerate(header)}

flows = defaultdict(int)          # (jahr, herkunft, aufnahme) -> Anzahl
raw_rows = 0
raw_total = 0
removed = defaultdict(int)        # Code ohne gültiges Land -> Personen
category_total = defaultdict(int)
# Nur für den Kontrollbericht: Neue Schutzsuchende pro Jahrzehnt, getrennt nach
# Asylgesuchen (ASY, ASR) und allen übrigen Kategorien (Gruppenschutz).
asylum_check = defaultdict(int)   # (jahrzehnt, "asyl"/"schutz", nachbar 0/1) -> Personen

for r in rows:
    raw_rows += 1
    origin, asylum = r[col["OriginISO"]], r[col["AsylumISO"]]
    year, count = r[col["Year"]], r[col["Count"]] or 0
    raw_total += count
    category_total[r[col["PT"]]] += count

    # UKN (unbekannt), STA (staatenlos), TIB (Tibet) usw. haben kein Land
    # und damit auch keine Nachbarn -> entfernen und im Bericht zählen.
    bad = [code for code in (origin, asylum) if code not in valid_iso3]
    if bad:
        for code in set(bad):
            removed[code] += count
        continue
    if not FIRST_YEAR <= year <= LAST_YEAR:
        removed[f"Jahr {year}"] += count
        continue

    # Alle Kategorien (REF, GRP, TMP, ROC, ASY, ASR, OIP) zusammenzählen:
    # Jede zählt Personen, die neu ankommen.
    flows[(year, origin, asylum)] += count

    group = "asyl" if r[col["PT"]] in ("ASY", "ASR") else "schutz"
    decade = year // 10 * 10
    asylum_check[(decade, group, int(is_neighbour(origin, asylum, year)))] += count

clean_total = sum(flows.values())

# ---------------------------------------------------------------------------
# 4. Bevölkerung (Weltbank SP.POP.TOTL)
# ---------------------------------------------------------------------------
# Die Datei enthält auch Aggregate wie «World» (WLD) oder «Euro area» (EMU).
# Diese haben keinen gültigen ISO-3-Code und fallen so automatisch weg.
raw_population = {}               # alle Codes, auch Kosovo (XKX, kein ISO-Code)
with open(POPULATION_FILE, encoding="utf-8") as f:
    for row in csv.DictReader(f):
        code, year = row["Country Code"], int(row["Year"])
        if FIRST_YEAR <= year <= LAST_YEAR and row["Value"]:
            raw_population[(code, year)] = float(row["Value"])

# Gebiete zusammenzählen, damit die Bevölkerung dasselbe Gebiet meint wie UNHCR
# (Grenzen im Wandel, siehe Website):
# - Serbien: UNHCR zählt Kosovo dazu (Weltbank: XKX), bis 2005 auch Montenegro.
# - Sudan: bis 2010 inklusive des heutigen Südsudans.
# Das hinzugezählte Gebiet fällt in diesen Jahren als eigenes Land weg.
POPULATION_MERGES = [
    # (Land, hinzugezähltes Gebiet, bis und mit Jahr)
    ("SRB", "XKX", LAST_YEAR),
    ("SRB", "MNE", 2005),
    ("SDN", "SSD", 2010),
]
for country, part, until in POPULATION_MERGES:
    for year in range(FIRST_YEAR, until + 1):
        if (country, year) in raw_population and (part, year) in raw_population:
            raw_population[(country, year)] += raw_population.pop((part, year))

population = {}                   # (iso3, jahr) -> Einwohner
aggregates = set()
for (code, year), value in raw_population.items():
    if code not in valid_iso3:
        aggregates.add(code)
        continue
    population[(code, year)] = value

# ---------------------------------------------------------------------------
# 5. Weltkarte: welche Kartenländer gehören zu welchem ISO-3-Code?
# ---------------------------------------------------------------------------
import json

world = json.loads(MAP_FILE.read_text(encoding="utf-8"))
map_ids = set()
map_without_id = []
for geometry in world["objects"]["countries"]["geometries"]:
    if "id" in geometry:
        map_ids.add(geometry["id"])
    else:
        map_without_id.append(geometry["properties"]["name"])
num_to_iso3 = {num: iso3 for iso3, num in iso3_to_num.items()}
map_iso3 = {num_to_iso3[n] for n in map_ids if n in num_to_iso3}

# ---------------------------------------------------------------------------
# 6. Dateien für die Website schreiben
# ---------------------------------------------------------------------------
OUT.mkdir(parents=True, exist_ok=True)

with open(OUT / "flows.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["jahr", "herkunft", "aufnahme", "anzahl", "nachbar"])
    for (year, origin, asylum), count in sorted(flows.items()):
        if count > 0:
            w.writerow([year, origin, asylum, count, int(is_neighbour(origin, asylum, year))])

with open(OUT / "population.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["iso3", "jahr", "einwohner"])
    for (code, year), value in sorted(population.items()):
        w.writerow([code, year, int(value)])

used_iso3 = {o for _, o, _ in flows} | {a for _, _, a in flows} | map_iso3
with open(OUT / "countries.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["iso3", "iso2", "iso_num"])
    for code in sorted(used_iso3):
        w.writerow([code, iso3_to_iso2[code], iso3_to_num[code]])

with open(OUT / "borders.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["iso3_a", "iso3_b"])
    for a, b in sorted(neighbours):
        if a < b:  # jedes Paar nur einmal speichern
            w.writerow([a, b])

# Frühere Nachbarschaften (Grenzen im Wandel), damit der Browser dieselbe
# Regel anwenden kann (Umrandung der Nachbarländer, Hypothesen-Check)
with open(OUT / "borders_history.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["iso3_a", "iso3_b", "bis_jahr"])
    for (a, b), until in sorted(historical_neighbours.items()):
        if a < b:
            w.writerow([a, b, until])

shutil.copy(MAP_FILE, OUT / "world-110m.json")

# ---------------------------------------------------------------------------
# 7. Kontrollbericht
# ---------------------------------------------------------------------------
report("KONTROLLBERICHT Datenaufbereitung")
report("=" * 60)

report("\n1. UNHCR-Rohdaten")
report(f"   Zeilen: {fmt(raw_rows)}, Personen total: {fmt(raw_total)}")
report("   nach Kategorie: " + ", ".join(
    f"{k} {fmt(v)}" for k, v in sorted(category_total.items(), key=lambda x: -x[1])))

report("\n2. Entfernt (kein gültiges Land oder ausserhalb 1962–2025)")
for code, persons in sorted(removed.items(), key=lambda x: -x[1]):
    report(f"   {code}: {fmt(persons)} Personen")
removed_total = raw_total - clean_total
report(f"   Total entfernt: {fmt(removed_total)} ({removed_total / raw_total:.1%})")

report("\n3. Bereinigte Fluchtbewegungen (public/data/flows.csv)")
report(f"   Zeilen (Jahr × Herkunft × Aufnahme): {fmt(len(flows))}")
report(f"   Personen: {fmt(clean_total)}")
report(f"   Herkunftsländer: {len({o for _, o, _ in flows})}, "
       f"Aufnahmeländer: {len({a for _, _, a in flows})}")

report("\n4. Grenzen")
report(f"   Nachbarpaare: {len(neighbours) // 2}, nicht zuordenbar: {sorted(unmatched_borders) or 'keine'}")
countries_in_flows = {o for _, o, _ in flows} | {a for _, _, a in flows}
iso3_in_borders = {a for a, _ in neighbours}
no_border = sorted(countries_in_flows - iso3_in_borders)
report(f"   Länder in den Fluchtdaten ohne Landgrenze (Inseln usw.): {len(no_border)}")
report(f"   {', '.join(no_border)}")
report("   Grenzen im Wandel (frühere Nachbarn, zählen bis und mit Jahr):")
for (a, b), until in sorted(historical_neighbours.items()):
    if a < b:
        persons = sum(c for (y, o, x), c in flows.items()
                      if y <= until and {o, x} == {a, b})
        report(f"   {a}–{b} bis {until}: {fmt(persons)} Personen zählen dadurch als Nachbarland")

report("\n5. Bevölkerung")
report(f"   Länder: {len({c for c, _ in population})}, Jahre {FIRST_YEAR}–{LAST_YEAR}")
report(f"   entfernte Aggregate/ungültige Codes: {len(aggregates)}")
report("   Zusammengezählt (Grenzen im Wandel): "
       + "; ".join(f"{c} + {p} bis {u}" for c, p, u in POPULATION_MERGES))
for code, year in [("SRB", 2013), ("SRB", 1999), ("SDN", 2010)]:
    report(f"   {code} {year}: {fmt(population[(code, year)])} Einwohner")
missing_pop = defaultdict(int)
for (year, origin, asylum), count in flows.items():
    if (asylum, year) not in population:
        missing_pop[asylum] += count
missing_total = sum(missing_pop.values())
report(f"   Neue Schutzsuchende in Aufnahmeländern ohne Bevölkerungszahl: {fmt(missing_total)} "
       f"({missing_total / clean_total:.2%})")
for code, persons in sorted(missing_pop.items(), key=lambda x: -x[1])[:10]:
    report(f"   {code}: {fmt(persons)}")

report("\n6. Weltkarte")
report(f"   Länder auf der Karte: {len(map_ids) + len(map_without_id)}, "
       f"davon ohne Code: {', '.join(map_without_id)}")
arrivals_by_asylum = defaultdict(int)
for (year, origin, asylum), count in flows.items():
    arrivals_by_asylum[asylum] += count
not_on_map = {c: v for c, v in arrivals_by_asylum.items() if c not in map_iso3}
not_on_map_total = sum(not_on_map.values())
report(f"   Aufnahmeländer, die auf der Karte fehlen (zu klein für 1:110 Mio.): "
       f"{len(not_on_map)}, {fmt(not_on_map_total)} Personen ({not_on_map_total / clean_total:.2%})")
for code, persons in sorted(not_on_map.items(), key=lambda x: -x[1])[:10]:
    report(f"   {code}: {fmt(persons)}")

report("\n7. Nachgerechnete Befunde")


def share_neighbours(filter_fn):
    total = sum(c for k, c in flows.items() if filter_fn(*k))
    nb = sum(c for k, c in flows.items() if filter_fn(*k) and is_neighbour(k[1], k[2], k[0]))
    return nb / total if total else float("nan")


report(f"   Anteil Nachbarländer, alle Jahre: {share_neighbours(lambda y, o, a: True):.0%}")
for decade in range(1960, 2030, 10):
    s = share_neighbours(lambda y, o, a, d=decade: d <= y < d + 10)
    report(f"   {decade}er: {s:.0%}")


def per_1000(asylum, year, origin_filter=lambda o: True):
    arrivals = sum(c for (y, o, a), c in flows.items()
                   if y == year and a == asylum and origin_filter(o))
    pop = population.get((asylum, year))
    return arrivals, (arrivals / pop * 1000 if pop else float("nan"))


report("\n   Anteil Nachbarländer nach Jahrzehnt: alle Kategorien / ohne Asylgesuche (ASY, ASR)")
report("   und Anteil der Asylgesuche an allen neuen Schutzsuchenden (Erfassungsbruch, siehe Datenseite)")
for decade in range(1960, 2030, 10):
    g = {(grp, nb): asylum_check[(decade, grp, nb)] for grp in ("asyl", "schutz") for nb in (0, 1)}
    total = sum(g.values())
    protection = g[("schutz", 0)] + g[("schutz", 1)]
    report(f"   {decade}er: {(g[('asyl', 1)] + g[('schutz', 1)]) / total:.0%} / "
           f"{g[('schutz', 1)] / protection:.0%}   (Asylgesuche {1 - protection / total:.0%})")
report()

for code, year in [("LBN", 2013), ("CHE", 2013), ("DEU", 2013), ("MKD", 1999)]:
    arrivals, rate = per_1000(code, year)
    report(f"   {code} {year}: {fmt(arrivals)} neue Schutzsuchende, {rate:.1f} pro 1000 Einwohner")

# Syrien 2013: Neue Schutzsuchende pro 1000 Einwohner in Nachbarländern vs. Rest der Welt
year = 2013
syr_nb = [a for (o, a) in neighbours if o == "SYR"]
arr_nb = sum(c for (y, o, a), c in flows.items() if y == year and o == "SYR" and a in syr_nb)
arr_rest = sum(c for (y, o, a), c in flows.items() if y == year and o == "SYR" and a not in syr_nb)
pop_nb = sum(population.get((a, year), 0) for a in syr_nb)
pop_rest = sum(v for (c, y), v in population.items()
               if y == year and c not in syr_nb and c != "SYR")
report(f"   SYR 2013 in Nachbarländern ({', '.join(sorted(syr_nb))}): "
       f"{arr_nb / pop_nb * 1000:.1f} pro 1000; Rest der Welt: {arr_rest / pop_rest * 1000:.2f} pro 1000")

for code in ["UKR", "VEN"]:
    s_all = share_neighbours(lambda y, o, a, c=code: o == c)
    s_recent = share_neighbours(lambda y, o, a, c=code: o == c and y >= 2015)
    report(f"   {code}: Anteil Nachbarländer alle Jahre {s_all:.0%}, ab 2015 {s_recent:.0%}")

REPORT.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
print(f"\nDateien geschrieben nach {OUT.relative_to(ROOT)}/ und {REPORT.relative_to(ROOT)}")
