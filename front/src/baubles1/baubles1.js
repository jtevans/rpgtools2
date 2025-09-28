import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenGems1 from "./genGems1";
import GenJewelry1 from "./genJewelry1";

class Baubles1 extends React.Component {
  render() {
    return (
      <Card variant="outlined" sx={{ height: 'fit-content' }}>
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st Edition AD&D Baubles" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>
            <OutlinedInput id="Gems1" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenGems1 source="Gems1" />
          </Typography>
          <Typography>
            <OutlinedInput id="Jewelry1" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenJewelry1 source="Jewelry1" />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default Baubles1;