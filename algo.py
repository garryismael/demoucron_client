import numpy as np


class Node:
    def __init__(self, data: int):
        self.data: int = data
        self.next: Node = None


class Stack:
    def __init__(self):
        self.top: Node = None
        self.size: int = 0

    def push(self, data: int):
        node = Node(data)
        if self.top:
            node.next = self.top
            self.top = node
        else:
            self.top = node
        self.size += 1

    def pop(self):
        if self.top:
            data: int = self.top.data
            if self.top.next:
                self.top = self.top.next
            else:
                self.top = None
            self.size -= 1
            return data


class Demoucron:
    def __init__(self, matrice: np.int64, choix: str
                 ):
        self.matrice = matrice

        self.comparer_elem = (
            lambda a: a is not None) if choix == 'min' else (lambda a: a > 0)
        self.comparer_vecteur = min if choix == 'min' else max
        self.calcul()

    @property
    def sommets(self):
        return self.matrice.shape[0]

    def calcul(self):
        k = 1
        sommets = self.sommets
        while k < sommets:
            entrees = []
            sorties = []
            self.entrer(k, entrees)
            self.sortir(k, sorties)
            for entree in entrees:
                a = self.matrice[entree, k]
                if a:
                    for sortie in sorties:
                        b = self.matrice[k, sortie]
                        vecteur = self.matrice[entree, sortie]
                        valeur = a + \
                            b if not vecteur else self.comparer_vecteur(
                                [a + b, vecteur])
                        self.matrice[entree, sortie] = valeur
            k += 1

    def entrer(self, k, entrees: list) -> list[int]:
        i = 0
        for tab in self.matrice:
            if self.comparer_elem(tab[k]):
                entrees.append(i)
            i += 1

    def sortir(self, k, sorties: list):
        i = 0
        for item in self.matrice[k]:
            if self.comparer_elem(item):
                sorties.append(i)
            i += 1

    def trouver_chemin_min(self):
        colonne = self.sommets - 1
        chemins = Stack()
        chemins.push(self.sommets)
        while colonne > 0:
            i = 0
            predecesseur = 0
            min_val = self.matrice[predecesseur, colonne]
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
            min_value = self.matrice[ligne, i]
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

a = np.array([
    [None, 3, 8, 6, None, None],
    [None, None, None, 2, 6, None],
    [None, None, None, None, 1, None],
    [None, None, 2, None, None, 7],
    [None, None, None, None, None, 2],
    [None, None, None, None, None, None]
])

b = np.array([
    [0, 3, 8, 6, 0, 0],
    [0, 0, 0, 2, 6, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 2, 0, 0, 7],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0]
])

d = Demoucron(b, 'max')
print(d.trouver_chemin_max())
print(d.matrice)
