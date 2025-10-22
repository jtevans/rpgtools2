<?php
require('utils.php');

$magic = [
  "Any" => 0,
  "WeaponOrArmor" => 0,
  "Potion" => 0,
  "Scroll" => 0,
  "AnyExceptWeapon" => 0,
  "AllExceptPotionScroll" => 0,
  "MiscMagic" => 0,
  "Specific" => 0,
];

foreach ($magic as $type => $amount)
{
  $magic[$type] = min(50, max(0, intval(get_var($type))));

  if ($magic[$type] == 0)
  {
    unset($magic[$type]);
  }
}

$allowedSpecificTypes = [
  'armor',
  'bag_bottle',
  'book',
  'boot_glove',
  'clothing',
  'dust_stone',
  'gem_jewelry',
  'girdle_helm',
  'household',
  'humorous',
  'musical_instrument',
  'potion',
  'ring',
  'rod',
  'scroll',
  'staff',
  'wand',
  'weapon',
  'weird',
];

$specificType = '';
if (isset($magic["Specific"]))
{
  $specificType = get_var('specificType');
  if ( ! in_array($specificType, $allowedSpecificTypes))
  {
    unset($magic['Specific']);
  }
}

class Item
{
  var $str;
  var $page;
  var $type;
  var $intelligent;

  function __construct($s, $p, $t, $i)
  {
    $this->str = $s;
    $this->page = $p;
    $this->type = $t;
    $this->intelligent = $i;
  }
}

function pull_data($filename)
{
  $filename = "./data/mi1/" . $filename;
  if ( ! file_exists($filename))
  {
    return "";
  }

  $total = 0;
  $lines = [];

  $fh = fopen($filename, "r");
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if (empty($line))
    {
      continue;
    }

    array_push($lines, $line);

    list($weight, $data) = explode("~", $line, 2);
    $total += $weight;
  }
  fclose($fh);

  $target = dice(1, $total);
  $total = 0;

  foreach ($lines as $line)
  {
    list($weight, $data) = explode("~", $line, 2);
    $total += $weight;
    if ($total >= $target)
      break;
  }
  return($data);
}

function parse_expansions($str)
{
  if ( ! str_contains($str, "{"))
  {
    return $str;
  }

  preg_match("({.*?})", $str, $matches, PREG_OFFSET_CAPTURE);
  foreach ($matches as $match)
  {
    $file = str_replace(['{', '}'], ['', ''], $match[0]);
    $details = pull_data($file);
    $str = str_replace($match[0], $details, $str);
  }
  return parse_expansions($str);
}

function calc_volume($page)
{
  if ($page <= 416)
    return 1;
  if ($page <= 832)
    return 2;
  if ($page <= 1247)
    return 3;
  return 4;
}

function intelligent_weapon($section, $possible)
{
  if ($possible && $section == "weapon" && dice(1, 100) <= 5)
  {
    return true;
  }
  return false;
}

/*
 * MAIN CODE BELOW
 */
$items = [];
foreach ($magic as $type => $amount)
{
  $originalType = $type;
  $type = strtolower($type);
  ### Generate specific magic item types if requested.
  if ($type == 'specific')
  {
    foreach (range(1, $amount) as $iter)
    {
      if ($specificType == 'armor' || $specificType == 'weapon')
      {
        $str = pull_data("{$specificType}/main");
        if ($str == "special")
        {
          $item_data = pull_data("{$specificType}/{$str}");
          if ($specificType === 'weapon')
          {
            list($page, $special, $intelligent_possible) = explode("~", $item_data);
            $special = parse_expansions($special);
            array_push($items, new Item($special, $page, $originalType, intelligent_weapon($specificType, $intelligent_possible == 1)));
          }
          else // armor
          {
            list($page, $special) = explode("~", $item_data);
            $special = parse_expansions($special);
            array_push($items, new Item($special, $page, $originalType, false));
          }
        }
        else
        {
          if (strpos($str, "~"))
          {
            list($str, $intelligent_possible) = explode("~", $str);
          }
          else
          {
            $intelligent_possible = 0;
          }
          $str = parse_expansions($str);
          array_push($items, new Item($str, 0, $originalType, intelligent_weapon($specificType, $intelligent_possible == 1)));
        }
      }
      else
      {
        $item_data = pull_data("{$specificType}/main");
        list($page, $str) = explode("~", $item_data);
        $str = parse_expansions($str);
        array_push($items, new Item($str, $page, $originalType, false));
      }
    }
  }
  ### This section is different. We're making 1 of each type of magic item, except a potion and a scroll.
  else if ($type == "allexceptpotionscroll")
  {
    foreach (range(1, $amount) as $iter)
    {
      foreach (array("ring", "rod", "staff", "wand")  as $section)
      {
        $item_data = pull_data("{$section}/main");
        list($page, $str) = explode("~", $item_data);
        $str = parse_expansions($str);
        array_push($items, new Item($str, $page, $originalType, false));
      }
      foreach (array("weapon", "armor")  as $section)
      {
        $str = pull_data("{$section}/main");
        if ($str == "special")
        {
          $item_data = pull_data("{$section}/{$str}");
          list($page, $special, $intelligent_possible) = explode("~", $item_data);
          $special = parse_expansions($special);
          array_push($items, new Item($special, $page, $originalType, intelligent_weapon($section, $intelligent_possible == 1)));
        }
        else
        {
          if (strpos($str, "~"))
          {
            list($str, $intelligent_possible) = explode("~", $str);
          }
          else
          {
            $intelligent_possible = 0;
          }
          $str = parse_expansions($str);
          array_push($items, new Item($str, 0, $originalType, intelligent_weapon($section, $intelligent_possible == 1)));
        }
      }

      ### This snags the misc. magic item for the "1 of each type"
      $section = pull_data("main/miscmagic");
      $item_data = pull_data("{$section}/main");
      list($page, $str) = explode("~", $item_data);
      $str = parse_expansions($str);
      array_push($items, new Item($str, $page, $originalType, false));
    }
  }
  else
  {
    foreach (range(1, $amount) as $iter)
    {
      $section = pull_data("main/{$type}");

      if (in_array($section, ["weapon", "armor"]))
      {
        $str = pull_data("{$section}/main");
        if ($str == "special")
        {
          $item_data = pull_data("{$section}/{$str}");
          if ($section == 'weapon') {
            list($page, $special, $intelligent_possible) = explode("~", $item_data);
          }
          else {
            list($page, $special) = explode("~", $item_data);
            $intelligent_possible = 0;
          }
          $special = parse_expansions($special);
          array_push($items, new Item($special, $page, $originalType, intelligent_weapon($section, $intelligent_possible == 1)));
        }
        else
        {
          if (strpos($str, "~"))
          {
            list($str, $intelligent_possible) = explode("~", $str);
          }
          else
          {
            $intelligent_possible = 0;
          }
          $str = parse_expansions($str);
          array_push($items, new Item($str, 0, $originalType, intelligent_weapon($section, $intelligent_possible)));
        }
      }
      else
      {
        $item_data = pull_data("{$section}/main");
        list($page, $str) = explode("~", $item_data);
        $str = parse_expansions($str);
        array_push($items, new Item($str, $page, $originalType, false));
      }
    }
  }
}

$returnItems = [];
$idx = 0;
foreach ($items as $item)
{
  $returnItems[$idx] = [];
  $returnItems[$idx]['text'] = $item->str;
  $returnItems[$idx]['page'] = $item->page;
  $returnItems[$idx]['volume'] = calc_volume($item->page);
  $returnItems[$idx]['type'] = $item->type;
  $returnItems[$idx]['intelligent'] = $item->intelligent;
  ++$idx;
}

print(json_encode($returnItems));