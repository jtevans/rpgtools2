import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { OutlinedInput, Typography, Grid } from "@mui/material";
import Select from 'react-select';
import GenSpells3 from "./genSpells3";

let schools = [];
schools.push({ value: 'none', label: 'None' });
schools.push({ value: 'abjuration', label: 'Abjuration' });
schools.push({ value: 'conjuration', label: 'Conjuration' });
schools.push({ value: 'divination', label: 'Divination' });
schools.push({ value: 'enchantment', label: 'Enchantment' });
schools.push({ value: 'evocation', label: 'Evocation' });
schools.push({ value: 'illusion', label: 'Illusion' });
schools.push({ value: 'necromancy', label: 'Necromancy' });
schools.push({ value: 'transmutation', label: 'Transmutation' });


const handleSelectChange = (id) => (selectedOption) => {
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

const WizardLevel = () => {
  let options = [];
  for (let i = 1; i <= 20; i++) {
    const obj = { value: i, label: i };
    options.push(obj);
  }
  return <div>
    <Select
      onChange={handleSelectChange('wizardLevel')}
      options={options}
      isClearable={true}
      placeholder="Select Wizard Level"
      sx={{ width: "30%", height: "16pt" }}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  
  />
    <input id="wizardLevel" type="hidden" value="" />
  </div>;
}

const WizardIntelligence = () => {
  let options = [];
  for (let i = 10; i <= 30; i++) {
    const obj = { value: i, label: i };
    options.push(obj);
  }
  return <div>
    <Select
      onChange={handleSelectChange('wizardIntelligence')}
      options={options}
      isClearable={true}
      placeholder="Select Wizard Intelligence"
      sx={{ width: "30%", height: "16pt" }}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  
    />
    <input id="wizardIntelligence" type="hidden" value="" />
  </div>;
}

const WizardSpecialist = () => {
  return <div>
    <Select
      onChange={handleSelectChange('wizardSpecialist')}
      options={schools}
      isClearable={true}
      placeholder="Select Specialization (if any)"
      sx={{ width: "30%", height: "16pt" }}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  
    />
    <input id="wizardSpecialist" type="hidden" value="" />
  </div>;
}

const WizardRestricted = () => {
  return <div>
    <Select
      multiple={true}
      onChange={handleSelectChange('wizardRestricted')}
      options={schools}
      sx={{ width: "30%", height: "16pt" }}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  
    />
    <input id="wizardRestricted" type="hidden" value="" />
  </div>;
}

class SpellBooks3 extends React.Component {
  render() {
    return (
      <Card variant="outlined" sx={{ height: 'fit-content' }}>
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="3rd Edition AD&D Wizard Spellbooks" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography sx={{ textAlign: "right" }}>
                  Wizard Level:
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography sx={{ textAlign: "left" }}>
                  <WizardLevel />
                </Typography>
              </Grid>

              <Grid size={6}>
                <Typography sx={{ textAlign: "right" }}>
                  Intelligence:
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography sx={{ textAlign: "left" }}>
                  <WizardIntelligence />
                </Typography>
              </Grid>

              <Grid size={6}>
                <Typography sx={{ textAlign: "right" }}>
                  Gain spells via adventuring?
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography sx={{ textAlign: "left" }}>
                  <input type="checkbox" id="adventure" name="adventure" value="1" />
                </Typography>
              </Grid>

              <Grid size={6}>
                <Typography sx={{ textAlign: "right" }}>
                  Specialist:
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography sx={{ textAlign: "left" }}>
                  <WizardSpecialist />
                </Typography>
              </Grid>

              <Grid size={6}>
                <Typography sx={{ textAlign: "right" }}>
                  Restricted Schools (if any):
                </Typography>
              </Grid>
              <Grid size={6}>
                <Typography sx={{ textAlign: "left" }}>
                  <WizardRestricted />
                </Typography>
              </Grid>


            </Grid>
            <GenSpells3 />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default SpellBooks3;