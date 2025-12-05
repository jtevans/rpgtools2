import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography, Grid, OutlinedInput } from "@mui/material";
import Select from 'react-select';
import GenCity from "./genCity";

export default function City() {
  const [cityData, setCityData] = React.useState(
    {
      name: '',
      density: '0',
      size: '0',
      makeNames: true,
      agricultural: false,
      wine: false,
      grazing: false,
      hills: false,
      forest: false,
      port: false,
      military: false,
    },
  );
  
  const handleNameChange = (id) => (event) => {
    setCityData((prevFormData) => ({
      ...prevFormData,
      name: event?.target?.value || '',
    }));
  };

  const handleCheckboxChange = (checkboxName, box) => {
    setCityData((prevFormData) => ({
      ...prevFormData,
      [checkboxName]: box?.target?.checked || false,
    }));
  };

  const handleSelectChange = (selectName, option) => {
    setCityData((prevFormData) => ({
      ...prevFormData,
      [selectName]: option?.value || '',
    }));
  };

  const Density = () => {
    let options = [];
    options.push({ value: '0', label: 'Random' });
    options.push({ value: '1', label: 'Sparse' });
    options.push({ value: '2', label: 'Low' });
    options.push({ value: '3', label: 'Average' });
    options.push({ value: '4', label: 'High' });
    options.push({ value: '5', label: 'Very High' });
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === cityData.density;
        })}
        name="density"
        onChange={(option) => handleSelectChange('density', option)}
        options={options}
        isClearable={true}
        placeholder="Select City Density"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  const Size = () => {
    let options = [];
    options.push({ value: '0', label: 'Random' });
    options.push({ value: '1', label: 'Village' });
    options.push({ value: '2', label: 'Town' });
    options.push({ value: '3', label: 'City' });
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === cityData.size;
        })}
        name="size"
        onChange={(option) => handleSelectChange('size', option)}
        options={options}
        isClearable={true}
        placeholder="Select City Size"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="City Generator" />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Name:
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <OutlinedInput size="small" sx={{ height: "16pt" }} onChange={handleNameChange()} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Density:
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <Density />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Size:
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <Size />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Make Establishment Names
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.makeNames} type="checkbox" id="makeNames" name="makeNames" value="1" onChange={(box) => handleCheckboxChange('makeNames', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Agricultural Area
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.agricultural} type="checkbox" id="agricultural" name="agricultural" value="1" onChange={(box) => handleCheckboxChange('agricultural', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Wine Country
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.wine} type="checkbox" id="wine" name="wine" value="1" onChange={(box) => handleCheckboxChange('wine', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Grazing/Herding Area
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.grazing} type="checkbox" id="grazing" name="grazing" value="1" onChange={(box) => handleCheckboxChange('grazing', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Hills/Mountains
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.hills} type="checkbox" id="hills" name="hills" value="1" onChange={(box) => handleCheckboxChange('hills', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Forest/Woodlands
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.forest} type="checkbox" id="forest" name="forest" value="1" onChange={(box) => handleCheckboxChange('forest', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Port City
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.port} type="checkbox" id="port" name="port" value="1" onChange={(box) => handleCheckboxChange('port', box)} />
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ textAlign: "right" }}>
                Military City
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "left" }}>
                <input checked={cityData.military} type="checkbox" id="military" name="military" value="1" onChange={(box) => handleCheckboxChange('military', box)} />
              </Typography>
            </Grid>

          </Grid>
          <GenCity cityData={cityData} />
        </Typography>
      </CardContent>
    </Card>
  );
}