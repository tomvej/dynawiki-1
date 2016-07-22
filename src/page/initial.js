import {fromJS} from 'immutable'

const nodes = {
    0: {
        heading: 'Bývalí Hunteři',
        children: [6, 7, 1, 2, 3]
    },
    6: {
        text: 'Skupina hunterů ze Sunny Beach, která se už rozpadla. Konkrétně se rozpadla kvůli smrti dvou členů při honu na "upíra".'
    },
    7: {
        text: 'Částečně aktivní je pouze "Zelený mozek" (viz níže), jeden z hunterů dělá vrátného v domě, kde bydlí Jill.'
    },
    1: {
        heading: 'Zelený Mozek',
        children: [8, 9, 10, 11]
    },
    8: {
        text: 'aka Bill z L4D — bývalý voják, byl v Zálivu a v Bosně. Mírné psychologické trauma — v obou válkách hájil nějaké abstraktní zájmy, nebránil lidi.'
    },
    9: {
        text: 'Původně aktivně působící, když se minule moc dobře nevedlo, rozhodl se pověsit vigil na hřebík (no, to se uvidí, jak se mu to povede).'
    },
    10: {
        text: 'Vlastní nemalou zásobu diskutabilně millitary-grade zbraní (ostřelovačská puška, SMG, možná i M4).'
    },
    11: {
        text: 'S postavami má domluvenou skrýš pod mostem. Kontakt na něj má Carl.'
    },
    2: {
        heading: "Ostatní",
        children: [12, 4, 5]
    },
    12: {
        text: 'Původně jich bylo pět, dva to dostali při honu na upíra, jednoho později zabil Sam.'
    },
    3: {
        heading: "Historie",
        children: [13, 14]
    },
    13: {
        text: 'Po "neúspěšném" posledním huntu se skupina rozpadla. Peterson se ostatích výrazně stranil a nakonec se z něj stal slasher. Musel ho zabít Sam.'
    },
    14: {
        text: 'Robb zmizení prošetřoval, konfrontoval Sama a dostalo se mu lekce (strávil několik měsíců v sádře). V zásadě ale pochopil, co se stalo a že Samovo řešení bylo nutné. Teď pracuje jako vrátný v domě Jill.'
    }
    ,
    4: {
        heading: "H. Robb",
        children: [15]
    },
    15: {
        text: 'žije dodnes, nechce o vigilu mluvit, dělá vrátného'
    },
    5: {
        heading: "Peterson",
    },
    16: {
        text: 'vedl si deník, takový vědecký typ, stal se z něj slasher, mrtvý'
    }
};

Object.keys(nodes).forEach(id => {
    nodes[id].id = id;
});

Object.keys(nodes).forEach(id => {
    const children = nodes[id].children;
    children && children.forEach(child => {
        nodes[child].parent = id;
    });
});

export default fromJS(nodes);
