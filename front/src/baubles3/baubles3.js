import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenSpecial3 from "./genSpecial3";

export default function Baubles3() {
  const [baubleData, setBaubleData] = React.useState({
    gems: 0,
    art: 0,
    mundane: 0,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setBaubleData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 Baubles" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>
            <OutlinedInput id="gems" name="gems" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br /><GenSpecial3 title={'Gems'} API={'gems3.php'} amount={baubleData.gems} />
          </Typography>
          <Typography>
            <OutlinedInput id="art" name="art" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br /><GenSpecial3 title={'Art'} API={'art.php'} amount={ baubleData.art } />
          </Typography>
          <Typography>
            <OutlinedInput id="mundane" name="mundane" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br /><GenSpecial3 title={'Mundane Items'} API={'mundane.php'} amount={baubleData.mundane} />
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}