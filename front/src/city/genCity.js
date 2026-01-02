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

export default function GenCity(props) {
  const { cityData } = props;
  const handleOpen = () => {
    getCity();
  }
  const handleClose = () => {
    setCity(null);
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

  const [city, setCity] = React.useState(null);

  const getCity = async () => {
    const newCity = await callAPI();
    setCity(newCity[0]);
  };

  async function callAPI(f = null, type = null) {
    let args = '';
    if (f && type)
    {
      args = `f=${f}&type=${type}`;
    }
    else {
      const name = encodeURIComponent(cityData.name || 'Random City');
      const density = cityData.density || '0';
      const size = cityData.size || '0';
      const makeNames = cityData.makeNames ? 'true' : 'false';
      const agricultural = cityData.agricultural ? 'true' : 'false';
      const wine = cityData.wine ? 'true' : 'false';
      const grazing = cityData.grazing ? 'true' : 'false';
      const hills = cityData.hills ? 'true' : 'false';
      const forest = cityData.forest ? 'true' : 'false';
      const port = cityData.port ? 'true' : 'false';
      const military = cityData.military ? 'true' : 'false';

      args = `f=city&name=${name}&density=${density}&size=${size}&makeNames=${makeNames}&agricultural=${agricultural}&wine=${wine}&grazing=${grazing}&hills=${hills}&forest=${forest}&port=${port}&military=${military}`;
    }

    const response = await fetch(`${APIURL}/api/city.php?${args}`);
    return await response.json();
  }

  async function replaceItem(catIndex, typeIndex, itemIndex, typeToChange) {
    const newItem = await callAPI('item', typeToChange);

    setCity((prevCity) => {
      const cats = prevCity.categories;
      const newCategories = [...cats];
      const catName = newCategories[catIndex].name;
      const newTypes = [...newCategories[catIndex].types];
      const typeName = newTypes[typeIndex].name;
      const newItems = [...newTypes[typeIndex].items];
      newItems[itemIndex] = {
        name: newItem.name,
        stars: newItem.stars,
      }
      newTypes[typeIndex] = {
        name: typeName,
        items: newItems,
      };
      newCategories[catIndex] = {
        name: catName,
        types: newTypes,
      };

      return {
        overview: city.overview,
        categories: newCategories
      };
    });
  }

  function CityDisplay() {
    return (
      <div>
        Density: {city.overview.density}<br />
        Size: {city.overview.size}<br />
        Blocks: {city.overview.blocks}<br />
        Population: {city.overview.population}<br />
        Max Value of a Single Item: {city.overview.singleItem}<br />
        Ready Gold on Hand: {city.overview.readyGold}<br />

        {city.categories.map((category, catIndex) => {
          return <div>
            <Typography sx={{ textAlign: "center" }} variant="h5" component="h3">
              {category.name}
            </Typography>
            {category.types.map((type, typeIndex) => {
              return <div>
                <Typography sx={{ textAlign: "left" }} variant="h5" component="h5">
                  {type.name}
                </Typography>
                {type.items.map((item, itemIndex) => {
                  return <Typography sx={{ textAlign: "left" }}>
                    {item.name}{item.stars}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => replaceItem(catIndex, typeIndex, itemIndex, type.name)} />
                  </Typography>
                })}
                </div>
            })}
            </div>
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Generate City</Button>
      {city && <Modal
        open={city != null}
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
            <ContentCopyIcon sx={{ paddingRight: "5px", fontSize: "12pt" }} onClick={handleCopy} />{cityData.name || 'Random City'}<ReplayIcon sx={{ paddingLeft: "5px", fontSize: "10pt" }} onClick={() => getCity()} />
          </Typography>
          <Typography>
            <CityDisplay />
          </Typography>
        </Box>
      </Modal>}
    </React.Fragment>
  );
}
