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

export default function Dressing(props) {
  let { type, label } = props;

  const validTypes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  if (!validTypes.includes(type)) {
    type = '1';
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getDressings(20, type);
  }
  const handleClose = () => {
    setOpen(false);
    setDressings(null);
  };

  const [dressings, setDressings] = React.useState(null);

  const getDressings = async (amount, type) => {
    const dressingData = await callAPI(amount, type);
    setDressings(dressingData);
    setOpen(true);
  };

  const updateDressing = async (indexToUpdate, newValue) => {
    setDressings(
      dressings.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(amount, type) {
    let response = await fetch(`http://localhost:8080/tools2/api/dressing.php?amount=${amount}&type=${type}`);
    return await response.json();
  }

  async function replaceDressing({ idx, type }) {
    let newDressing = await callAPI(1, type);
    updateDressing(idx, newDressing[0]);
  }

  function DressingList({ dressings, type }) {
    return (
      <div>
        {dressings.map((dressing, idx) => (
          <div><span id={`span-${idx}`}>{dressing}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceDressing({ idx, type })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{ label }</Button>
      {dressings && <Modal
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
            { label }<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getDressings(20, type)} />
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            <DressingList dressings={dressings} type={type} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
