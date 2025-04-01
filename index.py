import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, request
from datetime import datetime, timezone, timedelta

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8080, debug=True)
