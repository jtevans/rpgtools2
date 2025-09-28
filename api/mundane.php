<?php
require('utils.php');

$amount = intval(get_var('amount', 1));

class Item
{
  var $name;
  var $low;
  var $high;
  var $dice;
  var $sides;

  function __construct($n, $l, $h, $d, $s)
  {
    $this->name = $n;
    $this->low = $l;
    $this->high = $h;
    $this->dice = $d;
    $this->sides = $s;
  }
}

function shortbow()
{
  if (percent() <= 60)
  {
    return("+1");
  }
  return("+2");
}

function longbow()
{
  $roll = percent();

  if ($roll <= 45)
  {
    return("+1");
  }
  else if ($roll <= 75)
  {
    return("+2");
  }
  else if ($roll <= 90)
  {
    return("+3");
  }
  else
  {
    return("+4");
  }
}

function size1()
{
  if (percent() <= 10)
  {
    return("small size");
  }
  return("medium size");
}

function size2()
{
  if (percent() <= 50)
  {
    return("small size");
  }
  return("medium size");
}

function build_item()
{
  global $items;

  $roll1 = percent();

  for ($x = 0; $x < count($items); ++$x)
  {
    if ($roll1 >= $items[$x]->low && $roll1 <= $items[$x]->high)
    {
      $cnt = dice($items[$x]->dice, $items[$x]->sides);
      $desc = $items[$x]->name;

      if ($cnt > 1)
      {
        $desc = preg_replace("/#/", "s", $desc);
      }
      else
      {
        $desc = preg_replace("/#/", "", $desc);
      }

      if (preg_match("/!S/", $desc))
      {
        $desc = preg_replace("/!S/", shortbow(), $desc);
      }

      if (preg_match("/!C/", $desc))
      {
        $desc = preg_replace("/!C/", rand_item("./data/treasure/common_melee"), $desc);
      }

      if (preg_match("/!U/", $desc))
      {
        $desc = preg_replace("/!U/", rand_item("./data/treasure/uncommon_weapons"), $desc);
      }

      if (preg_match("/!R/", $desc))
      {
        $desc = preg_replace("/!R/", rand_item("./data/treasure/common_ranged"), $desc);
      }

      if (preg_match("/!L/", $desc))
      {
        $desc = preg_replace("/!L/", longbow(), $desc);
      }

      if (preg_match("/!Z/", $desc))
      {
        $desc = preg_replace("/!Z/", size1(), $desc);
      }

      if (preg_match("/!z/", $desc))
      {
        $desc = preg_replace("/!z/", size2(), $desc);
      }

      if ($cnt == 1)
      {
        $cnt = "a";
      }

      $item = $cnt . " " . $desc;
    }
  }
  return(ucfirst($item));
}

$data = fopen("./data/treasure/mundane", "r");

if (!$data)
{
  print(json_encode(['Error opening data file.']));
  exit();
}

// Fetch data
$items = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if (empty($line))
  {
    continue;
  }

  list($low, $high, $dice, $sides, $name) = explode(" ", $line, 5);
  $items[] = new Item($name, $low, $high, $dice, $sides);
}

fclose($data);

$mundane = [];
for ($x = 1; $x <= $amount; ++$x)
{
  $mundane[] = build_item();
}

print(json_encode($mundane));
