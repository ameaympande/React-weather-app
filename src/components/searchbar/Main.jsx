import { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { Cloudy, Search } from "lucide-react";
import weatherCall from "../../apicalls/weatherCall";
import Loader from "react-js-loader";
import "./main.css";

const SearchBar = ({ updateBackground, location }) => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      handleConvert(location);
    }
  }, [location]);

  const handleConvert = async (location) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.da840e3b5c956ac39535ae16bf237b25&lat=${location.latitude}&lon=${location.longitude}&format=json`
      );
      if (response.ok) {
        const data = await response.json();
        handleSearch(data.address.state_district);
      } else {
        console.error("Error in the geocoding request.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (searchLocation) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(searchLocation);
      setLoading(false);
      setError(null);
      updateBackground(weatherData.days[0].conditions);
      setData(weatherData);
    } catch (error) {
      setError("Please Enter a valid location");
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (city) {
      handleSearch(city);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (city === "") {
      setError("Please Enter a valid location");
      return;
    }
    handleButtonClick();
  };

  async function fetchWeatherData(location) {
    const weatherData = await weatherCall(location);
    return weatherData;
  }

  return (
    <div className="container">
      <div className="search_box">
        <form onSubmit={handleFormSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter City Name"
              value={city}
              onChange={(e) => {
                setError(null);
                setCity(e.target.value);
              }}
              error={error}
              className="text-input"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              helperText={error && error}
            />
            <Button
              style={{
                marginTop: "10px",
                borderRadius: "10px",
              }}
              type="submit"
              className="search-button"
            >
              <Search color="white" />
            </Button>
          </div>
        </form>
      </div>
      {loading || !data ? (
        <div className={"item"}>
          <Loader
            type="spinner-circle"
            bgColor={"#FFFFFF"}
            title={"loading"}
            color={"#FFFFFF"}
            size={80} // Adjusted loader size for smaller screens
          />
        </div>
      ) : (
        <div className="weather-info">
          <Grid
            container
            xs={12}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid sm={6} className="icon-container">
              <Cloudy size={40} strokeWidth={3} /> {/* Smaller icon size */}
              <Typography mt={2} variant="h4">
                {Math.round(((data.days[0].temp - 32) * 5) / 9)} °C
              </Typography>
              <Typography mt={2} variant="h6">
                {data.days[0].conditions}
              </Typography>
              <Typography mt={2} variant="h6">
                {data.resolvedAddress}
              </Typography>
              <hr className="long-hr" />
            </Grid>
            <Grid className="other-info" xs={12} spacing={5}>
              <Grid item sm={4}>
                <Typography variant="h6">Max Temp</Typography>
                <Typography variant="h6">
                  {Math.round(((data.days[0].tempmax - 32) * 5) / 9)} °C
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="h6">Min Temp</Typography>
                <Typography variant="h6">
                  {Math.round(((data.days[0].tempmin - 32) * 5) / 9)} °C
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="h6">UV Index</Typography>
                <Typography variant="h6">{data.days[0].uvindex}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
