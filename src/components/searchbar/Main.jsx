import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Cloudy, Search } from "lucide-react";
import weatherCall from "../../apicalls/weatherCall";
import "./main.css";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      document.title = `Weather in ${data.city}`;
    }
  }, [data]);

  const handleButtonClick = async () => {
    try {
      const weatherData = await fetchWeatherData(city);
      setData(weatherData);
      console.log(weatherData);
      setError(null);
    } catch (error) {
      setError("Please Enter a valid location");
      console.error("An error occurred:", error);
    }
  };

  async function fetchWeatherData(city) {
    const weatherData = await weatherCall(city);
    return weatherData;
  }

  return (
    <>
      <div className="container">
        <TextField
          id="outlined-basic"
          label="Enter City Name"
          value={city}
          onChange={(e) => {
            setError(null);
            setCity(e.target.value);
          }}
          style={{
            marginLeft: "50px",
            marginTop: "20px",
            width: "40%",
          }}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <button
          onClick={handleButtonClick}
          style={{
            marginLeft: "20px",
            marginTop: "35px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Search />
        </button>
        {error && (
          <Typography
            ml={6}
            mt={2}
            color="error"
            variant="h6"
            style={{ fontWeight: "bold" }}
          >
            {error}
          </Typography>
        )}
        {data && (
          <div className="weather_info">
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <div className="icon-container">
                  <Cloudy size={60} strokeWidth={3} />
                  <Typography mt={2} variant="h4">
                    {Math.round(((data.days[0].temp - 32) * 5) / 9)} °C
                  </Typography>
                  <Typography mt={2} variant="h6">
                    {data.days[0].description}
                  </Typography>
                  <Typography mt={2} variant="h6">
                    {data.resolvedAddress}
                  </Typography>
                  <hr />
                </div>
                <Grid className="otherinfo" container spacing={10}>
                  <Grid item sm={4}>
                    <Typography mt={2} variant="h6">
                      Max Temp
                    </Typography>
                    <Typography ml={2} mt={2} variant="h6">
                      {Math.round(((data.days[0].tempmax - 32) * 5) / 9)} °C
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography mt={2} variant="h6">
                      Min Temp
                    </Typography>
                    <Typography ml={2} mt={2} variant="h6">
                      {Math.round(((data.days[0].tempmin - 32) * 5) / 9)} °C
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography mt={2} variant="h6">
                      UV Index
                    </Typography>
                    <Typography ml={4} mt={2} variant="h6">
                      {data.days[0].uvindex}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography mt={2} variant="h6">
                  {data.resolvedAddress}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
