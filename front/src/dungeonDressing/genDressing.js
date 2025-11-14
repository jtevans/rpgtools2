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

export default function GenDressing(props) {
  let { type, label } = props;

  const validTypes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  if (!validTypes.includes(type)) {
    type = '1';
  }

  const handleOpen = () => {
    getDressings();
  }
  const handleClose = () => {
    setDressings(null);
  };

  const [dressings, setDressings] = React.useState(null);

  const getDressings = async () => {
    const dressingData = await callAPI(20);
    setDressings(dressingData);
  };

  const updateDressing = async (indexToUpdate, newValue) => {
    setDressings(
      dressings.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(amount) {
    let response = await fetch(`http://localhost:8080/tools2/api/dressing.php?amount=${amount}&type=${type}`);
    return await response.json();
  }

  async function replaceDressing({ idx }) {
    let newDressing = await callAPI(1);
    updateDressing(idx, newDressing[0]);
  }

  function DressingList() {
    return (
      <div>
        {dressings.map((dressing, idx) => (
          <div>{dressing}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceDressing({ idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{ label }</Button>
      {dressings && <Modal
        open={dressings != null}
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
            { label }<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getDressings()} />
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            <DressingList />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
