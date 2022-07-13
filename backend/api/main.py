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
    matrice: list[list[float | None]]


def is_valid_matrice(data: Matrice, choice: str = Path(..., regex="^(minimiser|maximiser)$")):
    line = len(data.matrice)
    for i in range(line):
        arr = data.matrice[i]
        valid_min = choice == 'minimiser' and arr[i] == None
        valid_max = choice == 'maximiser' and arr[i] == 0
        if (len(arr) != line):
            raise HTTPException(status_code=400, detail=INVALID_MATRIX_UNITY)
        if valid_min or valid_max:
            raise HTTPException(status_code=400, detail=INVALID_MATRIX_VALUE)
    return Demoucron(np.array(data.matrice, dtype=np.float64), choix=choice)


@app.post("/{choice}")
def api(demoucron: Demoucron = Depends(is_valid_matrice)):
    return demoucron.find_path()
