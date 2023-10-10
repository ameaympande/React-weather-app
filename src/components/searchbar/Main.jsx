/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { Cloudy, Search } from "lucide-react";
import weatherCall from "../../apicalls/weatherCall";
import Loader from "react-js-loader";
import "./main.css";

const SearchBar = ({ updateBackground }) => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      document.title = `Weather in ${data.resolvedAddress}`;
    }
  }, [data]);

  const handleButtonClick = async () => {
    setLoading(!loading);
    try {
      const weatherData = await fetchWeatherData(city);
      setLoading(!loading);
      setError(null);
      updateBackground(weatherData.days[0].conditions);
      setData(weatherData);
    } catch (error) {
      setError("Please Enter a valid location");
      console.error("An error occurred:", error);
      setLoading(!loading);
    }
  };

  async function fetchWeatherData(city) {
    const weatherData = await weatherCall(city);
    return weatherData;
  }

  return (
    <div className="container">
      <div className="search_box">
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
            marginLeft: "20px",
            marginTop: "10px",
            borderRadius: "10px",
            ":hover": {
              cursor: "pointer",
              backgroundcolor: "offwhite",
            },
          }}
          onClick={handleButtonClick}
          className="search-button"
        >
          <Search color="white" />
        </Button>
      </div>
      {!data ? (
        loading && (
          <div className={"item"}>
            <Loader
              type="spinner-circle"
              bgColor={"#FFFFFF"}
              title={"loading"}
              color={"#FFFFFF"}
              size={100}
            />
          </div>
        )
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
              <Cloudy size={60} strokeWidth={3} />
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
            <Grid className="other-info" xs={12} spacing={2}>
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
