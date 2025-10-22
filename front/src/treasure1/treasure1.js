import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography, OutlinedInput } from "@mui/material";
import GenTreasure1 from "./genTreasure1";
import Select from 'react-select';

export default function Treasure1() {
  const [treasureData, setTreasureData] = React.useState(
    [
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
      {
        treasureType: '',
        quantity: 0,
      },
    ],
  );
  
  const handleQuantityChange = (id) => (event) => {
    setTreasureData((prevFormData) =>
      prevFormData.map((oldTreasure, idx) =>
        idx === id ? { ...oldTreasure, quantity: parseInt(event.target.value) || 0 } : oldTreasure
      )
    );
  };
  
  const handleTypeChange = (id) => (selectedOption) => {
    setTreasureData((prevFormData) =>
      prevFormData.map((oldTreasure, idx) =>
        idx === id ? { ...oldTreasure, treasureType: selectedOption?.value || '' } : oldTreasure
      )
    );
  };

  const TypeSelect = (targetID) => {
    const id = parseInt(targetID.id.split('_')[1]);
    let options = [];
    for (let i = 65; i <= 90; i++) {
      const char = String.fromCharCode(i);
      const obj = { value: char, label: char };
      options.push(obj);
    }
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === treasureData[id].treasureType;
        })}
        onChange={handleTypeChange(id)}
        options={options}
        isClearable={true}
        placeholder="Pick Treasure Type"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

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
          <Grid size={6}><TypeSelect id='type_0' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(0)} /></Grid>
          <Grid size={6}><TypeSelect id='type_1' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(1)} /></Grid>
          <Grid size={6}><TypeSelect id='type_2' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(2)} /></Grid>
          <Grid size={6}><TypeSelect id='type_3' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(3)} /></Grid>
          <Grid size={6}><TypeSelect id='type_4' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(4)} /></Grid>
          <Grid size={6}><TypeSelect id='type_5' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(5)} /></Grid>
          <Grid size={6}><TypeSelect id='type_6' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(6)} /></Grid>
          <Grid size={6}><TypeSelect id='type_7' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(7)} /></Grid>
          <Grid size={6}><TypeSelect id='type_8' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(8)} /></Grid>
          <Grid size={6}><TypeSelect id='type_9' /></Grid>
          <Grid size={6}><OutlinedInput size="small" sx={{ width: "30%" }} onChange={handleQuantityChange(9)} /></Grid>
        </Grid>
        <GenTreasure1 treasureInput={ treasureData } />
      </CardContent>
    </Card>
  );
}