import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import GenSpecial1 from '../baubles1/genSpecial1';
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

async function callAPI(treasureInput) {
  let args = '';
  treasureInput.forEach((choice, idx) => {
    if (choice.treasureType != '' && choice.quantity > 0) {
      args += `&type${idx}=${choice.treasureType}&q${idx}=${choice.quantity}`;
    }
  });

  if (args === '') {
    return [];
  }
  args = args.slice(1); // Remove the leading '&'
  let response = await fetch(`http://localhost:8080/tools2/api/treasure1.php?${args}`);
  return await response.json();
}

async function replaceTreasure({ treasureInput, source, key }) {
  let newTreasure = await callAPI(treasureInput);

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

function TreasureList({ treasureInput, treasure }) {
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
          addButton = <GenSpecial1 API={'gems1.php'} title={'Gems'} amount={ treasure[key] } />
        }
        if (key === 'Jewelry' && treasure[key] > 0) {
          source = 'treasure1-Jewelry';
          addButton = <GenSpecial1 API={'jewelry.php'} title={'Jewelry'} amount={treasure[key]} />
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
          <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTreasure({ treasureInput, source, key })} />
          <div id={`addButton-${key}`}>{addButton}{addForm}</div>
        </div>
      })}
    </div>
  );
}

export default function GenTreasure1(props) {
  const { treasureInput } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getTreasure(treasureInput);
  }
  const handleClose = () => {
    setOpen(false);
    setTreasure(null);
  };

  const [treasure, setTreasure] = React.useState(null);

  const getTreasure = async (treasureInput) => {
    const treasureData = await callAPI(treasureInput);
    setTreasure(treasureData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Treasure</Button>
      {open && <Modal
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
            Treasure<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getTreasure(treasureInput)} />
          </Typography>
          <Typography>
            <TreasureList treasureInput={treasureInput} treasure={treasure} />
            {treasure['Any'] + treasure['WeaponOrArmor'] + treasure['Potion'] + treasure['Scroll'] + treasure['AnyExceptWeapon'] + + treasure['AllExceptPotionScroll'] + + treasure['MiscMagic'] > 0 ? <div><GenMagicItems1 source="treasure1" /></div> : <div></div>}
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
