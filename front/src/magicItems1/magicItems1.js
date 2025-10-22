import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput, Typography } from "@mui/material";
import GenMagicItems1 from "./genMagicItems1";
import Select from 'react-select';

export default function MagicItems1() {
  const [magicItemsInput, setItemData] = React.useState({
    Any: 0,
    WeaponOrArmor: 0,
    Potion: 0,
    Scroll: 0,
    AnyExceptWeapon: 0,
    AllExceptPotionScroll: 0,
    MiscMagic: 0,
    SpecificType: '',
    Specific: 0,
  });

  const handleSpecificTypeChange = (id) => (selectedOption) => {
    setItemData((prevFormData) => ({
      ...prevFormData,
      SpecificType: selectedOption?.value || '',
    }));
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    value = parseInt(value ?? 0);

    setItemData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const SpecificSelect = () => {
    let options = [];
    options.push({ value: 'armor', label: 'Armor' });
    options.push({ value: 'bag_bottle', label: 'Bags & Bottles' });
    options.push({ value: 'book', label: 'Books' });
    options.push({ value: 'boot_glove', label: 'Boots & Gloves' });
    options.push({ value: 'clothing', label: 'Clothing' });
    options.push({ value: 'dust_stone', label: 'Dusts & Stones' });
    options.push({ value: 'gem_jewelry', label: 'Gems & Jewelry' });
    options.push({ value: 'girdle_helm', label: 'Girdles & Helms' });
    options.push({ value: 'household', label: 'Household Items' });
    options.push({ value: 'humorous', label: 'Humorous' });
    options.push({ value: 'musical_instrument', label: 'Musical Instruments' });
    options.push({ value: 'potion', label: 'Potions' });
    options.push({ value: 'ring', label: 'Rings' });
    options.push({ value: 'rod', label: 'Rods' });
    options.push({ value: 'scroll', label: 'Scrolls' });
    options.push({ value: 'staff', label: 'Staves' });
    options.push({ value: 'wand', label: 'Wands' });
    options.push({ value: 'weapon', label: 'Weapons' });
    options.push({ value: 'weird', label: 'Weird Items' });
    return <div>
      <Select
        value={options.filter(function (option) {
          return option.value === magicItemsInput.SpecificType;
        })}
        onChange={handleSpecificTypeChange()}
        options={options}
        isClearable={true}
        placeholder="Pick Category Type"
        sx={{ width: "30%", height: "12pt" }}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>;
  }

  return (
    <Card variant="outlined">
      <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st/2nd Edition AD&D Magic Items" />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          Source: Encyclopedia Magica (the 4 volume set)
        </Typography>
        <Grid container>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Any Magic Item:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="Any" name="Any" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Weapon or Armor:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="WeaponOrArmor" name="WeaponOrArmor" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Potion:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="Potion" name="Potion" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Scroll</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="Scroll" name="Scroll" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Any, Except Weapon:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="AnyExceptWeapon" name="AnyExceptWeapon" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>1 Each, No Potion or Scroll:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="AllExceptPotionScroll" name="AllExceptPotionScroll" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Misc. Magic Item:</Grid>
          <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="MiscMagic" name="MiscMagic" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
          <Grid size={12} sx={{ textAlign: "center" }}><hr /></Grid>
          <Grid size={12} sx={{ textAlign: "center", paddingRight: "2px" }}>Specific Magic Category:</Grid>
          <Grid size={12} sx={{ textAlign: "center" }}><SpecificSelect /></Grid>
          <Grid size={12} sx={{ textAlign: "center" }}>(1-50) <OutlinedInput id="Specific" name="Specific" size="small" sx={{ width: "30%", height: "16pt" }} onChange={handleChange} /></Grid>
        </Grid>
        <Typography>
          <GenMagicItems1 magicItemsInput={ magicItemsInput } />
        </Typography>
      </CardContent>
    </Card>
  );
}
