/* Wines and grapes. Facts come from the old selvavins.com product and grape pages
   (via the Web Archive) and from the distributor's notes. Edit here; the page reads it. */

window.SV_COLOURS = {
  red:       { en: 'Red', es: 'Tinto', ca: 'Negre', tint: '#5b1a26' },
  white:     { en: 'White', es: 'Blanco', ca: 'Blanc', tint: '#cdb978' },
  rose:      { en: 'Rosé', es: 'Rosado', ca: 'Rosat', tint: '#d98d7f' },
  orange:    { en: 'Orange', es: 'Naranja', ca: 'Brisat', tint: '#c98337' },
  sparkling: { en: 'Sparkling, ancestral method', es: 'Espumoso, método ancestral', ca: 'Escumós, mètode ancestral', tint: '#d9b27c' },
  clarete:   { en: 'Clarete', es: 'Clarete', ca: 'Clarete', tint: '#e09a86' },
  clorange:  { en: 'Clarete-orange', es: 'Clarete-naranja', ca: 'Clarete-brisat', tint: '#d38a52' }
};

window.SV_WINES = [
  /* ---------- The Usual Suspects ---------- */
  { id: 'gargo', col: 'suspects', name: 'Gargo', img: 'gargollasa', colour: 'red', grape: 'Gargollassa', abv: '12%',
    notes: {
      en: ['100% Gargollassa, the emblem grape of the winery', 'Spontaneous fermentation', 'Nothing added but a low dose of sulphite', 'Unfined, unfiltered'],
      es: ['100% Gargollassa, la uva emblema de la bodega', 'Fermentación espontánea', 'Nada añadido salvo una dosis baja de sulfuroso', 'Sin clarificar ni filtrar'],
      ca: ['100% Gargollassa, el raïm emblema del celler', 'Fermentació espontània', 'Res afegit, només una dosi baixa de sulfurós', 'Sense clarificar ni filtrar'] } },
  { id: 'giro-ros', col: 'suspects', name: 'Giró Ros', img: 'giro-ros', colour: 'white', grape: 'Giró Ros', abv: '11.5%',
    notes: {
      en: ['100% Giró Ros', 'A small part spends 22 days on its skins', 'Spontaneous fermentation', 'Minimal sulphite. Unfined, unfiltered'],
      es: ['100% Giró Ros', 'Una pequeña parte pasa 22 días con sus pieles', 'Fermentación espontánea', 'Sulfuroso mínimo. Sin clarificar ni filtrar'],
      ca: ['100% Giró Ros', 'Una petita part passa 22 dies amb les pells', 'Fermentació espontània', 'Sulfurós mínim. Sense clarificar ni filtrar'] },
    quote: {
      en: 'If anything suits my Giró Ros, it’s years in the bottle.',
      es: 'Si algo le sienta bien a mi Giró Ros son los años en botella.',
      ca: 'Si alguna cosa li prova bé al meu Giró Ros, són els anys en ampolla.' } },
  { id: 'gn', col: 'suspects', name: 'GN', img: 'gn', colour: 'red', grape: 'Giró Negre',
    notes: {
      en: ['100% Giró Negre', 'From a young vineyard in Vilafranca de Bonany, on red clay and limestone', 'Organic grapes', 'No oak ageing'],
      es: ['100% Giró Negre', 'De una viña joven en Vilafranca de Bonany, sobre arcilla roja y caliza', 'Uva ecológica', 'Sin crianza'],
      ca: ['100% Giró Negre', 'D’una vinya jove a Vilafranca de Bonany, sobre argila vermella i calcària', 'Raïm ecològic', 'Sense criança'] } },
  { id: 'callet', col: 'suspects', name: 'Callet', img: 'callet', colour: 'red', grape: 'Callet',
    notes: {
      en: ['Callet, one of the island’s two great native reds', 'Spontaneous fermentation', 'Unfined, unfiltered'],
      es: ['Callet, una de las dos grandes tintas autóctonas de la isla', 'Fermentación espontánea', 'Sin clarificar ni filtrar'],
      ca: ['Callet, una de les dues grans negres autòctones de l’illa', 'Fermentació espontània', 'Sense clarificar ni filtrar'] },
    quote: {
      en: 'I’ve never made a 100% Callet again.',
      es: 'No he vuelto a hacer un Callet 100%.',
      ca: 'No he tornat a fer un Callet 100%.' } },
  { id: 'clarete', col: 'suspects', name: 'Clarete', img: 'clarete', colour: 'clarete', grape: 'Premsal · Gargollassa',
    notes: {
      en: ['90% white Premsal must, 10% red Gargollassa', 'Fermented together, skins and stems', 'Spontaneous fermentation, very little sulphur', 'Unfined, unfiltered'],
      es: ['90% mosto de Premsal blanca, 10% Gargollassa tinta', 'Fermentan juntas, con pieles y raspón', 'Fermentación espontánea, muy poco azufre', 'Sin clarificar ni filtrar'],
      ca: ['90% most de Premsal blanc, 10% Gargollassa negra', 'Fermenten juntes, amb pells i rapa', 'Fermentació espontània, molt poc sofre', 'Sense clarificar ni filtrar'] } },
  { id: 'p', col: 'suspects', name: 'P', img: 'premsal-2021', colour: 'white', grape: 'Premsal',
    notes: {
      en: ['100% Premsal', 'Proof that the grape can stand on its own', 'Spontaneous fermentation', 'Unfined, unfiltered'],
      es: ['100% Premsal', 'La prueba de que la uva se sostiene sola', 'Fermentación espontánea', 'Sin clarificar ni filtrar'],
      ca: ['100% Premsal', 'La prova que el raïm s’aguanta tot sol', 'Fermentació espontània', 'Sense clarificar ni filtrar'] },
    quote: {
      en: 'A grape I’ve heard my whole life has no quality on its own.',
      es: 'Es una variedad que llevo toda la vida escuchando que no tiene calidad por sí misma.',
      ca: 'És una varietat que fa tota la vida que sent dir que no té qualitat per si mateixa.' } },
  { id: 'p-orange', col: 'suspects', name: 'P Orange', img: 'orange', colour: 'orange', grape: 'Premsal',
    notes: {
      en: ['100% Premsal, fermented on its skins', 'All Premsal since 2019', 'A small production'],
      es: ['100% Premsal, fermentada con sus pieles', 'Solo Premsal desde 2019', 'Producción pequeña'],
      ca: ['100% Premsal, fermentat amb les pells', 'Només Premsal des de 2019', 'Producció petita'] } },
  { id: 'p-castano', col: 'suspects', name: 'P Castaño', img: 'premsal-castano', colour: 'white', grape: 'Premsal',
    notes: {
      en: ['Premsal aged in chestnut', 'The first chestnut barrels on the island', 'Spontaneous fermentation'],
      es: ['Premsal criada en castaño', 'Las primeras barricas de castaño de la isla', 'Fermentación espontánea'],
      ca: ['Premsal criat en castanyer', 'Les primeres bótes de castanyer de l’illa', 'Fermentació espontània'] } },
  { id: 'ancestral', col: 'suspects', name: 'Ancestral', img: 'ancestral-gargollasa', soldOut: true, colour: 'sparkling', grape: 'Gargollassa',
    notes: {
      en: ['Bottled while still fermenting, so it traps its own bubbles', 'No added sulphites', 'The first ancestral-method sparkling wine made in Mallorca'],
      es: ['Embotellado aún fermentando, atrapa sus propias burbujas', 'Sin sulfitos añadidos', 'El primer espumoso de método ancestral hecho en Mallorca'],
      ca: ['Embotellat encara fermentant, atrapa les seves pròpies bombolles', 'Sense sulfits afegits', 'El primer escumós de mètode ancestral fet a Mallorca'] } },

  /* ---------- Remi ---------- */
  { id: 'maneras', col: 'remi', name: 'Maneras de Vivir', img: 'maneras-de-vivir', colour: 'red', grape: { en: 'Native blend', es: 'Coupage autóctono', ca: 'Cupatge autòcton' }, abv: '11%', bottles: '1.000', tag: 'Remi “Wildbunch”',
    notes: {
      en: ['A blend of native varieties', 'No additions, no added sulphites', 'Unfined, unfiltered'],
      es: ['Coupage de variedades autóctonas', 'Sin añadidos, sin sulfitos añadidos', 'Sin clarificar ni filtrar'],
      ca: ['Cupatge de varietats autòctones', 'Sense afegits, sense sulfits afegits', 'Sense clarificar ni filtrar'] } },
  { id: 'tregua', col: 'remi', name: 'No Hay Tregua', img: 'no-hay-tregua', colour: 'white', grape: { en: 'Native whites', es: 'Blancas autóctonas', ca: 'Blanques autòctones' }, abv: '11%', bottles: '1.000', tag: 'Remi “Wildbunch”',
    notes: {
      en: ['Native white grapes, half of them Premsal', 'Spontaneous fermentation', 'No additions, no added sulphites', 'Unfined, unfiltered'],
      es: ['Uvas blancas autóctonas, la mitad Premsal', 'Fermentación espontánea', 'Sin añadidos, sin sulfitos añadidos', 'Sin clarificar ni filtrar'],
      ca: ['Raïm blanc autòcton, la meitat Premsal', 'Fermentació espontània', 'Sense afegits, sense sulfits afegits', 'Sense clarificar ni filtrar'] } },
  { id: 'banzai', col: 'remi', name: '¡Banzai!', img: 'banzai', colour: 'red', grape: 'Callet Negrella', abv: '11.5%', bottles: '900', tag: 'Remi Nº 3',
    notes: {
      en: ['100% Callet Negrella', 'The first single-variety Callet Negrella', 'No additions, no added sulphites', 'Unfined, unfiltered. A single edition'],
      es: ['100% Callet Negrella', 'El primer monovarietal de Callet Negrella', 'Sin añadidos, sin sulfitos añadidos', 'Sin clarificar ni filtrar. Edición única'],
      ca: ['100% Callet Negrella', 'El primer monovarietal de Callet Negrella', 'Sense afegits, sense sulfits afegits', 'Sense clarificar ni filtrar. Edició única'] } },

  /* ---------- Hada ---------- */
  { id: 'raining-snails', col: 'hada', name: 'Raining Snails', img: 'raining-snails', colour: 'white', grape: 'Vinater', abv: '11%',
    notes: {
      en: ['100% Vinater, a rare native white', 'From a young vineyard in Llubí', 'No additions, no added sulphites', 'Unfined, unfiltered'],
      es: ['100% Vinater, una blanca autóctona poco común', 'De una viña joven en Llubí', 'Sin añadidos, sin sulfitos añadidos', 'Sin clarificar ni filtrar'],
      ca: ['100% Vinater, un blanc autòcton poc comú', 'D’una vinya jove a Llubí', 'Sense afegits, sense sulfits afegits', 'Sense clarificar ni filtrar'] } },
  { id: 'hada', col: 'hada', name: 'Hada', colour: 'red', grape: 'Escursac', abv: '12.5%',
    notes: {
      en: ['100% Escursac', 'Half of it fermented in Mallorcan clay', 'No additions, no added sulphites', 'Unfined, unfiltered'],
      es: ['100% Escursac', 'La mitad fermentada en barro mallorquín', 'Sin añadidos, sin sulfitos añadidos', 'Sin clarificar ni filtrar'],
      ca: ['100% Escursac', 'La meitat fermentada en fang mallorquí', 'Sense afegits, sense sulfits afegits', 'Sense clarificar ni filtrar'] } },
  { id: 'roshada', col: 'hada', name: 'Roshada', colour: 'rose', grape: 'Escursac', abv: '11%', bottles: '1.300',
    notes: {
      en: ['100% Escursac', 'Spontaneous fermentation', 'Only a minimal dose of sulphite at bottling', 'Unfined, unfiltered'],
      es: ['100% Escursac', 'Fermentación espontánea', 'Solo una dosis mínima de sulfuroso al embotellar', 'Sin clarificar ni filtrar'],
      ca: ['100% Escursac', 'Fermentació espontània', 'Només una dosi mínima de sulfurós a l’embotellar', 'Sense clarificar ni filtrar'] } },
  { id: 'clorange', col: 'hada', name: 'Clorange', colour: 'clorange', grape: 'Giró Ros · Mantonegro', abv: '11%', bottles: '520',
    notes: {
      en: ['Giró Ros and Mantonegro, fermented together on their skins', 'Picked by hand in the second week of August', 'Three rackings off the fine lees', 'Bottled by gravity, unfiltered'],
      es: ['Giró Ros y Mantonegro, fermentadas juntas con sus pieles', 'Vendimiada a mano la segunda semana de agosto', 'Tres trasiegos sobre lías finas', 'Embotellada por gravedad, sin filtrar'],
      ca: ['Giró Ros i Mantonegro, fermentats junts amb les pells', 'Verema a mà la segona setmana d’agost', 'Tres trasbalsos sobre mares fines', 'Embotellat per gravetat, sense filtrar'] } }
];

/* The native grapes. rgb tints paint the watercolour clusters. */
window.SV_GRAPES = [
  { name: 'Gargollassa', aka: 'Gorgollassa', rgb: [64, 28, 58],
    en: 'The emblem of the winery, brought back from three vines. Strawberry tree, sloe, myrtle, violets.',
    es: 'El emblema de la bodega, recuperada de tres cepas. Madroño, endrina, mirto, violetas.',
    ca: 'L’emblema del celler, recuperat de tres ceps. Arboç, aranyó, murta, violetes.' },
  { name: 'Premsal', aka: 'Prensal · Moll', rgb: [178, 172, 92],
    en: 'Called Moll in Es Raiger, where it grows best, in deep red clay. Fresh pear and fennel. For generations people said it could never make a good wine on its own.',
    es: 'En Es Raiger, donde mejor se da, en arcilla roja y profunda, la llaman Moll. Pera fresca e hinojo. Durante generaciones se dijo que sola nunca daría un buen vino.',
    ca: 'A Es Raiger, on millor s’hi fa, en el call vermell, li diuen Moll. Pera fresca i fonoll. Durant generacions es va dir que tota sola mai no faria un bon vi.' },
  { name: 'Escursac', aka: '', rgb: [46, 22, 52],
    en: 'Thin skin, deep colour: black plum, ripe cherry, a hint of mocha. Almost gone a few years ago; now new vineyards are being planted.',
    es: 'Piel fina, color intenso: ciruela negra, cereza madura, un punto de moca. Hace pocos años casi no quedaba; ahora se plantan viñas nuevas.',
    ca: 'Pell fina, color intens: pruna negra, cirera madura, un punt de moca. Fa pocs anys gairebé no en quedava; ara se’n planten vinyes noves.' },
  { name: 'Callet Negrella', aka: 'Callet de Cas Concos', rgb: [168, 58, 74],
    en: 'Always called Callet de Cas Concos, after the village where it grows. Cherry, tropical fruit, herbs. Single-variety wines of it are very rare.',
    es: 'Siempre se ha llamado Callet de Cas Concos, por el pueblo donde crece. Cereza, fruta tropical, hierbas. Los monovarietales son rarísimos.',
    ca: 'Sempre s’ha dit Callet de Cas Concos, pel poble on creix. Cirera, fruita tropical, herbes. Els monovarietals són raríssims.' },
  { name: 'Giró Ros', aka: '', rgb: [206, 160, 112],
    en: 'A white grape that rewards patience. Carlos says years in the bottle suit it best.',
    es: 'Una blanca que premia la paciencia. Carlos dice que lo que mejor le sienta son los años en botella.',
    ca: 'Un blanc que premia la paciència. En Carlos diu que el que més li prova són els anys en ampolla.' },
  { name: 'Giró Negre', aka: '', rgb: [92, 30, 48],
    en: 'The red Giró. GN comes from a young vineyard of it in Vilafranca de Bonany.',
    es: 'El Giró tinto. GN sale de una viña joven en Vilafranca de Bonany.',
    ca: 'El Giró negre. GN surt d’una vinya jove a Vilafranca de Bonany.' },
  { name: 'Mantonegro', aka: 'Manto Negro', rgb: [104, 32, 50],
    en: 'The most planted of the island’s native reds. Part of the first Mallorcan clarete, and of Clorange.',
    es: 'La más plantada de las tintas autóctonas de la isla. Está en el primer clarete mallorquín y en Clorange.',
    ca: 'La més plantada de les negres autòctones de l’illa. És al primer clarete mallorquí i a Clorange.' },
  { name: 'Callet', aka: '', rgb: [132, 36, 52],
    en: 'One of the island’s two great native reds.',
    es: 'Una de las dos grandes tintas autóctonas de la isla.',
    ca: 'Una de les dues grans negres autòctones de l’illa.' },
  { name: 'Vinater', aka: '', rgb: [192, 176, 98],
    en: 'A rare native white. Hada makes Raining Snails from it, from a young vineyard in Llubí.',
    es: 'Una blanca autóctona poco común. Hada hace con ella Raining Snails, de una viña joven en Llubí.',
    ca: 'Un blanc autòcton poc comú. L’Hada en fa Raining Snails, d’una vinya jove a Llubí.' },
  { name: 'Malvasia', aka: 'de Banyalbufar', rgb: [206, 170, 86],
    en: 'From the sea terraces of Banyalbufar. Selva Vins has made it naturally sweet, in chestnut.',
    es: 'De las terrazas sobre el mar de Banyalbufar. Selva Vins la ha hecho dulce natural, en castaño.',
    ca: 'De les marjades sobre la mar de Banyalbufar. Selva Vins l’ha feta dolça natural, en castanyer.' }
];

