import unittest
from fastapi.testclient import TestClient

from api import app
from constants import (
    MATRICE_MAX, MATRICE_LENGTH_NOT_EQUAL,
    MATRICE_MAX_INVALID, MATRICE_MIN, MATRICE_MIN_INVALID,
    PATH_MAX, PATH_MIN, MATRICE, DETAIL, RESULTAT
)
from api.constants import (
    INVALID_MATRIX_UNITY,
    INVALID_MATRIX_VALUE
)


class ApiTestCase(unittest.TestCase):
    """
        Test Demoucron API
    """

    def setUp(self):
        self.client = TestClient(app)

    def test_chemin_max(self):
        response = self.client.post(PATH_MAX, json={MATRICE: MATRICE_MAX})
        self.assertEqual(response.json()[RESULTAT], [1, 2, 4, 3, 5, 7])

    def test_invalid_matrice_max(self):
        response = self.client.post(
            PATH_MAX, json={MATRICE: MATRICE_MAX_INVALID})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()[DETAIL], INVALID_MATRIX_VALUE)

    def test_chemin_min(self):
        response = self.client.post(PATH_MIN, json={MATRICE: MATRICE_MIN})
        self.assertEqual(response.json()[RESULTAT], [1, 2, 4, 8, 9])

    def test_invalid_matrice_min(self):
        response = self.client.post(
            PATH_MIN, json={MATRICE: MATRICE_MIN_INVALID})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()[DETAIL], INVALID_MATRIX_VALUE)

    def test_invalid_len_matrice(self):
        response = self.client.post(
            PATH_MIN, json={MATRICE: MATRICE_LENGTH_NOT_EQUAL})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()[DETAIL], INVALID_MATRIX_UNITY)
