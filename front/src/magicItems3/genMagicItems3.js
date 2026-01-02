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

export default function GenMagicItems3(props) {
  const { minorAmount, mediumAmount, majorAmount } = props;
  const handleOpen = () => {
    getItems();
  }
  const handleClose = () => {
    setMinor(null);
    setMedium(null);
    setMajor(null);
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

  const [minor, setMinor] = React.useState(null);
  const [medium, setMedium] = React.useState(null);
  const [major, setMajor] = React.useState(null);

  const getItems = async () => {
    const itemData = await callAPI();
    setMinor(itemData['Minor']);
    setMedium(itemData['Medium']);
    setMajor(itemData['Major']);
  };

  const updateItem = async (indexToUpdate, newValue, type) => {
    if (type === 'Minor') {
      setMinor(minor.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
    if (type === 'Medium') {
      setMedium(medium.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
    if (type === 'Major') {
      setMajor(major.map((item, index) =>
        index === indexToUpdate ? newValue : item
      ));
    }
  };

  async function callAPI(passedMinorAmount = null, passedMediumAmount = null, passedMajorAmount = null) {
    let minorAmt = minorAmount;
    let mediumAmt = mediumAmount;
    let majorAmt = majorAmount;

    if (passedMinorAmount) {
      minorAmt = passedMinorAmount;
    }
    if (passedMediumAmount) {
      mediumAmt = passedMediumAmount;
    }
    if (passedMajorAmount) {
      majorAmt = passedMajorAmount;
    }

    const args = `minor=${minorAmt}&medium=${mediumAmt}&major=${majorAmt}`;
    let response = await fetch(`${APIURL}/api/mi.php?${args}`);
    return await response.json();
  }

  async function replaceItem({ idx, type }) {
    let minorAmt = 0;
    let mediumAmt = 0;
    let majorAmt = 0;

    if (type === 'Minor')
    {
      minorAmt = 1;
    }
    if (type === 'Medium') {
      mediumAmt = 1;
    }
    if (type === 'Major') {
      majorAmt = 1;
    }
    let newItem = await callAPI(minorAmt, mediumAmt, majorAmt);
    updateItem(idx, newItem[type][0], type);
  }

  function ItemList({ items, type }) {
    return (
      <div>
        {items.map((item, idx) => (
          <div>{item}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "9pt" }} onClick={() => replaceItem({ idx, type })} /></div>
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate Magic Items</Button>
      {(minor || medium || major) && <Modal
        open={(minor || medium || major)}
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
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />Magic Items<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getItems()} />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Minor Magic Items
          </Typography>
          <Typography>
            <ItemList items={minor} type="Minor" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Medium Magic Items
          </Typography>
          <Typography>
            <ItemList items={medium} type="Medium" />
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Major Magic Items
          </Typography>
          <Typography>
            <ItemList items={major} type="Major" />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
