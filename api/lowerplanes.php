<?php
require("utils.php");

class Creature
{
  public $head;
  public $headAdornment;
  public $visage;
  public $ears;
  public $eyeColor;
  public $numEyes;
  public $eyeType;
  public $nose;
  public $mouthType;
  public $mouth;
  public $numLegs;
  public $torso;
  public $generalOne;
  public $generalTwo;
  public $tail;
  public $odor;
  public $skin;
  public $skinColor;
  public $back;
  public $wings;
  public $numArms;
  public $arms;
  public $hands;
  public $legsFeet;
  public $beak;
  public $tailPoison;
  public $mouthPoison;
  public $specialAttacks;
  public $specialDefenses;
  public $specialAbilities;

  public function __construct($head, $headAdornment, $visage, $ears, $eyeColor, $numEyes, $eyeType, $nose,
    $mouthType, $mouth, $numLegs, $torso, $generalOne, $generalTwo, $tail,
    $odor, $skin, $skinColor, $back, $wings, $numArms, $arms, $hands, $legsFeet, $beak, $tailPoison,
    $mouthPoison, $specialAttacks, $specialDefenses, $specialAbilities)
  {
    $this->head = $head;
    $this->headAdornment = $headAdornment;
    $this->visage = $visage;
    $this->ears = $ears;
    $this->eyeColor = $eyeColor;
    $this->numEyes = $numEyes;
    $this->eyeType = $eyeType;
    $this->nose = $nose;
    $this->mouthType = $mouthType;
    $this->mouth = $mouth;
    $this->numLegs = $numLegs;
    $this->torso = $torso;
    $this->generalOne = $generalOne;
    $this->generalTwo = $generalTwo;
    $this->tail = $tail;
    $this->odor = $odor;
    $this->skin = $skin;
    $this->skinColor = $skinColor;
    $this->back = $back;
    $this->wings = $wings;
    $this->numArms = $numArms;
    $this->arms = $arms;
    $this->hands = $hands;
    $this->legsFeet = $legsFeet;
    $this->beak = $beak;
    $this->tailPoison = $tailPoison;
    $this->mouthPoison = $mouthPoison;
    $this->specialAttacks = $specialAttacks;
    $this->specialDefenses = $specialDefenses;
    $this->specialAbilities = $specialAbilities;
  }
}


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
  $choices = array('+1 on save', 'normal', '-1 on save', '-2 on save', 'insanity for 1-4 rounds', 'weakness: 1 hit point per hit die permanently lost');
  return (pickChoice($choices));
}

function makeSpecialAttacks() {
  $count = rand(1, 3);
  $choices = array(
    'Sneak attack: 2d6',
    'Sneak attack: 4d6',
    'Ability Drain',
    'Energy Drain (Cold)',
    'Gaseous Discharge',
    'Missile Discharge',
    'Heat Generation',
    'Life Level Drain',
    'Spell-Like Abilities',
    'Spell Use',
    'Summon/Gate'
  );
  $attacks = [];
  for ($x = 1; $x <= $count; ++$x) {
    $attacks[] = pickChoice($choices);
  }
  return $attacks;
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
  $defenses = [
    'DR: 5/good or cold iron',
    'Immune: electricity',
    'Immune: poison',
    'Resist: acid 10',
    'Resist: cold 10',
    'Resist: fire 10',
    'SR: 15'
  ];
  for ($x = 1; $x <= $count; ++$x) {
    $defenses[] = pickChoice($choices);
  }
  return $defenses;
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
  $abilities = [];
  for ($x = 1; $x <= $count; ++$x) {
    $abilities[] = pickChoice($choices);
  }
  return $abilities;
}

$amount = min(30, max(1, intval(get_var("amount", 1))));
$creatures = [];

for ($x = 1; $x <= $amount; ++$x)
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

  $creatures[] = new Creature(
    $head, $headAdornment, $visage, $ears, $eyeColor, $numEyes, $eyeType, $nose,
    $mouthType, $mouth, $numLegs, $torso, $generalOne, $generalTwo, $tail,
    $odor, $skin, $skinColor, $back, $wings, $numArms, $arms, $hands, $legsFeet, $beak, $tailPoison,
    $mouthPoison, $specialAttacks, $specialDefenses, $specialAbilities
  );
}

print(json_encode($creatures));
