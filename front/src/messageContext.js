import * as React from 'react';

export const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = React.useState(null);

  const openMessage = (text, type = 'info') => {
    setMessage({ text, type });
  };

  const closeMessage = () => {
    setMessage(null);
  };


  return (
    <MessageContext.Provider value={{ message, openMessage, closeMessage }}>{children}</MessageContext.Provider>
  );
};

export const useMessage = () => React.useContext(MessageContext);