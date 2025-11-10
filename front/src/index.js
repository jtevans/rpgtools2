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
import Drow from './drow/drow';
import GiantBag from './giant/giant';
import Test from './test';
import Lowerplanes from './lowerplanes/lowerplanes';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Grid container spacing={2}>

      { /* Name Generators */}
      <Grid size={4}>
        <NameGenerators />
      </Grid>

      { /* Dungeon Dressing */}
      <Grid size={4}>
        <DungeonDressing />
      </Grid>

      { /* Traps */}
      <Grid size={4}>
        <Traps /><br />
        <Lowerplanes />
      </Grid>

      { /* D&D 3e/3.5/Pathfinder 1 Treasure */ }
      <Grid size={4}>
        <Treasure3 /><br />
        <Treasure1 />
      </Grid>

      { /* 3rd Edition Baubles (Gems/Artwork/Mundane Objects) */}
      <Grid size={4}>
        <Baubles3 /><br />
        <Baubles1 /><br />
        <Drow /><br />
        <GiantBag />
      </Grid>
    
      { /* D&D 3.0/3.5/Pathfinder 1 Magic Items */ }
      <Grid size={4}>
        <MagicItems3 /><br />
        <MagicItems1 />
        <Typography sx={{ textAlign: "center" }}>
          <IntelligentWeapon label="Generic Intelligent Weapon" />
        </Typography>
      </Grid>
   
      { /* Random Wizard Spellbooks (D&D 3.5) */}
      <Grid size={4}>
        <SpellBooks3 />
      </Grid>

      { /* TODO: Random Wizard Spellbooks (1e AD&D) */}
      <Grid size={4}>
        <Test />
      </Grid>

      { /* TODO: 1st Edition Lower Planes Creatures */}
      <Grid size={4}>
        <Test />
      </Grid>

      { /* TODO: 3rd Edition Experience Point Calculator */}
      <Grid size={6}>
        <Test />
      </Grid>

      { /* TODO: 3rd Edition Craft Calculator */}
      <Grid size={6}>
        <Test />
      </Grid>

      { /* TODO: City Generator */}
      <Grid size={6}>
        <Test />
      </Grid>

      { /* TODO: Generate Establishment Names  */}
      <Grid size={6}>
        <Test />
      </Grid>
    
      { /* TODO: Calendar Generator: Laenwold */}
      <Grid size={6}>
        <Test />
      </Grid>
    </Grid>
  </React.StrictMode>
);