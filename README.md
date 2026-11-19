# Selva Vins — website

A one-page site for Selva Vins, the natural-wine winery of Carlos Rodríguez Furthmann in Selva, Mallorca.
Built as a gift: their old site at selvavins.com now serves a blank page.

## View it

```
python3 -m http.server 4791
```

Run it from this folder, then open http://localhost:4791. Opening `index.html` straight from the Finder also works.

## What's in it

| Section | What moves |
|---|---|
| Hero | Their own label painting (`assets/img/label-art.jpg`, from the old site's header) bleeds onto the paper through wet blobs, their moon (`assets/brand/moon.png`, cut out of the same painting) rises, the wordmark sets in letter by letter |
| 01 Selva | Text reads in word by word; the village photo opens like a shutter |
| 02 The family | Carlos, Bàrbara, Hada in their own words; postcards of their photos drift past |
| 03 How it's made | "Solo uva, nada más." What's not in the bottle gets struck through; six steps from vine to bottle draw themselves in as they arrive |
| 04 Out on a limb | The island firsts; hovering shows the bottle |
| 05 The wines | Opens on "The island's own grapes" with the native varieties drifting across; then The Usual Suspects as a police lineup on a height chart in % vol (click a bottle for its sheet); Remi as a riso punk poster; Hada's wines with a snail crossing the page |
| 06 The grapes | The Gargollassa story in four chapters that scroll normally, beside a botanical plate of the vine printed in the label's blue (`js/plate.js`): fully inked; washed away by phylloxera to a faint print; three small blooms of ink for the three surviving vines; the ink spreading from those three until the plate is whole. Then every native grape with a watercolour bunch in its own colour |
| 07 Visit | Gargo Wineroom and a map of all Mallorca: the wine room, their own plot, the growers' villages and Inca, with a numbered key |

Catalan, Spanish and English (`CA · ES · EN`). It picks the visitor's browser language.

## Live copy

https://selva-vins.pages.dev (Cloudflare Pages project `selva-vins`, `noindex` so search engines leave it alone).
To update it, copy `index.html css js vendor assets` into an empty folder (leave this README and the license files out) and run:

    npx wrangler@4.164.0 pages deploy <folder> --project-name selva-vins --branch main --commit-dirty=true

## Editing

- Wines and grapes: `js/data.js`; add `soldOut: true` to a wine to stamp it "Sold out" (the Ancestral has it)
- The map is inline SVG in `index.html` (`figure.atlas`), built from OpenStreetMap coastline and roads and AWS Terrain Tiles elevation; the key below it is plain HTML
- Catalan and Spanish text: `js/i18n.js` (English is in `index.html`)
- Colours and type: top of `css/style.css`

## Sources

- The old selvavins.com, read from the Web Archive (texts, team, grape notes, wine specs, logo, photos)
- dejavins.com/bodegas/selva-vins (story, quotes, bottle photos)
- mallorca.com directory, from Google data of Sept 2026 (address and wine-room hours)
- raisin.digital (the Gargo Wineroom name and the three pa amb oli)
- Map: coastline and roads © OpenStreetMap contributors (ODbL); relief from AWS Terrain Tiles (Mapzen)
- Vineyards: mallorcawinetrail.com (own plot in Estellencs, grapes bought from friends), sobrelias.com (Manacor, Pollença, Felanitx), dejavins.com (Llubí, Vilafranca de Bonany), travelhiddenplaces.com
- Grapevine plate: F. E. Köhler, *Köhler's Medizinal-Pflanzen* (1887–1898), public domain, via Wikimedia Commons / Biodiversity Heritage Library; recoloured in blue

## Check with the winery before it goes live

- Which growers and villages to show on the map: Manacor, Pollença and Felanitx come from an older article; whether they want growers named at all
- Whether the C/ Creu 30 address (Vinissimus) is still in use, or everything is now at Ctra. de Lluc 47
- Opening hours were removed from the page; the old Google hours are no longer shown anywhere
- Which wines are current
- That Hada is happy to be named, and how she wants her wines described
- Escurshada 23 is left out: it looks like an earlier Hada Escursac
- No photos exist for Hada, Roshada and Clorange; they show a typographic label instead
- GSAP and Lenis are vendored in `vendor/`; fonts load from Google Fonts

## License

The site code (`index.html`, `css/`, `js/`) is MIT, see `LICENSE`. The brand, photographs and texts belong to Selva Vins and are not covered by it; third-party code, fonts and map data keep their own licenses. See `NOTICE.md`.
