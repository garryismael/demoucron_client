const data = {
    0: {
        text: 'X1',
        '-1': {
            to: -2,
            distance: '3',
            text: 'X2',
        },
        '-3': {
            to: -4,
            distance: '6',
            text: 'X4',
        },
        '-2': {
            to: -3,
            distance: '8',
            text: 'X3',
        },
    },
    '-2': {
        text: 'X2',
        '-4': {
            to: -4,
            distance: '2',
            text: 'X4',
        },
        '-5': {
            to: -5,
            distance: '6',
            text: 'X5',
        },
    },
    '-3': {
        text: 'X3',
        '-8': {
            to: -5,
            distance: '1',
            text: 'X5',
        },
    },
    '-4': {
        text: 'X4',
        '-7': {
            to: -6,
            distance: '7',
            text: 'X6',
        },
        '-9': {
            to: -3,
            distance: '2',
            text: 'X3',
        },
    },
    '-5': {
        text: 'X5',
        '-6': {
            to: -6,
            distance: '2',
            text: 'X6',
        },
    },
    '-6': {
        text: 'X6',
    },
};

class Matrice {
    constructor(nodes, depart, arrivee, default_value) {
        this.nodes = nodes;
        this.depart = depart;
        this.arrivee = arrivee;
        this.ordres = [];
        this.init(default_value);
        this.ordres_noeud();
        this.generer();
    }

    init(default_value) {
        const keys = Object.keys(this.nodes);
        this.matrice = keys.map((_) => new Array(keys.length).fill(default_value));
    }

    destinations(depart, nodes, ordres) {
        let points = [];
        for (const key of Object.keys(nodes[depart]).filter((v) => v !== 'text')) {
            let point = parseInt(nodes[depart][key].to);
            if (!ordres.includes(point) || point !== this.arrivee) {
                points.push(String(point));
            }
        }
        return points;
    }

    ordres_noeud() {
        const ordres = [this.depart];
        let en_cours = this.destinations(this.depart, this.nodes, ordres);
        let taille = en_cours.length;
        while (taille > 0) {
            const cle = en_cours.shift();
            if (!ordres.includes(cle)) {
                ordres.push(cle);
                const node = this.nodes[cle];
                en_cours = en_cours.concat(
                    this.destinations(cle, { [String(cle)]: node }, ordres)
                );
            }
            taille = en_cours.length;
        }
        this.ordres = ordres;
    }

    liens() {
        return Object.values(this.nodes).map(value => {
            let link = Object.assign({}, value);
            delete link['text'];
            return link;
        });
    }

    generer() {
        const keys = Object.keys(this.nodes);
        const links = this.liens();
        let i = 0, j = 0;
        for (const link of links) {
            for (const val of Object.values(link)) {
                const to = String(val.to);
                const distance = val.distance;
                j = keys.indexOf(to);
                this.matrice[i][j] = distance;
            }
            i++;
        }
    }
}


const matrice = new Matrice(data, '0', '-6', 0);

matrice.generer();

console.log(matrice.matrice)