<?php
require('utils.php');

$type = get_var('type');
$minor = max(0, min(200, intval(get_var('minor', 0))));
$medium = max(0, min(200, intval(get_var('medium', 0))));
$major = max(0, min(200, intval(get_var('major', 0))));
$items = [];
$items['Minor'] = [];
$items['Medium'] = [];
$items['Major'] = [];

$datadir = "./data/mi";
$weapon_type = "";
$weapon_spec = "";

function pull_data($filename)
{
  $total = 0;

  $fh = fopen($filename, "r");
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if (empty($line))
    {
      continue;
    }

    list($weight, $data) = explode("~", $line, 2);
    $total += $weight;
  }
  fclose($fh);

  $target = dice(1, $total);

  $total = 0;
  $fh = fopen($filename, "r");
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if (empty($line))
    {
      continue;
    }

    list($weight, $data) = explode("~", $line, 2);
    $total += $weight;
    if ($total >= $target)
      break;
  }
  fclose($fh);
  return($data);
}

function build_generic($type, $level)
{
  global $datadir;
  $data = pull_data("$datadir/$level/$type");
  list($item, $source) = explode("~", $data);
  if ($type == "wand")
  {
    $charges = dice(1, 30) + 20;
    return("$item ($charges Charges) ($source)");
  }
  else
  {
    return("$item ($source)");
  }
}

function build_armor($level)
{
  global $datadir;
  $data = pull_data("$datadir/$level/armor");

  if (preg_match("/ARMOR/", $data))
  {
    $armor = pull_data("$datadir/armor_type");
    $data = preg_replace("/ARMOR/", $armor, $data);
  }
  else if (preg_match("/SHIELD/", $data))
  {
    $armor = pull_data("$datadir/shield_type");
    $data = preg_replace("/SHIELD/", $armor, $data);
  }
  else if ($data == "SPEC_A")
  {
    $data = pull_data("$datadir/$level/armor_spec");
    list($armor, $source) = explode("~", $data);
    $data = "$armor ($source)";
  }
  else if ($data == "SPEC_S")
  {
    $data = pull_data("$datadir/$level/shield_spec");
    list($armor, $source) = explode("~", $data);
    $data = "$armor ($source)";
  }
  else if ($data == "ABILITY")
  {
    $data = build_armor($level);
    if (preg_match("/shield/", $data))
    {
      $ability = pull_data("$datadir/$level/shield_abil");
      list($abil, $source) = explode("~", $ability);
      $ability = "$abil ($source)";
    }
    else
    {
      $ability = pull_data("$datadir/$level/armor_abil");
      list($abil, $source) = explode("~", $ability);
      $ability = "$abil ($source)";
    }
    $data .= " ($ability)";
  }
  return($data);
}

function build_weapon_ability($level)
{
  global $datadir;
  global $weapon_type, $weapon_spec;
  $ability = '';

  if ($weapon_type == "MELEE")
  {
    $tmp = pull_data("$datadir/$level/weapon_melee_abil");
    list($abil, $source) = explode("~", $tmp);
    if ($abil == "TWICE")
    {
      $ability = build_weapon_ability($level);
    }
    if ($abil == "Bane")
    {
      $bane = pull_data("$datadir/bane");
      $abil = "$abil ($bane)";
    }
    $ability .= "$abil ($source)";
  }
  else if ($weapon_type = "RANGED")
  {
    $tmp = pull_data("$datadir/$level/weapon_ranged_abil");
    list($abil, $source) = explode("~", $tmp);
    if ($abil == "TWICE")
    {
      $ability = build_weapon_ability($level);
    }
    if ($abil == "Bane")
    {
      $bane = pull_data("$datadir/bane");
      $abil = "$abil ($bane)";
    }
    $ability .= "$abil ($source)";
  }
  return($ability);
}

function build_weapon($level, $new_weapon)
{
  global $datadir;
  global $weapon_type, $weapon_spec;

  if ($new_weapon == 1)
  {
    $weapon_type = pull_data("$datadir/weapon_type");
    $weapon_spec = pull_data("$datadir/$weapon_type");
    list($weapon_spec, $weapon_type) = explode("~", $weapon_spec);
  }

  $rnd = pull_data("$datadir/$level/weapon");
  if ($rnd == "SPECIFIC_WEAPON")
  {
    $data = pull_data("$datadir/$level/weapon_spec");
    list($item, $source) = explode("~", $data);
    if ($item == "Slaying Arrow" || $item == "Slaying arrow (greater)")
    {
      $slay = pull_data("$datadir/slaying_arrow");
      $data = "$item ($slay) ($source)";
    }
    else
    {
      $data = "$item ($source)";
    }
  }
  else if ($rnd == "SPECIAL_ABILITY")
  {
    $ability = build_weapon_ability($level);
    $data = build_weapon($level, 0);
    $data .= " ($ability)";
  }
  else
  {
    $data = "$weapon_spec $rnd";
  }

  return("$data");
}

function build_scroll($level)
{
  global $datadir;

  if (dice(1, 100) <= 70)
  {
    $type = "Arcane";
  }
  else
  {
    $type = "Divine";
  }

  if ($level == "minor")
  {
    $quantity = dice(1, 3);
  }
  else if ($level == "medium")
  {
    $quantity = dice(1, 4);
  }
  else
  {
    $quantity = dice(1, 6);
  }

  $caster_level = pull_data("$datadir/$level/scroll_caster_level");

  $data = "Scroll ($type/$caster_level): ";

  for ($x = 1; $x <= $quantity; ++$x)
  {
    $spell_level = pull_data("$datadir/$level/scroll_spell_level");
    $spell = pull_data("$datadir/scroll_spells/$type-$spell_level");
    $data .= "$spell/$spell_level, ";
  }

  $data = rtrim($data, ", ");

  return($data);
}

function get_magic_items($amount, $level)
{
  global $datadir;
  global $weapon_type, $weapon_spec;

  $items = [];
  for ($x = 1; $x <= $amount; ++$x)
  {
    $weapon_type = "";
    $weapon_spec = "";
    $type = pull_data("$datadir/$level/main");

    if ($type == "armor")
    {
      $item = build_armor($level);
    }
    else if ($type == "weapon")
    {
      $item = build_weapon($level, 1);
    }
    else if ($type == "scroll")
    {
      $item = build_scroll($level);
    }
    else
    {
      $item = build_generic($type, $level);
    }
    $items[] = $item;
  }

  return $items;
}

$items['Minor'] = get_magic_items($minor, 'minor');
$items['Medium'] = get_magic_items($medium, 'medium');
$items['Major'] = get_magic_items($major, 'major');

print(json_encode($items));