<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

$name = trim(get_var("name"));
$density = get_var("density");
$size = get_var("size");
$estab = get_var("estab");
$agri = get_var("agri");
$wine = get_var("wine");
$herding = get_var("herding");
$hills = get_var("hills");
$forest = get_var("forest");
$port = get_var("port");
$military = get_var("military");
$nation = get_var("nation");

if (empty($name))
  $name = "Random City";

$densities = array("X", "Sparse", "Low", "Average", "High", "Very High");
$sizes = array("X", "Village", "Town", "City");

$gods = array("Aesoth", "Balek", "Barzadi", "Fanuviel", "Garzaka", "Gollad", "Kylak", "Laurawin", "Maleesh", "Mallad", "Marana", "Nalo", "Phyla", "Sheelam", "Sibith", "Tallamir", "Thandir", "Thrana", "Thund", "Tordotha");

$adjs = $nouns = $lodging = $common = $rare = $transport = $services = $establishments = array();
$max_val_single_item = $ready_cash = $blocks = $pop = 0;

$path = "data/names";

// Fetch Adjectives
$fh = fopen("$path/estab.adj", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}
while (!feof($fh))
{
  $line = chop(fgets($fh, 255));
  if (!feof($fh))
  {
    $adjs[] = $line;
  }
}
fclose($fh);

// Fetch Nouns
$fh = fopen("$path/estab.noun", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}
while (!feof($fh))
{
  $line = chop(fgets($fh, 255));
  if (!feof($fh))
  {
    $nouns[] = $line;
  }
}
fclose($fh);

// Fetch Dwarven Information
$fh = fopen("$path/dwarf", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}

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
    $dwarf_prefix[] = $line;
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

// Fetch Drow Names
$fh = fopen("$path/drow", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}

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

// Fetch Elven Names
$fh = fopen("$path/elf", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}

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

// Fetch Orc Names
$fh = fopen("$path/orc", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}

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

// Fetch Gaelic Names
$fh = fopen("$path/gaelic", "r");
if (!$fh)
{
  abort("Error reading datafile!");
}

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

function validate_city_input()
{
  global $estab, $density, $size, $agri, $wine, $herding, $hills, $forest, $port, $military;

  if ($density <= 0)
  {
    $density = dice(1, 5);
  }
  if ($density > 5)
  {
    $density = 5;
  }
  if ($size <= 0)
  {
    $size = dice(1, 3);
  }
  if ($size > 3)
  {
    $size = 3;
  }

  $estab = ($estab == "on");
  $agri = ($agri == "on");
  $wine = ($wine == "on");
  $herding = ($herding == "on");
  $hills = ($hills == "on");
  $forest = ($forest == "on");
  $port = ($port == "on");
  $military = ($military == "on");
}

function determine_population($density, $size) {
  global $blocks, $pop;

  switch($density)
  {
    case 1:
      if ($size == 1)
      {
        $blocks = dice(1, 4) - 3;
      }
      else if ($size == 2)
      {
        $blocks = dice(1, 3);
      }
      else
      {
        $blocks = dice(6, 4);
      }
      break;
    case 2:
      if ($size == 1)
      {
        $blocks = dice(1, 4) - 3;
      }
      else if ($size == 2)
      {
        $blocks = dice(1, 4);
      }
      else
      {
        $blocks = dice(8, 4);
      }
      break;
    case 3:
      if ($size == 1)
      {
        $blocks = dice(1, 3) - 2;
      }
      else if ($size == 2)
      {
        $blocks = dice(1, 6);
      }
      else
      {
        $blocks = dice(10, 6);
      }
      break;
    case 4:
      if ($size == 1)
      {
        $blocks = dice(1, 2) - 1;
      }
      else if ($size == 2)
      {
        $blocks = dice(1, 10);
      }
      else
      {
        $blocks = dice(10, 8);
      }
      break;
    case 5:
      if ($size == 1)
      {
        $blocks = dice(1, 2) - 1;
      }
      else if ($size == 2)
      {
        $blocks = dice(1, 8) + 2;
      }
      else
      {
        $blocks = dice(10, 10);
      }
      break;
  }

  if ($blocks <= 0)
  {
    $pop = dice(20, 10);
  }
  else
  {
    $pop = ($blocks * 500) + dice(10, 10);
  }
}

function calc_number($blocks, $percent)
{
  $percent *= $blocks;
  $number = intval($percent / 100);
  $percent -= ($number * 100) - 1;
  if (percent() <= $percent)
  {
    ++$number;
  }
  return(max(0, $number));
}

function build_services()
{
  global $lodging, $common, $rare, $transport, $services, $establishments;
  global $blocks;
  global $agri, $wine, $herding, $hills, $forest, $port, $military;

  $lodging["Almshouse"] = calc_number($blocks, 10);
  $lodging["Baker"] = calc_number($blocks, 33);
  $lodging["Boarding House"] = calc_number($blocks, 25);
  $lodging["Brewer"] = calc_number($blocks, 33);
  $lodging["Butcher"] = calc_number($blocks, 25);
  $lodging["Cheesemaker"] = calc_number($blocks, 16);
  if ($port)
  {
    $lodging["Fishmonger"] = calc_number($blocks, 90);
  }
  else
  {
    $lodging["Fishmonger"] = calc_number($blocks, 50);
  }
  if ($agri)
  {
    $lodging["Grocer"] = calc_number($blocks, 90);
  }
  else
  {
    $lodging["Grocer"] = calc_number($blocks, 50);
  }
  $lodging["Hostel"] = calc_number($blocks, 16);
  $lodging["Inn"] = calc_number($blocks, 66);
  $lodging["Provisioner"] = calc_number($blocks, 25);
  $lodging["Tavern"] = calc_number($blocks, 90);
  if ($wine)
  {
    $lodging["Vintner"] = calc_number($blocks, 50);
  }
  else
  {
    $lodging["Vintner"] = calc_number($blocks, 10);
  }

  if ($military)
  {
    $common["Blacksmith"] = max(1, calc_number($blocks, 100));
  }
  else
  {
    $common["Blacksmith"] = calc_number($blocks, 90);
  }
  $common["Cobbler"] = calc_number($blocks, 70);
  $common["Cooper"] = calc_number($blocks, 66);
  if ($herding || $military)
  {
    $common["Leatherworker"] = max(1, calc_number($blocks, 90));
  }
  else
  {
    $common["Leatherworker"] = calc_number($blocks, 66);
  }
  if ($hills)
  {
    $common["Mason"] = calc_number($blocks, 90);
  }
  else
  {
    $common["Mason"] = calc_number($blocks, 50);
  }
  $common["Miller"] = calc_number($blocks, 50);
  $common["Potter"] = calc_number($blocks, 25);
  if ($herding)
  {
    $common["Tanner"] = calc_number($blocks, 90);
  }
  else
  {
    $common["Tanner"] = calc_number($blocks, 33);
  }
  $common["Trader"] = calc_number($blocks, 90);
  $common["Weaver"] = calc_number($blocks, 25);
  $common["Woodworker"] = calc_number($blocks, 90);

  $rare["Apothecary"] = calc_number($blocks, 8);
  if ($military)
  {
    $rare["Armorer"] = max(1, calc_number($blocks, 60));
  }
  else
  {
    $rare["Armorer"] = calc_number($blocks, 16);
  }
  $rare["Bookbinder"] = calc_number($blocks, 10);
  if ($forest || $military)
  {
    $rare["Bowyer"] = max(1, calc_number($blocks, 50));
  }
  else
  {
    $rare["Bowyer"] = calc_number($blocks, 33);
  }
  $rare["Clockmaker"] = calc_number($blocks, 5);
  $rare["Chandler"] = calc_number($blocks, 16);
  $rare["Dyer"] = calc_number($blocks, 16);
  $rare["Fine Clothier"] = calc_number($blocks, 10);
  $rare["Furrier"] = calc_number($blocks, 10);
  $rare["Glassblower"] = calc_number($blocks, 10);
  $rare["Herbalist"] = calc_number($blocks, 5);
  $rare["Jeweler"] = calc_number($blocks, 8);
  $rare["Locksmith"] = calc_number($blocks, 8);
  $rare["Seamstress/Tailor"] = calc_number($blocks, 33);
  $rare["Specialty Smith"] = calc_number($blocks, 16);
  $rare["Tilemaker"] = calc_number($blocks, 16);
  if ($military)
  {
    $rare["Weaponsmith"] = max(1, calc_number($blocks, 75));
  }
  else
  {
    $rare["Weaponsmith"] = calc_number($blocks, 25);
  }

  if ($port)
  {
    $transport["Boat for hire"] = calc_number($blocks, 80);
  }
  else
  {
    $transport["Boat for hire"] = calc_number($blocks, 50);
  }
  $transport["Cartwright"] = calc_number($blocks, 33);
  $transport["Porter"] = calc_number($blocks, 33);
  $transport["Saddler"] = calc_number($blocks, 16);
  $transport["Shipwright"] = calc_number($blocks, 16);
  $transport["Stable"] = calc_number($blocks, 50);
  $transport["Teamster"] = calc_number($blocks, 90);
  $transport["Wagon Yard"] = calc_number($blocks, 30);

  $services["Alchemist"] = calc_number($blocks, 5);
  $services["Assassin/Bounty Hunter"] = calc_number($blocks, 20);
  $services["Astrologer"] = calc_number($blocks, 8);
  $services["Barber"] = calc_number($blocks, 66);
  $services["Barrister"] = calc_number($blocks, 8);
  $services["Burglar"] = calc_number($blocks, 10);
  $services["Dragoman"] = calc_number($blocks, 37);
  $services["Engineer"] = calc_number($blocks, 8);
  $services["Fence"] = calc_number($blocks, 50);
  $services["Healer"] = calc_number($blocks, 33);
  $services["Interpreter"] = calc_number($blocks, 20);
  $services["Laborer"] = calc_number($blocks, 90);
  $services["Magician"] = calc_number($blocks, 25);
  $services["Physician"] = calc_number($blocks, 16);
  $services["Linkboy"] = calc_number($blocks, 25);
  $services["Entertainer"] = calc_number($blocks, 50);
  if ($port)
  {
    $services["Navigator"] = calc_number($blocks, 25);
  }
  else
  {
    $services["Navigator"] = 0;
  }
  $services["Priest"] = calc_number($blocks, 66);
  $services["Sage"] = calc_number($blocks, 8);
  $services["Scribe"] = calc_number($blocks, 10);

  $establishments["Castle"] = calc_number($blocks, 7);
  $establishments["Fortress"] = calc_number($blocks, 15);
  $establishments["Jailhouse"] = calc_number($blocks, 15);
  $establishments["Orphanage"] = calc_number($blocks, 6);
  $establishments["School"] = 0;
  $establishments["Shrine"] = calc_number($services["Priest"], 30);
  $establishments["Temple"] = calc_number($services["Priest"], 45);
  $establishments["Thieves' Guild"] = calc_number($blocks, 10);
  if ($services["Priest"] > 0 && $establishments["Temple"] == 0 &&
      $establishments["Shrine"] == 0)
  {
    $establishments["Shrine"] = 1;
  }
  $iq = intval(($services["Sage"] / 2) + ($services["Scribe"] / 3));
  $iq += $services["Magician"];
  $establishments["School"] = calc_number($iq, 35);
  $iq += $establishments["School"];
  $establishments["University"] = calc_number($iq, 10);
}

function get_quality()
{
  switch(rand(1, 10))
  {
    case 1: return("*");
    case 2: return("**");
    case 3: return("**");
    case 4: return("***");
    case 5: return("***");
    case 6: return("***");
    case 7: return("***");
    case 8: return("****");
    case 9: return("****");
    case 10: return("*****");
  }
}

function num_table($title, $arr)
{
  $count = 0;

  $html =  "  <tr><th class=\"pt16\" colspan=5>$title</th></tr>\n";
  $html .= "  <tr>\n";

  reset($arr);
  foreach ($arr as $key => $val)
  {
    ++$count;
    $html .= sprintf("    <td class=\"pt10\">&nbsp;<a class=\"black\" href=\"#%s\"><b>%s</b></a>: %s&nbsp;</td>\n", $key, $key, $val);
    if ($count % 3 == 0)
    {
      $html .= "  </tr>\n\n  <tr>\n";
    }
    else
    {
      $html .= "    <td>&nbsp;&nbsp;&nbsp;</td>\n";
    }
  }
  $html .= "  </tr>\n\n\n";
  return($html);
}

function make_estab_name($key)
{
  global $adjs, $nouns, $gods,
         $dwarf_prefix, $dwarf_male, $dwarf_female,
         $drow_male, $drow_female,
         $elf_prefix, $elf_postfix,
         $orc_prefix, $orc_postfix,
         $gaelic_prefix, $gaelic_postfix;

  if ($key == "Temple" || $key == "Shrine")
  {
    $name = sprintf("%s of %s", $key, get_random($gods));
    return($name);
  }

  if ($key == "Seamstress/Tailor")
  {
    if (number(1, 2) == 1)
    {
      $key = "Seamstress";
    }
    else
    {
      $key = "Tailor";
    }
  }

  switch (number(1, 24))
  {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:  // standard
      $name = sprintf("%s %s %s", get_random($adjs), get_random($nouns), $key);
      break;
    case 11:
    case 12:
    case 13:
    case 14:  // of the
      $name = sprintf("%s of the %s %s", $key, get_random($adjs), get_random($nouns));
      break;
    case 15:  // male dwarf
      $name = sprintf("%s%s's %s", get_random($dwarf_prefix), get_random($dwarf_male), $key);
      break;
    case 16:  // female dwarf
      $name = sprintf("%s%s's %s", get_random($dwarf_prefix), get_random($dwarf_female), $key);
      break;
    case 17:  // male drow
      $name = sprintf("%s's %s", get_random($drow_male), $key);
      break;
    case 18:  // female drow
      $name = sprintf("%s's %s", get_random($drow_female), $key);
      break;
    case 19:
    case 20:  // elf
      $name = sprintf("%s%s's %s", get_random($elf_prefix), get_random($elf_postfix), $key);
      break;
    case 21:
    case 22:  // orc
      $name = sprintf("%s%s's %s", get_random($orc_prefix), get_random($orc_postfix), $key);
      break;
    case 23:
    case 24:  // gaelic
      $name = sprintf("%s%s's %s", get_random($gaelic_prefix), get_random($gaelic_postfix), $key);
      break;
  }
  return($name);
}

function desc_table($title, $arr)
{
  global $estab;

  $count = 0;
  $html = "<p class=\"pt18\" align=\"center\">$title</p>\n";
  foreach ($arr as $key => $amt)
  {
    if ($amt > 0)
    {
      $html .= "\n\n\n<a name=\"$key\">\n<p>\n<table align=\"center\" width=\"90%\" cellpadding=2 cellspacing=0 border=1>\n";
      $html .= "  <tr><th class=\"pt16\">$key</th></tr>\n";
      for ($count = 1; $count <= $amt; ++$count)
      {
        $html .= "  <tr>\n    <td class=\"pt9\">\n";
        if ($estab)
        {
          $html .= sprintf("<b class=\"pt10\">%s<sup>%s</sup></b><br />\n", make_estab_name($key), get_quality());
        }
        else
        {
          $html .= sprintf("<b class=\"pt10\">%s<sup>%s</sup></b><br />\n", $key, get_quality());
        }
        $html .= "<p class=\"indent9\">\n\n</p>\n";
        $html .= "    </td>\n  </tr>\n\n";
      }
      $html .= "</table>\n</p>\n";
    }
  }
  return($html);
}

function determine_economy($pop)
{
  global $max_val_single_item, $ready_cash;

  if      ($pop <= 80)    $max_val_single_item = 40 + $pop;
  else if ($pop <= 400)   $max_val_single_item = 100 + $pop;
  else if ($pop <= 900)   $max_val_single_item = 200 + $pop;
  else if ($pop <= 2000)  $max_val_single_item = 800 + $pop;
  else if ($pop <= 5000)  $max_val_single_item = 3000 + $pop;
  else if ($pop <= 12000) $max_val_single_item = 15000 + $pop;
  else if ($pop <= 25000) $max_val_single_item = 40000 + $pop;
  else                    $max_val_single_item = 100000 + $pop;

  $ready_cash = round(($max_val_single_item / 2) * ($pop * 0.1));
}

// ***************
// START MAIN CODE
// ***************

validate_city_input();
determine_population($density, $size);
determine_economy($pop);
build_services();

$lodging_num = num_table("Food, Drink and Lodging", $lodging);
$common_num = num_table("Common Crafts and Trades", $common);
$rare_num = num_table("Rare Crafts and Trades", $rare);
$transport_num = num_table("Transportation", $transport);
$services_num = num_table("NPC Services", $services);
$estab_num = num_table("Establishments", $establishments);

$lodging_desc = desc_table("Food, Drink and Lodging", $lodging);
$common_desc = desc_table("Common Crafts and Trades", $common);
$rare_desc = desc_table("Rare Crafts and Trades", $rare);
$transport_desc = desc_table("Transportation", $transport);
$services_desc = desc_table("NPC Services", $services);
$estab_desc = desc_table("Establishments", $establishments);

$blocks = max(1, $blocks);
$density = array_key_exists($density, $densities) ? $densities[$density] : "Average";
$size = array_key_exists($size, $sizes) ? $sizes[$size] : "Town";
$pop = comma($pop);
$max_val_single_item = comma($max_val_single_item);
$ready_cash = comma($ready_cash);

$entity_name = htmlentities($name);
$output = return_start_html($entity_name);

$output .= <<< END_HTML

<p>
<h1 align="center">$entity_name</h1>
</p>

<p>
<table align="center" cellpadding=3 cellspacing=3 border=1>
  <tr>
    <th>Density</th>
    <th>Size</th>
    <th>Blocks</th>
    <th>Population</th>
    <th>Max Val of Single Item</th>
    <th>Ready Gold on Hand</th>
  </tr>
  <tr>
    <td align="center">$density</td>
    <td align="center">$size</td>
    <td align="center">$blocks</td>
    <td align="center">$pop</td>
    <td align="center">$max_val_single_item</td>
    <td align="center">$ready_cash</td>
  </tr>
</table>
</p>

<p align="center">
<a href="#Notes" class="black">Click for Notes</a>
</p>

<p>
<table align="center" cellpadding=0 cellspacing=1 border=1>
$lodging_num
$common_num
$rare_num
$transport_num
$services_num
$estab_num
</table>
</p>

<hr width="80%">

$lodging_desc
$common_desc
$rare_desc
$transport_desc
$services_desc
$estab_desc

<a name="Notes">
<p>
<h1 align="center">Notes</h1><br />
<ul>
<li>Notes go here.</li>
</ul>
</p>

</body>
</html>
END_HTML;

print($output);
