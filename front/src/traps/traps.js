import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Trap from "./getTraps";

class Traps extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{textAlign: "center", fontWeight: "bold"}} title="Traps" />
        <CardContent sx={{ textAlign: "center" }}>
          <Trap label='Harmless Traps' type='harmless' /><br />
          <Trap label='Moderate Traps' type='moderate' /><br />
          <Trap label='Deadly Traps' type='deadly' /><br />
          <Trap label='Nasty Tricks' type='tricks' /><br />
        </CardContent>
      </Card>
    );
  }
}
export default Traps;