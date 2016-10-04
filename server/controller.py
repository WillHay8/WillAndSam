from flask import Flask, send_from_directory, request
from random import random
import math
app = Flask(__name__)

MESSAGE_CACHE = []

@app.route("/message", method=["POST"])
def submit_message():
	MESSAGE_CACHE.append(request.form)
	return MESSAGE_CACHE

@app.route("/messages", method=["GET"])
def get_messages():
	return MESSAGE_CACHE


@app.route("/static/<path:path>")
def serve_static_content():
	return send_from_directory('static', path)


if __name__ == "__main__":
    app.run()	