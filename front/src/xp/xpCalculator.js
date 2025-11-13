import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import { Grid } from '@mui/material';
import GenXPCalculator from "./genXPCalculator";

export default function XPCalculator() {
  const [partyData, setPartyData] = React.useState({
    partyLevel: 0,
    numChars: 0,
  });

  const [monsterData, setMonsterData] = React.useState(
    [
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
      {
        cr: 0,
        q: 0,
      },
    ]
  );

  React.useEffect(() => {
    console.log(partyData, monsterData);
  }, [partyData, monsterData]);

  const handleQuantityChange = (id) => (event) => {
    setMonsterData((prevFormData) =>
      prevFormData.map((oldData, idx) =>
        idx === id ? { ...oldData, q: parseInt(event.target.value) || 0 } : oldData
      )
    );
  };

  const handleCRChange = (id) => (event) => {
    setMonsterData((prevFormData) =>
      prevFormData.map((oldData, idx) =>
        idx === id ? { ...oldData, cr: parseInt(event.target.value) || 0 } : oldData
      )
    );
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setPartyData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <Card variant="outlined">
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="D&D 3e/3.5/Pathfinder 1 XP Calculator" />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              Party Level:
            </Typography>
          </Grid>
          <Grid size={6}><OutlinedInput id="partyLevel" name="partyLevel" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>

          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              # Party Members:
            </Typography>
          </Grid>
          <Grid size={6}><OutlinedInput id="numChars" name="numChars" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>

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
          <Grid size={6}><OutlinedInput id="cr0" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(0)} /></Grid>
          <Grid size={6}><OutlinedInput id="q0" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(0)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr1" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(1)} /></Grid>
          <Grid size={6}><OutlinedInput id="q1" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(1)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr2" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(2)} /></Grid>
          <Grid size={6}><OutlinedInput id="q2" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(2)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr3" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(3)} /></Grid>
          <Grid size={6}><OutlinedInput id="q3" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(3)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr4" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(4)} /></Grid>
          <Grid size={6}><OutlinedInput id="q4" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(4)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr5" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(5)} /></Grid>
          <Grid size={6}><OutlinedInput id="q5" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(5)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr6" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(6)} /></Grid>
          <Grid size={6}><OutlinedInput id="q6" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(6)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr7" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(7)} /></Grid>
          <Grid size={6}><OutlinedInput id="q7" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(7)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr8" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(8)} /></Grid>
          <Grid size={6}><OutlinedInput id="q8" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(8)} /></Grid>
          <Grid size={6}><OutlinedInput id="cr9" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleCRChange(9)} /></Grid>
          <Grid size={6}><OutlinedInput id="q9" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleQuantityChange(9)} /></Grid>
        </Grid>
        <GenXPCalculator partyData={partyData} monsterData={monsterData} />
      </CardContent>
    </Card>
  );
}