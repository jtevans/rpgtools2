import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography, OutlinedInput } from "@mui/material";
import GenTreasure1 from "./genTreasure1";
import Select from 'react-select';


const handleAlphaSelectChange = (id) => (selectedOption) => {
  let elem = document.getElementById(id);
  if (elem) {
    if (selectedOption) {
      elem.value = selectedOption.value;
    }
    else {
      elem.value = '';
    }
  }
};

const AlphaSelect = (targetID) => {
  const id = targetID.id;
  let options = [];
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    const obj = { value: char, label: char };
    options.push(obj);
  }
  return <div><Select onChange={handleAlphaSelectChange(id)} options={options} isClearable={true} placeholder="Pick Treasure Type" sx={{ width: "30%", height: "16pt" }} /><input id={`${id}`} type="hidden" value="" /></div>;
}

class Treasure1 extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st Edition AD&D Treasure" />
        <CardContent sx={{ textAlign: "center" }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Treasure Type
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Quantity (1-200)
              </Typography>
            </Grid>
            <Grid size={6}><AlphaSelect id='treasure1_0' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q0" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_1' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q1" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_2' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q2" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_3' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q3" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_4' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q4" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_5' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q5" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_6' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q6" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_7' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q7" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_8' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q8" size="small" sx={{ width: "30%" }} /></Grid>
            <Grid size={6}><AlphaSelect id='treasure1_9' /></Grid>
            <Grid size={6}><OutlinedInput id="treasure1_q9" size="small" sx={{ width: "30%" }} /></Grid>

          </Grid>
          <GenTreasure1 />
        </CardContent>
      </Card>
    );
  }
}
export default Treasure1;