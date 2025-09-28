<?php
require('utils.php');

$amount = max(1, min(20, intval(get_var('amount', 20))));
$names = [[], [], []];


$dwarf_pre = [];
$dwarf_male = [];
$dwarf_female = [];
$fh = fopen("./data/names/dwarf", "r");
if ($fh)
{
  // Fetch Prefixes
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $dwarf_pre[] = $line;
    }
  }
  // Fetch Male Suffixes
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $dwarf_male[] = $line;
    }
  }
  // Fetch Female Suffixes
  while (!feof($fh))
    {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    } 
    else
    {
      $dwarf_female[] = $line;
    }
  }
  fclose($fh);
}


// Fetch Drow Names
$drow_male = [];
$drow_female = [];
$fh = fopen("./data/names/drow", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $drow_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $drow_female[] = $line;
    }
  }
  fclose($fh);
}

// Fetch Cornish Names
$cornish_male = [];
$cornish_female = [];
$fh = fopen("./data/names/cornish", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $cornish_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $cornish_female[] = $line;
    }
  }
  fclose($fh);
}


// Fetch Elven Names
$elf_prefix = [];
$elf_postfix = [];
$fh = fopen("./data/names/elf", "r");
if (!$fh)
{
  // Fetch First Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $elf_prefix[] = $line;
    }
  }
  // Fetch Second Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $elf_postfix[] = $line;
    }
  }
  fclose($fh);
}

// Fetch Orc Names
$orc_prefix = [];
$orc_postfix = [];
$fh = fopen("./data/names/orc", "r");
if (!$fh)
{
  // Fetch First Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $orc_prefix[] = $line;
    }
  }
  // Fetch Second Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $orc_postfix[] = $line;
    }
  }
  fclose($fh);
}

// Fetch Gaelic Names
$gaelic_prefix = [];
$gaelic_postfix = [];
$fh = fopen("./data/names/gaelic", "r");
if (!$fh)
{
  // Fetch First Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $gaelic_prefix[] = $line;
    }
  }
  // Fetch Second Half
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $gaelic_postfix[] = $line;
    }
  }
  fclose($fh);
}

$arabic_male = [];
$arabic_female = [];
$fh = fopen("./data/names/arabic", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $arabic_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $arabic_female[] = $line;
    }
  }
  fclose($fh);
}

$german_male = [];
$german_female = [];
$fh = fopen("./data/names/german", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $german_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $german_female[] = $line;
    }
  }
  fclose($fh);
}

$viking_male = [];
$viking_female = [];
$fh = fopen("./data/names/viking", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $viking_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $viking_female[] = $line;
    }
  }
  fclose($fh);
}

$korean_male = [];
$korean_female = [];
$korean_family = [];
$fh = fopen("./data/names/korean", "r");
if (!$fh)
{
  // Fetch Male Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $korean_male[] = $line;
    }
  }
  // Fetch Female Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    if ($line == ":")
    {
      break;
    }
    else
    {
      $korean_female[] = $line;
    }
  }
  // Fetch Family Names
  while (!feof($fh))
  {
    $line = chop(fgets($fh, 255));
    $korean_family[] = $line;
  }
  fclose($fh);
}

function get_dwarf()
{
  global $dwarf_pre, $dwarf_male, $dwarf_female;
  $name = '';
  $num = number(1, 2);
  for ($x = 1; $x <= $num; ++$x)
  {
    $name .= get_random($dwarf_pre);
  }
  if (number(1, 2) == 1)
  {
    $name .= get_random($dwarf_male);
  }
  else
  {
    $name .= get_random($dwarf_female);
  }
  return($name);
}

function get_drow()
{
  global $drow_male, $drow_female;
  if (number(1, 2) == 1)
  {
    return(get_random($drow_male));
  }
  else
  {
    return(get_random($drow_female));
  }
}

function get_cornish()
{
  global $cornish_male, $cornish_female;
  if (number(1, 2) == 1)
  {
    return(get_random($cornish_male));
  }
  else
  {
    return(get_random($cornish_female));
  }
}

function get_elf()
{
  global $elf_prefix, $elf_postfix;
  return(get_random($elf_prefix) . get_random($elf_postfix));
}

function get_orc()
{
  global $orc_prefix, $orc_postfix;
  return(get_random($orc_prefix) . get_random($orc_postfix));
}

function get_arabic()
{
  global $arabic_male, $arabic_female;
  if (number(1, 2) == 1)
    return(get_random($arabic_male));
  else
    return(get_random($arabic_female));
}

function get_gaelic()
{
  global $gaelic_prefix, $gaelic_postfix;
  return(get_random($gaelic_prefix) . get_random($gaelic_postfix));
}

function get_german()
{
  global $german_male, $german_female;
  if (number(1, 2) == 1)
  {
    return(get_random($german_male));
  }
  else
  {
    return(get_random($german_female));
  }
}

function get_korean()
{
  global $korean_male, $korean_female, $korean_family;
  $name = get_random($korean_family) . " ";

  if (number(1, 2) == 1)
  {
    $name .= get_random($korean_male);
  }
  else
  {
    $name .= get_random($korean_female);
  }

  return($name);
}

function get_viking()
{
  global $viking_male, $viking_female;
  if (number(1, 2) == 1)
  {
    return(get_random($viking_male));
  }
  else
  {
    return(get_random($viking_female));
  }
}

function get_name()
{
  switch(number(1,10))
  {
    case 1:
      return(ucfirst(strtolower(get_dwarf())));
      break;
    case 2:
      return(ucfirst(strtolower(get_drow())));
      break;
    case 3:
      return(ucfirst(strtolower(get_elf())));
      break;
    case 4:
      return(ucfirst(strtolower(get_orc())));
      break;
    case 5:
      return(ucfirst(strtolower(get_arabic())));
      break;
    case 6:
      return(ucfirst(strtolower(get_gaelic())));
      break;
    case 7:
      return(ucfirst(strtolower(get_german())));
      break;
    case 8:
      return(get_korean());
      break;
    case 9:
      return(ucfirst(strtolower(get_viking())));
      break;
    case 10:
      return(ucfirst(strtolower(get_cornish())));
      break;
  }
}

for ($x = 1; $x <= $amount; ++$x)
{
  $names[0][] = get_name();
  $names[1][] = get_name();
  $names[2][] = get_name();
}

print(json_encode($names));