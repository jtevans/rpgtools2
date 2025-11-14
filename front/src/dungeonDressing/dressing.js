import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import GenDressing from "./genDressing";

export default function DungeonDressing() {
  return (
    <Card variant="outlined">
      <CardHeader sx={{textAlign: "center", fontWeight: "bold"}} title="Dungeon Dressing" />
      <CardContent sx={{ textAlign: "center" }}>
        <GenDressing label='Air Current' type='1' /><br />
        <GenDressing label='Air Odor' type='2' /><br />
        <GenDressing label='Air Content' type='3' /><br />
        <GenDressing label='Sounds' type='4' /><br />
        <GenDressing label='General Items' type='5' /><br />
        <GenDressing label='Furniture' type='6' /><br />
        <GenDressing label='Religious Items' type='7' /><br />
        <GenDressing label='Torture Chamber' type='8' /><br />
        <GenDressing label='Mage Furnishings' type='9' /><br />
        <GenDressing label='Container Contents' type='10' /><br />
        <GenDressing label='Utensils' type='11' /><br />
        <GenDressing label='Random Assortment' type='0' /><br />
      </CardContent>
    </Card>
  );
}