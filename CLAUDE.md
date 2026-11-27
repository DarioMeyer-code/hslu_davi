# CLAUDE.md – DAVI-Projekt «Nachbarländer als Hauptaufnahmeländer?»

Kontext für Claude Code. Stand: 27. November 2026. Zusammengefasst aus den bisherigen Chats im
claude.ai-Projekt «DAVI», ergänzt um das Proposal-Feedback und den Abgleich mit den Dateien im Repo.

## Wie wir zusammenarbeiten (wichtig)

- **Sprache:** Deutsch, Schweizer Schreibweise (ss statt ß). Einfach erklären, Fachbegriffe kurz erläutern.
- **Nichts ohne Auftrag generieren oder ändern.** Zuerst gemeinsam planen, dann umsetzen. Bei Unklarheit nachfragen statt loslegen. Keine Dateien anfassen, die nicht zum Auftrag gehören.
- **Einfach halten, kein Over-Engineering.** Ziel ist ein solides, gut begründbares Projekt, nicht ein möglichst grosses.
- **Code muss erklärbar sein.** Wir müssen Code und Designentscheidungen mündlich verteidigen können. Lieber verständlich und kommentiert als clever.
- **Nicht committen oder pushen ohne Auftrag.** Ein Push auf `main` deployt die Website automatisch (siehe Technik).
- **Keine Branches.** Wir arbeiten direkt auf `main`: vor der Arbeit `git pull`, nach Auftrag committen und auf `main` pushen. Keine Feature-Branches und keine Pull Requests anlegen.
- **Hook-Meldung «Please commit and push»:** Die Cloud-Umgebung meldet nach jeder Antwort automatisch, es gebe ungespeicherte Änderungen. Das ist kein Auftrag von uns; es gilt die Regel oben (erst committen, wenn wir OK geben).
- **Zahlen nie aus dem Gedächtnis.** Alle Kennzahlen aus den Daten berechnen. Die Befunde unten sind vorläufig.
- **Keine Skizzen erstellen.** Die Konzeptskizze darf laut Aufgabenstellung nicht mit GenAI gezeichnet werden. Unsere Handskizze existiert bereits (`Projekt/Proposal/Sketch_Project -proposal.pdf`). Das PNG `Interaktives Flüchtlingsbewegungs-Dashboard geschniegelt.png` ist KI-generiert und darf **nicht** als Skizze auf die Website.
- **Fremden Code kennzeichnen.** Basiert Code auf einem Beispiel (D3 Graph Gallery, Observable, Tutorial), die Quelle im Code-Kommentar nennen und in die Referenzliste aufnehmen, mit einem Halbsatz, was übernommen wurde. Die Plagiatsregeln der HSLU gelten.

## Unterlagen im Repo

| Pfad | Inhalt |
|---|---|
| `Projekt/Aufgabenstellung_Projekt_DAVI_D3.pdf` | Aufgabenstellung (massgebend) |
| `Projekt/Proposal/` | Proposal (PDF, PPTX), Handskizze, KI-PNG (nicht verwenden) |
| `Projekt/Data/` | Rohdaten: UNHCR-Excel, Weltbank-ZIP, GeoDataSource-Grenzen |
| `Slides_Dozent/` | Vorlesungsfolien 00–04 und Tufte-Kapitel (Scan aus «Beautiful Evidence») |
| `module-I.BA_DAVI.18-de.pdf` | Modulbeschreibung (Projektarbeit = 100 % der Note) |
| `public/` | Website (wird deployt): alle Abschnitte mit Texten, Visualisierung, Daten in `public/data/` |
| `Projekt/Praesentation/Ablauf_Praesentation.md` | Ablauf der Präsentation zum Ausdrucken/Proben, gleich wie der Abschnitt «Präsentation» in diesem Dokument (Stand 27.11.2026) |
| `README.md` | Kurzbeschreibung des Repos, lokal starten |
| `CLAUDE.md` | Dieses Dokument |

## Modul und Aufgabe

- Modul I.DAVI (Data Visualization), HSLU, Bachelor Wirtschaftsinformatik, Prof. Dr. Halldór Janetzko. Zweierteam: Dario Meyer, Martina Gander.
- Aufgabe: eine eigene Fragestellung mit einer interaktiven **D3.js**-Visualisierung beantworten und als vollständige Website abgeben.

### Pflichtkriterien Interaktion
1. Information Seeking Mantra: Overview first, zoom and filter, details on demand.
2. Mindestens zwei Visualisierungen sind per Brushing & Linking verbunden.

Ausserdem: (Farb-)Legenden nicht vergessen.

### Pflichtinhalte der Website
- Startseite mit Navigation durch alle Seiten
- Hintergrund zum Projekt inklusive erster Skizze
- Datenquellen mit Metadaten
- Visualisierung(en) mit Interaktion (Filter, Brushing & Linking usw.)
- Designentscheidungen: **2500–3500 Zeichen inkl. Leerzeichen**, je ca. 500 Zeichen zu: Foundations Visual Design · Fundamental Principles of Analytical Design (Tufte) · Data-Ink Ratio (Tufte) · Human Perception · Tasks in Data Visualization · Interaction Concept
- Referenzen mit Erkenntnissen zum Thema, inklusive Code-Quellen mit Halbsatz
- Kontakt mit Infos zu den Gruppenmitgliedern

### Bewertung
- 40 % Klarheit und Plausibilität des Konzepts
- 50 % Umsetzung der D3-Visualisierung gemäss den Grundlagen der Informationsvisualisierung
- 10 % User Experience der Website (Navigation, Struktur, Nutzererwartungen, mentales Modell)

### Hinweise aus den Vorlesungsfolien (für Umsetzung und Designtext)
- Choroplethenkarten: **nie absolute Werte** zeigen, nur normierte (bei uns: pro 1000 Einwohner).
- Projektion: **Natural Earth 2** statt Mercator (`d3.geoNaturalEarth2` aus d3-geo-projection).
- Farben nach **ColorBrewer**. Legenden und Skalen sind Pflicht.
- Zeitliche Veränderung lieber mit Small Multiples oder Interaktion zeigen als mit Animation (Change Blindness).
- Visuelle Variablen (Bertin): Position ist am genauesten, danach Länge, Helligkeit/Sättigung. Farbton nur für Kategorien.
- Präattentive Wahrnehmung, Gestaltgesetze (Nähe, Ähnlichkeit, Geschlossenheit, Kontinuität).
- Tufte: Data-Ink Ratio maximieren. Grundprinzipien: Vergleiche zeigen, Kausalität/Mechanismus, multivariat, Wort/Zahl/Bild integrieren, Quellen dokumentieren, Inhalt zählt.
- Keims Taxonomie: Interaktive Filterung (Brushing & Linking, Dynamic Queries), Semantic Zoom.
- Normalisierung linear, Wurzel, Log (bei grossem Wertebereich Log).

### Termine
- 16. Okt. 2026 – Proposal: **erledigt**
- **11. Dez. 2026 – Projektpräsentation:** genau 5 Minuten, beide Mitglieder gleich viel. Folien am selben Tag in ILIAS hochladen. Danach 5 Minuten Feedback an andere Gruppen.
- **17. Jan. 2027 – Abgabe:** Website als ZIP und Link zur Webseite in ILIAS hochladen.
- Donnerstags zur Kurszeit gibt es Zoom-Support. Empfohlen: mindestens einmal Feedback holen.

## Unser Projekt

**Titel:** Nachbarländer als Hauptaufnahmeländer? Neue Schutzsuchende 1962–2025

**Forschungsfrage:** Nehmen Nachbarländer bei grossen Fluchtbewegungen im Verhältnis zu ihrer Bevölkerung mehr Geflüchtete auf als weiter entfernte Länder, und wie hat sich das seit 1962 verändert?

**Hypothese:** Nachbarländer nehmen pro Einwohner am meisten auf. Ihr Anteil an den neuen Schutzsuchenden nimmt über die Jahrzehnte aber ab, es fliehen also mehr Menschen weiter weg.

**Begriffe**
- *Neue Schutzsuchende* (bis 27.11.2026 «Neuankünfte»; umbenannt, weil «Neuankünfte» nach allen Ankommenden inkl. Migration klingt): Menschen, die in einem Jahr in einem Land neu als Schutzsuchende erfasst werden (alle sieben UNHCR-Kategorien, Asylgesuche unabhängig vom Entscheid; gezählt im Jahr der Erfassung, nicht der Einreise). Keine Migration aus anderen Gründen, keine Binnenvertriebenen, nicht alle, die dort leben (Bestand). Code-Variablen heissen weiterhin `arrivals`. Die oft zitierten «2 von 3 Geflüchteten leben in einem Nachbarland» (UNHCR Global Trends) beziehen sich auf den Bestand. Nicht verwechseln.
- *Nachbarland:* Aufnahmeland mit gemeinsamer Landgrenze zum Herkunftsland (laut GeoDataSource). Bhutan → Nepal zählt damit nicht als Nachbar, obwohl die Länder nah beieinander liegen. Das ist bewusst so und muss auf der Website begründet werden.
- *Pro 1000 Einwohner:* Neue Schutzsuchende ÷ Bevölkerung des Aufnahmelands × 1000. Absolute Zahlen würden grosse Länder immer stärker belastet aussehen lassen.
- *Anteil in Nachbarländern* (Herkunftsland H, Zeitraum T): Neue Schutzsuchende aus H in Nachbarländern von H ÷ alle neuen Schutzsuchenden aus H.

**Zielgruppe:** interessierte Laien, die Nachrichten über Flucht verfolgen. Nebenzielgruppe: Studierende, Lehrpersonen, Journalisten, eventuell Politik und Hilfswerke.

**User-Tasks:** Überblick (wo liegt die Last?) · Vergleichen (Nachbarland vs. weiter entfernt) · Entwicklung (seit 1962) · Nachschlagen (ein Land, eine Krise).

## Feedback des Dozenten zum Proposal (16. Okt. 2026)

1. **Startzustand:** Wenn nichts ausgewählt ist, zeigen, welche Länder wie viele Personen aus Nachbarländern aufnehmen.
2. **Top-10-Liste wegnehmen.**
3. **Verhalten der Herkunftsländer miteinander vergleichbar machen.**

Umsetzung: Punkt 1 und 2 werden umgesetzt (Karte startet mit «Neue Schutzsuchende aus Nachbarländern», Top 10 entfällt). **Punkt 3 lassen wir vorerst weg** und prüfen ihn allenfalls später nochmals (Idee dafür siehe «Zurückgestellt» im Visualisierungskonzept).

## Daten

| Datensatz | Inhalt | Fundort | Lizenz |
|---|---|---|---|
| UNHCR Forced Displacement Flows | Neue Schutzsuchende pro Jahr × Herkunftsland × Aufnahmeland × Kategorie, 1962–2025. Im Repo: `Projekt/Data/UNHCR_Flow_Data.xlsx`, Blatt `DATA`, 108'879 Zeilen, Stand 11.6.2026 | UNHCR Refugee Data Finder; auch R-Paket `refugees`: https://github.com/PopulationStatistics/refugees | CC BY 4.0 |
| World Bank «Population, total» (`SP.POP.TOTL`) | Bevölkerung pro Land und Jahr, 1960–2025. Im Repo: `Projekt/Data/WorldBank_Population_SP.POP.TOTL.csv` | https://data.worldbank.org/indicator/SP.POP.TOTL. Heruntergeladen über die Kopie https://github.com/datasets/population (Weltbank-Website war aus der Arbeitsumgebung nicht erreichbar); mit der Weltbank-Datei im Repo abgeglichen: 770 Werte, keine Abweichung über 1 %. Auf der Website die Weltbank zitieren. | CC BY 4.0 |
| GeoDataSource Country Borders | Länderpaare mit gemeinsamer Grenze (ISO-2), im Repo `Projekt/Data/GEODATASOURCE-COUNTRY-BORDERS.CSV` | https://github.com/geodatasource/country-borders | CC BY-SA 4.0 |
| Weltkarte | Länderpolygone als TopoJSON (177 Länder, Massstab 1:110 Mio.). Im Repo: `Projekt/Data/countries-110m.json` | npm-Paket `world-atlas` 2.0.2 (Mike Bostock), basiert auf Natural Earth | ISC / Public Domain |

**Wer die Daten erhebt (für die Datenseite)**
- UNHCR: bis 1999 aus dem UNHCR-Archiv, ab 2000 aus der jährlichen offiziellen Statistik. Die Zahlen liefern meist Regierungen (Asylbehörden) oder sie stammen aus UNHCR-Registrierungen vor Ort.
- Weltbank: stellt nur zusammen und zählt nicht selbst. Quellen sind die UN Population Division, nationale Statistikämter, Eurostat und die UN Statistics Division.
- GeoDataSource: gibt nicht an, woher die Grenzdaten stammen. Das ist ein Schwachpunkt, den wir ehrlich benennen. Landgrenzen ändern sich aber kaum und lassen sich leicht prüfen.

**Einschränkungen:** Die Daten zeigen, wo Menschen ankommen, aber nicht, ob sie später weiterziehen. Fluchtursachen sind nicht enthalten.

### Stolpersteine bei der Aufbereitung
- **Bevölkerung:** `P_Population.zip` enthält nur die Jahre 1960, 1970 … 2020 und ist für Jahreswerte unbrauchbar. **Gelöst:** Jahresreihe 1960–2025 als `Projekt/Data/WorldBank_Population_SP.POP.TOTL.csv` (siehe Datentabelle).
- **Kategorien (laut Blatt `Metadata` der UNHCR-Excel):** REF = Flüchtlinge · GRP = Gruppenanerkennung · TMP = vorübergehender Schutz · ROC = flüchtlingsähnliche Situation · **ASY = neue Asylgesuche** · ASR = von UNHCR registrierte Asylsuchende · OIP = andere Schutzbedürftige. Für «Neue Schutzsuchende» werden sie summiert.
- **Erfassungsbrüche:** Asylgesuche (ASY) gibt es 1970–1999 nur für **bis zu 37 Industrieländer** (1970: 3), ab 2000 für 192 Länder. GRP ab 2000, TMP ab 2011 (nicht 2000, nachgezählt 27.11.2026), ROC ab 1990, OIP ab 2018, ASR ab 2021. Alle Brüche im Detail: siehe «Datenbrüche» unten. Weil diese Industrieländer selten Nachbarn der Herkunftsländer sind, kann der Nachbar-Anteil allein wegen der Erfassung schwanken. **Entscheid:** kein Filter nach Kategorie (alle Kategorien zählen Personen, unsere Frage ist *wo* Menschen ankommen, nicht über welches Verfahren). Stattdessen Hinweislinie bei 2000 auf der Zeitachse und Erklärung auf der Datenseite.
- Nachgerechnete Werte zu den Erfassungsbrüchen: siehe «Nachgerechnete Befunde» unten.

### Datenbrüche (nachgezählt in `UNHCR_Flow_Data.xlsx`, Blätter `DATA` und `Metadata`, 27.11.2026)

Ein grosser Bruch (2000) und fünf kleinere. «Bruch» heisst: Die Zahlen ändern sich, weil anders oder mehr erfasst wird, nicht weil sich die Fluchtbewegungen ändern.

| # | Jahr | Was | Grösse | Grund (laut Metadata) |
|---|---|---|---|---|
| 1 | 1962–1999 | Schleichende Ausweitung der erfassten Länder | Aufnahmeländer 1962: 4 · 1980: 60 · 1999: 76. Asylgesuche (ASY) 1970: 3 Länder, 1985: 17, 1999: 37 | Flüchtlinge aus dem historischen UNHCR-Archiv (137 Länder), Asylgesuche aus einer Publikation über Industrieländer (bis zu 37 Länder) |
| 2 | 1990 | ROC (flüchtlingsähnliche Situation) kommt dazu | klein | neue Kategorie; nur echte neue Schutzsuchende, keine Methodenwechsel |
| 3 | **2000** | **Hauptbruch:** neue Quelle, Asylgesuche weltweit | Aufnahmeländer 76 → 142; ASY 37 → 137 Länder; 2000 sind 54 % der neuen Schutzsuchenden Asylgesuche | Wechsel auf die jährliche offizielle Statistik (UNHCR-Datacube, 177 Länder für Flüchtlinge, 192 für Asylgesuche). REF wird ab 2000 nicht mehr geführt, sondern in GRP (Gruppenanerkennung) und später TMP aufgeteilt |
| 4 | 2011 | TMP (vorübergehender Schutz) als eigene Kategorie | gross bei Syrien (6,6 Mio.) und Ukraine (6,2 Mio.) | neue Kategorie; TMP in Russland 2013–2017 ausgeschlossen (sonst doppelt mit Asylstatistik) |
| 5 | 2018 | OIP (andere Schutzbedürftige) kommt dazu | 2018: 43 % aller neuen Schutzsuchenden; 98 % davon Venezuela (6,3 von 6,4 Mio.) | neue Kategorie für Menschen ohne formellen Flüchtlingsstatus, v. a. aus Venezuela |
| 6 | 2021 | ASR (von UNHCR registrierte Asylsuchende) kommt dazu | vernachlässigbar (0,3 von 116 Mio.) | UNHCR erfasst seit 2021 Asylsuchende ohne eigenes Anerkennungsverfahren besser |

**Folgen für die Auswertung**
- Bruch 2000 verschiebt den Nachbar-Anteil am stärksten: Asylgesuche gehen meist in nicht angrenzende Länder. Ohne Asylgesuche lag der Anteil 1970er–2010er stabil bei rund 90 % (siehe «Nachgerechnete Befunde»).
- Die 1960er beruhen auf sehr wenigen Ländern und sind wenig aussagekräftig.
- Bruch 2018 betrifft fast nur Venezuela.
- **Entscheid (27.11.2026):** Alle Jahre 1962–2025 behalten, nicht ab 2000 abschneiden (Frage lautet «seit 1962»; auch ab 2000 gibt es Brüche; der Bruch selbst ist ein Befund). Hauptbruch mit Hinweislinie bei 2000 markieren, übrige Brüche auf der Datenseite erwähnen.
- Website-Text «Asylgesuche 1970–1999 für 37 Industrieländer» war ungenau: «für bis zu 37» (1970 erst 3). **Korrigiert** in der Tabelle der Datenbrüche auf der Datenseite.
- **Ländercodes:** UNHCR hat eigene Codes (ALG) und ISO3-Codes (DZA). Immer die ISO3-Spalten verwenden (`OriginISO`, `AsylumISO`). Die Namensspalten in der Excel-Datei sind Formeln und werden beim Einlesen mit einem Skript leer gelesen; Namen aus Blatt `T23` holen. GeoDataSource nutzt ISO2 (CH), also nach ISO3 umrechnen. Die TopoJSON-Weltkarte (world-atlas) nutzt numerische ISO-Codes (756 = Schweiz), dafür braucht es eine Zuordnungstabelle.
- **Sonderfälle:** Kosovo ist bei UNHCR mit Serbien zusammengeführt. **Entscheid:** so übernehmen, Kosovo auf der Karte grau mit Hinweis; Bevölkerung von Kosovo zu Serbien gezählt (siehe «Grenzen im Wandel»). UNHCR-Codes ohne Land: `UKN` (unbekannte Herkunft), `STA` (staatenlos), `TIB` (Tibet), zusammen ca. 2 % der neuen Schutzsuchenden. **Entscheid:** aus der Auswertung entfernen (kein Nachbarland bestimmbar), Anzahl auf der Datenseite nennen.
- **Weltbank:** Die Datei enthält Aggregate (World, Regionen, Einkommensgruppen). Das Skript entfernt sie (kein gültiger ISO-3-Code). Die heruntergeladene Jahresreihe enthält bereits 2025.
- **Zahlenformat:** In der Excel-Ansicht stehen Schweizer Tausendertrennzeichen (20’000). Beim Einlesen per Skript kommen echte Zahlen an.
- **Datenmenge:** Nach dem Zusammenzählen der Kategorien bleiben 103'502 Zeilen (Jahr × Herkunft × Aufnahme), als `flows.csv` ca. 2 MB. Das ist für den Browser in Ordnung (GitHub Pages liefert komprimiert aus). **Entscheid:** eine einzige Datei, Filtern und Summieren im Browser (`data.js`), statt vieler vorgerechneter Teildateien – einfacher zu erklären.
- **Neu aufbauen:** Die ersten Auswertungen liefen in einer claude.ai-Sandbox. Diese CSV-Dateien existieren nicht mehr. Die Aufbereitung muss als Skript im Repo neu gebaut werden. Laut Aufgabe wäre auch Tableau Prep erlaubt.

### Grenzen im Wandel (geprüft und umgesetzt 27.11.2026)

Grenzen (GeoDataSource) und Bevölkerung (Weltbank) gelten für **heutige** Länder; UNHCR erfasst seit 1962 auch Staaten, die sich geteilt oder vereinigt haben. Auf der Website als Tabelle unter Daten → «Grenzen im Wandel» (`#grenzen-im-wandel`).

| Fall | Problem | Umgang |
|---|---|---|
| **Sudan / Südsudan** | Bis 2010 gehört der Südsudan zu Sudan (UNHCR-Code SDN). Uganda, Kenia, Kongo (DR) grenzen nur an den heutigen Südsudan → zählten fälschlich als «nicht Nachbarland». Weltbank-Bevölkerung SDN ohne Südsudan. | **Korrigiert:** `HISTORICAL_BORDERS` in `prepare_data.py`: bis und mit 2010 erbt SDN die Nachbarn von SSD (COD, KEN, UGA) → `public/data/borders_history.csv` (iso3_a, iso3_b, bis_jahr), Browser nutzt dieselbe Regel (`neighboursInYear`, `neighboursInPeriod` in `data.js`; Kartenumrandung, Tooltip «ja, bis 2010», Hypothesen-Check). Betrifft 902'223 Personen (beide Richtungen: UGA 552'378, COD 204'347, KEN 145'498). Bevölkerung SDN + SSD bis 2010 (`POPULATION_MERGES`). |
| **Serbien / Kosovo / Montenegro** | UNHCR-Code SRB = «Serbia and Kosovo: S/RES/1244 (1999)», bis 2005 auch Montenegro (MNE erst ab 2006). Weltbank führt Kosovo (XKX) und Montenegro separat → pro 1000 EW ca. 25 % zu hoch. | **Korrigiert:** Bevölkerung SRB + XKX (alle Jahre) + MNE (bis 2005). Grenze Albanien–Kosovo zählt als Grenze zu Serbien (GeoDataSource). |
| Jugoslawien (vor ca. 1990) | SRB steht vermutlich für ganz Jugoslawien (HRV/MKD ab 1990, BIH 1991, SVN 1992). Österreich/Italien grenzten an Jugoslawien. | Dokumentiert (wenige Tausend Personen, v. a. Asylgesuche). |
| Deutschland (bis 1990) | UNHCR-DEU vor 1990 = Westdeutschland; Weltbank-DEU = vereinigtes Deutschland (1970: 78 statt ca. 61 Mio.) → pro 1000 EW ca. 20 % zu tief. POL→DEU vor 1990 (116'422) zählt als Nachbar, obwohl nur die DDR an Polen grenzte. | Dokumentiert (keine Weltbank-Reihe für Westdeutschland). |
| Tschechoslowakei (bis 1992), Äthiopien/Eritrea (bis 1993), Indonesien/Osttimor (bis 2002) | Codes umfassen das spätere Land | Dokumentiert, gering. Herkunft Eritrea führt UNHCR schon ab 1977 separat. |
| Ehemalige Sowjetunion | UNHCR ordnet Herkunft schon vor 1991 den heutigen Staaten zu (z. B. ARM ab 1964, RUS ab 1966); Aufnahmeländer erst ab 1992 | Kein Problem |
| Gebiete ohne Staat | Kosovo, Somaliland, Nordzypern ohne Kartencode; Hongkong/Macau (grenzen an CHN) nicht auf der Karte; Palästina und Westsahara als Herkunft mit Grenzen | Grau bzw. dokumentiert; UKN/STA/TIB entfernt |

**Wirkung der Korrektur auf die Befunde:** Anteil Nachbarländer alle Jahre 59 % → 60 %; 1960er 64 % → 82 % (erster sudanesischer Bürgerkrieg: Flucht aus dem heutigen Südsudan nach Uganda/Kongo); 1970er 84 → 85 %; 1980er 81 → 83 %; 1990er 67 → 69 %; 2000er 50 → 52 %; 2010er/2020er unverändert. Ohne Asylgesuche 1970er–2010er neu 89–96 % (vorher 88–93 %).

### Nachgerechnete Befunde (`scripts/prepare_data.py`, Stand 27.11.2026 nach Korrektur «Grenzen im Wandel», Details in `scripts/kontrollbericht.txt`)
- Bereinigt: 103'502 Zeilen, 113,6 Mio. neue Schutzsuchende, 211 Herkunfts- und 189 Aufnahmeländer. Entfernt 2,5 Mio. (2,1 %): UKN 2,26 Mio., STA 0,20 Mio., TIB 11'000.
- Über alle Jahre landen **60 %** der neuen Schutzsuchenden in Nachbarländern (vor der Korrektur «Grenzen im Wandel»: 59 %).
- Anteil Nachbarländer nach Jahrzehnt, alle Kategorien / ohne Asylgesuche (Anteil Asylgesuche): 1960er 82 %/82 % (0 %) · 1970er 85 %/89 % (5 %) · 1980er 83 %/93 % (12 %) · 1990er 69 %/96 % (29 %) · 2000er 52 %/94 % (62 %) · 2010er 60 %/89 % (42 %) · 2020er 46 %/63 % (44 %). **Der sinkende Anteil hängt stark mit dem wachsenden Gewicht der Asylgesuche zusammen** (Erfassungsbruch, siehe oben). Wichtig für die Interpretation der Hypothese.
- Libanon 2013: 740'865 neue Schutzsuchende, **129 pro 1000** Einwohner. Zum Vergleich 2013: Schweiz 2,4, Deutschland 1,3.
- Nordmazedonien 1999: 355'000 neue Schutzsuchende, **176 pro 1000**.
- Syrien 2013: in den Nachbarländern (IRQ, ISR, JOR, LBN, TUR) **15,4 pro 1000**, im Rest der Welt 0,03.
- Ukraine und Venezuela: nur **44 %** in Nachbarländern (alle Jahre), die Mehrheit ging in nicht angrenzende Länder.
- Teil 1 der Hypothese über alle Fluchtbewegungen (ad hoc gerechnet 27.11.2026, **nicht** im Skript/Kontrollbericht): Pro Herkunftsland und Jahr mit ≥ 10'000 neuen Schutzsuchenden (und mindestens einem Nachbarland) neue Schutzsuchende in Nachbarländern ÷ deren Bevölkerung gegenüber übriger Welt. Nachbarländer höher in 71 % der Fälle (859 von 1218), gewichtet nach Personen **90 %** (nachgerechnet nach Korrektur «Grenzen im Wandel»). Vor Verwendung in Präsentation oder Website ins Skript übernehmen.
- Datenlücken für die Karte: 28 kleine Aufnahmeländer fehlen im Massstab 1:110 Mio. (0,24 % der neuen Schutzsuchenden, v. a. Hongkong, Malta, Singapur). Bevölkerung fehlt nur für Französisch-Guayana und Anguilla (2'127 Personen). Auf der Karte ohne Code: Nordzypern, Somaliland, Kosovo (grau).
- 51 Länder in den Daten haben keine Landgrenze (Inseln wie Japan, Australien, Kuba): Sie können nie «Nachbarland» sein. Auf der Datenseite erwähnen.
- Der Wertebereich pro 1000 Einwohner ist riesig. Deshalb eine Log-Skala, Grenzen aus den Daten bestimmen.

### Kontext und Referenzen
- UNHCR Global Trends 2024: 67 % der Geflüchteten leben in einem Nachbarland (Bestand). UNHCR Figures at a Glance, Mitte 2025: 66 %.
- Ipsos 2022 (28 Länder): Etwa ein Drittel glaubt, das eigene Land gehöre zu den drei grössten Aufnahmeländern weltweit.
- Gapminder Refugee Misconception Study 2023: Im Schnitt wurden nur 2,1 von 9 Faktenfragen richtig beantwortet.
- Dass «die meisten glauben, Europa trage die Last», ist nicht belegt. Als Frage formulieren, nicht als Behauptung.
- Inspiration (als Referenz angeben): The Refugee Project (Hyperakt / Ekene Ijeoma) · Lucify «The flow towards Europe» (Beispiel dafür, warum wir bewusst keine Animation nutzen) · VizHub «Choropleth with histogram brushing» (Curran Kelleher) · Observable «D3 State Choropleth» · John Guerra «D3 Brushing & Linking» (aus den Vorlesungsfolien) · D3 Graph Gallery.
- Beispielarbeit von Luana Rossi (Fokus Herkunftsländer, in PowerPoint/Excel gebaut): nur Inspiration. Wir grenzen uns über die Aufnahmeländer und die Nachbarland-Frage ab.

## Visualisierungskonzept (Skizze + Proposal-Feedback)

Zwei Ansichten auf **einer** Seite mit einem gemeinsamen Zustand: **Zeitraum** und **Herkunftsland** (keins oder eins). Ändert sich der Zustand, zeichnen sich beide Ansichten neu.

**Ansicht 1 – Weltkarte (Overview)**
- Choropleth, Natural Earth 2, ein Farbton von hell nach dunkel (ColorBrewer Blues). **Umgesetzt (Schritt 3):** feste logarithmische Klassen in Zehnerschritten (< 0.01 · 0.01–0.1 · 0.1–1 · 1–10 · 10–100 · ≥ 100, `d3.scaleThreshold`), damit eine Farbe bei jedem Zeitraum dasselbe bedeutet. Wert 0 = sehr helles Grau, keine Daten = mittleres Grau. Antarktis weggelassen. Küstenlinien fein grau, Ländergrenzen weiss.
- **Startzustand (nichts ausgewählt, Feedback 1):** pro Aufnahmeland die neuen Schutzsuchenden **aus Nachbarländern** pro 1000 Einwohner, summiert über den gewählten Zeitraum.
- **Herkunftsland gewählt:** neue Schutzsuchende aus diesem Land pro 1000 Einwohner. Herkunftsland eigene Markierung (z. B. Schraffur), Nachbarländer dick umrandet.
- Klick auf ein Land: als Herkunftsland wählen bzw. abwählen. Zusätzlich Auswahl per Dropdown.
- Ländernamen auf **Deutsch** (Browser-Funktion `Intl.DisplayNames` mit ISO-2-Code, keine zusätzlichen Daten nötig).
- Tooltip (Details on Demand): Ländername, neue Schutzsuchende absolut und pro 1000 Einwohner, Nachbar ja/nein, wichtigste Herkunftsländer, eventuell ein Satz Kontext zur Krise.

**Ansicht 2 – Zeitachse (Zoom & Filter)**
- Linie: Anteil der neuen Schutzsuchenden in Nachbarländern pro Jahr, y-Achse 0–100 %. Ist ein Herkunftsland gewählt, zeigt die Linie nur dieses Land.
- **Umgesetzt (Schritt 4):** Absolute Zahl neuer Schutzsuchender nicht als Balken hinter der Linie (das bräuchte eine zweite y-Achse), sondern als **eigenes Panel darunter mit gemeinsamer x-Achse**: gestapelte Balken «in Nachbarländern» (Blau) und «in anderen Ländern» (Grau). Begründung: keine doppelte y-Achse (zwei Skalen in einer Grafik sind schwer vergleichbar).
- Hover mit Fadenkreuz und Tooltip (Jahr, Anteil, Anzahl). Brush rastet auf ganze Jahre ein, die Karte folgt schon während dem Ziehen; Klick ausserhalb der Auswahl = ganzer Zeitraum.
- Dünne senkrechte Hinweislinie bei 2000: «ab 2000: Asylgesuche weltweit erfasst» (Erfassungsbruch, Tufte: Wort und Daten integrieren).
- `d3.brushX` zur Wahl eines Zeitraums → gilt für die Karte.

**Brushing & Linking**
- Brush auf der Zeitachse → Karte zeigt nur diesen Zeitraum.
- Klick auf ein Land in der Karte (oder Dropdown) → Zeitachse filtert auf dieses Herkunftsland.
- Button «Zurücksetzen» stellt den Startzustand wieder her.
- **Umgesetzt (Schritt 5):** Klick auf ein Land oder Dropdown (212 Herkunftsländer, alphabetisch deutsch) wählt das Herkunftsland; erneuter Klick hebt die Auswahl auf. Herkunftsland schwarz-weiss schraffiert (Textur statt weiterer Farbe), Nachbarländer mit dicker dunkler Umrandung, beides in der Legende nur bei aktiver Auswahl. Tooltip zeigt «Nachbarland von … ja/nein». Titel von Karte und Zeitachse nennen das gewählte Land. «Zurücksetzen» setzt Zeitraum, Herkunftsland und Brush zurück.

**Weitere Elemente**
- Farblegende mit Log-Abstufungen und Symbol für die Nachbar-Umrandung
- Quellenangabe direkt unter der Visualisierung (Tufte)
- **Kontext-Tabelle (umgesetzt):** die 10 Herkunftsländer mit den meisten neuen Schutzsuchenden in einem Jahr (AFG, IRQ, RWA, SRB/Kosovo, SYR, SSD, VEN, MMR, UKR, SDN). Fest in `js/crises.js` stehen nur Land, Zeitraum und Kontext; neue Schutzsuchende und Nachbar-Anteil rechnet der Browser aus den Daten. Button «anzeigen» setzt Herkunftsland und Zeitraum (inkl. Brush).
- Bewusst **keine Animation**
- Top-10-Liste entfällt (Feedback 2)

**Hypothesen-Check (umgesetzt 27.11.2026, `js/hypothesis.js`, Rechnung `computeHypothesis` in `data.js`)**
- Kasten über der Karte. Ohne Herkunftsland nur ein Hinweis; mit Herkunftsland wird für Land und Zeitraum geprüft.
- Teil 1 «pro Einwohner am meisten»: Neue Schutzsuchende in allen Nachbarländern ÷ deren Bevölkerung × 1000 gegenüber übriger Welt. Höher = erfüllt.
- Teil 2 «Anteil nimmt ab»: Zeitraum in zwei Hälften; erfüllt, wenn der Nachbar-Anteil in der zweiten Hälfte mindestens 5 Prozentpunkte tiefer ist (`MIN_DROP`).
- «nicht prüfbar»: Land ohne Landgrenze, keine neuen Schutzsuchenden, Zeitraum nur 1 Jahr.
- Der statische Ergebnis-Kasten im Abschnitt Hintergrund wurde wieder entfernt.
- Hinweis auf Datenbrüche (umgesetzt 27.11.2026): enthält der Zeitraum einen Bruch (1990, 2000, 2011, 2018, 2021; ein Zeitraum enthält ihn, wenn er Jahre davor und ab dem Bruchjahr umfasst) oder ist er mehrjährig vor 1999, zeigt der Kasten eine Zeile «Datenbrüche im Zeitraum: …» mit Link auf «Einschränkungen». Liste `DATA_BREAKS` in `hypothesis.js`. Der Hinweis ist allgemein und prüft nicht, ob der Bruch das gewählte Land betrifft.
- Status-Pillen **ohne Rot/Grün** (Farbsehschwäche): «✓ erfüllt» dunkel gefüllt, «✗ nicht erfüllt» weiss mit dunklem Rand, «– nicht prüfbar» gestrichelt grau. Unterscheidung über Füllung, Symbol und Wort; Blau bleibt für «Nachbarländer» reserviert.
- Datenseite, Einschränkungen (`#einschraenkungen`): Tabelle aller Datenbrüche (Jahr, Änderung, Wirkung).
- Leseanleitung über der Visualisierung hat einen Punkt «Hypothese prüfen».
- Beispiele (geprüft 27.11.2026): Syrien 2011–2025 beide Teile erfüllt (Teil 2: 81 % → 22 %); Venezuela 2011–2025 Teil 1 erfüllt, Teil 2 nicht (46 % → 44 %); Japan nicht prüfbar (keine Landgrenze); Syrien 1962–2025 Teil 2 nicht erfüllt (vor 1994 kaum erfasst).

**Zurückgestellt (Feedback 3, allenfalls später prüfen)**
- Idee: Streudiagramm, ein Punkt pro Herkunftsland. x = alle neuen Schutzsuchenden aus diesem Land (Log-Skala), y = Anteil davon in Nachbarländern. Auswahl per Klick oder 2D-Brush, verknüpft mit Karte und Zeitachse; nur Herkunftsländer ab einer Mindestzahl neuer Schutzsuchender.
- Wird erst umgesetzt, wenn wir das gemeinsam entscheiden.

## Technik

- Statische Website mit HTML, CSS und JavaScript plus **D3.js v7**. Kein Framework und kein Build-Schritt, weil wir den Code erklären können müssen.
- **Nur eine HTML-Seite** (`public/index.html`), nicht auf mehrere Seiten verteilen. Alle Pflichtinhalte sind Abschnitte dieser Seite; die Navigation oben springt per Anker (`#daten` usw.) zu den Abschnitten.
- **Reihenfolge der Abschnitte:** Start · Visualisierung · Hintergrund (inkl. Skizze) · Daten · Designentscheidungen · Referenzen · Kontakt. Visualisierung bewusst an zweiter Stelle (Besucher wollen zuerst das Ergebnis sehen, UX).
- **D3 lokal** in `public/lib/` (nicht über CDN), damit das abgegebene ZIP auch offline läuft.
- **Website-Ordner ist `public/`.** Alle Abschnitte haben Texte (Entwürfe vom 20.11.2026, von Dario und Martina zu prüfen); keine Platzhalter mehr. Designtext: 2862 Zeichen Fliesstext (ohne Überschriften). Bibliotheken über npm geladen (jsDelivr ist aus der Arbeitsumgebung gesperrt).
- **Deployment aktuell:** GitHub Actions (`.github/workflows/pages.yml`) deployt `public/` bei jedem Push auf `main` auf GitHub Pages. Workflow nicht ohne Rückfrage ändern.
- **Abgabe laut Aufgabe:** GitLab Pages auf gitlab.switch.ch. Die Dozierenden legen die Repos an, Muster: `https://gitlab.switch.ch/hslu/edu/bachelor-computer-science/davi/<semester>/g<nr>`. Jeder Push deployt automatisch, die URL steht im Jobs-Log. Eine vorhandene `.gitlab-ci.yml` nicht ohne Rückfrage ändern.
- Vom Dozenten empfohlen: Phoenix Code (https://phcode.io/) mit Chrome.
- **Lokal testen bei Martina (Windows):** Python ist nicht installiert (`python3` öffnet nur den Microsoft Store). Darum die **Live Preview von Phoenix Code** nutzen (Ordner `public` öffnen, `index.html`, Blitz-Symbol); sie startet den Webserver selbst. Nach `git pull` die Vorschau mit `Ctrl + F5` neu laden, sonst zeigt der Browser alte Dateien aus dem Zwischenspeicher.
- **OneDrive:** Martinas Repo liegt in einem OneDrive-Ordner. Git und OneDrive vertragen sich nicht immer; bei Problemen das Repo in einen normalen Ordner ausserhalb von OneDrive verschieben.
- **Deployment fehlgeschlagen?** Unter GitHub → Actions prüfen. Am 27.11.2026 schlug ein Deployment wegen eines vorübergehenden GitHub-Fehlers fehl («No artifacts named github-pages were found»), obwohl der Code korrekt war. Lösung: Lauf öffnen → «Re-run all jobs». Claude hat keine Berechtigung, Läufe neu zu starten (403).
- **Online-Adresse (GitHub Pages):** https://dariomeyer-code.github.io/hslu_davi/ (aus der Arbeitsumgebung nicht erreichbar, nur von euren Geräten).
- **Layout Fliesstext (27.11.2026):** Blocksatz über die volle Inhaltsbreite (bündig mit der Navigation), automatische Silbentrennung. Kurze Zeilen in Kästen und Tabellen bleiben linksbündig. Hinweis: Zeilen sind auf grossen Bildschirmen lang (ca. 130 Zeichen); falls störend, Seite schmaler machen.
- **`flows.csv` hat Windows-Zeilenenden (`\r\n`)**, weil das Python-Skript so schreibt. D3 kommt damit klar; bei Auswertungen mit `awk` o. ä. vorher `tr -d '\r'` anwenden.
- Lokal mit einem kleinen Webserver testen (z. B. `python3 -m http.server` im Ordner `public/`), weil `d3.csv` und `d3.json` über `file://` nicht funktionieren.
- Datenaufbereitung als Skript (Python) unter `scripts/`. Es liest die Rohdaten aus `Projekt/Data/` und schreibt kleine CSV- oder JSON-Dateien nach `public/data/`.

**Struktur (entschieden 20.11.2026):**

```
public/
  index.html              einzige Seite mit allen Abschnitten
  css/style.css           Layout, Farben, Schrift
  js/
    main.js               Daten laden, gemeinsamer Zustand, Dropdown, Zurücksetzen
    data.js               Rechenfunktionen (filtern, summieren, pro 1000 EW, Nachbar-Anteil)
    map.js                Weltkarte: Projektion, Farbskala, Legende, Tooltip, Klick
    format.js             Zahlenformat (Schweiz) und deutsche Ländernamen
    timeline.js           Zeitachse: Linie, Balken, Brush, Hinweislinie 2000
    crises.js             Kontext-Tabelle zu den 10 grössten Fluchtbewegungen
    hypothesis.js         Hypothesen-Check über der Karte, Hinweis auf Datenbrüche
  lib/
    d3.v7.min.js          D3 v7.9.0
    d3-geo-projection.min.js   für Natural Earth 2 (v4.0.0)
    topojson-client.min.js     wandelt die TopoJSON-Karte in Länderformen um (v3.1.0)
  data/                   von scripts/prepare_data.py erzeugt, nicht von Hand ändern
    flows.csv             jahr, herkunft, aufnahme, anzahl, nachbar (0/1)
    population.csv        iso3, jahr, einwohner
    countries.csv         iso3, iso2, iso_num
    borders.csv           iso3_a, iso3_b (Nachbarpaare, heutige Grenzen)
    borders_history.csv   iso3_a, iso3_b, bis_jahr (frühere Nachbarn, Grenzen im Wandel)
    world-110m.json       Länderformen (TopoJSON)
  img/skizze.png          Scan der Handskizze aus dem Proposal

scripts/
  prepare_data.py         Bereinigung + Aufbereitung: Projekt/Data/ → public/data/
  requirements.txt        Python-Pakete (openpyxl, pycountry)
  kontrollbericht.txt     Ausgabe des Skripts: Entferntes, nicht Zugeordnetes, nachgerechnete Befunde
Projekt/Data/             Originaldaten, unverändert
```

**Gemeinsamer Zustand:** `state = { years: [1962, 2025], origin: null }`. Jede Interaktion ruft `setState(...)` auf, das danach `map.update(state)`, `timeline.update(state)` und `updateHypothesis(...)` aufruft.

**Rechnung Karte:** Summe der neuen Schutzsuchenden im Zeitraum (ohne Auswahl: nur aus Nachbarländern; mit Auswahl: nur aus dem gewählten Herkunftsland) ÷ durchschnittliche Bevölkerung im Zeitraum × 1000.

**Datenaufbereitung ausführen** (im Repo-Hauptordner):

```
pip install -r scripts/requirements.txt
python3 scripts/prepare_data.py
```

## Erklärungen für Verständnis und Fragen (aus den Gesprächen, 27.11.2026)

Zahlen aus `public/data/` nachgerechnet (auch nach der Korrektur «Grenzen im Wandel» geprüft: Libanon, Ukraine, Kosovo unverändert). Begriff seit 27.11.2026: **neue Schutzsuchende** (vorher «Neuankünfte»).

**Wie die Karte im Startzustand rechnet (Beispiel Libanon 2013):** Neue Schutzsuchende nur aus Nachbarländern (Syrien 737'970, Israel 0) ÷ Bevölkerung (5'743'436) × 1000 = **128,5 pro 1000**. Die 129 in den Befunden zählen *alle* neuen Schutzsuchenden (740'865, auch aus Irak, Sudan usw.). Bei mehreren Jahren: Anzahl summiert, geteilt durch die *durchschnittliche* Bevölkerung im Zeitraum.

**Wer gezählt wird:** Nur Menschen, die in einem anderen Land Schutz bekommen oder beantragt haben und dort erfasst wurden (anerkannte Flüchtlinge, vorübergehender Schutz wie Status S, Asylgesuche, andere Schutzbedürftige). Nicht gezählt: Migration aus anderen Gründen (Arbeit, Studium, Familie), nicht registrierte Personen, Binnenvertriebene. Die Daten sagen nicht, ob jemand bleibt, weiterzieht oder zurückkehrt; Doppelzählungen bei Weiterreise sind möglich.

**Zwei Arten von Normalisierung:** (1) Bezug auf die Bevölkerung (pro 1000 Einwohner), damit grosse und kleine Länder vergleichbar sind (Folien 04: «Never show absolute values in choropleth maps»). (2) Logarithmische Abbildung auf die Farbe (Folien 01), weil die Werte über fünf Zehnerpotenzen reichen.

**Warum der Fokus auf Nachbarländern:** Die Forschungsfrage vergleicht Nachbarländer mit entfernten Ländern; der Startzustand der Karte zeigt auf Wunsch des Dozenten nur Nachbarländer, alle anderen Ansichten (Karte mit Herkunftsland, Zeitachse grau/blau, Kontext-Tabelle) zeigen auch die übrigen Länder. Bezug Vorlesung: Toblers erstes Gesetz der Geografie. Schwäche: Im Startzustand sieht man nicht, wie viele ein Land *insgesamt* aufgenommen hat (Idee: im Tooltip zusätzlich die Gesamtzahl zeigen, noch nicht umgesetzt).

**Beispiel Ukraine** (Nachbarn laut Grenzdaten: RUS, BLR, POL, SVK, HUN, ROU, MDA):
- Vor 2014 nur wenige Tausend neue Schutzsuchende pro Jahr, fast alle Asylgesuche in entfernten Ländern (Anteil Nachbarländer ~5 %).
- 2014: 289'071, davon 95 % in Nachbarländern (fast alle Russland: 271'237; Krim, Donbas).
- 2022: 5'782'252, davon 46 % in Nachbarländern. Grösste Aufnahmeländer: Russland 1'310'748, Deutschland 1'001'180, Polen 958'302, Tschechien 433'274.
- 2022–2025 zusammen: 8'578'760, davon 3'552'914 in Nachbarländern = **41 %**.
- Pro 1000 Einwohner 2022–2025: Moldau 85,9 (Nachbar) · Tschechien 64,5 (**kein** Nachbar, Slowakei dazwischen) · Polen 41,5 · Deutschland 18,5 (absolut am meisten: 1'546'156) · Schweiz 10,7 · Russland 9,2.
- **Russland als Aufnahmeland trotz Krieg** (Hintergrund, nicht aus unseren Daten): Geografie und besetzte Gebiete im Osten (Weg nach Westen oft versperrt), Sprache und Familie, laut UNO/OSZE/Menschenrechtsorganisationen teils Zwangsumsiedlungen. Die Zahlen meldet die russische Regierung selbst, kaum unabhängig überprüfbar. Ohne Russland wäre der Nachbar-Anteil der Ukraine deutlich tiefer. Idee (noch nicht umgesetzt): Satz zur unterschiedlichen Verlässlichkeit nationaler Meldungen in den Einschränkungen.

**Beispiel Sudan 2023–2025** (Demo 2; Nachbarn laut Grenzdaten: CAF, EGY, ERI, ETH, LBY, SSD, TCD; Zeitraum nach der Teilung 2011, darum keine Grenzänderungen):
- 2'901'724 neue Schutzsuchende, davon **94 %** in Nachbarländern (2023: 96 %, 2024: 93 %, 2025: 94 %).
- Pro 1000 Einwohner: Libyen **86** · Tschad **45** · Südsudan **23** · Zentralafrikanische Republik 7,4 · Ägypten 7,1 (die fünf höchsten Werte alle Nachbarländer). Absolut am meisten: Tschad 913'835, Ägypten 821'641, Libyen 635'166.
- Schweiz: 506 Personen = 0,06 pro 1000.
- Hypothesen-Check 2023–2025: Teil 1 erfüllt, Teil 2 nicht (Anteil bleibt hoch).
- Hintergrund (nicht aus unseren Daten): seit April 2023 Krieg zwischen der sudanesischen Armee und der paramilitärischen RSF (Rapid Support Forces); Millionen auf der Flucht, die meisten im eigenen Land (Binnenvertriebene, in unseren Daten nicht enthalten).
- Achtung: Vor 2011 gehörte der Südsudan zum Sudan (Korrektur «Grenzen im Wandel»), in der Demo darum nur 2023–2025 zeigen.

**Beispiel Kosovo 1998–1999** (geprüft, als Demo verworfen 27.11.2026: zu komplex wegen Grenz- und Namensänderungen; bei UNHCR unter Serbien; Nachbarn laut Grenzdaten: ALB, BGR, BIH, HRV, HUN, MKD, MNE, ROU – Albanien zählt, weil die Grenze über Kosovo verläuft):
- 1'121'776 neue Schutzsuchende, davon **80 %** in Nachbarländern.
- Pro 1000 Einwohner: Nordmazedonien **176**, Albanien **147** (Nachbarländer) · Bosnien und Herzegowina 17,6 · Liechtenstein 15,6 · Luxemburg 9,5 · **Schweiz 6,9** (49'309 Personen, Rang 6 von 36).
- Aussage: Die Schweiz nahm im europäischen Vergleich viele auf, die Nachbarländer pro Einwohner aber 20- bis 25-mal mehr.
- Auf der Karte: Kosovo selbst grau (kein eigener Datensatz), schraffiert wird Serbien.

**Weitere Fälle mit Schweiz-Bezug (geprüft, nicht für die Präsentation gewählt):** Eritrea 2000–2025: Schweiz 7,7 pro 1000 (61'914, Rang 3 von 116), fast gleichauf mit dem Nachbarland Sudan (8,4); nur 48 % in Nachbarländern. Sri Lanka 1983–2010: Schweiz pro Kopf auf Rang 1 (6,6 pro 1000, 46'709), aber Insel ohne Nachbarländer (0 %).

**Beispiel Syrien** (Anteil in Nachbarländern pro Jahr): 2011 26 % · 2012–2014 90–93 % · 2015–2018 52–82 % · 2019 23 % · 2020–2023 5–7 % · 2024 39 % · 2025 57 %.

**Antwort auf die Forschungsfrage (einfach):** Ja, Nachbarländer nehmen pro Einwohner viel mehr auf (60 % aller neuen Schutzsuchenden; Syrien 2013: 15,4 pro 1000 in Nachbarländern gegenüber 0,03 im Rest der Welt; Libanon 2013: 129 gegenüber Schweiz 2,4). Der scheinbare Rückgang des Anteils (85 % in den 1970ern → 46 % in den 2020ern) ist zu einem guten Teil ein Effekt der Erfassung (Asylgesuche ab 2000 weltweit; ohne Asylgesuche bis in die 2010er 89–96 %). Erst in den 2020er-Jahren fliehen deutlich mehr Menschen weiter weg (Ukraine, Venezuela). → Hypothese nur zur Hälfte bestätigt.

## Präsentation 11. Dezember 2026 (Plan, Stand 27.11.2026)

**Anforderungen:** genau 5 Minuten (nicht mehr), beide gleich viel Redezeit, Folien am 11.12. in ILIAS hochladen, danach 5 Minuten Feedback an andere Gruppen.

**Grundidee:** eine Geschichte statt einer Feature-Liste. Wenige Folien, zwei Live-Demos. **Schwerpunkte:** (1) Begriffe klar erklären, vor allem was «neue Schutzsuchende» in unserem Projekt bedeuten; (2) Herkunft der Daten und ihre Einschränkungen nennen **und auf der Website zeigen**. Publikum sind IT-Studierende aus dem Modul: Normalisierung und Visualisierungsbegriffe sind bekannt, darum **keine Alltagsvergleiche** (Saal, Seiteneingänge gestrichen 27.11.2026), sondern nüchtern mit Bezug zur Vorlesung. Einziges Beispiel bei den Begriffen: Polen/Tschechien (Definition Nachbarland, kommt in der Ukraine-Demo wieder).

**Ablauf (festgelegt 27.11.2026):** 1 Forschungsfrage → 2 Begriffe → 3 Daten (Herkunft, was gezählt wird, Einschränkungen) → 4 Demo 1 Ukraine 2022–2025 → 5 Demo 2 Sudan 2023–2025 → 6 Antwort, Designentscheidungen, Schluss. Kosovo als Demo verworfen (zu komplex wegen Grenz- und Namensänderungen). Die beiden Demos bilden einen Kontrast: **41 % gegenüber 94 %** in Nachbarländern.

| Zeit | Wer | Teil | Inhalt | Medium |
|---|---|---|---|---|
| 0:00–0:30 | Martina | **1. Forschungsfrage** | Begrüssung, Titel, Forschungsfrage und Hypothese direkt vorstellen (keine Einstiegsfrage ans Publikum, Entscheid 27.11.2026: zu zufällig, niemand kennt die Antwort). | Folie 1 |
| 0:30–1:20 | Martina | **2. Begriffe** | siehe Folie 2, Schwerpunkt «neue Schutzsuchende» | Folie 2 |
| 1:20–2:30 | Martina | **3. Daten** | Folie 3 «Woher die Daten stammen» (Quellen, Aufbereitung), dann Folie 4 «Was die Daten nicht zeigen» (sechs Einschränkungen inkl. Grenzen im Wandel). Auf der Website zeigen: Navigation → «Daten» → Tabelle der Datenbrüche und Tabelle «Grenzen im Wandel»; Hinweislinie 2000 in der Zeitachse. | Folien 3–4 + Website |
| 2:30–3:20 | Dario | **4. Demo 1: Ukraine 2022–2025** | Folie 5 «Live-Demo» kurz zeigen, Link anklicken oder mit Ctrl+Tab zur Website. *Sprechnotiz Kontext:* «Seit Februar 2022 führt Russland einen Angriffskrieg gegen die Ukraine; die EU und die Schweiz gewähren vorübergehenden Schutz (in der Schweiz Status S).» Dann Kontext-Tabelle → Ukraine «anzeigen». Tooltip Deutschland (absolut am meisten, aber nur 18,5 pro 1000) → Moldau (86) → Tschechien (65, aber **kein** Nachbarland). Zeitachse: 41 % in Nachbarländern. Hypothesen-Check-Kasten kurz zeigen. | Website |
| 3:20–4:05 | Dario | **5. Demo 2: Sudan 2023–2025** | *Sprechnotiz Kontext:* «Seit April 2023 herrscht im Sudan Krieg zwischen der Armee und der paramilitärischen RSF. Millionen sind auf der Flucht, die meisten im eigenen Land; die zählen wir nicht.» Dann Kontext-Tabelle → Sudan «anzeigen». Tooltip Libyen (86 pro 1000) → Tschad (45, absolut am meisten: über 900'000) → Schweiz (0,06) als Vergleich. Zeitachse: 94 % in Nachbarländern. Hypothesen-Check: Teil 1 erfüllt, Teil 2 nicht (Anteil bleibt hoch). Gegensatz zur Ukraine benennen: 41 % gegenüber 94 %. «Zurücksetzen». | Website |
| 4:05–5:00 | Dario | **6. Antwort, Design, Schluss** | Antwort auf die Forschungsfrage (siehe «Erklärungen»), Erfassungsbruch 2000 als Teil der Antwort (Rückgang des Anteils zu einem guten Teil Messeffekt). Design in einem Satz (pro 1000 und Log-Stufen, keine zweite y-Achse, keine Animation wegen Change Blindness). Dank. | Folie 6 |

Redezeit: Martina 2:30, Dario 2:30. Designentscheidungen nur kurz; ausführlich stehen sie auf der Website und werden bei Fragen erklärt.

**Folie 2 – Begriffe (je ein Satz):**
- *Neue Schutzsuchende* (wichtigster Begriff): Menschen, die in einem Jahr in einem Land **neu** als schutzsuchend **erfasst** werden. Nicht gemeint: wie viele dort insgesamt leben (Bestand), ob sie bleiben, weiterziehen oder zurückkehren, Migration aus anderen Gründen. Merksatz: «Wir zählen, wo Menschen zum ersten Mal Schutz suchen, nicht wo sie am Ende bleiben.»
- *Wer zählt:* anerkannte Flüchtlinge, vorübergehender Schutz (wie Status S), Asylgesuche, andere Schutzbedürftige. Nicht: Arbeit, Studium, Familie, Binnenvertriebene.
- *Nachbarland:* Land mit gemeinsamer Landgrenze zum Herkunftsland. Beispiel: Polen grenzt an die Ukraine (Nachbarland), Tschechien nicht (Slowakei dazwischen).
- *Pro 1000 Einwohner:* Normalisierung auf die Bevölkerung des Aufnahmelands (neue Schutzsuchende ÷ Bevölkerung × 1000). Sonst wirken grosse Länder auf der Choroplethenkarte automatisch dunkler; laut Vorlesung keine absoluten Werte auf Choroplethenkarten. Zahlenbeispiele folgen in der Demo.
- *Anteil in Nachbarländern:* wie viel Prozent der Schutzsuchenden aus einem Land in einem Nachbarland erfasst wurden.

**Folie 3 – Daten: woher, was, Einschränkungen:**
- *Herkunft:* UNHCR (Schutzsuchende pro Jahr, Herkunfts- und Aufnahmeland, 1962–2025), Weltbank (Bevölkerung), GeoDataSource (gemeinsame Grenzen). Aufbereitet mit einem eigenen Python-Skript.
- **Erfassungsbrüche:** UNHCR hat die Erfassung mehrmals geändert, am stärksten 2000: Ab dann werden Asylgesuche weltweit erfasst statt nur in bis zu 37 Industrieländern. Das verschiebt den Nachbar-Anteil allein durch die Messung. → Website: Hinweislinie 2000, Tabelle der Datenbrüche, Hinweis im Hypothesen-Check.
- **Nur Erfasste:** Gezählt wird nur, wer registriert wurde. Weiterreise, Rückkehr und mögliche Doppelzählungen (z. B. erst Polen, dann Deutschland) sind nicht sichtbar.
- **Zahlen von Regierungen:** Die Länder melden selbst, die Verlässlichkeit ist unterschiedlich (Beispiel Russland).
- **Strenge Definition «Nachbarland»:** nur gemeinsame Landgrenze; 51 Inselstaaten (z. B. Japan, Australien) können nie Nachbarland sein.
- **Grenzen im Wandel:** Grenzen und Bevölkerung gelten für heutige Länder, UNHCR erfasst seit 1962 auch Staaten, die sich geteilt haben. Sudan/Südsudan (bis 2010) und Serbien/Kosovo/Montenegro (Bevölkerung) korrigiert, übrige Fälle (z. B. Deutschland vor 1990, Jugoslawien) dokumentiert. → Website: Daten → «Grenzen im Wandel».
- **Kleinere Lücken:** 2,1 % ohne bestimmbares Land entfernt (unbekannte Herkunft, Staatenlose, Tibet); Kosovo bei Serbien; sehr kleine Länder fehlen auf der Karte (0,24 %), sind in den Berechnungen aber enthalten.

**Folien (erstellt 27.11.2026, 6 Stück):** Foliensatz als Claude-Artifact «Nachbarländer als Hauptaufnahmeländer – Präsentation»: https://claude.ai/artifact/6zxReDj72q26KgffHJxSP5 (privat, für Dario über das Share-Menü freigeben; Download als PowerPoint oder PDF für ILIAS über Share › Export). Sprechnotizen pro Folie ausführlich zur Vorbereitung: Sprechtext mit Zeit, Hintergrundwissen, mögliche Fragen mit Antworten (je max. 4000 Zeichen). Darios Demo-Notizen stehen bei Folie 5 «Live-Demo».
1. **Titel** (dunkel): Titel, Untertitel, Forschungsfrage, Hypothese, Namen
2. **Begriffe – «Was wir messen»:** grosser Kasten «Neue Schutzsuchende» mit Merksatz; daneben Wer zählt · Nachbarland (Polen ja, Tschechien nein) · Pro 1000 Einwohner · Anteil in Nachbarländern
3. **Daten – «Woher die Daten stammen»:** UNHCR, Weltbank, GeoDataSource mit Inhalt; Kasten Aufbereitung (Python-Skript, 103'502 Zeilen, 113,6 Mio., 211 Herkunftsländer)
4. **Daten – «Was die Daten nicht zeigen»** (auf Wunsch eigene Folie, nicht gekürzt): sechs Kästen: Erfassungsbrüche · Nur Registrierte · Zahlen von Regierungen · Strenge Definition · Grenzen im Wandel · Kleinere Lücken
5. **Live-Demo:** Link zur Website (klickbar) und die zwei Beispiele Ukraine 2022–2025 und Sudan 2023–2025 mit je einer Zeile Kontext; zeigt, wann die Demo kommt
6. **Antwort** (dunkel): drei Zahlen: **60 %** · **41 % · 94 %** (Ukraine gegenüber Sudan) · **85 % → 46 %** (ohne Asylgesuche bis in die 2010er 89–96 %); Fazit «Hypothese stimmt zur Hälfte»
- Farben wie die Website (ColorBrewer Blues, Navy #0B2545), Schrift Verdana (Wunsch 27.11.2026; Systemschrift, kein Download nötig).
- Folien und Website in zwei Browser-Tabs, Wechsel mit `Ctrl + Tab` üben.
- Keine Adressen in den Fussnoten (Wunsch 27.11.2026). Der Website-Link steht nur auf Folie 5 «Live-Demo» (GitHub Pages); vor der Präsentation prüfen, ob die GitLab-Switch-Adresse gezeigt werden soll.

**Absicherung:** Backup-Screenshots der Demo-Klickfolge als Ersatzfolien. Website lokal und online offen, Browser im Vollbild, Zoom so, dass Karte und Zeitachse zusammen sichtbar sind. Feste Klickfolge: Navigation «Daten» → Tabelle der Datenbrüche → zurück zur Visualisierung, Hinweislinie 2000 → Ukraine «anzeigen» → Deutschland → Moldau → Tschechien → Zeitachse und Hypothesen-Check → Sudan «anzeigen» → Libyen → Tschad → Schweiz → Zeitachse und Hypothesen-Check → Zurücksetzen.

**Mögliche Fragen vorbereiten:** Warum pro 1000 und Log-Skala? Warum feste Farbklassen? Warum keine zweite y-Achse? Warum gemeinsame Landgrenze (Tschechien)? Was ist der Erfassungsbruch? Wie wurde das Feedback umgesetzt, auch Punkt 3? Warum nimmt Russland Menschen aus der Ukraine auf, wie verlässlich sind die Zahlen? Warum beim Sudan nur ab 2023 bzw. nach 2011 (vorher gehörte der Südsudan zum Sudan)? Warum sind Binnenvertriebene nicht enthalten? Wie geht ihr mit geteilten Staaten um (Sudan/Südsudan korrigiert, Serbien/Kosovo Bevölkerung zusammengezählt, Rest dokumentiert unter «Grenzen im Wandel»)? Wie funktioniert der Hypothesen-Check (5-Prozentpunkte-Regel)? Warum «neue Schutzsuchende» statt «Neuankünfte»?

**Feedback an andere Gruppen (Schema):** eine Stärke · eine Verbesserung entlang der Kriterien (Information Seeking Mantra, Brushing & Linking, Legenden, normalisierte Werte auf Karten, Data-Ink) · eine Frage zu einer Designentscheidung.

**Zeitplan:** bis Mi 2.12. Texte gegenlesen, Folien erstellen · Do 3.12. Zoom-Support: Website und Ablauf dem Dozenten zeigen · bis Di 8.12. Feedback einarbeiten, Backup-Screenshots · Mi 9./Do 10.12. zweimal komplett mit Stoppuhr proben (Ziel 4:45) · Fr 11.12. Präsentation, Folien in ILIAS.

## Offene Punkte

- [ ] Gruppennummer, GitLab-Repo-URL und URL der Website (Switch)
- [ ] Klären: bleibt GitHub Pages nur zum Testen, Abgabe über GitLab Switch?
- [x] Jährliche Weltbank-Bevölkerungsdaten heruntergeladen
- [x] Entschieden (20.11.2026): Visualisierung an 2. Stelle · Namen deutsch · kein Kategorie-Filter, Hinweislinie 2000 · Kosovo zu Serbien, grau mit Hinweis · D3 lokal · UKN/STA/TIB entfernen
- [ ] Noch bestätigen: Nachbarland = gemeinsame Grenze (bisher ja), Start 1962 (bisher ja), wie viel Kontext pro Krise
- [ ] Klären, ob die Nutzung von KI-Tools im Projekt deklariert werden muss. **Vorläufig:** ein Satz zur KI-Nutzung steht in den Referenzen (unter «Verwendeter Code»); bei Bedarf anpassen oder entfernen.
- [ ] Texte auf der Website gegenlesen und in eigene Worte bringen, besonders den Designtext (muss mündlich verteidigt werden). Designtext nach Änderungen neu zählen (2500–3500 Zeichen).
- [ ] Designtext ergänzen (Zeichenlimit 2500–3500 beachten): Hypothesen-Check unter «Interaction Concept» bzw. «Tasks», Status ohne Rot/Grün unter «Human Perception»
- [ ] Schwelle 5 Prozentpunkte (`MIN_DROP`) für Teil 2 gemeinsam bestätigen
- [ ] Allenfalls: Hinweis auf Datenbrüche nur bei Brüchen zeigen, die das gewählte Land betreffen (heute allgemein)
- [ ] Pages-Deploy: «No artifacts named github-pages» am 27.11.2026 → «Re-run all jobs». Falls wiederholt: Log von `upload-pages-artifact` prüfen; mögliche Ursache Node 20 bei `upload-pages-artifact@v3` (Wechsel auf `@v4`, nur nach Rücksprache)
- [ ] Beim Committen neue Dateien mit `git add` aufnehmen (`git commit -a` nimmt sie nicht mit; so fehlte am 27.11. `hypothesis.js` und die Seite blieb bei «Daten werden geladen …» stehen)
- [ ] Referenzen Ipsos 2022 und Gapminder 2023: direkte Links zu den Studien einsetzen und Zahlen prüfen (aktuell nur Startseiten verlinkt, aus der Arbeitsumgebung nicht prüfbar)
- [ ] Kontakt: E-Mail-Adressen ergänzen, falls gewünscht
- [x] Präsentation: Folien erstellt (6 Stück, Link im Abschnitt «Präsentation»), ausführliche Sprechnotizen pro Folie
- [ ] Präsentation: Sprechnotizen in eigene Worte bringen, Kontext-Angaben zu Ukraine und Sudan prüfen (allgemeines Wissen, nicht aus unseren Daten), Foliensatz für Dario freigeben
- [ ] Zoom-Support am Do 3.12. nutzen (Feedback des Dozenten zu Website und Präsentation)
- [ ] Ideen, noch nicht entschieden: Gesamtzahl der neuen Schutzsuchenden im Tooltip des Startzustands; Satz zur Verlässlichkeit nationaler Meldungen (z. B. Russland) in den Einschränkungen; Jahre mit sehr wenigen Schutzsuchenden in der Zeitachse heller zeichnen

## Mögliche Reihenfolge (Vorschlag, nur nach Absprache abarbeiten)

Stand 27.11.2026: Schritte 1–7 erledigt (Prototyp, Kontext-Tabelle, alle Texte als Entwurf), dazu Hypothesen-Check, Dokumentation der Datenbrüche und Blocksatz. Plan für die Präsentation steht (Abschnitt «Präsentation»). Offen: Texte gegenlesen, Designtext ergänzen, Folien erstellen, proben, Feinschliff, Abgabe.

1. Skript für die Datenaufbereitung schreiben, Kontrollbericht gemeinsam prüfen, Befunde nachrechnen
2. `public/index.html` mit allen Abschnitten und Anker-Navigation anlegen
3. Weltkarte mit Legende und Tooltip (Startzustand: aus Nachbarländern)
4. Zeitachse mit Brush, verknüpft mit der Karte
5. Herkunftsland per Klick/Dropdown, Button «Zurücksetzen»
6. Bis 11. Dezember: lauffähiger Prototyp für die Präsentation
7. Texte (Hintergrund, Daten, Design, Referenzen, Kontakt); allenfalls Feedback 3 nochmals prüfen
8. Bis 17. Januar: Feinschliff, ZIP und Link in ILIAS hochladen
