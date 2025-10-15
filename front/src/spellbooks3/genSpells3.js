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

export default function GenGems1(props) {
  const { source } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getGems(source);
  }
  const handleClose = () => {
    setOpen(false);
    setGems(null);
  };

  const [gems, setGems] = React.useState(null);

  const getGems = async (source) => {
    const gemsData = await callAPI(source);
    setGems(gemsData);
    setOpen(true);
  };

  const updateGem = async (indexToUpdate, newValue) => {
    setGems(
      gems.map((item, index) =>
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

    let response = await fetch(`http://localhost:8080/tools2/api/gems1.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceGem({ source, idx }) {
    let newGem = await callAPI(source, 1);
    updateGem(idx, newGem[0]);
  }

  function GemsList({ source, gems }) {
    return (
      <div>
        {gems.map((gem, idx) => (
          <div><span>{gem}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceGem({ source, idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Spellbook</Button>
      {gems && <Modal
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
            Gems<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getGems(source)} />
          </Typography>
          <Typography>
            <GemsList source={source} gems={gems} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
