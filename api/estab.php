<?php
/* John's D&D Utilities
 * Copyright (C) 2001-2025, John Evans
 * Released under GPLv3.
 */

require("utils.php");

start_html("Establishment Names");

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
?>

<p>
<table cellpadding=3 cellspacing=0 align="center" border=0 width="60%">
  <tr>
    <th colspan=5>Establishment Names</th>
  </tr>
<?php
for ($x = 1; $x <= 20; ++$x) {
  print("  <tr>\n");

  printf("    <td align=\"center\" class=\"pt9\">%s %s</td>\n", get_random($before), get_random($after));
  print ("    <td style=\"width: 8px;\"></td>\n");
  printf("    <td align=\"center\" class=\"pt9\">%s %s</td>\n", get_random($before), get_random($after));
  print ("    <td style=\"width: 8px;\"></td>\n");
  printf("    <td align=\"center\" class=\"pt9\">%s %s</td>\n", get_random($before), get_random($after));

  print("  </tr>\n");
}
?>
</table>
</p>

<?php end_html();
