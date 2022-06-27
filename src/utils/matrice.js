export default class Matrice {
    constructor(nodes, depart, arrivee) {
        this.nodes = nodes;
        this.depart = depart;
        this.arrivee = arrivee;
        this.ordres = [];
        this.init();
        this.ordres_noeud();
    }

    init() {
        const keys = Object.keys(this.nodes);
        this.matrice = keys.map((_) => new Array(keys.length).fill(0));
    }

    destinations(depart, nodes, ordres) {
        let points = [];
        for (const key of Object.keys(nodes[depart]).filter(
            (v) => v !== 'text'
        )) {
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

    generer() {
        let i = 0,
            j = 0;
        for (const key of this.ordres) {
            const node = this.nodes[key];
            for (const k of Object.keys(node).filter((v) => v !== 'text')) {
                j = this.ordres.indexOf(String(node[k].to));
                if (j > -1) {
                    const distance = parseInt(node[k].distance);
                    this.matrice[i][j] = distance;
                }
            }
            i += 1;
        }
    }
}
