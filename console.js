const data = {
    0: {
        text: 'X1',
        '-1': {
            to: -2,
            distance: '3',
            text: 'X2',
        },
        '-2': {
            to: -3,
            distance: '8',
            text: 'X3',
        },
        '-3': {
            to: -4,
            distance: '6',
            text: 'X4',
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
    constructor(data, depart, arrivee) {
        this.data = data;
        this.keys = Object.keys(data);
        this.depart = depart;
        this.arrivee = arrivee;
        this.init();
    }

    init() {
        this.matrice = this.keys.map((_) => new Array(this.keys.length).fill(0));
    }

    generate() {
        const ordres = [String(this.depart)];
        let enCours = this.point_de_depart(this.depart, this.data, ordres);
        let size = enCours.length;
        let i = 0, j = 0;
        while (size > 0) {
            const key = String(enCours.shift());
            if (!ordres.includes(key)) {
                ordres.push(key);
                const node = this.data[key];
                enCours = enCours.concat(this.point_de_depart(key, { [String(key)]: node }, ordres));
            }
            size = enCours.length;
        }

        for (const key of ordres) {
            const node = this.data[key];
            for (const k of Object.keys(node).filter(v => v !== 'text')) {
                j = this.emplacement(ordres, String(node[k].to)); 
                if (j > -1) {
                    const distance = parseInt(node[k].distance);
                    this.matrice[i][j] = distance;
                }
            }
            i += 1;
        }
    }

    emplacement(ordres, to) {
        return ordres.indexOf(to);
    }

    point_de_depart(depart, data, ordres) {
        let points = [];
        for (const key of Object.keys(data[String(depart)]).filter(v => v !== 'text')) {
            let point = parseInt(data[String(depart)][key].to);
            if (!ordres.includes(point) || point !== this.arrivee) {
                points.push(String(point));
            }
        }
        return points;
    }
}

const matrice = new Matrice(data, 0, -6);
matrice.generate();

console.log(matrice.matrice)