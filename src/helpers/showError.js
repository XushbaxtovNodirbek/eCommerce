import {get} from 'lodash';
import {Toast} from '../components';
import {t} from 'i18next';

export default showError = error => {
  if (error.message === 'Network Error') {
    Toast.show(error.message);
  } else {
    let message =
      get(error, 'response.data.message', '') ||
      get(error, 'response.data.errorMessage', '') ||
      t('Xatolik yuz berdi');
    Toast.show(message);
  }
};
