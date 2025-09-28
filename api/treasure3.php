<?php
require('utils.php');

$cr0 = max(0, min(20, intval(get_var('cr0', 0))));
$cr1 = max(0, min(20, intval(get_var('cr1', 0))));
$cr2 = max(0, min(20, intval(get_var('cr2', 0))));
$cr3 = max(0, min(20, intval(get_var('cr3', 0))));
$cr4 = max(0, min(20, intval(get_var('cr4', 0))));

$q0 = max(0, min(200, intval(get_var('q0', 0))));
$q1 = max(0, min(200, intval(get_var('q1', 0))));
$q2 = max(0, min(200, intval(get_var('q2', 0))));
$q3 = max(0, min(200, intval(get_var('q3', 0))));
$q4 = max(0, min(200, intval(get_var('q4', 0))));

$input[0]["cr"] = $cr0;
$input[0]["q"] = $q0;
$input[1]["cr"] = $cr1;
$input[1]["q"] = $q1;
$input[2]["cr"] = $cr2;
$input[2]["q"] = $q2;
$input[3]["cr"] = $cr3;
$input[3]["q"] = $q3;
$input[4]["cr"] = $cr4;
$input[4]["q"] = $q4;

$cp = 0;
$sp = 0;
$gp = 0;
$pp = 0;
$gems = 0;
$art = 0;
$mundane = 0;
$minor = 0;
$medium = 0;
$major = 0;

for ($set = 0; $set <= 4; ++$set)
{
  if (($input[$set]['cr']) === 0 || $input[$set]['q'] === 0)
  {
    continue;
  }
  
  for ($iter = 1; $iter <= $input[$set]['q']; ++$iter)
  {
    switch ($input[$set]['cr'])
    {
      case 1:
        $d100 = dice(1, 100);
        if ($d100 <= 14)
        {
          $gp += 0;
        }
        else if ($d100 <= 29)
        {
          $cp += dice(1, 6) * 1000;
        }
        else if ($d100 <= 52)
        {
          $sp += dice(1, 8) * 100;
        }
        else if ($d100 <= 95)
        {
          $gp += dice(2, 8) * 10;
        }
        else
        {
          $pp += dice(1, 4) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 90)
        {
          $gems += 0;
        }
        else if ($d100 <= 95)
        {
          ++$gems;
        }
        else
        {
          ++$art;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 71)
        {
          $mundane += 0;
        }
        else if ($d100 <= 95)
        {
          ++$mundane;
        }
        else
        {
          ++$minor;
        }
        break; // case 1
      case 2:
        $d100 = dice(1, 100);
        if ($d100 <= 13)
        {
          $gp += 0;
        }
        else if ($d100 <= 23)
        {
          $cp += dice(1, 10) * 1000;
        }
        else if ($d100 <= 43)
        {
          $sp += dice(2, 10) * 100;
        }
        else if ($d100 <= 95)
        {
          $gp += dice(4, 10) * 10;
        }
        else
        {
          $pp += dice(2, 8) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 81)
        {
          $gems += 0;
        }
        else if ($d100 <= 95)
        {
          $gems += dice(1, 3);
        }
        else
        {
          $art += dice(1, 3);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 49)
        {
          $mundane += 0;
        }
        else if ($d100 <= 85)
        {
          ++$mundane;
        }
        else
        {
          ++$minor;
        }
        break; // case 2
      case 3:
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $gp += 0;
        }
        else if ($d100 <= 21)
        {
          $cp += dice(2, 10) * 1000;
        }
        else if ($d100 <= 41)
        {
          $sp += dice(4, 8) * 100;
        }
        else if ($d100 <= 95)
        {
          $gp += dice(1, 4) * 100;
        }
        else
        {
          $pp += dice(1, 10) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 77)
        {
          $gems += 0;
        }
        else if ($d100 <= 95)
        {
          $gems += dice(1, 3);
        }
        else
        {
          $art += dice(1, 3);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 49)
        {
          $mundane += 0;
        }
        else if ($d100 <= 79)
        {
          $mundane += dice(1, 3);
        }
        else
        {
          ++$minor;
        }
        break; // case 3
      case 4:
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $gp += 0;
        }
        else if ($d100 <= 21)
        {
          $cp += dice(3, 10) * 1000;
        }
        else if ($d100 <= 41)
        {
          $sp += dice(4, 12) * 1000;
        }
        else if ($d100 <= 95)
        {
          $gp += dice(1, 6) * 100;
        }
        else
        {
          $pp += dice(1, 8) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 70)
        {
          $gems += 0;
        }
        else if ($d100 <= 95)
        {
          $gems += dice(1, 4);
        }
        else
        {
          $art += dice(1, 3);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 42)
        {
          $mundane += 0;
        }
        else if ($d100 <= 62)
        {
          $mundane += dice(1, 4);
        }
        else
        {
          ++$minor;
        }
        break; // case 4
      case 5:
        $d100 = dice(1, 100);
        if ($d100 <= 10)
          $gp += 0;
        else if ($d100 <= 19)
          $cp += dice(1, 4) * 10000;
        else if ($d100 <= 38)
          $sp += dice(1, 6) * 1000;
        else if ($d100 <= 95)
          $gp += dice(1, 8) * 100;
        else
          $pp += dice(1, 10) * 10;
        $d100 = dice(1, 100);
        if ($d100 <= 60)
          $gems += 0;
        else if ($d100 <= 95)
          $gems += dice(1, 4);
        else
          $art += dice(1, 4);
        $d100 = dice(1, 100);
        if ($d100 <= 57)
          $mundane += 0;
        else if ($d100 <= 67)
          $mundane += dice(1, 4);
        else
          $minor += dice(1, 3);
        break; // case 5
      case 6:
        $d100 = dice(1, 100);
        if ($d100 <= 10)
        {
          $gp += 0;
        }
        else if ($d100 <= 18)
        {
          $cp += dice(1, 6) * 10000;
        }
        else if ($d100 <= 37)
        {
          $sp += dice(1, 8) * 1000;
        }
        else if ($d100 <= 95)
        {
          $gp += dice(1, 10) * 100;
        }
        else
        {
          $pp += dice(1, 12) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 56)
        {
          $gems += 0;
        }
        else if ($d100 <= 92)
        {
          $gems += dice(1, 4);
        }
        else
        {
          $art += dice(1, 4);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 54)
        {
          $mundane += 0;
        }
        else if ($d100 <= 59)
        {
          $mundane += dice(1, 4);
        }
        else if ($d100 <= 99)
        {
          $minor += dice(1, 3);
        }
        else
        {
          $medium += 1;
        }
        break; // case 6
      case 7:
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $gp += 0;
        }
        else if ($d100 <= 18)
        {
          $cp += dice(1, 10) * 10000;
        }
        else if ($d100 <= 35)
        {
          $sp += dice(1, 12) * 1000;
        }
        else if ($d100 <= 93)
        {
          $gp += dice(2, 6) * 100;
        }
        else
        {
          $pp += dice(3, 4) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 48)
        {
          $gems += 0;
        }
        else if ($d100 <= 88)
        {
          $gems += dice(1, 4);
        }
        else
        {
          $art += dice(1, 4);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 51)
        {
          $mundane += 0;
        }
        else if ($d100 <= 97)
        {
          $minor += dice(1, 3);
        }
        else
        {
          $medium += 1;
        }
        break; // case 7
      case 8:
        $d100 = dice(1, 100);
        if ($d100 <= 10)
        {
          $gp += 0;
        }
        else if ($d100 <= 15)
        {
          $cp += dice(1, 12) * 10000;
        }
        else if ($d100 <= 29)
        {
          $sp += dice(2, 6) * 1000;
        }
        else if ($d100 <= 87)
        {
          $gp += dice(2, 8) * 100;
        }
        else
        {
          $pp += dice(3, 6) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 45)
        {
          $gems += 0;
        }
        else if ($d100 <= 85)
        {
          $gems += dice(1, 6);
        }
        else
        {
          $art += dice(1, 4);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 48)
        {
          $mundane += 0;
        }
        else if ($d100 <= 96)
        {
          $minor += dice(1, 4);
        }
        else
        {
          $medium += 1;
        }
        break; // case 8
      case 9:
        $d100 = dice(1, 100);
        if ($d100 <= 10)
        {
          $gp += 0;
        }
        else if ($d100 <= 15)
        {
          $cp += dice(2, 6) * 10000;
        }
        else if ($d100 <= 29)
        {
          $sp += dice(2, 8) * 1000;
        }
        else if ($d100 <= 85)
        {
          $gp += dice(5, 4) * 100;
        }
        else
        {
          $pp += dice(2, 12) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 40)
        {
          $gems += 0;
        }
        else if ($d100 <= 80)
        {
          $gems += dice(1, 8);
        }
        else
        {
          $art += dice(1, 4);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 43)
        {
          $mundane += 0;
        }
        else if ($d100 <= 91)
        {
          $minor += dice(1, 4);
        }
        else
        {
          $medium += 1;
        }
        break; // case 9
      case 10:
        $d100 = dice(1, 100);
        if ($d100 <= 10)
        {
          $gp += 0;
        }
        else if ($d100 <= 24)
        {
          $sp += dice(2, 10) * 1000;
        }
        else if ($d100 <= 79)
        {
          $gp += dice(6, 4) * 100;
        }
        else
        {
          $pp += dice(5, 6) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 35)
        {
          $gems += 0;
        }
        else if ($d100 <= 79)
        {
          $gems += dice(1, 8);
        }
        else
        {
          $art += dice(1, 6);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 40)
        {
          $mundane += 0;
        }
        else if ($d100 <= 88)
        {
          $minor += dice(1, 4);
        }
        else if ($d100 <= 99)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 10
      case 11:
        $d100 = dice(1, 100);
        if ($d100 <= 8)
        {
          $gp += 0;
        }
        else if ($d100 <= 14)
        {
          $sp += dice(3, 10) * 1000;
        }
        else if ($d100 <= 75)
        {
          $gp += dice(4, 8) * 100;
        }
        else
        {
          $pp += dice(4, 10) * 10;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 24)
        {
          $gems += 0;
        }
        else if ($d100 <= 74)
        {
          $gems += dice(1, 10);
        }
        else
        {
          $art += dice(1, 6);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 31)
        {
          $mundane += 0;
        }
        else if ($d100 <= 84)
        {
          $minor += dice(1, 4);
        }
        else if ($d100 <= 98)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 11
      case 12:
        $d100 = dice(1, 100);
        if ($d100 <= 8)
        {
          $gp += 0;
        }
        else if ($d100 <= 14)
        {
          $sp += dice(3, 12) * 1000;
        }
        else if ($d100 <= 75)
        {
          $gp += dice(1, 4) * 1000;
        }
        else
        {
          $pp += dice(1, 4) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 17)
        {
          $gems += 0;
        }
        else if ($d100 <= 70)
        {
          $gems += dice(1, 10);
        }
        else
        {
          $art += dice(1, 8);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 27)
        {
          $mundane += 0;
        }
        else if ($d100 <= 82)
        {
          $minor += dice(1, 6);
        }
        else if ($d100 <= 97)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 12
      case 13:
        $d100 = dice(1, 100);
        if ($d100 <= 8)
        {
          $gp += 0;
        }
        else if ($d100 <= 75)
        {
          $gp += dice(1, 4) * 1000;
        }
        else
        {
          $pp += dice(1, 10) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $gems += 0;
        }
        else if ($d100 <= 66)
        {
          $gems += dice(1, 12);
        }
        else
        {
          $art += dice(1, 10);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 19)
        {
          $mundane += 0;
        }
        else if ($d100 <= 73)
        {
          $minor += dice(1, 6);
        }
        else if ($d100 <= 95)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 13
      case 14:
        $d100 = dice(1, 100);
        if ($d100 <= 8)
        {
          $gp += 0;
        }
        else if ($d100 <= 75)
        {
          $gp += dice(1, 6) * 1000;
        }
        else
        {
          $pp += dice(1, 12) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $gems += 0;
        }
        else if ($d100 <= 66)
        {
          $gems += dice(2, 8);
        }
        else
        {
          $art += dice(2, 6);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 19)
        {
          $mundane += 0;
        }
        else if ($d100 <= 58)
        {
          $minor += dice(1, 6);
        }
        else if ($d100 <= 92)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 14
      case 15:
        $d100 = dice(1, 100);
        if ($d100 <= 3)
        {
          $gp += 0;
        }
        else if ($d100 <= 74)
        {
          $gp += dice(1, 8) * 1000;
        }
        else
        {
          $pp += dice(3, 4) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 9)
        {
          $gems += 0;
        }
        else if ($d100 <= 65)
        {
          $gems += dice(2, 10);
        }
        else
        {
          $art += dice(2, 8);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 11)
        {
          $mundane += 0;
        }
        else if ($d100 <= 46)
        {
          $minor += dice(1, 10);
        }
        else if ($d100 <= 90)
        {
          $medium += 1;
        }
        else
        {
          $major += 1;
        }
        break; // case 15
      case 16:
        $d100 = dice(1, 100);
        if ($d100 <= 3)
        {
          $gp += 0;
        }
        else if ($d100 <= 74)
        {
          $gp += dice(1, 12) * 1000;
        }
        else
        {
          $pp += dice(3, 4) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 7)
        {
          $gems += 0;
        }
        else if ($d100 <= 64)
        {
          $gems += dice(4, 6);
        }
        else
        {
          $art += dice(2, 10);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 40)
        {
          $mundane += 0;
        }
        else if ($d100 <= 46)
        {
          $minor += dice(1, 10);
        }
        else if ($d100 <= 90)
        {
          $medium += dice(1, 3);
        }
        else
        {
          $major += 1;
        }
        break; // case 16
      case 17:
        $d100 = dice(1, 100);
        if ($d100 <= 3)
        {
          $gp += 0;
        }
        else if ($d100 <= 68)
        {
          $gp += dice(3, 4) * 1000;
        }
        else
        {
          $pp += dice(2, 10) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 4)
        {
          $gems += 0;
        }
        else if ($d100 <= 63)
        {
          $gems += dice(4, 8);
        }
        else
        {
          $art += dice(3, 8);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 33)
        {
          $mundane += 0;
        }
        else if ($d100 <= 83)
        {
          $medium += dice(1, 3);
        }
        else
        {
          $major += 1;
        }
        break; // case 17
      case 18:
        $d100 = dice(1, 100);
        if ($d100 <= 2)
        {
          $gp += 0;
        }
        else if ($d100 <= 65)
        {
          $gp += dice(3, 6) * 1000;
        }
        else
        {
          $pp += dice(5, 4) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 4)
        {
          $gems += 0;
        }
        else if ($d100 <= 54)
        {
          $gems += dice(3, 12);
        }
        else
        {
          $art += dice(3, 10);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 24)
        {
          $mundane += 0;
        }
        else if ($d100 <= 80)
        {
          $medium += dice(1, 4);
        }
        else
        {
          $major += 1;
        }
        break; // case 18
      case 19:
        $d100 = dice(1, 100);
        if ($d100 <= 2)
        {
          $gp += 0;
        }
        else if ($d100 <= 65)
        {
          $gp += dice(3, 8) * 1000;
        }
        else
        {
          $pp += dice(3, 10) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 3)
        {
          $gems += 0;
        }
        else if ($d100 <= 50)
        {
          $gems += dice(6, 6);
        }
        else
        {
          $art += dice(6, 6);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 4)
        {
          $mundane += 0;
        }
        else if ($d100 <= 70)
        {
          $medium += dice(1, 4);
        }
        else
        {
          $major += 1;
        }
        break; // case 19
      case 20:
        $d100 = dice(1, 100);
        if ($d100 <= 2)
        {
          $gp += 0;
        }
        else if ($d100 <= 65)
        {
          $gp += dice(4, 8) * 1000;
        }
        else
        {
          $pp += dice(4, 10) * 100;
        }
        $d100 = dice(1, 100);
        if ($d100 <= 2)
        {
          $gems += 0;
        }
        else if ($d100 <= 38)
        {
          $gems += dice(4, 10);
        }
        else
        {
          $art += dice(7, 6);
        }
        $d100 = dice(1, 100);
        if ($d100 <= 25)
        {
          $mundane += 0;
        }
        else if ($d100 <= 65)
        {
          $medium += dice(1, 4);
        }
        else
        {
          $major += dice(1, 3);
        }
        break; // case 20
    } // end CR switch
  } // end quantity iteration
} // end set for loop.

$treasure = [];
$treasure['CP'] = $cp;
$treasure['SP'] = $sp;
$treasure['GP'] = $gp;
$treasure['PP'] = $pp;
$treasure['Gems'] = $gems;
$treasure['Art'] = $art;
$treasure['Mundane'] = $mundane;
$treasure['Minor'] = $minor;
$treasure['Medium'] = $medium;
$treasure['Major'] = $major;

print(json_encode($treasure));
