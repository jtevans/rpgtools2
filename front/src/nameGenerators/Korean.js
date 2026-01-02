import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Grid } from '@mui/material';
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

export default function KoreanName() {
  const handleOpen = () => {
    getNames();
  }
  const handleClose = () => {
    setNames(null);
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

  const [names, setNames] = React.useState(null);

  const getNames = async () => {
    const nameData = await callAPI(20);
    setNames(nameData);
  };

  async function callAPI(amount) {
    let response = await fetch(`${APIURL}/api/korean.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceName({ column, idx }) {
    let newName = await callAPI(1);

    setNames(prevNames => {
      return prevNames.map((col, cIdx) => {
        if (cIdx === column) {
          return col.map((item, rIdx) => {
            if (rIdx === idx) {
              return newName[column][0];
            }
            return item;
          });
        }
        return col;
      });
    });

  }

  function NameList({ column }) {
    return (
      <div>
        {names[column].map((name, idx) => (
          <div>{name}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceName({ column, idx })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Korean</Button>
      {names && <Modal
        open={names !== null}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <Box sx={style} ref={gridRef}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleClose} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Korean Names<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getNames()} />
          </Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Male Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={0} />
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
                Female Names
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={1} />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
