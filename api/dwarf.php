<?php
require("utils.php");

$amount = max(1, min(20, intval(get_var('amount', 20))));
$maleNames = [];
$femaleNames = [];
$strongholdNames = [];

$data = fopen("./data/names/dwarf", "r");
if (!$data)
{
  print(json_encode([['Error opening data file.'], ['Error opening data file.'], ['Error opening data file.']]));
  exit();
}

$pre = [];
### Fetch Prefixes
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $pre[] = $line;
  }
}

$male = [];
### Fetch Male Suffixes
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $male[] = $line;
  }
}

$female = [];
### Fetch Female Suffixes
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $female[] = $line;
  }
}

$stronghold = [];
### Fetch Stronghold Suffixes
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $stronghold[] = $line;
  }
}
fclose($data);

function get_base($pre)
{
  $base = '';
  $num = dice(1, 4);
  for ($x = 1; $x <= $num; ++$x)
  {
    $base .= get_random($pre);
  }
  return(ucfirst(strtolower($base)));
}

for ($x = 1; $x <= $amount; ++$x)
{
  $maleNames[] = get_random($pre) . get_random($male);
  $femaleNames[] = get_random($pre) . get_random($female);
  $strongholdNames[] = get_base($pre) . get_random($stronghold);
}

print(json_encode([$maleNames, $femaleNames, $strongholdNames]));
