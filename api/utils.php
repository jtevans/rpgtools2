<?php

function get_var($var, $value = null)
{
  global $_GET;

  $var = isset($_GET[$var]) ? $_GET[$var] : $value;

  return($var);
}

function post_var($var, $value = null)
{
  global $_POST;

  $var = isset($_POST[$var]) ? $_POST[$var] : $value;

  return($var);
}

function pre_r($obj)
{
  print('<pre>');
  print_r($obj);
  print('</pre>');
}

function comma($str)
{
  $n = strlen($str); 
  if ($n <= 3)
  {
   $return = $str;
  }      
  else { 
    $pre = substr($str, 0, $n-3);
    $post = substr($str, $n-3, 3);
    $pre = comma($pre);  
    $return = "$pre,$post";
  }      
  return($return); 
}

function number($low, $high)
{
  if ($low == $high)
  {
    return($low);
  }

  if ($low > $high)
  {
    $temp = $low;
    $low = $high;
    $high = $temp;
  }

  return((rand() % ($high - ($low - 1))) + $low);
}

function dice($number, $size)
{
  $total = 0;

  for ($x = 1; $x <= $number; ++$x)
  {
    $total += number(1, $size);
  }

  return($total);
}

function percent()
{
  return(number(1, 100));
}

function input_valid($input, $types)
{
  $valid = 0;
  for ($x = 0; $x < count($types); ++$x)
  {
    if ($types[$x] == $input)
    {
      return(1);
    }
  }
  return(0);
}

function get_random($arr)
{
  return($arr[array_rand($arr)]);
}

function validate_amount()
{
  global $amount;
  if ($amount < 1)
    $amount = 1;
}

function a_an($word)
{
  if (preg_match("/^[aeiouAEIOU]/", $word))
  {
    return("an");
  }
  return("a");
}

function rand_item($filename)
{
  $data = fopen($filename, "r");
  if (!$data)
  {
    return '';
  }

  $total = 0;
  while (!feof($data))
  {
    $line  = chop(fgets($data, 255));
    if (empty($line))
    {
      continue;
    }
    list($weight, $misc) = explode(" ", $line, 2);
    $total += $weight;
  }

  rewind($data);
  $roll = number(1, $total);
  $total = 0;

  while (!feof($data))
  {
    $line = chop(fgets($data, 255));
    if (empty($line))
    {
      continue;
    }

    list($weight, $name) = explode(" ", $line, 2);
    $total += $weight;
    if ($roll <= $total)
    {
      fclose($data);
      return($name);
    }
  }
  fclose($data);
  return("Nothing Found!!!");
}

function make_treasure_quantity($percentage, $dice, $multiplier)
{
  if (rand(1, 100) <= $percentage)
  {
    list($num, $sides) = explode("d", $dice);    
    $quantity = dice($num, $sides);
    return $quantity * $multiplier;
  }
  return 0;
}
