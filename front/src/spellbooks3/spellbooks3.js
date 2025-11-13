import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography, Grid } from "@mui/material";
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

export default function SpellBooks3() {
  const [spellbookData, setSpellbookData] = React.useState(
    {
      level: '0',
      intelligence: '0',
      gainSpells: false,
      specialist: '',
      restrictedSchools: [],
      phb: true,
      bvd: false,
    },
  );

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

  const handleRestrictedSchoolsChange = (selected) => {
    console.log(selected);
    setSpellbookData((prevFormData) => ({
      ...prevFormData,
      'restrictedSchools': selected,
    }));
  };

  const WizardLevel = () => {
    let options = [];
    for (let i = 1; i <= 20; i++) {
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
    for (let i = 10; i <= 30; i++) {
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

  const WizardSpecialist = () => {
    return <div>
      <Select
        value={schools.filter(function (school) {
          return school.value === spellbookData.specialist;
        })}
        name="specialist"
        onChange={(option) => handleSelectChange('specialist', option)}
        options={schools}
        isClearable={true}
        placeholder="Select Specialization (if any)"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  const WizardRestricted = () => {
    return <div>
      <Select
        value={spellbookData.restrictedSchools}
        name="restrictedSchools"
        isMulti
        onChange={handleRestrictedSchoolsChange}
        options={schools}
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        className="basic-multi-select"
      />
    </div>;
  }

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
                <input checked={spellbookData.gainSpells} type="checkbox" id="gainSpells" name="gainSpells" value="1" onChange={(box) => handleCheckboxChange('gainSpells', box)} />
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

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Sourcebooks:
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                Player's Handbook (PHB) <input checked={spellbookData.phb} type="checkbox" id="phb" name="phb" value="1" onChange={(box) => handleCheckboxChange('phb', box)} /><br />
                Book of Vile Darkness (BVD) <input checked={spellbookData.bvd} type="checkbox" id="bvd" name="bvd" value="1" onChange={(box) => handleCheckboxChange('bvd', box)} />
              </Typography>
            </Grid>

          </Grid>
          <GenSpells3 spellbookData={spellbookData} />
        </Typography>
      </CardContent>
    </Card>
  );
}