from flask import Flask
from flask_cors import CORS
from scraper import runScraper

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, Flask!'

@app.route('/scrape')
def scrape():
  return runScraper("Capitol Hill", "Seattle", "WA", "1", 2800)

if __name__ == '__main__':
    app.run(debug=True)