import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GenSpecial1 from '../baubles1/genSpecial1';
import GenMagicItems1 from '../magicItems1/genMagicItems1';
import { useMessage } from '../messageContext';
import { APIURL } from '../config';

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


export default function GenTreasure1(props) {
  const { treasureInput } = props;
  const handleOpen = () => {
    getTreasure();
  }
  const handleClose = () => {
    setTreasure(null);
  };

  const gridRef = React.useRef(null);
  const { openMessage } = useMessage();
  const handleCopy = async () => {
    let contentToCopy = gridRef.current.innerText || gridRef.current.textContent;
    contentToCopy = contentToCopy.replace('GENERATE GEMS', '');
    contentToCopy = contentToCopy.replace('GENERATE JEWELRY', '');
    contentToCopy = contentToCopy.replace('GENERATE MAGIC ITEMS', '');
    contentToCopy = contentToCopy.replace(/(\r\n|\n|\r){2}/gm, "\n");
    try {
      await navigator.clipboard.writeText(contentToCopy);
      openMessage('Content copied to clipboard.');
    } catch (err) {
      openMessage('Failed to copy content to clipboard.', 'error');
    }
  }

  const [treasure, setTreasure] = React.useState(null);

  const [magicItemsData, setMagicItemData] = React.useState({
    Any: 0,
    WeaponOrArmor: 0,
    Potion: 0,
    Scroll: 0,
    AnyExceptWeapon: 0,
    AllExceptPotionScroll: 0,
    MiscMagic: 0,
    SpecificType: '',
    Specific: 0,
  });

  async function callAPI() {
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
    const response = await fetch(`${APIURL}/api/treasure1.php?${args}`);
    return await response.json();
  }

  const handleTreasureChange = (name, value) => {
    setTreasure((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleMagicItemChange = (name, value) => {
    setMagicItemData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function replaceTreasure({ key }) {
    let treasureData = await callAPI();
    handleTreasureChange(key, treasureData[key]);
    handleMagicItemChange(key, treasureData[key]);
  }

  function TreasureList() {
    let totalTreasure = 0;
    Object.keys(treasure).forEach(function (key) {
      totalTreasure += treasure[key];
    });

    return (
      <div>
        {totalTreasure === 0 ? 'No Treasure' : <div>{Object.keys(treasure).map(function (key) {
          let addButton = <span></span>;
          let addForm = <input type="hidden" id={`treasure1-${key}`} value={treasure[key]} />;
          let display = key;
          if (key === 'Gems' && treasure[key] > 0) {
            addButton = <GenSpecial1 API={'gems1.php'} title={'Gems'} amount={treasure[key]} />
          }
          if (key === 'Jewelry' && treasure[key] > 0) {
            addButton = <GenSpecial1 API={'jewelry.php'} title={'Jewelry'} amount={treasure[key]} />
          }
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

          return <div>
            {display}: {treasure[key]}
            <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTreasure({ key })} />
            <div id={`addButton-${key}`}>{addButton}{addForm}</div>
          </div>
        })
        }
          {treasure['Any'] + treasure['WeaponOrArmor'] + treasure['Potion'] + treasure['Scroll'] + treasure['AnyExceptWeapon'] + + treasure['AllExceptPotionScroll'] + + treasure['MiscMagic'] > 0 ? <div><GenMagicItems1 magicItemsInput={magicItemsData} /></div> : <div></div>}
        </div>
        }
      </div>
    );
  }

  const getTreasure = async () => {
    const treasureData = await callAPI();
    setTreasure(treasureData);
    setMagicItemData({
      Any: treasureData['Any'],
      WeaponOrArmor: treasureData['WeaponOrArmor'],
      Potion: treasureData['Potion'],
      Scroll: treasureData['Scroll'],
      AnyExceptWeapon: treasureData['AnyExceptWeapon'],
      AllExceptPotionScroll: treasureData['AllExceptPotionScroll'],
      MiscMagic: treasureData['MiscMagic'],
      SpecificType: '',
      Specific: 0,
    });
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Treasure</Button>
      {treasure && <Modal
        open={treasure != null}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <Box sx={style} ref={gridRef}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Treasure<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getTreasure()} />
          </Typography>
          <Typography>
            <TreasureList />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
