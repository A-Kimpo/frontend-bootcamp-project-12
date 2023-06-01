import { toast } from 'react-toastify';

export default (err, t) => {
  if (err.code === 'ERR_NETWORK') {
    toast.error(t('errors.networkError'));
  }
  switch (err.response.status) {
    case 401: toast.error(t('errors.authError'));
      break;
    case 500: toast.error(t('errors.serverError'));
      break;
    default: toast.error(t('errors.unknownError'));
  }
};
