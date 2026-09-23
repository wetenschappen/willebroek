/**
 * Kleur van Donkere Lichamen & Themasynthese Optica - Fysica 3
 * Vak: Fysica (2u) | Klas: 3NAWE+3SPOWE
 * Thema 1: Blinding lights (Optische fenomenen) | Hoofdstuk 5: Les 2/2 & Grote Check-out
 * Leerplan GO!: WD2_11.01.01, WD2_11.01.02, CD11.01.06
 */

export default {
    id: 'fys3-m01-l13-kleur-donkere-lichamen',
    subject: 'physics',
    className: '3NAWE + 3SPOWE',
    title: 'Kleur van Donkere Lichamen & Themasynthese',
    description: 'Het ontstaan van kleur door selectieve absorptie en weerkaatsing van licht, de invloed van gekleurd licht, filterwerking en de integrale eindsynthese van Thema 1 (Optische fenomenen).',

    config: {
        groenCode: 'F3M01L13',
        groenAntwoord: 'fysica',
        masterCode: 'wetenschappen',
        classId: '3NAWE+3SPOWE',
        textbook: 'WACO 3 Fysica 2u'
    },

    goals: [
        'Ik kan verklaren dat de kleur van een donker lichaam ontstaat doordat het bepaalde spectralkleuren selectief weerkaatst en de andere absorbeert.',
        'Ik begrijp waarom een wit lichaam alle kleuren diffuus weerkaatst en een zwart lichaam alle invallende kleuren absorbeert.',
        'Ik kan nauwkeurig voorspellen welke kleur een voorwerp vertoont wanneer het met monochromatisch gekleurd licht (rood, groen of blauw) wordt beschenen.',
        'Ik beheers de complete, overkoepelende synthese van Thema 1: lichtbronnen, schaduwen, spiegels, breking, lenzen en kleurentheorie.'
    ],

    workbook: {
        title: 'Leerwerkboek WACO 3',
        subtitle: 'Thema 1: Optische fenomenen - Hoofdstuk 5 (p. 83, 85-88)',
        instruction: '<p>Bestudeer in je leerwerkboek <strong>pagina 83 en 85</strong> (de proef met de rode puntpaprika onder wit en groen licht). Vul het syntheseoverzicht en de <em>Leren leren</em>-thematabel op <strong>pagina 86 t.e.m. 88</strong> in ter voorbereiding op de grote thema-evaluatie over Optica.</p>',
        formulaHint: 'Gouden Kleurenregel: Een donker lichaam kan enkel de kleuren weerkaatsen die aanwezig zijn in het opvallende licht én die het materiaal niet absorbeert. Ontvangt een lichaam niet de kleur die het kan weerkaatsen, dan ziet het lichaam zwart!'
    },

    timeline: {
        stepA: {
            step: 'A', title: 'Instap', time: '15 min',
            cards: [
                {
                    id: 'card-entry',
                    type: 'digital',
                    title: 'Diagnostische Toets',
                    description: '4 vragen over lichtabsorptie, reflectie en kleurwaarneming.',
                    action: 'entry-ticket',
                    icon: 'PhQuestion'
                },
                {
                    id: 'card-pres-a',
                    type: 'class',
                    title: 'Inleidende Instructie',
                    description: 'De rode paprika die plots pikzwart wordt onder een groene lamp!',
                    action: 'presentation',
                    slidesKey: 'slidesA'
                }
            ]
        },

        stepB: {
            step: 'B', title: 'Verwerken', time: '30 min',
            cards: [
                {
                    id: 'card-pres-b',
                    type: 'class',
                    title: 'Theorie & Eindsynthese',
                    description: 'Selectieve absorptie, filterwerking en de grote samenvatting van alle 5 hoofdstukken.',
                    action: 'presentation',
                    slidesKey: 'slidesB'
                },
                {
                    id: 'card-workbook',
                    type: 'paper',
                    title: 'Boek Oefeningen',
                    description: 'Eindoefeningen en Leren-leren synthese WACO 3 p. 85-88.',
                    action: 'workbook',
                    icon: 'PhBookOpen'
                },
                {
                    id: 'card-activity',
                    type: 'digital',
                    title: 'Interactief lab: optische themasynthese',
                    description: 'Verken lenzen, spiegels en breking in de virtuele optica-omgeving.',
                    action: 'activity',
                    activityId: 'main',
                    icon: 'PhGauge'
                }
            ],
            extraActivities: [
                {
                    id: 'extramatching',
                    title: 'Kleur onder Gekleurd Licht',
                    category: 'Extra Uitdaging',
                    icon: 'PhArrowsClockwise'
                },
                {
                    id: 'extraquiz',
                    title: 'Grote Thema 1 Check-out Quiz',
                    category: 'Verdieping',
                    icon: 'PhLightbulb'
                }
            ]
        },

        stepC: {
            step: 'C', title: 'Afsluiting', time: '5 min',
            cards: [
                {
                    id: 'card-pres-c',
                    type: 'class',
                    title: 'Grote Thema-Check',
                    description: 'Misconcepties ontkracht en succesvolle afsluiting van Thema 1.',
                    action: 'presentation',
                    slidesKey: 'slidesC'
                },
                {
                    id: 'card-exit',
                    type: 'digital',
                    title: 'Exit Ticket',
                    description: '4 formatieve vragen over paprika-proef, filters en themasynthese.',
                    action: 'exit-ticket',
                    icon: 'PhTarget'
                }
            ]
        }
    },

    activities: {
        main: {
            type: 'opticsLab',
            defaultMode: 'lens'
        },
        extramatching: {
            type: 'dragDrop',
            title: 'Kleurwaarneming onder Gekleurde Lampen',
            instruction: 'Koppel de verlichtingssituatie aan de waargenomen kleur van het voorwerp.',
            pairs: [
                { term: 'Rode tomaat onder groen licht', definition: 'Ziet er diepzwart uit (groen licht wordt volledig geabsorbeerd, geen rood aanwezig)' },
                { term: 'Wit laken onder blauw podiumlicht', definition: 'Ziet er helderblauw uit (wit materiaal weerkaatst alle invallende kleuren)' },
                { term: 'Zwarte jas onder fel wit zonlicht', definition: 'Blijft gitzwart (zwart pigment absorbeert alle 7 spectralkleuren en warmt op)' },
                { term: 'Groen blad door een rood filterglas', definition: 'Lijkt zwart (rood filterglas blokkeert het gereflecteerde groene licht)' }
            ]
        },
        extraquiz: {
            type: 'mixedRetrieval',
            title: 'Grote Thema 1 Check-out Quiz',
            questions: [
                {
                    q: 'Waarom heeft een voorwerp eigenlijk géén "inherente" kleur van zichzelf?',
                    a: [
                        'Omdat kleur ontstaat door welke golflengten uit het invallende licht door het materiaal worden weerkaatst naar onze ogen.',
                        'Omdat kleur alleen bestaat in de verbeelding van de natuurkundige.',
                        'Omdat voorwerpen in het donker oplossen.',
                        'Omdat atomen voortdurend van kleur veranderen.'
                    ],
                    c: 0
                },
                {
                    q: 'Welke combinatie van beeldkenmerken hoort bij het spiegelbeeld van een vlakke spiegel?',
                    a: [
                        'Virtueel, rechtopstaand, even groot als het voorwerp, symmetrisch achter het spiegeloppervlak (db = dv) en lateraal verwisseld.',
                        'Reëel, ondersteboven en sterk vergroot.',
                        'Virtueel, ondersteboven en twee keer zo klein.',
                        'Reëel, rechtopstaand en oneindig ver weg.'
                    ],
                    c: 0
                },
                {
                    q: 'Wanneer een lichtstraal overgaat van water (optisch dichter) naar lucht (optisch minder dicht), wat gebeurt er dan met de straal?',
                    a: [
                        'Zij breekt van de normaal weg (brekingshoek r is groter dan invalshoek i).',
                        'Zij breekt naar de normaal toe (r < i).',
                        'Zij buigt altijd onder een hoek van 90° af.',
                        'Zij stopt met voortplanten.'
                    ],
                    c: 0
                }
            ]
        }
    },

    slidesA: [
        {
            layout: 'title',
            title: 'Kleur van Donkere Lichamen & Themasynthese',
            subtitle: 'Selectieve absorptie, filterwerking en de grote afronding van Thema 1 (Optica)',
            badge: 'Fysica 3 - Hoofdstuk 5 (Les 2/2)',
            icon: 'eye'
        },
        {
            layout: 'steps',
            title: 'Wat onderzoek je in deze finale les?',
            steps: [
                { icon: 'eye', text: 'Ontdekken hoe de kleur van donkere lichamen ontstaat door selectieve absorptie en weerkaatsing.' },
                { icon: 'eye', text: 'Verklaren waarom een voorwerp van kleur kan veranderen wanneer het belicht wordt met gekleurd licht.' },
                { icon: 'eye', text: 'Het effect van kleurfilters en de werking van de lichtreceptoren (kegeltjes) in het menselijk oog begrijpen.' },
                { icon: 'eye', text: 'De complete syntheselijn van Thema 1 (lichtbronnen, spiegels, breking, lenzen en kleuren) overzien en beheersen.' }
            ]
        },
        {
            layout: 'predict',
            title: 'De Vreemde Paprika-Paradox (WACO 3 p. 83)',
            question: 'Je legt een knalrode puntpaprika op tafel in een donkere kamer. Eerst schijn je erop met een witte zaklamp: de paprika is prachtig rood. Vervolgens doe je een zuiver groene theaterlamp aan. Welke kleur heeft de paprika nu?',
            hint: 'Denk aan welke spectralkleuren aanwezig zijn in het groene licht en welke kleuren de paprika kan weerkaatsen.',
            revealText: 'De paprika ziet er diepzwart uit! Omdat de rode paprika enkel rood licht kan weerkaatsen en alle andere kleuren absorbeert, absorbeert hij het groene licht volledig. Omdat er geen rood licht op valt, wordt er niets naar je oog gekaatst. Resultaat: de paprika oogt gitzwart!'
        }
    ],

    slidesB: [
        {
            layout: 'definition',
            term: 'Kleur van Donkere Lichamen',
            definition: 'Een donker lichaam (zoals fruit, kleding of een muur) produceert zelf geen zichtbaar licht. De waargenomen kleur wordt bepaald door de kleuren uit het opvallende licht die het materiaal **weerkaatst**. Alle andere spectralkleuren worden door de pigmentmoleculen **geabsorbeerd** (omgezet in thermische energie). We zeggen dus wel "de pet is rood", maar wetenschappelijk correct is: "de pet ziet rood onder wit licht omdat ze enkel de rode component weerkaatst".'
        },
        {
            layout: 'steps',
            title: 'Wit, Zwart en Gekleurde Voorwerpen',
            steps: [
                { icon: 'eye', text: '**Wit voorwerp:** Weerkaatst álle opvallende spectralkleuren diffuus. Onder wit licht ziet het wit; onder rood licht ziet het rood; onder blauw licht ziet het blauw!' },
                { icon: 'eye', text: '**Zwart voorwerp:** Absorbeert álle opvallende spectralkleuren. Het weerkaatst vrijwel geen licht en oogt daarom onder álle lichtbronnen zwart (en warmt sneller op in de zon!).' },
                { icon: 'eye', text: '**Rood voorwerp:** Bevat pigment dat oranje, geel, groen, blauw, indigo en violet absorbeert, en uitsluitend rood weerkaatst.' },
                { icon: 'eye', text: '**Groen voorwerp:** Absorbeert rood, oranje, geel, blauw en violet, en weerkaatst uitsluitend groen.' }
            ]
        },
        {
            layout: 'worked-example',
            title: 'Experiment: Voorwerpen onder Gekleurde Lampen',
            problem: 'Experiment: Voorwerpen onder Gekleurde Lampen',
            steps: [
                { label: 'Belichting met Wit Licht', content: 'Rode paprika $\\to$ Rood | Groene komkommer $\\to$ Groen | Wit T-shirt $\\to$ Wit | Zwarte broek $\\to$ Zwart' },
                { label: 'Belichting met Zuiver Rood Licht', content: 'Rode paprika $\\to$ Rood | Groene komkommer $\\to$ Zwart (absorbeert rood) | Wit T-shirt $\\to$ Rood | Zwarte broek $\\to$ Zwart' },
                { label: 'Belichting met Zuiver Groen Licht', content: 'Rode paprika $\\to$ Zwart (absorbeert groen) | Groene komkommer $\\to$ Groen | Wit T-shirt $\\to$ Groen | Zwarte broek $\\to$ Zwart' },
                { label: 'Belichting met Zuiver Blauw Licht', content: 'Rode paprika $\\to$ Zwart | Groene komkommer $\\to$ Zwart | Wit T-shirt $\\to$ Blauw | Zwarte broek $\\to$ Zwart' }
            ]
        },
        {
            layout: 'steps',
            title: 'Lichtfilters & Subtractieve Filtering',
            steps: [
                { icon: 'eye', text: 'Een kleurfilter (gekleurd glas of plastic) is een transparante middenstof die selectief absorbeert.' },
                { icon: 'eye', text: 'Een roodfilter absorbeert alle kleuren (OGBIV) en laat enkel rood licht door.' },
                { icon: 'eye', text: 'Kijk je door een rood filter naar een groen blad, dan ziet het blad zwart: het groene licht van het blad wordt immers tegengehouden door het rode filter!' },
                { icon: 'eye', text: 'Toepassing: 3D-brillen met rood-cyaan glazen sturen elk oog een ander perspectiefbeeld door complementaire filtering.' }
            ]
        },
        {
            layout: 'steps',
            title: 'De Biologische Receptor: Het Menselijk Oog',
            steps: [
                { icon: 'eye', text: 'Op het netvlies bevinden zich miljoenen lichtgevoelige zintuigcellen:' },
                { icon: 'eye', text: '**Staafjes:** Zeer lichtgevoelig, registreren enkel licht-donkercontrasten (nachtzicht, geen kleur).' },
                { icon: 'eye', text: '**Kegeltjes:** Drie typen die gevoelig zijn voor specifieke golflengtebanden: Rood (L-kegeltjes), Groen (M-kegeltjes) en Blauw (S-kegeltjes).' },
                { icon: 'eye', text: 'De hersenen combineren de drie zenuwsignalen tot miljoenen kleurnuances (additieve kleurmenging). Als alle 3 de typen kegeltjes gelijkmatig geprikkeld worden, ervaren we de sensatie **wit**!' }
            ]
        },
        {
            layout: 'summary',
            title: 'Grote Themasynthese: Deel I (Hoofdstuk 1 & 2)',
            items: [
                'Hfdst 1: Lichtbronnen (natuurlijk vs kunstmatig, heet vs koud), transparantie, rechtlijnige voortplanting (c = 3,00 · 10⁸ m/s), puntbron (kernschaduw/umbra) vs uitgebreide bron (kern- en bijschaduw/penumbra), zons- en maansverduistering.',
                'Hfdst 2: Terugkaatsing: normaal n loodrecht op spiegel, reflectiewet î = t̂ in één vlak. Spiegelend (evenwijdig) vs diffuus (ruw, verstrooid).',
                'Hfdst 2: Vlakke spiegel: beeld is virtueel, rechtop, even groot als voorwerp (|B| = V), symmetrisch (db = dv) en lateraal verwisseld. Gezichtsveld via spiegelbeeld O′ van het oog.'
            ]
        }
    ],

    slidesC: [
        {
            layout: 'summary',
            title: 'Grote Themasynthese: Deel II (Hoofdstuk 3, 4 & 5)',
            items: [
                'Hfdst 3: Breking: overgang tussen optische middenstoffen door snelheidsverschil. Naar de normaal toe (trager) vs van de normaal weg (sneller). Totale interne reflectie bij invalshoek groter dan grenshoek î_g (glasvezel, prisma).',
                'Hfdst 4: Bolle lenzen: positieve brandpuntsafstand f, 3 hoofdstralen. De 5 beeldstanden (camera: v > 2f, 1:1 kopie: v = 2f, beamer: f < v < 2f, schijnwerper: v = f, loep: v < f virt.). Formule: N = |B| / V = b / v.',
                'Hfdst 5: Dispersie: wit licht splitst in ROGGBIV (rood breekt minst, violet meest). Regenboog door breking + reflectie in waterdruppel. Kleur van lichamen door selectieve absorptie en weerkaatsing.'
            ]
        },
        {
            layout: 'summary',
            title: 'De 5 Hardnekkigste Misconcepties in de Optica',
            items: [
                '1. "Lichtstralen zijn zichtbare draden in de lucht." Feit: We zien lichtstralen alleen als ze verstrooid worden door stofdeeltjes naar onze ogen.',
                '2. "Het spiegelbeeld bevindt zich op het glasoppervlak." Feit: Het beeld bevindt zich symmetrisch ACHTER de spiegel op afstand db = dv.',
                '3. "Een bolle lens maakt een voorwerp altijd groter." Feit: Alleen bij een loep (v < f) of beamer (f < v < 2f); bij een camera (v > 2f) verkleint de lens juist!',
                '4. "Een glazen prisma verft het licht." Feit: Wit licht bevat alle spectralkleuren al; het prisma splitst ze enkel op basis van lichtsnelheid.',
                '5. "Een tomaat is van zichzelf rood." Feit: De tomaat bezit moleculen die rood weerkaatsen en de rest absorberen. Onder groen licht is de tomaat zwart.'
            ]
        },
        {
            layout: 'closing',
            title: 'Gefeliciteerd: Thema 1 Voltooid!',
            subtitle: 'Je hebt alle 13 lessen van Thema 1 (Optische fenomenen) met succes doorlopen.',
            stats: [
                { label: 'Thema', value: '1 (Optica)' },
                { label: 'Lessen', value: '13/13' },
                { label: 'Kwaliteit', value: '100% WACO 3' }
            ]
        }
    ],

    entryTicket: {
        questions: [
            {
                id: 'en1',
                type: 'mc',
                question: 'Waarom zien we een rijpe gele banaan wanneer er wit zonlicht op schijnt?',
                options: [
                    'Omdat de banaan de gele spectralkleur diffuus weerkaatst naar onze ogen en de andere kleuren absorbeert',
                    'Omdat de banaan zelfstandig geel licht produceert als een actieve lichtbron',
                    'Omdat de zon uitsluitend geel licht uitstraalt',
                    'Omdat onze ogen geel licht op de banaan projecteren'
                ],
                correct: 0,
                explanation: 'Een banaan is een donker lichaam. Onder wit licht absorbeert de bananenschil alle spectralkleuren behalve geel (en groengeel); die worden weerkaatst naar ons oog.'
            },
            {
                id: 'en2',
                type: 'mc',
                question: 'Wat gebeurt er fysisch met de lichtenergie van de spectralkleuren die door een voorwerp worden geabsorbeerd?',
                options: [
                    'De geabsorbeerde lichtenergie wordt omgezet in thermische energie (warmte)',
                    'De lichtenergie verdwijnt spoorloos uit het heelal',
                    'De lichtenergie wordt omgezet in magnetische aantrekkingskracht',
                    'De lichtenergie verandert in radioactieve straling'
                ],
                correct: 0,
                explanation: 'Volgens de wet van behoud van energie kan energie niet verdwijnen. Geabsorbeerde stralingsenergie wordt omgezet in thermische energie, waardoor een donker voorwerp in de zon voelbaar warmer wordt.'
            },
            {
                id: 'en3',
                type: 'mc',
                question: 'Welke kleur neemt een zuiver wit T-shirt aan wanneer het in een donkere discotheek wordt beschenen met een zuiver blauwe schijnwerper?',
                options: [
                    'Blauw (omdat een wit oppervlak alle invallende kleuren weerkaatst)',
                    'Wit (omdat het T-shirt van zichzelf wit is)',
                    'Zwart (omdat blauw licht geen wit bevat)',
                    'Geel (de complementaire kleur van blauw)'
                ],
                correct: 0,
                explanation: 'Een wit oppervlak absorbeert in principe geen enkele zichtbare kleur, maar weerkaatst alles wat erop valt. Valt er uitsluitend blauw licht op het T-shirt, dan wordt enkel blauw licht weerkaatst en oogt het T-shirt helderblauw.'
            },
            {
                id: 'en4',
                type: 'mc',
                question: 'Welke drie typen lichtgevoelige kegeltjes bevinden zich in het menselijk netvlies voor kleurenzicht?',
                options: [
                    'Kegeltjes gevoelig voor rood, groen en blauw licht (RGB)',
                    'Kegeltjes gevoelig voor cyaan, magenta en geel licht (CMY)',
                    'Kegeltjes voor ultraviolet, infrarood en röntgenstraling',
                    'Kegeltjes voor zwart, wit en grijs'
                ],
                correct: 0,
                explanation: 'De mens bezit trichromatisch zicht: onze netvlieskegeltjes zijn selectief gevoelig voor rood, groen en blauw licht. Alle kleursensaties ontstaan door additieve combinatie van de signalen van deze drie kegeltypen.'
            }
        ]
    },

    exitTicket: {
        questions: [
            {
                id: 'ex1',
                type: 'mc',
                question: 'Een knalrode puntpaprika wordt in een donkere kamer beschenen met een zuiver groen theaterlicht (WACO 3 p. 83). Welke kleur vertoont de paprika en waarom?',
                options: [
                    'Zwart, omdat de paprika enkel rood kan weerkaatsen en groen absorbeert; er is geen rood licht aanwezig om te weerkaatsen',
                    'Groen, omdat alle voorwerpen de kleur aannemen van de lamp die erop schijnt',
                    'Rood, omdat de inherente kleur van de paprika altijd zichtbaar blijft',
                    'Geel, omdat rood en groen zich mengen op het oppervlak'
                ],
                correct: 0,
                explanation: 'De rode paprika kan enkel de rode golflengten weerkaatsen en absorbeert groen licht. Omdat de lamp geen rood licht uitzendt, wordt al het opvallende groene licht geabsorbeerd. Er bereikt geen enkel licht ons oog, waardoor de paprika pikzwart oogt.'
            },
            {
                id: 'ex2',
                type: 'mc',
                question: 'Je kijkt door een zuiver rood filterglas naar een fris groen boomblad in het felle zonlicht. Welke kleur heeft het blad door het filterglas?',
                options: [
                    'Zwart (het groene licht van het blad wordt tegengehouden en geabsorbeerd door het rode filterglas)',
                    'Helderrood (het filterglas maakt alle voorwerpen rood)',
                    'Groen (het filterglas heeft geen invloed op zonlicht)',
                    'Wit (door additieve menging van rood en groen)'
                ],
                correct: 0,
                explanation: 'Het boomblad weerkaatst groen licht. Het rode filterglas laat echter uitsluitend rood licht door en absorbeert alle andere kleuren, inclusief groen. Het gereflecteerde groene licht wordt door het glas geblokkeerd; je oog ontvangt geen licht en het blad lijkt zwart.'
            },
            {
                id: 'ex3',
                type: 'mc',
                question: 'Welke stelling over optische fenomenen uit Thema 1 is natuurkundig VOLKOMEN JUIST?',
                options: [
                    'In een optisch dichtere middenstof reist licht trager dan in vacuüm, waardoor een schuine lichtstraal naar de normaal toebreekt en violet licht sterker afbuigt dan rood licht.',
                    'Bij een vlakke spiegel is de terugkaatsingshoek t̂ altijd twee keer zo groot als de invalshoek î.',
                    'Een bolle lens vormt voor elk voorwerp op willekeurige afstand altijd een sterk vergroot, rechtopstaand beeld.',
                    'Totale interne reflectie kan optreden wanneer licht van lucht overgaat naar diamant onder een kleine invalshoek.'
                ],
                correct: 0,
                explanation: 'In een optisch dichtere stof daalt de lichtsnelheid, waardoor het licht naar de normaal breekt. Omdat violet het traagst reist in glas/water, buigt het sterker af dan rood (dispersie). De andere uitspraken bevatten zware fysische misconcepties.'
            },
            {
                id: 'ex4',
                type: 'open',
                question: 'Integrale Thema 1 Eindsynthese: Optische Technologie',
                description: 'Verbind minstens vier verschillende optische wetten en verschijnselen uit Thema 1 (kies uit: rechtlijnige voortplanting/schaduw, spiegeling, breking, totale reflectie, bolle lensvorming of dispersie/kleurabsorptie) aan de hand van één moderne toepassing naar keuze (bijvoorbeeld een smartphonecamera met oled-scherm, een endoscoop in het ziekenhuis, of een spiegeltelescoop). Leg in minstens 4 zinnen uit hoe de fysica hierachter functioneert.'
            }
        ]
    }
}
