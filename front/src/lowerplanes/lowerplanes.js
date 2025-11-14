import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography } from "@mui/material";
import GenLowerplanes from "./genLowerplanes";

export default function Lowerplanes() {
  const [lowerAmount, setLowerAmount] = React.useState(0);
  
  const handleChange = (event) => {
    setLowerAmount(parseInt(event.target.value) || 0);
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="Generate Creatures from the Lower Planes" />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography>
          Number to Generate (1-30): <OutlinedInput id="lowerAmount" name="lowerAmount" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /><br />
          <GenLowerplanes amount={lowerAmount} />
        </Typography>
      </CardContent>
    </Card>
  );
}