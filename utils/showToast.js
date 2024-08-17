import { toast } from 'react-toastify';

export const showToast = (title, type) => {
  const positionObject = {
    position: toast.POSITION.TOP_RIGHT,
  };
  switch (type) {
    case 'success':
      toast.success(title, positionObject);
      return;
    case 'error':
      toast.error(title, positionObject);
      return;
    case 'warning':
      toast.warning(title, positionObject);
      return;
    default:
      toast(title, positionObject);
  }
};
