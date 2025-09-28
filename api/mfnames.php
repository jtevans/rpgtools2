<?php
require('utils.php');

$type = get_var('type', 'drow');
$amount = max(1, min(20, intval(get_var('amount', 20))));
$maleNames = [];
$femaleNames = [];

$validTypes = array("arabic", "drow", "german", "viking", "cornish");

if ( ! in_array($type, $validTypes))
{
  $type = 'drow';
}

$data = fopen("./data/names/$type", "r");
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

fclose($data);

for ($x = 1; $x <= $amount; ++$x)
{
  $maleNames[] = get_random($male);
  $femaleNames[] = get_random($female);
}

print(json_encode([$maleNames, $femaleNames]));
