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

export default function GenSpecial3({ title, API, amount }) {
  amount = Math.max(1, Math.min(2000, parseInt(amount || 0)));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getSpecials(API, amount);
  }
  const handleClose = () => {
    setOpen(false);
    setSpecials(null);
  };

  const [specials, setSpecials] = React.useState(null);

  const getSpecials = async (API, amount) => {
    const data = await callAPI(API, amount);
    setSpecials(data);
    setOpen(true);
  };

  const updateSpecial = async (indexToUpdate, newValue) => {
    setSpecials(
      specials.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(API, amount) {
    let response = await fetch(`http://localhost:8080/tools2/api/${API}?amount=${amount}`);
    return await response.json();
  }

  async function replaceSpecial({ API, idx }) {
    let data = await callAPI(API, 1);
    updateSpecial(idx, data[0]);
  }

  function SpecialsList({ API, specials }) {
    return (
      <div>
        {specials.map((special, idx) => (
          <div><span id={`span-${idx}`}>{special}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceSpecial({ API, idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate {title}</Button>
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
            {title}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getSpecials(API, amount)} />
          </Typography>
          <Typography>
            <SpecialsList API={API} specials={specials} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
