from fastapi import Depends, FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
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


def is_valid_matrice(matrice: Matrice, choice: str = Path(..., regex="^(minimiser|maximiser)$")):
    line = len(matrice)
    error = None
    i = 0
    for tab in matrice:
        if len(tab) != line:
            error = INVALID_MATRIX_UNITY
        if choice == 'minimiser':
            if tab[i] != None:
                error = INVALID_MATRIX_VALUE
        else:
            if tab[i] != 0:
                error = INVALID_MATRIX_VALUE
        if error is not None:
            raise HTTPException(status_code=400, detail=error)
        i += 1
    return matrice, choice


@app.post("/{choice}")
def api(data: tuple[Matrice, str] = Depends(is_valid_matrice)):
    matrice, choice = data
    demoucron = Demoucron(np.array(matrice), choice)
    return demoucron.find_path()
