import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput } from "@mui/material";
import GenCraftCalculator from "./genCraftCalculator";

export default function CraftCalculator() {
  const [craftData, setCraftData] = React.useState({
    SP: 0,
    DC: 0,
    bonus: 0,
  });
  
  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setCraftData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 Craft Calculator" />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Final Price in SP:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="SP" name="SP" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Crafting DC:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="DC" name="DC" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Craft Skill Bonus:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="bonus" name="bonus" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={12} sx={{ textAlign: "center" }}><GenCraftCalculator craftData={craftData} /></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}