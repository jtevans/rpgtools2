import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Select from 'react-select';
import GenGiant from "./genGiant";

export default function GiantBag() {
  const [giantType, setGiantType] = React.useState(1);

  const handleGiantTypeChange = (selectedOption) => {
    setGiantType(selectedOption?.value || 1);
  };

  const GiantTypeSelect = () => {
    let options = [];
    options.push({ value: 1, label: 'Cloud Giant' });
    options.push({ value: 2, label: 'Fire Giant' });
    options.push({ value: 3, label: 'Frost Giant' });
    options.push({ value: 4, label: 'Hill Giant' });
    options.push({ value: 5, label: 'Stone Giant' });
    options.push({ value: 6, label: 'Storm Giant' });

    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === giantType;
        })}
        onChange={handleGiantTypeChange}
        options={options}
        isClearable={false}
        placeholder="Pick Giant Type"
        sx={{ width: "30%", height: "16pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="Giant Bags" />
      <CardContent sx={{ textAlign: "center" }}>
        <GiantTypeSelect />
        <GenGiant giantType={giantType} />
      </CardContent>
    </Card>
  );
}