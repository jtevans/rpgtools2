import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { Grid } from '@mui/material';

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

export default function AllNames() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getNames(20);
  }
  const handleClose = () => {
    setOpen(false);
    setNames(null);
  };

  const [names, setNames] = React.useState(null);

  const getNames = async (amount) => {
    const nameData = await callAPI(amount);
    setNames(nameData);
    setOpen(true);
  };

  const updateName = async (indexToUpdate, newValue) => {
    setNames(
      names.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(amount) {
    let response = await fetch(`http://localhost:8080/tools2/api/twopartnames.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceName({ column, idx }) {
    let newName = await callAPI(1);
    updateName(idx, newName[0]);
  }

  function NameList({ column, names }) {
    return (
      <div>
        {names.map((name, idx) => (
          <div><span id={`span-${column}-${idx}`}>{name}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceName({ column, idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>All Names</Button>
      {names && <Modal
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
            All Names<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getNames(20)} />
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={1} names={names[0]} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={2} names={names[1]} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={3} names={names[2]} />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
