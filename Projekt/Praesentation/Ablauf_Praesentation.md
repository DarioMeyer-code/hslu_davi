# Projektpräsentation 11. Dezember 2026 – Ablauf (Entwurf, Stand 27.11.2026)

**Dauer:** genau 5 Minuten · **Sprechanteil:** je ca. 2½ Minuten · Danach 5 Minuten Feedback an andere Gruppen.
Folien am selben Tag in ILIAS hochladen.

Grundidee: wenige Folien, Hauptteil ist die **Live-Demo** der Website (zeigt das Information Seeking Mantra und Brushing & Linking direkt). Für den Notfall Screenshots der Demo als Backup-Folien bereithalten (falls Internet oder Browser streikt).

Alle Zahlen stammen aus `scripts/kontrollbericht.txt` bzw. aus der Website selbst.

| Zeit | Wer | Inhalt | Folie / Demo |
|---|---|---|---|
| 0:00–0:40 | Martina | **Einstieg und Fragestellung.** «Wo kommen Geflüchtete an?» Laut UNHCR leben zwei Drittel im Nachbarland (Bestand). Unsere Frage: Nehmen Nachbarländer pro Einwohner mehr Geflüchtete auf als entfernte Länder, und wie hat sich das seit 1962 verändert? | Folie 1: Titel + Frage |
| 0:40–1:20 | Martina | **Daten.** UNHCR-Neuankünfte 1962–2025, Weltbank-Bevölkerung, GeoDataSource-Grenzen. Begriffe: Neuankünfte (Flow) statt Bestand, Nachbarland = gemeinsame Landgrenze, pro 1000 Einwohner. Erfassungsbruch um 2000 kurz erwähnen. | Folie 2: Datenquellen + Begriffe |
| 1:20–2:30 | Martina | **Demo Teil 1 – Overview.** Startzustand der Karte: Neuankünfte aus Nachbarländern pro 1000 EW (Feedback umgesetzt). Log-Skala, Natural Earth 2, Tooltip über Libanon. Zeitachse: Linie (Anteil) und Balken (absolut), Hinweislinie 2000. | Website |
| 2:30–3:40 | Dario | **Demo Teil 2 – Zoom & Filter, Brushing & Linking.** Brush 2011–2016 auf der Zeitachse → Karte folgt. Klick auf Syrien → Schraffur, Nachbarländer umrandet, Zeitachse nur Syrien (2012–2014 über 90 % in Nachbarländern, 2020–2023 nur noch 5–7 %, 2024/25 wieder höher). **Hypothesen-Check** über der Karte zeigen: Syrien 2011–2025 (über «anzeigen» in der Kontext-Tabelle) → beide Teile erfüllt, Hinweis auf Datenbrüche im Zeitraum. Kontext-Tabelle: Ukraine «anzeigen» (nur 41 % in Nachbarländer). «Zurücksetzen». | Website |
| 3:40–4:30 | Dario | **Erkenntnisse.** 59 % aller Neuankünfte in Nachbarländern. Pro Kopf tragen Nachbarländer die grösste Last (Libanon 2013: 129 pro 1000; Schweiz 2,4). Der Rückgang von 84 % (1970er) auf 46 % (2020er) hängt stark mit den Asylgesuchen und dem Erfassungsbruch zusammen; ohne Asylgesuche bis in die 2010er 88–93 %. → Teil 1 der Hypothese bestätigt; Teil 2 nur für die 2020er (Ukraine, Venezuela), über die Jahrzehnte grösstenteils Erfassungseffekt. Datenbrüche sind auf der Website dokumentiert (Daten → Einschränkungen). | Folie 3: drei Kernaussagen |
| 4:30–5:00 | Dario | **Designentscheidungen in einem Satz pro Punkt** (Tufte: Data-Ink, Wort/Zahl/Bild; Perception: Log-Klassen, Position für Anteil, keine doppelte y-Achse; keine Animation wegen Change Blindness) und Dank. | Folie 4: Design-Stichworte |

## Folien (4 Stück)

1. **Titel:** «Nachbarländer als Hauptaufnahmeländer?» – Fragestellung, Namen
2. **Daten:** drei Quellen in einer Tabelle, drei Begriffe
3. **Erkenntnisse:** 59 % · Libanon 129 pro 1000 vs. Schweiz 2,4 · Hypothese: Teil 1 bestätigt, Teil 2 vor allem Erfassungseffekt (Bruch 2000)
4. **Design:** fünf Stichworte, Link zur Website

## Vorbereitung

- Demo vorher zweimal mit Stoppuhr durchspielen, Klickfolge festlegen (Brush 2011–2016 → Syrien → Syrien 2011–2025 mit Hypothesen-Check → Ukraine → Zurücksetzen).
- Browser im Vollbild, Zoom so einstellen, dass Karte und Zeitachse gleichzeitig sichtbar sind.
- Website lokal und online offen haben (falls eines nicht geht).
- Mögliche Fragen vorbereiten: Warum Log-Skala? Warum feste Klassen? Warum keine zweite y-Achse? Warum gemeinsame Landgrenze als Definition? Was ist der Erfassungsbruch, und warum schneiden wir nicht ab 2000 ab (Frage «seit 1962», auch nach 2000 Brüche, Bruch ist selbst ein Befund)? Wie prüft der Hypothesen-Check Teil 2 (zwei Hälften, ≥ 5 Prozentpunkte)? Warum kein Rot/Grün bei den Status? Warum Feedback 3 (Vergleich der Herkunftsländer) nicht als eigene Grafik?
