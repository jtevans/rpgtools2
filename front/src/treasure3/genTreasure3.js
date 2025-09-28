import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import GenGems3 from '../baubles3/genGems3';
import GenArt3 from '../baubles3/genArt3';
import GenMundane3 from '../baubles3/genMundane3';
import GenMagicItems3 from '../magicItems3/genMagicItems3';

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

async function callAPI() {
  const treasure3_cr0 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr0').value)));
  const treasure3_cr1 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr1').value)));
  const treasure3_cr2 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr2').value)));
  const treasure3_cr3 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr3').value)));
  const treasure3_cr4 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr4').value)));

  const treasure3_q0 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q0').value)));
  const treasure3_q1 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q1').value)));
  const treasure3_q2 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q2').value)));
  const treasure3_q3 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q3').value)));
  const treasure3_q4 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q4').value)));

  let args = '';
  if (treasure3_cr0 !== 0 && treasure3_q0 !== 0) {
    args += `&cr0=${treasure3_cr0}&q0=${treasure3_q0}`
  }
  if (treasure3_cr1 !== 0 && treasure3_q1 !== 0) {
    args += `&cr1=${treasure3_cr1}&q1=${treasure3_q1}`
  }
  if (treasure3_cr2 !== 0 && treasure3_q2 !== 0) {
    args += `&cr2=${treasure3_cr2}&q2=${treasure3_q2}`
  }
  if (treasure3_cr3 !== 0 && treasure3_q3 !== 0) {
    args += `&cr3=${treasure3_cr3}&q3=${treasure3_q3}`
  }
  if (treasure3_cr4 !== 0 && treasure3_q4 !== 0) {
    args += `&cr4=${treasure3_cr4}&q4=${treasure3_q4}`
  }

  if (args === '') {
    return '[]';
  }
  args = args.slice(1);
  let response = await fetch(`http://localhost:8080/tools2/api/treasure3.php?${args}`);
  return await response.json();
}

async function replaceTreasure({ source, key }) {
  let newTreasure = await callAPI();
  document.getElementById(`span-${key}`).innerHTML = `${key}: ${newTreasure[key]}`;
  if (source !== '') {
    document.getElementById(source).value = newTreasure[key];
  }
}

function TreasureList({ treasure }) {
  let totalTreasure = 0;
  Object.keys(treasure).forEach(function (key) {
    totalTreasure += treasure[key];    
  });

  return (
    <div>
      {totalTreasure === 0 ? 'No Treasure' : Object.keys(treasure).map(function (key) {
        let addButton = <span></span>;
        let addForm = <input type="hidden" id={`treasure3-${key}`} value={treasure[key]} />;
        let source = '';
        if (key === 'Gems' && treasure[key] > 0) {
          source = 'treasure3-Gems';
          addButton = <GenGems3 source={`${source}`} />
        }
        if (key === 'Art' && treasure[key] > 0) {
          source = 'treasure3-Art';
          addButton = <GenArt3 source={`${source}`} />
        }
        if (key === 'Mundane' && treasure[key] > 0) {
          source = 'treasure3-Mundane';
          addButton = <GenMundane3 source={`${source}`} />
        }
        if (key === 'Minor' && treasure[key] > 0) {
          source = 'treasure3-Minor';
        }
        if (key === 'Medium' && treasure[key] > 0) {
          source = 'treasure3-Medium';
        }
        if (key === 'Major' && treasure[key] > 0) {
          source = 'treasure3-Major';
        }

        return <div>
          <span id={`span-${key}`}>{key}: {treasure[key]}</span>
          <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTreasure({ source, key })} />
          <br />{addButton}{addForm}        
        </div>
      })}
    </div>
  );
}

export default function GenTreasure3() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getTreasure();
  }
  const handleClose = () => {
    setOpen(false);
    setTreasure(null);
  };

  const [treasure, setTreasure] = React.useState(null);

  const getTreasure = async () => {
    const treasureData = await callAPI();
    setTreasure(treasureData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Treasure</Button>
      {treasure && <Modal
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
            Treasure<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getTreasure()} />
          </Typography>
          <Typography>
            <TreasureList treasure={treasure} />
            {treasure['Minor'] + treasure['Medium'] + treasure['Major'] > 0 ? <div><GenMagicItems3 sourcePrefix="treasure3" /></div> : <div></div>}
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
