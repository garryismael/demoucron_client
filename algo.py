import numpy as np


class Demoucron:
    def __init__(self, matrice, choix: str):
        self._origin = np.copy(matrice)
        self._matrice: np.ndarray = matrice
        self.comparer_elem = Demoucron.notNan if choix == 'minimiser' else Demoucron.greater
        self.comparer_vecteur = min if choix == 'minimiser' else max
        self.choix = choix
        self.calculer()

    def entrer(self, k, entrees: list):
        i = 0
        for tab in self._matrice:
            if self.comparer_elem(tab[k]):
                entrees.append(i)
            i += 1

    def sortir(self, k, sorties: list[int]):
        i = 0
        for item in self._matrice[k]:
            if self.comparer_elem(item):
                sorties.append(i)
            i += 1

    def calculer(self):
        k = 1
        sommets = self.sommets
        while k < sommets:
            entrees = []
            sorties = []
            self.entrer(k, entrees)
            self.sortir(k, sorties)
            for entree in entrees:
                self.set_matrice(k, entree, sorties)
            k += 1

    def set_matrice(self, k: int, entree: float, sorties: list[float]):
        a = self._matrice[entree, k]
        if not np.isnan(a):
            for sortie in sorties:
                b = self._matrice[k, sortie]
                vecteur = self._matrice[entree, sortie]
                self._matrice[entree, sortie] = self.valeur(vecteur, a, b)

    def valeur(self, vecteur: float, a: float, b: float):
        if np.isnan(vecteur):
            return a + b
        return self.comparer_vecteur([a+b, vecteur])

    @property
    def minimiser(self):
        line = self.sommets-1
        paths: list[int] = []
        paths.append(line)
        while line > 0:
            line: int = np.nanargmin(self._matrice[:, line])
            paths.append(line)
        paths.reverse()
        return paths

    @property
    def maximiser(self):
        column = self.sommets-1
        res = []
        while column > 0:
            marquages = np.amax(self._matrice, axis=0)
            max_val = marquages[column]
            distances = self._origin[:, column]
            indices = [i for i, v in enumerate(distances) if v > 0]
            for i in indices:
                if distances[i] + marquages[i] == max_val:
                    res.append(column)
                    column = i
                    break
        res.append(0)
        res.reverse()
        print(res)

    def find_path(self) -> list[int]:
        return getattr(self, self.choix)

    @staticmethod
    def notNan(a: np.float64):
        return not np.isnan(a)

    @staticmethod
    def greater(a: np.float64):
        return a > 0

    @property
    def sommets(self):
        return self._matrice.shape[0]


a = np.array([
    [0, 3, 0, 5, 0, 0, 0],
    [0, 0, 4, 2, 6, 0, 0],
    [0, 0, 0, 0, 4, 0, 5],
    [0, 0, 3, 0, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0],
], dtype=np.float64)

m = np.array([[  0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 15, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0],
    [0, 0, 8, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 12, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ], dtype=np.float64)

d = Demoucron(m, 'maximiser')
d.find_path()
