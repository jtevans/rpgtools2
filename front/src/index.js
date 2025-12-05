import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Typography } from '@mui/material';
import NameGenerators from './nameGenerators/nameGenerators';
import DungeonDressing from './dungeonDressing/dressing';
import Traps from './traps/traps';
import Treasure3 from './treasure3/treasure3';
import Baubles3 from './baubles3/baubles3';
import MagicItems3 from './magicItems3/magicItems3';
import MagicItems1 from './magicItems1/magicItems1';
import Baubles1 from './baubles1/baubles1';
import Treasure1 from './treasure1/treasure1';
import IntelligentWeapon from './magicItems1/genIntelligentWeapon';
import SpellBooks3 from './spellbooks3/spellbooks3';
import SpellBooks1 from './spellbooks1/spellbooks1';
import Drow from './drow/drow';
import GiantBag from './giant/giant';
import Lowerplanes from './lowerplanes/lowerplanes';
import CraftCalculator from './craftCalculator/craftCalculator'
import XPCalculator from './xp/xpCalculator'
import City from './city/city';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Grid container spacing={2}>

      <Grid size={4}>
        <NameGenerators />
      </Grid>

      <Grid size={4}>
        <DungeonDressing />
      </Grid>

      <Grid size={4}>
        <Traps /><br />
        <Lowerplanes />
      </Grid>

      <Grid size={4}>
        <Treasure3 /><br />
        <Treasure1 />
      </Grid>

      <Grid size={4}>
        <Baubles3 /><br />
        <Baubles1 /><br />
        <Drow /><br />
        <GiantBag />
      </Grid>
    
      <Grid size={4}>
        <MagicItems3 /><br />
        <MagicItems1 /><br />
        <Typography sx={{ textAlign: "center" }}>
          <IntelligentWeapon label="Generic Intelligent Weapon" />
        </Typography><br />
        <CraftCalculator />
      </Grid>
   
      <Grid size={4}>
        <SpellBooks3 />
      </Grid>

      <Grid size={4}>
        <SpellBooks1 />
      </Grid>

      <Grid size={4}>
        <XPCalculator />
      </Grid>

      <Grid size={4}>
        <City />
      </Grid>

    </Grid>
  </React.StrictMode>
);