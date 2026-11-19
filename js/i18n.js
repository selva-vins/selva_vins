/* Catalan and Spanish. English is the text already in the HTML; it is read from the
   page on load so switching back costs nothing. Keys match data-i18n attributes. */

window.SV_I18N = (function () {
  const dict = {
    es: {
      'skip': 'Saltar al contenido',
      'nav.wines': 'Los vinos', 'nav.grapes': 'Las uvas', 'nav.family': 'La familia', 'nav.visit': 'Visítanos',
      'nav.order': 'Pedir vino', 'nav.menu': 'Menú',
      'hero.tag': 'Uvas autóctonas, con respeto y honestidad.',
      'hero.place': 'Selva · Serra de Tramuntana',
      'selva.label': 'Selva',
      'selva.text': 'Una bodega diminuta en el pueblo de Selva, al pie de la Tramuntana. Vinos sinceros con carácter propio, de las uvas autóctonas de la isla: muchas de ellas viejas, algunas casi perdidas.',
      'selva.caption': 'Selva, con la Serra de Tramuntana detrás.',
      'selva.aside': 'Entre el llano de Inca y la montaña, en la carretera que sube a Lluc.',
      'family.label': 'La familia',
      'family.title': 'Veintiún años en las viñas de otros. Después, la suya.',
      'family.body': 'Carlos Rodríguez Furthmann pasó unos veinte años trabajando viñas y bodegas de la isla para otros. Selva Vins es donde por fin hace el vino a su manera: con total libertad para dejar que las uvas hablen.',
      'family.carlos': 'El alma de Selva Vins. Viña, bodega, papeles y repartos.',
      'family.barbara': 'La mano derecha de Carlos. Sin su ayuda y su apoyo incondicional, Selva Vins no existiría.',
      'family.hada': 'Ayuda en todo lo que hay que hacer en la bodega y, desde hace unos años, elabora aquí sus propios vinos. El presente y el futuro de Selva Vins.',
      'pc.1': 'Otoño, bajo la montaña.', 'pc.2': 'El letrero de la puerta.', 'pc.3': 'Los sospechosos habituales, fuera de servicio.',
      'pc.4': 'Paredes de piedra seca y viña.', 'pc.5': 'Carlos, y los vinos del año.',
      'method.label': 'Cómo se hace',
      'method.sub': 'Lo pone en la etiqueta.',
      'method.out': 'Lo que no lleva',
      'method.o1': 'Levaduras comerciales', 'method.o2': 'Correcciones de acidez', 'method.o3': 'Enzimas',
      'method.o4': 'Nutrientes', 'method.o5': 'Clarificantes', 'method.o6': 'Filtrado', 'method.o7': 'Bombas',
      'method.in': 'Lo que sí lleva',
      'method.i1': 'Uvas autóctonas de Mallorca', 'method.i2': 'Su propia fermentación espontánea',
      'method.i3': 'Tiempo', 'method.i4': 'Una pizca de azufre, como mucho*',
      'method.note': '*Solo una dosis muy baja, para que el vino te llegue en buen estado. Muchas botellas no llevan nada.',
      'step.1t': 'A mano', 'step.1': 'Vendimiado a mano en cajas de 15 kilos.',
      'step.2t': 'Racimo a racimo', 'step.2': 'Seleccionado en la bodega: fuera hojas, piedrecitas y cualquier uva que no esté en buen estado.',
      'step.3t': 'Arranca sola', 'step.3': 'Fermentación espontánea. Sin levaduras añadidas, sin correcciones.',
      'step.4t': 'Acero, barro o castaño', 'step.4': 'Acero inoxidable, barro mallorquín o madera de castaño: lo que pida cada vino.',
      'step.5t': 'Tiempo sobre lías', 'step.5': 'Meses sobre lías finas, trasegado a mano, y vuelta a trasegar.',
      'step.6t': 'Por gravedad', 'step.6': 'Embotellado por gravedad, sin bombas. Sin filtrar. Tapado y etiquetado a mano.',
      'firsts.label': 'Primeros',
      'firsts.1': '<em>El primer</em> espumoso ancestral de Mallorca.',
      'firsts.2': '<em>El primer</em> clarete mallorquín.',
      'firsts.3': '<em>Las primeras</em> barricas de castaño de la isla.',
      'firsts.coda': 'Atrevidos entonces. Mallorquines siempre.',
      'wines.label': 'Los vinos',
      'natives.line': 'Las uvas de la isla.',
      'natives.sub': 'Selva Vins ha apostado por las variedades autóctonas de Mallorca, algunas casi perdidas.',
      'suspects.kicker': 'Els sospitosos habituals',
      'suspects.title': 'Los sospechosos habituales',
      'suspects.copy': 'La línea Selva Vins. Las mismas caras cada año, nunca exactamente el mismo vino. Señala uno de la rueda de reconocimiento.',
      'remi.copy': 'Los ruidosos. Uvas autóctonas, sin añadidos, sin sulfitos añadidos, sin clarificar, sin filtrar. Y etiquetas a juego.',
      'hada.title': 'Los vinos de Hada',
      'hada.copy': 'Desde hace unos años, Hada elabora sus propios vinos en la bodega familiar. El presente y el futuro de Selva Vins.',
      'vines.label': 'Las uvas',
      'vines.1': 'Antes de la filoxera, la Gargollassa era la tinta más plantada de Es Raiger, el llano al pie de estas montañas. Sus vinos ganaban premios fuera.',
      'vines.2': 'Después de la plaga fue desapareciendo, hasta que se la dio por extinta.',
      'vines.3big': 'Tres cepas.',
      'vines.3': 'Entonces aparecieron tres plantas en una viña. De esas tres, la variedad volvió.',
      'vines.4': 'Hoy la Gargollassa es el emblema de Selva Vins. Es la uva de Gargo.',
      'vines.see': 'Conoce Gargo',
      'plate.cap': '<em>Vitis vinifera</em>, de Köhler’s <em>Medizinal-Pflanzen</em>, 1887–1898',
      'aroma.1': 'madroño', 'aroma.2': 'endrina', 'aroma.3': 'escaramujo', 'aroma.4': 'mirto',
      'aroma.5': 'enebro', 'aroma.6': 'hierbas de monte', 'aroma.7': 'pimienta rosa', 'aroma.8': 'violetas',
      'cast.title': 'El resto del reparto',
      'cast.lede': 'Las uvas propias de Mallorca. Algunas las conoce todo el mundo; otras casi nadie las cultiva.',
      'visit.label': 'Visítanos',
      'visit.sub': 'Bébelo donde se hace.',
      'visit.body': 'La sala de vinos de la bodega, en Selva: vino natural por copas o por botellas, pa amb oli y helado artesano. Para las catas, mejor reservar, así hay tiempo para preguntas.',
      'visit.pa': 'Pa amb oli de tres maneras: <em>Tramuntana</em>, <em>Mayurqa</em> y <em>Myotragus</em>.',
      'visit.directions': 'Cómo llegar',
      'map.serra': 'Serra de Tramuntana', 'map.raiger': 'Es Raiger', 'map.palma': 'Palma, a unos 35 km',
      'map.pla': 'Es Pla', 'map.bay': 'Badia de Palma', 'map.sea': 'Mar Mediterrània',
      'atlas.title': 'Mallorca: la sala de vinos en Selva, la viña propia de Selva Vins y los viticultores a quienes compra la uva',
      'key.selva': 'Gargo Wineroom, en la bodega. Vino por copas, pa amb oli y habitaciones para quedarse a dormir.',
      'key.estellencs': 'Su propia parcela sobre el mar, plantada e injertada por Carlos para las próximas añadas.',
      'key.llubi': 'Vinater y Callet Negrella, para los vinos de Hada.',
      'key.vilafranca': 'Giró Negre sobre arcilla roja, para el GN.',
      'key.manacor': 'Callet.', 'key.felanitx': 'Premsal.', 'key.pollenca': 'Premsal.',
      'key.inca': 'Donde aparecieron tres cepas de Gargollassa en el año 2000.',
      'key.note': 'Uva de viticultores ecológicos de toda la isla, casi todos amigos.',
      'foot.big': 'Vinos sinceros.',
      'foot.find': 'Dónde estamos', 'foot.talk': 'Hablemos', 'foot.elsewhere': 'En otros sitios',
      'foot.dist': 'En España, a través de Dejàvins.',
      'foot.photos': 'Fotografías y etiquetas: Selva Vins',
      'sheet.close': 'Cerrar', 'contact.write': 'Escríbenos', 'contact.email': 'Email', 'contact.copy': 'Copiar', 'contact.open': 'Abrir'
    },
    ca: {
      'skip': 'Salta al contingut',
      'nav.wines': 'Els vins', 'nav.grapes': 'Els raïms', 'nav.family': 'La família', 'nav.visit': 'Visita’ns',
      'nav.order': 'Demana vi', 'nav.menu': 'Menú',
      'hero.tag': 'Raïm autòcton, amb respecte i honestedat.',
      'hero.place': 'Selva · Serra de Tramuntana',
      'selva.label': 'Selva',
      'selva.text': 'Un celler petitíssim al poble de Selva, als peus de la Tramuntana. Vins sincers amb caràcter propi, fets amb els raïms autòctons de l’illa: molts, vells; alguns, gairebé perduts.',
      'selva.caption': 'Selva, amb la Serra de Tramuntana al darrere.',
      'selva.aside': 'Entre el pla d’Inca i la muntanya, a la carretera que puja a Lluc.',
      'family.label': 'La família',
      'family.title': 'Vint-i-un anys a les vinyes dels altres. Després, la seva.',
      'family.body': 'En Carlos Rodríguez Furthmann va passar uns vint anys treballant vinyes i cellers de l’illa per a altres. Selva Vins és on per fi fa el vi a la seva manera: amb llibertat total perquè els raïms parlin.',
      'family.carlos': 'L’ànima de Selva Vins. Vinya, celler, papers i repartiment.',
      'family.barbara': 'La mà dreta d’en Carlos. Sense la seva ajuda i el seu suport incondicional, Selva Vins no existiria.',
      'family.hada': 'Ajuda en tot el que cal fer al celler i, des de fa uns anys, hi elabora els seus propis vins. El present i el futur de Selva Vins.',
      'pc.1': 'Tardor, davall la muntanya.', 'pc.2': 'El rètol de la porta.', 'pc.3': 'Els sospitosos habituals, fora de servei.',
      'pc.4': 'Parets de pedra en sec i vinya.', 'pc.5': 'En Carlos, i els vins de l’any.',
      'method.label': 'Com es fa',
      'method.sub': 'Només raïm, res més. Ho diu l’etiqueta.',
      'method.out': 'El que no hi ha',
      'method.o1': 'Llevats comercials', 'method.o2': 'Correccions d’acidesa', 'method.o3': 'Enzims',
      'method.o4': 'Nutrients', 'method.o5': 'Clarificants', 'method.o6': 'Filtratge', 'method.o7': 'Bombes',
      'method.in': 'El que sí que hi ha',
      'method.i1': 'Raïm autòcton de Mallorca', 'method.i2': 'La seva pròpia fermentació espontània',
      'method.i3': 'Temps', 'method.i4': 'Un pessic de sofre, com a molt*',
      'method.note': '*Només una dosi molt baixa, perquè el vi t’arribi en bon estat. Moltes ampolles no en duen gens.',
      'step.1t': 'A mà', 'step.1': 'Verema a mà, en caixes de 15 quilos.',
      'step.2t': 'Raïm a raïm', 'step.2': 'Triat al celler: fora fulles, pedretes i qualsevol gra que no estigui en bon estat.',
      'step.3t': 'Arrenca tota sola', 'step.3': 'Fermentació espontània. Sense llevats afegits, sense correccions.',
      'step.4t': 'Acer, fang o castanyer', 'step.4': 'Acer inoxidable, fang mallorquí o fusta de castanyer: el que demani cada vi.',
      'step.5t': 'Temps sobre mares', 'step.5': 'Mesos sobre mares fines, trasbalsat a mà, i tornat a trasbalsar.',
      'step.6t': 'Per gravetat', 'step.6': 'Embotellat per gravetat, sense bombes. Sense filtrar. Tapat i etiquetat a mà.',
      'firsts.label': 'Primers',
      'firsts.1': '<em>El primer</em> escumós ancestral de Mallorca.',
      'firsts.2': '<em>El primer</em> clarete mallorquí.',
      'firsts.3': '<em>Les primeres</em> bótes de castanyer de l’illa.',
      'firsts.coda': 'Agosarats llavors. Mallorquins sempre.',
      'wines.label': 'Els vins',
      'natives.line': 'Els raïms de l’illa.',
      'natives.sub': 'Selva Vins ha apostat per les varietats autòctones de Mallorca, algunes gairebé perdudes.',
      'suspects.kicker': 'La línia Selva Vins',
      'suspects.title': 'Els sospitosos habituals',
      'suspects.copy': 'Les mateixes cares cada any, mai exactament el mateix vi. Assenyala’n un de la filera.',
      'remi.copy': 'Els sorollosos. Raïm autòcton, sense afegits, sense sulfits afegits, sense clarificar, sense filtrar. I etiquetes a joc.',
      'hada.title': 'Els vins de l’Hada',
      'hada.copy': 'Des de fa uns anys, l’Hada elabora els seus propis vins al celler familiar. El present i el futur de Selva Vins.',
      'vines.label': 'Els raïms',
      'vines.1': 'Abans de la fil·loxera, la Gargollassa era la negra més plantada d’Es Raiger, el pla als peus d’aquestes muntanyes. Els seus vins guanyaven premis a fora.',
      'vines.2': 'Després de la plaga va anar desapareixent, fins que la varen donar per extingida.',
      'vines.3big': 'Tres ceps.',
      'vines.3': 'Llavors varen aparèixer tres plantes en una vinya. D’aquelles tres, la varietat va tornar.',
      'vines.4': 'Avui la Gargollassa és l’emblema de Selva Vins. És el raïm del Gargo.',
      'vines.see': 'Coneix el Gargo',
      'plate.cap': '<em>Vitis vinifera</em>, de Köhler’s <em>Medizinal-Pflanzen</em>, 1887–1898',
      'aroma.1': 'arboç', 'aroma.2': 'aranyó', 'aroma.3': 'gavarrera', 'aroma.4': 'murta',
      'aroma.5': 'ginebre', 'aroma.6': 'herbes de muntanya', 'aroma.7': 'pebre rosa', 'aroma.8': 'violetes',
      'cast.title': 'La resta del repartiment',
      'cast.lede': 'Els raïms propis de Mallorca. Alguns els coneix tothom; d’altres, gairebé ningú no els conrea.',
      'visit.label': 'Visita’ns',
      'visit.sub': 'Beu-lo on es fa.',
      'visit.body': 'La sala de vins del celler, a Selva: vi natural per copes o per ampolles, pa amb oli i gelat artesà. Per als tasts, millor reservar, així hi ha temps per a preguntes.',
      'visit.pa': 'Pa amb oli de tres maneres: <em>Tramuntana</em>, <em>Mayurqa</em> i <em>Myotragus</em>.',
      'visit.directions': 'Com arribar-hi',
      'map.serra': 'Serra de Tramuntana', 'map.raiger': 'Es Raiger', 'map.palma': 'Palma, a uns 35 km',
      'map.pla': 'Es Pla', 'map.bay': 'Badia de Palma', 'map.sea': 'Mar Mediterrània',
      'atlas.title': 'Mallorca: la sala de vins a Selva, la vinya pròpia de Selva Vins i els pagesos a qui compra el raïm',
      'key.selva': 'Gargo Wineroom, al celler. Vi per copes, pa amb oli i habitacions per quedar-s’hi a dormir.',
      'key.estellencs': 'La seva pròpia parcel·la damunt la mar, plantada i empeltada per en Carlos per a les properes collites.',
      'key.llubi': 'Vinater i Callet Negrella, per als vins de l’Hada.',
      'key.vilafranca': 'Giró Negre sobre call vermell, per al GN.',
      'key.manacor': 'Callet.', 'key.felanitx': 'Premsal.', 'key.pollenca': 'Premsal.',
      'key.inca': 'On aparegueren tres ceps de Gargollassa l’any 2000.',
      'key.note': 'Raïm de pagesos ecològics de tota l’illa, gairebé tots amics.',
      'foot.big': 'Vins sincers.',
      'foot.find': 'On som', 'foot.talk': 'Parlem', 'foot.elsewhere': 'A altres llocs',
      'foot.dist': 'A Espanya, a través de Dejàvins.',
      'foot.photos': 'Fotografies i etiquetes: Selva Vins',
      'sheet.close': 'Tanca', 'contact.write': 'Escriu-nos', 'contact.email': 'Email', 'contact.copy': 'Copia', 'contact.open': 'Obre'
    }
  };

  const ui = {
    en: { grape: 'Grape', style: 'Style', abv: 'Alcohol', bottles: 'Bottles',
          cols: { suspects: 'The Usual Suspects', remi: 'Remi', hada: 'Hada’s wines' },
          see: 'See the wine', soldOut: 'Sold out', status: 'Status', askNext: 'Ask about the next bottling', ask: 'Ask for a bottle',
          contact: {
            general: { kicker: 'Selva Vins', title: 'Write to us.', lede: 'Email or Instagram, whichever you prefer. Questions, visits, tastings, all welcome.' },
            order: { kicker: 'Order wine', title: 'Ordering is a conversation.', lede: 'There’s no shop here. Write to us by email or on Instagram, tell us what you’d like, and we’ll tell you what is available.' },
            wine: { title: 'Ask for a bottle.', lede: 'Write to us about {w} by email or on Instagram, and we’ll tell you what’s left and how to get it.' },
            soldOut: { title: 'This one is gone.', lede: '{w} is sold out. Write to us by email or on Instagram and we’ll let you know when the next bottling is ready.' },
            copied: 'Copied' } },
    es: { grape: 'Uva', style: 'Estilo', abv: 'Alcohol', bottles: 'Botellas',
          cols: { suspects: 'Los sospechosos habituales', remi: 'Remi', hada: 'Los vinos de Hada' },
          see: 'Ver el vino', soldOut: 'Agotado', status: 'Estado', askNext: 'Pregunta por el próximo embotellado', ask: 'Pide una botella',
          contact: {
            general: { kicker: 'Selva Vins', title: 'Escríbenos.', lede: 'Por email o por Instagram, como prefieras. Preguntas, visitas, catas: todo es bienvenido.' },
            order: { kicker: 'Pedir vino', title: 'Pedir vino es una conversación.', lede: 'Aquí no hay tienda. Escríbenos por email o por Instagram, dinos qué te apetece y te contamos qué hay disponible.' },
            wine: { title: 'Pide una botella.', lede: 'Escríbenos sobre {w} por email o por Instagram y te diremos cuántas quedan y cómo conseguirlas.' },
            soldOut: { title: 'Este ya se acabó.', lede: '{w} está agotado. Escríbenos por email o por Instagram y te avisamos cuando esté listo el próximo embotellado.' },
            copied: 'Copiado' } },
    ca: { grape: 'Raïm', style: 'Estil', abv: 'Alcohol', bottles: 'Ampolles',
          cols: { suspects: 'Els sospitosos habituals', remi: 'Remi', hada: 'Els vins de l’Hada' },
          see: 'Mira el vi', soldOut: 'Exhaurit', status: 'Estat', askNext: 'Pregunta pel proper embotellat', ask: 'Demana una ampolla',
          contact: {
            general: { kicker: 'Selva Vins', title: 'Escriu-nos.', lede: 'Per email o per Instagram, com prefereixis. Preguntes, visites, tasts: tot és benvingut.' },
            order: { kicker: 'Demana vi', title: 'Demanar vi és una conversa.', lede: 'Aquí no hi ha botiga. Escriu-nos per email o per Instagram, digues-nos què et ve de gust i t’explicarem què hi ha disponible.' },
            wine: { title: 'Demana una ampolla.', lede: 'Escriu-nos sobre el {w} per email o per Instagram i et direm quantes en queden i com aconseguir-les.' },
            soldOut: { title: 'Aquest ja s’ha acabat.', lede: 'El {w} està exhaurit. Escriu-nos per email o per Instagram i t’avisarem quan estigui llest el proper embotellat.' },
            copied: 'Copiat' } }
  };

  const en = {};
  let lang = 'en';

  function pick() {
    let stored = null;
    try { stored = localStorage.getItem('sv-lang'); } catch (e) { /* private mode */ }
    if (stored && (stored === 'en' || dict[stored])) return stored;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return dict[nav] ? nav : 'en';
  }

  function apply(next) {
    lang = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!(key in en)) en[key] = el.innerHTML;
      const value = next === 'en' ? en[key] : dict[next][key];
      if (value != null && el.innerHTML !== value) el.innerHTML = value;
    });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
    try { localStorage.setItem('sv-lang', next); } catch (e) { /* ignore */ }
  }

  function t(v) { return v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.en) : v; }

  return {
    init() { apply(pick()); },
    apply,
    t,
    get lang() { return lang; },
    get ui() { return ui[lang]; }
  };
})();
