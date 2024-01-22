import axios from "axios";
import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const ScraperComponent = () => {
  // States
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Seattle");
  const [state, setState] = useState("WA");
  const [beds, setBeds] = useState(3);
  const [maxPrice, setMaxPrice] = useState("");
  const [minSqft, setMinSqft] = useState("");

  const handleScrape = async () => {
    try {
      axios.get(`http://127.0.0.1:5000/scrape/${neighborhood}/${city}/${state}/${beds}/${maxPrice}/${minSqft}`).then((response) => {
        alert("Scraping finished!");
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error scraping:", error);
    }
  };

  return (
    <div className="scraper-container">
      <h2>Apartment Scraper</h2>
      <TextField
        id="input-neighborhood"
        label="Neighborhood"
        variant="outlined"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
      />
      <TextField
        id="input-city"
        label="City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="input-state"
        label="State"
        variant="outlined"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="beds-label">Bedrooms</InputLabel>
        <Select
          labelId="beds-label"
          id="beds-select"
          value={beds}
          label="Bedrooms"
          onChange={(e) => setBeds(e.target.value)}
        >
          <MenuItem value={"0"}>Studio</MenuItem>
          <MenuItem value={"1"}>One</MenuItem>
          <MenuItem value={"2"}>Two</MenuItem>
          <MenuItem value={"3"}>All</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="input-price-max"
        label="Price (Max)"
        variant="outlined"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <TextField
        id="input-sqft-min"
        label="Square Feet (Min)"
        variant="outlined"
        type="number"
        value={minSqft}
        onChange={(e) => setMinSqft(e.target.value)}
      />
      <Button variant="contained" onClick={handleScrape}>
        Scrape Data
      </Button>
    </div>
  );
};

export default ScraperComponent;
