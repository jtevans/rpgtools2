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

export default function GenJewelry1(props) {
  const { source } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getJewelry(source);
  }
  const handleClose = () => {
    setOpen(false);
    setJewlery(null);
  };

  const [jewlery, setJewlery] = React.useState(null);

  const getJewelry = async (source) => {
    const jewleryData = await callAPI(source);
    setJewlery(jewleryData);
    setOpen(true);
  };

  const updateJewelry = async (indexToUpdate, newValue) => {
    setJewlery(
      jewlery.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(source, amount = 0) {
    const elem = document.getElementById(source);
    if (elem.value) {
      const newAmount = parseInt(elem.value);

      if (amount === 0) {
        amount = newAmount;
      }
    }

    let response = await fetch(`http://localhost:8080/tools2/api/jewelry.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceJewelry({ source, idx }) {
    let newJewelry = await callAPI(source, 1);
    updateJewelry(idx, newJewelry[0]);
  }

  function JewelryList({ source, jewlery }) {
    return (
      <div>
        {jewlery.map((jewleryText, idx) => (
          <div><span>{jewleryText}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceJewelry({ source, idx })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Jewlery</Button>
      {jewlery && <Modal
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
            Jewlery<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getJewelry(source)} />
          </Typography>
          <Typography>
            <JewelryList source={source} jewlery={jewlery} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
