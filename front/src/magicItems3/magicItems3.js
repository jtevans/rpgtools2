import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput, Typography } from "@mui/material";
import GenMagicItems3 from "./genMagicItems3";

class MagicItems3 extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 Magic Items" />
        <CardContent sx={{ textAlign: "center" }}>
          <Grid container>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Minor Magic Items:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="main-Minor" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Medium Magic Items:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="main-Medium" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Major Magic Items:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="main-Major" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          </Grid>
          <Typography>
            <GenMagicItems3 sourcePrefix="main" />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default MagicItems3;