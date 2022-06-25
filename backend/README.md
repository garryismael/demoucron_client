# demoucron API

It's an API that finds the shortest and longest path using Demoucron Algorithm with Python

NB

Before running the server, create an env and/or install pip dependencies by using this command:
create env -> python -m venv env
install requirements -> pip install -r requirements.txt

How to launch the server? by using this command: uvicorn api:app --reload
How to run tests? by using this commands:
1-python3 -m unittest discover tests
2-coverage run -m unittest discover tests
3-nosetests -v