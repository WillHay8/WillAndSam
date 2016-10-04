from flask import Flask
from random import random
import math
app = Flask(__name__)



@app.route("/")
def hello():
    return "Hello World!"

@app.route("/random")
def randonNumber():
	return "Enjoy this random number on a scale from one to seventeen: " + str(int(math.ceil(random() * 17)))

if __name__ == "__main__":
    app.run()