import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMessage } from '../messageContext';

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
  const handleOpen = () => {
    getGiantBag();
  }
  const handleClose = () => {
    setGiantBag(null);
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

  const [giantBag, setGiantBag] = React.useState(null);

  const getGiantBag = async () => {
    const data = await callAPI();
    setGiantBag(data);
  };

  const updateContent = async (indexToUpdate, newValue) => {
    setGiantBag(
      giantBag.map((item, index) =>
        index === indexToUpdate ? newValue : item
      )
    );
  };

  async function callAPI(amount = 0) {
    let amountArgs = ''
    if (amount != 0) {
      amountArgs = `&amount=${amount}`;
    }
    let response = await fetch(`http://localhost:8080/tools2/api/giant_bag.php?type=${giantType}${amountArgs}`);
    return await response.json();
  }

  async function replaceContent({ idx }) {
    let data = await callAPI(1);
    updateContent(idx, data[0]);
  }

  function BagList() {
    return (
      <div>
        {giantBag.map((content, idx) => (
          <div>{content}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceContent({ idx })} /></div>
        ))}
      </div>
    );
  }
          
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Bag Contents</Button>
      {giantBag && <Modal
        open={giantBag != null}
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
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Giant Bag Contents<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getGiantBag()} />
          </Typography>
          <Typography>
            <BagList />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
