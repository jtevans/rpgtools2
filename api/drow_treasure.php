<?php

require("utils.php");

$l1 = intval(get_var("l0", 0));
$l2 = intval(get_var("l1", 0));
$l3 = intval(get_var("l2", 0));
$q1 = intval(get_var("q0", 0));
$q2 = intval(get_var("q1", 0));
$q3 = intval(get_var("q2", 0));


$treasure = [];
$treasure['SP'] = 0;
$treasure['GP'] = 0;
$treasure['PP'] = 0;
$treasure['Gems'] = 0;

function calc_sp($q)
{
  if ($q == 0)
  {
    return(0);
  }
  return((dice(1, 4) * 10) * $q);
}

function calc_gp($l, $q)
{
  if ($q == 0)
  {
    return(0);
  }
  if ($l == 2)
  {
    $mult = 5;
  }
  else if ($l == 3)
  {
    $mult = 10;
  }
  else
  {
    $mult = 1;
  }
  return((dice(1, 6) * $mult) * $q);
}

function calc_pp($l, $q)
{
  if ($q == 0)
  {
    return(0);
  }

  if ($l == 1)
  {
    return((max(0, dice(1, 4) - 2)) * $q);
  }

  if ($l == 2)
  {
    return(dice(1, 4) * $q);
  }

  if ($l == 3)
  {
    return(dice(2, 6) * $q);
  }

  return(0);
}

function calc_gems($l, $q)
{
  if ($q == 0 || $l == 1)
  {
    return(0);
  }

  if ($l == 2)
  {
    return(max(0, (dice(1, 6) - 3)) * $q);
  }

  if ($l == 3)
  {
    return((dice(1, 6) - 1) * $q);
  }
}

$treasure['SP'] += calc_sp($q1);
$treasure['SP'] += calc_sp($q2);
$treasure['SP'] += calc_sp($q3);
$treasure['GP'] += calc_gp($l1, $q1);
$treasure['GP'] += calc_gp($l2, $q2);
$treasure['GP'] += calc_gp($l3, $q3);
$treasure['PP'] += calc_pp($l1, $q1);
$treasure['PP'] += calc_pp($l2, $q2);
$treasure['PP'] += calc_pp($l3, $q3);
$treasure['Gems'] += calc_gems($l1, $q1);
$treasure['Gems'] += calc_gems($l2, $q2);
$treasure['Gems'] += calc_gems($l3, $q3);

print(json_encode($treasure));
