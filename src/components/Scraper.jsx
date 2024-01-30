import axios from "axios";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ApartmentDataTable from "./ApartmentDataTable";

const ScraperComponent = () => {
  // States
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Seattle");
  const [state, setState] = useState("WA");
  const [beds, setBeds] = useState(3);
  const [maxPrice, setMaxPrice] = useState("2500");
  const [minSqft, setMinSqft] = useState("600");
  const [aptData, setAptData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScrape = async () => {
    setIsLoading(true);
    try {
      axios
        .get(
          `http://127.0.0.1:8000/scrape/${neighborhood}/${city}/${state}/${beds}/${maxPrice}/${minSqft}`
        )
        .then((response) => {
          console.log(response.data);
          setAptData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error scraping:", error);
    }
  };

  return (
    <>
      <Button
        className="btn-new-search"
        onClick={() => {
          setAptData([]);
          setIsLoading(false);
        }}
      >
        New Search
      </Button>
      <h1>Apartment Scraper</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {aptData?.length > 0 ? (
            <ApartmentDataTable aptData={aptData} />
          ) : (
            <div className="scraper-container">
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
              <Button
                variant="contained"
                onClick={() => {
                  handleScrape();
                }}
              >
                Scrape Data
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ScraperComponent;
