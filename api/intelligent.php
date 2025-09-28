<?php
require('utils.php');

function make_primary($roll, $alignment)
{
  if ($roll <= 11)
  {
    $ability = 'Detect elevator/shifting rooms/walls, 10\' radius';
    $xp = 60;
    $gp = 300;
  }
  else if ($roll <= 22)
  {
    $ability = 'Detect sloping passages, 10\' radius';
    $xp = 60;
    $gp = 300;
  }
  else if ($roll <= 33)
  {
    if (str_contains($alignment, 'Good'))
    {
      $ability = 'Detect evil, 10\' radius';
    }
    else if (str_contains($alignment, 'Evil'))
    {
      $ability = 'Detect good, 10\' radius';
    }
    else {
      if (dice(1, 2) === 1)
      {
        $ability = 'Detect evil, 10\' radius';
      }
      else
      {
        $ability = 'Detect good, 10\' radius';
      }
    }
    $xp = 120;
    $gp = 600;
  }
  else if ($roll <= 44)
  {
    $ability = 'Detect gems, number and kind, 20\' radius';
    $xp = 240;
    $gp = 1200;
  }
  else if ($roll <= 55)
  {
    $ability = 'Detect precious metals, number and kind, 20\' radius';
    $xp = 240;
    $gp = 1200;
  }
  else if ($roll <= 66)
  {
    $ability = 'Find traps, 10\' radius';
    $xp = 240;
    $gp = 1200;
  }
  else if ($roll <= 77)
  {
    $ability = 'Detect magic, 10\' radius';
    $xp = 240;
    $gp = 1200;
  }
  else if ($roll <= 82)
  {
    $ability = 'Detect secret doors, 10\' radius';
    $xp = 120;
    $gp = 600;
  }
  else if ($roll <= 87)
  {
    $ability = 'Detect invisibility, 10\' radius';
    $xp = 240;
    $gp = 1200;
  }
  else if ($roll <= 92)
  {
    $ability = 'Locate objects, 120\' radius';
    $xp = 180;
    $gp = 900;
  }

  return [$ability, $xp, $gp];
}

function make_extra($roll, $alignment)
{
  if ($roll <= 3)
  {
    $ability = 'Add weapon\'s plus to saving throws, 1/day, one turn duration';
    $xp = 300;
    $gp = 1500;
  }
  else if ($roll <= 6)
  {
    $ability = 'Animate dead, 1/day';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 9)
  {
    $ability = 'Charm person on contact, 3/day';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 11)
  {
    $ability = 'Clairaudience, 30\' range, 3/day, one round duration';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 14)
  {
    $ability = 'Clairvoyance, 30\' range, 3/day, one round duration';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 17)
  {
    $ability = 'Color spray, 2/day';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 20)
  {
    $ability = 'Command, 3/day';
    $xp = 300;
    $gp = 1500;
  }
  else if ($roll <= 22)
  {
    $ability = 'Cure light wounds on self, 3/day';
    $xp = 300;
    $gp = 1500;
  }
  else if ($roll <= 24)
  {
    $ability = 'Determine direction and depth, 2/day';
    $xp = 300;
    $gp = 1500;
  }
  else if ($roll <= 27)
  {
    $ability = 'Dispel magic, 2/day';
    $xp = 480;
    $gp = 2400;
  }
  else if ($roll <= 30)
  {
    $ability = 'ESP, 30\' range, 3/day, 1 round duration';
    $xp = 480;
    $gp = 2400;
  }
  else if ($roll <= 33)
  {
    $ability = 'Fireball, 8d6, 1/day, 180\' range';
    $xp = 600;
    $gp = 3000;
  }
  else if ($roll <= 36)
  {
    $ability = 'Fly, 120\'/round, 1 hour/day';
    $xp = 480;
    $gp = 2400;
  }
  else if ($roll <= 39)
  {
    $ability = 'Gaze reflection, 3/day';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 41)
  {
    $ability = 'Heal self, 1/day';
    $xp = 600;
    $gp = 3000;
  }
  else if ($roll <= 44)
  {
    $ability = 'Hold person on contact, 2/day';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 47)
  {
    $ability = 'Hypnotic pattern, 2/day';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 50)
  {
    $ability = 'Create illusion, 120\' range, 2/day as a wand of illusion';
    $xp = 480;
    $gp = 2400;
  }
  else if ($roll <= 53)
  {
    $ability = 'Invisibility on self, 3/day';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 56)
  {
    $ability = 'Levitate 3/day, one turn duration';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 59)
  {
    $ability = 'Lightning bolt, 8d6, 1/day, 120\' range';
    $xp = 600;
    $gp = 3000;
  }
  else if ($roll <= 62)
  {
    $ability = 'Magic missile, 4 missiles, 140\' range, 2/day';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 65)
  {
    $ability = 'Mirror image, 2/day';
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 68)
  {
    $ability = 'Paralyzation on contact, 2/day';
    $xp = 80;
    $gp = 2400;
  }
  else if ($roll <= 71)
  {
    if (str_contains($alignment, 'Good'))
    {
      $ability = 'Protection from evil, 3/day, 16 round duration';
    }
    else if (str_contains($alignment, 'Evil'))
    {
      $ability = 'Protection from good, 3/day, 16 round duration';
    }
    else {
      if (dice(1, 2) === 1)
      {
        $ability = 'Protection from evil, 3/day, 16 round duration';
      }
      else
      {
        $ability = 'Protection from good, 3/day, 16 round duration';
      }
    }
    $xp = 360;
    $gp = 1800;
  }
  else if ($roll <= 74)
  {
    $ability = 'Ray of enfeeblement, 2/day, 35% Strength loss, 30\' range';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 76)
  {
    $ability = 'Strength on self, 1/day, 8 turn duration';
    $xp = 420;
    $gp = 21000;
  }
  else if ($roll <= 79)
  {
    $ability = 'Silence on self, 3/day';
    $xp = 300;
    $gp = 1500;
  }
  else if ($roll <= 82)
  {
    $ability = 'Suggestion, 2/day on one creature only, 5 turn duration';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 85)
  {
    $ability = 'Telekinesis, 250 lb. wt., 2/day, 1 round duration';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 87)
  {
    $ability = 'Telepath, 60\' range, 2/day';
    $xp = 420;
    $gp = 2100;
  }
  else if ($roll <= 89)
  {
    $ability = 'Teleportation, 1/day, 600 pound wight maxiumum, Inititive modifier of +2 to activate';
    $xp = 540;
    $gp = 2700;
  }
  else if ($roll <= 92)
  {
    $ability = 'Web, 2/day';
    $xp = 360;
    $gp = 1800;
  }
  else
  {
    $ability = 'X-ray vision, 2/day, 1 turn duration';
    $xp = 200;
    $gp = 2100;
  }

  return [$ability, $xp, $gp];
}

$intel = 0;
$num_primary_abilities = 0;
$num_extra_abilities = 0;
$comms = '';
$languages = 0;
$alignment = '';
$xp_value = 0;
$gp_value = 0;
$primary_abilities = [];
$extra_abilities = [];
$has_special_purpose = false;
$special_purpose = '';
$special_purpose_ability = '';
$double_primary_rolled = false;
$double_extra_rolled = false;
$ego = 0;

$intel_roll = dice(1, 25);
if ($intel_roll <= 8)
{
  $intel = 12;
  $num_primary_abilities = 1;
  $comms = 'Semiempathy';
}
else if ($intel_roll <= 14)
{
  $intel = 13;
  $num_primary_abilities = 2;
  $comms = 'Empathy';
}
else if ($intel_roll <= 19)
{
  $intel = 14;
  $num_primary_abilities = 2;
  $comms = 'Speech';
}
else if ($intel_roll <= 22)
{
  $intel = 15;
  $num_primary_abilities = 3;
  $comms = 'Speech (Can read non-magical languages and maps.)';
}
else if ($intel_roll <= 24)
{
  $intel = 16;
  $num_primary_abilities = 3;
  $comms = 'Speech (Can read magical and non-magical languages and maps.)';
}
else
{
  $intel = 17;
  $num_primary_abilities = 3;
  $num_extra_abilities = 1;
  $comms = 'Speech and Telepathy (Can read magical and non-magical languages and maps.)';
}

$align_roll = dice(1, 100);
if ($align_roll <= 5) { $alignment = 'Chaotic Good'; }
else if ($align_roll <= 15) { $alignment = 'Chaotic Neutral'; }
else if ($align_roll <= 20) { $alignment = 'Chaotic Evil'; }
else if ($align_roll <= 25) { $alignment = 'Neutral Evil'; }
else if ($align_roll <= 30) { $alignment = 'Lawful Evil'; }
else if ($align_roll <= 55) { $alignment = 'Lawful Good'; }
else if ($align_roll <= 60) { $alignment = 'Lawful Neutral'; }
else if ($align_roll <= 80) { $alignment = 'Neutral'; }
else { $alignment = 'Neutral Good'; }

foreach (range(1, $num_primary_abilities) as $x)
{
  $ability_roll = dice(1, 100);
  if ($ability_roll >= 99)
  {
    ++$num_extra_abilities;
  }
  else
  {
    if ($ability_roll >= 93 && $ability_roll <= 98 && $double_primary_rolled === false)
    {
      $double_primary_rolled = true;
      list($ability, $xp, $gp) = make_primary(dice(1, 92), $alignment);
      array_push($primary_abilities, $ability);
      $xp_value += $xp;
      $gp_value += $gp;
    }
    list($ability, $xp, $gp) = make_primary(dice(1, 92), $alignment);
    array_push($primary_abilities, $ability);
    $xp_value += $xp;
    $gp_value += $gp;
  }
}

foreach (range(1, $num_extra_abilities) as $x)
{
  $ability_roll = dice(1, 100);
  if ($ability_roll === 100)
  {
    $has_special_purpose = true;
  }

  if ($ability_roll >= 95 && $ability_roll <= 97 && $double_extra_rolled === false)
  {
    $double_extra_rolled = true;
    list($ability, $xp, $gp) = make_extra(dice(1, 94), $alignment);
    array_push($extra_abilities, $ability);
    $xp_value += $xp;
    $gp_value += $gp;
  }
  list($ability, $xp, $gp) = make_extra(dice(1, 94), $alignment);
  array_push($extra_abilities, $ability);
  $xp_value += $xp;
  $gp_value += $gp;
}

if ($has_special_purpose)
{
  $purpose_roll = dice(1, 100);
  if ($purpose_roll <= 4) { $special_purpose = 'Defeat Opposite Alignment'; } 
  else if ($purpose_roll <= 7) { $special_purpose = 'Defeat Law'; } 
  else if ($purpose_roll <= 10) { $special_purpose = 'Defeat Chaos'; } 
  else if ($purpose_roll <= 13) { $special_purpose = 'Defeat Neutrality'; } 
  else if ($purpose_roll <= 16) { $special_purpose = 'Defeat Good'; } 
  else if ($purpose_roll <= 19) { $special_purpose = 'Defeat Evil'; } 
  else if ($purpose_roll <= 23) { $special_purpose = 'Slay Priests'; } 
  else if ($purpose_roll <= 24) { $special_purpose = 'Slay Druids'; } 
  else if ($purpose_roll <= 28) { $special_purpose = 'Slay Fighters'; } 
  else if ($purpose_roll <= 29) { $special_purpose = 'Slay Paladins'; } 
  else if ($purpose_roll <= 31) { $special_purpose = 'Slay Rangers'; } 
  else if ($purpose_roll <= 34) { $special_purpose = 'Slay Wizards'; } 
  else if ($purpose_roll <= 35) { $special_purpose = 'specialist'; } 
  else if ($purpose_roll <= 39) { $special_purpose = 'Slay Thieves'; } 
  else if ($purpose_roll <= 41) { $special_purpose = 'Slay Assassins'; } 
  else if ($purpose_roll <= 42) { $special_purpose = 'Slay Monks'; } 
  else if ($purpose_roll <= 43) { $special_purpose = 'Slay Bards'; } 
  else if ($purpose_roll <= 46) { $special_purpose = 'Slay Avians'; } 
  else if ($purpose_roll <= 47) { $special_purpose = 'Slay Baatezu'; } 
  else if ($purpose_roll <= 50) { $special_purpose = 'Slay Tanar\'ri'; } 
  else if ($purpose_roll <= 54) { $special_purpose = 'Slay Demihumans'; } 
  else if ($purpose_roll <= 58) { $special_purpose = 'Slay Dragons'; } 
  else if ($purpose_roll <= 62) { $special_purpose = 'Slay Extraplanar Creatures'; } 
  else if ($purpose_roll <= 65) { $special_purpose = 'Slay Faerie Creatures'; } 
  else if ($purpose_roll <= 69) { $special_purpose = 'Slay Giants'; } 
  else if ($purpose_roll <= 72) { $special_purpose = 'Slay Humanoids'; } 
  else if ($purpose_roll <= 75) { $special_purpose = 'Slay Insects'; } 
  else if ($purpose_roll <= 79) { $special_purpose = 'Slay Magic-Using Creatures'; } 
  else if ($purpose_roll <= 82) { $special_purpose = 'Slay Mammals'; } 
  else if ($purpose_roll <= 85) { $special_purpose = 'Slay Plant Life'; } 
  else if ($purpose_roll <= 88) { $special_purpose = 'Slay Poison-Using Creatures'; } 
  else if ($purpose_roll <= 91) { $special_purpose = 'Slay Psionic Creatures'; } 
  else if ($purpose_roll <= 94) { $special_purpose = 'Slay Reptiles'; } 
  else if ($purpose_roll <= 97) { $special_purpose = 'Slay Tanar\'ri'; } 
  else { $special_purpose = 'Destroy Undead'; } 

  if ($special_purpose == 'specialist')
  {
    $sub_roll = dice(1, 8);
    if ($sub_roll == 1) { $special_purpose = 'Slay Abjurers'; }
    else if ($sub_roll == 2) { $special_purpose = 'Slay Conjurers'; }
    else if ($sub_roll == 3) { $special_purpose = 'Slay Diviners'; }
    else if ($sub_roll == 4) { $special_purpose = 'Slay Enchanters'; }
    else if ($sub_roll == 5) { $special_purpose = 'Slay Illusionists'; }
    else if ($sub_roll == 6) { $special_purpose = 'Slay Invokers'; }
    else if ($sub_roll == 7) { $special_purpose = 'Slay Necromancers'; }
    else { $special_purpose = 'Slay Transmuters'; }
  } 

  $purpose_ability_roll = dice(1, 100);
  if ($purpose_ability_roll <= 8)
  {
    $special_purpose_ability = 'Cause blindess for 2d6 rounds';
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($purpose_ability_roll <= 15)
  {
    $special_purpose_ability = 'Confusion for 2d6 rounds';
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($purpose_ability_roll <= 25)
  {
    $special_purpose_ability = 'Death';
    $xp_value += 200;
    $gp_value += 1000;
  }
  else if ($purpose_ability_roll <= 35)
  {
    $special_purpose_ability = 'Disintegration';
    $xp_value += 200;
    $gp_value += 1000;
  }
  else if ($purpose_ability_roll <= 42)
  {
    $special_purpose_ability = 'Cause fear for 1d4 rounds';
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($purpose_ability_roll <= 49)
  {
    $special_purpose_ability = 'Feeblemind for 1d4 rounds';
    $xp_value += 150;
    $gp_value += 750;
  }
  else if ($purpose_ability_roll <= 56)
  {
    $special_purpose_ability = 'Insanity for 1d4 rounds';
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($purpose_ability_roll <= 66)
  {
    $special_purpose_ability = 'Maze';
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($purpose_ability_roll <= 75)
  {
    $special_purpose_ability = 'Paralyzation for 1d4 rounds';
    $xp_value += 150;
    $gp_value += 750;
  }
  else if ($purpose_ability_roll <= 85)
  {
    $special_purpose_ability = 'Petrification';
    $xp_value += 150;
    $gp_value += 750;
  }
  else if ($purpose_ability_roll <= 93)
  {
    $special_purpose_ability = 'Plane shift';
    $xp_value += 150;
    $gp_value += 750;
  }
  else
  {
    $special_purpose_ability = 'Quested';
    $xp_value += 150;
    $gp_value += 750;
  }
}

if (str_contains($comms, 'Speech'))
{
  $lang_roll = dice(1, 100);
  if ($lang_roll <= 40)
  {
    $languages = 1;
    $xp_value += 50;
    $gp_value += 250;
  }
  else if ($lang_roll <= 70)
  {
    $languages = 2;
    $xp_value += 100;
    $gp_value += 500;
  }
  else if ($lang_roll <= 85)
  {
    $languages = 3;
    $xp_value += 150;
    $gp_value += 750;
  }
  else if ($lang_roll <= 95)
  {
    $languages = 4;
    $xp_value += 200;
    $gp_value += 1000;
  }
  else if ($lang_roll <= 99)
  {
    $languages = 5;
    $xp_value += 250;
    $gp_value += 1250;
  }
  else
  {
    $languages = 6;
    $xp_value += 300;
    $gp_value += 1500;
  }
}

$ego += count($primary_abilities) * 2;
$ego += count($extra_abilities) * 2;
$ego += $has_special_purpose ? 5 : 0;
$ego += round($languages / 2);
$ego += ($intel >= 15) ? 1 : 0;
$ego += ($intel >= 16) ? 2 : 0;

ob_start();
?>
<p>Intelligence: <?php print($intel); ?></p>
<p>Number of Languages: <?php print($languages); ?></p>
<p>Communication Methods: <?php print($comms); ?></p>
<p>Alignment: <?php print($alignment); ?></p>
<?php
if (count($primary_abilities))
{
?>
<p>Primary Abilities:<br />
<ul>
<?php
  foreach ($primary_abilities as $ability)
  {
    print("<li>{$ability}</li>");
  }
?>
</ul>
<?php
}

if (count($extra_abilities))
{
?>
<p>Extraordinary Abilities:<br />
<ul>
<?php
  foreach ($extra_abilities as $ability)
  {
    print("<li>{$ability}</li>");
  }
?>
</ul>
<?php
}

if ($has_special_purpose)
{
?>
<p>Special Purpose: <?php print($special_purpose); ?></p>
<p>Special Purpose Ability: <?php print($special_purpose_ability); ?></p>
<?php
}
?>
<p>Ego: <?php print($ego); ?> + the highest magical bonus on the weapon</p>
<p>XP Value: <?php print($xp_value); ?></p>
<p>GP Value: <?php print($gp_value); ?></p>
<?php
print(json_encode(ob_get_clean()));
