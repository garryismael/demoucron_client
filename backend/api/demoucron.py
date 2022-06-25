from typing import Callable
from api.list_entete import Stack


class Demoucron:
    def __init__(
        self,
        matrice: list[list: int],
        comparer_elem: Callable[[int], bool],
        comparer_vecteur: Callable[[int, int], int]
    ):
        self.matrice = matrice
        self.sommets = len(matrice)
        self.calcul(comparer_elem, comparer_vecteur)

    def calcul(
        self,
        comparer_elem: Callable[[int], bool],
        comparer_vecteur: Callable[[int, int], int]
    ):
        k = 1
        while k < self.sommets-1:
            entrees = []
            sorties = []
            self.entrees_point(k, entrees, comparer_elem)
            self.sorties_point(k, sorties, comparer_elem)
            for entree in entrees:
                a = self.matrice[entree][k]
                if a:
                    for sortie in sorties:
                        b = self.matrice[k][sortie]
                        vector = self.matrice[entree][sortie]
                        if vector:
                            value = comparer_vecteur(
                                [a+b, self.matrice[entree][sortie]])
                        else:
                            value = a+b
                        self.matrice[entree][sortie] = value
            k += 1

    def entrees_point(self, k, entrees: list, factory: Callable[[int], bool]):
        i = 0
        for tab in self.matrice:
            if factory(tab[k]):
                entrees.append(i)
            i += 1

    def sorties_point(self, k, sorties: list, factory: Callable[[int], bool]):
        i = 0
        for item in self.matrice[k]:
            if factory(item):
                sorties.append(i)
            i += 1

    def trouver_chemin_min(self):
        colonne = self.sommets - 1
        chemins = Stack()
        chemins.push(self.sommets)
        while colonne > 0:
            i = 0
            predecesseur = 0
            min_val = self.matrice[predecesseur][colonne]
            for tab in self.matrice:
                value = tab[colonne]
                if value and value < min_val:
                    min_val = value
                    predecesseur = i
                i += 1
            colonne = predecesseur
            chemins.push(colonne+1)
        result = []
        while chemins.size > 0:
            result.append(chemins.pop())
        return result

    def trouver_chemin_max(self):
        ligne = 0
        chemin = [ligne+1]
        while ligne < self.sommets - 1:
            i = 0
            min_value = self.matrice[ligne][i]
            for item in self.matrice[ligne]:
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
