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
  const { minorAmount, mediumAmount, majorAmount } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getItems(minorAmount, mediumAmount, majorAmount);
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

  const getItems = async (minorAmount, mediumAmount, majorAmount) => {
    const itemData = await callAPI(minorAmount, mediumAmount, majorAmount);
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

  async function callAPI(minorAmount, mediumAmount, majorAmount) {
    const args = `minor=${minorAmount}&medium=${mediumAmount}&major=${majorAmount}`;
    let response = await fetch(`http://localhost:8080/tools2/api/mi.php?${args}`);
    return await response.json();
  }

  async function replaceItem({ idx, type }) {
    let minorAmount = 0;
    let mediumAmount = 0;
    let majorAmount = 0;

    if (type === 'Minor')
    {
      minorAmount = 1;
    }
    if (type === 'Medium') {
      mediumAmount = 1;
    }
    if (type === 'Major') {
      majorAmount = 1;
    }
    let newItem = await callAPI(minorAmount, mediumAmount, majorAmount);
    updateItem(idx, newItem[type][0], type);
  }

  function ItemList({ items, type }) {
    return (
      <div>
        {items.map((item, idx) => (
          <div><span id={`span-${type}-${idx}`}>{item}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceItem({ idx, type })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Magic Items</Button>
      {open && <Modal
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
            Magic Items<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getItems(minorAmount, mediumAmount, majorAmount)} />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Minor Magic Items
          </Typography>
          <Typography>
            <ItemList items={minor} type="Minor" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Medium Magic Items
          </Typography>
          <Typography>
            <ItemList items={medium} type="Medium" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Major Magic Items
          </Typography>
          <Typography>
            <ItemList items={major} type="Major" />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
