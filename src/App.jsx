import { Grid } from "@mui/material";
import "./app.css";
import Container from "./components/searchbar/Main";

function App() {
  return (
    <>
      <Grid className="heading" color="white" xs={12} sm={12}>
        Weather App
      </Grid>
      <div className="container">
        <Container />
      </div>
    </>
  );
}

export default App;
