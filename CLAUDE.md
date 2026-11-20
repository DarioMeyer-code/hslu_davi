# CLAUDE.md – DAVI-Projekt «Nachbarländer als Hauptaufnahmeländer?»

Kontext für Claude Code. Stand: 20. November 2026. Zusammengefasst aus den bisherigen Chats im
claude.ai-Projekt «DAVI», ergänzt um das Proposal-Feedback und den Abgleich mit den Dateien im Repo.

## Wie wir zusammenarbeiten (wichtig)

- **Sprache:** Deutsch, Schweizer Schreibweise (ss statt ß). Einfach erklären, Fachbegriffe kurz erläutern.
- **Nichts ohne Auftrag generieren oder ändern.** Zuerst gemeinsam planen, dann umsetzen. Bei Unklarheit nachfragen statt loslegen. Keine Dateien anfassen, die nicht zum Auftrag gehören.
- **Einfach halten, kein Over-Engineering.** Ziel ist ein solides, gut begründbares Projekt, nicht ein möglichst grosses.
- **Code muss erklärbar sein.** Wir müssen Code und Designentscheidungen mündlich verteidigen können. Lieber verständlich und kommentiert als clever.
- **Nicht committen oder pushen ohne Auftrag.** Ein Push auf `main` deployt die Website automatisch (siehe Technik).
- **Keine Branches.** Wir arbeiten direkt auf `main`: vor der Arbeit `git pull`, nach Auftrag committen und auf `main` pushen. Keine Feature-Branches und keine Pull Requests anlegen.
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
| `Projekt/Praesentation/Ablauf_Praesentation.md` | Ablauf der 5-Minuten-Präsentation (Entwurf) |
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

**Titel:** Nachbarländer als Hauptaufnahmeländer? Neuankünfte von Geflüchteten 1962–2025

**Forschungsfrage:** Nehmen Nachbarländer bei grossen Fluchtbewegungen im Verhältnis zu ihrer Bevölkerung mehr Geflüchtete auf als weiter entfernte Länder, und wie hat sich das seit 1962 verändert?

**Hypothese:** Nachbarländer nehmen pro Einwohner am meisten auf. Ihr Anteil an den Neuankünften nimmt über die Jahrzehnte aber ab, es fliehen also mehr Menschen weiter weg.

**Begriffe**
- *Neuankünfte:* Menschen, die in einem Jahr neu in einem Land ankommen (Flow), nicht alle, die dort leben (Bestand). Die oft zitierten «2 von 3 Geflüchteten leben in einem Nachbarland» (UNHCR Global Trends) beziehen sich auf den Bestand. Nicht verwechseln.
- *Nachbarland:* Aufnahmeland mit gemeinsamer Landgrenze zum Herkunftsland (laut GeoDataSource). Bhutan → Nepal zählt damit nicht als Nachbar, obwohl die Länder nah beieinander liegen. Das ist bewusst so und muss auf der Website begründet werden.
- *Pro 1000 Einwohner:* Neuankünfte ÷ Bevölkerung des Aufnahmelands × 1000. Absolute Zahlen würden grosse Länder immer stärker belastet aussehen lassen.
- *Anteil in Nachbarländern* (Herkunftsland H, Zeitraum T): Neuankünfte aus H in Nachbarländern von H ÷ alle Neuankünfte aus H.

**Zielgruppe:** interessierte Laien, die Nachrichten über Flucht verfolgen. Nebenzielgruppe: Studierende, Lehrpersonen, Journalisten, eventuell Politik und Hilfswerke.

**User-Tasks:** Überblick (wo liegt die Last?) · Vergleichen (Nachbarland vs. weiter entfernt) · Entwicklung (seit 1962) · Nachschlagen (ein Land, eine Krise).

## Feedback des Dozenten zum Proposal (16. Okt. 2026)

1. **Startzustand:** Wenn nichts ausgewählt ist, zeigen, welche Länder wie viele Personen aus Nachbarländern aufnehmen.
2. **Top-10-Liste wegnehmen.**
3. **Verhalten der Herkunftsländer miteinander vergleichbar machen.**

Umsetzung: Punkt 1 und 2 werden umgesetzt (Karte startet mit «Neuankünfte aus Nachbarländern», Top 10 entfällt). **Punkt 3 lassen wir vorerst weg** und prüfen ihn allenfalls später nochmals (Idee dafür siehe «Zurückgestellt» im Visualisierungskonzept).

## Daten

| Datensatz | Inhalt | Fundort | Lizenz |
|---|---|---|---|
| UNHCR Forced Displacement Flows | Neuankünfte pro Jahr × Herkunftsland × Aufnahmeland × Kategorie, 1962–2025. Im Repo: `Projekt/Data/UNHCR_Flow_Data.xlsx`, Blatt `DATA`, 108'879 Zeilen, Stand 11.6.2026 | UNHCR Refugee Data Finder; auch R-Paket `refugees`: https://github.com/PopulationStatistics/refugees | CC BY 4.0 |
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
- **Kategorien (laut Blatt `Metadata` der UNHCR-Excel):** REF = Flüchtlinge · GRP = Gruppenanerkennung · TMP = vorübergehender Schutz · ROC = flüchtlingsähnliche Situation · **ASY = neue Asylgesuche** · ASR = von UNHCR registrierte Asylsuchende · OIP = andere Schutzbedürftige. Für «Neuankünfte» werden sie summiert.
- **Erfassungsbrüche:** Asylgesuche (ASY) gibt es 1970–1999 nur für **37 Industrieländer**, ab 2000 für 192 Länder. GRP/TMP ab 2000, OIP ab 2018, ASR ab 2021. Weil diese Industrieländer selten Nachbarn der Herkunftsländer sind, kann der Nachbar-Anteil allein wegen der Erfassung schwanken. **Entscheid:** kein Filter nach Kategorie (alle Kategorien zählen Personen, unsere Frage ist *wo* Menschen ankommen, nicht über welches Verfahren). Stattdessen Hinweislinie bei 2000 auf der Zeitachse und Erklärung auf der Datenseite.
- Nachgerechnete Werte zu den Erfassungsbrüchen: siehe «Nachgerechnete Befunde» unten.
- **Ländercodes:** UNHCR hat eigene Codes (ALG) und ISO3-Codes (DZA). Immer die ISO3-Spalten verwenden (`OriginISO`, `AsylumISO`). Die Namensspalten in der Excel-Datei sind Formeln und werden beim Einlesen mit einem Skript leer gelesen; Namen aus Blatt `T23` holen. GeoDataSource nutzt ISO2 (CH), also nach ISO3 umrechnen. Die TopoJSON-Weltkarte (world-atlas) nutzt numerische ISO-Codes (756 = Schweiz), dafür braucht es eine Zuordnungstabelle.
- **Sonderfälle:** Kosovo ist bei UNHCR mit Serbien zusammengeführt. **Entscheid:** so übernehmen, Kosovo auf der Karte grau mit Hinweis. UNHCR-Codes ohne Land: `UKN` (unbekannte Herkunft), `STA` (staatenlos), `TIB` (Tibet), zusammen ca. 2 % der Neuankünfte. **Entscheid:** aus der Auswertung entfernen (kein Nachbarland bestimmbar), Anzahl auf der Datenseite nennen.
- **Weltbank:** Die Datei enthält Aggregate (World, Regionen, Einkommensgruppen). Das Skript entfernt sie (kein gültiger ISO-3-Code). Die heruntergeladene Jahresreihe enthält bereits 2025.
- **Zahlenformat:** In der Excel-Ansicht stehen Schweizer Tausendertrennzeichen (20’000). Beim Einlesen per Skript kommen echte Zahlen an.
- **Datenmenge:** Nach dem Zusammenzählen der Kategorien bleiben 103'502 Zeilen (Jahr × Herkunft × Aufnahme), als `flows.csv` ca. 2 MB. Das ist für den Browser in Ordnung (GitHub Pages liefert komprimiert aus). **Entscheid:** eine einzige Datei, Filtern und Summieren im Browser (`data.js`), statt vieler vorgerechneter Teildateien – einfacher zu erklären.
- **Neu aufbauen:** Die ersten Auswertungen liefen in einer claude.ai-Sandbox. Diese CSV-Dateien existieren nicht mehr. Die Aufbereitung muss als Skript im Repo neu gebaut werden. Laut Aufgabe wäre auch Tableau Prep erlaubt.

### Nachgerechnete Befunde (`scripts/prepare_data.py`, 20.11.2026, Details in `scripts/kontrollbericht.txt`)
- Bereinigt: 103'502 Zeilen, 113,6 Mio. Neuankünfte, 211 Herkunfts- und 189 Aufnahmeländer. Entfernt 2,5 Mio. (2,1 %): UKN 2,26 Mio., STA 0,20 Mio., TIB 11'000.
- Über alle Jahre landen **59 %** der Neuankünfte in Nachbarländern.
- Anteil Nachbarländer nach Jahrzehnt, alle Kategorien / ohne Asylgesuche (Anteil Asylgesuche): 1960er 64 %/64 % (0 %) · 1970er 84 %/88 % (5 %) · 1980er 81 %/91 % (12 %) · 1990er 67 %/93 % (29 %) · 2000er 50 %/91 % (62 %) · 2010er 60 %/89 % (42 %) · 2020er 46 %/63 % (44 %). **Der sinkende Anteil hängt stark mit dem wachsenden Gewicht der Asylgesuche zusammen** (Erfassungsbruch, siehe oben). Wichtig für die Interpretation der Hypothese.
- Libanon 2013: 740'865 Neuankünfte, **129 pro 1000** Einwohner. Zum Vergleich 2013: Schweiz 2,4, Deutschland 1,3.
- Nordmazedonien 1999: 355'000 Neuankünfte, **176 pro 1000**.
- Syrien 2013: in den Nachbarländern (IRQ, ISR, JOR, LBN, TUR) **15,4 pro 1000**, im Rest der Welt 0,03.
- Ukraine und Venezuela: nur **44 %** in Nachbarländern (alle Jahre), die Mehrheit ging in nicht angrenzende Länder.
- Datenlücken für die Karte: 28 kleine Aufnahmeländer fehlen im Massstab 1:110 Mio. (0,24 % der Neuankünfte, v. a. Hongkong, Malta, Singapur). Bevölkerung fehlt nur für Französisch-Guayana und Anguilla (2'127 Personen). Auf der Karte ohne Code: Nordzypern, Somaliland, Kosovo (grau).
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
- **Startzustand (nichts ausgewählt, Feedback 1):** pro Aufnahmeland die Neuankünfte **aus Nachbarländern** pro 1000 Einwohner, summiert über den gewählten Zeitraum.
- **Herkunftsland gewählt:** Neuankünfte aus diesem Land pro 1000 Einwohner. Herkunftsland eigene Markierung (z. B. Schraffur), Nachbarländer dick umrandet.
- Klick auf ein Land: als Herkunftsland wählen bzw. abwählen. Zusätzlich Auswahl per Dropdown.
- Ländernamen auf **Deutsch** (Browser-Funktion `Intl.DisplayNames` mit ISO-2-Code, keine zusätzlichen Daten nötig).
- Tooltip (Details on Demand): Ländername, Neuankünfte absolut und pro 1000 Einwohner, Nachbar ja/nein, wichtigste Herkunftsländer, eventuell ein Satz Kontext zur Krise.

**Ansicht 2 – Zeitachse (Zoom & Filter)**
- Linie: Anteil der Neuankünfte in Nachbarländern pro Jahr, y-Achse 0–100 %. Ist ein Herkunftsland gewählt, zeigt die Linie nur dieses Land.
- **Umgesetzt (Schritt 4):** Absolute Neuankünfte nicht als Balken hinter der Linie (das bräuchte eine zweite y-Achse), sondern als **eigenes Panel darunter mit gemeinsamer x-Achse**: gestapelte Balken «in Nachbarländern» (Blau) und «in anderen Ländern» (Grau). Begründung: keine doppelte y-Achse (zwei Skalen in einer Grafik sind schwer vergleichbar).
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
- **Kontext-Tabelle (umgesetzt):** die 10 Herkunftsländer mit den meisten Neuankünften in einem Jahr (AFG, IRQ, RWA, SRB/Kosovo, SYR, SSD, VEN, MMR, UKR, SDN). Fest in `js/crises.js` stehen nur Land, Zeitraum und Kontext; Neuankünfte und Nachbar-Anteil rechnet der Browser aus den Daten. Button «anzeigen» setzt Herkunftsland und Zeitraum (inkl. Brush).
- Bewusst **keine Animation**
- Top-10-Liste entfällt (Feedback 2)

**Zurückgestellt (Feedback 3, allenfalls später prüfen)**
- Idee: Streudiagramm, ein Punkt pro Herkunftsland. x = alle Neuankünfte aus diesem Land (Log-Skala), y = Anteil davon in Nachbarländern. Auswahl per Klick oder 2D-Brush, verknüpft mit Karte und Zeitachse; nur Herkunftsländer ab einer Mindestzahl Neuankünfte.
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
  lib/
    d3.v7.min.js          D3 v7.9.0
    d3-geo-projection.min.js   für Natural Earth 2 (v4.0.0)
    topojson-client.min.js     wandelt die TopoJSON-Karte in Länderformen um (v3.1.0)
  data/                   von scripts/prepare_data.py erzeugt, nicht von Hand ändern
    flows.csv             jahr, herkunft, aufnahme, anzahl, nachbar (0/1)
    population.csv        iso3, jahr, einwohner
    countries.csv         iso3, iso2, iso_num
    borders.csv           iso3_a, iso3_b (Nachbarpaare)
    world-110m.json       Länderformen (TopoJSON)
  img/skizze.png          Scan der Handskizze aus dem Proposal

scripts/
  prepare_data.py         Bereinigung + Aufbereitung: Projekt/Data/ → public/data/
  requirements.txt        Python-Pakete (openpyxl, pycountry)
  kontrollbericht.txt     Ausgabe des Skripts: Entferntes, nicht Zugeordnetes, nachgerechnete Befunde
Projekt/Data/             Originaldaten, unverändert
```

**Gemeinsamer Zustand:** `state = { years: [1962, 2025], origin: null }`. Jede Interaktion ruft `setState(...)` auf, das danach `map.update(state)` und `timeline.update(state)` aufruft.

**Rechnung Karte:** Summe Neuankünfte im Zeitraum (ohne Auswahl: nur aus Nachbarländern; mit Auswahl: nur aus dem gewählten Herkunftsland) ÷ durchschnittliche Bevölkerung im Zeitraum × 1000.

**Datenaufbereitung ausführen** (im Repo-Hauptordner):

```
pip install -r scripts/requirements.txt
python3 scripts/prepare_data.py
```

## Offene Punkte

- [ ] Gruppennummer, GitLab-Repo-URL und URL der Website (Switch)
- [ ] Klären: bleibt GitHub Pages nur zum Testen, Abgabe über GitLab Switch?
- [x] Jährliche Weltbank-Bevölkerungsdaten heruntergeladen
- [x] Entschieden (20.11.2026): Visualisierung an 2. Stelle · Namen deutsch · kein Kategorie-Filter, Hinweislinie 2000 · Kosovo zu Serbien, grau mit Hinweis · D3 lokal · UKN/STA/TIB entfernen
- [ ] Noch bestätigen: Nachbarland = gemeinsame Grenze (bisher ja), Start 1962 (bisher ja), wie viel Kontext pro Krise
- [ ] Klären, ob die Nutzung von KI-Tools im Projekt deklariert werden muss. **Vorläufig:** ein Satz zur KI-Nutzung steht in den Referenzen (unter «Verwendeter Code»); bei Bedarf anpassen oder entfernen.
- [ ] Texte auf der Website gegenlesen und in eigene Worte bringen, besonders den Designtext (muss mündlich verteidigt werden)

## Mögliche Reihenfolge (Vorschlag, nur nach Absprache abarbeiten)

Stand 20.11.2026: Schritte 1–7 erledigt (Prototyp, Kontext-Tabelle, alle Texte als Entwurf, Ablauf der Präsentation). Offen: Texte gegenlesen, Präsentationsfolien erstellen, Feinschliff, Abgabe.

1. Skript für die Datenaufbereitung schreiben, Kontrollbericht gemeinsam prüfen, Befunde nachrechnen
2. `public/index.html` mit allen Abschnitten und Anker-Navigation anlegen
3. Weltkarte mit Legende und Tooltip (Startzustand: aus Nachbarländern)
4. Zeitachse mit Brush, verknüpft mit der Karte
5. Herkunftsland per Klick/Dropdown, Button «Zurücksetzen»
6. Bis 11. Dezember: lauffähiger Prototyp für die Präsentation
7. Texte (Hintergrund, Daten, Design, Referenzen, Kontakt); allenfalls Feedback 3 nochmals prüfen
8. Bis 17. Januar: Feinschliff, ZIP und Link in ILIAS hochladen
