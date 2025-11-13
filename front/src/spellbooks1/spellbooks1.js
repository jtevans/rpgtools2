import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography, Grid, OutlinedInput } from "@mui/material";
import Select from 'react-select';
import GenSpells1 from "./genSpells1";

export default function SpellBooks1() {
  const [spellbookData, setSpellbookData] = React.useState(
    {
      level: '0',
      intelligence: '0',
      maxNumSpells: true,
      gainSpells: false,
      phb: true,
      ua: false,
      av: false,
      name: '',
    },
  );
  
  const handleNameChange = (id) => (event) => {
    setSpellbookData((prevFormData) => ({
      ...prevFormData,
      name: event?.target?.value || '',
    }));
  };

  const handleCheckboxChange = (checkboxName, box) => {
    setSpellbookData((prevFormData) => ({
      ...prevFormData,
      [checkboxName]: box?.target?.checked || false,
    }));
  };

  const handleSelectChange = (selectName, option) => {
    setSpellbookData((prevFormData) => ({
      ...prevFormData,
      [selectName]: option?.value || '',
    }));
  };

  const WizardLevel = () => {
    let options = [];
    for (let i = 1; i <= 18; i++) {
      const num = i.toString();
      const obj = { value: num, label: num };
      options.push(obj);
    }
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === spellbookData.level;
        })}
        name="level"
        onChange={(option) => handleSelectChange('level', option)}
        options={options}
        isClearable={true}
        placeholder="Select Wizard Level"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  const WizardIntelligence = () => {
    let options = [];
    for (let i = 9; i <= 19; i++) {
      const num = i.toString();
      const obj = { value: num, label: num };
      options.push(obj);
    }
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === spellbookData.intelligence;
        })}
        name="intelligence"
        onChange={(option) => handleSelectChange('intelligence', option)}
        options={options}
        isClearable={true}
        placeholder="Select Wizard Intelligence"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st Edition AD&D Wizard Spellbooks" />
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
                Generate max # of spells per level based on intelligence?
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={spellbookData.maxNumSpells} type="checkbox" id="maxNumSpells" name="maxNumSpells" value="1" onChange={(box) => handleCheckboxChange('maxNumSpells', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Gain spells via adventuring?
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={spellbookData.gainSpells} type="checkbox" id="gainSpells" name="gainSpells" value="1" onChange={(box) => handleCheckboxChange('gainSpells', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Sourcebooks:
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                Player's Handbook (PHB) <input checked={spellbookData.phb} type="checkbox" id="phb" name="phb" value="1" onChange={(box) => handleCheckboxChange('phb', box)} /><br />
                Unearthed Arcana (UA) <input checked={spellbookData.ua} type="checkbox" id="ua" name="ua" value="1" onChange={(box) => handleCheckboxChange('ua', box)} />
                Arden Vul (AV) <input checked={spellbookData.av} type="checkbox" id="av" name="av" value="1" onChange={(box) => handleCheckboxChange('av', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Wizard name:
              </Typography>
            </Grid>
            <Grid size={6}>
              <OutlinedInput size="small" sx={{ height: "16pt" }} onChange={handleNameChange()} />
            </Grid>

          </Grid>
          <GenSpells1 spellbookData={spellbookData} />
        </Typography>
      </CardContent>
    </Card>
  );
}