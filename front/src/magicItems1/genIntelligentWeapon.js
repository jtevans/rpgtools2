import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import parse from 'html-react-parser';

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

async function callAPI() {
  let response = await fetch(`http://localhost:8080/tools2/api/intelligent.php`);
  const responseText = await response.json();
  return parse(responseText);
}

function StatsDisplay({ stats }) {
  return (
    <div>
      <div><span id={`span-intelligent`}>{stats}</span></div>
    </div>
  );
}

export default function IntelligentWeapon(props) {
  const { label } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getStats();
  }
  const handleClose = () => {
    setOpen(false);
    setStats(null);
  };

  const [stats, setStats] = React.useState(null);

  const getStats = async () => {
    const statsData = await callAPI();
    setStats(statsData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Intelligent Weapon Stats</Button>
      {stats && <Modal
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
            { label } <ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getStats()} />
          </Typography>
          <Typography>
            <StatsDisplay stats={stats} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
