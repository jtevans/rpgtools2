import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput, Typography } from "@mui/material";
import GenMagicItems3 from "./genMagicItems3";

export default function MagicItems3() {
  const [itemData, setItemData] = React.useState({
    minor: 0,
    medium: 0,
    major: 0,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setItemData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <Card variant="outlined">
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 Magic Items" />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Minor Magic Items:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="minor" name="minor" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Medium Magic Items:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="medium" name="medium" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange}  /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Major Magic Items:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="major" name="major" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
        </Grid>
        <Typography>
          <GenMagicItems3 minorAmount={itemData.minor} mediumAmount={itemData.medium} majorAmount={itemData.major} />
        </Typography>
      </CardContent>
    </Card>
  );
}
