<?php
require('utils.php');

$amount = intval(get_var('amount', 1));

class Category
{
  var $name;
  var $low;
  var $high;
  var $dice;
  var $mult;
  var $dc;

  function __construct($n, $l, $h, $d, $m, $dc)
  {
    $this->name = $n;
    $this->low = $l;
    $this->high = $h;
    $this->dice = $d;
    $this->mult = $m;
    $this->dc = $dc;
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
      $value = dice($cats[$x]->dice, 4) * $cats[$x]->mult;
      $value += dice(number(1, 4), 4);
      $item .= $value . " GP. (" . $cats[$x]->name . ", DC: " . $cats[$x]->dc . ")";
      if ($cats[$x]->dc >= 15)
      {
        $item .= " (No value known if appraise fails)";
      }
      else
      {
        $item .= " (Misappraised Value: " . intval($value * ((dice(2, 6) + 3) * .1)) . "GP)";
      }
      return($item);
    }
  }
}

$data = fopen("./data/treasure/gems3", "r");

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
    list($low, $high, $dice, $mult, $name, $dc) = explode(" ", $line, 6);
    $cats[] = new Category($name, $low, $high, $dice, $mult, $dc);
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
