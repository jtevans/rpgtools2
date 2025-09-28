<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

function pickChoice($arr) {
  return($arr[array_rand($arr)]);
}

function makeHead() {
  $choices = array('bat-like', 'bird-like', 'crocodilian', 'horse-like', 'human-like', 'monkey-like', 'snake-like', 'weasel-like');
  return (pickChoice($choices));
}

function makeHeadAdornment() {
  $choices = array('antlers', 'crest', 'horns', 'knobs', 'ridge', 'ridges', 'ruff', 'spines', 'none');
  $choice = pickChoice($choices);

  if ($choice == 'horns')
  {
    $choice = rand(1, 4);
    if ($choice == 1) {
      $choice = '1 horn';
    }
    else {
      $choice .= ' horns';
    }
  }

  return $choice;
}

function makeVisage() {
  $choices = array('gibbering', 'drooling', 'glaring', 'menacing', 'rotting', 'skeletal', 'twitching', 'moving', 'wrinkled', 'seamed');
  return (pickChoice($choices));
}

function makeEars() {
  $choices = array('dog-like', 'elephant-like', 'tiny human', 'huge human', 'trumpet-like', 'none');
  return (pickChoice($choices));
}

function makeEyeColor() {
  $choices = array('amber', 'black', 'blue', 'green', 'metallic', 'orange-red');
  return (pickChoice($choices));
}

function makeNumEyes() {
  $choices = array(1, 2, 2, 2, 3, 4);
  return (pickChoice($choices));
}

function makeEyeType() {
  $choices = array('small, multi-faceted', 'small, slitted', 'swivel-socketed', 'stalked', 'huge, flat', 'huge, protruding');
  return (pickChoice($choices));
}

function makeNose() {
  $choices = array('flat, misshapen', 'huge, bulbous', 'slits only', 'snouted', 'tiny', 'trunk-like');
  return (pickChoice($choices));
}

function makeMouthType() {
  $choices = array('tiny', 'average', 'average', 'huge', 'huge', 'huge');
  return (pickChoice($choices));
}

function makeMouth() {
  $choices = array('fanged', 'mandibled', 'sucker-like', 'ridged', 'large teeth');
  return (pickChoice($choices));
}

function makeNumLegs() {
  $choices = array(2, 2, 2, 2, 4, 4);
  return (pickChoice($choices));
}

function makeTorso($numLegs) {
  if ($numLegs == 2) {
    $choices = array('ape-like', 'bear-like', 'bird-like', 'human-like', 'pig-like', 'rat-like');
  }
  else {
    $choices = array('amoeba-like', 'bison-like', 'cat-like' , 'crab-like', 'horse-like', 'insect-like', 'serpent-like', 'spider-like', 'lizard-like');
  }
  return (pickChoice($choices));
}

function makeGeneralOne() {
  $choices = array('fat', 'long', 'short', 'thin');
  return (pickChoice($choices));
}

function makeGeneralTwo() {
  $choices = array('broad', 'muscled', 'narrow', 'rubbery');
  return (pickChoice($choices));
}

function makeTail() {
  if (rand(1, 6) > 4) {
    $choices = array('barbed', 'dog-like', 'goat-like', 'horse-like', 'lion-like', 'pig-like', 'prehensile', 'stingered');
  }
  else {
    $choices = array('none');
  }
  return (pickChoice($choices));
}

function makeOdor() {
  $choices = array('bloody', 'fishy', 'fecal', 'gangrenous', 'moldy', 'sweaty', 'urin', 'vomit');
  return (pickChoice($choices));
}

function makeSkin() {
  $choices = array('bald/smooth', 'furred', 'hairy/bristled', 'leathery/leprous', 'scaled', 'slimy', 'warted/bumpy', 'wrinkled/folded');
  return (pickChoice($choices));
}

function makeSkinColor() {
  $choices = array('black', 'blue', 'brown', 'white', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'tan', 'yellow');
  return (pickChoice($choices));
}

function makeBack() {
  $choices = array('hunched', 'maned', 'normal', 'spiked', 'spined', 'ridged');
  return (pickChoice($choices));
}

function makeWings() {
  $choices = array('bat', 'bird', 'insect', 'membrous');
  return (pickChoice($choices));
}

function makeNumArms($numLegs) {
  if ($numLegs == 2) {
    $choices = array(2, 2, 2, 2, 4, 4);
  }
  else {
    $choices = array(2, 2, 2, 4, 4, 6);
  }
  return (pickChoice($choices));
}

function makeArms() {
  $choices = array('animal', 'human', 'insect', 'tentacles');
  return (pickChoice($choices));
}

function makeHands() {
  $choices = array('clawed', 'human', 'pincered', 'taloned', 'tentacle-fingered', 'withered', 'bones');
  return (pickChoice($choices));
}

function makeLegsFeet() {
  $choices = array('clawed', 'hooved', 'human', 'insect', 'suctioned', 'taloned', 'webbed');
  return (pickChoice($choices));
}

function makeBeak() {
  $choices = array('duck', 'hawk', 'owl', 'pelican', 'stork', 'turkey');
  return (pickChoice($choices));
}

function makePoison() {
  $choices = array('+1 on save', 'normal', '-1 on save', '-2 on save', 'insanity for 1-4 rounds', 'weakness: 1 point per hit die permanently lost');
  return (pickChoice($choices));
}

function makeSpecialAttacks() {
  $count = rand(1, 3);
  $choices = array(
    'Sneak attack: 2d6',
    'Sneak attack: 4d6',
// XXXJTE -- Still need to pull these from B1, B2, and B3    
  );
  $saText = '<ol>';
  for ($x = 1; $x <= $count; ++$x) {
    $saText .= '<li>' . pickChoice($choices) . '</li>';
  }
  $saText .= '</ol>';
  return $saText;
}

function makeSpecialDefenses() {
  $count = rand(1, 4);
  $choices = array(
    'Immune: disease',
    'Immune: critical hits',
    'Immune: paralysis',
    'Immune: polymorph',
    'Immune: sleep',
    'Immune: stunning',
    'Immune: death effects',
    'Regeneration: (3 or 5 or 7) HP/round',
    'Spell Resistance: (13, 15, 17, 19, or 21)',
  );
  $sdText = '<ol>';
  $sdText .= '<li>DR: 5/good or cold iron</li>';
  $sdText .= '<li>Immune: electricity</li>';
  $sdText .= '<li>Immune: poison</li>';
  $sdText .= '<li>Resist: acid 10</li>';
  $sdText .= '<li>Resist: cold 10</li>';
  $sdText .= '<li>Resist: fire 10</li>';
  $sdText .= '<li>SR: 15</li>';
  for ($x = 1; $x <= $count; ++$x) {
    $sdText .= '<li>' . pickChoice($choices) . '</li>';
  }
  $sdText .= '</ol>';
  return $sdText;
}

function makeSpecialAbilities() {
  $count = rand(3, 8);
  $choices = array(
    'See Invisible -- Constant',
    'True Seeing -- Constant',
    'Fly -- Constant',
    'Tongues -- Constant',
    'Darkness -- At will',
    'Dispel Magic -- At will',
    'Greater Teleport -- At will',
    'Project Image -- At will',
    'Telekinesis -- At will',
    'Detect Magic -- At will',
    'Detect Good -- At will',
    'Invisibility (self only) -- At will',
    'Summon Same Demon -- (1/day, 20%)',
    'Summon Same Demon -- (1/day, 35%)',
    'Summon Same Demon -- (1/day, 40%)',
    'Summon Same Demon -- (2/day, 40%)',
    'Summon Lesser Demon -- (2/day, 35%)',
    'Summon Lesser Demon -- (2/day, 40%)',
    'Summon Lesser Demon -- (2/day, 45%)',
    'Summon Lesser Demon -- (2/day, 50%)',
    'Summon Lesser Demon -- (3/day, 30%)',
    'Summon Lesser Demon -- (3/day, 40%)',
    'Cause Fear -- (1/day)',
    'Stinking Cloud -- (1/day)',
    'Arcane Lock -- (3/day)'
  );
  $saText = '<ol>';
  for ($x = 1; $x <= $count; ++$x) {
    $saText .= '<li>' . pickChoice($choices) . '</li>';
  }
  $saText .= '</ol>';
  return $saText;
}

$num = min(30, max(1, intval(get_var("num"))));
?>

<p align="center">
<a href="lowerplanes.php?num=<?php print($num); ?>">Generate More</a>
</p>

<?php

for ($x = 1; $x <= $num; ++$x)
{
  $head = makeHead();
  $headAdornment = makeHeadAdornment();
  $visage = makeVisage();
  $ears = makeEars();
  $eyeColor = makeEyeColor();
  $numEyes = makeNumEyes();
  $eyeType = makeEyeType();
  $nose = makeNose();
  $mouthType = makeMouthType();
  $mouth = makeMouth();
  $numLegs = makeNumLegs();
  $torso = makeTorso($numLegs);
  $generalOne = makeGeneralOne();
  $generalTwo = makeGeneralTwo();
  $tail = makeTail();
  $odor = makeOdor();
  $skin = makeSkin();
  $skinColor = makeSkinColor();
  $back = makeBack();
  $wings = makeWings();
  $numArms = makeNumArms($numLegs);
  $arms = makeArms();
  $hands = makeHands();
  $legsFeet = makeLegsFeet();
  if ($head == 'bird-like') {
    $beak = makeBeak();
  }
  else {
    $beak = '';
  }
  if ($tail == 'barbed' || $tail == 'stingered') {
    $tailPoison = makePoison();
  }
  else {
    $tailPoison = ' (Not Poisonous)';
  }
  if ($mouth = 'fanged' || $mouth == 'madibled' || $mouth == 'sucker-like') {
    $mouthPoison = makePoison();
  }
  else {
    $mouthPoison = ' (Not Poisonous)';
  }

  $specialAttacks = makeSpecialAttacks();
  $specialDefenses = makeSpecialDefenses();
  $specialAbilities = makeSpecialAbilities();
?>

<h2 align="center">Lower Planes Creature #<?php echo $x ?></h2>

<table cellpadding="3" cellspacing="0" align="center" width="80%" border="1">
  <tr>
    <td style="font-weight: bold; text-align: right;">Head</td>
    <td style="text-align: left;"><?php echo $head?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Head Adornment</td>
    <td style="text-align: left;"><?php echo $headAdornment?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Visage</td>
    <td style="text-align: left;"><?php echo $visage?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Ears</td>
    <td style="text-align: left;"><?php echo $ears?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Eye Color</td>
    <td style="text-align: left;"><?php echo $eyeColor?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Number of Eyes</td>
    <td style="text-align: left;"><?php echo $numEyes?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Eye Type</td>
    <td style="text-align: left;"><?php echo $eyeType?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Nose</td>
    <td style="text-align: left;"><?php echo $nose?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Mouth Type</td>
    <td style="text-align: left;"><?php echo $mouthType?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Mouth</td>
    <td style="text-align: left;"><?php echo $mouth?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Number of Legs</td>
    <td style="text-align: left;"><?php echo $numLegs?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Torso</td>
    <td style="text-align: left;"><?php echo $torso?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">General Characteristics</td>
    <td style="text-align: left;"><?php echo $generalOne?> and <?php echo $generalTwo?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Tail</td>
    <td style="text-align: left;"><?php echo $tail?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Odor</td>
    <td style="text-align: left;"><?php echo $odor?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Skin</td>
    <td style="text-align: left;"><?php echo $skin?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Skin Color</td>
    <td style="text-align: left;"><?php echo $skinColor?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Back</td>
    <td style="text-align: left;"><?php echo $back?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Wings</td>
    <td style="text-align: left;"><?php echo $wings?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Number of Arms</td>
    <td style="text-align: left;"><?php echo $numArms?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Arms</td>
    <td style="text-align: left;"><?php echo $arms?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Hands</td>
    <td style="text-align: left;"><?php echo $hands?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Feet</td>
    <td style="text-align: left;"><?php echo $legsFeet?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Beak</td>
    <td style="text-align: left;"><?php echo $beak?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Tail Poison</td>
    <td style="text-align: left;"><?php echo $tailPoison?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Mouth Poison</td>
    <td style="text-align: left;"><?php echo $mouthPoison?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Special Attacks</td>
    <td style="text-align: left;"><?php echo $specialAttacks?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Special Defenses</td>
    <td style="text-align: left;"><?php echo $specialDefenses?></td>
  </tr>
  <tr>
    <td style="font-weight: bold; text-align: right;">Special Abilities</td>
    <td style="text-align: left;"><?php echo $specialAbilities?></td>
  </tr>
</table>

<?php
}

?>

<p align="center">
<a href="lowerplanes.php?num=<?php print($num); ?>">Generate More</a>
</p>

<?php end_html();
