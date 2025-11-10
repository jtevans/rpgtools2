<?php
require("utils.php");

function bag_content()
{
  switch(dice(1, 100))
  {
    case 1  :return("Some berries");
    case 2  :return("Some fruit");
    case 3  :return("Bowl and spoon");
    case 4  :return("Bowl and spoon");
    case 5  :return("Bowl and spoon");
    case 6  :return("Bowl and spoon");
    case 7  :return("Bowl and spoon");
    case 8  :return("Bowl and spoon");
    case 9  :return(dice(1, 6) . " candles");
    case 10 :return(dice(1, 6) . " candles");
    case 11 :return("Hand-held chopper");
    case 12 :return("Hand-held chopper");
    case 13 :return("Hand-held chopper");
    case 14 :return("Hand-held chopper");
    case 15 :return(dice(1, 6) . " sticks of charcoal");
    case 16 :return("Quills and ink");
    case 17 :return("Chunk of cheese");
    case 18 :return("Chunk of cheese");
    case 19 :return("Chunk of wood, whittled or carved");
    case 20 :return("Chunk of wood, whittled or carved");
    case 21 :return("Cup");
    case 22 :return("Tankard");
    case 23 :return("Tankard");
    case 24 :return("Cloak");
    case 25 :return("Cloak");
    case 26 :return("Cloak");
    case 27 :return("Cloak");
    case 28 :return("Comb");
    case 29 :return("Brush");
    case 30 :return("Cooking pot");
    case 31 :return("Cooking pot");
    case 32 :return("Container of grease");
    case 33 :return("Container of grease paint");
    case 34 :return("Drinking horn");
    case 35 :return("Drinking horn");
    case 36 :return("Bag of flour (5 pounds)");
    case 37 :return("Bag of meal (5 pounds)");
    case 38 :return("Piece of fur");
    case 39 :return("Piece of hide");
    case 40 :return("Hairpins");
    case 41 :return("Hairpins");
    case 42 :return("Knife");
    case 43 :return("Knife");
    case 44 :return("Knife");
    case 45 :return("Knife");
    case 46 :return("Knife");
    case 47 :return("Knife");
    case 48 :return("Dice");
    case 49 :return("Dice");
    case 50 :return("Dice");
    case 51 :return("Dice");
    case 52 :return("Dice");
    case 53 :return("Dice");
    case 54 :return("Haunch of meat");
    case 55 :return("Haunch of meat");
    case 56 :return("Haunch of meat");
    case 57 :return("Haunch of meat");
    case 58 :return("Incense");
    case 59 :return("Dried animal dung");
    case 60 :return(number(100, 200) . " feet of strong rope");
    case 61 :return(number(100, 200) . " feet of strong rope");
    case 62 :return(number(100, 200) . " feet of strong rope");
    case 63 :return(number(100, 200) . " feet of strong rope");
    case 64 :return(number(100, 200) . " feet of strong rope");
    case 65 :return(number(100, 200) . " feet of strong rope");
    case 66 :return("Bag of salt (1 pound)");
    case 67 :return("Bag of salt (1 pound)");
    case 68 :return("Shoes");
    case 69 :return("Shoes");
    case 70 :return("Sandals");
    case 71 :return("Sandals");
    case 72 :return("Boots");
    case 73 :return("Boots");
    case 74 :return("Sewing needle");
    case 75 :return("Sewing needle");
    case 76 :return("Sewing needle");
    case 77 :return("String or thread");
    case 78 :return("String or thread");
    case 79 :return("String or thread");
    case 80 :return("String or thread");
    case 81 :return("String or thread");
    case 82 :return("Beads");
    case 83 :return("Small stones");
    case 84 :return("Teeth");
    case 85 :return("Tusks");
    case 86 :return("Bones");
    case 87 :return("Tinderbox");
    case 88 :return("Tinderbox");
    case 89 :return("Tinderbox");
    case 90 :return("Tinderbox");
    case 91 :return("Tinderbox");
    case 92 :return("Tinderbox");
    case 93 :return("Tinderbox");
    case 94 :return("Lump of wax");
    case 95 :return("Lump of wax");
    case 96 :return("Lump of wax");
    case 97 :return("Whetstone");
    case 98 :return("Whetstone");
    case 99 :return("Whetstone");
    case 100:return("Whetstone");
  }
}

$type = intval(get_var("type"));
$amount = intval(get_var("amount", 0));
$contents = [];

if ($amount > 0)
{
  for ($x = 1; $x <= $amount; ++$x)
  {
    $contents[] = bag_content();
  }
  print(json_encode($contents));
  exit();
}

if ($type < 4)
{
  $type = 1;
}
else
{
  $type = $type - 3;
}

if ($type == 1)
{
  $q = dice(3, 4);
}
else if ($type == 2)
{
  $q = dice(1, 4) + 4;
}
else if ($type == 3)
{
  $q = dice(1, 4) + 6;
}
else
{
  $q =dice(2, 4);
}

$contents = [];
for ($x = 1; $x <= $q; ++$x)
{
  $contents[] = bag_content();
}

print(json_encode($contents));