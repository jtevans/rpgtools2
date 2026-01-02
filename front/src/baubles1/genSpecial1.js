import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMessage } from '../messageContext';
import { APIURL } from '../config';

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

export default function GenSpecial1({ title, API, amount }) {
  amount = Math.max(1, Math.min(2000, parseInt(amount || 0)));
  const handleOpen = () => {
    getSpecials();
  }
  const handleClose = () => {
    setSpecials(null);
  };

  const gridRef = React.useRef(null);
  const { openMessage } = useMessage();
  const handleCopy = async () => {
    const contentToCopy = gridRef.current.innerText || gridRef.current.textContent;
    try {
      await navigator.clipboard.writeText(contentToCopy);
      openMessage('Content copied to clipboard.');
    } catch (err) {
      openMessage('Failed to copy content to clipboard.', 'error');
    }
  }

  const [specials, setSpecials] = React.useState(null);

  const getSpecials = async () => {
    const data = await callAPI();
    setSpecials(data);
  };

  const updateSpecial = async (indexToUpdate, newValue) => {
    setSpecials(
      specials.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(newAmount = 0) {
    let targetAmount = amount;
    if (newAmount != 0) {
      targetAmount = newAmount;
    }

    let response = await fetch(`${APIURL}/api/${API}?amount=${targetAmount}`);
    return await response.json();
  }

  async function replaceSpecial({ idx }) {
    let data = await callAPI(1);
    updateSpecial(idx, data[0]);
  }

  function SpecialsList({ specials }) {
    return (
      <div>
        {specials.map((special, idx) => (
          <div>{special}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceSpecial({ idx })} /></div>
        ))}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate {title}</Button>
      {specials && <Modal
        open={specials != null}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        sx={{ maxHeight: "80%" }}
      >
        <Box sx={style} ref={gridRef}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />{title}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getSpecials()} />
          </Typography>
          <Typography>
            <SpecialsList API={API} specials={specials} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
