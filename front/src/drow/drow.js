import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput, Typography } from "@mui/material";
import Select from 'react-select';
import GenDrow from "./genDrow";

export default function Drow() {
  const [drowData, setDrowData] = React.useState(
    [
      {
        drowLevel: 0,
        numDrow: 0,
      },
      {
        drowLevel: 0,
        numDrow: 0,
      },
      {
        drowLevel: 0,
        numDrow: 0,
      },
    ]
  );

  const handleQuantityChange = (id) => (event) => {
    setDrowData((prevFormData) =>
      prevFormData.map((oldDrowData, idx) =>
        idx === id ? { ...oldDrowData, numDrow: parseInt(event.target.value) || 0 } : oldDrowData
      )
    );
  };

  const handleDrowLevelChange = (id) => (selectedOption) => {
    setDrowData((prevFormData) =>
      prevFormData.map((oldDrowData, idx) =>
        idx === id ? { ...oldDrowData, drowLevel: selectedOption?.value || 0 } : oldDrowData
      )
    );
  };

  const DrowLevelSelect = (targetID) => {
    const id = parseInt(targetID.id.split('_')[1]);
    let options = [];
    options.push({ value: 1, label: '1-2' });
    options.push({ value: 2, label: '3-7' });
    options.push({ value: 3, label: '8+' });
    
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === drowData[id].drowLevel;
        })}
        onChange={handleDrowLevelChange(id)}
        options={options}
        isClearable={false}
        placeholder="Pick Drow Level"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="Incidental Drow Treasure" />
      <CardContent sx={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              Drow Level
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
              # of Drow
            </Typography>
          </Grid>
          <Grid size={6}><DrowLevelSelect id='level_0' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(0)} /></Grid>
          <Grid size={6}><DrowLevelSelect id='level_1' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(1)} /></Grid>
          <Grid size={6}><DrowLevelSelect id='level_2' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(2)} /></Grid>
        </Grid>
        <GenDrow drowData={ drowData } />
      </CardContent>
    </Card>
  );
}