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

function App() {
  const [Methode, setMethode] = useState("");
  const [Northing, setNorthing] = useState("");
  const [Easting, setEasting] = useState("");

  const [X, setX] = useState("");
  const [Y, setY] = useState("");

  const URL = `http://geodesy.geo.admin.ch/reframe/${
    Methode !== "" ? Methode : ""
  }?easting=${Easting !== "" ? Easting : ""}&northing=${
    Northing !== "" ? Northing : ""
  }`;

  async function fetchKoord() {
    try {
      const resp = await fetch(URL);
      const data = await resp.json();

      setX(data.coordinates[0]);
      setY(data.coordinates[1]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
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
        onClick={fetchKoord}
      >
        Transformieren
      </Button>

      <TextField
        id="x"
        label="Transformed X"
        variant="outlined"
        value={X}
        style={{ marginBottom: 10 }}
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        id="y"
        label="Transformed Y"
        variant="outlined"
        value={Y}
        style={{ marginBottom: 10 }}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );
}

export default App;
