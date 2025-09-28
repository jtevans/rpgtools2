import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Dressing from "./getDressing";

class DungeonDressing extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{textAlign: "center", fontWeight: "bold"}} title="Dungeon Dressing" />
        <CardContent sx={{ textAlign: "center" }}>
          <Dressing label='Air Current' type='1' /><br />
          <Dressing label='Air Odor' type='2' /><br />
          <Dressing label='Air Content' type='3' /><br />
          <Dressing label='Sounds' type='4' /><br />
          <Dressing label='General Items' type='5' /><br />
          <Dressing label='Furniture' type='6' /><br />
          <Dressing label='Religious Items' type='7' /><br />
          <Dressing label='Torture Chamber' type='8' /><br />
          <Dressing label='Mage Furnishings' type='9' /><br />
          <Dressing label='Container Contents' type='10' /><br />
          <Dressing label='Utensils' type='11' /><br />
          <Dressing label='Random Assortment' type='0' /><br />
        </CardContent>
      </Card>
    );
  }
}
export default DungeonDressing;