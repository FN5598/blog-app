import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const showAlert = (message, type = 'info') => {
    setAlert({
      isVisible: true,
      message,
      type
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }));
  };

  return { alert, showAlert, hideAlert };
};