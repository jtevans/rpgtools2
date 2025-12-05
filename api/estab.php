<?php
require("utils.php");

$amount = max(1, min(20, intval(get_var('amount', 20))));
$names = [[], [], []];

$Data = fopen("./data/names/estab.adj", "r");
if (!$Data)
{
  abort("Error reading datafile!");
}

// Fetch First Half
while (!feof($Data))
{
  $line = chop(fgets($Data, 255));
  if (!feof($Data))
  {
    $before[] = $line;
  }
}
fclose($Data);

// Fetch Second Half
$Data = fopen("./data/names/estab.noun", "r");
if (!$Data)
{
  abort("Error reading datafile!");
}

while (!feof($Data))
{
  $line = chop(fgets($Data, 255));
  if (!feof($Data))
  {
    $after[] = $line;
  }
}
fclose($Data);


for ($x = 1; $x <= $amount; ++$x)
{
  $names[0][] = get_random($before) . ' ' . get_random($after);
  $names[1][] = get_random($before) . ' ' . get_random($after);
  $names[2][] = get_random($before) . ' ' . get_random($after);

}

print(json_encode($names));