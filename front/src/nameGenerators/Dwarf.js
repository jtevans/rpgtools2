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

async function callAPI(amount) {
  let response = await fetch(`http://localhost:8080/tools2/api/dwarf.php?amount=${amount}`);
  return await response.json();
}

async function replaceName({ label, idx }) {
  let newName = await callAPI(1);
  if (label === 'male') { newName = newName[0][0] }
  else if (label === 'female') { newName = newName[1][0] }
  else if (label === 'stronghold') { newName = newName[1][0] }
  document.getElementById(`${label}-${idx}-span`).innerHTML = newName;
}

function NameList({ label, names }) {
  return (
    <div>
      {names.map((name, idx) => (
        <div>
          <span id={`${label}-${idx}-span`}>{name}</span>
          <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceName({ label, idx })} />
        </div>
      ))}
    </div>
  )
}

export default function DwarfName() {
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

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Dwarf</Button>
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
            Dwarf Names<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getNames(20)} />
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Male Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList label="male" names={names[0]} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Female Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList label="female" names={names[1]} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Stronghold Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList label="stronghold" names={names[2]} />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
