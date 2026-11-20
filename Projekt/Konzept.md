# Konzept – Nachbarländer als Hauptaufnahmeländer?

Arbeitsdokument (Stand nach Proposal-Feedback). Grundlage: Proposal vom 16.10.2026,
Handskizze (`Proposal/Sketch_Project -proposal.pdf`), Feedback Prof. Janetzko.

## Fragestellung

Nehmen Nachbarländer bei grossen Fluchtbewegungen im Verhältnis zu ihrer Bevölkerung mehr
Geflüchtete auf als weiter entfernte Länder, und wie hat sich das seit 1962 verändert?

## Feedback des Dozenten zum Proposal

1. **Startzustand (nichts ausgewählt):** zeigen, welche Länder wie viele Personen aus
   Nachbarländern aufnehmen.
2. **Top-10-Liste entfernen.**
3. **Verhalten der Herkunftsländer vergleichbar machen.**

## Angepasstes Dashboard

Drei Ansichten. Alle filtern sich gegenseitig (Brushing & Linking).

### Ansicht 1 – Weltkarte (Choroplethenkarte, Natural Earth 2)

- **Startzustand:** pro Aufnahmeland die Neuankünfte **aus Nachbarländern pro 1000 Einwohner**
  im gewählten Zeitraum (Feedback 1). Sequenzielle ColorBrewer-Skala (Blues), Log-Stufen,
  grau = keine Daten.
- **Wenn Herkunftsländer ausgewählt sind:** Neuankünfte aus diesen Herkunftsländern pro
  1000 Einwohner. Herkunftsland markiert, Nachbarländer mit dicker Umrandung.
- **Details bei Bedarf:** Tooltip mit absoluter Zahl, Wert pro 1000 Einwohner, Nachbar ja/nein und
  wichtigsten Herkunftsländern.
- Klick auf ein Land = Herkunftsland auswählen/abwählen.

### Ansicht 2 – Vergleich der Herkunftsländer (ersetzt Top 10, Feedback 2 + 3)

Streudiagramm, ein Punkt pro Herkunftsland (im gewählten Zeitraum):

- **x:** Total Abwanderung (Log-Skala) – «wie gross war die Fluchtbewegung?»
- **y:** Anteil, der in Nachbarländern aufgenommen wurde (0–100 %)
- Damit wird direkt sichtbar, ob sich Herkunftsländer ähnlich verhalten. Wie die Frage
  vermutet: Liegen grosse Fluchtbewegungen oben?
- Klick oder Brush (Rechteck) wählt ein oder mehrere Herkunftsländer aus. Die Karte und die
  Zeitachse werden darauf gefiltert.
- Optional: Farbe nach UNHCR-Region (kategoriale Farben, max. ~6 Farben).

### Ansicht 3 – Zeitachse 1962–2025

- Linie: Anteil der Neuankünfte, die in Nachbarländern aufgenommen wurden (alle bzw.
  ausgewählte Herkunftsländer).
- Mehrere ausgewählte Herkunftsländer → je eine Linie (Vergleich, Feedback 3), max. ~5,
  dazu eine Legende.
- Gedämpfte Balken: absolute Neuankünfte als Kontext.
- Brush auf der x-Achse = Zeitraum. Der Zeitraum gilt für Karte und Streudiagramm.

### Weitere Bedienelemente

Auswahl Herkunftsland (Dropdown, synchron mit Klick), Reset-Button und Filter für die
Personengruppe (Flüchtlinge vs. Asylsuchende), siehe Datenvorbehalte.

## Kennzahlen

- **Neuankünfte aus Nachbarländern pro 1000 EW** (Aufnahmeland A, Zeitraum T) =
  Σ Neuankünfte nach A aus Herkunftsländern, die an A grenzen ÷ durchschnittliche Bevölkerung
  von A in T × 1000
- **Anteil in Nachbarländern** (Herkunftsland H, Zeitraum T) =
  Σ Neuankünfte aus H in Nachbarländern von H ÷ Σ alle Neuankünfte aus H

## Datenvorbehalte / offene Punkte

- Die Bevölkerungsdaten (Weltbank) liegen nur pro Jahrzehnt vor (1960…2020, danach
  Prognosen). Lösung: SP.POP.TOTL jährlich neu herunterladen (Alternative: interpolieren).
- Asylanträge (ASY) gibt es 1970–1999 nur für 37 Industrieländer. Weitere Schutzbedürftige (OIP)
  gibt es ab 2018, von UNHCR registrierte Asylsuchende (ASR) ab 2021. Dadurch kann der Nachbarländer-Anteil
  künstlich sinken. Lösung: Filter für die Personengruppe und ein Hinweis im Datenteil.
- Ländercodes: Grenzen in ISO-2, UNHCR in eigenen Codes + ISO-3, Weltbank in ISO-3. Es braucht
  eine Zuordnungstabelle. Historische Staaten (z.B. Sowjetunion, Jugoslawien) separat
  behandeln.
- Für die Karte fehlen noch Länderpolygone (TopoJSON, Natural Earth).
- Auf der Website nur die Handskizze als Konzeptskizze verwenden (keine GenAI-Skizze erlaubt).
