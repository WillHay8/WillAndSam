from flask import Flask, send_from_directory, request
from random import random
import json
import math
app = Flask(__name__)

MESSAGE_CACHE = []
counter = 0

@app.route("/message", methods=["POST"])
def submit_message():
	global counter
	counter += 1
	message = request.json
	message['id'] = counter
	MESSAGE_CACHE.append(message)
	return json.dumps(MESSAGE_CACHE)

@app.route("/messages", methods=["GET"])
def get_messages():
	return json.dumps(MESSAGE_CACHE)


@app.route("/static/<path:path>")
def serve_static_content():
	return send_from_directory('static', path)


if __name__ == "__main__":
    app.run()	