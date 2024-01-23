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
  # return [{"aptName": "The Warwick", "modelName": "1BR", "unit": "110", "beds": "1 bedroom", "baths": "1 bath", "price": 2500, "sqft": 700, "availability": "July 1"},
  #         {"aptName": "The Warwick", "modelName": "1BR", "unit": "220", "beds": "1 bedroom", "baths": "1 bath", "price": 2800, "sqft": 700, "availability": "July 1"}]

if __name__ == '__main__':
    app.run(debug=True)