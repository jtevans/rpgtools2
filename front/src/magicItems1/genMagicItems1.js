import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IntelligentWeapon from './genIntelligentWeapon';
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

export default function GenMagicItems1(props) {
  const { magicItemsInput } = props;
  const handleOpen = () => {
    getItems();
  }
  const handleClose = () => {
    setItems(null);
  };

  const gridRef = React.useRef(null);
  const { openMessage } = useMessage();
  const handleCopy = async () => {
    let contentToCopy = gridRef.current.innerText || gridRef.current.textContent;
    contentToCopy = contentToCopy.replace(/(\r\n|\n|\r){2}/gm, "\n");
    try {
      await navigator.clipboard.writeText(contentToCopy);
      openMessage('Content copied to clipboard.');
    } catch (err) {
      openMessage('Failed to copy content to clipboard.', 'error');
    }
  }

  const [items, setItems] = React.useState(null);

  const getItems = async () => {
    const itemData = await callAPI();
    setItems(itemData);
  };

  const updateItem = async (indexToUpdate, newValue) => {
    setItems(
      items.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(inputData = null, amount = null) {
    let args = '';

    if (amount === null) {
      const Any = Math.max(0, Math.min(50, parseInt(magicItemsInput.Any) || 0));
      const WeaponOrArmor = Math.max(0, Math.min(50, parseInt(magicItemsInput.WeaponOrArmor) || 0));
      const Potion = Math.max(0, Math.min(50, parseInt(magicItemsInput.Potion) || 0));
      const Scroll = Math.max(0, Math.min(50, parseInt(magicItemsInput.Scroll) || 0));
      const AnyExceptWeapon = Math.max(0, Math.min(50, parseInt(magicItemsInput.AnyExceptWeapon) || 0));
      const AllExceptPotionScroll = Math.max(0, Math.min(50, parseInt(magicItemsInput.AllExceptPotionScroll) || 0));
      const MiscMagic = Math.max(0, Math.min(50, parseInt(magicItemsInput.MiscMagic) || 0));
      const Specific = Math.max(0, Math.min(50, parseInt(magicItemsInput.Specific) || 0));
      args = `Any=${Any}&WeaponOrArmor=${WeaponOrArmor}&Potion=${Potion}&Scroll=${Scroll}&AnyExceptWeapon=${AnyExceptWeapon}&AllExceptPotionScroll=${AllExceptPotionScroll}&MiscMagic=${MiscMagic}&specificType=${magicItemsInput.SpecificType}&Specific=${Specific}`;
    }
    else {
      args = `${inputData}=${amount}`;

      if (inputData === 'Specific') {
        args += `&specificType=${magicItemsInput.SpecificType}`;
      }
    }

    let response = await fetch(`${APIURL}/api/1st_mi.php?${args}`);
    return await response.json();
  }

  async function replaceItem({ idx, item }) {
    let newItem = await callAPI(item.type, 1);
    updateItem(idx, newItem[0]);
  }

  function ItemList() {
    return (
      <div>
        {items.map(function (item, idx) {
          let volumePage = '';
          let intelligentButton = '';
          if (item.page !== 0) {
            volumePage = ` (Volume: ${item.volume} / Page: ${item.page})`;
          }
          if (item.intelligent) {
            intelligentButton = <IntelligentWeapon label={item.text} />
          }
          return <div>
            <Typography>
              {item.text}{volumePage}{intelligentButton}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceItem({ idx, item })} />              
            </Typography>
          </div>
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Magic Items</Button>
      {items && <Modal
        open={items != null}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        sx={{ maxHeight: "80%" }}
      >
        <Box sx={style} ref={gridRef}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Magic Items<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getItems()} />
          </Typography>
          <Typography>
            <ItemList />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
