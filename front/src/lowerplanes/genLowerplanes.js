import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Utils from '../utils';

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

export default function GenLowerplanes({ amount }) {
  amount = Math.max(1, Math.min(30, parseInt(amount) || 0));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getLower(amount);
  }
  const handleClose = () => {
    setOpen(false);
    setLower(null);
  };

  const [lower, setLower] = React.useState(null);

  const getLower = async (amount) => {
    const data = await callAPI(amount);
    setLower(data);
    setOpen(true);
  };

  const updateLower = async (indexToUpdate, newValue) => {
    setLower(
      lower.map((creature, index) =>
        index === indexToUpdate ? newValue : creature
      )
    );
  };

  async function callAPI(amount) {
    let response = await fetch(`http://localhost:8080/tools2/api/lowerplanes.php?amount=${amount}`);
    return await response.json();
  }

  async function replaceLower({ idx }) {
    let data = await callAPI(1);
    updateLower(idx, data[0]);
  }

  function LowerList({ lower }) {
    return (
      <div>
        {lower.map((creature, idx) => {
          return <div>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>{`Creature #${idx + 1}`}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceLower({ idx })} /><br /></Typography>
            <Typography sx={{ textAlign: "left" }}>              
              {Object.keys(creature).map(function (key) {
                const display = Utils.ucfirst(key);
                let value = '';

                if (typeof creature[key] == 'object') {
                  value = creature[key].join(', ');
                }
                else {
                  value = Utils.ucfirst(creature[key]) || 'None';
                }

                return <div><b>{display}</b>: {value}</div>
              })}
            </Typography>
          </div>
        }
      )}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Lower Planes Creatures</Button>
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
            Lower Planes Creatures<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getLower(amount)} />
          </Typography>
          <Typography>
            <LowerList lower={lower} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
