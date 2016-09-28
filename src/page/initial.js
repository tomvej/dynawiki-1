import {fromJS} from 'immutable';

import {nodeType} from './constants';

const {SECTION, PARAGRAPH} = nodeType;

const nodes = {
    0: {
        type: SECTION,
        heading: 'Bývalí Hunteři',
        children: [6, 7, 1, 2, 3],
    },
    6: {
        type: PARAGRAPH,
        text: 'Skupina hunterů ze Sunny Beach, která se už rozpadla. Konkrétně se rozpadla kvůli smrti dvou členů při honu na "upíra".',
    },
    7: {
        type: PARAGRAPH,
        text: 'Částečně aktivní je pouze "Zelený mozek" (viz níže), jeden z hunterů dělá vrátného v domě, kde bydlí Jill.',
    },
    1: {
        type: SECTION,
        heading: 'Zelený Mozek',
        children: [8, 9, 10, 11],
    },
    8: {
        type: PARAGRAPH,
        text: 'aka Bill z L4D — bývalý voják, byl v Zálivu a v Bosně. Mírné psychologické trauma — v obou válkách hájil nějaké abstraktní zájmy, nebránil lidi.',
    },
    9: {
        type: PARAGRAPH,
        text: 'Původně aktivně působící, když se minule moc dobře nevedlo, rozhodl se pověsit vigil na hřebík (no, to se uvidí, jak se mu to povede).',
    },
    10: {
        type: PARAGRAPH,
        text: 'Vlastní nemalou zásobu diskutabilně millitary-grade zbraní (ostřelovačská puška, SMG, možná i M4).',
    },
    11: {
        type: PARAGRAPH,
        text: 'S postavami má domluvenou skrýš pod mostem. Kontakt na něj má Carl.',
    },
    2: {
        type: SECTION,
        heading: 'Ostatní',
        children: [12, 4, 5],
    },
    12: {
        type: PARAGRAPH,
        text: 'Původně jich bylo pět, dva to dostali při honu na upíra, jednoho později zabil Sam.',
    },
    3: {
        type: SECTION,
        heading: 'Historie',
        children: [13, 14],
    },
    13: {
        type: PARAGRAPH,
        text: 'Po "neúspěšném" posledním huntu se skupina rozpadla. Peterson se ostatích výrazně stranil a nakonec se z něj stal slasher. Musel ho zabít Sam.',
    },
    14: {
        type: PARAGRAPH,
        text: 'Robb zmizení prošetřoval, konfrontoval Sama a dostalo se mu lekce (strávil několik měsíců v sádře). V zásadě ale pochopil, co se stalo a že Samovo řešení bylo nutné. Teď pracuje jako vrátný v domě Jill.',
    },
    4: {
        type: SECTION,
        heading: 'H. Robb',
        children: [15],
    },
    15: {
        type: PARAGRAPH,
        text: 'žije dodnes, nechce o vigilu mluvit, dělá vrátného',
    },
    5: {
        type: SECTION,
        heading: 'Peterson',
        children: [16],
    },
    16: {
        type: PARAGRAPH,
        text: 'vedl si deník, takový vědecký typ, stal se z něj slasher, mrtvý',
    },
};

Object.keys(nodes).forEach((id) => {
    nodes[id].id = id;
});

Object.keys(nodes).forEach((id) => {
    const children = nodes[id].children;
    children && children.forEach((child) => {
        nodes[child].parent = id;
    });
});

export default fromJS(nodes);
