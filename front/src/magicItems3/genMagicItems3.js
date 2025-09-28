import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';

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

export default function GenMagicItems3(props) {
  const { sourcePrefix } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getItems(sourcePrefix);
  }
  const handleClose = () => {
    setOpen(false);
    setMinor(null);
    setMedium(null);
    setMajor(null);
  };

  const [minor, setMinor] = React.useState(null);
  const [medium, setMedium] = React.useState(null);
  const [major, setMajor] = React.useState(null);

  const getItems = async (sourcePrefix) => {
    const itemData = await callAPI(sourcePrefix, 'all');
    setMinor(itemData['Minor']);
    setMedium(itemData['Medium']);
    setMajor(itemData['Major']);
    setOpen(true);
  };

  const updateItem = async (indexToUpdate, newValue, type) => {
    if (type === 'Minor') {
      setMinor(minor.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
    if (type === 'Medium') {
      setMedium(medium.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
    if (type === 'Major') {
      setMajor(major.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
  };

  async function callAPI(sourcePrefix, type, amount = 0) {
    let args = '';

    if (type === 'all') {
      const minor = Math.max(0, Math.min(200, parseInt(document.getElementById(sourcePrefix + '-Minor').value)));
      const medium = Math.max(0, Math.min(200, parseInt(document.getElementById(sourcePrefix + '-Medium').value)));
      const major = Math.max(0, Math.min(200, parseInt(document.getElementById(sourcePrefix + '-Major').value)));

      args = `minor=${minor}&medium=${medium}&major=${major}`;
    }
    else {
      const amountInput = document.getElementById(sourcePrefix + type);
      let newAmount = 0;
      if (amountInput) {
        newAmount = parseInt(amountInput.value);
      }

      if (amount === 0) {
        amount = newAmount;
      }
      const argsType = type.toLowerCase()
      args = `${argsType}=${amount}`;
    }

    let response = await fetch(`http://localhost:8080/tools2/api/mi.php?${args}`);
    return await response.json();
  }

  async function replaceItem({ sourcePrefix, idx, type }) {
    let newItem = await callAPI(sourcePrefix, type, 1);
    updateItem(idx, newItem[type][0], type);
  }

  function ItemList({ sourcePrefix, items, type }) {
    return (
      <div>
        {items.map((item, idx) => (
          <div><span id={`span-${sourcePrefix}-${type}-${idx}`}>{item}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceItem({ sourcePrefix, idx, type })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Magic Items</Button>
      {(minor || medium || major) && <Modal
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
            Magic Items<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getItems(sourcePrefix)} />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Minor Magic Items
          </Typography>
          <Typography>
            <ItemList sourcePrefix={sourcePrefix} items={minor} type="Minor" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Medium Magic Items
          </Typography>
          <Typography>
            <ItemList sourcePrefix={sourcePrefix} items={medium} type="Medium" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Major Magic Items
          </Typography>
          <Typography>
            <ItemList sourcePrefix={sourcePrefix} items={major} type="Major" />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
