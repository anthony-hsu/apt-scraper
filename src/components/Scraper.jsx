import { Button, TextField } from "@mui/material";
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
    <div className="scraper-container">
      <h2>Web Scraper App</h2>
      <TextField id="input-neighborhood" label="Neighborhood" variant="outlined" />
      <TextField id="input-city" label="City" variant="outlined" />
      <TextField id="input-state" label="State" variant="outlined" />
      <TextField id="input-price-max" label="Price (Max)" variant="outlined" />
      <TextField id="input-sqft-min" label="Square Feet (Min)" variant="outlined" />
      <Button variant="contained" onClick={handleScrape}>Scrape Data</Button>
    </div>
  );
};

export default ScraperComponent;
