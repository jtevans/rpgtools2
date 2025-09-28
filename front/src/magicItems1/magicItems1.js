import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Grid, OutlinedInput, Typography } from "@mui/material";
import GenMagicItems1 from "./genMagicItems1";
import Select from 'react-select';

const handleSpecificSelectChange = () => (selectedOption) => {
  let elem = document.getElementById('magicitem1-specificType');
  if (elem) {
    if (selectedOption) {
      elem.value = selectedOption.value;
    }
    else {
      elem.value = '';
    }
  }
};

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
  return <div><Select onChange={handleSpecificSelectChange()} options={options} isClearable={true} placeholder="Pick Category Type" sx={{ width: "30%", height: "12pt" }} /><input id="magicitem1-specificType" type="hidden" value="" /></div>;
}

class MagicItems1 extends React.Component {

  render() {
    return (
      <Card variant="outlined">
        <CardHeader sx={{ textAlign: "center", fontWeight: "bold" }} title="1st/2nd Edition AD&D Magic Items" />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Source: Encyclopedia Magica (the 4 volume set)
          </Typography>
          <Grid container>
            <Grid size={12} sx={{ textAlign: "center", paddingRight: "2px" }}>Specific Magic Category:</Grid>
            <Grid size={12} sx={{ textAlign: "center" }}><SpecificSelect /></Grid>
            <Grid size={12} sx={{ textAlign: "center" }}>(1-50) <OutlinedInput id="magicitem1-Specific" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={12} sx={{ textAlign: "center" }}><hr /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Any Magic Item:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-Any" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Weapon or Armor:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-WeaponOrArmor" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Potion:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-Potion" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Scroll</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-Scroll" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Any, Except Weapon:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-AnyExceptWeapon" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>1 Each, No Potion or Scroll:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-AllExceptPotionScroll" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>
            <Grid size={6} sx={{ textAlign: "right", paddingRight: "2px" }}>Misc. Magic Item:</Grid>
            <Grid size={6} sx={{ textAlign: "left" }}><OutlinedInput id="magicitem1-MiscMagic" size="small" sx={{ width: "30%", height: "16pt" }} /></Grid>            
          </Grid>
          <Typography>
            <GenMagicItems1 source="magicitem1" />
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
export default MagicItems1;