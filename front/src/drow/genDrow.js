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

export default function GenDrow({ drowData }) {
  const handleOpen = () => {
    getDrowTreasure();
  }
  const handleClose = () => {
    setDrowTreasure(null);
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

  const [drowTreasure, setDrowTreasure] = React.useState(null);

  const getDrowTreasure = async () => {
    const data = await callAPI();
    setDrowTreasure(data);
  };

  async function callAPI() {
    let args = '';
    drowData.forEach(function (data, index) {
      args += `&l${index}=${data.drowLevel}&q${index}=${data.numDrow}`;
    });
    args = args.slice(1);
    let response = await fetch(`${APIURL}/api/drow_treasure.php?${args}`);
    return await response.json();
  }

  async function replaceDrowTreasure({ key }) {
    const newTreasure = await callAPI();
    let display = key;
    if (key == 'Gems') {
      display = '10 GP Moonstones';
    }

    document.getElementById(`span-treasure1-${key}`).innerHTML = `${display}: ${newTreasure[key]}`;
  }

  function DrowList({ drowTreasure }) {
    let totalTreasure = 0;
    Object.keys(drowTreasure).forEach(function (key) {
      totalTreasure += drowTreasure[key];
    });

    return (
      <div>
        {totalTreasure === 0 ? 'No Treasure' : Object.keys(drowTreasure).map(function (key) {
          let display = key;
          if (key == 'Gems')
          {
            display = '10 GP Moonstones';
          }
          return <div>
            <span id={`span-treasure1-${key}`}>{display}: {drowTreasure[key]}</span>
            <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceDrowTreasure({ key })} />
          </div>
        })}
      </div>
    );
  }
          
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Drow Treasure</Button>
      {drowTreasure && <Modal
        open={drowTreasure != null}
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
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Incidental Drow Treasure<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getDrowTreasure()} />
          </Typography>
          <Typography>
            <DrowList drowTreasure={drowTreasure} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
