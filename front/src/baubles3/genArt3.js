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

export default function GenArt3(props) {
  const { source } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getArt(source);
  }
  const handleClose = () => {
    setOpen(false);
    setArt(null);
  };

  const [arts, setArt] = React.useState(null);

  const getArt = async (source) => {
    const artData = await callAPI(source);
    setArt(artData);
    setOpen(true);
  };

  const updateArt = async (indexToUpdate, newValue) => {
    setArt(
      arts.map((item, index) =>
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

    let response = await fetch(`http://localhost:8080/tools2/api/art.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceArt({ source, idx }) {
    let newArt = await callAPI(source, 1);
    updateArt(idx, newArt[0]);
  }

  function ArtList({ source, arts }) {
    return (
      <div>
        {arts.map((art, idx) => (
          <div><span>{art}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceArt({ source, idx })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Artwork</Button>
      {arts && <Modal
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
            Artwork<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getArt(source)} />
          </Typography>
          <Typography>
            <ArtList source={source} arts={arts} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
