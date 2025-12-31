import React from 'react';
import { useMessage } from './messageContext';
import Alert from '@mui/material/Alert';

export default function MessageBox() {
  const { message, closeMessage } = useMessage();

  const style = {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    zIndex: 9999,
  };

  React.useEffect(() => {
    if (message != null) {
      setTimeout(closeMessage, 1500);
    }
  }, [message]);

  return (
    <React.Fragment>
      {message &&
        <Alert severity={message.type} style={style} onClick={closeMessage}>
          {message.text}
        </Alert>
      }
    </React.Fragment>
  );
};