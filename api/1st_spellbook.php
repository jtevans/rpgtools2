<?php
$caster_level = min(18, max(1, intval(get_var("wizardLevel", 1))));
$intel = min(19, max(9, intval(get_var("intelligence"), 10)));
$adventure = get_var("gainSpells") == 'true' ? true : false;
$always_max_num_spells = get_var("maxNumSpells") == 'true' ? true : false;

$PHB = get_var("phb") == 'true' ? true : false;
$UA = get_var("ua") == 'true' ? true : false;
$AV = get_var("av") == 'true' ? true : false;

function abort($message)
{
  print(json_encode([[$message]]));
  exit;
}

class Spell
{
  var $name;
  var $source;
  var $page;
  var $uq;
}

function calc_max_spell_level_from_level($level)
{
  if ($level <= 2)
  {
    return 1;
  }
  else if ($level <= 4)
  {
    return 2;
  }
  else if ($level <= 6)
  {
    return 3;
  }
  else if ($level <= 8)
  {
    return 4;
  }
  else if ($level <= 11)
  {
    return 5;
  }
  else if ($level <= 13)
  {
    return 6;
  }
  else if ($level <= 15)
  {
    return 7;
  }
  else if ($level <= 17)
  {
    return 8;
  }
  else
  {
    return 9;
  }
}

function calc_max_spell_level_from_int($intel)
{
  if ($intel <= 10)
  {
    return 5;
  }
  else if ($intel <= 12)
  {
    return 6;
  }
  else if ($intel <= 14)
  {
    return 7;
  }
  else if ($intel <= 16)
  {
    return 8;
  }
  else
  {
    return 9;
  }
}

function calc_min_max_num_spells($intel)
{
  switch ($intel)
  {
    case 9: return([4, 6]);
    case 10:
    case 11:
    case 12: return([5, 7]);
    case 13:
    case 14: return([6, 9]);
    case 15:
    case 16: return([7, 11]);
    case 17: return([8, 14]);
    case 18: return([9, 18]);
    default: return([10, 999]);
  }
}

function read_spells_from_disk()
{
  for ($level = 0; $level <= 9; ++$level)
  {
    $file = fopen("./data/1st_spellbook/$level", "r");
    if (! $file)
    {
      abort("Cannot open ./data/1st_spellbook/$level for reading!");
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
        $spells[$level][$count] = new Spell();
        $parts = explode("~", $line);
        $spells[$level][$count]->name = $parts[0];
        $spells[$level][$count]->source = $parts[1];
        $spells[$level][$count]->page = $parts[2];
        $spells[$level][$count]->uq = $parts[3];
      }
      ++$count;
    }
    fclose($file);
  }
  return($spells);
}

function get_spell($spell)
{
  return($spell->name . " (" . $spell->source . "/" . $spell->page . ")");
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

function sort_spells($a, $b)
{
  if ($a->name == $b->name)
  {
    return 0;
  }

  return ($a->name < $b->name) ? -1 : 1;
}

function add_spells(&$spells_known, $spells, $sources, $spell_level, $quantity)
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
      if ($sources[$spells[$spell_level][$target]->source])
      {
        if ($spells[$spell_level][$target]->uq >= mt_rand(1, 100))
        {
          if ( ! dupe($spell_level, $spells[$spell_level][$target]->name, $spells_known))
          {
            if ( ! array_key_exists($spell_level, $spells_known))
            {
              $spells_known[$spell_level] = array();
            }
            $spells_known[$spell_level][$known_count] = $spells[$spell_level][$target];
            ++$known_count;
            $found = true;
          } // dupe
        } // uq check
      } // sources
    } while (! $found && $attempts <= 50); 
  } // for quantity
} // function add_spells

// ***************
// START MAIN CODE
// ***************
$spells_known = [];

$spellbook = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

// Build out allowed sources
$sources['PHB'] = $PHB;
$sources['UA'] = $UA;
$sources['AV'] = $AV;

[ $min_num_spells, $max_num_spells ] = calc_min_max_num_spells($intel);
$spells = read_spells_from_disk();

$read_magic = new Spell();
$read_magic->name = 'Read Magic';
$read_magic->source = 'PHB';
$read_magic->page = 68;

$write = new Spell();
$write->name = 'Write';
$write->source = 'PHB';
$write->page = 69;

$spells_known = array(1 => [ $read_magic, $write ]);

// Gain spells via leveling up
for ($level = 1; $level <= $caster_level; ++$level)
{
  $num_spells_to_generate = $max_num_spells;

  if ($always_max_num_spells != 1)
  {
    $num_spells_to_generate = mt_rand($min_num_spells, $max_num_spells);
  }

  if ($level == 1)
  {
    add_spells($spells_known, $spells, $sources, 0, $num_spells_to_generate);
    add_spells($spells_known, $spells, $sources, 1, $num_spells_to_generate);
  }
  else
  {
    // 1 spell per level gained
    $spell_level = min(calc_max_spell_level_from_level($level), calc_max_spell_level_from_int($intel));
    if ( ! (array_key_exists($spell_level, $spells_known) && count($spells_known[$spell_level]) > 0))
    {
      add_spells($spells_known, $spells, $sources, $spell_level, $num_spells_to_generate);
    }
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
        $spell_level = min(calc_max_spell_level_from_level($level), calc_max_spell_level_from_int($intel));
        $spell_level = rand(1, $spell_level);
        add_spells($spells_known, $spells, $sources, $spell_level, 1);
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

// Build spellbook here.
for ($level = 0; $level <= 9; ++$level)
{
  if (array_key_exists($level, $spells_known) && count($spells_known[$level]) > 0)
  {
    for ($x = 0; $x < count($spells_known[$level]); ++$x)
    {
      $spellbook[$level][] = get_spell($spells_known[$level][$x]);
    }
  }
}

print(json_encode($spellbook));