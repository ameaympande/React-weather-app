import { Grid } from "@mui/material";
import "./app.css";
import Container from "./components/searchbar/Main";
import { useState } from "react";
import thunder from "./assets/thunder.jpg";
import clear from "./assets/clear.jpg";
import rain from "./assets/rain.jpg";
import cloudy from "./assets/cloudy.jpg";

function App() {
  const [bg, setBg] = useState(clear);

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

  return (
    <>
      <div className="screen" style={{ background: `url(${bg})` }}>
        <Grid className="heading" color="white" xs={12} sm={12}>
          Weather App
        </Grid>
        <div className="container">
          <Container updateBackground={updateBackground} />
        </div>
      </div>
    </>
  );
}

export default App;
