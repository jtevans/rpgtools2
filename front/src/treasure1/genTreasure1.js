import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import GenGems1 from '../baubles1/genGems1';
import GenJewelry1 from '../baubles1/genJewelry1';
import GenMagicItems1 from '../magicItems1/genMagicItems1';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '80%',
};

async function callAPI() {
  const treasure1_0 = document.getElementById('treasure1_0').value;
  const treasure1_1 = document.getElementById('treasure1_1').value;
  const treasure1_2 = document.getElementById('treasure1_2').value;
  const treasure1_3 = document.getElementById('treasure1_3').value;
  const treasure1_4 = document.getElementById('treasure1_4').value;
  const treasure1_5 = document.getElementById('treasure1_5').value;
  const treasure1_6 = document.getElementById('treasure1_6').value;
  const treasure1_7 = document.getElementById('treasure1_7').value;
  const treasure1_8 = document.getElementById('treasure1_8').value;
  const treasure1_9 = document.getElementById('treasure1_9').value;

  const treasure1_q0 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q0').value)));
  const treasure1_q1 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q1').value)));
  const treasure1_q2 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q2').value)));
  const treasure1_q3 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q3').value)));
  const treasure1_q4 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q4').value)));
  const treasure1_q5 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q5').value)));
  const treasure1_q6 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q6').value)));
  const treasure1_q7 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q7').value)));
  const treasure1_q8 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q8').value)));
  const treasure1_q9 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure1_q9').value)));

  let args = '';
  if (treasure1_0 !== '' && treasure1_q0 !== 0) {
    args += `&type0=${treasure1_0}&q0=${treasure1_q0}`
  }
  if (treasure1_1 !== '' && treasure1_q1 !== 0) {
    args += `&type1=${treasure1_1}&q1=${treasure1_q1}`
  }
  if (treasure1_2 !== '' && treasure1_q2 !== 0) {
    args += `&type2=${treasure1_2}&q2=${treasure1_q2}`
  }
  if (treasure1_3 !== '' && treasure1_q3 !== 0) {
    args += `&type3=${treasure1_3}&q3=${treasure1_q3}`
  }
  if (treasure1_4 !== '' && treasure1_q4 !== 0) {
    args += `&type4=${treasure1_4}&q4=${treasure1_q4}`
  }
  if (treasure1_5 !== '' && treasure1_q5 !== 0) {
    args += `&type5=${treasure1_5}&q5=${treasure1_q5}`
  }
  if (treasure1_6 !== '' && treasure1_q6 !== 0) {
    args += `&type6=${treasure1_6}&q6=${treasure1_q6}`
  }
  if (treasure1_7 !== '' && treasure1_q7 !== 0) {
    args += `&type7=${treasure1_7}&q7=${treasure1_q7}`
  }
  if (treasure1_8 !== '' && treasure1_q8 !== 0) {
    args += `&type8=${treasure1_8}&q8=${treasure1_q8}`
  }
  if (treasure1_9 !== '' && treasure1_q9 !== 0) {
    args += `&type9=${treasure1_9}&q9=${treasure1_q9}`
  }

  if (args === '') {
    return '[]';
  }
  args = args.slice(1);
  let response = await fetch(`http://localhost:8080/tools2/api/treasure1.php?${args}`);
  return await response.json();
}

async function replaceTreasure({ source, key }) {
  let newTreasure = await callAPI();

  let display = key;
  if (key === 'Any') {
    display = 'Any Magic Item';
  }
  if (key === 'WeaponOrArmor') {
    display = 'Weapon or Armor';
  }
  if (key === 'Potion') {
    display = 'Potions';
  }
  if (key === 'Scroll') {
    display = 'Scrolls';
  }
  if (key === 'AnyExceptWeapon') {
    display = 'Any Magic Item, Except Weapons';
  }
  if (key === 'AllExceptPotionScroll') {
    display = 'All Except Potions and Scrolls';
  }
  if (key === 'MiscMagic') {
    display = 'Misc. Magic Items';
  }

  document.getElementById(`span-treasure1-${key}`).innerHTML = `${display}: ${newTreasure[key]}`;
  if (source !== '') {
    document.getElementById(`${source}`).value = newTreasure[key];
  }
}

function TreasureList({ treasure }) {
  let totalTreasure = 0;
  Object.keys(treasure).forEach(function (key) {
    totalTreasure += treasure[key];    
  });

  return (
    <div>
      {totalTreasure === 0 ? 'No Treasure' : Object.keys(treasure).map(function (key) {
        let addButton = <span></span>;
        let addForm = <input type="hidden" id={`treasure1-${key}`} value={treasure[key]} />;
        let source = '';
        let display = key;
        if (key === 'Gems' && treasure[key] > 0) {
          source = 'treasure1-Gems';
          addButton = <GenGems1 source={`${source}`} />
        }
        if (key === 'Jewelry' && treasure[key] > 0) {
          source = 'treasure1-Jewelry';
          addButton = <GenJewelry1 source={`${source}`} />
        }
        if (key === 'Any') {
          source = 'treasure1-Any';
          display = 'Any Magic Item';
        }
        if (key === 'WeaponOrArmor') {
          source = 'treasure1-WeaponOrArmor';
          display = 'Weapon or Armor';
        }
        if (key === 'Potion') {
          source = 'treasure1-Potion';
          display = 'Potions';
        }
        if (key === 'Scroll') {
          source = 'treasure1-Scroll';
          display = 'Scrolls';
        }
        if (key === 'AnyExceptWeapon') {
          source = 'treasure1-AnyExceptWeapon';
          display = 'Any Magic Item, Except Weapons';
        }
        if (key === 'AllExceptPotionScroll') {
          source = 'treasure1-AllExceptPotionScroll';
          display = 'All Except Potions and Scrolls';
        }
        if (key === 'MiscMagic') {
          source = 'treasure1-MiscMagic';
          display = 'Misc. Magic Items';
        }

        return <div>
          <span id={`span-treasure1-${key}`}>{display}: {treasure[key]}</span>
          <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTreasure({ source, key })} />
          <div id={`addButton-${key}`}>{addButton}{addForm}</div>
        </div>
      })}
    </div>
  );
}

export default function GenTreasure1() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getTreasure();
  }
  const handleClose = () => {
    setOpen(false);
    setTreasure(null);
  };

  const [treasure, setTreasure] = React.useState(null);

  const getTreasure = async () => {
    const treasureData = await callAPI();
    setTreasure(treasureData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Treasure</Button>
      {treasure && <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            Treasure<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getTreasure()} />
          </Typography>
          <Typography>
            <TreasureList treasure={treasure} />
            {treasure['Any'] + treasure['WeaponOrArmor'] + treasure['Potion'] + treasure['Scroll'] + treasure['AnyExceptWeapon'] + + treasure['AllExceptPotionScroll'] + + treasure['MiscMagic'] > 0 ? <div><GenMagicItems1 source="treasure1" /></div> : <div></div>}
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
