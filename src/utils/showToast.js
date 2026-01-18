import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showToast(message, type = 'error') {
  const colors = {
    error: 'linear-gradient(to right, #ff5f6d, #ffc371)',
    success: 'linear-gradient(to right, #4a90e2, #7bb8f5)',
    info: 'linear-gradient(to right, #50c878, #8fe3a0)',
  };

  Toastify({
    text: message,
    close: true,
    style: {
      background: colors[type] || colors.info,
    },
    duration: 4000,
  }).showToast();
}
