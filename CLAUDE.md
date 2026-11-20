# CLAUDE.md – DAVI-Projekt «Nachbarländer als Hauptaufnahmeländer?»

Kontext für Claude Code. Stand: 20. November 2026. Zusammengefasst aus den bisherigen Chats im
claude.ai-Projekt «DAVI», ergänzt um das Proposal-Feedback und den Abgleich mit den Dateien im Repo.

## Wie wir zusammenarbeiten (wichtig)

- **Sprache:** Deutsch, Schweizer Schreibweise (ss statt ß). Einfach erklären, Fachbegriffe kurz erläutern.
- **Nichts ohne Auftrag generieren oder ändern.** Zuerst gemeinsam planen, dann umsetzen. Bei Unklarheit nachfragen statt loslegen. Keine Dateien anfassen, die nicht zum Auftrag gehören.
- **Einfach halten, kein Over-Engineering.** Ziel ist ein solides, gut begründbares Projekt, nicht ein möglichst grosses.
- **Code muss erklärbar sein.** Wir müssen Code und Designentscheidungen mündlich verteidigen können. Lieber verständlich und kommentiert als clever.
- **Nicht committen oder pushen ohne Auftrag.** Ein Push auf `main` deployt die Website automatisch (siehe Technik).
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
| `public/` | Website (wird deployt), aktuell nur Platzhalter |

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

**Titel:** Nachbarländer als Hauptaufnahmeländer? Neuankünfte von Geflüchteten 1962–2025

**Forschungsfrage:** Nehmen Nachbarländer bei grossen Fluchtbewegungen im Verhältnis zu ihrer Bevölkerung mehr Geflüchtete auf als weiter entfernte Länder, und wie hat sich das seit 1962 verändert?

**Hypothese:** Nachbarländer nehmen pro Einwohner am meisten auf. Ihr Anteil an den Neuankünften nimmt über die Jahrzehnte aber ab, es fliehen also mehr Menschen weiter weg.

**Begriffe**
- *Neuankünfte:* Menschen, die in einem Jahr neu in einem Land ankommen (Flow), nicht alle, die dort leben (Bestand). Die oft zitierten «2 von 3 Geflüchteten leben in einem Nachbarland» (UNHCR Global Trends) beziehen sich auf den Bestand. Nicht verwechseln.
- *Nachbarland:* Aufnahmeland mit gemeinsamer Landgrenze zum Herkunftsland (laut GeoDataSource). Bhutan → Nepal zählt damit nicht als Nachbar, obwohl die Länder nah beieinander liegen. Das ist bewusst so und muss auf der Website begründet werden.
- *Pro 1000 Einwohner:* Neuankünfte ÷ Bevölkerung des Aufnahmelands × 1000. Absolute Zahlen würden grosse Länder immer stärker belastet aussehen lassen.
- *Anteil in Nachbarländern* (Herkunftsland H, Zeitraum T): Neuankünfte aus H in Nachbarländern von H ÷ alle Neuankünfte aus H.

**Zielgruppe:** interessierte Laien, die Nachrichten über Flucht verfolgen. Nebenzielgruppe: Studierende, Lehrpersonen, Journalisten, eventuell Politik und Hilfswerke.

**User-Tasks:** Überblick (wo liegt die Last?) · Vergleichen (Nachbarland vs. weiter entfernt, Herkunftsländer untereinander) · Entwicklung (seit 1962) · Nachschlagen (ein Land, eine Krise).

## Feedback des Dozenten zum Proposal (16. Okt. 2026)

1. **Startzustand:** Wenn nichts ausgewählt ist, zeigen, welche Länder wie viele Personen aus Nachbarländern aufnehmen.
2. **Top-10-Liste wegnehmen.**
3. **Verhalten der Herkunftsländer miteinander vergleichbar machen.**

Umsetzung siehe Visualisierungskonzept: Karte startet mit «Neuankünfte aus Nachbarländern», Top 10 entfällt, neu ein Streudiagramm der Herkunftsländer.

## Daten

| Datensatz | Inhalt | Fundort | Lizenz |
|---|---|---|---|
| UNHCR Forced Displacement Flows | Neuankünfte pro Jahr × Herkunftsland × Aufnahmeland × Kategorie, 1962–2025. Im Repo: `Projekt/Data/UNHCR_Flow_Data.xlsx`, Blatt `DATA`, 108'879 Zeilen, Stand 11.6.2026 | UNHCR Refugee Data Finder; auch R-Paket `refugees`: https://github.com/PopulationStatistics/refugees | CC BY 4.0 |
| World Bank «Population, total» (`SP.POP.TOTL`) | Bevölkerung pro Land und Jahr | https://data.worldbank.org/indicator/SP.POP.TOTL | CC BY 4.0 |
| GeoDataSource Country Borders | Länderpaare mit gemeinsamer Grenze (ISO-2), im Repo `Projekt/Data/GEODATASOURCE-COUNTRY-BORDERS.CSV` | https://github.com/geodatasource/country-borders | CC BY-SA 4.0 |
| Weltkarte (noch zu beschaffen) | Länderpolygone als TopoJSON | z. B. `world-atlas` (Natural Earth) | Public Domain |

**Wer die Daten erhebt (für die Datenseite)**
- UNHCR: bis 1999 aus dem UNHCR-Archiv, ab 2000 aus der jährlichen offiziellen Statistik. Die Zahlen liefern meist Regierungen (Asylbehörden) oder sie stammen aus UNHCR-Registrierungen vor Ort.
- Weltbank: stellt nur zusammen und zählt nicht selbst. Quellen sind die UN Population Division, nationale Statistikämter, Eurostat und die UN Statistics Division.
- GeoDataSource: gibt nicht an, woher die Grenzdaten stammen. Das ist ein Schwachpunkt, den wir ehrlich benennen. Landgrenzen ändern sich aber kaum und lassen sich leicht prüfen.

**Einschränkungen:** Die Daten zeigen, wo Menschen ankommen, aber nicht, ob sie später weiterziehen. Fluchtursachen sind nicht enthalten.

### Stolpersteine bei der Aufbereitung
- **Bevölkerungsdatei im Repo unbrauchbar für Jahreswerte:** `P_Population.zip` enthält nur die Jahre 1960, 1970 … 2020 (danach Prognosen 2030–2050) und 176 Indikatoren. Die Jahresreihe `SP.POP.TOTL` muss neu bei der Weltbank geladen werden (Alternative: zwischen den Jahrzehnten interpolieren, dann auf der Datenseite erwähnen).
- **Kategorien (laut Blatt `Metadata` der UNHCR-Excel):** REF = Flüchtlinge · GRP = Gruppenanerkennung · TMP = vorübergehender Schutz · ROC = flüchtlingsähnliche Situation · **ASY = neue Asylgesuche** · ASR = von UNHCR registrierte Asylsuchende · OIP = andere Schutzbedürftige. Für «Neuankünfte» werden sie summiert.
- **Erfassungsbrüche:** Asylgesuche (ASY) gibt es 1970–1999 nur für **37 Industrieländer**, ab 2000 für 192 Länder. GRP/TMP ab 2000, OIP ab 2018, ASR ab 2021. Weil diese Industrieländer selten Nachbarn der Herkunftsländer sind, kann der Nachbar-Anteil allein wegen der Erfassung schwanken. Auf der Datenseite erklären. Eventuell einen Filter für Flüchtlinge vs. Asylgesuche anbieten.
- **Ländercodes:** UNHCR hat eigene Codes (ALG) und ISO3-Codes (DZA). Immer die ISO3-Spalten verwenden (`OriginISO`, `AsylumISO`). Die Namensspalten in der Excel-Datei sind Formeln und werden beim Einlesen mit einem Skript leer gelesen; Namen aus Blatt `T23` holen. GeoDataSource nutzt ISO2 (CH), also nach ISO3 umrechnen. Die TopoJSON-Weltkarte (world-atlas) nutzt numerische ISO-Codes (756 = Schweiz), dafür braucht es eine Zuordnungstabelle.
- **Sonderfälle:** Kosovo ist bei UNHCR mit Serbien zusammengeführt. Dafür eine Regel festlegen und dokumentieren. Tibet (TIB) hat keinen ISO-Code. Historische Staaten wie Jugoslawien oder die Sowjetunion prüfen.
- **Weltbank:** Die Datei enthält Aggregate (World, Regionen, Einkommensgruppen), die herausgefiltert werden müssen. Das Jahr 2025 fehlt. Regel festlegen (z. B. 2024 weiterverwenden) und auf der Datenseite erwähnen.
- **Zahlenformat:** In der Excel-Ansicht stehen Schweizer Tausendertrennzeichen (20’000). Beim Einlesen per Skript kommen echte Zahlen an.
- **Datenmenge:** Rund 100'000 Zeilen sind zu viel für den Browser. Deshalb einmal vorab zu kleinen Dateien aggregieren, etwa nach Jahr × Aufnahmeland oder Jahr × Herkunftsland × Nachbar ja/nein. D3 liest danach nur noch die aufbereiteten Dateien.
- **Neu aufbauen:** Die ersten Auswertungen liefen in einer claude.ai-Sandbox. Diese CSV-Dateien existieren nicht mehr. Die Aufbereitung muss als Skript im Repo neu gebaut werden. Laut Aufgabe wäre auch Tableau Prep erlaubt.

### Vorläufige Befunde (aus der ersten Auswertung mit einer älteren Datenversion, mit eigenem Skript nachprüfen!)
- Über alle Jahre landen ca. 58 % der Neuankünfte in Nachbarländern.
- Anteil Nachbarländer nach Jahrzehnt: 1960er ca. 63 %, 1970er ca. 80 %, 2000er ca. 50 %, 2020er (2020–2025) ca. 45 %. Achtung Erfassungsbrüche (siehe oben).
- Syrien 2013: in den Nachbarländern ca. 16 Neuankünfte pro 1000 Einwohner, im Rest der Welt ca. 0,05.
- Libanon 2013: ca. 740'000 Neuankünfte bei knapp 6 Mio. Einwohnern, also ca. 129 pro 1000. Zum Vergleich 2013: Schweiz ca. 2, Deutschland ca. 1.
- Nordmazedonien 1999: ca. 176 pro 1000.
- Ukraine und Venezuela: Mehr als die Hälfte der Neuankünfte ging in nicht angrenzende Länder.
- Der Wertebereich pro 1000 Einwohner ist riesig (unter 0,01 bis über 100). Deshalb eine Log-Skala, Grenzen aus den Daten bestimmen.

### Kontext und Referenzen
- UNHCR Global Trends 2024: 67 % der Geflüchteten leben in einem Nachbarland (Bestand). UNHCR Figures at a Glance, Mitte 2025: 66 %.
- Ipsos 2022 (28 Länder): Etwa ein Drittel glaubt, das eigene Land gehöre zu den drei grössten Aufnahmeländern weltweit.
- Gapminder Refugee Misconception Study 2023: Im Schnitt wurden nur 2,1 von 9 Faktenfragen richtig beantwortet.
- Dass «die meisten glauben, Europa trage die Last», ist nicht belegt. Als Frage formulieren, nicht als Behauptung.
- Inspiration (als Referenz angeben): The Refugee Project (Hyperakt / Ekene Ijeoma) · Lucify «The flow towards Europe» (Beispiel dafür, warum wir bewusst keine Animation nutzen) · VizHub «Choropleth with histogram brushing» (Curran Kelleher) · Observable «D3 State Choropleth» · John Guerra «D3 Brushing & Linking» (aus den Vorlesungsfolien) · D3 Graph Gallery.
- Beispielarbeit von Luana Rossi (Fokus Herkunftsländer, in PowerPoint/Excel gebaut): nur Inspiration. Wir grenzen uns über die Aufnahmeländer und die Nachbarland-Frage ab.

## Visualisierungskonzept (Skizze + Proposal-Feedback)

Drei Ansichten mit einem gemeinsamen Zustand: **Zeitraum** und **ausgewählte Herkunftsländer** (keins, eins oder mehrere). Ändert sich der Zustand, zeichnen sich alle Ansichten neu.

**Ansicht 1 – Weltkarte (Overview)**
- Choropleth, Natural Earth 2, ein Farbton von hell nach dunkel (ColorBrewer Blues), Log-Skala (`d3.scaleSequentialLog`), Länder ohne Daten grau.
- **Startzustand (nichts ausgewählt, Feedback 1):** pro Aufnahmeland die Neuankünfte **aus Nachbarländern** pro 1000 Einwohner, summiert über den gewählten Zeitraum.
- **Herkunftsland gewählt:** Neuankünfte aus diesem Land (bzw. diesen Ländern) pro 1000 Einwohner. Herkunftsland eigene Markierung (z. B. Schraffur), Nachbarländer dick umrandet.
- Klick auf ein Land: als Herkunftsland wählen bzw. abwählen.
- Tooltip (Details on Demand): Ländername, Neuankünfte absolut und pro 1000 Einwohner, Nachbar ja/nein, wichtigste Herkunftsländer, eventuell ein Satz Kontext zur Krise.

**Ansicht 2 – Vergleich der Herkunftsländer (ersetzt Top 10, Feedback 2 + 3)**
- Streudiagramm, ein Punkt pro Herkunftsland im gewählten Zeitraum.
- x: alle Neuankünfte aus diesem Land (Log-Skala) = Grösse der Fluchtbewegung.
- y: Anteil davon in Nachbarländern (0–100 %).
- Begründung: beantwortet direkt «bei grossen Fluchtbewegungen» (x) und «Nachbarländer» (y). Position ist die genaueste visuelle Variable. Ein 2D-Brush (`d3.brush`) wählt ganze Gruppen aus.
- Nur Herkunftsländer ab einer Mindestzahl Neuankünfte zeigen (sonst zufällige 0 %/100 %). Schwelle aus den Daten bestimmen und dokumentieren.
- Klick oder Rechteck-Brush wählt Herkunftsländer aus → Karte und Zeitachse filtern.
- Optional: Farbe nach UNHCR-Region (wenige kategoriale Farben). Nur falls Zeit bleibt.

**Ansicht 3 – Zeitachse (Zoom & Filter)**
- Linie: Anteil der Neuankünfte in Nachbarländern pro Jahr, y-Achse 0–100 %.
- Mehrere Herkunftsländer gewählt: je eine Linie (max. ca. 5) mit Legende → Entwicklung vergleichbar.
- Optional im Hintergrund schwache Balken mit den absoluten Neuankünften, damit die Krisen-Peaks sichtbar sind.
- `d3.brushX` zur Wahl eines Zeitraums → gilt für Karte und Streudiagramm.

**Brushing & Linking**
- Brush auf der Zeitachse → Karte und Streudiagramm zeigen nur diesen Zeitraum.
- Auswahl im Streudiagramm → Karte und Zeitachse filtern auf diese Herkunftsländer.
- Klick auf ein Land in der Karte → Herkunftsland wird gewählt und im Streudiagramm hervorgehoben.
- Hover über einen Punkt → Land auf der Karte hervorheben.
- Button «Zurücksetzen» stellt den Startzustand wieder her.

**Weitere Elemente**
- Farblegende mit Log-Abstufungen und Symbol für die Nachbar-Umrandung
- Quellenangabe direkt unter der Visualisierung (Tufte)
- Kontext für die 5–10 grössten Krisen als kleine, von Hand erstellte Tabelle (z. B. «Rwanda 1994: Genozid»)
- Bewusst **keine Animation**

## Technik

- Statische Website mit HTML, CSS und JavaScript plus **D3.js v7**. Kein Framework und kein Build-Schritt, weil wir den Code erklären können müssen.
- **Website-Ordner ist `public/`.** Aktuell enthält er nur eine Platzhalter-Seite (GitLab-Pages-Beispiel).
- **Deployment aktuell:** GitHub Actions (`.github/workflows/pages.yml`) deployt `public/` bei jedem Push auf `main` auf GitHub Pages. Workflow nicht ohne Rückfrage ändern.
- **Abgabe laut Aufgabe:** GitLab Pages auf gitlab.switch.ch. Die Dozierenden legen die Repos an, Muster: `https://gitlab.switch.ch/hslu/edu/bachelor-computer-science/davi/<semester>/g<nr>`. Jeder Push deployt automatisch, die URL steht im Jobs-Log. Eine vorhandene `.gitlab-ci.yml` nicht ohne Rückfrage ändern.
- Vom Dozenten empfohlen: Phoenix Code (https://phcode.io/) mit Chrome.
- Lokal mit einem kleinen Webserver testen (z. B. `python3 -m http.server` im Ordner `public/`), weil `d3.csv` und `d3.json` über `file://` nicht funktionieren.
- Datenaufbereitung als Skript (Python) unter `scripts/`. Es liest die Rohdaten aus `Projekt/Data/` und schreibt kleine CSV- oder JSON-Dateien nach `public/data/`.

**Vorgeschlagene Struktur** (Vorschlag, vor dem Anlegen absprechen):

```
public/
  index.html            Startseite mit Navigation
  hintergrund.html      Projekt, Fragestellung, Skizze
  daten.html            Quellen und Metadaten
  visualisierung.html   interaktive Visualisierung
  design.html           Designentscheidungen (2500–3500 Zeichen)
  referenzen.html       Quellen, Erkenntnisse, Code-Quellen
  kontakt.html          Gruppenmitglieder
  css/style.css
  js/                   z. B. main.js, map.js, scatter.js, timeline.js
  data/                 aufbereitete Dateien für D3
  img/                  Scan der Handskizze
scripts/                Datenaufbereitung
Projekt/Data/           Originaldaten, unverändert
```

## Offene Punkte

- [ ] Gruppennummer, GitLab-Repo-URL und URL der Website (Switch)
- [ ] Klären: bleibt GitHub Pages nur zum Testen, Abgabe über GitLab Switch?
- [ ] Jährliche Weltbank-Bevölkerungsdaten herunterladen (oder interpolieren)
- [ ] Entscheidungen bestätigen: Nachbarland = gemeinsame Grenze (bisher ja), Start 1962 (bisher ja), wie viel Kontext pro Krise, Umgang mit Kosovo, Bevölkerung für 2025, Mindestzahl im Streudiagramm, Umgang mit Erfassungsbrüchen (Filter Kategorien?)
- [ ] Klären, ob die Nutzung von KI-Tools im Projekt deklariert werden muss

## Mögliche Reihenfolge (Vorschlag, nur nach Absprache abarbeiten)

1. Seitenstruktur und Navigation in `public/` anlegen
2. Skript für die Datenaufbereitung schreiben, Befunde nachrechnen
3. Weltkarte mit Legende und Tooltip (Startzustand: aus Nachbarländern)
4. Zeitachse mit Brush, verknüpft mit der Karte
5. Streudiagramm der Herkunftsländer, verknüpft mit Karte und Zeitachse; Button «Zurücksetzen»
6. Bis 11. Dezember: lauffähiger Prototyp für die Präsentation
7. Texte (Hintergrund, Daten, Design, Referenzen, Kontakt)
8. Bis 17. Januar: Feinschliff, ZIP und Link in ILIAS hochladen
