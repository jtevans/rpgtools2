import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import { Grid } from '@mui/material';
import GenTreasure3 from "./genTreasure3";

export default function Treasure3() {
  return (
    <Card variant="outlined">
      <CardHeader sx={{
        textAlign: "center",
        fontWeight: "bold"
      }} title="D&D 3e/3.5/Pathfinder 1 Treasure" />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              CR (1-20)
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              Quantity (1-200)
            </Typography>
          </Grid>
          <Grid size={6}><OutlinedInput id="treasure3_cr0" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_q0" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_cr1" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_q1" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_cr2" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_q2" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_cr3" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_q3" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_cr4" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
          <Grid size={6}><OutlinedInput id="treasure3_q4" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
        </Grid>
        <GenTreasure3 />
      </CardContent>
    </Card>
  );
}