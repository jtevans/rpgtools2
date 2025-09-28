<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

$sp = intval(get_var("sp"));
$dc = intval(get_var("dc"));
$skill = intval(get_var("skill"));
$cost = intval($sp / 3);
$progress = 0;
$week = 0;

start_html("Craft Calculator");

if (empty($sp) || empty($dc) || empty($skill) ||
    !is_int($sp) || !is_int($dc) || !is_int($skill))
{
?>

<p>
You must provide <b>numbers</b> for SP, DC, and Skill Bonus.
</p>

</body>
</html>

<?php
exit;
}
?>

<div class="Header1">Craft Progress</div>
<div class="Header2">Final Cost: <?php echo $sp?> / DC: <?php echo $dc?> / Skill: <?php echo $skill?></div>

<table cellpadding=3 cellspacing=0 border=1>
  <tr>
    <th>Week Number</th>
    <th>Skill Roll</th>
    <th>Progress (SP / %)</th>
  </tr>

<?php
while ($progress <= $sp)
{
  ++$week;
  $skill_roll = number(1, 20) + $skill;
  if ($skill_roll >= $dc)
  {
    $progress += $dc * $skill_roll;
  }
  else if ($skill_roll >= $dc - 4)
  {
    $progress += 0;   // No progress
  }
  else // Failed by more than 5
  {
    $cost += intval($cost / 2);
  }

  $progress_percent = min(100, round(($progress / $sp) * 100));

  print <<<END_HTML
    <tr>
      <td>$week</td>
      <td>$skill_roll</td>
      <td>$progress / $progress_percent</td>
    </tr>
END_HTML;
}
?>
</table>

<?php
end_html(); 
