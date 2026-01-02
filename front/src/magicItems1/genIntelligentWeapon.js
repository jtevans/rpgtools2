import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMessage } from '../messageContext';
import parse from 'html-react-parser';
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
  maxHeight: '95%',
};

export default function IntelligentWeapon(props) {
  const { label } = props;

  const handleOpen = () => {
    getStats();
  }

  const handleClose = () => {
    setStats(null);
  };

  const gridRef = React.useRef(null);
  const { openMessage } = useMessage();
  const handleCopy = async () => {
    let contentToCopy = gridRef.current.innerText || gridRef.current.textContent;
    contentToCopy = contentToCopy.replace(/(\r\n|\n|\r){2}/gm, "\n");
    try {
      await navigator.clipboard.writeText(contentToCopy);
      openMessage('Content copied to clipboard.');
    } catch (err) {
      openMessage('Failed to copy content to clipboard.', 'error');
    }
  }

  const [stats, setStats] = React.useState(null);

  async function callAPI() {
    let response = await fetch(`${APIURL}/api/intelligent.php`);
    const responseText = await response.json();
    return parse(responseText);
  }

  function StatsDisplay() {
    return (
      <div>
        {stats}
      </div>
    );
  }

  const getStats = async () => {
    const statsData = await callAPI();
    setStats(statsData);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Intelligent Weapon Stats</Button>
      {stats && <Modal
        open={stats != null}
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
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />{ label } <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getStats()} />
          </Typography>
          <Typography>
            <StatsDisplay />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
