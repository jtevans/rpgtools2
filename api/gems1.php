<?php
require('utils.php');

$amount = intval(get_var('amount', 1));

class Category
{
  var $name;
  var $low;
  var $high;
  var $base;

  function __construct($n, $l, $h, $b)
  {
    $this->name = $n;
    $this->low = $l;
    $this->high = $h;
    $this->base = $b;
  }
}

class Subcategory
{
  var $category;
  var $low;
  var $high;
  var $desc;

  function __construct($c, $l, $h, $d)
  {
    $this->category = $c;
    $this->low = $l;
    $this->high = $h;
    $this->desc = $d;
  }
}

function variation($value)
{
  switch(dice(1, 6))
  {
  case 1:
    switch($value)
    {
      case 10:
        $value = 50;
        break;
      case 50:
        $value = 100;
        break;
      case 100:
        $value = 500;
        break;
      case 500:
        $value = 1000;
        break;
      case 1000:
        $value = 5000;
        break;
      case 5000:
        $value = 10000;
        break;
    }
    break;
  case 2:
    $value *= 2;
    break;
  case 3:
    $value = $value * (dice(1, 6) / 10 + 1);
    break;
  case 4:
    $value = $value * (dice(1, 6) / 10);
     break;
  case 5:
    $value /= 2;
    break;
  case 6:
    switch($value)
    {
      case 5:
        $value = 1;
        break;
      case 10:
        $value = 10;
        break;
      case 50:
        $value = 10;
        break;
      case 100:
        $value = 50;
        break;
      case 500:
        $value = 100;
        break;
      case 1000:
        $value = 500;
        break;
      case 5000:
        $value = 1000;
        break;
    }
    break;
  }
  return($value);
}


function build_item()
{
  global $cats, $subcats;

  $roll1 = percent();
  $roll2 = percent();

  for ($x = 0; $x < count($cats); ++$x)
  {
    if ($roll1 >= $cats[$x]->low && $roll1 <= $cats[$x]->high)
    {
      for ($y = 0; $y < count($subcats); ++$y)
      {
        if ($subcats[$y]->category == $cats[$x]->name &&
            $roll2 >= $subcats[$y]->low &&
            $roll2 <= $subcats[$y]->high)
        {
          $item = ucfirst(strtolower($subcats[$y]->desc)) . " worth ";
          break;
        }
      }
      if (dice(1, 10) == 1)
      {
        $value = variation($cats[$x]->base);
      }
      else
      {
        $value = $cats[$x]->base;
      }
      $item .= $value . " GP. (" . $cats[$x]->name . ")";
      return($item);
    }
  }
}

$data = fopen("./data/treasure/gems1", "r");

if (!$data)
{
  print(json_encode(['Error opening data file.']));
  exit();
}

// Fetch Categories
$cats = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if (empty($line))
  {
    continue;
  }

  if (preg_match("/^:/", $line))
  {
    break;
  }
  else
  {
    list($low, $high, $base, $name) = explode(" ", $line, 4);
    $cats[] = new Category($name, $low, $high, $base);
  }
}

$name = substr($line, 1);
// Fetch Subcategories
$subcats = [];
while (!feof($data))
{
  $line = chop(fgets($data, 255));
  if (empty($line))
  {
    continue;
  }


  if (preg_match("/^:/", $line))
  {
    $name = substr($line, 1);
  }
  else
  {
    list($low, $high, $desc) = explode(" ", $line, 3);
    $subcats[] = new Subcategory($name, $low, $high, $desc);
  }
}

fclose($data);

$gems = [];
for ($x = 1; $x <= $amount; ++$x)
{
  $gems[] = build_item();
}

print(json_encode($gems));