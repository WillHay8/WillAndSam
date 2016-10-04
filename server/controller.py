from flask import Flask, send_from_directory
from random import random
import math
app = Flask(__name__)


@app.route("/random")
def random_number():
	return "Enjoy this random number on a scale from one to seventeen: " + str(int(math.ceil(random() * 17)))

@app.route("/static/<path:path>")
def serve_static_content():
	return send_from_directory('static', path)


if __name__ == "__main__":
    app.run()	