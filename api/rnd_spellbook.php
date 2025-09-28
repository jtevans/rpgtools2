<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

$caster_level = intval(post_var("caster_level"));
$intel = intval(post_var("intel"));
$adventure = post_var("adventure");
$specialist = post_var("specialist");
$restricted = post_var("restricted");

if (! is_array($restricted)) {
  $restricted = array();
}

$PHB = post_var("phb");
$BVD = post_var("bvd");

class Spell
{
  var $name;
  var $school;
  var $source;
  var $page;
}

function calculate_intel_bonus($intel)
{
  switch ($intel)
  {
    case 10:
    case 11: return 0;
    case 12:
    case 13: return 1;
    case 14:
    case 15: return 2;
    case 16:
    case 17: return 3;
    case 18:
    case 19: return 4;
    case 20:
    case 21: return 5;
    case 22:
    case 23: return 6;
    case 24:
    case 25: return 7;
    case 26:
    case 27: return 8;
    case 28:
    case 29: return 9;
    case 30: return 10;
  }
}

function determine_max_spell_level($caster_level, $intel)
{
  if ($caster_level <= 2)
  {
    $maxlevel = 1;
  }
  else if ($caster_level <= 4)
  {
    $maxlevel = 2;
  }
  else if ($caster_level <= 6)
  {
    $maxlevel = 3;
  }
  else if ($caster_level <= 8)
  {
    $maxlevel = 4;
  }
  else if ($caster_level <= 10)
  {
    $maxlevel = 5;
  }
  else if ($caster_level <= 12)
  {
    $maxlevel = 6;
  }
  else if ($caster_level <= 14)
  {
    $maxlevel = 7;
  }
  else if ($caster_level <= 16)
  {
    $maxlevel = 8;
  }
  else
  {
    $maxlevel = 9;
  }

  return(min($maxlevel, $intel - 10));
}


function determine_restricted_schools(&$allowed_schools, $restricted, $specialist)
{
  $count = 0;
  if (count($restricted) != 0)
  {
    foreach ($restricted as $school)
    {
      if ($school == $specialist)
      {
        abort("This wizard is a specialist in '$school' and cannot take that as a restricted school of magic.");
      }
      $allowed_schools[$school] = false;
      ++$count;
    }
  }

  if ($specialist == "divination")
  {
    if ($count != 1)
    {
      abort("Diviners must pick one (1) and only one (1) school to be restricted.");
    }
  }
  else
  {
    if ($count != 2)
    {
      abort("You must pick two (2) and only two (2) schools to be restricted.");
    }
  }
}


function print_restricted_schools($allowed_schools)
{
  $found = false;
  foreach (array_keys($allowed_schools) as $school)
  {
    if (! $allowed_schools[$school])
    {
      print(ucfirst($school));
      print(" ");
      $found = true;
    }
  }

  if (! $found)
  {
    print("None");
  }
}

function read_spells_from_disk()
{
  for ($level = 0; $level <=9; ++$level)
  {
    $file = fopen("./data/rnd_spellbook/$level", "r");
    if (! $file)
    {
      abort("Cannot open ./data/rnd_spellbook/$level for reading!");
    }
    $count = 0;
    while (!feof($file))
    {
      $line = chop(fgets($file));
      if (empty($line))
      {
        continue;
      }

      if (!feof($file))
      {
        list($name, $school, $source, $page) = explode("~", $line);
        $spells[$level][$count] = new Spell;
        $spells[$level][$count]->name = $name;
        $spells[$level][$count]->school = $school;
        $spells[$level][$count]->source = $source;
        $spells[$level][$count]->page = $page;
      }
      ++$count;
    }
    fclose($file);
  }
  return($spells);
}

function print_spell($spell)
{
  print("_____" . $spell->name . " (" . $spell->source . "/" . $spell->page . ")<br />");
}

function dupe($level, $name, $spells_known)
{
  if ( ! array_key_exists($level, $spells_known))
  {
    return false;
  }
  for ($x = 0; $x <= count($spells_known[$level]) - 1; ++$x)
  {
    if ($name == $spells_known[$level][$x]->name)
    {
      return true;
    }
  }
  return false;
}

function push_zero_level($allowed_schools, $spells, $sources)
{
  $count = 0;
  for ($x = 0; $x <= count($spells[0]) - 1; ++$x)
  {
    if ($allowed_schools[$spells[0][$x]->school] && $sources[$spells[0][$x]->source])
    {
      $known[$count] = new Spell;
      $known[$count]->name = $spells[0][$x]->name;
      $known[$count]->school = $spells[0][$x]->school;
      $known[$count]->source = $spells[0][$x]->source;
      $known[$count]->page = $spells[0][$x]->page;
      ++$count;
    }
  }
  return($known);
}

function sort_spells($a, $b)
{
  if ($a->name == $b->name)
  {
    return 0;
  }

  return ($a->name < $b->name) ? -1 : 1;
}

function add_spells(&$spells_known, $allowed_schools, $intel, $level,
                    $spells, $sources, $spell_level, $quantity)
{
  $num_spells = count($spells[$spell_level]);
  $known_count = array_key_exists($spell_level, $spells_known) ? count($spells_known[$spell_level]) : 0;
  for ($x = 1; $x <= $quantity; ++$x)
  {
    $found = false;
    $attempts = 0;
    do
    {
      ++$attempts;
      $target = rand(0, $num_spells - 1);
      if ($allowed_schools[$spells[$spell_level][$target]->school] &&
          $sources[$spells[$spell_level][$target]->source])
      {
        if (!dupe($spell_level, $spells[$spell_level][$target]->name, $spells_known))
        {
          $spells_known[$spell_level][$known_count] = new Spell;
          $spells_known[$spell_level][$known_count]->name = $spells[$spell_level][$target]->name;
          $spells_known[$spell_level][$known_count]->school = $spells[$spell_level][$target]->school;
          $spells_known[$spell_level][$known_count]->source = $spells[$spell_level][$target]->source;
          $spells_known[$spell_level][$known_count]->page = $spells[$spell_level][$target]->page;
          ++$known_count;
          $found = true;
        } // dupe
      } // allowed school
    } while (! $found && $attempts <= 50); 
  } // for quantity
} // function add_spells

function determine_current_spell_level($caster_level, $max_spell_level)
{
  if ($caster_level <= 2)
  {
    $spell_level = 1;
  }
  else if ($caster_level <= 4)
  {
    $spell_level = 2;
  }
  else if ($caster_level <= 6)
  {
    $spell_level = 3;
  }
  else if ($caster_level <= 8)
  {
    $spell_level = 4;
  }
  else if ($caster_level <= 10)
  {
    $spell_level = 5;
  }
  else if ($caster_level <= 12)
  {
    $spell_level = 6;
  }
  else if ($caster_level <= 14)
  {
    $spell_level = 7;
  }
  else if ($caster_level <= 16)
  {
    $spell_level = 8;
  }
  else
  {
    $spell_level = 9;
  }
  return(min($spell_level, $max_spell_level));
}

// ***************
// START MAIN CODE
// ***************
start_html("Random Spellbook");

$schools = array("abjuration", "conjuration", "divination", "enchantment",
                 "evocation", "illusion", "necromancy", "transmutation",
                 "universal");

foreach ($schools as $school)
{
  $allowed_schools[$school] = true;
}

$max_spell_level = determine_max_spell_level($caster_level, $intel);

if ($specialist != "none")
{
  determine_restricted_schools($allowed_schools, $restricted, $specialist);
}

$spells = read_spells_from_disk();

$intel_bonus = calculate_intel_bonus($intel);

// Build out allowed sources
$sources['PHB'] = ($PHB == "on");
$sources['BVD'] = ($BVD == "on");
?>

<h1 align="center">Random Spellbook</h1>

<p>
Wizard Name: <u>_________________________________</u><br />
Wizard Level: <?php echo $caster_level?><br />
Wizard Intelligence: <?php echo $intel?> (+<?php echo $intel_bonus?>)<br />
Wizard Specialist: <?php echo ucfirst($specialist)?><br />
Restricted School(s): <?php print_restricted_schools($allowed_schools);?><br />
</p>

<?php
// Gain spells via levelling up
for ($level = 1; $level <= $caster_level; ++$level)
{
  if ($level == 1)
  {
    $spells_known[0] = push_zero_level($allowed_schools, $spells, $sources);
    if ($intel >= 11)
    {
      add_spells($spells_known, $allowed_schools, $intel, $level, $spells, $sources, 1, (3 + $intel_bonus));
    }
  }
  else
  {
    // 2 spells per level gained
    $spell_level = determine_current_spell_level($level, $max_spell_level);
    add_spells($spells_known, $allowed_schools, $intel, $level, $spells, $sources, $spell_level, 2);
  }
}

// Gain spells via adventuring
if ($adventure == 1)
{
  for ($level = 1; $level <= $caster_level; ++$level)
  {
    $dice = rand(1, $level) - 2;
    if ($dice > 0)
    {
      for ($x = 1; $x <= $dice; ++$x)
      {
        $spell_level = determine_current_spell_level($level, $max_spell_level);
        $spell_level = rand(1, $spell_level);
        add_spells($spells_known, $allowed_schools, $intel, $caster_level, $spells, $sources, $spell_level, 1);
      }
    }
  }
}

// sort spells by name
for ($level = 0; $level <= 9; ++$level)
{
  if (array_key_exists($level, $spells_known) && count($spells_known[$level]) > 0)
  {
    usort($spells_known[$level], "sort_spells");
  }
}

// display spells here.
for ($level = 0; $level <= 9; ++$level)
{
  if (array_key_exists($level, $spells_known) && count($spells_known[$level]) > 0)
  {
    print("<h3>$level</h3>\n");
    for ($x = 0; $x < count($spells_known[$level]); ++$x)
    {
      print_spell($spells_known[$level][$x]);
    }
    print("<hr>\n");
  }
}

end_html();
