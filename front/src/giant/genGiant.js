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

export default function GenGiant({ giantType }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getGiantBag(giantType);
  }
  const handleClose = () => {
    setOpen(false);
    setGiantBag(null);
  };

  const [giantBag, setGiantBag] = React.useState([]);

  const getGiantBag = async (giantType) => {
    const data = await callAPI(giantType);
    setGiantBag(data);
    setOpen(true);
  };

  const updateContent = async (indexToUpdate, newValue) => {
    setGiantBag(
      giantBag.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(giantType, amount = 0) {
    let amountArgs = ''
    if (amount != 0) {
      amountArgs = `&amount=${amount}`;
    }
    let response = await fetch(`http://localhost:8080/tools2/api/giant_bag.php?type=${giantType}${amountArgs}`);
    return await response.json();
  }

  async function replaceContent({ giantType, idx }) {
    let data = await callAPI(giantType, 1);
    updateContent(idx, data[0]);
  }

  function BagList({ giantBag, giantType }) {
    return (
      <div>
        {giantBag.map((content, idx) => (
          <div><span id={`span-${idx}`}>{content}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceContent({ giantType, idx })} /></div>
        ))}
      </div>
    );
  }
          
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Bag Contents</Button>
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
            Giant Bag Contents<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getGiantBag(giantType)} />
          </Typography>
          <Typography>
            <BagList giantBag={giantBag} giantType={giantType} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
