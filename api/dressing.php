<?php
require('utils.php');

$amount = max(1, min(20, intval(get_var('amount', 20))));
$type = intval(get_var("type"));
$dressings = [];

function fetch_data($type)
{
  if ($type <= 9)
  {
    $filename = "0" . $type;
  }
  else
  {
    $filename = $type;
  }

  $data = fopen("./data/dressing/$filename", "r");
  if (!$data)
  {
    print(json_encode(['Error opening data file.']));
    exit();
  }

  fgets($data, 1024);
  $dressings = [];
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    $dressings[] = $line;
  }

  fclose($data);
  return $dressings;
}

function returnDressings($data, $amount)
{
  $dressings = [];
  for($x = 1; $x <= $amount; ++$x)
  {
    $dressings[] = get_random($data);
  }
  return $dressings;
}

function generateRandomDressing($file)
{
  $data = fopen("./data/dressing/$file", "r");
  if (!$data)
  {
    print(json_encode(['Error opening data file.']));
    exit();
  }
  fgets($data, 1024);
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    $mydata[] = $line;
  }
  fclose($data);
  return(get_random($mydata));
}

// There is a AIR_CURRENT that smells AIR_ODOR. The air is AIR_CONTENT. You
// can hear SOUNDS and SOUNDS and SOUNDS off in the distance. You find
// GENERAL_ITEM, FURNITURE, RELIGIOUS ITEMS and UTENSILS here. You also see
// TORTURE/MAGE in the room.
function build_assortment()
{
  $air_current = 0;
  $air_odor = 0;
  $air_content = 0;
  $religious_items = 0;
  $sound1 = 0;
  $sound2 = 0;
  $sound3 = 0;
  $general_items = 0;
  $furniture = 0;
  $utensils = 0;
  $torture_mage = 0;
  $found = [];

  while ($air_current + $air_odor + $air_content + $religious_items +
         $sound1 + $sound2 + $sound3 + $general_items + $furniture +
         $utensils + $torture_mage == 0)
  {
    $air_current = (percent() <= 40);           // 01
    $air_odor = (percent() <= 40);              // 02
    $air_content = (percent() <= 20);           // 03
    $sound1 = (percent() <= 30);                // 04
    $sound2 = (percent() <= 30);                // 04
    $sound3 = (percent() <= 30);                // 04
    $general_items = (percent() <= 50);         // 05
    $furniture = (percent() <= 30);             // 06
    $religious_items = (percent() <= 20);       // 07
    $utensils = (percent() <= 40);              // 11
    $torture_mage = (percent() <= 30);          // 08/09
  }

  $output = '';
  if ($air_current)
  {
    $output .= "There is " . generateRandomDressing("01");
  }

  if ($air_odor)
  {
    if ($air_current)
    {
      $output .= " that smells " . generateRandomDressing("02");
    }
    else
    {
      $output = "The air smells " . generateRandomDressing("03");
    }
  }
  if ($air_current || $air_odor)
  {
    $output .= ". ";
  }

  if ($air_content)
  {
    $output .= "The air is " . generateRandomDressing("03") . ". ";
  }

  if ($sound1 || $sound2 || $sound3)
  {
    $output .= "You can hear ";
    $count = $sound1 + $sound2 + $sound3;
    if ($count == 1)
    {
      $output .= generateRandomDressing("04");
    }
    else if ($count == 2)
    {
      $output .= generateRandomDressing("04") . " and " . generateRandomDressing("04");
    }
    else
    {
      $output .= generateRandomDressing("04") . ", " . generateRandomDressing("04") . " and " . generateRandomDressing("04");
    }
    $output .= " in the distance. ";
  }

  if ($general_items)
  {
    $found[] = generateRandomDressing("05");
  }
  if ($furniture)
  {
    $found[] = generateRandomDressing("06");
  }
  if ($religious_items)
  {
    $found[] = generateRandomDressing("07");
  }
  if ($utensils)
  {
    $found[] = generateRandomDressing("11");
  }

  if (count($found) != 0)
  {
    if (count($found) == 1)
    {
      $output .= "You find " . $found[0] . " here. ";
    }
    else
    {
      $output .= "You find ";
      for($x = 0; $x <= count($found) - 1; ++$x)
      {
        if ($x == count($found) - 1)
        {
          $output .= $found[$x];
        }
        else if ($x == count($found) - 2)
        {
          $output .= $found[$x] . " and ";
        }
        else
        {
          $output .= $found[$x] . ", ";
        }
      }
      $output .= " here. ";
    }
  }

  if ($torture_mage)
  {
    $output .= "You also see " . (percent() <= 50 ? generateRandomDressing("08") : generateRandomDressing("09")) .
              " in the room.";
  }

  return $output;
}

$types = explode(" ", "0 1 2 3 4 5 6 7 8 9 10 11");

if (!input_valid($type, $types))
{
  $type = 1;
}

if ($type == 0)
{
  $output = [];
  $output[] = build_assortment();
  print(json_encode($output));
}
else
{
  $dressings = fetch_data($type);
  $dressingsOutput = returnDressings($dressings, $amount);
  print(json_encode($dressingsOutput));
}