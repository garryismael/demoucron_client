import numpy as np


class Demoucron:
    def __init__(self, matrice: np.ndarray, choix: str):
        self._matrice = matrice
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

    def minimiser(self):
        line = self.sommets-1
        paths: list[int] = []
        paths.append(line)
        while line > 0:
            line = np.nanargmin(self._matrice[:, line])
            paths.append(int(line))
        paths.reverse()
        return paths

    def maximiser(self):
        ligne = 0
        chemin = [ligne+1]
        while ligne < self.sommets - 1:
            i = 0
            min_value = self._matrice[ligne, i]
            for item in self._matrice[ligne]:
                if min_value > 0 and item > 0:
                    if item < min_value:
                        min_value = item
                        ligne = i
                elif min_value == 0 and item > 0:
                    min_value = item
                    ligne = i
                i += 1
            chemin.append(ligne+1)
        return chemin

    def find_path(self) -> list[int]:
        return getattr(self, self.choix)()

    @staticmethod
    def notNan(a: np.float64):
        return not np.isnan(a)

    @staticmethod
    def greater(a: np.float64):
        return a > 0

    @property
    def sommets(self):
        return self._matrice.shape[0]