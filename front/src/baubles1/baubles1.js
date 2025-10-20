import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenSpecial1 from "./genSpecial1";

export default function Baubles1() {
  const [bauble1Data, setBauble1Data] = React.useState({
    Gems1: 0,
    Jewelry1: 0,
  });
  
  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setBauble1Data((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st Edition AD&D Baubles" />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography>
          <OutlinedInput id="Gems1" name="Gems1" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br /><GenSpecial1 title={'Gems'} API={'gems1.php'} amount={bauble1Data.Gems1} />
        </Typography>
        <Typography>
          <OutlinedInput id="Jewelry1" name="Jewelry1" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br /><GenSpecial1 title={'Jewelry'} API={'jewelry.php'} amount={bauble1Data.Jewelry1} />
        </Typography>
      </CardContent>
    </Card>
  );
}