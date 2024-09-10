import {api} from 'api';
import logger from 'helpers/logger';
import Toast from 'react-native-toast-message';
import useStore from 'store';

export default {
  fetchCustomers: (search = '') => {
    api
      .get(`customer?search=${search}`)
      .then(res => {
        useStore.setState({customers: res});
      })
      .catch(err => {
        logger(err);
        Toast.show({
          type: 'error',
          text1: 'Xatolik',
          text2: "Ma'lumotlar olishda xatolik yuz berdi",
        });
      });
  },
  fetchCategories: () => {
    api
      .get('/categories?include=unit')
      .then(({data}) => {
        useStore.setState({categories: data});
      })
      .catch(err => {
        logger(err);
        Toast.show({
          type: 'error',
          text1: 'Xatolik',
          text2: "Ma'lumotlar olishda xatolik yuz berdi",
        });
      });
  },
  fetchProducts: (search = '') => {
    api
      .get(
        `/products?filter[category_id]=1&include=category.unit&sort=id&search=${search}`,
      )
      .then(({data}) => {
        useStore.setState({products: data});
      })
      .catch(err => {
        logger(err);
        Toast.show({
          type: 'error',
          text1: 'Xatolik',
          text2: "Ma'lumotlar olishda xatolik yuz berdi",
        });
      });
  },
};
