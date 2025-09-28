import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DwarfName from "./Dwarf";
import MFName from "./MaleFemale";
import TwoPartName from "./TwoPart";
import KoreanName from "./Korean";
import AllNames from "./All";
import RandomNames from "./Random";

class NameGenerators extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{textAlign: "center", fontWeight: "bold"}} title="Name Generators" />
        <CardContent sx={{ textAlign: "center" }}>
          <MFName type='arabic' /><br />
          <MFName type='cornish' /><br />
          <MFName type='drow' /><br />
          <DwarfName /><br />
          <TwoPartName type='elf' /><br />
          <TwoPartName type='gaelic' /><br />
          <MFName type='german' /><br />
          <KoreanName /><br />
          <TwoPartName type='orc' /><br />
          <MFName type='viking' /><br />
          <AllNames /><br />
          <RandomNames /><br />
        </CardContent>
      </Card>
    );
  }
}
export default NameGenerators;