import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import IntelligentWeapon from './genIntelligentWeapon';

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
  const { source } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getItems(source);
  }
  const handleClose = () => {
    setOpen(false);
    setItems(null);
  };

  const [items, setItems] = React.useState(null);

  const getItems = async (source) => {
    const itemData = await callAPI(source);
    setItems(itemData);
    setOpen(true);
  };

  const updateItem = async (indexToUpdate, newValue) => {
    setItems(
      items.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(source, type = 'all', amount = 0) {
    let args = '';

    if (type === 'all') {
      const Any = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-Any`).value || 0)));
      const WeaponOrArmor = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-WeaponOrArmor`).value || 0)));
      const Potion = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-Potion`).value || 0)));
      const Scroll = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-Scroll`).value || 0)));
      const AnyExceptWeapon = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-AnyExceptWeapon`).value || 0)));
      const AllExceptPotionScroll = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-AllExceptPotionScroll`).value || 0)));
      const MiscMagic = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-MiscMagic`).value || 0)));
      let SpecificType = '';
      let Specific = 0;
      if (source === 'magicitem1') {
        SpecificType = document.getElementById(`${source}-specificType`).value;
        Specific = Math.max(0, Math.min(50, parseInt(document.getElementById(`${source}-Specific`).value || 0)));
      }

      args = `Any=${Any}&WeaponOrArmor=${WeaponOrArmor}&Potion=${Potion}&Scroll=${Scroll}&AnyExceptWeapon=${AnyExceptWeapon}&AllExceptPotionScroll=${AllExceptPotionScroll}&MiscMagic=${MiscMagic}&specificType=${SpecificType}&Specific=${Specific}`;
    }
    else {
      const amountInput = document.getElementById(`${source}-${type}`);
      let newAmount = 0;
      if (amountInput) {
        newAmount = parseInt(amountInput.value);
      }

      if (amount === 0) {
        amount = newAmount;
      }
      args = `${type}=${amount}`;

      if (type === 'Specific') {
        const SpecificType = document.getElementById(`${source}-specificType`).value;
        args += `&specificType=${SpecificType}`;
      }
    }

    let response = await fetch(`http://localhost:8080/tools2/api/1st_mi.php?${args}`);
    return await response.json();
  }

  async function replaceItem({ source, idx, item }) {
    let newItem = await callAPI(source, item.type, 1);
    updateItem(idx, newItem[0]);
  }

  function ItemList({ source, items }) {
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
          const contents = <Typography>{item.text}{volumePage}{intelligentButton}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceItem({ source, idx, item })} /></Typography>;
          return <div><span>{contents}</span></div>
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Magic Items</Button>
      {items && <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        sx={{ maxHeight: "80%" }}
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            Magic Items<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getItems(source)} />
          </Typography>
          <Typography>
            <ItemList items={items} source={source} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
