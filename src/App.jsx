import { Grid } from "@mui/material";
import "./app.css";
import Container from "./components/searchbar/Main";
import { useEffect, useState } from "react";
import thunder from "./assets/thunder.jpg";
import clear from "./assets/clear.jpg";
import rain from "./assets/rain.jpg";
import cloudy from "./assets/cloudy.jpg";

function App() {
  const [bg, setBg] = useState(clear);
  const [location, setLocation] = useState(null);

  const updateBackground = (imageUrl) => {
    if (imageUrl == "Partially cloudy") {
      setBg(cloudy);
    } else if (imageUrl == "Clear") {
      setBg(clear);
    } else if (imageUrl == "Rain, Partially cloudy") {
      setBg(rain);
    } else if (imageUrl == "thunder") {
      setBg(thunder);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("demo").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }, []);

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({ latitude, longitude });
  }

  return (
    <>
      <div className="screen" style={{ background: `url(${bg})` }}>
        <Grid className="heading" color="white" xs={12} sm={12}>
          Weather App
        </Grid>
        <div className="container">
          <Container updateBackground={updateBackground} location={location} />
        </div>
      </div>
    </>
  );
}

export default App;
