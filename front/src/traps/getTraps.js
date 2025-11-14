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

export default function Trap(props) {
  let { type, label } = props;

  const validTypes = ['harmless', 'moderate', 'deadly', 'tricks'];
  if (!validTypes.includes(type)) {
    type = 'harmless';
  }

  const handleOpen = () => {
    getTraps();
  }
  const handleClose = () => {
    setTraps(null);
  };

  const [traps, setTraps] = React.useState(null);

  const getTraps = async () => {
    const trapData = await callAPI(5);
    setTraps(trapData);
    setOpen(true);
  };

  const updateTrap = async (indexToUpdate, newValue) => {
    setTraps(
      traps.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(amount) {
    const response = await fetch(`http://localhost:8080/tools2/api/traps.php?amount=${amount}&type=${type}`);
    return await response.json();
  }

  async function replaceTrap({ idx }) {
    const newTrap = await callAPI(1);
    updateTrap(idx, newTrap[0]);
  }

  function TrapList() {
    return (
      <div>
        {traps.map((trap, idx) => (
          <div style={{ paddingBottom: "10px" }}>{trap}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTrap({ idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{ label }</Button>
      {traps && <Modal
        open={traps != null}
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
            { label }<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getTraps()} />
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            <TrapList />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
