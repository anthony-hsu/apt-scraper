import axios from "axios";

const ScraperComponent = () => {
  const handleScrape = async () => {
    try {
      axios.get("http://127.0.0.1:5000/scrape").then((response) => {
        alert("Scraping finished!");
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error scraping:", error);
    }
  };

  return (
    <div>
      <h2>Web Scraper App</h2>
      <button onClick={handleScrape}>Scrape Data</button>
    </div>
  );
};

export default ScraperComponent;
