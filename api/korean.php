<?php
require('utils.php');

$amount = max(1, min(20, intval(get_var('amount', 20))));
$maleNames = [];
$femaleNames = [];

$data = fopen("./data/names/korean", "r");
if (!$data)
{
  print(json_encode([['Error opening data file.'], ['Error opening data file.']]));
  exit();
}

### Fetch Male Names
$male = [];
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

### Fetch Female Names
$female = [];
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

### Fetch Family Names
$family = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  $family[] = $line;
}

fclose($data);

for ($x = 1; $x <= $amount; ++$x)
{
  $maleNames[] = get_random($family) .  ' ' . get_random($male);
  $femaleNames[] = get_random($family) .  ' ' . get_random($female);
}

print(json_encode([$maleNames, $femaleNames]));