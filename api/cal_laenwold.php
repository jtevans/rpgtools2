<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

$year = intval(get_var("year"));

start_html("Laenwold Calendar: Year $year");

// 1 year = 9 months = 36 weeks = 359 days
// 1 month = 4 weeks = 40 days (except for Dinay, which has 39 days)
// 1 week = 10 days (except for the last week of Dinay, which has 9 days)

// Months: Gruhay Norunnay Ballay Soray Dwonay Calagay Dorday Shiltay Dinay 
// Weekdays: Simarr Griala Grunni Bortill Thorhig
//           Ddal Gomanna Farria Drudal Thinall
// Moons:
//   Coranna: 7 days
//   Dolia: 3 days
//   Gallor: 5 days
//   Iomor: 4 days
//   Toroth: 6 days


// *********************
// GLOBAL VARIABLE SETUP
// *********************

class Moon
{
  var $cycle;
  var $days;
  var $phase;

  function __construct($c, $d, $p)
  {
    $this->cycle = $c;
    $this->days = $d;
    $this->phase = $p;
  }

  function advance()
  {
    global $max_phase;

    if (++$this->days > $this->cycle)
    {
      $this->days = 1;
      if (++$this->phase > $max_phase)
      {
        $this->phase = 1;
      }
    }
  }

  function retreat()
  {
    global $max_phase;

    if (--$this->days < 1)
    {
      $this->days = $this->cycle;
      if (--$this->phase < 1)
      {
        $this->phase = $max_phase;
      }
    }
  }

  function fast_forward($skipped)
  {
    global $max_phase;

    if ($this->cycle)
    {
      $this->days = ($skipped % $this->cycle) + 1;
      $this->phase += intval($skipped / $this->cycle);
    }
    else
    {
      $this->days = $skipped + 1;
      $this->phase += intval($skipped);
    }
    if ($this->phase > $max_phase)
    {
      if (($this->phase % $max_phase) == 0)
      {
        $this->phase = $max_phase;
      }
      else
      {
        $this->phase -= intval($this->phase / $max_phase) * $max_phase;
      }
    }
  }

  function rewind($skipped)
  {
    global $max_phase;

    for ($x = 1; $x <= $skipped; ++$x)
    {
      $this->retreat();
    }
  }
}

$base_year = 1051;
$days_year = 359;
$days_week = 10;
$days_month = 40;

$weekdays = array(1 => "Simarr", "Griala", "Grunni", "Bortill", "Thorhig",
                  "Ddal", "Gomanna", "Farria", "Drudal", "Thinall");
$months = array(1 => "Gruhay", "Norunnay", "Ballay", "Soray", "Dwonay",
                "Calagay", "Dorday", "Shiltay", "Dinay");

$Coranna = new Moon(7, 1, 5);
$Dolia = new Moon(3, 1, 5);
$Gallor = new Moon(5, 1, 5);
$Iomor = new Moon(4, 1, 5);
$Toroth = new Moon(6, 1, 5);

$phases[1] = "-";	// New Moon
$phases[2] = "(";	// New Waxing
$phases[3] = "(]";	// Half Waxing
$phases[4] = "(]+";	// Full Waxing
$phases[5] = "<b>(+)</b>"; // Full Moon
$phases[6] = "+[)";	// Full Waning
$phases[7] = "[)";	// Half Waning
$phases[8] = ")";	// New Waning
$max_phase = 8;

$month = 1;
$dow = 0;
$week = 1;


// *********
// FUNCTIONS
// *********

function print_table_header($m)
{
  global $months;

  printf("<tr><td colspan=9 align=\"center\" class=\"Header2\">%s</td></tr>\n", $months[$m]);
  print("<tr>\n");
  print("<th class=\"pt10\">Julian</th>\n");
  print("<th class=\"pt10\">Date</th>\n");
  print("<th class=\"pt10\">Week Day</th>\n");
  print("<th class=\"pt10\">Coranna</th>\n");
  print("<th class=\"pt10\">Dolia</th>\n");
  print("<th class=\"pt10\">Gallor</th>\n");
  print("<th class=\"pt10\">Iomor</th>\n");
  print("<th class=\"pt10\">Toroth</th>\n");
  print("<th class=\"pt10\">Event</th>\n");
  print("</tr>\n");
}

function make_event($day)
{
  $event = "";

  if ($day == 1)   $event .= "First day of spring. ";
  if ($day == 91)  $event .= "First day of summer. ";
  if ($day == 181) $event .= "First day of autumn. ";
  if ($day == 271) $event .= "First day of winter. ";

  if ($event == "")
    return("&nbsp;");
  else
    return($event);
}

// *********
// MAIN CODE
// *********

if ($year > $base_year)
{
  $skipped = ($year - $base_year) * $days_year;
  $Coranna->fast_forward($skipped);
  $Dolia->fast_forward($skipped);
  $Gallor->fast_forward($skipped);
  $Iomor->fast_forward($skipped);
  $Toroth->fast_forward($skipped);
}
else if ($year < $base_year)
{
  $skipped = ($base_year - $year) * $days_year;
  $Coranna->rewind($skipped);
  $Dolia->rewind($skipped);
  $Gallor->rewind($skipped);
  $Iomor->rewind($skipped);
  $Toroth->rewind($skipped);
}

print("<p align=\"center\" class=\"Header1\">Year: $year</p>\n");
print("<table cellspacing=0 cellpadding=3 border=1 align=\"center\" width=\"85%\">\n");
print_table_header($month);
for ($day = 1; $day <= $days_year; ++$day)
{
  if (++$dow >= 11)
  {
    $dow = 1;
    if (++$week >= 5)
    {
      $week = 1;
      ++$month;
      print_table_header($month);
    }
  }

  print("<tr>\n");
  printf("<td class=\"pt8\">%d</td>\n", $day);
  printf("<td class=\"pt8\">%d</td>\n", ($week - 1) * 10 + $dow);
  printf("<td class=\"pt8\">%s</td>\n", $weekdays[$dow]);
  printf("<td class=\"pt8\" align=\"center\">%s</td>\n", $phases[$Coranna->phase]);
  printf("<td class=\"pt8\" align=\"center\">%s</td>\n", $phases[$Dolia->phase]);
  printf("<td class=\"pt8\" align=\"center\">%s</td>\n", $phases[$Gallor->phase]);
  printf("<td class=\"pt8\" align=\"center\">%s</td>\n", $phases[$Iomor->phase]);
  printf("<td class=\"pt8\" align=\"center\">%s</td>\n", $phases[$Toroth->phase]);
  printf("<td class=\"pt8\">%s</td>\n", make_event($day));
  print("</tr>\n");

  $Coranna->advance();
  $Dolia->advance();
  $Gallor->advance();
  $Iomor->advance();
  $Toroth->advance();
}

print("</table>\n");

end_html();
