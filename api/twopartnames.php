<?php
require('utils.php');

$type = get_var('type');
$amount = max(1, min(20, intval(get_var('amount', 20))));
$names = [[], [], []];

$validTypes = array('elf', 'gaelic', 'orc');
if ( ! in_array($type, $validTypes))
{
  $type = 'elf';
}

$data = fopen("./data/names/$type", "r");
if (!$data)
{
  print(json_encode(['Error opening data file.']));
  exit();
}

### Fetch First Half
$before = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $before[] = $line;
  }
}

### Fetch Second Half
$after = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if ($line == ":")
  {
    break;
  }
  else
  {
    $after[] = $line;
  }
}
fclose($data);

for ($x = 1; $x <= $amount; ++$x)
{
  $names[0][] = get_random($before) . get_random($after);
  $names[1][] = get_random($before) . get_random($after);
  $names[2][] = get_random($before) . get_random($after);
}

print(json_encode($names));