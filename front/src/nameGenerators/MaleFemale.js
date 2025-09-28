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

async function callAPI(amount, type) {
  let response = await fetch(`http://localhost:8080/tools2/api/mfnames.php?amount=${amount}&type=${type}`);
  return await response.json();
}

async function replaceName({ label, idx, type }) {
  let newName = await callAPI(1, type);
  if (label === 'male') { newName = newName[0][0] }
  else if (label === 'female') { newName = newName[1][0] }
  document.getElementById(`${label}-${idx}-span`).innerHTML = newName;
}

function NameList({ label, names, type }) {
  return (
    <div>
      {names.map((name, idx) => (
        <div id={`${label}-${idx}-div`}><span id={`${label}-${idx}-span`}>{name}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceName({ label, idx, type })} /></div>
      ))}
    </div>
  );
}

export default function MFName(props) {
  let { type } = props;

  const validTypes = ["arabic", "drow", "german", "viking", "cornish"];
  if (!validTypes.includes(type)) {
    type = 'drow';
  }

  const ucType = type.charAt(0).toUpperCase() + type.slice(1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getNames(20, type);
  }
  const handleClose = () => {
    setOpen(false);
    setNames(null);
  };

  const [names, setNames] = React.useState(null);

  const getNames = async (amount, type) => {
    const nameData = await callAPI(amount, type);
    setNames(nameData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{ ucType }</Button>
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
            {ucType} Names<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getNames(20, type)} />
          </Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Male Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList label="male" names={names[0]} type={type} />
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Female Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList label="female" names={names[1]} type={type} />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
