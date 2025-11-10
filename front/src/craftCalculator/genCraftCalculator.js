import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { Grid, Typography } from '@mui/material';


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

export default function GenCraftCalculator({ craftData }) {
  craftData.SP = Math.max(1, Math.min(20000, parseInt(craftData.SP || 1)));
  craftData.DC = parseInt(craftData.DC || 0) || 1;
  craftData.bonus = parseInt(craftData.bonus || 0) || 0;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    calcCraft(craftData);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [weeks, setWeeks] = React.useState([]);

  function calcCraft(craftData) {
    let progress = 0;
    let progressPercent = 0;
    let newWeeks = [];
    while (progress <= craftData.SP) {
      const skillRoll = (Math.floor(Math.random() * 20) + 1) + craftData.bonus;
      if (skillRoll >= craftData.DC) {
        progress += craftData.DC * skillRoll;
      }

      progressPercent = Math.min(100, Math.round((progress / craftData.SP) * 100));
      newWeeks.push({roll: skillRoll, sp: progress, percentage: progressPercent})
    }

    setWeeks(newWeeks);
  }

  function TimeDisplay({ craftData }) {
    return (
      <div>
        <Grid container>
          <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>Week Number</Grid>
          <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>Skill Roll</Grid>
          <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>Progress (SP / %)</Grid>
          {weeks.map((week, idx) => {
            return (
              <React.Fragment>
                <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>{`${idx + 1}`}</Grid>
                <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>{`${week.roll}`}</Grid>
                <Grid size={4} sx={{ textAlign: "center", paddingRight: "2px" }}>{`${week.sp}`} / {`${week.percentage}`}</Grid>
              </React.Fragment>
            )
          })}
        </Grid>
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Calculate Time</Button>
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
            Weeks to Craft<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => calcCraft(craftData)} />
          </Typography>
          <Typography>
            <TimeDisplay craftData={craftData} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
