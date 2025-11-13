import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
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

export default function GenSpells1(props) {
  const { spellbookData } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getSpells(spellbookData);
  }
  const handleClose = () => {
    setOpen(false);
    setSpellbook(null);
  };

  const [spellbook, setSpellbook] = React.useState(
    [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]
  );

  const getSpells = async (spellbookData) => {
    const newSpells = await callAPI(spellbookData);
    setSpellbook(newSpells);
    setOpen(true);
  };

  const updateSpell = async (indexToUpdate, level, newValue) => {
    setSpellbook(
      spellbook.map((spells, spellLevel) => {
        if (level === spellLevel) {
          return spells.map((spell, index) => {
            if (index === indexToUpdate) {
              return newValue;
            }
            return spell;
          });
        }
        else {
          return spells;
        }
      })
    );
  };

  async function callAPI(spellbookData, level = null) {
    const wizardLevel = spellbookData.level || '1';
    const intelligence = spellbookData.intelligence || '10';
    const gainSpells = spellbookData.gainSpells ? 'true' : 'false';
    const maxNumSpells = spellbookData.maxNumSpells ? 'true' : 'false';
    let phb = spellbookData.phb ? 'true' : 'false';
    const ua = spellbookData.ua ? 'true' : 'false';
    const av = spellbookData.av ? 'true' : 'false';

    // Force at least one source to be used. Default to PHB.
    if ( ! (spellbookData.phb || spellbookData.ua || spellbookData.av) ) {
      phb = 'true';
    }

    let args = `wizardLevel=${wizardLevel}&intelligence=${intelligence}&gainSpells=${gainSpells}&maxNumSpells=${maxNumSpells}&phb=${phb}&ua=${ua}&av=${av}`;

    if (level) {
      args += `&spellLevel=${level}`;
    }
    let response = await fetch(`http://localhost:8080/tools2/api/1st_spellbook.php?${args}`);
    return await response.json();
  }

  async function replaceSpell(idx, level) {
    let newSpells = await callAPI(spellbookData, level);
    updateSpell(idx, level, newSpells[level][0]);
  }

  function SpellsList({ spellbook }) {
    if (spellbook.length == 1) {
      return (<div>{`${spellbook[0][0]}`}</div>);
    }

    return (
      <div>
        Wizard Name: <u>{spellbookData.name || 'Unknown'}</u><br />
        Wizard Level: {spellbookData.level}<br />
        Wizard Intelligence: {spellbookData.intelligence}<br />
        
        {spellbook.map((spells, spellLevel) => {
          return spells.map((spell, index) => {
            return <div><span>_____ ({spellLevel}) {spell}</span><ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceSpell(index, spellLevel)} /></div>
          });
        })}
      </div>
    );
  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Spellbook</Button>
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
            1st Edition Wizard Spellbook<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getSpells(spellbookData)} />
          </Typography>
          <Typography>
            <SpellsList spellbook={spellbook} />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
