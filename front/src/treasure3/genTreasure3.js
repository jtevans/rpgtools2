import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import GenSpecial3 from '../baubles3/genSpecial3';
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

export default function GenTreasure3() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getTreasure();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [cp3, setCP3] = React.useState(0);
  const [sp3, setSP3] = React.useState(0);
  const [gp3, setGP3] = React.useState(0);
  const [pp3, setPP3] = React.useState(0);
  const [gems3, setGems3] = React.useState(0);
  const [art3, setArt3] = React.useState(0);
  const [mundane3, setMundane3] = React.useState(0);
  const [minor3, setMinor3] = React.useState(0);
  const [medium3, setMedium3] = React.useState(0);
  const [major3, setMajor3] = React.useState(0);

  async function callAPI() {
    const treasure3_cr0 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr0').value || 0)));
    const treasure3_cr1 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr1').value || 0)));
    const treasure3_cr2 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr2').value || 0)));
    const treasure3_cr3 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr3').value || 0)));
    const treasure3_cr4 = Math.max(0, Math.min(20, parseInt(document.getElementById('treasure3_cr4').value || 0)));

    const treasure3_q0 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q0').value || 0)));
    const treasure3_q1 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q1').value || 0)));
    const treasure3_q2 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q2').value || 0)));
    const treasure3_q3 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q3').value || 0)));
    const treasure3_q4 = Math.max(0, Math.min(200, parseInt(document.getElementById('treasure3_q4').value || 0)));

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
      return [];
    }
    args = args.slice(1);
    let response = await fetch(`http://localhost:8080/tools2/api/treasure3.php?${args}`);
    return await response.json();
  }

  async function replaceTreasureItem({ type }) {
    let newTreasure = await callAPI();
    if (type === 'CP') {
      setCP3(newTreasure['CP']);
    }
    else if (type === 'SP') {
      setSP3(newTreasure['SP']);
    }
    else if (type === 'GP') {
      setGP3(newTreasure['GP']);
    }
    else if (type === 'PP') {
      setPP3(newTreasure['PP']);
    }
    else if (type === 'Gems') {
      setGems3(newTreasure['Gems']);
    }
    else if (type === 'Art') {
      setArt3(newTreasure['Art']);
    }
    else if (type === 'Mundane') {
      setMundane3(newTreasure['Mundane']);
    }
    else if (type === 'Minor') {
      setMinor3(newTreasure['Minor']);
    }
    else if (type === 'Medium') {
      setMedium3(newTreasure['Medium']);
    }
    else if (type === 'Major') {
      setMajor3(newTreasure['Major']);
    }
  }

  function TreasureItem3({ type, amount }) {
    let genButton = null;
    if (type === 'Gems' && amount > 0) {
      genButton = <GenSpecial3 title={'Gems'} API={'gems3.php'} amount={amount} />;
    }
    else if (type === 'Art' && amount > 0) {
      genButton = <GenSpecial3 title="Art" API="art.php" amount={amount} />;
    }
    else if (type === 'Mundane' && amount > 0) {
      genButton = <GenSpecial3 title="Mundane Items" API="mundane.php" amount={amount} />;
    }
    return <div>
      <span>{type}: {amount}</span>{genButton}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceTreasureItem({ type })} />
    </div>
  }

  const getTreasure = async () => {
    const treasureData = await callAPI();
    setCP3(treasureData['CP']);
    setSP3(treasureData['SP']);
    setGP3(treasureData['GP']);
    setPP3(treasureData['PP']);
    setGems3(treasureData['Gems']);
    setArt3(treasureData['Art']);
    setMundane3(treasureData['Mundane']);
    setMinor3(treasureData['Minor']);
    setMedium3(treasureData['Medium']);
    setMajor3(treasureData['Major']);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Treasure</Button>
      {open && <Modal
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
            <TreasureItem3 type={'CP'} amount={cp3} />
            <TreasureItem3 type={'SP'} amount={sp3} />
            <TreasureItem3 type={'GP'} amount={gp3} />
            <TreasureItem3 type={'PP'} amount={pp3} />
            <TreasureItem3 type={'Gems'} amount={gems3} />
            <TreasureItem3 type={'Art'} amount={art3} />
            <TreasureItem3 type={'Mundane'} amount={mundane3} />
            <TreasureItem3 type={'Minor'} amount={minor3} />
            <TreasureItem3 type={'Medium'} amount={medium3} />
            <TreasureItem3 type={'Major'} amount={major3} />
            {minor3 + medium3 + major3 > 0 ? <div><GenMagicItems3 minorAmount={minor3} mediumAmount={medium3} majorAmount={major3} /></div> : <div></div>}
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
