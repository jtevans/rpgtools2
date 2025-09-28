import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenGems3 from "./genGems3";
import GenArt3 from "./genArt3";
import GenMundane3 from "./genMundane3";

class Baubles3 extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 Baubles" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>
            <OutlinedInput id="Gems" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenGems3 source="Gems" />
          </Typography>
          <Typography>
            <OutlinedInput id="Art" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenArt3 source="Art" />
          </Typography>
          <Typography>
            <OutlinedInput id="Mundane" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenMundane3 source="Mundane" />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default Baubles3;