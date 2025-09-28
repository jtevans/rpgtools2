import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenSpells3 from "./genSpells3";

class SpellBooks3 extends React.Component {
  render() {
    return (
      <Card variant="outlined" sx={{ height: 'fit-content' }}>
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="3rd Edition AD&D Wizard Spellbooks" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>
            <OutlinedInput id="SpellBooks3" size="small" sx={{ width: "30%", height: "16pt" }} /><br /><GenSpells3 />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default SpellBooks3;