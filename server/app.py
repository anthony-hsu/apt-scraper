from flask import Flask
from flask_cors import CORS
from scraper import runScraper

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, Flask!'

@app.route('/scrape/<neighborhood>/<city>/<state>/<beds>/<maxPrice>/<minSqft>/')
def scrape(neighborhood=None, city=None, state=None, beds=None, maxPrice=None, minSqft=None):
  return runScraper(neighborhood, city, state, beds, maxPrice, minSqft)

if __name__ == '__main__':
    app.run(debug=True)