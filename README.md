# Nachbarländer als Hauptaufnahmeländer?

Projektarbeit im Modul I.DAVI (Data Visualization), HSLU, Herbstsemester 2026.
Dario Meyer und Martina Gander.

Interaktive D3.js-Visualisierung der Neuankünfte von Geflüchteten 1962–2025 (UNHCR):
Nehmen Nachbarländer im Verhältnis zu ihrer Bevölkerung mehr Geflüchtete auf als weiter
entfernte Länder, und wie hat sich das seit 1962 verändert?

## Lokal starten

`d3.csv` und `d3.json` funktionieren nicht über `file://`, deshalb mit einem kleinen Webserver:

```
cd public
python3 -m http.server
```

Danach http://localhost:8000 öffnen.

## Daten neu aufbereiten

```
pip install -r scripts/requirements.txt
python3 scripts/prepare_data.py
```

Liest die Rohdaten aus `Projekt/Data/` und schreibt nach `public/data/`.
Kontrollwerte stehen in `scripts/kontrollbericht.txt`.

## Aufbau

- `public/` – die Website (einzige Seite `index.html`, Code in `js/`, D3 lokal in `lib/`)
- `scripts/` – Datenaufbereitung (Python)
- `Projekt/` – Aufgabenstellung, Proposal, Rohdaten, Präsentationsablauf
- `CLAUDE.md` – ausführlicher Projektstand, Entscheide, Datenbrüche und offene Punkte

Ein Push auf `main` deployt `public/` automatisch auf GitHub Pages.

## Quellen

UNHCR Forced Displacement Flows (CC BY 4.0) · Weltbank «Population, total» (CC BY 4.0) ·
GeoDataSource Country Borders (CC BY-SA 4.0) · world-atlas / Natural Earth.
