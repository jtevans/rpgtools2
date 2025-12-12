import React from 'react';
import { useMessage } from './messageContext';
import Alert from '@mui/material/Alert';

export default function MessageBox() {
  const { message, closeMessage } = useMessage();

  if (!message) return null;

  const style = {
    position: 'absolute',
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
    console.log(message);
  }, [message]);

  return (
    <Alert severity={message.type} style={style} onClick={closeMessage}>
      {message.text}
    </Alert>
  );
};