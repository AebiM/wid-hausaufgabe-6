import {
  TextField,
  Select,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useState } from "react";

// const URLbeispiel =
//   "http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=7.43863&northing=46.95108&altitude=550.0&format=json";

// const URLroh = "http://geodesy.geo.admin.ch/reframe/";

function App() {
  const [Methode, setMethode] = useState("");
  const [Northing, setNorthing] = useState("");
  const [Easting, setEasting] = useState("");
  const [Koord, setKoord] = useState([]);

  const URL = `http://geodesy.geo.admin.ch/reframe/${
    Methode !== "" ? Methode : ""
  }?easting=${Easting !== "" ? Easting : ""}&northing=${
    Northing !== "" ? Northing : ""
  }`;
  // console.log(URL);

  async function fetchKoord() {
    // console.log("Clicked");
    const resp = await fetch(URL);
    const data = await resp.json();
    setKoord(data);
    // console.log(Koord);
  }

  return (
    <>
      <Typography variant="h1">Koordinatentransformation</Typography>

      <TextField
        id="east"
        label="Easting"
        variant="outlined"
        value={Easting}
        onChange={(e) => {
          setEasting(e.target.value);
        }}
        style={{ marginBottom: 10 }}
      />

      <TextField
        id="north"
        label="Northing"
        variant="outlined"
        value={Northing}
        onChange={(e) => {
          setNorthing(e.target.value);
        }}
        style={{ marginBottom: 10 }}
      />

      <FormControl fullWidth style={{ marginBottom: 10 }}>
        <InputLabel id="demo-simple-select-label">REFRAME Service</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Methode}
          label="REFRAME Service"
          onChange={(e) => {
            setMethode(e.target.value);
          }}
        >
          <MenuItem value={"wgs84tolv95"}>wgs84tolv95</MenuItem>
          <MenuItem value={"lv95towgs84"}>lv95towgs84</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 10 }}
        onClick={() => fetchKoord()}
      >
        Transformieren
      </Button>
      <p>{Koord.length > 0 && JSON.stringify(Koord)}</p>

      <TextField
        id="x"
        label="Transformed X"
        variant="outlined"
        style={{ marginBottom: 10 }}
      />
      <TextField
        id="y"
        label="Transformed Y"
        variant="outlined"
        style={{ marginBottom: 10 }}
      />
    </>
  );
}

export default App;
