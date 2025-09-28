<?php
require('utils.php');

$amount = intval(get_var('amount', 1));

class Material
{
  var $name;
  var $low_per;
  var $high_per;
  var $low_cost;
  var $high_cost;

  function __construct($lp, $hp, $lc, $hc, $n)
  {
    $this->low_per = $lp;
    $this->high_per = $hp;
    $this->low_cost = $lc;
    $this->high_cost = $hc;
    $this->name = $n;
  }
}

class Obj
{
  var $name;
  var $low_per;
  var $high_per;

  function __construct($lp, $hp, $n)
  {
    $this->low_per = $lp;
    $this->high_per = $hp;
    $this->name = $n;
  }
}

function build_item()
{
  global $materials, $objects;

  $roll1 = percent();
  $roll2 = percent();
  $obj = $mat = $cost = null;

  for ($x = 0; $x < count($materials); ++$x)
  {
    if ($roll1 >= $materials[$x]->low_per &&
        $roll1 <= $materials[$x]->high_per)
    {
      $mat = $materials[$x]->name;
      $cost = number($materials[$x]->low_cost, $materials[$x]->high_cost);
      break;
    }
  }

  for ($x = 0; $x < count($objects); ++$x)
  {
    if ($roll2 >= $objects[$x]->low_per &&
        $roll2 <= $objects[$x]->high_per)
    {
      $obj = $objects[$x]->name;
      break;
    }
  }

  $item = a_an($obj) . " $obj made of $mat worth $cost GP.";
  $item = ucfirst($item);
  return($item);
}

$data = fopen("./data/treasure/jewelry", "r");

if (!$data)
{
  print(json_encode(['Error opening data file.']));
  exit();
}

// Fetch Materials
$materials = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if (empty($line))
  {
    continue;
  }

  if ($line == ":ITEM")
  {
    break;
  }
  else
  {
    list($low_per, $high_per, $low_cost, $high_cost, $name) = explode(" ", $line, 5);
    $materials[] = new Material($low_per, $high_per, $low_cost, $high_cost, $name);
  }
}

// Fetch Objects
$objects = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if (empty($line))
  {
    continue;
  }

  list($low_per, $high_per, $name) = explode(" ", $line, 3);
  $objects[] = new Obj($low_per, $high_per, $name);
}

fclose($data);

$jewelry = [];
for ($x = 1; $x <= $amount; ++$x)
{
  $jewelry[] = build_item();
}

print(json_encode($jewelry));