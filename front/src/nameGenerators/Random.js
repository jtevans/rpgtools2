import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { Grid } from '@mui/material';

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

export default function RandomNames() {
  const c = "b c d f g h j k l m n p q r s t v w x y z";
  const ch = "ck ch th sh gh st qu ph";
  const v = "a e i o u";
  const vo = "ae ea oo ee ei ie ou";

  const allowedCharsMerge = c + ' ' + c.toUpperCase() + ' ' + v + ' ' + v.toUpperCase() + ' ' + '\' = - _ . *';

  const conMerge = c + ' ' + c + ' ' + ch;
  const vowMerge = v + ' ' + v + ' ' + vo;
  const allMerge = conMerge + ' ' + vowMerge;

  const con = conMerge.split(' ');
  const vow = vowMerge.split(' ');
  const all = allMerge.split(' ');
  let allowedChars = allowedCharsMerge.split(' ');
  allowedChars.push(' ');

  let pattern = '';
  const [openForm, setOpenForm] = React.useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
  }
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  
  const handleOpenNames = () => {
    const pattern = document.getElementById('pattern').value;
    const nameData = makeNames(20, pattern);
    setNames(nameData);
  }
  const handleCloseNames = () => {
    setNames(null);
  };

  const [names, setNames] = React.useState(null);

  const getNames = async () => {
    const pattern = document.getElementById('pattern').value;
    const nameData = makeNames(20, pattern);
    setNames(nameData);
  };

  function getRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function makeName(pattern) {
    let lastchar = '';
    let newchar = '';
    let name = '';

    for (let x = 0; x < pattern.length; ++x) {
      let char = pattern[x];
      if (!allowedChars.includes(char)) {
        continue;
      }
      if (char === '-') {
        newchar = getRandom(con);
      }
      else if (char === '=') {
        newchar = getRandom(vow);
      }
      else if (char === '*') {
        newchar = getRandom(all);
      }
      else if (char === '.') {
        newchar = lastchar;
      }
      else {
        newchar = char;
      }

      lastchar = newchar;
      name += newchar;
    }
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  }

  function makeNames(amount, pattern) {
    let names = [[], [], []];
    for (let x = 0; x < amount; ++x) {
      names[0][x] = makeName(pattern);
      names[1][x] = makeName(pattern);
      names[2][x] = makeName(pattern);
    }
    return names;
  }

  function replaceName({ column, idx }) {
    const pattern = document.getElementById('pattern').value;
    const newName = makeNames(1, pattern);
    setNames(
      names.map((arr, colIndex) => {
        return colIndex === column ? arr.map((item, index) => {
          return index === idx ? newName[0][0] : item
        }) : arr;
      })
    );
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

  function setPattern() {
    const prebuilt = document.getElementById('prebuilt');
    document.getElementById('pattern').value = prebuilt.value;
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpenForm}>Random Names</Button>
      <Modal
        open={openForm}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleCloseForm;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleCloseForm} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            Random Names Interface
          </Typography>
          <Typography>
            All names are comprised of consonants and vowel. This allows you to build random names based off of prebuilt combinations of letters. All characters in the sequence will be shown as-is, except for the following:<br />
            <b>-</b> :: Will be replaced with a consonant.<br />
            <b>=</b> :: Will be replaced with a vowel.<br />
            <b>.</b> :: Will repeat the previous character.<br />
            <b>*</b> :: Will be replaced with a random letter.<br />
          </Typography>
          <Typography sx={{ textAlign: "center"}}>
            <select id="prebuilt" onChange={setPattern}>
              <option value="">Select a Prebuilt or Type Your Own</option>
              <option value="-=--=-">-=--=-</option>
              <option value="-=-=-">-=-=-</option>
              <option value="-=-=-=">-=-=-=</option>
              <option value="-=-.=-">-=-.=-</option>
              <option value="-=-=">-=-=</option>
              <option value="-=-==">-=-==</option>
              <option value="-==-=-">-==-=-</option>
              <option value="-==-==">-==-==</option>
              <option value="-=--=-=">-=--=-=</option>
              <option value="=-=--=-=">=-=--=-=</option>
              <option value="-=- -=-.=-">-=- -=-.=-</option>
              <option value="-=-">-=-</option>
              <option value="-==--==-">-==--==-</option>
              <option value="=-==-">=-==-</option>
              <option value="=-=">=-=</option>
              <option value="=-=-">=-=-</option>
              <option value="=-=-=">=-=-=</option>
              <option value="=-.=-">=-.=-</option>
              <option value="=-=.-">=-=.-</option>
              <option value="****">****</option>
              <option value="Z=-.=-">Z=-.=-</option>
            </select><br />
            <input type="text" id="pattern" size="20" /><br />
            <Button onClick={handleOpenNames}>Generate Names</Button>
          </Typography>
        </Box>
      </Modal>
      {names && <Modal
        open={names != null}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleCloseNames;
          }
        }}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "right" }}>
            <CloseIcon onClick={handleCloseNames} />
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" component="h2">
            Random Names<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getNames()} />
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={0} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={1} />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography sx={{ textAlign: "center" }}>
                <NameList column={2} />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
