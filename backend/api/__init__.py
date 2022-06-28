from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.demoucron import Demoucron
from api.constants import (
    INVALID_MATRIX_UNITY,
    INVALID_MATRIX_VALUE
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class Matrice(BaseModel):
    matrice: list[list[int | None]]

    @staticmethod
    def is_valid_matrice(matrice, choice):
        line = len(matrice)
        i = 0
        for tab in matrice:
            if len(tab) != line:
                return INVALID_MATRIX_UNITY
            if choice == 'min':
                if tab[i] != None:
                    return INVALID_MATRIX_VALUE
            else:
                if tab[i] != 0:
                    return INVALID_MATRIX_VALUE
            i += 1
        return None


@app.post("/{choice}")
def api(data: Matrice, choice: str = Path(..., regex="^(min|max)$")):
    comparer_elem = None
    comparer_vecteur = min
    result = []
    valid = Matrice.is_valid_matrice(data.matrice, choice)
    if valid is not None:
        raise HTTPException(status_code=400, detail=valid)

    if choice == "min":
        def comparer_elem(a): return a is not None
    else:
        def comparer_elem(a): return a > 0
        comparer_vecteur = max
    demoucron = Demoucron(data.matrice, comparer_elem, comparer_vecteur)
    
    if choice == 'min':
        return {'resultat': demoucron.trouver_chemin_min()}
    else:
        return {'resultat': demoucron.trouver_chemin_max()}
