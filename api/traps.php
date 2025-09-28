<?php
require('utils.php');

$type = get_var('type');
$amount = max(1, min(20, intval(get_var('amount', 20))));
$traps = [];

$validTypes = array('harmless', 'moderate', 'deadly', 'tricks');
if ( ! in_array($type, $validTypes))
{
  $type = 'harmless';
}

if ($type === 'tricks') {
  $data = fopen("./data/traps/$type", "r");
  if (!$data)
  {
    print(json_encode(['Error opening data file.']));
    exit();
  }

  $objects = [];
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $objects[] = $line;
    }
  }

  $actions = [];
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $actions[] = $line;
    }
  }

  $effects = [];
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $effects[] = $line;
    }
  }

  fclose($data);

  for ($x = 1; $x <= $amount; ++$x)
  {
    $traps[] = sprintf("      If the character %s the %s, then %s.", get_random($actions), get_random($objects), get_random($effects));
  }

  print(json_encode($traps));
}
else {
  $data = fopen("./data/traps/$type", "r");
  if (!$data)
  {
    print(json_encode(['Error opening data file.']));
    exit();
  }
  
  $trapsData = [];
  while (!feof($data))
  {
    $line = chop(fgets($data, 1024));
    $trapsData[] = $line;
    fgets($data, 1024);   // Skipping blank lines
  }
  
  fclose($data);

  for ($x = 1; $x <= $amount; ++$x)
  {
    $traps[] = get_random($trapsData);
  }

  print(json_encode($traps));
}